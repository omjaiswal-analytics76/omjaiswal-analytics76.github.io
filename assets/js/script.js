const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('hidden') === false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

const closeMenu = () => {
  menu.classList.add('hidden');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

document.querySelectorAll('#menu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (window.innerWidth < 768 && !menu.classList.contains('hidden') && !menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMenu();
});

document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.getElementById('progress');
const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const body = encodeURIComponent(`Hello Om Prakash,\n\nName: ${formData.get('name')}\nEmail: ${formData.get('email')}\nSubject: ${formData.get('subject')}\n\nMessage:\n${formData.get('message')}`);
  formStatus.textContent = 'Opening WhatsApp…';
  window.open(`https://wa.me/919899072076?text=${body}`, '_blank', 'noopener,noreferrer');
});
