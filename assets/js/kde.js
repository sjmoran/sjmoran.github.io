// Sampling a region from P(g|J) in the Continuous Relevance Model: P(g|J) is the average of a
// Gaussian bump on each of training image J's region feature vectors. A draw picks one of J's
// regions uniformly, then adds N(0, sigma^2) noise. Idle, it draws one region at a time; a click
// draws one now; the slider sets sigma; double-click clears.
(function () {
  var canvas = document.getElementById('kde');
  if (!canvas || !canvas.getContext || canvas.closest('[hidden]')) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slider = document.getElementById('kde-sigma'), sigmaOut = document.getElementById('kde-sigma-val');

  var REG = [
    { name: 'g₁', what: 'stripes', x: 0.25, y: 0.78 },
    { name: 'g₂', what: 'grass', x: 0.78, y: 0.22 },
    { name: 'g₃', what: 'grass', x: 0.66, y: 0.36 }
  ];
  var VW = 480, VH = 360, L = 46, R = 466, T = 40, B = 318;
  var MAX = 400, EVERY = 650, ANIM = 450;
  var sigma = +(slider && slider.value) || 0.07, samples = [], last = null;
  var W, H, dpr, shade = null, dirty = true, lastAuto = 0;

  function gauss() { var u = 1 - Math.random(), v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function sx(x) { return L + x * (R - L); }
  function sy(y) { return B - y * (B - T); }

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    dirty = true;
  }

  // The density itself, rasterised once per sigma.
  function shadeField() {
    var n = 96, c = document.createElement('canvas');
    c.width = c.height = n;
    var g = c.getContext('2d'), img = g.createImageData(n, n);
    for (var j = 0; j < n; j++) for (var i = 0; i < n; i++) {
      var x = (i + 0.5) / n, y = 1 - (j + 0.5) / n, d = 0;
      REG.forEach(function (r) { var dx = x - r.x, dy = y - r.y; d += Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma)); });
      d /= 3;
      var p = (j * n + i) * 4;
      img.data[p] = 31; img.data[p + 1] = 111; img.data[p + 2] = 106; img.data[p + 3] = Math.round(150 * Math.min(1, d));
    }
    g.putImageData(img, 0, 0);
    shade = c;
  }

  function draw(now) {
    if (!dirty) return;
    dirty = false;
    now = now || performance.now();
    var k = W / VW;
    ctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
    ctx.clearRect(0, 0, VW, VH);
    if (!shade) shadeField();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(shade, L, T, R - L, B - T);

    ctx.strokeStyle = '#bbb'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
    ctx.fillStyle = '#5c6266'; ctx.font = '13px "Noto Sans", "Helvetica Neue", sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('greenness →', (L + R) / 2, B + 24);
    ctx.save(); ctx.translate(L - 14, (T + B) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('stripiness →', 0, 0); ctx.restore();

    ctx.fillStyle = '#d9622b'; ctx.globalAlpha = 0.5;
    var shown = last ? samples.length - 1 : samples.length;
    for (var i = 0; i < shown; i++) { ctx.beginPath(); ctx.arc(sx(samples[i].x), sy(samples[i].y), 2.2, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;

    if (last) {
      var c = REG[last.k], t = reduce ? 1 : Math.min(1, (now - last.t0) / ANIM), e = 1 - Math.pow(1 - t, 3);
      var px = c.x + last.ex * e, py = c.y + last.ey * e;
      ctx.beginPath(); ctx.arc(sx(c.x), sy(c.y), 11, 0, 7); ctx.strokeStyle = '#1f6f6a'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.strokeStyle = '#d9622b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx(c.x), sy(c.y)); ctx.lineTo(sx(px), sy(py)); ctx.stroke();
      ctx.fillStyle = '#d9622b'; ctx.beginPath(); ctx.arc(sx(px), sy(py), 5, 0, 7); ctx.fill();
      ctx.fillStyle = '#222'; ctx.font = 'italic 14px "Source Serif 4", Georgia, serif'; ctx.textAlign = 'left';
      var f = function (v) { return (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2).replace(/^0/, ''); };
      ctx.fillText('pick ' + c.name + ' (' + c.what + '), add noise (' + f(last.ex) + ', ' + f(last.ey) + ')', L + 6, T - 14);
      if (t < 1) dirty = true;
    }

    REG.forEach(function (r) {
      ctx.beginPath(); ctx.arc(sx(r.x), sy(r.y), 5, 0, 7); ctx.fillStyle = '#222'; ctx.fill();
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'italic 16px "Source Serif 4", Georgia, serif'; ctx.textAlign = 'left';
      ctx.strokeText(r.name + ' ' + r.what, sx(r.x) + 10, sy(r.y) - 8);
      ctx.fillStyle = '#1d3f3c'; ctx.fillText(r.name + ' ' + r.what, sx(r.x) + 10, sy(r.y) - 8);
    });
    ctx.font = 'italic 16px "Source Serif 4", Georgia, serif'; ctx.textAlign = 'right'; ctx.fillStyle = '#1d3f3c';
    ctx.fillText('P(g | J)', R - 4, T + 18);
  }

  function sample(now) {
    var k = Math.floor(Math.random() * 3), c = REG[k], ex = sigma * gauss(), ey = sigma * gauss();
    if (samples.length >= MAX) samples = [];
    last = { k: k, ex: ex, ey: ey, x: c.x + ex, y: c.y + ey, t0: now };
    samples.push(last);
    dirty = true;
  }

  function tick(now) {
    if (now - lastAuto > EVERY) { lastAuto = now; sample(now); }
    draw(now);
    if (running) raf = requestAnimationFrame(tick);
  }

  canvas.addEventListener('click', function () { var n = performance.now(); lastAuto = n; sample(n); draw(n); });
  canvas.addEventListener('dblclick', function (e) { e.preventDefault(); samples = []; last = null; dirty = true; draw(); });
  canvas.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); var n = performance.now(); lastAuto = n; sample(n); draw(n); }
  });
  if (slider) slider.addEventListener('input', function () {
    sigma = +slider.value;
    if (sigmaOut) sigmaOut.textContent = sigma.toFixed(2);
    samples = []; last = null; shade = null; dirty = true; draw();
  });
  window.addEventListener('resize', function () { size(); draw(); });

  size();
  sample(performance.now());
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
