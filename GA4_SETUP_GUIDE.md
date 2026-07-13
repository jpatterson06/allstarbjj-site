# Google Analytics 4 Setup Guide

GA4 tracking has been added to the AllStar BJJ website. This guide walks you through setup and usage.

## Quick Start

1. **Create a GA4 Property** (5 minutes)
   - Go to https://analytics.google.com/
   - Sign in with your Google account
   - Click "Create" to add a new property for allstarbjj.com
   - Follow the setup wizard and select "Web" as your platform
   - Add your website URL: https://allstarbjj.com
   - Complete the setup

2. **Get Your Measurement ID**
   - In Google Analytics, go to Admin > Property Settings
   - Copy your Measurement ID (looks like: G-XXXXXXXXXX)

3. **Add to `.env` file**
   - Open `/Users/jamalpatterson/allstarbjj-site/.env`
   - Replace the empty `PUBLIC_GA_MEASUREMENT_ID` value:
     ```
     PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```

4. **Build & Deploy**
   ```bash
   npm run build
   # Deploy to Netlify (or your host)
   ```

5. **Verify in Google Analytics**
   - Wait 24-48 hours for data to appear in GA console
   - Or check Real-time view immediately after visiting the site

## What's Being Tracked

### Page Views (Automatic)
- Every page visit is tracked automatically
- Includes page path, page title, and timestamp
- No additional setup needed

### Button Clicks
Add the `data-track-event` attribute to any button or link:

```html
<button data-track-event="free_trial" data-track-label="Homepage CTA">
  Start Free Trial
</button>

<a href="/classes" data-track-event="view_classes" data-track-label="Classes Link">
  View Our Classes
</a>
```

**Attributes:**
- `data-track-event`: Event name (required) - use_underscores for naming
- `data-track-label`: Display label (optional) - defaults to button text

**Examples:**
```html
<!-- CTA button -->
<button data-track-event="contact_form_click" data-track-label="Contact Us Button">
  Get in Touch
</button>

<!-- Sign up link -->
<a data-track-event="signup" data-track-label="Signup Link - Navbar">
  Sign Up Now
</a>

<!-- Class scheduling -->
<button data-track-event="schedule_class" data-track-label="Schedule BJJ Class">
  Schedule Now
</button>
```

### Form Submissions
Add the `data-track-form` attribute to any form:

```html
<form data-track-form="contact_form" action="/api/contact" method="POST">
  <input type="email" name="email" placeholder="Your email" />
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>
```

**Attributes:**
- `data-track-form`: Form name (required) - identifies which form was submitted

**Examples:**
```html
<!-- Contact form -->
<form data-track-form="contact_form">
  <!-- form fields -->
</form>

<!-- Class enrollment -->
<form data-track-form="class_enrollment">
  <!-- form fields -->
</form>

<!-- Newsletter signup -->
<form data-track-form="newsletter_signup">
  <!-- form fields -->
</form>
```

## Where to Add Tracking

### Buttons & Links
Most buttons and links should have tracking:
- CTA buttons (free trial, contact, schedule)
- Navigation links to key pages
- Form submit buttons
- Download/resource links

**Example - Contact page CTA:**
```html
<button 
  data-track-event="contact_us_call"
  data-track-label="Call Now Button"
  onclick="window.location.href='tel:+1-908-341-1131'"
>
  Call: (908) 341-1131
</button>
```

### Forms
Every form should have tracking:
- Contact forms
- Class registration
- Newsletter signups
- Demo/trial requests

**Example - Contact form:**
```html
<form data-track-form="contact_form" action="/api/contact" method="POST">
  <input type="text" name="name" placeholder="Your name" required />
  <input type="email" name="email" placeholder="Your email" required />
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send Message</button>
</form>
```

## Viewing Analytics Data

### Real-time Events (within seconds)
1. Go to https://analytics.google.com/
2. Select your AllStar BJJ property
3. Click "Realtime" in the left sidebar
4. Visit your site in another tab
5. Watch events appear in real-time

### Event Reports (after 24-48 hours)
1. Go to "Events" in left sidebar
2. View all tracked events and their counts
3. Filter by date range
4. Export reports as needed

### Custom Dashboards
Create dashboards to monitor:
- Page views by section (adult-bjj, kids-classes, etc.)
- CTA button clicks by type
- Form submissions by form type
- Device/browser breakdowns
- Traffic sources

## Environment Variables

The setup uses environment variables for security:

- **`.env`** - Your local development file (add your actual GA4 ID here)
  - Never commit this to Git (already in .gitignore)
  
- **`.env.example`** - Template file (safe to commit)
  - Shows what variables are needed
  - Other developers can copy this to create their own `.env`

- **Deployment** - Set environment variable in Netlify:
  - Netlify Dashboard > Site Settings > Build & Deploy > Environment
  - Add: `PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`

## Troubleshooting

### "GA4 tracking disabled" warning in console
- Your `.env` file is missing `PUBLIC_GA_MEASUREMENT_ID`
- Or it's set to an empty value
- Add your measurement ID to `.env` and rebuild

### No data appearing in Google Analytics after 48 hours
1. Verify the measurement ID in `.env` matches GA console (exactly)
2. Make sure site is deployed (testing locally in dev mode may not send data)
3. Check browser console for errors (F12 > Console tab)
4. Verify GA4 property is configured correctly

### Button clicks not appearing in Analytics
- Confirm `data-track-event` attribute is spelled correctly (no typos)
- Check browser console for JavaScript errors
- Verify you deployed after adding the attributes
- Wait a few seconds after clicking - GA batches events

### Form submissions not tracking
- Confirm `data-track-form` attribute is on the `<form>` tag (not button)
- Check browser console for errors
- Form must have `method` and `action` attributes
- Some form handlers may require page reload

## File Locations

- **Configuration**: `/Users/jamalpatterson/allstarbjj-site/.env`
- **Layout with GA4 code**: `/Users/jamalpatterson/allstarbjj-site/src/layouts/PageLayout.astro`
- **Tracking utility**: `/Users/jamalpatterson/allstarbjj-site/src/lib/ga4-tracker.ts`
- **Example env file**: `/Users/jamalpatterson/allstarbjj-site/.env.example`

## Next Steps

1. Add your Measurement ID to `.env`
2. Deploy to Netlify
3. Wait 24-48 hours for initial data
4. Add `data-track-event` to key buttons/CTAs
5. Add `data-track-form` to contact & signup forms
6. Monitor in Google Analytics dashboard

## Questions?

Refer to:
- Google Analytics 4 Help: https://support.google.com/analytics
- Event tracking docs: https://developers.google.com/analytics/devguides/collection/gtagjs/events
- gtag.js reference: https://developers.google.com/analytics/devguides/collection/gtagjs
