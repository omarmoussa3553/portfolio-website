/* ============================================================
   Clients page — logo-style grid + click-through project detail
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.querySelector('[data-client-grid]');
  const panelEl = document.querySelector('[data-client-panel]');
  if (!gridEl) return;

  gridEl.innerHTML = SITE_DATA.clients.map(c => `
    <button class="client-cell" id="${c.id}" data-client="${c.id}" aria-pressed="false">
      <span class="client-name">${c.name}</span>
    </button>
  `).join('');

  function showClient(id){
    const client = Lookup.client(id);
    if (!client || !panelEl) return;
    gridEl.querySelectorAll('.client-cell').forEach(cell => {
      cell.setAttribute('aria-pressed', cell.getAttribute('data-client') === id ? 'true' : 'false');
    });
    const industry = Lookup.industry(client.industry);
    const country = client.country ? Lookup.country(client.country) : null;
    const projects = client.projectSlugs.map(Lookup.project).filter(Boolean);
    panelEl.innerHTML = `
      <p class="eyebrow">${client.name}</p>
      <p class="body-md mt-md" style="margin-top:0.6em;color:var(--muted-on-maroon);">
        ${[industry, country ? country.name : 'Market not specified'].filter(Boolean).join(' · ')}
      </p>
      <div class="flex flex-wrap gap-sm mt-md">
        ${projects.map(p => `<a class="btn" style="color:var(--paper);" href="project.html?slug=${p.slug}" data-cursor="View">${p.title}</a>`).join('')}
      </div>`;
  }

  gridEl.querySelectorAll('.client-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      showClient(cell.getAttribute('data-client'));
      history.replaceState({}, '', `#${cell.getAttribute('data-client')}`);
    });
  });

  const initial = window.location.hash ? window.location.hash.slice(1) : SITE_DATA.clients[0].id;
  if (Lookup.client(initial)) showClient(initial);
});
