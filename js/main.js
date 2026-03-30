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


const revealElements = document.querySelectorAll(
  '.about, .services, .why-legion, .space-gallery, .locations, .masters, .reviews, .booking'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach((section) => {
  section.classList.add('reveal');
  observer.observe(section);
});

const staggerElements = document.querySelectorAll(`
  .service-card,
  .why-legion__item,
  .space-gallery__item,
  .location-card,
  .master-card,
  .review-card,
  .booking-contact
`);

staggerElements.forEach((el, index) => {
  el.classList.add('reveal');

  const mod = index % 3;
  if (mod === 0) el.classList.add('reveal-delay-1');
  if (mod === 1) el.classList.add('reveal-delay-2');
  if (mod === 2) el.classList.add('reveal-delay-3');

  observer.observe(el);
});