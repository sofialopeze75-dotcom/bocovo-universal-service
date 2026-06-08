// ============ HEADER SCROLL ============
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ============ MOBILE NAV ============
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // ============ SCROLL REVEAL ============
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ============ COUNTER ANIMATION ============
  const counters = document.querySelectorAll('[data-counter]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // ============ FAQ ACCORDION ============
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ============ CONTACT FORM ============
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const text = encodeURIComponent(
        `Bonjour, je vous contacte depuis votre site web.\n\n` +
        `📋 *Service souhaité :* ${data.get('service') || 'Non précisé'}\n` +
        `👤 *Prénom :* ${data.get('prenom')}\n` +
        `👤 *Nom :* ${data.get('nom')}\n` +
        `📧 *Email :* ${data.get('email')}\n` +
        `📞 *Téléphone :* ${data.get('telephone')}\n\n` +
        `💬 *Message :*\n${data.get('message')}`
      );
      window.open(`https://wa.me/2290161315072?text=${text}`, '_blank');
      const msg = document.querySelector('.form-message');
      if (msg) { msg.className = 'form-message success'; msg.textContent = '✓ WhatsApp va s\'ouvrir avec votre message. Nous vous répondrons dans les plus brefs délais.'; }
      form.reset();
    });
  }

  // ============ CURRENT YEAR ============
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
