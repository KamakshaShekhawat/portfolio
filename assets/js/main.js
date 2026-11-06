/* ====================================
   Kamaksha Shekhawat PORTFOLIO - JAVASCRIPT
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  setCurrentYear();
  initScrollSpy();
});

/* --- Header shadow once the page scrolls --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navLinks) return;

  function setOpen(open) {
    menuToggle.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }

  menuToggle.addEventListener('click', () => {
    setOpen(!navLinks.classList.contains('active'));
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      setOpen(false);
      menuToggle.focus();
    }
  });
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

/* --- Set Current Year --- */
function setCurrentYear() {
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* --- Active nav link follows the section in view --- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length === 0) return;

  let ticking = false;

  function update() {
    const marker = window.scrollY + 120;
    let current = sections[0];

    sections.forEach(section => {
      if (section.getBoundingClientRect().top + window.scrollY <= marker) {
        current = section;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }

    links.forEach(link => {
      link.classList.toggle('active-page', link.getAttribute('href') === '#' + current.id);
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}
