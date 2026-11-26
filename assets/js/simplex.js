// Interactive Dirichlet over a three-word vocabulary: estimating a relevance model p(w|R).
// Pointer sets the prior mean; each click adds a feedback document (soft counts),
// so the posterior Dirichlet sharpens around the evidence.
(function () {
  var canvas = document.getElementById('simplex');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PRIOR = 6;        // prior strength: alpha0 = 1 + PRIOR * mean
  var DOC = 5;          // soft counts one feedback document adds
  var MAXDOCS = 12;
  var GRID = 150;       // density raster columns
  var LEVELS = [0.08, 0.2, 0.35, 0.5, 0.65, 0.8, 0.92];
  var STOPS = [[31, 94, 99], [62, 158, 152], [124, 195, 164], [240, 210, 122], [244, 161, 74], [232, 106, 44]];

  var W, H, V, dpr, rw, rh, raster, rctx, img, field;
  var mean = [1 / 3, 1 / 3, 1 / 3], target = mean.slice(), docs = [];
  var pointer = false, t0 = performance.now(), dirty = true, last = '';

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var side = Math.min(W * 0.94, (H - 50) / (Math.sqrt(3) / 2));
    var th = side * Math.sqrt(3) / 2, top = (H - th) / 2 - 2;
    V = [[W / 2, top], [W / 2 - side / 2, top + th], [W / 2 + side / 2, top + th]];
    rw = GRID; rh = Math.round(GRID * H / W);
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

  function alpha() {
    var a = mean.map(function (m) { return 1 + PRIOR * m; });
    docs.forEach(function (d) { for (var k = 0; k < 3; k++) a[k] += DOC * d[k]; });
    return a;
  }
  function modeOf(a) {
    var s = a[0] + a[1] + a[2] - 3;
    return a.map(function (x) { return (x - 1) / s; });
  }

  function computeField(a) {
    var m = modeOf(a), logMax = 0, k;
    for (k = 0; k < 3; k++) logMax += (a[k] - 1) * Math.log(Math.max(m[k], 1e-9));
    var d = img.data;
    for (var j = 0; j < rh; j++) {
      for (var i = 0; i < rw; i++) {
        var b = bary((i + 0.5) * W / rw, (j + 0.5) * H / rh), idx = j * rw + i, p = idx * 4;
        if (b[0] < -0.02 || b[1] < -0.02 || b[2] < -0.02) { field[idx] = -1; d[p + 3] = 0; continue; }
        var lp = 0;
        for (k = 0; k < 3; k++) lp += (a[k] - 1) * Math.log(Math.max(b[k], 1e-6));
        var t = Math.exp(lp - logMax);
        field[idx] = t;
        var c = color(Math.pow(t, 0.55));
        d[p] = c[0]; d[p + 1] = c[1]; d[p + 2] = c[2]; d[p + 3] = 255;
      }
    }
    rctx.putImageData(img, 0, 0);
  }

  // Marching squares over the density field, one path per contour level.
  function contours() {
    var sx = W / rw, sy = H / rh;
    ctx.lineWidth = 0.9;
    LEVELS.forEach(function (L, li) {
      ctx.strokeStyle = li > 3 ? 'rgba(90, 30, 10, 0.32)' : 'rgba(20, 60, 58, 0.30)';
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
  }

  function tri() {
    ctx.beginPath(); ctx.moveTo(V[0][0], V[0][1]); ctx.lineTo(V[1][0], V[1][1]); ctx.lineTo(V[2][0], V[2][1]); ctx.closePath();
  }
  function star(x, y, R, r) {
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var ang = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r : R;
      ctx.lineTo(x + rad * Math.cos(ang), y + rad * Math.sin(ang));
    }
    ctx.closePath();
  }
  function label(text, x, y, align) {
    ctx.textAlign = align;
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.strokeText(text, x, y);
    ctx.fillStyle = '#1d3f3c'; ctx.fillText(text, x, y);
  }

  function draw() {
    var a = alpha(), key = a.map(function (x) { return x.toFixed(4); }).join();
    if (!dirty && key === last) return;
    dirty = false; last = key;
    computeField(a);
    ctx.clearRect(0, 0, W, H);
    ctx.save(); tri(); ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(raster, 0, 0, W, H);
    contours();
    ctx.restore();
    tri(); ctx.strokeStyle = '#1f5e63'; ctx.lineWidth = 1.6; ctx.stroke();

    ctx.font = 'italic 17px "Source Serif 4", Georgia, serif';
    label('w₁', V[0][0], V[0][1] - 10, 'center');
    label('w₂', V[1][0] - 6, V[1][1] + 22, 'center');
    label('w₃', V[2][0] + 6, V[2][1] + 22, 'center');

    docs.forEach(function (d) {
      var p = toXY(d);
      ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#1d3f3c'; ctx.fill();
      ctx.lineWidth = 1.5; ctx.strokeStyle = '#fff'; ctx.stroke();
    });

    var m = toXY(modeOf(a));
    star(m[0], m[1], 12, 5);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.lineWidth = 1.3; ctx.strokeStyle = '#1d3f3c'; ctx.stroke();
    ctx.font = 'italic 16px "Source Serif 4", Georgia, serif';
    label('p(w | R)', Math.min(m[0] + 16, W - 70), m[1] - 12, 'left');

    if (docs.length) {
      ctx.font = '12px "Noto Sans", sans-serif';
      ctx.fillStyle = '#5c6266'; ctx.textAlign = 'left';
      ctx.fillText(docs.length + ' feedback doc' + (docs.length > 1 ? 's' : ''), 4, 16);
      ctx.fillText('double-click to reset', 4, 33);
    }
  }

  function tick(now) {
    if (!pointer) {
      var s = (now - t0) / 1000, c = 0.2;
      var b = [1 / 3 + c * Math.sin(s * 0.27), 1 / 3 + c * Math.sin(s * 0.19 + 2.1), 0];
      b[2] = 1 - b[0] - b[1];
      target = clampB(b, 0.08);
    }
    for (var i = 0; i < 3; i++) mean[i] += (target[i] - mean[i]) * 0.08;
    draw();
    if (running) raf = requestAnimationFrame(tick);
  }

  function at(e) {
    var r = canvas.getBoundingClientRect();
    return bary(e.clientX - r.left, e.clientY - r.top);
  }
  function inside(b) { return b[0] > -0.05 && b[1] > -0.05 && b[2] > -0.05; }

  canvas.addEventListener('pointermove', function (e) {
    var b = at(e);
    if (!inside(b)) { pointer = false; return; }
    pointer = true; target = clampB(b, 0.04);
    if (reduce) { mean = target.slice(); draw(); }
  });
  canvas.addEventListener('pointerleave', function () { pointer = false; t0 = performance.now(); });
  canvas.addEventListener('click', function (e) {
    var b = at(e);
    if (!inside(b)) return;
    docs.push(clampB(b, 0.02));
    if (docs.length > MAXDOCS) docs.shift();
    dirty = true; draw();
  });
  canvas.addEventListener('dblclick', function (e) { e.preventDefault(); docs = []; dirty = true; draw(); });
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
