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

  // Keep the address out of the HTML and reveal it only after deliberate interaction.
  document.querySelectorAll('a.js-email').forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      var encoded = [40, 62, 58, 53, 117, 49, 117, 54, 52, 41, 58, 53, 27, 60, 54, 58, 50, 55, 117, 56, 52, 54];
      var addr = encoded.map(function (value) {
        return String.fromCharCode(value ^ 91);
      }).join('');
      var subject = el.getAttribute('data-s');
      window.location.href = 'mailto:' + addr + (subject ? '?subject=' + encodeURIComponent(subject) : '');
    });
  });
})();
