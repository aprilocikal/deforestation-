// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navCenter = document.getElementById('navLinks'); // .nav-center

// Scrolled state
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navCenter.classList.toggle('open');
  });
}

// Close on link click (mobile)
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => navCenter.classList.remove('open'));
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-pill')) navCenter.classList.remove('open');
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navLinks a');

window.addEventListener('scroll', () => {
  let current = 'hero';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href').replace('#', '');
    // Map nav items to sections
    const map = { home: 'hero', introduction: 'ch1', history: 'ch2', analysis: 'ch3', map: 'ch3-map', conclusion: 'ch4' };
    const text = a.textContent.trim().toLowerCase();
    const target = map[text] || href;
    if (target === current) a.classList.add('active');
  });
});

// ===== LANGUAGE TOGGLE =====
const langToggle = document.getElementById('langToggle');
let currentLang = 'en';

if (langToggle) {
  langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      currentLang = currentLang === 'en' ? 'id' : 'en';
      select.value = currentLang;
      select.dispatchEvent(new Event('change'));
      
      // Update button text visually
      langToggle.innerHTML = currentLang === 'en' ? '🌐 ID / EN' : '🌐 EN / ID';
      document.documentElement.lang = currentLang;
    } else {
      console.log('Google Translate not loaded yet');
    }
  });
}

// ===== FADE IN ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      el.textContent = prefix + current.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }) + suffix;
    }, 16);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== IMAGE MODAL =====
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', function() {
    if (!modal) return;
    modal.classList.add('open');
    modalImg.src = this.src;
    const caption = this.nextElementSibling;
    modalCaption.innerHTML = caption ? caption.innerHTML : '';
  });
});

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}
