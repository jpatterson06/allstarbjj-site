# HANDOFF — AllStar BJJ Site Pre-Cutover Fixes
*July 13, 2026, ~1:00 AM. For the next AI assistant picking up this work. Owner: Jamal Patterson (non-technical — keep explanations short, ask before deploying anything). General repo docs are in HANDOFF.md; this file is the state of tonight's work.*

## Situation

This repo is the new allstarbjj.com (Astro 4, static, Netlify, currently live at allstarbjj-new.netlify.app). Jamal wants to cut DNS over to allstarbjj.com TONIGHT. A pre-cutover fix pass was completed but the final build verification was interrupted. **Source edits are DONE. Build + verify is NOT confirmed. Nothing has been deployed.**

## Confirmed business facts (single source of truth — from Jamal directly, July 13, 2026)

- Google reviews: **4.6 stars, 192 reviews** (old hardcoded 5.0/80 was wrong)
- Hours: **Mon–Fri 9:00 AM–9:00 PM, Sat 9:00 AM–1:00 PM, Sun closed**
- Kids: **Cubs ages 4–6, Lions ages 7–13**
- Jamal is a **4th degree black belt under Renzo Gracie** (also: ADCC veteran, IFL/Bellator pro MMA, UWC LHW Champion)
- **300+ students** trained (not 500+)
- Founded 2011 → **15 years in Union**
- **No wrestling program** (wrestling inside MMA/BJJ descriptions is fine; never list Wrestling as its own program)
- Socials: **facebook.com/allstarbjjmma** and **instagram.com/allstar_martialarts**
- Google Maps link: **https://maps.app.goo.gl/cBJKvZMvtEjfTgNY9** — real geo: **40.6925196, -74.2863264**
- GBP: primary "Martial arts school"; secondaries: Jujitsu school, Kickboxing school, Martial arts club, Self defense school, After school program
- Competitor gyms must NOT be named on the site (Jamal's decision)
- Pricing stays OFF the site; lead with free 2-week trial
- NAP: AllStar Martial Arts, 1166 West Chestnut St, Union, NJ 07083, (908) 341-1131, info@allstarbjj.com

## Edits already made (in working tree, NOT yet git-committed)

1. **src/layouts/PageLayout.astro** — sitewide schema: rating 4.6/192, real geo, real hasMap link, absolute image URL, correct socials, founder description w/ 4th degree
2. **src/components/LocalBusinessSchema.astro** — rating 4.6/192, real geo, added hasMap
3. **src/pages/index.astro** — inline schema: geo, hasMap, hours fixed to Mo-Fr 09:00-21:00 / Sa 09:00-13:00; "13+" stat → "15"; about-block photo alt corrected (it's the MMA team photo, not a BJJ class); "4th degree black belt under Renzo Gracie" in Coach Jamal intro
4. **src/pages/about-us.astro** — Person schema award now "4th Degree Black Belt under Renzo Gracie"; hero sub "coaching since 2011"; "Over 15 years of coaching"
5. **src/components/Header.astro** — logo alt: removed "Wrestling", now "…Muay Thai, MMA, Kids Programs"
6. **src/pages/trial/kids.astro** — all ages corrected to Cubs 4–6 / Lions 7–13 (was 4–7/7–14 in 7 places)
7. **src/pages/trial/{index,bjj,mma,muay-thai,kids}.astro** — "500+" students stat → "300+"
8. **src/lib/towns.ts** — competitor names removed from cranford, maplewood, chatham, livingston whyDriveHere entries (arguments kept, names cut); 4th degree added
9. **src/pages/cranford.astro** — Renzo Gracie Garwood mention removed
10. **public/llms.txt** — 300+ students, 4.6 stars (192 reviews), correct hours, 4th degree
11. **public/robots.txt** — NEW file, allows all, disallows /thanks/, points to https://allstarbjj.com/sitemap-index.xml
12. **astro.config.mjs** — added @astrojs/sitemap integration (package installed, in package.json) + `vite: { cacheDir: '/tmp/vite-cache' }` (added only to work around a sandbox mount permission issue; harmless on macOS/Netlify, can be removed if it causes trouble)
13. **public/images/** — compressed IN PLACE (same filenames): muay-thai-pads.jpg 24.96MB→134KB, preschool-kids.jpg 3.36MB→199KB, jamal-story.jpg 2.24MB→184KB, gym-hero.jpg 1.05MB→128KB, union-mat.jpg 318KB→171KB

## NEXT STEPS (do these, in order)

1. `npm run build` — takes a few minutes. Confirm it completes with no errors.
2. Verify the build:
   - dist/sitemap-index.xml exists, URLs use https://allstarbjj.com
   - dist/robots.txt exists
   - dist/index.html contains: "192", "4.6", "maps.app.goo.gl", "allstarbjjmma", "40.6925196", "09:00-21:00"
   - NO leftovers anywhere in dist/: reviewCount "80", ratingValue "5" (as the rating), "Bodega", "Dynasty", "Gracie Garwood", "Integrated Martial", "500+", "4–7", "7–14"
   - Every JSON-LD block in dist/index.html, dist/cranford/index.html, dist/about-us/index.html parses as valid JSON
   - dist/images/muay-thai-pads.jpg is ~134KB
3. Show Jamal a short diff summary and ask **"Approve deploy?"** — do not push without his yes.
4. Deploy = git commit + push to main (Netlify auto-deploys). Confirm the Netlify deploy succeeds and spot-check allstarbjj-new.netlify.app.
5. Then Jamal switches DNS for allstarbjj.com (walk him through his registrar if he asks — he is not technical).

## Known issues deliberately LEFT for after cutover (backlog, needs Jamal's phase approval)

- 6 of 11 city pages have no LocalBusiness/FAQ schema (springfield, roselle-park, kenilworth, mountainside, chatham, livingston)
- Program pages show FAQs visually but emit no FAQPage JSON-LD (only /preschool/ does)
- Blog posts have no Article/BlogPosting schema; author block hardcodes "Pro MMA record 6-3" (unverified — ask Jamal)
- No width/height attributes on any img (CLS); blog author avatar loads jamal-story.jpg at 64px
- City page meta descriptions are near-duplicates
- Image SEO renames (descriptive filenames) planned but NOT done tonight to avoid breaking references
- No analytics installed
- No twitter:image tag; SVG-only favicon
- GBP services list includes Judo/Karate/Boxing/Wrestling which aren't offered — Jamal should remove those in the GBP dashboard
- Missing city pages: Union (dedicated), Clark, Hillside, Elizabeth, Linden, Scotch Plains, Rahway, Garwood, South Orange
- No Private Lessons page; kids blog category is empty
- Master plan: see "AllStar BJJ - Phase 0 Discovery Report.md" in the AllStar Online workspace folder + Jamal's 10-phase master prompt (audit → GBP map → homepage rewrite → schema → city pages → program pages → knowledge hub → instructor pages → internal linking → pre-deploy gate)

## Ground rules from Jamal's master prompt (apply to ALL future work)

- Never invent facts — ask Jamal
- Recycle existing photos only; no stock, no AI images
- Work in phases, show changes, wait for approval before the next phase
- Mandatory pre-deploy checklist before every deploy (schema validates, no broken links, unique titles/metas, NAP matches GBP, Lighthouse ≥90 mobile, diff summary, then "Approve deploy?")
- Banned fluff words list (no "unlock", "elevate", "comprehensive", "delve", "seamless", etc.)
- 5th-grade reading level, local-expert-to-neighbor voice, Goal Completion rule: first sentence = service + city, second = value/CTA
