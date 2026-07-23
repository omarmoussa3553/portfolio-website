/* ============================================================
   Clients page — logo-style grid
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.querySelector('[data-client-grid]');
  if (!gridEl) return;

  gridEl.innerHTML = SITE_DATA.clients.map(c => `
    <div class="client-cell" id="${c.id}">
      <span class="client-name">${c.name}</span>
    </div>
  `).join('');
});
