// ===== MAIN.JS — Funcționalități comune tuturor paginilor =====

// --- Back to Top ---
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Active Nav Link pe pagina curentă ---
(function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

// --- Counter Animat ---
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const step = (timestamp) => {
    if (!el._startTime) el._startTime = timestamp;
    const progress = Math.min((timestamp - el._startTime) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Pornim counterele când sunt vizibile
function initCounters() {
  const counters = document.querySelectorAll('.counter-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target._started) {
        entry.target._started = true;
        animateCounter(entry.target, parseInt(entry.target.dataset.target));
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

initCounters();

// --- Slider Testimoniale simplu ---
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (!slides.length) return;

  let current = 0;

  function show(idx) {
    slides.forEach((s, i) => {
      s.style.display = i === idx ? 'block' : 'none';
    });
  }

  show(0);
  setInterval(() => {
    current = (current + 1) % slides.length;
    show(current);
  }, 4000);
}

initTestimonialSlider();
