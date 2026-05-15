/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 900);
});

/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Custom Cursor ===== */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
});
function animateRing() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a, button, .g-item, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ===== Petals ===== */
const petalsBox = document.getElementById('petals');
const petalColors = ['#FFC4C4', '#EE6983', '#FFD8D8'];
for (let i = 0; i < 14; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.background = petalColors[i % petalColors.length];
  p.style.animationDuration = (8 + Math.random() * 10) + 's';
  p.style.animationDelay = (Math.random() * 8) + 's';
  p.style.opacity = 0.4 + Math.random() * 0.5;
  p.style.transform = `scale(${0.6 + Math.random() * 1.2})`;
  petalsBox.appendChild(p);
}

/* ===== Particles in hero ===== */
const partBox = document.getElementById('particles');
for (let i = 0; i < 35; i++) {
  const s = document.createElement('div');
  s.className = 'particle';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDuration = (5 + Math.random() * 8) + 's';
  s.style.animationDelay = (Math.random() * 6) + 's';
  s.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
  partBox.appendChild(s);
}

/* ===== Typing effect ===== */
const phrases = [
  "Content Writer ✦",
  "Photo Editor ✦",
  "Video Editor ✦",
  "Storyteller in frames ✦"
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typedEl.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 90); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 40); }
  else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(type, deleting ? 1400 : 400);
  }
}
type();

/* ===== Navbar ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('active'); navLinks.classList.remove('open');
}));

/* ===== Reveal on scroll + skill bars ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll && e.target.querySelectorAll('.bar').forEach(b => b.classList.add('animate'));
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== Lightbox ===== */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbDesc = document.getElementById('lbDesc');
document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('click', () => {
    lbImg.src = item.dataset.img;
    lbDesc.textContent = item.dataset.desc || '';
    lb.classList.add('open');
  });
});
document.getElementById('lbClose').addEventListener('click', () => lb.classList.remove('open'));
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });

/* ===== Music toggle ===== */
const music = document.getElementById('bgMusic');
const mBtn = document.getElementById('musicToggle');
music.volume = 0.4;
mBtn.addEventListener('click', () => {
  if (music.paused) { music.play().then(() => mBtn.classList.add('playing')).catch(() => {}); }
  else { music.pause(); mBtn.classList.remove('playing'); }
});

/* ===== Contact form ===== */
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  msg.textContent = 'sending your words into the wind...';
  setTimeout(() => {
    msg.textContent = '✿ thank you — your message has landed softly.';
    form.reset();
  }, 1100);
});
