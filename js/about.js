/* ============================================================
   About page wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const p = SITE_DATA.profile;

  const statsEl = document.querySelector('[data-stats]');
  if (statsEl){
    statsEl.innerHTML = p.stats.map(s => `
      <div data-reveal>
        <div class="stat-value display">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
  }

  const timelineEl = document.querySelector('[data-timeline]');
  if (timelineEl){
    timelineEl.innerHTML = p.timeline.map(timelineItemHTML).join('');
  }

  const disciplinesEl = document.querySelector('[data-disciplines]');
  if (disciplinesEl){
    disciplinesEl.innerHTML = p.disciplines.map(d => `<span class="filter-chip" aria-pressed="false">${d}</span>`).join('');
  }
});
