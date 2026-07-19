/* ============================================================
   Motion — shared animation utilities
   Reduced-motion aware. Uses GSAP + ScrollTrigger (loaded via CDN)
   and Lenis for smooth scroll. Falls back silently if libs are absent.
   ============================================================ */

(function(){
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = mql.matches;
  if (reduced) document.documentElement.classList.add('reduced-motion');

  const hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* Smooth scrolling uses the native CSS `scroll-behavior: smooth` (see base.css)
     rather than a scroll-hijacking JS library — it's lighter, respects
     prefers-reduced-motion automatically, and never fights the browser's own
     scroll handling (keyboard, screen readers, trackpad momentum). */

  /* ---------------- Scroll reveal ---------------- */
  function initReveal(){
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (reduced || !hasGSAP) {
      items.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }

    items.forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  /* ---------------- Hero entrance (run immediately, not scroll-linked) ---------------- */
  function initHeroEntrance(){
    const hero = document.querySelector('[data-hero-entrance]');
    if (!hero) return;
    const lines = hero.querySelectorAll('[data-hero-line]');
    if (reduced || !hasGSAP) {
      lines.forEach(l => { l.style.opacity = 1; l.style.transform = 'none'; });
      return;
    }
    gsap.set(lines, { opacity: 0, y: '110%' });
    gsap.to(lines, {
      opacity: 1, y: '0%', duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.5
    });
    const meta = hero.querySelectorAll('[data-hero-meta]');
    if (meta.length){
      gsap.set(meta, { opacity: 0, y: 14 });
      gsap.to(meta, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out', delay: 1.05 });
    }
  }

  /* ---------------- Marquee (CSS-driven, JS only pauses on reduced motion) ---------------- */
  function initMarquee(){
    document.querySelectorAll('[data-marquee]').forEach(track => {
      const content = track.querySelector('[data-marquee-track]');
      if (content && !content.dataset.cloned) {
        content.insertAdjacentHTML('afterend', content.outerHTML);
        content.dataset.cloned = 'true';
      }
      if (reduced) track.style.animation = 'none';
    });
  }

  /* ---------------- Parallax ---------------- */
  function initParallax(){
    if (reduced || !hasGSAP || !window.ScrollTrigger) return;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const amount = parseFloat(el.getAttribute('data-parallax')) || 40;
      gsap.to(el, {
        y: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroEntrance();
    initReveal();
    initMarquee();
    initParallax();
  });

  window.Motion = { reduced, hasGSAP, lenis };
})();
