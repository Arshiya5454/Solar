// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navbarLinks = document.getElementById('navbarLinks');

menuToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.navbar__links a').forEach(link => {
  link.addEventListener('click', () => {
    navbarLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== STICKY NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

console.log('☀️ برق‌آوران هوراد | Solar Energy Solutions');