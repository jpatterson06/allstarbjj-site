# GA4 Code Reference

This document shows exactly what code was added to your Astro site for GA4 tracking.

## What Was Added to PageLayout.astro

### 1. Configuration (in the frontmatter, lines 23-31)
```typescript
// Google Analytics 4 Configuration
// Get your GA4 Measurement ID from Google Analytics Console
// Instructions:
// 1. Go to https://analytics.google.com/
// 2. Create a new property for allstarbjj.com
// 3. Get your Measurement ID (looks like: G-XXXXXXXXXX)
// 4. Add it to .env file as: PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
// 5. Build/deploy the site
const ga4MeasurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
```

### 2. GA4 Script Tags (in the <head>, lines 67-122)
```html
<!-- Google Analytics 4 - gtag.js -->
{ga4MeasurementId && (
  <>
    <!-- Load Google's gtag.js library -->
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}></script>
    
    <!-- Initialize and configure GA4 -->
    <script define:vars={{ ga4MeasurementId }}>
      // Initialize Google Analytics 4
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', ga4MeasurementId, {
        page_path: window.location.pathname,
        page_title: document.title,
      });

      // Track page views automatically (gtag.js does this by default with 'config')

      // Track button/link clicks on elements with data-track-event attribute
      // Usage: <button data-track-event="button_name" data-track-label="Button Label">Click me</button>
      document.addEventListener('click', function(e) {
        const el = e.target.closest('[data-track-event]');
        if (el) {
          const eventName = el.getAttribute('data-track-event');
          const eventLabel = el.getAttribute('data-track-label') || el.textContent?.trim() || 'unknown';
          if (eventName && typeof gtag !== 'undefined') {
            gtag('event', eventName, {
              'event_label': eventLabel,
              'event_category': 'engagement'
            });
          }
        }
      }, true);

      // Track form submissions on forms with data-track-form attribute
      // Usage: <form data-track-form="contact_form">...</form>
      document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form && form.hasAttribute('data-track-form')) {
          const formName = form.getAttribute('data-track-form');
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
              'event_label': formName,
              'event_category': 'engagement'
            });
          }
        }
      }, true);
    </script>
  </>
)}

<!-- Display warning if GA4 not configured -->
{!ga4MeasurementId && (
  <script>
    console.warn('Google Analytics 4: PUBLIC_GA_MEASUREMENT_ID not configured in .env file. GA4 tracking disabled.');
  </script>
)}
```

## How It Works

### 1. Environment Variable
The Measurement ID is read from your `.env` file using:
```typescript
const ga4MeasurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
```

This is a compile-time variable in Astro. The value gets embedded into the HTML when the site builds.

### 2. Conditional Loading
The GA4 script only loads if `ga4MeasurementId` is set:
```html
{ga4MeasurementId && (
  // GA4 scripts load here
)}
```

If no ID is configured, a warning appears in the console instead.

### 3. gtag.js Initialization
Google's gtag.js library is loaded asynchronously:
```html
<script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}></script>
```

Then it's configured to track page views automatically.

### 4. Click Tracking
Event listeners watch for clicks on elements with `data-track-event`:
```javascript
document.addEventListener('click', function(e) {
  const el = e.target.closest('[data-track-event]');
  if (el) {
    const eventName = el.getAttribute('data-track-event');
    const eventLabel = el.getAttribute('data-track-label') || el.textContent?.trim() || 'unknown';
    if (eventName && typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        'event_label': eventLabel,
        'event_category': 'engagement'
      });
    }
  }
}, true);
```

Usage:
```html
<button data-track-event="free_trial" data-track-label="Start Trial">
  Start Free Trial
</button>
```

### 5. Form Tracking
Event listeners watch for form submissions on forms with `data-track-form`:
```javascript
document.addEventListener('submit', function(e) {
  const form = e.target;
  if (form && form.hasAttribute('data-track-form')) {
    const formName = form.getAttribute('data-track-form');
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        'event_label': formName,
        'event_category': 'engagement'
      });
    }
  }
}, true);
```

Usage:
```html
<form data-track-form="contact_form" action="/api/contact" method="POST">
  <!-- form fields -->
</form>
```

## What Gets Tracked Automatically

1. **Page Views** - Every page load is tracked automatically
   - Includes: page path, page title, timestamp
   - No additional setup needed

2. **Button Clicks** - Any element with `data-track-event` attribute
   - Tracked event name from attribute
   - Labeled with `data-track-label` or button text

3. **Form Submissions** - Any form with `data-track-form` attribute
   - Tracked as "form_submit" event
   - Labeled with form name from attribute

## Performance Impact

- **Async loading**: gtag.js loads asynchronously, won't block page load
- **Small payload**: tracking code is ~2KB
- **No cookies by default**: GA4 uses measurement protocol
- **GDPR compliant**: No personally identifiable information collected (unless you add it)

## Accessing gtag in Components

If you need to track custom events from Astro components or client-side scripts:

```javascript
// From any JavaScript on your page:
if (typeof gtag !== 'undefined') {
  gtag('event', 'custom_event', {
    'event_label': 'My custom label',
    'event_category': 'engagement'
  });
}
```

Or use the utility file at `src/lib/ga4-tracker.ts`:
```typescript
import { trackEvent } from '../lib/ga4-tracker';

trackEvent('custom_event', {
  'event_label': 'My label',
  'event_category': 'engagement'
});
```

## Testing the Code

### In Development
```bash
npm run dev
# Open http://localhost:3000
# Open browser console (F12)
# Look for GA4 initialization messages
```

### In Production
1. Deploy your site
2. Visit the live site
3. Open Google Analytics > Real-time > Events
4. Click tracked buttons/submit forms
5. Watch events appear in real-time

### Console Warnings
If you see:
```
Google Analytics 4: PUBLIC_GA_MEASUREMENT_ID not configured in .env file. GA4 tracking disabled.
```

This means you forgot to add your Measurement ID to the `.env` file.

## No Breaking Changes

The GA4 code:
- Does not modify any existing HTML
- Does not affect page styling
- Does not change any existing functionality
- Loads asynchronously (won't slow down your site)
- Is safe to deploy immediately

## File Locations

- **Main layout with GA4**: `src/layouts/PageLayout.astro`
- **Configuration**: `.env` (your machine only)
- **Example config**: `.env.example` (for version control)
- **Tracking utilities**: `src/lib/ga4-tracker.ts`

---

That's it! The entire GA4 setup is contained in these locations.
