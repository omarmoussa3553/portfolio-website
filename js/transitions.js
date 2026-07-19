/* ============================================================
   Page transitions — full-bleed veil wipe between real page loads.
   Works without a JS router: intercepts internal link clicks, plays
   an exit wipe, then navigates; plays an entrance wipe on load.
   ============================================================ */

(function(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    const veil = document.createElement('div');
    veil.className = 'transition-veil';
    veil.setAttribute('aria-hidden', 'true');
    document.body.appendChild(veil);

    const hasGSAP = typeof window.gsap !== 'undefined';

    /* entrance: veil starts covering the page, then wipes down away */
    if (reduced || !hasGSAP) {
      veil.style.transform = 'scaleY(0)';
    } else {
      gsap.set(veil, { scaleY: 1, transformOrigin: 'top' });
      gsap.to(veil, { scaleY: 0, duration: 0.9, ease: 'power4.inOut', delay: 0.05 });
    }

    /* exit: intercept same-origin, non-modified clicks on internal links */
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      let url;
      try { url = new URL(href, window.location.href); } catch(_) { return; }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      if (reduced || !hasGSAP) { window.location.href = url.href; return; }

      gsap.set(veil, { transformOrigin: 'bottom' });
      gsap.to(veil, {
        scaleY: 1, duration: 0.55, ease: 'power3.in',
        onComplete: () => { window.location.href = url.href; }
      });
    });
  });
})();
