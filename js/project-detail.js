/* ============================================================
   Project detail — renders a single project from ?slug=
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-project-detail]');
  if (!root) return;

  const slug = new URLSearchParams(window.location.search).get('slug');
  const project = Lookup.project(slug);

  if (!project){
    root.innerHTML = `
      <div class="wrap section text-center">
        <p class="eyebrow">Not found</p>
        <h1 class="display" style="font-size:var(--step-3); margin-top:0.5em;">We couldn't find that project.</h1>
        <a class="btn btn-primary mt-lg" href="projects.html">Back to Projects</a>
      </div>`;
    return;
  }

  document.title = `${project.title} — Omar Moussa`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', project.summary);

  const industry = Lookup.industry(project.industry);
  const country = project.country ? Lookup.country(project.country) : null;
  const services = project.services.map(Lookup.service).filter(Boolean);

  const factRow = (label, value) => value ? `
    <div>
      <p class="mono-label">${label}</p>
      <p class="body-md mt-md" style="margin-top:0.4em;">${value}</p>
    </div>` : '';

  const images = project.images || [];
  const videos = project.videos || [];
  const hasRealMedia = images.length > 0 || videos.length > 0;

  /* Everything — every photo and every video — renders together in one gallery,
     not a standalone "cover" up top with the rest split off below. Real photos
     render at their natural, uncropped proportions. Video ratio matches its true
     source orientation (vertical for social/reel content, 16:9 for film). */
  const videoRatio = videoRatioForProject(project);
  const galleryItems = [
    ...images.map(src => ({ type: 'image', src })),
    ...videos.map(id => ({ type: 'video', id }))
  ];

  /* One consistent size band for every item — width still follows each item's own
     aspect ratio, but height no longer cycles big/small/small, so the gallery reads
     as an even, deliberate grid instead of a scattershot of mismatched tiles. */
  const galleryItemHTML = (item, i) => item.type === 'video'
    ? videoEmbedHTML(item.id, videoRatio)
    : mediaImageHTML(item.src, `${project.title} — image ${i + 1}`, null, 'media-slot-natural');

  const gallery = hasRealMedia
    ? galleryItems.map(galleryItemHTML).join('')
    : Array.from({ length: project.gallerySlots || 4 }).map((_, i) =>
        mediaSlotHTML(`${project.title} — image ${i + 1}`, i % 2 === 0 ? '4/5' : '3/2')
      ).join('');

  root.innerHTML = `
    <section class="section" data-surface="light" style="padding-top: calc(var(--space-2xl) + 3rem);">
      <div class="wrap">
        <a class="back-link link-underline" href="projects.html">&larr; All Projects</a>
        <p class="eyebrow mt-lg">${industry || 'Selected Work'}</p>
        <h1 class="display" style="font-size:var(--step-5); max-width:20ch; margin-top:0.3em;">${project.title}</h1>
        <p class="body-lg mt-md" style="max-width:56ch; color:var(--muted);">${project.summary}</p>
      </div>
    </section>

    <section class="section-tight" data-surface="light">
      <div class="wrap grid-12">
        <div style="grid-column: span 3;">${factRow('Client', project.client)}</div>
        <div style="grid-column: span 3;">${factRow('Role', project.role)}</div>
        <div style="grid-column: span 3;">${factRow('Services', services.map(s => s.name).join(', '))}</div>
        <div style="grid-column: span 3;">${factRow('Market', country ? country.name : (project.year ? `Year — ${project.year}` : 'Not specified'))}</div>
      </div>
    </section>

    <section class="section" data-surface="dark">
      <div class="wrap">
        <div class="gallery-flow">${gallery}</div>
      </div>
    </section>
  `;

  /* next project navigation, wraps around */
  const idx = SITE_DATA.projects.findIndex(p => p.slug === project.slug);
  const next = SITE_DATA.projects[(idx + 1) % SITE_DATA.projects.length];
  const nextEl = document.querySelector('[data-next-project]');
  if (nextEl){
    nextEl.innerHTML = `
      <a class="next-project" href="project.html?slug=${next.slug}" data-cursor="Next">
        <span>
          <span class="next-project-label mono-label">Next Project</span>
          <span class="next-project-title display mt-md" style="display:block;margin-top:0.3em;">${next.title}</span>
        </span>
        <span class="service-row-arrow" aria-hidden="true">&rarr;</span>
      </a>`;
  }
});
