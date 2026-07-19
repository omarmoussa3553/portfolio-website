/* ============================================================
   Navigation — scroll state, mobile full-screen menu, active link
   ============================================================ */

(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!nav) return;

    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');

    /* scrolled state */
    const setScrolled = () => {
      nav.setAttribute('data-scrolled', window.scrollY > 24 ? 'true' : 'false');
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });

    /* active link */
    const current = document.body.getAttribute('data-page');
    if (current) {
      document.querySelectorAll(`.nav-links a, .mobile-menu a`).forEach(a => {
        if (a.getAttribute('data-page') === current) a.setAttribute('aria-current', 'page');
      });
    }

    /* mobile menu */
    if (toggle && mobileMenu) {
      const open = () => {
        mobileMenu.setAttribute('data-open', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      };
      const close = () => {
        mobileMenu.setAttribute('data-open', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus({ preventScroll: true });
      };
      toggle.addEventListener('click', () => {
        const isOpen = mobileMenu.getAttribute('data-open') === 'true';
        isOpen ? close() : open();
      });
      mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
      document.addEventListener('keydown', (e) => {
        if (mobileMenu.getAttribute('data-open') !== 'true') return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'Tab') {
          const focusable = Array.from(mobileMenu.querySelectorAll('a'));
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
  });
})();
