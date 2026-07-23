/* ============================================================
   Reel hero — scroll-scrubbed video background + homepage background music
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Scroll-scrubbed frame sequence ----------------
     300 pre-extracted stills, fully preloaded, drawn onto a canvas — the
     frame index is a direct function of scroll position (0 = top, frame 299 =
     the very bottom), so motion tracks the scrollbar exactly. This replaces
     seeking a <video> element: H.264 can only jump cleanly between keyframes,
     and a short clip has very few of them, which is what made scrubbing look
     like it was snapping between a handful of frames instead of animating
     smoothly. Swapping a preloaded image is instant regardless of codec.

     displayProgress eases toward targetProgress every frame (a lerp)
     instead of snapping straight to wherever the scrollbar currently is —
     a fast flick-scroll glides to its target instead of the image visibly
     jump-cutting between far-apart frames. (An earlier version also
     cross-faded between the two nearest frames to smooth the transition
     further, but with only 100 source stills that dissolve read as a
     blur/ghosting artifact rather than motion — removed now that there
     are 300, which are close enough together to look continuous on their
     own without blending.) */
  const canvas = document.getElementById('collage-canvas');
  const reduced = document.documentElement.classList.contains('reduced-motion');

  if (canvas){
    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 300;
    const frames = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let targetProgress = 0;
    let displayProgress = 0;
    let rafId = null;

    function pad3(n){ return String(n).padStart(3, '0'); }

    function drawImageCover(img){
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale, dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    function render(snap){
      if (snap || Math.abs(targetProgress - displayProgress) < 0.0004){
        displayProgress = targetProgress;
      } else {
        displayProgress += (targetProgress - displayProgress) * 0.12;
      }
      const index = Math.round(displayProgress * (TOTAL_FRAMES - 1));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageCover(frames[index]);
    }

    function tick(){
      render(false);
      rafId = Math.abs(targetProgress - displayProgress) > 0.0004 ? requestAnimationFrame(tick) : null;
    }

    function requestTick(){
      if (rafId == null) rafId = requestAnimationFrame(tick);
    }

    function resizeCanvas(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      render(true);
    }

    function updateTargetProgress(){
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      requestTick();
    }

    resizeCanvas();

    for (let i = 0; i < TOTAL_FRAMES; i++){
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        requestTick();
        if (loadedCount === TOTAL_FRAMES && reduced){
          targetProgress = 0.35;
          render(true);
        }
      };
      img.src = `media/collage-frames/frame-${pad3(i)}.jpg`;
      frames[i] = img;
    }

    if (!reduced){
      document.addEventListener('scroll', updateTargetProgress, { passive: true });
      window.addEventListener('resize', resizeCanvas);
      updateTargetProgress();
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
