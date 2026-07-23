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

  /* ---------------- Typewriter reveal ----------------
     Splits an element's text into one span per character (grouped by word,
     so wrapping still only happens at word boundaries) and reveals them in
     a fast stagger when the element scrolls into view — reads as the text
     being typed out rather than fading in. The original text is kept as an
     aria-label on the element itself so screen readers get one clean
     string instead of a wall of single-letter spans. */
  function splitForTypewriter(el){
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';

    /* Everything visual lives inside one aria-hidden wrapper, so the
       container's own aria-label — not this markup — is what screen
       readers announce. */
    const wrap = document.createElement('span');
    wrap.setAttribute('aria-hidden', 'true');

    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'tw-word';
      [...word].forEach(ch => {
        const charSpan = document.createElement('span');
        charSpan.className = 'tw-char';
        charSpan.textContent = ch;
        /* Set directly on the element rather than via a CSS rule/class, so
           revealing it later is just as direct a style write — nothing
           routed through a class-selector cascade that could be shadowed
           by another rule. */
        charSpan.style.opacity = '0';
        charSpan.style.transition = 'opacity 0.05s linear';
        wordSpan.appendChild(charSpan);
      });
      wrap.appendChild(wordSpan);
      if (wi < words.length - 1) wrap.appendChild(document.createTextNode(' '));
    });
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    /* Park the cursor before the first letter rather than after the last —
       typeOutChars drags it forward one letter at a time as text reveals,
       so it always sits right where typing left off instead of blinking
       motionless out at the finished string's far end the whole time. */
    const firstChar = wrap.querySelector('.tw-char');
    if (firstChar) firstChar.insertAdjacentElement('beforebegin', cursor);
    else wrap.appendChild(cursor);

    el.appendChild(wrap);
    return el.querySelectorAll('.tw-char');
  }

  const TYPE_CHAR_MS = 180;

  function typeOutChars(el, chars, intervalMs){
    const interval = intervalMs || TYPE_CHAR_MS;
    const cursor = el.querySelector('.tw-cursor');
    el.classList.add('is-typing');
    chars.forEach((c, i) => {
      setTimeout(() => {
        c.style.opacity = '1';
        if (cursor) c.insertAdjacentElement('afterend', cursor);
      }, i * interval);
    });
    setTimeout(() => el.classList.remove('is-typing'), chars.length * interval + 400);
  }

  function initTypewriter(){
    const items = document.querySelectorAll('[data-type-reveal]');
    if (!items.length) return;

    items.forEach((el) => {
      const chars = splitForTypewriter(el);
      /* Per-element speed override — e.g. a long paragraph that reads too
         slowly at the shared pace can opt into its own faster interval via
         data-type-speed="45" without touching every other headline. */
      const customSpeed = parseFloat(el.getAttribute('data-type-speed'));
      const speed = customSpeed > 0 ? customSpeed : undefined;

      if (reduced){
        chars.forEach(c => { c.style.opacity = '1'; });
        return;
      }

      let done = false;
      function reveal(){
        if (done) return;
        done = true;
        typeOutChars(el, chars, speed);
      }

      /* Primary trigger. */
      if ('IntersectionObserver' in window){
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => { if (entry.isIntersecting) reveal(); });
        }, { threshold: 0.01, rootMargin: '0px 0px -15% 0px' });
        io.observe(el);
      }

      /* Redundant backstop using the same "top 85% of viewport" math the
         rest of the site's scroll-reveal already relies on — belt and
         braces in case IntersectionObserver doesn't fire in some browser/
         environment. Whichever trigger fires first wins; reveal() is a
         once-only guard either way. */
      function manualCheck(){
        if (done) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) reveal();
      }
      document.addEventListener('scroll', manualCheck, { passive: true });
      window.addEventListener('resize', manualCheck);
      manualCheck();
    });
  }

  /* ---------------- Hero name typewriter (runs on load, not scroll) ----------------
     The name sits above the fold and is visible the instant the page loads, so
     it doesn't go through the scroll-triggered initTypewriter pipeline below —
     it just types itself out once, timed to land in the same spot the old
     fade-in stagger used to put it. Same pace (TYPE_CHAR_MS) as the
     scroll-triggered headlines below. */

  function initHeroTypewriter(){
    const el = document.querySelector('[data-hero-type]');
    if (!el) return;
    const chars = splitForTypewriter(el);
    if (reduced){
      chars.forEach(c => { c.style.opacity = '1'; });
      return;
    }
    setTimeout(() => typeOutChars(el, chars), 1100);
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
    initHeroTypewriter();
    initReveal();
    initTypewriter();
    initMarquee();
    initParallax();
  });

  window.Motion = { reduced, hasGSAP };
})();
