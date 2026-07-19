/* ============================================================
   Services page wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const listEl = document.querySelector('[data-service-list-full]');
  if (listEl){
    listEl.innerHTML = SITE_DATA.services.map(serviceRowLinkHTML).join('');
  }

  renderExperienceMap(document.querySelector('[data-experience-map]'));
});
