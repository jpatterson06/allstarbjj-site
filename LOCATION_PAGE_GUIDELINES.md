# AllStar BJJ Location Page Guidelines

This document specifies the exact requirements for creating and maintaining location-specific pages across the Astro site. It covers frontmatter, schema structure, content sections, and the SEO strategy for location + program combinations.

---

## Site Architecture Overview

### Current Structure
The site uses **two parallel location page systems**:

1. **Trial Hub Pages** → `/trial/[town].astro` (dynamic route)
   - Covers ALL programs for a given location
   - Drives trial signups via unified lead form
   - Auto-generates from `towns.ts` data
   - Currently **lacks schema markup**

2. **SEO Destination Pages** → `/pages/[town].astro` (static, manually maintained)
   - Primary landing pages for location-based organic search
   - Break out programs with separate sections (BJJ, Kids, Muay Thai, MMA)
   - Include LocalBusinessSchema + FAQPageSchema
   - Designed to rank for "BJJ in Westfield", "Muay Thai near Maplewood", etc.

3. **Program Pages** → `/trial/bjj.astro`, `/trial/muay-thai.astro`, `/trial/mma.astro`, `/trial/kids.astro`
   - Single-program landing pages (not location-specific)
   - Link to all locations in a grid at bottom
   - Secondary conversion funnel

### SEO Rationale: Why Both Systems?

**Root-level pages** (westfield.astro) win high-intent, location-based searches:
- "BJJ classes in Westfield" → ranks westfield.astro
- "Muay Thai near Maplewood" → ranks maplewood.astro
- "Martial arts for kids in Summit" → ranks summit.astro

**Trial pages** (/trial/westfield) capture "free trial" and "trial" modifier searches:
- "Free BJJ trial near me" → may rank /trial/westfield
- "Martial arts trial Westfield" → may rank /trial/westfield
- Secondary but important for conversion intent

**Program pages** (/trial/bjj) serve broad, program-only searches:
- "Learn BJJ" → ranks /trial/bjj
- "Muay Thai classes" → ranks /trial/muay-thai
- Links to locations for local relevance

### Decision: Separate Program Pages by Location?

**NO. Do NOT create `/trial/clark/bjj.astro`, `/trial/clark/muay-thai.astro`, etc.**

**Why:**
1. **Duplicate content risk** — three versions of nearly identical BJJ content (root level, /trial/bjj, /trial/clark/bjj) dilutes authority
2. **Form complexity** — trial form is already location-agnostic; location is captured in form submission
3. **Current practice** — no location subdirectories exist in /trial/; pattern is flat
4. **Maintenance burden** — multiplies pages to maintain for every location
5. **SEO diminishing returns** — location + program targeting already handled by root-level pages

**For a new location (Clark):**
- Add Clark to `towns.ts`
- Create `/pages/clark.astro` (following westfield.astro template)
- `/trial/clark` auto-generates via dynamic route
- Done. No proliferation of program variants.

---

## 1. Required Page Structure & Frontmatter

### Frontmatter (Script tag in Astro)

All location pages require these imports and props:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import PageHero from '../components/PageHero.astro';
import FAQ from '../components/FAQ.astro';
import CTA from '../components/CTA.astro';
import FAQPageSchema from '../components/FAQPageSchema.astro';
import LocalBusinessSchema from '../components/LocalBusinessSchema.astro';

// Example for Westfield
const faqs = [
  { q: "How far is AllStar from Westfield?", a: "About 12–15 minutes via Central Ave..." },
  // More FAQs...
];

const city = "Westfield";
---
```

### Wrapper in Template (head slot)

All location pages must include schema in the page layout via slot:

```astro
<Fragment slot="head">
  <LocalBusinessSchema city={city} />
  <FAQPageSchema faqs={faqs} />
</Fragment>
```

This must come **before** the `<PageLayout>` component.

### PageLayout Props

```astro
<PageLayout
  title="Martial Arts in {City}, NJ — BJJ, Muay Thai & Kids Classes | AllStar"
  description="Martial arts classes for {City}, NJ families at AllStar Martial Arts in Union. BJJ, Muay Thai, MMA, and Kids programs. Renzo Gracie black belt. Free 2-week trial."
  ogImage="/images/adult-bjj-hero.jpg"
