(() => {
  'use strict';
  const menuButton = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
  const sections = ['features', 'how', 'offline', 'faq']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let scrollPending = false;
  const updateNavigation = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8);
    let current = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) current = section.id;
    }
    for (const link of navLinks) {
      if (link.getAttribute('href') === `#${current}` && current) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
    scrollPending = false;
  };
  window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(updateNavigation);
  }, { passive: true });
  updateNavigation();

  if (menuButton && mobileMenu) {
    const isArabic = document.documentElement.lang === 'ar';
    const close = () => {
      mobileMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', isArabic ? 'فتح القائمة' : 'Open menu');
    };
    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen
        ? (isArabic ? 'إغلاق القائمة' : 'Close menu')
        : (isArabic ? 'فتح القائمة' : 'Open menu'));
    });
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) close();
    });
    matchMedia('(min-width: 821px)').addEventListener('change', (e) => {
      if (e.matches) close();
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
