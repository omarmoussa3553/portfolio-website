# Omar Moussa — Portfolio Website

A premium, editorial portfolio site for Omar Moussa, filmmaker & creative media professional. Built as a **static HTML/CSS/JS site — no build step, no framework, no Node.js required** (see *Why static, not Next.js* below).

## Quick start

No installation needed. To preview locally, serve the folder over HTTP (opening `index.html` directly with `file://` will mostly work, but the fetch-based nav/footer are inlined per page specifically to avoid `file://` issues — a local server is still recommended for correct relative-path and font behavior):

```bash
cd "Portfolio Website"
python3 -m http.server 8080
# visit http://localhost:8080/index.html
```

Any static server works equally well (`npx serve`, VS Code "Live Server", etc.) once Node/npm are available on this machine — none is currently installed, which is why this build skips the npm-based tooling the original brief recommended (Next.js/TypeScript/GSAP via npm). Everything else in the brief (GSAP, Google Fonts) is loaded via CDN `<script>`/`<link>` tags instead.

## Why static, not Next.js

This machine has no Node.js, npm, or Homebrew installed. Since I couldn't run `npm install` or a dev server to actually test a React/Next.js build, I built a real, working, testable static site instead — plain HTML/CSS/JS with GSAP for animation, one shared `data.js` file driving every page, and no framework runtime required. Every route below is a real file/URL (not client-side-routed), which also means it works with zero JavaScript for basic navigation.

If you later want the Next.js/TypeScript version described in the original brief, install Node.js first (`https://nodejs.org` or `brew install node`), and this codebase's structure (shared data model, component patterns) translates directly — say so and it can be ported.

## Routes

| Route | Purpose |
|---|---|
| `/index.html` | Home — hero, intro, about/services/projects/clients glimpses, geographic experience, contact glimpse |
| `/about.html` | Full biography, stats, philosophy, timeline, disciplines, languages |
| `/services.html` | All 6 services, each linking to filtered projects; geographic experience map |
| `/projects.html` | Filterable project grid (`?service=<id>` deep-links a filter) |
| `/project.html?slug=<slug>` | Individual project case study (data-driven, one template for all projects) |
| `/clients.html` | Client grid; click a client (or visit `#<client-id>`) to see their related projects |
| `/contact.html` | Inquiry form + direct contact details |

## Editing content

**Everything text-based lives in [js/data.js](js/data.js)** — profile, services, projects, clients, industries, countries. Nothing is hard-coded into the HTML pages themselves; every listing (service list, project grid, client grid, geographic map) renders from this one file at page load. To add a project, add an object to `SITE_DATA.projects` and reference its `slug` from a client/service/country if relevant — the site wires the rest up automatically.

Fields left as `null` (e.g. most `year` and `country` values) reflect information the source portfolio didn't confirm — see **Information still needed** below before filling them in with guesses.

## Media assets

**Photos**: 119 real project photos have been pulled from your old `omarmoussaa.myportfolio.com` site and are stored locally in `media/projects/<slug>/`, resized to a 1800px max dimension and re-compressed (down from ~340MB of originals to ~54MB total) so the site actually loads fast. Every project that had a photo gallery on the old site now shows real photos here — no placeholders remain for those.

Two things worth knowing:
1. Each old project page's *first* image was always myportfolio's own auto-generated title card (a stock b&w photo with your project name stamped over it in a film-strip border) — not real portfolio work. Those were identified and excluded everywhere, including a second hidden one that only surfaced after a client got split apart — see point 2.
2. **Clients that appeared under multiple categories on your old site are now separate projects, not merged.** Orangette, Pix Noise, and Sea Plus each had distinct pages under different categories (e.g. Orangette had its own Cinematics, Graphic Design, Social Media, *and* Web Developing pages). An earlier pass merged each client's media into one combined project, which meant the Web Development listing for Orangette, for example, showed graphic design photos and social videos alongside the actual Shopify screenshots. That's fixed — each is now its own project (`orangette-cinematic-ad`, `orangette-collection`, `orangette-social`, `orangette-shopify`, `pix-noise-branding`, `pix-noise-website`, `sea-plus-branding`, `sea-plus-social`), each showing only the media and service that actually belongs to it, mirroring your old site's page structure. 29 projects total now (up from the original 24).

