# All Star BJJ — Public Site

Marketing website for [allstarbjj.com](https://allstarbjj.com) — Astro + Tailwind, deployed to Netlify.

This is a **separate project** from the [command center](https://github.com/jpatterson06/Allstar-command-center). Sites are deployed independently:
- **Command center** (private dashboard): `jovial-crostata-5c5080.netlify.app`
- **Public site** (this repo): `allstarbjj.com` (planned cutover)

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 4 — ships near-zero JS, fast SEO |
| Styles | Tailwind CSS |
| Content | Markdown / MDX |
| Hosting | Netlify (auto-deploy on git push) |
| Forms | Netlify Forms (planned) |
| CMS | Decap CMS for visual editing (planned) |

## Local development

```bash
nvm use 20
npm install
npm run dev    # http://localhost:4321
```

## Project structure

```
src/
├── pages/        # Routes (index.astro = /, about-us.astro = /about-us/, etc.)
├── components/   # Reusable .astro components (Hero, ProgramCard, CTA, etc.)
├── layouts/      # Page wrappers (PageLayout, ServiceLayout)
├── content/      # Markdown content (services, towns, blog) — SEO agent writes here
├── styles/       # global.css with Tailwind + brand styles
└── lib/          # Helpers (schema.ts, seo.ts)

public/           # Static assets (images, favicon, robots.txt)
```

## Brand palette

| Token | Hex | Use |
|---|---|---|
| brand-red | #dc2626 | Primary CTAs, accents |
| brand-red-dark | #991b1b | Hover state |
| brand-black | #0a0a0a | Headers, dark sections |
| brand-gold | #fbbf24 | Star icon, highlights |
| brand-cream | #fef9f5 | Soft section backgrounds |

Display font: **Bebas Neue** (matches command center). Body: system stack.

## Deployment

Pushes to `main` auto-deploy to Netlify. The site is live at the preview URL until DNS cutover.

See [site-rebuild-plan.md](../allstarbjj-command-center/site-rebuild-plan.md) in the command center repo for the full migration plan.
