/* ============================================================
   Projects listing — filterable grid, data-driven from SITE_DATA
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.querySelector('[data-project-grid]');
  const filterEl = document.querySelector('[data-filter-bar]');
  const countEl = document.querySelector('[data-result-count]');
  if (!gridEl || !filterEl) return;

  const params = new URLSearchParams(window.location.search);
  let active = params.get('service') || 'all';

  const filters = [{ id: 'all', name: 'All' }, ...SITE_DATA.services.map(s => ({ id: s.id, name: s.name }))];

  function renderFilters(){
    filterEl.innerHTML = filters.map(f => `
      <button class="filter-chip" data-filter="${f.id}" aria-pressed="${f.id === active}">${f.name}</button>
    `).join('');
    filterEl.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        active = btn.getAttribute('data-filter');
        renderFilters();
        renderGrid();
        const url = new URL(window.location.href);
        if (active === 'all') url.searchParams.delete('service'); else url.searchParams.set('service', active);
        window.history.replaceState({}, '', url);
      });
    });
  }

  function renderGrid(){
    const items = active === 'all'
      ? SITE_DATA.projects
      : SITE_DATA.projects.filter(p => p.services.includes(active));
    gridEl.innerHTML = items.map((p, i) => projectLinkHTML(p, i)).join('');
    if (countEl) countEl.textContent = `${items.length} project${items.length === 1 ? '' : 's'}`;
  }

  renderFilters();
  renderGrid();
});
