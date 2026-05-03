# AllStar BJJ — Public Site Handoff

**Built with:** Astro 4 + Tailwind CSS 3 + Netlify  
**Repo:** jpatterson06/allstarbjj-site  
**Dev server:** `npm run dev` → http://localhost:4321  
**Deploy:** Push to main → Netlify auto-builds and publishes

---

## What This Site Is

A full static marketing site to replace the WordPress/Spark-managed allstarbjj.com. Built for SEO, lead capture, and program clarity. No CMS dependency — Jamal controls everything.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Astro 4 | Static output, no JS runtime overhead |
| Styling | Tailwind CSS 3 | Custom brand palette (see below) |
| Forms | Netlify Forms | Leads land in Netlify dashboard + email |
| Hosting | Netlify | Same account as Command Center |
| Video | youtube-nocookie.com | Privacy-first embeds |

### Brand Colors (tailwind.config.mjs)
- `brand-navy` — #002D4D (primary dark)
- `brand-red` — #dc2626 (CTA, accents)
- `brand-gold` — #fbbf24 (highlights)
- `brand-black` — #111827
- `brand-gray` — #6B7280
- `brand-gray-light` — #F3F4F6

---

## Site Map (all pages built)

| URL | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage with hero, programs grid, Coach Jamal block, stats bar, Rules of the Academy video, CTA |
| `/adult-bjj/` | `src/pages/adult-bjj.astro` | Adult BJJ program page |
| `/adult-muay-thai/` | `src/pages/adult-muay-thai.astro` | Muay Thai page — hero: muay-thai-pads.jpg |
| `/adult-mma/` | `src/pages/adult-mma.astro` | MMA page — hero: mma-team.jpg |
| `/kids/` | `src/pages/kids/index.astro` | Lions program (ages 7–13) — YouTube Short embedded |
| `/preschool/` | `src/pages/preschool.astro` | Cubs program (ages 4–6) — YouTube Short embedded |
| `/about-us/` | `src/pages/about-us.astro` | Coach Jamal bio + floated photo + "Our Network" section |
| `/trial/` | `src/pages/trial/index.astro` | Generic free trial landing page |
| `/trial/<town>/` | `src/pages/trial/[town].astro` | 8 town-specific landing pages (dynamic route) |
| `/blog/` | `src/pages/blog/index.astro` | Blog index (placeholder — ready for content collection) |
| `/thanks/` | `src/pages/thanks.astro` | Form thank-you page (Netlify redirects here) |
| `/privacy-policy/` | `src/pages/privacy-policy.astro` | Legal |
| `/terms-of-service/` | `src/pages/terms-of-service.astro` | Legal |

### Town Landing Pages (`/trial/<slug>/`)
8 towns with unique copy to avoid duplicate content:

| Slug | Town | Drive Time |
|---|---|---|
| `union` | Union | 0 min — home gym |
| `springfield` | Springfield | 6 min |
| `cranford` | Cranford | 10 min |
| `westfield` | Westfield | 12 min |
| `mountainside` | Mountainside | 10 min |
| `maplewood` | Maplewood / South Orange | 15 min |
| `millburn` | Millburn / Short Hills | 12 min |
| `roselle-park` | Roselle Park | 6 min |

Town data lives in `src/lib/towns.ts`. To add a town: add an entry to the `towns` array — the page builds automatically.

---

## Components

| File | What It Does |
|---|---|
| `src/components/Header.astro` | Nav: About, BJJ, Muay Thai, MMA, Kids, Preschool, Blog, FREE TRIAL button |
| `src/components/Footer.astro` | Programs + Areas Served + contact info + legal links |
| `src/components/Hero.astro` | Homepage hero — full-bleed photo, vertical gradient overlay, headline + form |
| `src/components/PageHero.astro` | Inner-page hero — props: `bgImage`, `bgPosition`, `eyebrow`, `headline`, `sub`, `programLocked`, `showForm` |
| `src/components/LeadForm.astro` | Red opt-in form — prop: `programLocked` (drives conditional header) |
| `src/components/ProgramCard.astro` | Program grid card — title, ages, blurb, image, href |
| `src/components/FAQ.astro` | Collapsible FAQ using native `<details>/<summary>` — prop: `items` array |
| `src/components/CTA.astro` | Bottom CTA strip — props: `headline`, `sub` (both optional) |
| `src/components/YouTubeShort.astro` | Vertical 9:16 video embed — props: `videoId`, `title`, `caption` |
| `src/layouts/PageLayout.astro` | Wraps all pages — props: `title`, `description`, `ogImage` |

