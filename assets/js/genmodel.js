// After Lavrenko's generative model for image annotation: a hidden theta (one training image)
// generates both its words w and its region features g, which render as regions r.
// Clicking a region panel changes it; the words on the left are
//   P(w | r1 r2 r3) = sum_J P(w|J) P(J | r1 r2 r3),
// a posterior-weighted blend of the training captions.
(function () {
  var canvas = document.getElementById('genmodel');
  if (!canvas || !canvas.getContext || canvas.closest('[hidden]')) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var KINDS = ['sky', 'sun', 'stripes', 'grass', 'water', 'sand'];
  var TRAIN = [
    { g: ['stripes', 'grass', 'grass'], w: ['tiger', 'cat', 'grass'] },
    { g: ['stripes', 'water', 'grass'], w: ['tiger', 'water'] },
    { g: ['stripes', 'sand', 'sky'], w: ['tiger', 'cat'] },
    { g: ['sun', 'sky', 'sand'], w: ['sun', 'beach', 'sky'] },
    { g: ['sun', 'sky', 'grass'], w: ['sun', 'field', 'grass'] },
    { g: ['sky', 'water', 'water'], w: ['sea', 'sky'] },
    { g: ['sky', 'grass', 'grass'], w: ['field', 'grass', 'sky'] },
    { g: ['sand', 'water', 'sky'], w: ['beach', 'sea'] }
  ];
  var LG = 0.7, LW = 0.8;  // Jelinek-Mercer weights on the per-image estimates

  var VW = 480, VH = 360, YS = [90, 180, 270], TX = 200, TY = 180;
  var WX = 104, GX = 290, RX = 360, PX = 404, PS = 58;
  var regions = ['sky', 'stripes', 'grass'];
  var pw = {}, shown = {}, top3 = [];
  var W, H, dpr, hover = -1, dirty = true;
  var lastTouch = -1e9, lastAuto = 0;

  function counts(list) {
    var c = {};
    list.forEach(function (x) { c[x] = (c[x] || 0) + 1; });
    return c;
  }
  function background(key) {
    var all = [].concat.apply([], TRAIN.map(function (t) { return t[key]; })), c = counts(all);
    for (var k in c) c[k] /= all.length;
    return c;
  }
  var bgG = background('g'), bgW = background('w');

  function infer() {
    var logp = TRAIN.map(function (t) {
      var c = counts(t.g);
      return regions.reduce(function (a, g) { return a + Math.log(LG * (c[g] || 0) / t.g.length + (1 - LG) * bgG[g]); }, 0);
    });
    var m = Math.max.apply(null, logp), z = 0;
    var post = logp.map(function (l) { var e = Math.exp(l - m); z += e; return e; });
    for (var w in bgW) pw[w] = 0;
    TRAIN.forEach(function (t, j) {
      var c = counts(t.w);
      for (var w in pw) pw[w] += post[j] / z * (LW * (c[w] || 0) / t.w.length + (1 - LW) * bgW[w]);
    });
    top3 = Object.keys(pw).sort(function (a, b) { return pw[b] - pw[a]; }).slice(0, 3);
    for (w in pw) if (!(w in shown) || reduce) shown[w] = pw[w];
    dirty = true;
  }

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    dirty = true;
  }

  function arrow(x1, y1, r1, x2, y2, r2, lw, col) {
    var dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    var ax = x1 + ux * r1, ay = y1 + uy * r1, bx = x2 - ux * r2, by = y2 - uy * r2, h = 5 + lw * 0.8;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx - ux * h * 0.8, by - uy * h * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx, by);
    ctx.lineTo(bx - ux * h - uy * h * 0.5, by - uy * h + ux * h * 0.5);
    ctx.lineTo(bx - ux * h + uy * h * 0.5, by - uy * h - ux * h * 0.5);
    ctx.closePath(); ctx.fill();
  }
  function node(x, y, r, name, sub) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.lineWidth = 1.4; ctx.strokeStyle = '#222'; ctx.stroke();
    ctx.fillStyle = '#222'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var big = sub ? 18 : 26;
    ctx.font = 'italic ' + big + 'px "Source Serif 4", Georgia, serif';
    ctx.fillText(name, x - (sub ? 3 : 0), y - 1);
    if (sub) { ctx.font = '12px "Source Serif 4", Georgia, serif'; ctx.fillText(sub, x + 6, y + 6); }
  }
  function small(text, x, y, align) {
    ctx.font = 'italic 12px "Source Serif 4", Georgia, serif';
    ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#5c6266';
    ctx.fillText(text, x, y);
  }

  // Sand dots at fixed positions so the texture does not flicker between frames.
  var DOTS = [[.15, .2], [.4, .12], [.7, .25], [.85, .55], [.3, .5], [.55, .45], [.12, .78], [.45, .82], [.72, .75], [.9, .9], [.25, .95], [.62, .6]];
  function region(kind, x, y, s) {
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, s, s); ctx.clip();
    var bg = { sky: '#cfe3ee', sun: '#cfe3ee', stripes: '#e8923a', grass: '#9cc65a', water: '#4f8db3', sand: '#ecd8a2' }[kind];
    ctx.fillStyle = bg; ctx.fillRect(x, y, s, s);
    var i;
    if (kind === 'sky') {
      ctx.fillStyle = '#fff';
      [[.3, .35, .2], [.68, .6, .24]].forEach(function (c) {
        ctx.beginPath(); ctx.ellipse(x + c[0] * s, y + c[1] * s, c[2] * s, c[2] * s * 0.4, 0, 0, 2 * Math.PI); ctx.fill();
      });
    } else if (kind === 'sun') {
      ctx.fillStyle = '#f0b53c';
      ctx.beginPath(); ctx.arc(x + s / 2, y + s / 2, s * 0.22, 0, 2 * Math.PI); ctx.fill();
    } else if (kind === 'stripes') {
      ctx.strokeStyle = '#2a1d12'; ctx.lineWidth = s * 0.08;
      for (i = 0; i < 7; i++) {
        ctx.beginPath(); ctx.moveTo(x + i * s * 0.24, y); ctx.lineTo(x + i * s * 0.24 - s * 0.45, y + s); ctx.stroke();
      }
    } else if (kind === 'grass') {
      ctx.strokeStyle = '#3f7a2c'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
      for (i = 0; i < 8; i++) {
        var bx = x + (i + 0.5) * s / 8;
        ctx.beginPath(); ctx.moveTo(bx, y + s); ctx.quadraticCurveTo(bx + (i % 2 ? 4 : -4), y + s * 0.6, bx + (i % 3 - 1) * 5, y + s * (0.2 + (i % 3) * 0.1)); ctx.stroke();
      }
    } else if (kind === 'water') {
      ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.4;
      for (i = 0; i < 4; i++) {
        var wy = y + (i + 0.6) * s / 4.3;
        ctx.beginPath(); ctx.moveTo(x, wy);
        for (var k = 0; k < 4; k++) ctx.quadraticCurveTo(x + (k + 0.25) * s / 4, wy + (k % 2 ? 3 : -3), x + (k + 0.5) * s / 4, wy), ctx.quadraticCurveTo(x + (k + 0.75) * s / 4, wy + (k % 2 ? -3 : 3), x + (k + 1) * s / 4, wy);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = '#b99a5a';
      DOTS.forEach(function (d) { ctx.beginPath(); ctx.arc(x + d[0] * s, y + d[1] * s, 1.4, 0, 2 * Math.PI); ctx.fill(); });
    }
    ctx.restore();
  }

  function draw() {
    if (!dirty) return;
    dirty = false;
    var k = W / VW;
    ctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
    ctx.clearRect(0, 0, VW, VH);

    top3.forEach(function (w, i) {
      arrow(TX, TY, 22, WX, YS[i], 17, 0.8 + 14 * shown[w], 'rgba(31, 111, 106, 0.85)');
    });
    YS.forEach(function (y, i) {
      arrow(TX, TY, 22, GX, y, 17, 1.2, '#222');
      arrow(GX, y, 17, RX, y, 17, 1.2, '#222');
      arrow(PX, y, 0, RX, y, 17, 0.8, '#5c6266');
    });

    node(TX, TY, 22, 'θ');
    YS.forEach(function (y, i) {
      node(WX, y, 17, 'w', String(i + 1));
      node(GX, y, 17, 'g', String(i + 1));
      node(RX, y, 17, 'r', String(i + 1));
      region(regions[i], PX, y - PS / 2, PS);
      ctx.lineWidth = hover === i ? 2.4 : 1;
      ctx.strokeStyle = hover === i ? '#1f6f6a' : '#222';
      ctx.strokeRect(PX, y - PS / 2, PS, PS);
    });

    top3.forEach(function (w, i) {
      ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#222'; ctx.font = '17px "Noto Sans", "Helvetica Neue", sans-serif';
      ctx.fillText(w, WX - 26, YS[i] + 2);
      ctx.fillStyle = '#5c6266'; ctx.font = '12px "Noto Sans", "Helvetica Neue", sans-serif';
      ctx.fillText(shown[w].toFixed(2).replace(/^0/, ''), WX - 26, YS[i] + 18);
    });

    small('P(w|θ)', 150, 118, 'left');
    small('P(g|θ)', 254, 152, 'left');
    small('P(r|g)', (GX + RX) / 2, 64, 'center');
    small('θ ~ p(θ | r₁ r₂ r₃)', TX, 305, 'center');
  }

  function cycle(i) {
    regions[i] = KINDS[(KINDS.indexOf(regions[i]) + 1) % KINDS.length];
    infer(); draw();
  }

  function tick(now) {
    if (now - lastTouch > 6000 && now - lastAuto > 2600) {
      lastAuto = now;
      var i = Math.floor(Math.random() * 3), next;
      do { next = KINDS[Math.floor(Math.random() * KINDS.length)]; } while (next === regions[i]);
      regions[i] = next; infer();
    }
    for (var w in pw) {
      var d = pw[w] - shown[w];
      if (Math.abs(d) > 1e-4) { shown[w] += d * 0.12; dirty = true; }
    }
    draw();
    if (running) raf = requestAnimationFrame(tick);
  }

  function panelAt(e) {
    var r = canvas.getBoundingClientRect(), k = VW / r.width;
    var x = (e.clientX - r.left) * k, y = (e.clientY - r.top) * k;
    for (var i = 0; i < 3; i++) if (x >= PX - 4 && x <= PX + PS + 4 && Math.abs(y - YS[i]) <= PS / 2 + 4) return i;
    return -1;
  }
  canvas.addEventListener('pointermove', function (e) {
    var h = panelAt(e);
    canvas.style.cursor = h < 0 ? 'default' : 'pointer';
    if (h !== hover) { hover = h; dirty = true; draw(); }
  });
  canvas.addEventListener('pointerleave', function () { hover = -1; dirty = true; draw(); });
  canvas.addEventListener('click', function (e) {
    var i = panelAt(e);
    if (i < 0) return;
    lastTouch = performance.now();
    cycle(i);
  });
  canvas.addEventListener('keydown', function (e) {
    var i = ['1', '2', '3'].indexOf(e.key);
    if (i < 0) return;
    lastTouch = performance.now();
    cycle(i);
  });
  window.addEventListener('resize', function () { size(); draw(); });

  infer();
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
