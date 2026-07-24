# Testimonials Component Guide

## Overview
The Testimonials component provides a rich testimonial display system for AllStar Martial Arts. It includes 6-8 testimonials with photos, quotes, names, and roles. The component is designed to be easy to update and includes full schema.org structured data for SEO.

## Component Location
- **Component file**: `src/components/Testimonials.astro`
- **Usage**: Imported on homepage, kids pages, and about-us page

## Current Placements

### 1. Homepage (`src/pages/index.astro`)
- Placed immediately after the Hero section
- Shows 6 testimonials (default)
- Format: 3-column grid on desktop, 2-column on tablet, 1-column on mobile

### 2. Kids BJJ Page (`src/pages/kids-bjj.astro`)
- Placed before the FAQ section
- Shows 4 kids/family-focused testimonials only
- Filter applied to show only parent testimonials

### 3. About Us Page (`src/pages/about-us.astro`)
- Placed before the final CTA
- Shows 6 testimonials from all program types
- Demonstrates community diversity

## How to Update Testimonials

### Quick Update (Props Method)
Pass custom testimonials directly to the component:

```astro
---
const myTestimonials = [
  {
    id: 'unique-id',
    name: 'John Doe',
    role: 'Adult BJJ student, 35',
    quote: 'Your quote here (2-3 sentences)',
    image: '/images/photo.jpg',
    imageAlt: 'Description of photo',
  },
];
---

<Testimonials testimonials={myTestimonials} maxItems={6} />
```

### Full Update (Edit Default Testimonials)
To update the default testimonials shown everywhere:

1. Edit `src/components/Testimonials.astro`
2. Find the `defaultTestimonials` array (starts around line 30)
3. Update any testimonial object with new data
4. Commit changes

## Testimonial Data Structure

Each testimonial requires:

```typescript
interface Testimonial {
  id: string;              // Unique identifier (e.g., 'parent-1', 'adult-mma')
  name: string;            // Full name or first name + initial (e.g., 'Sarah M.')
  role: string;            // Program + context (e.g., 'Parent of Lions student, age 9')
  quote: string;           // 2-3 sentence testimonial (authentic, specific)
  image: string;           // Path to image (e.g., '/images/kids-martial-arts.jpg')
  imageAlt: string;        // Alt text for accessibility
}
```

## Available Images

The following images are available in `public/images/` and can be used as placeholders:
- `/images/kids-martial-arts.jpg` - Kids training photo
- `/images/adult-bjj-hero.jpg` - Adult BJJ photo
- `/images/adult-class.jpg` - Adult class photo
- `/images/muay-thai-pads.jpg` - Muay Thai training
- `/images/mma-team.jpg` - MMA team photo
- `/images/union-mat.jpg` - Gym facility photo
- `/images/preschool-kids.jpg` - Cubs/preschool class

When real testimonials come in, replace the placeholder images with photos of actual students (with permission).

## Component Props

```typescript
export interface Props {
  testimonials?: Testimonial[];    // Custom testimonial array (optional)
  maxItems?: number;               // How many to display (default: 6)
  showSchema?: boolean;            // Enable schema.org data (default: true)
}
```

### Usage Examples

```astro
<!-- Show all 6 default testimonials with schema -->
<Testimonials />

<!-- Show only 4 testimonials -->
<Testimonials maxItems={4} />

<!-- Show custom testimonials without schema -->
<Testimonials testimonials={customArray} showSchema={false} />
```

## Schema.org Integration

The component automatically includes:
- `AggregateRating` schema for the gym
- Individual `Review` schemas for each displayed testimonial
- Person schema for testimonial authors
- 5-star rating data

This helps Google understand and display testimonials in search results.

## Styling

The component uses Tailwind CSS with AllStar brand colors:
- Navy (`brand-navy`): Primary text and accents
- Gold (`brand-gold`): Stars and highlights
- Red (`brand-red`): CTA buttons
- Gray (`brand-gray`): Body text
- Light gray (`brand-gray-light`): Section background

Cards include:
- Hover effects (shadow, border color change)
- Image zoom on hover
- Responsive grid (1/2/3 columns)
- 5-star rating display
- Quote styling with quote marks

## Customization Ideas

### Add Photos
Replace the placeholder images with actual student photos:
1. Get permission from students/parents
2. Optimize images (800x600px recommended)
3. Upload to `public/images/`
4. Update the `image` field in testimonials

### Add More Testimonials
The component can handle 8+ testimonials easily:
1. Add new testimonial objects to `defaultTestimonials`
2. Use `maxItems` prop to control display

### Filter by Program
For program-specific pages, create filtered testimonial arrays:
```astro
const bjjTestimonials = defaultTestimonials.filter(t => 
  t.id.includes('bjj') || t.id.includes('parent')
);
<Testimonials testimonials={bjjTestimonials} />
```

### Add Video Testimonials
To add video testimonials later:
1. Create a separate `VideoTestimonial` component
2. Import both components
3. Mix and match on pages

## SEO Benefits

- Testimonials appear in Google's rich results
- Star ratings display in search listings
- Aggregates reviewer count and average rating
- Improves local authority signals
- Increases click-through rate from search results

## Accessibility

- Image alt text provided for all photos
- Semantic HTML with proper microdata
- High contrast text
- Proper heading hierarchy
- Quote styling for screen readers

## Future Enhancements

- [ ] Dynamic testimonial loading from CMS
- [ ] Testimonial submission form
- [ ] Video testimonial support
- [ ] Rotating featured testimonial on homepage
- [ ] Testimonial filtering by program
- [ ] Integration with Google My Business reviews
