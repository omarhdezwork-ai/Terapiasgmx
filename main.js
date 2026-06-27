document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navLinks = document.querySelectorAll('.nav-links a');

  // Cambia este enlace por tu WhatsApp real.
  // Formato recomendado: https://wa.me/521XXXXXXXXXX
  var WHATSAPP_LINK = 'https://wa.me/5215512345678';

  document.querySelectorAll('[data-whatsapp-link]').forEach(function (link) {
    link.setAttribute('href', WHATSAPP_LINK);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      body.classList.remove('menu-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var nombre = form.querySelector('#nombre') ? form.querySelector('#nombre').value.trim() : '';
      var telefono = form.querySelector('#telefono') ? form.querySelector('#telefono').value.trim() : '';
      var interes = form.querySelector('#interes') ? form.querySelector('#interes').value : '';
      var mensaje = form.querySelector('#mensaje') ? form.querySelector('#mensaje').value.trim() : '';
      var texto = 'Hola, soy ' + nombre + '. Me interesa: ' + interes + '. Mi telefono es ' + telefono + '. ' + mensaje;
      var separator = WHATSAPP_LINK.indexOf('?') === -1 ? '?text=' : '&text=';
      window.open(WHATSAPP_LINK + separator + encodeURIComponent(texto), '_blank', 'noopener');
      var note = form.querySelector('.status-note');
      if (note) note.textContent = 'Se abrió WhatsApp con tu mensaje listo para enviar.';
    });
  });
});