**Videos**: rather than downloading (per your instruction) or re-uploading anywhere, videos are embedded directly from their existing source — the same Adobe/Behance video player your old site already used (`js/components.js` → `videoEmbedHTML()`). This is the one dependency worth knowing about: if you ever stop paying for Adobe Portfolio/Behance, or Adobe changes this embed API, these embeds could break. Nothing was downloaded for them, so if that ever happens the fix is to source the original video files (from wherever you originally exported them, or by asking me to re-check this before it's an issue) and either self-host or move them to Vimeo/YouTube.

One correction worth flagging: my first pass at matching videos to projects used an extraction script that alphabetized video IDs instead of preserving the order they appeared on the page. That silently swapped which video belonged to which project wherever a source page's videos got split across multiple projects — it affected all 5 short films plus the AAST/Orangette cinematic ads. Fixed by re-extracting true page order, but noting it here in case anything still looks mismatched — I can't watch the videos myself to verify content, only match IDs against page structure and your direct corrections.

**What's still missing**: a personal portrait/headshot. I checked — the only "personal" image on the old site was a category title card (studio ring-light photo with "PERSONAL SOCIAL MEDIA" text baked in), not a real photo of you. The hero and About page portrait slots are still placeholders; send me a real headshot/behind-the-scenes photo and I'll drop it in.

To add more media later: drop files into `media/projects/<slug>/` (or `media/portraits/`, `media/clients/`), then add the path to that project's `images` array in `js/data.js` — the site renders it automatically, no HTML editing needed.

## Typography system

Three Google Fonts, loaded via CDN, each with a distinct job (see `css/tokens.css`):

- **Fraunces** (`--font-display`) — editorial serif for headlines and emotional statements.
- **Inter** (`--font-sans`) — geometric sans for navigation, labels, metadata, and body copy.
- **Instrument Serif** italic (`--font-accent`) — the expressive accent, used sparingly for single words like "Create." and "Egypt"/"Qatar" in headlines.

For production, consider self-hosting/subsetting these three fonts (e.g. via `fonttools`) instead of the Google Fonts CDN, to shave a render-blocking round trip.

## Animation system

- **GSAP + ScrollTrigger** (CDN) drives scroll-in reveals (`[data-reveal]`), the hero's staggered line entrance, and subtle parallax hooks — all defined once in `js/motion.js`.
- **Native CSS `scroll-behavior: smooth`** handles smooth scrolling (an earlier draft used the Lenis library for this; it was removed after testing showed its scroll-hijacking fights automated tooling and, on reflection, is the same class of friction that can affect keyboard/screen-reader/trackpad scrolling for real users — native smooth-scroll plus GSAP reveals achieves the same cinematic feel with less risk).
- **Page transitions**: `js/transitions.js` plays a full-bleed wipe on internal link clicks before navigating, and a reveal-wipe on load — no SPA router involved, so it degrades to a normal instant page load if JavaScript is off.
- **`prefers-reduced-motion`**: fully respected. `css/base.css` forces near-zero animation/transition durations globally under this media query, and `js/motion.js`/`js/transitions.js` independently check `matchMedia` and skip GSAP tweens (setting final states directly) rather than relying on CSS alone.

## Accessibility notes

- Semantic landmarks (`nav`, `main`, `footer`) and a skip-to-content link on every page.
- Exactly one `<h1>` per page with no heading-level skips (verified programmatically across all 7 routes).
- Custom cursor and hover-preview effects are pointer-only; touch/coarse-pointer devices get the plain tap interactions (`@media (hover: none)`).
- Mobile menu: focus moves to the first link on open, returns to the toggle on close, `Tab`/`Shift+Tab` is trapped inside while open, `Escape` closes it, and it's `aria-hidden` (and `visibility: hidden`, not just off-screen) when closed so it can't be tabbed into or read by a screen reader.
- Contact form: every field has a `<label>`, inline errors are tied to inputs via `aria-describedby`, invalid fields get `aria-invalid`, and the status message is an `aria-live="polite"` region.
- Focus-visible outlines are never suppressed (see `:focus-visible` in `css/base.css`).

## Contact form — how it actually works

There is no backend on a static site, so the form cannot silently "send to a server." It fully validates client-side (name, email format, required selects, minimum message length) and, once valid, opens the visitor's email client with a pre-filled `mailto:` draft addressed to Omar. This was a deliberate choice over faking a success state that doesn't actually deliver anything — if a real backend (e.g. Formspree, a serverless function) is added later, swap the `mailto:` line in `js/contact.js` for a `fetch()` call.

## Performance notes

- No JS framework/bundle — total JS is a handful of small, purpose-specific files loaded with `defer`.
- All non-critical scripts (GSAP, etc.) load via CDN with `defer`, so they don't block first paint.
- Media placeholders are lightweight CSS (no image weight at all yet); once real media is added, apply `loading="lazy"` and modern formats as noted above.
- Fonts are loaded with `rel="preconnect"` hints to cut connection latency.
- Every CSS/JS `<link>`/`<script>` tag has a `?v=N` query string on it. Static hosts (and browsers) cache these files aggressively, so without a version marker, visitors can keep seeing an old cached copy after you update a file. **Bump the number** (find-and-replace `?v=4` → `?v=5` across all `.html` files) any time you edit a `.css` or `.js` file and want visitors to actually receive the new version.

## Responsive behavior

Every page was checked at a 390px-wide mobile viewport in addition to desktop: the nav collapses to a full-screen menu, the contact form and stat/client grids collapse to one/two columns (a bug where the form grid didn't do this was found and fixed during QA), the hero's oversized background word hides below 980px so it doesn't fight the portrait for space, and no page has horizontal overflow at mobile width.

## Known limitations / what to verify yourself

- **I could not visually screenshot-test this site.** The automated browser tool used during development got stuck in a backgrounded/throttled tab state partway through (a tooling issue, not a site issue — confirmed by testing that plain DOM state was always correct even when screenshots weren't). I verified every page instead via direct DOM/computed-style inspection: real text content, correct element counts, correct computed widths/heights, zero console errors, zero broken internal links, zero dangling data references (every project/service/client/country cross-reference was checked programmatically). One early screenshot (the homepage hero, before the tooling got stuck) did render exactly as intended. **Please open the site in a real browser and click through it before treating it as final** — I'm confident in the code but a live look from you is the one QA step I couldn't complete myself.
- Two real bugs were caught this way and fixed: full-width project cards were rendering at portrait aspect-ratio (a CSS class mismatch), and the mobile menu was technically visible/focusable while "closed" (fixed with `visibility: hidden` + `aria-hidden`, not just an off-screen transform).

## Information still needed

Everything on the site is sourced from `omarmoussaa.myportfolio.com` — nothing is invented. These gaps are marked with `null` or an explicit "TBD" note in `js/data.js` / on-page, rather than guessed:

- **Exact dates** for the AAST teaching role and the Qatar year (currently just labeled "AAST" / "Qatar" / "Ongoing" on the About timeline).
- **Country/market** for several clients (Lebanero, Jeeda's, Pix Noise, Rivage, Krass, Sea Plus is confirmed Qatar, Dermacy Labs, WMStudio) and for Orangette specifically.
- **Project years** beyond the five dated short films (Relation-Chip, Envy, PS VR, Time, Think).
- **UAE, Saudi Arabia, US, UK, Kuwait** — the creative brief asked for these on the geographic-experience map, but nothing on the source portfolio evidences work in these markets. They're shown on the map as muted/unverified rather than omitted or invented; supply real project/client details for any of them and the map will treat them exactly like Egypt/Qatar.
- A downloadable résumé/profile PDF (referenced as a placeholder on the About page).
- Real portraits, behind-the-scenes photos, project imagery and video (see *Media assets* above).
- Awards/press — none were found on the source portfolio, so none are claimed anywhere on the site.

## Deployment

Since this is a static site with no build step, it deploys anywhere that serves static files:

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder, or connect a git repo — no build command needed (or set it to a no-op).
- **GitHub Pages**: push this folder to a repo and enable Pages on the branch/root.
- Any traditional host: upload the folder via FTP/SFTP to the web root.

No environment variables, no server, no database.
