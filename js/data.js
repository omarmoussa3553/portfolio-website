/* ============================================================
   SITE_DATA — single source of truth for all copy on the site.
   Every field is either verified from omarmoussaa.myportfolio.com
   or explicitly marked TBD / null where the source did not confirm it.
   Do not invent facts here — extend only with verified information.
   ============================================================ */

const SITE_DATA = {

  profile: {
    name: "Omar Moussa",
    role: "Filmmaker & Creative Media Professional",
    tagline: "Direct. Shoot. Edit. Create.",
    location: "Alexandria, Egypt",
    markets: ["Egypt", "Qatar", "United Arab Emirates"],
    languages: ["English", "Arabic", "Italian", "French"],
    email: "omarmoussa3553@gmail.com",
    phone: "+20 112 7682 366",
    followers: "100k+",
    followersPlatform: "TikTok",
    socials: {
      linkedin: "https://www.linkedin.com/in/omarmoussa2000/",
      instagram: "https://www.instagram.com/omar.moussa/",
      tiktok: "https://www.tiktok.com/@omar.moussaa"
    },
    bioShort: "Quadrilingual filmmaker and creative media professional based in Alexandria, working across directing, videography, editing and full-scale content production for brands and agencies in Egypt, Qatar and the UAE.",
    bioFull: [
      "Quadrilingual (English, Arabic, Italian, French) filmmaker and creative media professional based in Alexandria.",
      "Expertise in directing, videography, advanced editing, and creative content production across international markets. Proven ability to build strong digital presence, lead high-impact campaigns, and deliver full-scale media projects for brands and agencies.",
      "Supported by professional teaching experience at AAST, a multicultural Egyptian-Italian background, and a year of media industry experience in Qatar, alongside a growing online audience of over 100k followers."
    ],
    philosophy: "Every project is treated as a small film — a brief becomes a brief, direction, and a delivered story, whether the final frame is a 30-second ad, a product photograph, or a storefront.",
    disciplines: [
      "Film Direction", "Videography", "Editing", "Photography",
      "Graphic Design", "Social Media Content", "Web Development", "3D & Motion Design"
    ],
    timeline: [
      { year: "AAST", label: "Media Department", detail: "Professional teaching experience at the Arab Academy for Science & Technology, Media Department — TBD: exact dates to be supplied." },
      { year: "Qatar", label: "A year in the field", detail: "A year of media industry experience across Qatar, producing photography, videography and social content for hospitality, wellness and lifestyle brands — TBD: exact dates to be supplied." },
      { year: "Ongoing", label: "Alexandria & beyond", detail: "Directing, shooting and designing for brands and agencies across Egypt, Qatar and the UAE, with an online audience of over 100k followers." }
    ],
    stats: [
      { value: "100k+", label: "TikTok followers" },
      { value: "4", label: "Languages spoken" },
      { value: "3", label: "Markets — Egypt, Qatar & UAE" },
      { value: "20+", label: "Brands directed for" }
    ],
    resumeUrl: null /* TBD — add a résumé/profile PDF link when supplied */
  },

  services: [
    {
      id: "film",
      index: "01",
      name: "Film & Cinematography",
      short: "Directing, videography and cinematic ads, short films and music videos.",
      description: "Full-scale direction and production — from brief to final cut. Cinematic advertising, short-form narrative film and music video work, shot and edited for brands, institutions and personal projects.",
      capabilities: ["Direction", "Videography", "Advanced editing", "Colour & sound finishing"],
      projectSlugs: ["made-in-egypt", "aast-media-dept-ad", "orangette-cinematic-ad", "relation-chip", "envy", "ps-vr", "time", "think"]
    },
    {
      id: "photography",
      index: "02",
      name: "Photography",
      short: "Editorial, product and event photography for hospitality and lifestyle brands.",
      description: "Considered, story-led photography — tabletop and product work, event and performance coverage, and lifestyle imagery built to carry a brand's tone across its channels.",
      capabilities: ["Product & tabletop", "Event & performance", "Lifestyle"],
      projectSlugs: ["rise-group-qatar", "qatar-foundation", "lebanero", "jeedas"]
    },
    {
      id: "graphic-design",
      index: "03",
      name: "Graphic Design & Branding",
      short: "Campaign design, branding systems and print & digital ad design.",
      description: "Visual identity and campaign design for construction, hospitality, retail and tourism clients — from single ad concepts to full seasonal collections.",
      capabilities: ["Campaign concepts", "Ad design", "Collection & product covers"],
      projectSlugs: ["pix-noise-branding", "rivage-developments", "krass-constructions", "goo-xplore", "mohie-fine-arts-furniture", "orangette-collection", "sea-plus-branding"]
    },
    {
      id: "social",
      index: "04",
      name: "Social Media Content",
      short: "Content production and campaign management across platforms.",
      description: "Ongoing content production for social channels — short-form video, reels and photography built for consistent posting cadence and brand presence.",
      capabilities: ["Short-form video", "Content calendars", "Platform-native editing"],
      projectSlugs: ["cafe-noir-sasso", "one-to-one-diet", "techno-gym-qatar", "sea-plus-social", "orangette-social", "dermacy-labs", "personal-social"]
    },
    {
      id: "web",
      index: "05",
      name: "Web Development",
      short: "Brand websites and e-commerce builds.",
      description: "End-to-end web builds — from agency and studio marketing sites to a full Shopify storefront — covering structure, design and launch.",
      capabilities: ["Site builds", "Shopify e-commerce", "Brand sites"],
      projectSlugs: ["pix-noise-website", "wmstudio", "orangette-shopify"]
    },
    {
      id: "concept-3d",
      index: "06",
      name: "3D & Motion Design",
      short: "Cinematic 3D environments built in Unreal Engine 5.",
      description: "Concept environments and cinematic scenes designed and rendered in Unreal Engine 5, exploring futuristic and sci-fi worldbuilding.",
      capabilities: ["Environment design", "Unreal Engine 5", "Cinematic rendering"],
      projectSlugs: ["unreal-3d-concepts"]
    }
  ],

  industries: [
    { id: "food-beverage", name: "Food & Beverage" },
    { id: "construction-real-estate", name: "Real Estate & Construction" },
    { id: "fashion-lifestyle", name: "Fashion & Lifestyle" },
    { id: "beauty", name: "Beauty" },
    { id: "fitness-wellness", name: "Fitness & Wellness" },
    { id: "education", name: "Education" },
    { id: "travel-tourism", name: "Travel & Tourism" },
    { id: "marketing-agency", name: "Marketing & Advertising" },
    { id: "maritime-leisure", name: "Maritime & Leisure" },
    { id: "antiques-furniture", name: "Antiques & Furniture" },
    { id: "architecture", name: "Architecture" },
    { id: "independent", name: "Independent / Personal Work" }
  ],

  countries: [
    {
      code: "EG",
      name: "Egypt",
      note: "Based in Alexandria — home market. Campaigns, brand films and design work for Egyptian clients including Mohie Fine Arts, AAST, and Goo Xplore's domestic tourism campaigns.",
      projectSlugs: ["made-in-egypt", "aast-media-dept-ad", "goo-xplore", "mohie-fine-arts-furniture"]
    },
    {
      code: "QA",
      name: "Qatar",
      note: "A year of media industry experience — photography, videography and social content for hospitality and wellness brands.",
      projectSlugs: ["rise-group-qatar", "qatar-foundation", "sea-plus-branding", "sea-plus-social", "cafe-noir-sasso", "one-to-one-diet", "techno-gym-qatar"]
    },
    {
      code: "AE",
      name: "United Arab Emirates",
      note: "Cinematic advertising, collection design, social content and the full Shopify build for Orangette (orangette.us).",
      projectSlugs: ["orangette-cinematic-ad", "orangette-collection", "orangette-social", "orangette-shopify"]
    }
  ],
  /* Additional markets referenced in the creative brief (Saudi Arabia, US, UK, Kuwait) are not
     yet evidenced by verified source material — flagged in README as information still needed. */

  /* Full experience-map strip. Egypt, Qatar & UAE are backed by verified project data. */
  experienceMap: [
    { name: "Egypt", code: "EG", verified: true },
    { name: "Qatar", code: "QA", verified: true },
    { name: "United Arab Emirates", code: "AE", verified: true }
  ],

  clients: [
    { id: "mohie-fine-arts", name: "Mohie Fine Arts", industry: "antiques-furniture", country: "EG", projectSlugs: ["made-in-egypt", "mohie-fine-arts-furniture"] },
    { id: "aast", name: "Arab Academy for Science & Technology (AAST)", industry: "education", country: "EG", projectSlugs: ["aast-media-dept-ad"] },
    { id: "orangette", name: "Orangette", industry: "fashion-lifestyle", country: "AE", projectSlugs: ["orangette-cinematic-ad", "orangette-collection", "orangette-social", "orangette-shopify"] },
    { id: "rise-group", name: "Rise Group — NOIR", industry: "food-beverage", country: "QA", projectSlugs: ["rise-group-qatar"] },
    { id: "qatar-foundation", name: "Qatar Foundation", industry: "education", country: "QA", projectSlugs: ["qatar-foundation"] },
    { id: "lebanero", name: "Lebanero", industry: "food-beverage", country: null, projectSlugs: ["lebanero"] },
    { id: "jeedas", name: "Jeeda's", industry: "food-beverage", country: null, projectSlugs: ["jeedas"] },
    { id: "pix-noise", name: "Pix Noise", industry: "marketing-agency", country: null, projectSlugs: ["pix-noise-branding", "pix-noise-website"] },
    { id: "rivage", name: "Rivage Developments", industry: "construction-real-estate", country: null, projectSlugs: ["rivage-developments"] },
    { id: "krass", name: "Krass Constructions", industry: "construction-real-estate", country: null, projectSlugs: ["krass-constructions"] },
    { id: "goo-xplore", name: "Goo Xplore", industry: "travel-tourism", country: "EG", projectSlugs: ["goo-xplore"] },
    { id: "sea-plus", name: "Sea Plus", industry: "maritime-leisure", country: "QA", projectSlugs: ["sea-plus-branding", "sea-plus-social"] },
    { id: "cafe-noir-sasso", name: "Cafe Noir & Sasso", industry: "food-beverage", country: "QA", projectSlugs: ["cafe-noir-sasso"] },
    { id: "one-to-one-diet", name: "1:1 Diet", industry: "fitness-wellness", country: "QA", projectSlugs: ["one-to-one-diet"] },
    { id: "techno-gym", name: "Techno Gym", industry: "fitness-wellness", country: "QA", projectSlugs: ["techno-gym-qatar"] },
    { id: "dermacy-labs", name: "Dermacy Labs", industry: "beauty", country: null, projectSlugs: ["dermacy-labs"] },
    { id: "wmstudio", name: "Walid Moussa — Architecture & Design", industry: "architecture", country: null, projectSlugs: ["wmstudio"] }
  ],

  projects: [
    {
      slug: "made-in-egypt",
      images: [],
      videos: ["3658-fdTyeG", "EI5WZ95tvN2"],
      title: "Made In Egypt",
      client: "Mohie Fine Arts",
      services: ["film"],
      industry: "antiques-furniture",
      country: "EG",
      year: null,
      summary: "A cinematic campaign ad produced for Mohie Fine Arts, celebrating Egyptian craftsmanship.",
      role: "Director / Videographer / Editor",
      gallerySlots: 4
    },
    {
      slug: "aast-media-dept-ad",
      images: [],
      videos: ["VYRsXSRNqx3"],
      title: "AAST Media Department",
      client: "Arab Academy for Science & Technology",
      services: ["film"],
      industry: "education",
      country: "EG",
      year: null,
      summary: "Official cinematic ad produced for AAST's Media Department.",
      role: "Director / Videographer / Editor",
      gallerySlots: 3
    },
    {
      slug: "orangette-cinematic-ad",
      images: [],
      videos: ["R68b5gzjitK"],
      title: "Orangette \u2014 Cinematic Ad",
      client: "Orangette",
      services: ["film"],
      industry: "fashion-lifestyle",
      country: "AE",
      year: null,
      summary: "Cinematic advertisement produced for Orangette.",
      role: "Director / Videographer / Editor",
      gallerySlots: 2
    },
    {
      slug: "orangette-collection",
      images: ["media/projects/orangette-collection/orangette-collection-01.jpg", "media/projects/orangette-collection/orangette-collection-02.jpg", "media/projects/orangette-collection/orangette-collection-03.jpg", "media/projects/orangette-collection/orangette-collection-04.jpg", "media/projects/orangette-collection/orangette-collection-05.jpg", "media/projects/orangette-collection/orangette-collection-06.jpg", "media/projects/orangette-collection/orangette-collection-07.jpg", "media/projects/orangette-collection/orangette-collection-08.jpg", "media/projects/orangette-collection/orangette-collection-09.jpg"],
      videos: [],
      title: "Orangette \u2014 Collection Design",
      client: "Orangette",
      services: ["graphic-design"],
      industry: "fashion-lifestyle",
      country: "AE",
      year: null,
      summary: "Seasonal collection cover design for Orangette's online store \u2014 Abaya, Chocolate, Curls, Elegant, Funny, Matcha, Mugs, Smart and Zodiac collections.",
      role: "Designer",
      gallerySlots: 9
    },
    {
      slug: "orangette-social",
      images: [],
      videos: ["EYEoEJqD5Gt", "FWgooKWxBtA", "GMqzqeojceT", "GwsH9upTgGs", "KIpq2BzGTmW"],
      title: "Orangette \u2014 Social Content",
      client: "Orangette",
      services: ["social"],
      industry: "fashion-lifestyle",
      country: "AE",
      year: null,
      summary: "Ongoing social media content production for Orangette, including product and lifestyle video.",
      role: "Content Producer",
      gallerySlots: 5
    },
    {
      slug: "orangette-shopify",
      images: ["media/projects/orangette-shopify/orangette-shopify-01.jpg", "media/projects/orangette-shopify/orangette-shopify-02.jpg", "media/projects/orangette-shopify/orangette-shopify-03.jpg", "media/projects/orangette-shopify/orangette-shopify-04.jpg", "media/projects/orangette-shopify/orangette-shopify-05.jpg"],
      videos: [],
      title: "Orangette \u2014 Shopify Store",
      client: "Orangette",
      services: ["web"],
      industry: "fashion-lifestyle",
      country: "AE",
      year: null,
      summary: "Full Shopify storefront build for Orangette (orangette.us) \u2014 structure, design and launch.",
      role: "Web Developer",
      gallerySlots: 5
    },
    {
      slug: "relation-chip",
      images: [],
      videos: ["SU3yDteV2Id"],
      title: "Relation-Chip",
      client: "Independent",
      services: ["film"],
      industry: "independent",
      country: null,
      year: "2022",
      summary: "Short film.",
      role: "Director / Editor",
      gallerySlots: 3
    },
    {
      slug: "envy",
      images: [],
      videos: ["Gb22zKHggZ3"],
      title: "Envy",
      client: "Independent",
      services: ["film"],
      industry: "independent",
      country: null,
      year: "2021",
      summary: "Short film.",
      role: "Director / Editor",
      gallerySlots: 3
    },
    {
      slug: "ps-vr",
      images: [],
      videos: ["LvFBqY-vY-R"],
      title: "PS VR",
      client: "Independent",
      services: ["film"],
      industry: "independent",
      country: null,
      year: "2021",
      summary: "Advertisement.",
      role: "Director / Editor",
      gallerySlots: 2
    },
    {
      slug: "time",
      images: [],
      videos: ["Qmd6GNUCSGe"],
      title: "Time",
      client: "Independent",
      services: ["film"],
      industry: "independent",
      country: null,
      year: "2021",
      summary: "Music video.",
      role: "Director / Editor",
      gallerySlots: 3
    },
    {
      slug: "think",
      images: [],
      videos: ["RQcybwEqZw4"],
      title: "Think",
      client: "Independent",
      services: ["film"],
      industry: "independent",
      country: null,
      year: "2019",
      summary: "Short film.",
      role: "Director / Editor",
      gallerySlots: 3
    },
    {
      slug: "rise-group-qatar",
      images: ["media/projects/rise-group-qatar/rise-group-qatar-02.jpg", "media/projects/rise-group-qatar/rise-group-qatar-03.jpg", "media/projects/rise-group-qatar/rise-group-qatar-04.jpg", "media/projects/rise-group-qatar/rise-group-qatar-05.jpg", "media/projects/rise-group-qatar/rise-group-qatar-06.jpg", "media/projects/rise-group-qatar/rise-group-qatar-07.jpg", "media/projects/rise-group-qatar/rise-group-qatar-08.jpg", "media/projects/rise-group-qatar/rise-group-qatar-09.jpg", "media/projects/rise-group-qatar/rise-group-qatar-10.jpg", "media/projects/rise-group-qatar/rise-group-qatar-11.jpg", "media/projects/rise-group-qatar/rise-group-qatar-12.jpg", "media/projects/rise-group-qatar/rise-group-qatar-13.jpg", "media/projects/rise-group-qatar/rise-group-qatar-14.jpg", "media/projects/rise-group-qatar/rise-group-qatar-15.jpg", "media/projects/rise-group-qatar/rise-group-qatar-16.jpg", "media/projects/rise-group-qatar/rise-group-qatar-17.jpg"],
      videos: [],
      title: "Rise Group — NOIR",
      client: "Rise Group — NOIR",
      services: ["photography"],
      industry: "food-beverage",
      country: "QA",
      year: null,
      summary: "Product and interior photography for NOIR — chocolate, tabletop styling and restaurant interiors.",
      role: "Photographer",
      gallerySlots: 8
    },
    {
      slug: "qatar-foundation",
      images: ["media/projects/qatar-foundation/qatar-foundation-02.jpg", "media/projects/qatar-foundation/qatar-foundation-03.jpg", "media/projects/qatar-foundation/qatar-foundation-04.jpg", "media/projects/qatar-foundation/qatar-foundation-05.jpg", "media/projects/qatar-foundation/qatar-foundation-06.jpg", "media/projects/qatar-foundation/qatar-foundation-07.jpg", "media/projects/qatar-foundation/qatar-foundation-08.jpg", "media/projects/qatar-foundation/qatar-foundation-09.jpg", "media/projects/qatar-foundation/qatar-foundation-10.jpg", "media/projects/qatar-foundation/qatar-foundation-11.jpg", "media/projects/qatar-foundation/qatar-foundation-12.jpg", "media/projects/qatar-foundation/qatar-foundation-13.jpg", "media/projects/qatar-foundation/qatar-foundation-14.jpg", "media/projects/qatar-foundation/qatar-foundation-15.jpg"],
      videos: [],
      title: "Qatar Foundation",
      client: "Qatar Foundation",
      services: ["photography"],
      industry: "education",
      country: "QA",
      year: null,
      summary: "Stage and performance photography covering a children's theatrical production.",
      role: "Photographer",
      gallerySlots: 8
    },
    {
      slug: "lebanero",
      images: ["media/projects/lebanero/lebanero-02.jpg", "media/projects/lebanero/lebanero-03.jpg", "media/projects/lebanero/lebanero-04.jpg", "media/projects/lebanero/lebanero-05.jpg", "media/projects/lebanero/lebanero-06.jpg", "media/projects/lebanero/lebanero-07.jpg", "media/projects/lebanero/lebanero-08.jpg", "media/projects/lebanero/lebanero-09.jpg", "media/projects/lebanero/lebanero-10.jpg", "media/projects/lebanero/lebanero-11.jpg", "media/projects/lebanero/lebanero-12.jpg", "media/projects/lebanero/lebanero-13.jpg", "media/projects/lebanero/lebanero-14.jpg", "media/projects/lebanero/lebanero-15.jpg", "media/projects/lebanero/lebanero-16.jpg", "media/projects/lebanero/lebanero-17.jpg", "media/projects/lebanero/lebanero-18.jpg", "media/projects/lebanero/lebanero-19.jpg", "media/projects/lebanero/lebanero-20.jpg", "media/projects/lebanero/lebanero-21.jpg"],
      videos: [],
      title: "Lebanero",
      client: "Lebanero",
      services: ["photography"],
      industry: "food-beverage",
      country: null,
      year: null,
      summary: "Food and lifestyle photography — Lebanese dishes and waterside lifestyle imagery.",
      role: "Photographer",
      gallerySlots: 8
    },
    {
      slug: "jeedas",
      images: ["media/projects/jeedas/jeedas-02.jpg", "media/projects/jeedas/jeedas-03.jpg", "media/projects/jeedas/jeedas-04.jpg", "media/projects/jeedas/jeedas-05.jpg", "media/projects/jeedas/jeedas-06.jpg", "media/projects/jeedas/jeedas-07.jpg", "media/projects/jeedas/jeedas-08.jpg", "media/projects/jeedas/jeedas-09.jpg"],
      videos: [],
      title: "Jeeda's",
      client: "Jeeda's",
      services: ["photography"],
      industry: "food-beverage",
      country: null,
      year: null,
      summary: "Bar, cocktail and seafood photography.",
      role: "Photographer",
      gallerySlots: 6
    },
    {
      slug: "pix-noise-branding",
      images: ["media/projects/pix-noise-branding/pix-noise-branding-01.jpg", "media/projects/pix-noise-branding/pix-noise-branding-02.jpg", "media/projects/pix-noise-branding/pix-noise-branding-03.jpg", "media/projects/pix-noise-branding/pix-noise-branding-04.jpg", "media/projects/pix-noise-branding/pix-noise-branding-05.jpg", "media/projects/pix-noise-branding/pix-noise-branding-06.jpg", "media/projects/pix-noise-branding/pix-noise-branding-07.jpg", "media/projects/pix-noise-branding/pix-noise-branding-08.jpg", "media/projects/pix-noise-branding/pix-noise-branding-09.jpg", "media/projects/pix-noise-branding/pix-noise-branding-10.jpg"],
      videos: [],
      title: "Pix Noise \u2014 Branding",
      client: "Pix Noise",
      services: ["graphic-design"],
      industry: "marketing-agency",
      country: null,
      year: null,
      summary: "Campaign and ad design for marketing agency Pix Noise.",
      role: "Designer",
      gallerySlots: 10
    },
    {
      slug: "pix-noise-website",
      images: ["media/projects/pix-noise-website/pix-noise-website-01.jpg", "media/projects/pix-noise-website/pix-noise-website-02.jpg", "media/projects/pix-noise-website/pix-noise-website-03.jpg", "media/projects/pix-noise-website/pix-noise-website-04.jpg", "media/projects/pix-noise-website/pix-noise-website-05.jpg", "media/projects/pix-noise-website/pix-noise-website-06.jpg", "media/projects/pix-noise-website/pix-noise-website-07.jpg", "media/projects/pix-noise-website/pix-noise-website-08.jpg"],
      videos: [],
      title: "Pix Noise \u2014 Website",
      client: "Pix Noise",
      services: ["web"],
      industry: "marketing-agency",
      country: null,
      year: null,
      summary: "Marketing website build for Pix Noise.",
      role: "Web Developer",
      gallerySlots: 8
    },
    {
      slug: "rivage-developments",
      images: ["media/projects/rivage-developments/rivage-developments-02.jpg", "media/projects/rivage-developments/rivage-developments-03.jpg", "media/projects/rivage-developments/rivage-developments-04.jpg", "media/projects/rivage-developments/rivage-developments-05.jpg"],
      videos: [],
      title: "Rivage Developments — Smart Island",
      client: "Rivage Developments",
      services: ["graphic-design"],
      industry: "construction-real-estate",
      country: null,
      year: null,
      summary: "\"Smart Island\" real-estate campaign design for a construction developer.",
      role: "Designer",
      gallerySlots: 5
    },
    {
      slug: "krass-constructions",
      images: ["media/projects/krass-constructions/krass-constructions-02.jpg", "media/projects/krass-constructions/krass-constructions-03.jpg", "media/projects/krass-constructions/krass-constructions-04.jpg", "media/projects/krass-constructions/krass-constructions-05.jpg"],
      videos: [],
      title: "Krass Constructions",
      client: "Krass Constructions",
      services: ["graphic-design"],
      industry: "construction-real-estate",
      country: null,
      year: null,
      summary: "Campaign design and promotional video work for a construction company.",
      role: "Designer / Videographer",
      gallerySlots: 5
    },
    {
      slug: "goo-xplore",
      images: ["media/projects/goo-xplore/goo-xplore-02.jpg", "media/projects/goo-xplore/goo-xplore-03.jpg", "media/projects/goo-xplore/goo-xplore-04.jpg", "media/projects/goo-xplore/goo-xplore-05.jpg", "media/projects/goo-xplore/goo-xplore-06.jpg"],
      videos: [],
      title: "Goo Xplore",
      client: "Goo Xplore",
      services: ["graphic-design"],
      industry: "travel-tourism",
      country: "EG",
      year: null,
      summary: "Domestic tourism campaign design for Port Said and Siwa.",
      role: "Designer",
      gallerySlots: 4
    },
    {
      slug: "mohie-fine-arts-furniture",
      images: ["media/projects/mohie-fine-arts-furniture/mohie-fine-arts-furniture-02.jpg", "media/projects/mohie-fine-arts-furniture/mohie-fine-arts-furniture-03.jpg", "media/projects/mohie-fine-arts-furniture/mohie-fine-arts-furniture-04.jpg", "media/projects/mohie-fine-arts-furniture/mohie-fine-arts-furniture-05.jpg", "media/projects/mohie-fine-arts-furniture/mohie-fine-arts-furniture-06.jpg"],
      videos: [],
      title: "Mohie Fine Arts — Timeless Collection",
      client: "Mohie Fine Arts",
      services: ["graphic-design"],
      industry: "antiques-furniture",
      country: "EG",
      year: null,
      summary: "Luxury furniture product campaign — \"Timeless Elegance / Timeless Beauty.\"",
      role: "Designer",
      gallerySlots: 4
    },
    {
      slug: "sea-plus-branding",
      images: ["media/projects/sea-plus-branding/sea-plus-branding-01.jpg", "media/projects/sea-plus-branding/sea-plus-branding-02.jpg", "media/projects/sea-plus-branding/sea-plus-branding-03.jpg", "media/projects/sea-plus-branding/sea-plus-branding-04.jpg", "media/projects/sea-plus-branding/sea-plus-branding-05.jpg", "media/projects/sea-plus-branding/sea-plus-branding-06.jpg", "media/projects/sea-plus-branding/sea-plus-branding-07.jpg", "media/projects/sea-plus-branding/sea-plus-branding-08.jpg"],
      videos: [],
      title: "Sea Plus \u2014 Branding",
      client: "Sea Plus",
      services: ["graphic-design"],
      industry: "maritime-leisure",
      country: "QA",
      year: null,
      summary: "Yacht and boat charter campaign design for Sea Plus.",
      role: "Designer",
      gallerySlots: 8
    },
    {
      slug: "sea-plus-social",
      images: [],
      videos: ["3hDk5-f_6tM", "L8XkrmeRiE5"],
      title: "Sea Plus \u2014 Social Content",
      client: "Sea Plus",
      services: ["social"],
      industry: "maritime-leisure",
      country: "QA",
      year: null,
      summary: "Social media content for Sea Plus.",
      role: "Content Producer",
      gallerySlots: 2
    },
    {
      slug: "cafe-noir-sasso",
      images: [],
      videos: ["-XZt-YTIzBY", "37LQjEmHpsN", "3CyqdZ6xXLr", "3iFdTMcqU7Q", "7U6_-xamsK2", "C2ZgkvLPgGJ", "CYdEBVndJjj", "FzabP-XtVuV", "HFimag9dm5x", "KGh3-qUf6De", "KtPXR7ILB2d", "LRphVjHitmy", "SMjkg3MDYwN", "SXhWRM_UQdo", "T53wXkcBqBm", "T7aFqKV9_R8"],
      title: "Cafe Noir & Sasso",
      client: "Cafe Noir & Sasso",
      services: ["social"],
      industry: "food-beverage",
      country: "QA",
      year: null,
      summary: "Ongoing social content production.",
      role: "Content Producer",
      gallerySlots: 3
    },
    {
      slug: "one-to-one-diet",
      images: [],
      videos: ["2adn9an6s6Z", "DCZI9JdYVdd", "F6q5bPTARE6", "KWtDeFfoemI", "MDVHMJLKzK8", "NFv8JHfzZ4h"],
      title: "1:1 Diet",
      client: "1:1 Diet",
      services: ["social"],
      industry: "fitness-wellness",
      country: "QA",
      year: null,
      summary: "Social content for a personalised nutrition brand.",
      role: "Content Producer",
      gallerySlots: 3
    },
    {
      slug: "techno-gym-qatar",
      images: [],
      videos: ["LejWbZnxZeZ", "M8N2d9-mw_t"],
      title: "Techno Gym",
      client: "Techno Gym",
      services: ["social"],
      industry: "fitness-wellness",
      country: "QA",
      year: null,
      summary: "Equipment and studio content for a gym brand.",
      role: "Content Producer",
      gallerySlots: 3
    },
    {
      slug: "dermacy-labs",
      images: [],
      videos: ["-_hVbrzvFPg"],
      title: "Dermacy Labs",
      client: "Dermacy Labs",
      services: ["social"],
      industry: "beauty",
      country: null,
      year: null,
      summary: "Product content for a skincare brand.",
      role: "Content Producer",
      gallerySlots: 2
    },
    {
      slug: "personal-social",
      images: [],
      videos: ["HCUspVzKmJd", "PqqZgIGTqPD", "SzybxFT2aib"],
      title: "Personal Social Media",
      client: "Independent",
      services: ["social"],
      industry: "independent",
      country: null,
      year: null,
      summary: "Omar's own social content — the channel that grew to over 100k followers.",
      role: "Creator / Editor",
      gallerySlots: 3
    },
    {
      slug: "wmstudio",
      images: ["media/projects/wmstudio/wmstudio-02.jpg", "media/projects/wmstudio/wmstudio-03.jpg", "media/projects/wmstudio/wmstudio-04.jpg"],
      videos: [],
      title: "WMStudio — Walid Moussa",
      client: "Walid Moussa — Architecture & Design",
      services: ["web"],
      industry: "architecture",
      country: null,
      year: null,
      summary: "Marketing website for an architecture and design consultancy.",
      role: "Web Developer",
      gallerySlots: 3
    },
    {
      slug: "unreal-3d-concepts",
      images: [],
      videos: ["-62uJP3yjd6", "6jVnQwsq9go", "EvBNUMdaSGq", "SVMpoc5MBBY"],
      title: "3D Concept Scenes",
      client: "Independent",
      services: ["concept-3d"],
      industry: "independent",
      country: null,
      year: null,
      summary: "Cinematic sci-fi and futuristic environments designed and rendered in Unreal Engine 5.",
      role: "3D Environment Artist",
      gallerySlots: 4
    }
  ],

  /* Highlighted on Home — a curated cross-section, not everything */
  featuredProjectSlugs: [
    "relation-chip", "rise-group-qatar", "personal-social", "orangette-collection",
    "unreal-3d-concepts", "sea-plus-branding", "one-to-one-diet", "lebanero"
  ]
};
