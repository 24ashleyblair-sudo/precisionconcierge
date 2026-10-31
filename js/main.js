// Precision Concierge - site interactions
(function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? '✕' : '☰';
    });
  }

  // FAQ accordion (one open at a time, keyboard accessible)
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        var a = item.querySelector('.faq-a');
        a.style.maxHeight = a.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Hide broken images so the gold-framed placeholder shows instead
  document.querySelectorAll('.frame img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  // Pre-select service type from URL (?service=unpacking etc.)
  var params = new URLSearchParams(location.search);
  var svc = params.get('service');
  var sel = document.getElementById('service');
  if (svc && sel) {
    Array.prototype.forEach.call(sel.options, function (o) { if (o.value === svc) sel.value = svc; });
  }

  // Quote form
  // HOW IT WORKS: If FORM_ENDPOINT is set (Formspree, GoHighLevel webhook, etc.),
  // the form posts there. If left blank, it opens the visitor's email app
  // with everything pre-filled so no lead is ever lost.
  var FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxx'
  var TO_EMAIL = 'info@precisionconciergeservice.com';
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var extras = data.getAll('specialty').join(', ') || 'None listed';
      var success = document.querySelector('.form-success');

      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(); form.reset(); success.style.display = 'block'; })
          .catch(function () { alert('Something went wrong. Please call us at (561) 386-3940.'); });
        return;
      }

      var body = [
        'Name: ' + data.get('name'),
        'Email: ' + data.get('email'),
        'Phone: ' + data.get('phone'),
        'Service: ' + data.get('service'),
        'Moving from (city): ' + (data.get('from_city') || ''),
        'Moving to (city): ' + (data.get('to_city') || ''),
        'Home / office size: ' + (data.get('size') || ''),
        'Target move date: ' + (data.get('date') || ''),
        'Specialty items: ' + extras,
        '',
        'Details:',
        data.get('details') || ''
      ].join('\n');
      window.location.href = 'mailto:' + TO_EMAIL +
        '?subject=' + encodeURIComponent('Consultation Request - ' + data.get('name')) +
        '&body=' + encodeURIComponent(body);
      success.style.display = 'block';
    });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
