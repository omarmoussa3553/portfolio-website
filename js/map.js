/* ============================================================
   Geographic experience — editorial node diagram (not a literal map)
   ============================================================ */

function renderExperienceMap(rootEl){
  if (!rootEl) return;
  const list = SITE_DATA.experienceMap;
  const line = rootEl.querySelector('[data-map-line]');
  const panel = rootEl.querySelector('[data-map-panel]');

  line.innerHTML = list.map((entry, i) => {
    const pos = (i / (list.length - 1)) * 100;
    const edge = i === 0 ? ' data-edge="start"' : (i === list.length - 1 ? ' data-edge="end"' : '');
    return `
      <button class="map-node" style="left:${pos}%" data-verified="${entry.verified}" data-code="${entry.code}"${edge}
        aria-pressed="false" aria-label="${entry.name}${entry.verified ? '' : ' — details pending'}">
        <span class="map-node-label">${entry.name}</span>
      </button>`;
  }).join('');

  const nodes = line.querySelectorAll('.map-node');

  function showPanel(entry){
    if (entry.verified){
      const country = SITE_DATA.countries.find(c => c.code === entry.code);
      const projects = (country ? country.projectSlugs : []).map(Lookup.project).filter(Boolean);
      panel.innerHTML = `
        <p class="eyebrow">${entry.name}</p>
        <p class="body-md mt-md" style="margin-top:0.8em;max-width:60ch;">${country ? country.note : ''}</p>
        ${projects.length ? `<p class="mono-label mt-md" style="margin-top:1.2em;">Selected work</p>
        <p class="body-md" style="margin-top:0.4em;">${projects.map(p => p.title).join(' · ')}</p>` : ''}`;
    } else {
      panel.innerHTML = `
        <p class="eyebrow">${entry.name}</p>
        <p class="placeholder-note mt-md" style="margin-top:0.8em;">Work in this market has not yet been confirmed from verified source material — details to be supplied.</p>`;
    }
  }

  nodes.forEach((node, i) => {
    node.addEventListener('click', () => {
      const wasPressed = node.getAttribute('aria-pressed') === 'true';
      nodes.forEach(n => n.setAttribute('aria-pressed', 'false'));
      if (!wasPressed){
        node.setAttribute('aria-pressed', 'true');
        showPanel(list[i]);
      } else {
        panel.innerHTML = `<p class="placeholder-note">Select a market above to see verified work.</p>`;
      }
    });
  });

  /* default open first verified entry */
  const firstVerifiedIndex = list.findIndex(e => e.verified);
  if (firstVerifiedIndex > -1){
    nodes[firstVerifiedIndex].setAttribute('aria-pressed', 'true');
    showPanel(list[firstVerifiedIndex]);
  }
}
