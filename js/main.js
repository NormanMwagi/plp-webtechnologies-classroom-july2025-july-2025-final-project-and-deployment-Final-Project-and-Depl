// main.js - nav toggle, animations, form handlers
document.addEventListener('DOMContentLoaded', () => {
  // insert dynamic year
  const years = [document.getElementById('year'), document.getElementById('year2'), document.getElementById('year3'), document.getElementById('year4')];
  years.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // Mobile nav toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'block';
    });
  }

  // IntersectionObserver for fade-in
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Toggle "read more"
  document.querySelectorAll('.toggle-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('aria-controls');
      const target = document.getElementById(id);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (target) {
        target.hidden = expanded;
      }
    });
  });

  // Self-check quick result (resources.html)
  const checkBtn = document.getElementById('checkBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      const form = document.getElementById('selfCheck');
      const checked = Array.from(form.querySelectorAll('input[type=checkbox]')).filter(i=>i.checked).length;
      const result = document.getElementById('result');
      result.hidden = false;
      if (checked === 0) {
        result.textContent = 'Low risk indicated — monitor, set limits if desired.';
      } else if (checked === 1) {
        result.textContent = 'Some concerns — consider self-help strategies and monitor.';
      } else {
        result.textContent = 'Significant concerns — consider reaching out to a therapist or local health service.';
      }
    });
  }

  // Contact form validation (contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const msg = document.getElementById('message');
      const status = document.getElementById('contactStatus');
      if (!msg.value || msg.value.trim().length < 10) {
        status.textContent = 'Please provide a longer message (at least 10 characters).';
        status.style.color = 'crimson';
        return;
      }
      // Simulate success (no backend)
      status.textContent = 'Thanks — your message was recorded locally (demo). For real contact, connect to a backend service.';
      status.style.color = 'green';
      contactForm.reset();
    });
  }
});