>
```

**Title requirements:**
- Format: `Martial Arts in {City}, NJ — {Programs} | AllStar`
- Include city name early
- List 2–3 programs (keep under ~60 chars)
- End with "| AllStar"

**Description requirements:**
- Format: `{Programs} classes for {City}, NJ families at AllStar Martial Arts in Union. {Unique selling point}. Free 2-week trial.`
- ~155 chars max (sweet spot for mobile SERPs)
- Must mention Union (actual location)
- Must mention "Renzo Gracie black belt" or equivalent credibility
- Must include CTA mention (free trial, no contract)

---

## 2. JSON-LD Schema Requirements

### LocalBusinessSchema (for Location Pages)

**File:** `src/components/LocalBusinessSchema.astro`  
**Props passed:**
```typescript
city: string;           // Required: "Westfield"
address?: string;       // Optional: defaults to Union address
areaServed?: string[];  // Optional: defaults to [city, Union, Springfield, Cranford, Maplewood]
description?: string;   // Optional: auto-generated if not provided
```

**Schema Output (exact field mapping):**

```json
{
  "@context": "https://schema.org",
  "@type": "MartialArtsSchool",
  "name": "AllStar Martial Arts - {City}",
  "description": "Martial arts classes in {City} - Brazilian Jiu Jitsu, Muay Thai, MMA, and Kids programs at AllStar Martial Arts.",
  "url": "https://allstarbjj.com/{city-slug}",
  "telephone": "+1-908-341-1131",
  "email": "info@allstarbjj.com",
  "image": "https://allstarbjj.com/images/adult-bjj-hero.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1166 West Chestnut St",
    "addressLocality": "Union",
    "addressRegion": "NJ",
    "postalCode": "07083",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.6925196,
    "longitude": -74.2863264
  },
  "hasMap": "https://maps.app.goo.gl/cBJKvZMvtEjfTgNY9",
  "areaServed": ["Westfield", "Union", "Springfield", "Cranford", "Maplewood"],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "192",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Field Notes:**
- `@type` is always `MartialArtsSchool` (not generic LocalBusiness)
- `name` includes city for local relevance
- `url` is constructed as `/{city-slug}/` (matches actual page path)
- `address` is always Union (actual location) — do NOT change per page
- `geo` coordinates are always Union's gym location — do NOT change per page
- `areaServed` lists relevant towns; can customize per location
- `aggregateRating` is sitewide (same for all pages) — pull from Google Business Profile
- `email` and `telephone` are sitewide

### FAQPageSchema (for FAQ Sections)

**File:** `src/components/FAQPageSchema.astro`  
**Props passed:**
```typescript
faqs: FAQItem[];  // Array of { q: string, a: string }
```

