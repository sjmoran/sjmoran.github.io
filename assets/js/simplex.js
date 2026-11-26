// After Lavrenko (2004), Figure 4.8: density allocation with Dirichlet kernels.
// Each training document u_w induces a Dirichlet bump on the simplex A-B-C; the bumps
// overlap into the generative density p(du). A ghost document follows the pointer
// (or drifts when idle); clicking adds it to the training set.
(function () {
  var canvas = document.getElementById('simplex');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var BETA = 34;        // kernel concentration: alpha_w = 1 + BETA * u_w
  var MAXDOCS = 24;
  var GRID = 170;
  var LEVELS = [0.06, 0.16, 0.3, 0.48, 0.68, 0.88];
  var STOPS = [[250, 248, 243], [196, 226, 216], [124, 195, 164], [240, 210, 122], [244, 161, 74], [232, 106, 44]];
  // Roughly where the training strings sit in Lavrenko's figure.
  var START = [[0.62, 0.19, 0.19], [0.42, 0.13, 0.45], [0.33, 0.09, 0.58], [0.2, 0.56, 0.24],
               [0.27, 0.46, 0.27], [0.1, 0.27, 0.63], [0.08, 0.17, 0.75]];

  var W, H, V, dpr, rw, rh, raster, rctx, img, field;
  var docs = START.map(function (d) { return d.slice(); });
  var ghost = [1 / 3, 1 / 3, 1 / 3], target = ghost.slice(), pointer = false, t0 = performance.now();
  var dirty = true, last = '';

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var side = Math.min(W - 40, (H - 50) / (Math.sqrt(3) / 2));
    var th = side * Math.sqrt(3) / 2, top = (H - th) / 2 - 2;
    V = [[W / 2, top], [W / 2 - side / 2, top + th], [W / 2 + side / 2, top + th]];
    rw = GRID; rh = Math.max(2, Math.round(GRID * H / W));
    raster = document.createElement('canvas'); raster.width = rw; raster.height = rh;
    rctx = raster.getContext('2d');
    img = rctx.createImageData(rw, rh);
    field = new Float32Array(rw * rh);
    dirty = true;
  }

  function bary(x, y) {
    var a = V[0], b = V[1], c = V[2];
    var d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
    var l1 = ((b[1] - c[1]) * (x - c[0]) + (c[0] - b[0]) * (y - c[1])) / d;
    var l2 = ((c[1] - a[1]) * (x - c[0]) + (a[0] - c[0]) * (y - c[1])) / d;
    return [l1, l2, 1 - l1 - l2];
  }
  function toXY(b) {
    return [b[0] * V[0][0] + b[1] * V[1][0] + b[2] * V[2][0], b[0] * V[0][1] + b[1] * V[1][1] + b[2] * V[2][1]];
  }
  function clampB(b, m) {
    var s = 0, i;
    for (i = 0; i < 3; i++) { b[i] = Math.max(b[i], m); s += b[i]; }
    for (i = 0; i < 3; i++) b[i] /= s;
    return b;
  }
  function color(t) {
    var x = t * (STOPS.length - 1), i = Math.min(Math.floor(x), STOPS.length - 2), f = x - i;
    return [0, 1, 2].map(function (k) { return STOPS[i][k] + (STOPS[i + 1][k] - STOPS[i][k]) * f; });
  }

  // log Gamma (Lanczos), for normalised Dirichlet kernels.
  var LG = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
            12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  function lgamma(z) {
    if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
    z -= 1;
    var x = 0.99999999999980993;
    for (var i = 0; i < 8; i++) x += LG[i] / (z + i + 1);
    var t = z + 7.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
  }
  function kernel(u) {
    var a = u.map(function (x) { return 1 + BETA * x; });
    var c = lgamma(a[0] + a[1] + a[2]) - lgamma(a[0]) - lgamma(a[1]) - lgamma(a[2]);
    return { a: a, c: c };
  }

  function computeField() {
    var ks = docs.map(kernel).concat([kernel(ghost)]);
    var wts = docs.map(function () { return 1; }).concat([0.8]);
    var d = img.data, max = 0, i, j, k, n;
    for (j = 0; j < rh; j++) {
      for (i = 0; i < rw; i++) {
        var b = bary((i + 0.5) * W / rw, (j + 0.5) * H / rh), idx = j * rw + i;
        if (b[0] < -0.02 || b[1] < -0.02 || b[2] < -0.02) { field[idx] = -1; continue; }
        var l0 = Math.log(Math.max(b[0], 1e-6)), l1 = Math.log(Math.max(b[1], 1e-6)), l2 = Math.log(Math.max(b[2], 1e-6));
        var s = 0;
        for (n = 0; n < ks.length; n++) {
          var K = ks[n];
          s += wts[n] * Math.exp(K.c + (K.a[0] - 1) * l0 + (K.a[1] - 1) * l1 + (K.a[2] - 1) * l2);
        }
        field[idx] = s;
        if (s > max) max = s;
      }
    }
    for (k = 0; k < rw * rh; k++) {
      var p = k * 4;
      if (field[k] < 0) { d[p + 3] = 0; continue; }
      field[k] /= max;
      var c = color(Math.pow(field[k], 0.6));
      d[p] = c[0]; d[p + 1] = c[1]; d[p + 2] = c[2]; d[p + 3] = 255;
    }
    rctx.putImageData(img, 0, 0);
  }

  // Marching squares over the normalised density, dashed like the thesis figure.
  function contours() {
    var sx = W / rw, sy = H / rh;
    ctx.lineWidth = 0.9;
    ctx.setLineDash([3, 3]);
    LEVELS.forEach(function (L, li) {
      ctx.strokeStyle = li > 2 ? 'rgba(110, 40, 15, 0.45)' : 'rgba(20, 70, 66, 0.4)';
      ctx.beginPath();
      for (var j = 0; j < rh - 1; j++) {
        for (var i = 0; i < rw - 1; i++) {
          var a = field[j * rw + i], b = field[j * rw + i + 1], c = field[(j + 1) * rw + i + 1], e = field[(j + 1) * rw + i];
          if (a < 0 || b < 0 || c < 0 || e < 0) continue;
          var code = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (e > L ? 1 : 0);
          if (code === 0 || code === 15) continue;
          var x = (i + 0.5) * sx, y = (j + 0.5) * sy;
          var top = [x + sx * (L - a) / (b - a), y], right = [x + sx, y + sy * (L - b) / (c - b)];
          var bot = [x + sx * (L - e) / (c - e), y + sy], left = [x, y + sy * (L - a) / (e - a)];
          var segs = {
            1: [left, bot], 2: [bot, right], 3: [left, right], 4: [top, right], 5: [left, top, bot, right],
            6: [top, bot], 7: [left, top], 8: [left, top], 9: [top, bot], 10: [left, bot, top, right],
            11: [top, right], 12: [left, right], 13: [bot, right], 14: [left, bot]
          }[code];
          for (var s = 0; s < segs.length; s += 2) { ctx.moveTo(segs[s][0], segs[s][1]); ctx.lineTo(segs[s + 1][0], segs[s + 1][1]); }
        }
      }
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  function tri() {
    ctx.beginPath(); ctx.moveTo(V[0][0], V[0][1]); ctx.lineTo(V[1][0], V[1][1]); ctx.lineTo(V[2][0], V[2][1]); ctx.closePath();
  }
  function label(text, x, y, align) {
    ctx.textAlign = align;
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.strokeText(text, x, y);
    ctx.fillStyle = '#1d3f3c'; ctx.fillText(text, x, y);
  }
  function circle(b, r, fill, stroke, lw) {
    var p = toXY(b);
    ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 2 * Math.PI);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke();
  }

  function draw() {
    var key = docs.length + ':' + ghost.map(function (x) { return x.toFixed(4); }).join();
    if (!dirty && key === last) return;
    dirty = false; last = key;
    computeField();
    ctx.clearRect(0, 0, W, H);
    ctx.save(); tri(); ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(raster, 0, 0, W, H);
    contours();
    ctx.restore();
    tri(); ctx.strokeStyle = '#222'; ctx.lineWidth = 1.2; ctx.stroke();

    ctx.font = '18px "Source Serif 4", Georgia, serif';
    label('A', V[0][0], V[0][1] - 10, 'center');
    label('B', V[1][0] - 8, V[1][1] + 20, 'center');
    label('C', V[2][0] + 8, V[2][1] + 20, 'center');

    docs.forEach(function (d) { circle(d, 4.5, 'rgba(255,255,255,0.95)', '#222', 1.3); });
    circle(ghost, 5.5, 'rgba(255,255,255,0.6)', '#1f6f6a', 1.6);

    ctx.font = 'italic 17px "Source Serif 4", Georgia, serif';
    label('p(du)', (V[0][0] + V[2][0]) / 2 + 16, (V[0][1] + V[2][1]) / 2, 'left');
  }

  function tick(now) {
    if (!pointer) {
      var s = (now - t0) / 1000, c = 0.24;
      var b = [1 / 3 + c * Math.sin(s * 0.29), 1 / 3 + c * Math.sin(s * 0.21 + 2.1), 0];
      b[2] = 1 - b[0] - b[1];
      target = clampB(b, 0.06);
    }
    for (var i = 0; i < 3; i++) ghost[i] += (target[i] - ghost[i]) * 0.1;
    draw();
    if (running) raf = requestAnimationFrame(tick);
  }

  function at(e) {
    var r = canvas.getBoundingClientRect();
    return bary(e.clientX - r.left, e.clientY - r.top);
  }
  function inside(b) { return b[0] > -0.04 && b[1] > -0.04 && b[2] > -0.04; }

  canvas.addEventListener('pointermove', function (e) {
    var b = at(e);
    if (!inside(b)) { pointer = false; return; }
    pointer = true; target = clampB(b, 0.03);
    if (reduce) { ghost = target.slice(); draw(); }
  });
  canvas.addEventListener('pointerleave', function () { pointer = false; t0 = performance.now(); });
  canvas.addEventListener('click', function (e) {
    var b = at(e);
    if (!inside(b)) return;
    docs.push(clampB(b, 0.03));
    if (docs.length > MAXDOCS) docs.splice(START.length, 1);
    dirty = true; draw();
  });
  canvas.addEventListener('dblclick', function (e) {
    e.preventDefault();
    docs = START.map(function (d) { return d.slice(); });
    dirty = true; draw();
  });
  window.addEventListener('resize', function () { size(); draw(); });

  size();
  draw();

  var running = false, raf = 0;
  function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(tick); } }
  function stop() { running = false; cancelAnimationFrame(raf); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }).observe(canvas);
  } else {
    start();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { dirty = true; draw(); });
})();
