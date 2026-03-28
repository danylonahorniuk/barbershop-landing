const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

// ===== ПЛАВНИЙ СКРОЛ =====
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    const headerHeight = header.offsetHeight;
    const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop - headerHeight - 10,
      behavior: 'smooth'
    });
  });
});

// ===== ACTIVE LINK =====
window.addEventListener('scroll', () => {
  let currentSection = '';

  const headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 20;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});