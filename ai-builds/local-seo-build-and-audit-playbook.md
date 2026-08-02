# AllStar — Local SEO Build & Audit Playbook (AI Build Note)

> Purpose: seed for a future **skill / artifact** that can (a) BUILD optimized local-SEO location pages and (b) AUDIT a site. Written from the AllStar Martial Arts project. Pairs with `LOCATION_PAGE_GUIDELINES.md` (the canonical page spec) and `src/lib/towns.ts` (verified per-town data).

---

## 0. The #1 rule: never invent facts

Every claim on a page must trace to a verified source:
- **Business facts** → schema (`LocalBusinessSchema.astro`), `public/llms.txt`, homepage.
- **Per-town facts** (drive time, direction, landmarks, why-drive-here) → `src/lib/towns.ts`. If a town isn't in `towns.ts`, use the facts already on its current page — do NOT make up new ones.
- **Coach credentials** → Jamal Patterson: 4th-degree BJJ black belt under Renzo Gracie, ADCC veteran, pro MMA (IFL, Bellator), UWC Light Heavyweight Champion; has cornered UFC fighters; family-owned since 2011.

Banned unless verifiable: made-up student anecdotes ("trained here 5–10 years"), invented schedules, absolute competitor claims ("nobody else offers…"), specific demographics not in `towns.ts`. These are what made an earlier pass read as fake.

**On AI detection:** Google does NOT penalize AI-written content. It penalizes *unhelpful, duplicate, or fabricated* content ("scaled content abuse"). The safe path is accuracy + uniqueness + real E-E-A-T — not disguising the tool. Ref: Google Search spam policies (scaled content abuse); FTC 2024 fake-review rule (never buy fake reviews).

---

## 1. Location Page BUILD spec

Canonical NAP: **AllStar Martial Arts · 1166 West Chestnut St, Union, NJ 07083 · (908) 341-1131 · info@allstarbjj.com** · Google Maps: https://maps.app.goo.gl/cBJKvZMvtEjfTgNY9 · geo 40.6925196, -74.2863264.

Section order (per `LOCATION_PAGE_GUIDELINES.md`, refined this project):

1. **PageHero** — eyebrow = drive time ("10 minutes from Cranford"); headline = "Martial Arts in {City}, NJ"; sub = programs + drive + free trial.
2. **Intro (white)** — LEAD with the accurate AllStar description (who we are, address, since 2011, coach creds), then the {City} connection (drive time/route from `towns.ts`). ~150–200 words. This is the "current description," NOT a town demographic essay.
3. **Embedded Google Business map (gray)** — NEW this project. Keyless iframe showing directions *from the town to the gym*, plus a "View AllStar on Google Maps" link to the real listing. This embeds the Google Business location in crawlable content.
   ```html
   <iframe title="Directions from {City}, NJ to AllStar Martial Arts..."
     src="https://maps.google.com/maps?saddr={City},+NJ&amp;daddr=1166+West+Chestnut+St,+Union,+NJ+07083&amp;output=embed"
     class="w-full h-72 md:h-80 rounded-lg border-0" loading="lazy"
     referrerpolicy="no-referrer-when-downgrade"></iframe>
   ```
4. **BJJ (white)** — h2 "BJJ Classes for {City} Adults". Flagship; beginners welcome; coach record; evening classes; link `/adult-bjj/`.
5. **Kids (gray)** — h2 "Kids Martial Arts for {City} Families". Cubs 4–6, Lions 7–13; bully prevention; link `/kids/`.
6. **Muay Thai + MMA (navy)** — "Muay Thai Near {City}, NJ" + "MMA Near {City}, NJ". Authentic Muay Thai; MMA = BJJ+Muay Thai+wrestling.
7. **Landmarks (white)** — pill badges of 5–8 REAL local spots (from `towns.ts.landmarks`).
8. **FAQ** — 6 pairs via `<FAQ>` + `<FAQPageSchema>`. Vary the "how far from {City}?" answer per town.
9. **CTA (dark)** — "Two Weeks Free — {City} Families Welcome".

Alternate section backgrounds (no two adjacent same). Cross-link 2–3 `adjacentSlugs` from `towns.ts`. Target 1,200–1,800 words. Reference implementation: `src/pages/cranford.astro` (this project).

### Required schema (already correct — keep it)
- `<LocalBusinessSchema city={city} />` → `MartialArtsSchool` with address (always Union), `geo`, `hasMap` (Google listing), `areaServed`, `aggregateRating` (4.6 / 192). Address & geo NEVER change per town.
- `<FAQPageSchema faqs={faqs} />`.
- Both inside `<Fragment slot="head">`.

### Validate before deploy
- Compile every page (`@astrojs/compiler` transform, severity-1 = fail).
- Red-flag scan for invented phrases.
- Duplicate-content check: 6-word-shingle Jaccard between town pages should be < ~25% (was 65–69% before the de-dup pass; target achieved ~21% max).
- Google Rich Results Test on a sample.

---

## 2. Site AUDIT spec (checklist)

**On-page / technical**
- [ ] Unique title + meta per page (format: `Martial Arts in {City}, NJ — {programs} | AllStar`; desc ~155 chars w/ city + Union + trial).
- [ ] One H1; logical H2s with location + program terms.
- [ ] Duplicate-content scan across location pages (< 25% shingle overlap).
- [ ] robots.txt allows AI crawlers (GPTBot, PerplexityBot, Google-Extended, ClaudeBot, Applebot-Extended); sitemap present.
- [ ] `llms.txt` present and lists all program + key location pages.
- [ ] Build compiles clean.

**Schema / Google Business relationship**
- [ ] `MartialArtsSchool` schema on location pages w/ consistent NAP, geo, `hasMap` → real Google listing, `areaServed`.
- [ ] `FAQPage` schema on pages with FAQs.
- [ ] Embedded Google map (town→gym) in visible content.
- [ ] Site NAP === Google Business Profile NAP, exactly.

**Google Business Profile (manual / browser)**
- [ ] Primary category correct ("Martial arts school"); relevant secondaries; no categories for services not offered.
- [ ] Services mirror real site programs, each with a description; no filler/invented services; correct kid ages (Cubs 4–6, Lions 7–13).
- [ ] Description (~750 char), hours, photos (20+, add weekly), Q&A seeded, weekly posts.
- [ ] Reviews: velocity + recency; geo-specific (town + program named). NEVER buy fake reviews (FTC rule).

**Content quality / E-E-A-T**
- [ ] Facts verifiable; no fabricated anecdotes/claims.
- [ ] Coach credentials + lineage stated (authority).
- [ ] Genuinely useful, unique per location.

**Reporting note:** third-party audit scores often mark GMB / Reviews / Links as "(est)" — those are placeholders, not measurements (the tool can't see inside GBP). Judge GBP by Google's own "Profile strength" + real rank tracking, not the estimate.

---

## 3. Project learnings (what to repeat / avoid)

- **Repeat:** ground rewrites in `towns.ts` + `LOCATION_PAGE_GUIDELINES.md`; compile-check every file; embed the Google map; keep schema untouched.
- **Avoid:** letting subagents free-write town prose (caused invented content + demographic drift); pixel-blind browser batching on slow-rendering GBP panels (verify render first).
- **Deploy:** Astro site auto-deploys to Netlify on `git push origin main`. Device sandbox can't complete git commits (unlink perms) or push (no network) — the user runs `git add -A && git commit && git push` themselves; clear stale `.git/*.lock` first.

---
*Source project: allstarbjj.com · Compiled by Claude, this session. Update as the pattern evolves.*
