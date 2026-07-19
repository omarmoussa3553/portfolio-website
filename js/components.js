/* ============================================================
   Components — small HTML-string builders shared across pages,
   rendered from SITE_DATA. Kept framework-free on purpose.
   ============================================================ */

const Lookup = {
  service: (id) => SITE_DATA.services.find(s => s.id === id),
  project: (slug) => SITE_DATA.projects.find(p => p.slug === slug),
  client: (id) => SITE_DATA.clients.find(c => c.id === id),
  industry: (id) => (SITE_DATA.industries.find(i => i.id === id) || {}).name || null,
  country: (code) => SITE_DATA.countries.find(c => c.code === code),
  clientByName: (name) => SITE_DATA.clients.find(c => c.name === name),
  projectsForService: (id) => SITE_DATA.projects.filter(p => p.services.includes(id)),
  projectsForClient: (clientId) => {
    const c = Lookup.client(clientId);
    return c ? c.projectSlugs.map(Lookup.project).filter(Boolean) : [];
  },
  projectsForCountry: (code) => SITE_DATA.projects.filter(p => p.country === code)
};

function mediaSlotHTML(label, ratio, extraClass){
  const cls = extraClass ? `media-slot ${extraClass}` : 'media-slot';
  const style = ratio ? ` style="--ar:${ratio}"` : '';
  return `<div class="${cls}"${style}><span class="media-slot-label">${label}</span></div>`;
}

function mediaImageHTML(src, alt, ratio, extraClass){
  const cls = extraClass ? `media-slot media-slot-img ${extraClass}` : 'media-slot media-slot-img';
  const style = ratio ? ` style="--ar:${ratio}"` : '';
  return `<div class="${cls}"${style}><img src="${src}" alt="${alt}" loading="lazy"></div>`;
}

function videoEmbedHTML(videoId, ratio, extraClass){
  const cls = extraClass ? `media-slot media-slot-video ${extraClass}` : 'media-slot media-slot-video';
  const [w, h] = (ratio || '16/9').split('/').map(Number);
  const style = ` style="--ar:${ratio || '16/9'}; --ar-w:${w}; --ar-h:${h};"`;
  const src = `https://www-ccv.adobe.io/v1/player/ccv/${videoId}/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View`;
  return `<div class="${cls}"${style}><iframe src="${src}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen frameborder="0" title="Video"></iframe></div>`;
}

/* The old site's social/reel content was shot vertical (576x1024, confirmed by
   inspecting the actual source files) while cinematic/film/3D work is landscape
   16:9 — forcing every embed into 16:9 pillarboxed the vertical ones inside their
   own player. Service tells us which is which. */
function videoRatioForProject(project){
  const social = project.services.includes('social');
  const cinematic = project.services.includes('film') || project.services.includes('concept-3d');
  return (social && !cinematic) ? '9/16' : '16/9';
}

/* First real image if the project has one, else the first video embed, else a labeled placeholder.
   Real photos always render at their natural, uncropped proportions — never force-cropped
   into a fixed box — so a portrait shot doesn't get chopped down to a landscape sliver. */
function coverMediaHTML(project, ratio, extraClass){
  const natural = extraClass ? `${extraClass} media-slot-natural` : 'media-slot-natural';
  if (project.images && project.images[0]) return mediaImageHTML(project.images[0], project.title, null, natural);
  if (project.videos && project.videos[0]) return videoEmbedHTML(project.videos[0], ratio || videoRatioForProject(project), extraClass);
  return mediaSlotHTML(project.title, ratio, extraClass);
}

function projectCardHTML(project, opts){
  opts = opts || {};
  const industry = Lookup.industry(project.industry);
  const meta = [project.client, project.year, industry].filter(Boolean).join(' · ');
  return `
    <a class="project-card" href="project.html?slug=${project.slug}" data-cursor="View">
      ${coverMediaHTML(project, opts.ratio, 'project-card-media')}
      <div class="project-card-row">
        <h3 class="project-card-title display">${project.title}</h3>
        <span class="project-card-meta mono-label">${meta}</span>
      </div>
    </a>`;
}

/* Home page "Recent Work" showcase — real media (photo or correctly-ratio'd video)
   in the same justified, size-varied rhythm as a project gallery, each one a link
   straight to its project page with a small caption underneath. */
function featuredWorkItemHTML(project, tier){
  const media = coverMediaHTML(project, null, tier);
  return `
    <a class="featured-work-item" href="project.html?slug=${project.slug}" data-cursor="View">
      ${media}
      <span class="featured-work-caption">
        <span class="featured-work-title display">${project.title}</span>
        <span class="service-row-arrow" aria-hidden="true">&rarr;</span>
      </span>
    </a>`;
}

/* Text-only project entry — no cover image, just a clean clickable typographic row. */
function projectLinkHTML(project, index){
  const industry = Lookup.industry(project.industry);
  const meta = [project.client, project.year, industry].filter(Boolean).join(' · ');
  return `
    <a class="project-link-row" href="project.html?slug=${project.slug}" data-cursor="View">
      <span class="project-link-index mono-label">${String(index + 1).padStart(2, '0')}</span>
      <h3 class="project-link-title display">${project.title}</h3>
      <span class="project-link-meta mono-label">${meta}</span>
      <span class="service-row-arrow" aria-hidden="true">&rarr;</span>
    </a>`;
}

function serviceRowLinkHTML(service){
  const count = Lookup.projectsForService(service.id).length;
  return `
    <a class="service-row" href="projects.html?service=${service.id}" data-cursor="View" data-open="true">
      <span class="service-row-index mono-label">${service.index}</span>
      <span>
        <h3 class="service-row-name">${service.name}</h3>
        <p class="service-row-desc body-md" style="max-height:none;opacity:1;overflow:visible;margin-top:0.6em;">
          ${service.description}<br>
          <span class="mono-label" style="margin-top:0.8em;display:inline-block;">${service.capabilities.join(' · ')} — ${count} project${count === 1 ? '' : 's'}</span>
        </p>
      </span>
      <span class="service-row-arrow" aria-hidden="true">&rarr;</span>
    </a>`;
}

function serviceRowHTML(service){
  return `
    <div class="service-row" data-service="${service.id}" data-open="false" tabindex="0" role="button" aria-expanded="false">
      <span class="service-row-index mono-label">${service.index}</span>
      <span>
        <h3 class="service-row-name">${service.name}</h3>
        <p class="service-row-desc body-md">${service.description}</p>
      </span>
      <span class="service-row-arrow" aria-hidden="true">&rarr;</span>
    </div>`;
}

function clientCellHTML(client){
  return `
    <a class="client-cell" href="clients.html#${client.id}" data-cursor="View">
      <h3 class="client-name">${client.name}</h3>
    </a>`;
}

function timelineItemHTML(item){
  return `
    <div class="timeline-item" data-reveal>
      <div class="timeline-year">${item.year}</div>
      <div class="timeline-label display">${item.label}</div>
      <p class="timeline-detail body-md">${item.detail}</p>
    </div>`;
}