### LeadForm — programLocked behavior
- **With `programLocked`** (program pages): Shows `[Program Name] / TRY FREE 2-WEEK TRIAL` header. Program field is a hidden input.
- **Without `programLocked`** (homepage, trial pages): Shows generic "VIEW OUR SCHEDULE / AND GAIN ACCESS TO OUR / EXCLUSIVE WEB SPECIAL" header. Program field is a dropdown.

### YouTubeShort — usage
```astro
<YouTubeShort videoId="MWEknULk4pg" title="Rules of the Academy" caption="Optional caption." />
```
Uses `youtube-nocookie.com` — no tracking until user clicks play.

---

## Photos (in `public/images/`)

| File | Used On | Source |
|---|---|---|
| `logo.png` | Header (all pages) | IMG_8847.PNG from Jamal |
| `union-mat.jpg` | Homepage hero, Union trial page | Jamal AirDrop |
| `muay-thai-pads.jpg` | Muay Thai hero, homepage program card | IMG_1258.JPG from Jamal |
| `mma-team.jpg` | MMA hero, homepage About block, About Us "Our Network" | Jamal AirDrop |
| `preschool-kids.jpg` | Cubs/Preschool hero, homepage program card | Jamal AirDrop |
| `jamal-story.jpg` | About Us — floated inline in bio text | IMG_4420.HEIC → converted with sips |

To add more photos: drop files in `public/images/` and reference them as `/images/filename.jpg` in any page.

---

## YouTube Videos Embedded

| Video ID | Title | Page |
|---|---|---|
| `5KIOedUNOI8` | AllStar Kids class clip | `/kids/` and `/preschool/` |
| `MWEknULk4pg` | Rules of the Academy | Homepage |

---

## Lead Forms — How They Work

1. User fills out form → submits
2. Netlify intercepts (no server needed — handled at CDN layer)
3. Netlify emails Jamal at the address configured in Netlify dashboard
4. Lead also appears in Netlify dashboard → Forms → `lead-trial`
5. User lands on `/thanks/`

**To connect to a CRM later:** Set up a Netlify Form notification webhook → Zapier/Make → your CRM.

---

## Netlify Deploy

- Connected to GitHub repo `jpatterson06/allstarbjj-site`
- Every push to `main` triggers a build (~30–60 seconds)
- No environment variables needed (site is fully static + forms are Netlify-native)

---

## What's Not Done Yet (next steps)

| Task | Notes |
|---|---|
| **DNS cutover** | When ready: point `allstarbjj.com` A/CNAME records to Netlify. Do after thorough QA. |
| **Auto-blog** | SEO agent pipeline designed (see `seo-agent-plan.md` in command center). Writes posts → saves to `src/content/blog/` → Netlify rebuilds. Not yet wired. |
| **Google Analytics / Search Console** | Add GA4 tag to `PageLayout.astro` head. Submit sitemap to Search Console after go-live. |
| **Sitemap + robots.txt** | Astro has a sitemap plugin (`@astrojs/sitemap`) — add to `astro.config.mjs` before launch. |
| **Cal.com booking** | Not yet embedded. Can add to trial pages and/or the thanks page as a next-step CTA. |
| **Additional photos** | More real gym/class photos will improve every page. Drop in `public/images/` and swap src attributes. |
| **Kids hero photo** | `/kids/index.astro` currently uses a WordPress CDN URL. A local photo would be more reliable. |

---

## Key Design Decisions

- **No Birthday Parties program** — removed from nav, footer, forms, and all pages per Jamal's request.
- **Brand name is "AllStar"** (one word, no space) — corrected across all 16 files.
- **Bio credibility:** No fight record listed. Copy says "pro MMA fighter, ADCC veteran" everywhere.
- **Vertical gradient on heroes** — `from-black/90 via-black/45 to-black/10` (top-to-bottom only, no left-side gradient that would hide faces in photos).
- **Form width** — `max-w-sm` (384px) so hero photos stay visible on desktop.

---

*Last updated: May 2026*
