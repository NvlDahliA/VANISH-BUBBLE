const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

menu?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menu.querySelectorAll('i')[0].style.transform = open ? 'translateY(4px) rotate(45deg)' : '';
  menu.querySelectorAll('i')[1].style.transform = open ? 'translateY(-4px) rotate(-45deg)' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menu.querySelectorAll('i').forEach(i => i.style.transform = '');
}));

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
