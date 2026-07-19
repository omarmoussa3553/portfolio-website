/* ============================================================
   Custom cursor — contextual label, disabled on touch/coarse pointers
   ============================================================ */

(function(){
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.addEventListener('DOMContentLoaded', () => {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const label = document.createElement('div');
    label.className = 'cursor-label';
    label.setAttribute('aria-hidden', 'true');
    document.body.append(dot, label);

    let x = 0, y = 0, lx = 0, ly = 0;
    const speed = 0.18;

    document.addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      document.documentElement.classList.add('cursor-ready');
    });

    function raf(){
      lx += (x - lx) * speed;
      ly += (y - ly) * speed;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      label.style.transform = `translate(${lx}px, ${ly}px) translate(-50%,-50%)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        label.textContent = el.getAttribute('data-cursor');
        document.documentElement.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        document.documentElement.classList.remove('cursor-active');
      });
    });
  });
})();