**Schema Output (exact field mapping):**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far is AllStar from Westfield?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "About 12–15 minutes via Central Ave or Route 22. 1166 West Chestnut St, Union. Free parking."
      }
    },
    { ... }
  ]
}
```

**Field Notes:**
- `@type` is always `FAQPage` at root level
- `mainEntity` is an array of Question/Answer pairs
- HTML tags are stripped from answers before serialization (component handles this)
- Questions must be natural language (not numbered lists)
- Answers must be clear, standalone text (not references to surrounding copy)
- Minimum 3 FAQs; recommended 6–8

**Current FAQPageSchema Component Issue:**  
The component already exists and works, but make sure to pass `faqs` in Astro frontmatter, then pass to component:

```astro
<FAQPageSchema faqs={faqs} />
```

---

## 3. Content Sections & Word Count Targets

### Required Section Order

1. **PageHero** (component)
   - Eyebrow: County or drive-time reference
   - Headline: "Martial Arts in {City}, NJ"
   - Sub: Hook about why this city drives to AllStar
   - bgImage: `/images/adult-bjj-hero.jpg` (default)

2. **Intro (white bg)**
   - 150–250 words
   - Location-specific opener (what sets {City} residents apart)
   - Mention coach credibility (Renzo Gracie black belt, ADCC, pro MMA)
   - Don't repeat what's in hero

   *Example (Westfield):*
   > "Westfield has a lot going for it. The downtown, the train, the parks, the schools. What it doesn't have is a Muay Thai program. Or a BJJ instructor with a professional MMA career..."

3. **BJJ Section (light gray bg)**
   - Headline: "BJJ Classes for {City} Adults"
   - 150–200 words
   - Why BJJ is right for this location's demographic
   - Schedule note (evening classes for commuters)
   - What adults get from it long-term
   - Link to `/adult-bjj/` optional but recommended

4. **Kids Section (white bg)**
   - Headline: "Kids Martial Arts for {City} Families"
   - 100–150 words intro
   - Two subsections (Cubs 4–6, Lions 7–13), each 60–80 words
   - Location-specific benefit (e.g., bullying prevention for Westfield)
   - Link to `/kids/` optional

5. **Muay Thai Section (dark bg, typically navy)**
   - Headline: "The One Nobody Else Offers" or "Muay Thai Near {City}, NJ"
   - 120–150 words
   - Why Muay Thai is unique in this market
   - Real pad work vs. kickboxing studios
   - Link to `/adult-muay-thai/` optional

6. **MMA Section (same dark bg)**
   - Headline: "MMA Near {City}, NJ"
   - 80–120 words
   - Coach credentials (pro record, experience cornering)
   - Who it's for
   - Link to `/adult-mma/` optional

7. **Landmarks Section (white bg)**
   - Headline: "If you know {City}"
   - Subheading: "About {X} Minutes From All Of It"
   - Display 8–12 local landmarks as badge/pill elements
   - Data pulled from `towns.ts` landmark array

8. **FAQ Section (white bg, generated by component)**
   - 6–8 FAQ pairs
   - See section below for content guidance

9. **CTA Section (dark bg)**
   - Headline: "Two Weeks Free — {City} Families Welcome"
   - Sub: "Show up. Bring water. We'll handle the rest. No commitment, no pressure."

### Total Word Count Target

- **Minimal:** 1,200–1,400 words
- **Optimal:** 1,500–1,800 words
- **Max:** 2,000 words (don't exceed; dilutes authority)

**Why:** Comprehensive coverage of all programs + location specificity without keyword stuffing.

---

## 4. FAQ Content Guidance

### Required FAQ Structure

Minimum 6 FAQs; recommended 8. Mix of:
- **Distance/logistics** (1–2)
- **Experience required** (1–2)
- **Program specifics** (2–3)
- **Enrollment/trial** (1)

### Example FAQ Set (Westfield)

```javascript
const faqs = [
  {
    q: "How far is AllStar from Westfield?",
    a: "About 12–15 minutes via Central Ave or Route 22. 1166 West Chestnut St, Union. Free parking."
  },
  {
    q: "Do kids need experience?",
    a: "No. Most kids start from scratch. The curriculum builds from the ground up."
  },
  {
    q: "Can adults try BJJ and Muay Thai at the same time?",
    a: "Yes. Many adult members train both. They complement each other well."
  },
  {
    q: "What's the free trial?",
    a: "Two weeks, unlimited classes. No card, no contract, no pressure."
  },
  {
    q: "How do I sign up?",
    a: "Fill out the form on this page or call (908) 341-1131. We'll reach out same day."
  }
];
```

### FAQ Best Practices

- Questions should be **conversational, not marketing-y**
  - ✅ "How far is AllStar from Westfield?"
  - ❌ "Why Choose AllStar For Westfield Martial Arts?"
- Answers should be **direct and scannable**
  - Include specific details (drive time, phone, address)
  - No internal links in FAQ text (for schema cleanliness)
- Avoid **near-duplicate FAQs** across locations
  - "Do kids need experience?" appears on many pages — OK, it's universal
  - "How far is AllStar from [City]?" is location-specific — vary per city

---

## 5. Towns.ts Data Structure (For Trial Hub Pages)

When adding a new location to the trial hub pages system, update `src/lib/towns.ts`:

```typescript
export interface Town {
  slug: string;                  // URL slug, lowercase, hyphens (e.g., "new-providence")
  name: string;                  // Display name (e.g., "New Providence")
  longName?: string;             // Optional: for town groups (e.g., "Millburn / Short Hills")
  county: string;                // County name (e.g., "Union County")
  driveMin: number;              // Drive time in minutes from gym
  driveDirection: string;        // Direction description (e.g., "via Morris Ave")
  hookLine: string;              // 1-line emotional hook (50–80 chars)
  whyDriveHere: string;         // 2–3 paragraphs explaining why this town's families come
  adultAngle: string;           // 1 paragraph for adult appeal
  landmarks: string[];          // Array of 8–12 local landmarks
  adjacentSlugs: string[];       // Array of nearby town slugs for cross-linking
  priority: 'highest' | 'high' | 'medium';  // SEO/marketing priority
  heroImage?: string;           // Optional: override image (defaults to adult-bjj-hero.jpg)
  heroPosition?: string;        // Optional: CSS object-position (e.g., "50% 60%")
}
```

**Example (New Providence):**
```typescript
{
  slug: 'new-providence',
  name: 'New Providence',
  county: 'Union County',
  driveMin: 8,
  driveDirection: 'via Route 22',
  hookLine: "Eight minutes from New Providence. The martial arts options nearby are limited.",
  whyDriveHere: "New Providence is suburban and quiet — great for families, not so great for finding serious martial arts. AllStar is eight minutes via Route 22. The drive is shorter than most kids' soccer games...",
  adultAngle: "New Providence professionals commute to Newark or beyond. Evening classes at 6, 7, and 8 PM fit the schedule...",
  landmarks: ['New Providence High School', 'Echo Lake Park', 'Mountain Avenue', 'Route 22'],
  adjacentSlugs: ['summit', 'westfield', 'kenilworth'],
  priority: 'high',
}
```

---

## 6. Asset Requirements

### Hero Images

- **File format:** JPG, 1920px wide × 1080px tall
- **Location:** `/public/images/`
- **Default:** `/images/adult-bjj-hero.jpg` (main gym photo)
- **Optional overrides:** Can specify `heroImage` in `towns.ts` for location-specific photos
- **Size:** Keep under 500KB (optimize for web)

### Favicon & OG Image

- **Use same OG image** across all location pages: `/images/adult-bjj-hero.jpg`
- **Why:** Maintains brand consistency; don't multiply images unnecessarily

---

## 7. Implementation Checklist for New Location Page

### Step 1: Add to towns.ts
- [ ] Create new Town object
- [ ] Set slug, name, county, driveMin, driveDirection
- [ ] Write hookLine (50–80 chars)
- [ ] Write whyDriveHere (2–3 substantive paragraphs)
- [ ] Write adultAngle (1 paragraph)
- [ ] Add 8–12 landmarks
- [ ] Set adjacentSlugs (2–4 nearby towns)
- [ ] Set priority (highest/high/medium)
- [ ] Test dynamic `/trial/[town]` route (should auto-generate)

### Step 2: Create Root-Level Page
- [ ] Create `/pages/{city}.astro` (copy from westfield.astro)
- [ ] Update all city references in copy
- [ ] Replace FAQs with city-appropriate questions
- [ ] Verify LocalBusinessSchema `city` prop is set
- [ ] Verify FAQPageSchema `faqs` prop is set
- [ ] Check title (under 60 chars, includes city, includes programs)
- [ ] Check meta description (155 chars, includes city + Union + trial CTA)

### Step 3: Validate Schema
- [ ] Run page through [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Confirm FAQPage schema appears
- [ ] Confirm MartialArtsSchool schema appears
- [ ] Check for validation errors in test results

### Step 4: Verify Links
- [ ] Program links (Adult BJJ, Kids, etc.) point to root-level pages
- [ ] Internal cross-links to adjacent towns work
- [ ] Hero CTA button links correctly
- [ ] Footer links are intact

### Step 5: SEO Spot Checks
- [ ] Title and meta description render correctly in browser DevTools
- [ ] OG tags are set (check with Facebook Sharing Debugger if needed)
- [ ] Page appears in sitemap (when sitemap integration re-enabled)
- [ ] Word count is 1,500–1,800 words
- [ ] No obvious duplicate content from other pages

### Step 6: Mobile Review
- [ ] Hero renders properly on mobile (text readable, no overlap)
- [ ] FAQ expands/collapses smoothly
- [ ] Forms are accessible
- [ ] Images load and scale correctly

---

## 8. Common Mistakes to Avoid

1. **Forgetting schema markup** on new location pages
   - Always include `<LocalBusinessSchema city={city} />` and `<FAQPageSchema faqs={faqs} />`

2. **Changing gym address per location**
   - The physical gym is in Union — DO NOT customize address by city
   - Schema address must always be 1166 West Chestnut St, Union, NJ 07083

3. **Near-duplicate program descriptions across locations**
   - Each location page should have unique BJJ/Kids/Muay Thai paragraphs
   - Copy-paste from westfield.astro is a starting point; customize each section

4. **Missing drive time and direction info**
   - Every page must state "{X} minutes {direction}" early and often
   - This is a key SEO signal for "near me" searches

5. **Weak FAQ questions**
   - Don't ask marketing questions; ask what people actually search
   - "How far?" "Do I need experience?" "What's included?" are universal
   - Add location-specific variants: "Is there parking on Broad Street?"

6. **Over-linking to program pages**
   - Each program section can have one optional link
   - Don't hyperlink every mention of "BJJ" or "Muay Thai"
   - Keep it natural

7. **Forgetting adjacent town cross-links**
   - Set `adjacentSlugs` in towns.ts
   - Verify the "Nearby" section renders with correct links
   - Helps with internal linking and user navigation

---

## 9. Trial Hub Pages: /trial/[town].astro Schema Gap

**Current State:**  
The dynamic `/trial/[town].astro` page does NOT include schema markup. It should.

**Recommended Fix:**
Add a fragment slot to inject schema, similar to root-level pages:

```astro
---
// At top of [town].astro file
import FAQPageSchema from '../../components/FAQPageSchema.astro';
---

