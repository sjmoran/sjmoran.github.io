(function () {
  function wireFilter(bar) {
    var targetSel = bar.getAttribute('data-filter-target');
    if (!targetSel) return;
    var target = document.querySelector(targetSel);
    if (!target) return;

    var input = bar.querySelector('input[type="search"]');
    var chips = bar.querySelectorAll('.chip');
    var entries = target.querySelectorAll('.entry');

    var state = { q: '', status: 'all' };

    function apply() {
      var q = state.q.trim().toLowerCase();
      entries.forEach(function (e) {
        var text = (e.dataset.text || e.textContent).toLowerCase();
        var status = e.dataset.status || 'other';
        var matchesQ = !q || text.indexOf(q) !== -1;
        var matchesS =
          state.status === 'all' ||
          (state.status === 'granted' && status === 'granted') ||
          (state.status === 'application' && status === 'application') ||
          (state.status === 'conf' && (status === 'conf' || status === 'granted'));
        e.classList.toggle('is-hidden', !(matchesQ && matchesS));
      });
    }

    if (input) {
      input.addEventListener('input', function (ev) {
        state.q = ev.target.value;
        apply();
      });
    }

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
        state.status = c.dataset.status || 'all';
        apply();
      });
    });
  }

  document.querySelectorAll('.filter-bar[data-filter-target]').forEach(wireFilter);

  // Email deobfuscator — reconstructs address only at runtime.
  // Keeps "sean.j.moran@gmail.com" out of the rendered HTML so naive scrapers can't grep it.
  document.querySelectorAll('a.js-email').forEach(function (el) {
    var u = el.getAttribute('data-u');
    var d = el.getAttribute('data-d');
    if (!u || !d) return;
    var addr = u + String.fromCharCode(64) + d;
    el.textContent = addr;
    var s = el.getAttribute('data-s');
    var subj = s ? '?subject=' + encodeURIComponent(s) : '';
    el.setAttribute('href', 'mailto:' + addr + subj);
  });
})();
