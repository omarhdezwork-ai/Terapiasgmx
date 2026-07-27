document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navLinks = document.querySelectorAll('.nav-links a');

  var WHATSAPP_LINK = 'https://wa.me/525655200783';
  var INSTAGRAM_LINK = 'https://www.instagram.com/terapias_g_mx';
  var FACEBOOK_LINK = 'https://www.facebook.com/profile.php?id=61575790610442';

  document.querySelectorAll('[data-whatsapp-link]').forEach(function (link) {
    link.setAttribute('href', WHATSAPP_LINK);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  function applySocialLink(selector, url) {
    document.querySelectorAll(selector).forEach(function (link) {
      if (url && url !== '#') {
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      } else {
        link.addEventListener('click', function (event) {
          event.preventDefault();
        });
      }
    });
  }

  applySocialLink('[data-instagram-link]', INSTAGRAM_LINK);
  applySocialLink('[data-facebook-link]', FACEBOOK_LINK);

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

  document.querySelectorAll('[data-testimonial-carousel]').forEach(function (carousel) {
    var cards = Array.prototype.slice.call(carousel.querySelectorAll('.testimonial-card'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-testimonial-dot]'));
    var prev = carousel.querySelector('[data-testimonial-prev]');
    var next = carousel.querySelector('[data-testimonial-next]');
    var activeIndex = 0;
    var timer;

    function showTestimonial(index) {
      if (!cards.length) return;
      activeIndex = (index + cards.length) % cards.length;
      cards.forEach(function (card, cardIndex) {
        card.classList.toggle('is-active', cardIndex === activeIndex);
      });
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
      });
    }

    function restartTimer() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        showTestimonial(activeIndex + 1);
      }, 6500);
    }

    if (prev) {
      prev.addEventListener('click', function () {
        showTestimonial(activeIndex - 1);
        restartTimer();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        showTestimonial(activeIndex + 1);
        restartTimer();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        showTestimonial(Number(dot.getAttribute('data-testimonial-dot')));
        restartTimer();
      });
    });

    showTestimonial(0);
    restartTimer();
  });

  document.querySelectorAll('[data-testimonial-rotator]').forEach(function (rotator) {
    var cards = Array.prototype.slice.call(rotator.querySelectorAll('.testimonial-card'));
    var section = rotator.closest('.testimonials-section');
    var dotsWrap = section ? section.querySelector('.testimonial-dots') : null;
    var dots = section ? Array.prototype.slice.call(section.querySelectorAll('[data-rotator-dot]')) : [];
    var prev = section ? section.querySelector('[data-rotator-prev]') : null;
    var next = section ? section.querySelector('[data-rotator-next]') : null;
    var activeIndex = Math.min(1, Math.max(cards.length - 1, 0));
    var timer;

    if (dotsWrap && dots.length !== cards.length) {
      dotsWrap.innerHTML = '';
      cards.forEach(function (_card, index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('data-rotator-dot', String(index));
        dot.setAttribute('aria-label', 'Ver opinión ' + (index + 1));
        dotsWrap.appendChild(dot);
      });
      dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('[data-rotator-dot]'));
    }

    function setRotator(index) {
      if (!cards.length) return;
      activeIndex = (index + cards.length) % cards.length;
      var leftIndex = (activeIndex - 1 + cards.length) % cards.length;
      var rightIndex = (activeIndex + 1) % cards.length;

      cards.forEach(function (card, cardIndex) {
        card.classList.remove('is-left', 'is-center', 'is-right', 'is-hidden');
        if (cardIndex === activeIndex) {
          card.classList.add('is-center');
        } else if (cardIndex === leftIndex) {
          card.classList.add('is-left');
        } else if (cardIndex === rightIndex) {
          card.classList.add('is-right');
        } else {
          card.classList.add('is-hidden');
        }
      });

      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
      });
    }

    function restartRotator() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        setRotator(activeIndex + 1);
      }, 5200);
    }

    if (prev) {
      prev.addEventListener('click', function () {
        setRotator(activeIndex - 1);
        restartRotator();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        setRotator(activeIndex + 1);
        restartRotator();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        setRotator(Number(dot.getAttribute('data-rotator-dot')));
        restartRotator();
      });
    });

    setRotator(activeIndex);
    restartRotator();
  });

  document.querySelectorAll('.service-benefits-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('.service-card');
      if (!card) return;

      var isShowingBenefits = card.classList.toggle('is-showing-benefits');
      var benefits = card.querySelector('.service-benefit-copy');
      button.setAttribute('aria-pressed', String(isShowingBenefits));
      button.textContent = isShowingBenefits ? 'Descripción' : 'Beneficios';
      if (benefits) benefits.setAttribute('aria-hidden', String(!isShowingBenefits));
    });
  });

  var galleryImages = [
    { src: 'assets/images/gallery-session-01.jpeg', alt: 'Auriculoterapia en sesión' },
    { src: 'assets/images/gallery-session-02.jpeg', alt: 'Terapia física en consultorio' },
    { src: 'assets/images/gallery-session-03.jpeg', alt: 'Ventosaterapia en pie' },
    { src: 'assets/images/gallery-session-04.jpeg', alt: 'Ventosaterapia corporal' },
    { src: 'assets/images/gallery-session-05.jpeg', alt: 'Biomagnetismo en sesión' },
    { src: 'assets/images/gallery-session-06.jpeg', alt: 'Electroterapia en sesión' }
  ];

  galleryImages.forEach(function (item) {
    var preload = new Image();
    preload.src = item.src;
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-gallery-rotator]').forEach(function (image, imageIndex) {
      var activeIndex = Number(image.getAttribute('data-gallery-offset') || imageIndex) % galleryImages.length;
      var interval = 7600 + (imageIndex * 900);

      function changeGalleryImage() {
        activeIndex = (activeIndex + 1) % galleryImages.length;
        var nextImage = galleryImages[activeIndex];
        image.classList.add('is-gallery-changing');
        window.setTimeout(function () {
          image.addEventListener('load', function handleLoad() {
            image.removeEventListener('load', handleLoad);
            window.setTimeout(function () {
              image.classList.remove('is-gallery-changing');
            }, 180);
          });
          image.src = nextImage.src;
          image.alt = nextImage.alt;
          if (image.complete) {
            window.setTimeout(function () {
              image.classList.remove('is-gallery-changing');
            }, 420);
          }
        }, 720);
      }

      window.setTimeout(function () {
        changeGalleryImage();
        window.setInterval(changeGalleryImage, interval);
      }, imageIndex * 1400);
    });
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

