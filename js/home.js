/* ============================================================
   Home page wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- services glimpse ---- */
  const serviceListEl = document.querySelector('[data-service-list]');
  if (serviceListEl){
    serviceListEl.innerHTML = SITE_DATA.services.map(serviceRowHTML).join('');

    serviceListEl.querySelectorAll('.service-row').forEach(row => {
      const toggle = () => {
        const isOpen = row.getAttribute('data-open') === 'true';
        serviceListEl.querySelectorAll('.service-row').forEach(r => { r.setAttribute('data-open', 'false'); r.setAttribute('aria-expanded', 'false'); });
        if (!isOpen){ row.setAttribute('data-open', 'true'); row.setAttribute('aria-expanded', 'true'); }
      };
      row.addEventListener('click', toggle);
      row.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
  }

  /* ---- experience map ---- */
  renderExperienceMap(document.querySelector('[data-experience-map]'));

});
