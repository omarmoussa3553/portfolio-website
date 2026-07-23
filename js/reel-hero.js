/* ============================================================
   Reel hero — scroll-scrubbed video background + homepage background music
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Scroll-scrubbed frame sequence ----------------
     100 pre-extracted stills, fully preloaded, drawn onto a canvas — the
     frame index is a direct function of scroll position (0 = top, frame 99 =
     the very bottom), so motion tracks the scrollbar exactly. This replaces
     seeking a <video> element: H.264 can only jump cleanly between keyframes,
     and a short clip has very few of them, which is what made scrubbing look
     like it was snapping between a handful of frames instead of animating
     smoothly. Swapping a preloaded image is instant regardless of codec. */
  const canvas = document.getElementById('collage-canvas');
  const reduced = document.documentElement.classList.contains('reduced-motion');

  if (canvas){
    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 100;
    const frames = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let currentFrame = -1;
    let ticking = false;

    function pad3(n){ return String(n).padStart(3, '0'); }

    function resizeCanvas(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      currentFrame = -1; // force a redraw at the new size
      drawFrame(lastRequestedFrame);
    }

    function drawFrame(index){
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth || index === currentFrame) return;
      currentFrame = index;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale, dh = ih * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    let lastRequestedFrame = 0;
    function updateScrub(){
      ticking = false;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      const index = Math.round(progress * (TOTAL_FRAMES - 1));
      lastRequestedFrame = index;
      drawFrame(index);
    }

    resizeCanvas();

    for (let i = 0; i < TOTAL_FRAMES; i++){
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (i === lastRequestedFrame) drawFrame(i);
        if (loadedCount === TOTAL_FRAMES && reduced) drawFrame(Math.round((TOTAL_FRAMES - 1) * 0.35));
      };
      img.src = `media/collage-frames/frame-${pad3(i)}.jpg`;
      frames[i] = img;
    }

    if (!reduced){
      document.addEventListener('scroll', () => {
        if (!ticking){ requestAnimationFrame(updateScrub); ticking = true; }
      }, { passive: true });
      window.addEventListener('resize', resizeCanvas);
      updateScrub();
    }
  }

  /* ---------------- Background music ---------------- */
  const audio = document.getElementById('hero-theme');
  const toggle = document.getElementById('reel-sound-toggle');
  if (!audio || !toggle) return;

  let userMuted = false;

  function setToggleState(playing){
    toggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  function tryPlay(){
    if (userMuted) return;
    audio.play().then(() => setToggleState(true)).catch(() => setToggleState(false));
  }

  tryPlay();

  /* Browsers block audio-with-sound autoplay until a user gesture — start on
     the first interaction anywhere on the page rather than leaving the track
     silent with no explanation. */
  const startOnGesture = () => {
    if (!userMuted && audio.paused) tryPlay();
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach(evt =>
    document.addEventListener(evt, startOnGesture, { once: true, passive: true })
  );

  toggle.addEventListener('click', () => {
    if (audio.paused){
      userMuted = false;
      tryPlay();
    } else {
      audio.pause();
      userMuted = true;
      setToggleState(false);
    }
  });

  /* Music is a homepage-only ambience — stop it before navigating elsewhere
     so it doesn't keep playing under a page transition. */
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])').forEach(link => {
    link.addEventListener('click', () => { audio.pause(); });
  });
});