<Fragment slot="head">
  <FAQPageSchema faqs={faqs} />
</Fragment>

<PageLayout ... >
  ...
</PageLayout>
```

**Rationale:**  
- Trial pages have FAQs that deserve schema markup
- FAQPage schema helps with AI Overviews and structured answer ranking
- No LocalBusinessSchema needed (hub page doesn't need it; root-level pages already claim authority)

---

## 10. Quick Reference: Page Type Comparison

| Aspect | Root-Level (westfield.astro) | Trial Hub (/trial/[town].astro) | Trial Program (/trial/bjj.astro) |
|--------|-----|-----|-----|
| **URL Pattern** | `/westfield/` | `/trial/westfield/` | `/trial/bjj/` |
| **Primary Intent** | Location + program search | Trial + location search | Program search (non-geo) |
| **Schema Type** | LocalBusiness + FAQPage | FAQPage (should add) | FAQPage (should add) |
| **Content Focus** | Program breakdowns per city | All programs for city | Deep program benefits |
| **Lead Form** | Optional (CTA at bottom) | Central (top + bottom) | Central (top + bottom) |
| **Internal Links** | To program pages | To program pages | To trial hub pages by location |
| **Maintenance** | Manual per page | Data-driven (towns.ts) | Central (one page per program) |
| **Count** | One per location (12 pages) | One per location (12 pages) | 4 program pages + kids |

---

## 11. Measuring Success: SEO Metrics to Track

For each location page, monitor:

1. **Impressions** (Google Search Console)
   - Target: 50+ impressions/month per page (after 3 months)
   - Key queries: "BJJ in {City}", "{Program} near {City}", "trial {City}"

2. **Click-Through Rate (CTR)**
   - Target: 2–5% (location pages are informational; not all clicks lead to trial)
   - If under 1%: title or description may need refresh

3. **Average Position**
   - Target: Position 1–5 for primary location queries
   - Target: Position 6–15 for secondary queries

4. **Form Submissions**
   - Track which location pages drive the most trial sign-ups
   - Correlate with traffic; identify optimization opportunities

5. **Bounce Rate (Analytics)**
   - Target: Under 60%
   - High bounce = copy isn't resonating or load is slow

6. **Time on Page**
   - Target: 1.5+ minutes
   - Indicates engagement with content

---

## 12. Seasonal Updates & Refresh Cycle

Location pages should be refreshed:

- **Quarterly:** Review FAQ accuracy, check drive times (construction, new roads?)
- **Annually:** Refresh copy to remove date-specific language, update testimonials
- **When:** New programs launch, schedule changes, or coaching team changes

---

## Summary: The Recommended Path

**For adding Clark, NJ:**

1. Add Clark to `towns.ts` with drive time, hook line, adjacentSlugs, landmarks
2. Auto-generate `/trial/clark` via dynamic route
3. Create `/pages/clark.astro` following the westfield.astro template
4. Include LocalBusinessSchema + FAQPageSchema in the page
5. Write 1,500–1,800 words of location-specific copy
6. Test schema with Google Rich Results Test
7. **Do NOT create** `/trial/clark/bjj.astro` or location-program variants

**Result:** Clark has two landing pages (one for organic location search, one for trial conversion), no duplicate content issues, and clean schema markup supporting featured snippets and AI Overviews.

---

**Document Version:** 1.0  
**Last Updated:** 2026-07-13  
**Maintained By:** Jamal Patterson (Coach) / Claude (AI) 