# GA4 Deployment Checklist

Complete this checklist to go live with Google Analytics 4 tracking.

## Step 1: Create GA4 Property (One-time setup)

- [ ] Go to https://analytics.google.com/
- [ ] Sign in with your Google account
- [ ] Click "Create" or "New Property"
- [ ] Fill in property details:
  - Property name: "AllStar Martial Arts"
  - Reporting timezone: America/New_York (or your timezone)
  - Currency: USD
- [ ] Select "Web" as your platform
- [ ] Enter website URL: https://allstarbjj.com
- [ ] Follow the setup wizard
- [ ] Copy your Measurement ID (looks like: G-XXXXXXXXXX)

## Step 2: Configure Environment Variable

- [ ] Open `.env` file in the project root
- [ ] Replace the placeholder with your actual Measurement ID:
  ```
  PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
- [ ] Save the file
- [ ] Verify .gitignore includes `.env` (so you don't accidentally commit it)

## Step 3: Local Testing

- [ ] Run `npm run dev` to start the dev server
- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab and look for GA4 initialization messages
- [ ] You should NOT see: "GA4 tracking disabled"
- [ ] Visit a few pages on your site
- [ ] Check Google Analytics Real-time view:
  - Go to https://analytics.google.com/
  - Select your property
  - Click "Real-time" in left sidebar
  - Your pageviews should appear within a few seconds

## Step 4: Add Tracking to Components

For existing pages/components, add tracking attributes:

### High Priority (Do These First)
- [ ] Homepage CTA buttons (free trial, contact, schedule)
- [ ] Contact form
- [ ] Class enrollment form
- [ ] Key navigation links

### Medium Priority (Do These Next)
- [ ] All class pages links
- [ ] Pricing page buttons
- [ ] Newsletter signup forms
- [ ] Social media links in footer

### Reference Guides
- See `GA4_SETUP_GUIDE.md` for detailed instructions
- See `GA4_TRACKING_EXAMPLES.md` for copy-paste examples

### Example: Adding Tracking to a Button
```html
<!-- Before -->
<button onclick="openTrialForm()">Start Free Trial</button>

<!-- After -->
<button 
  data-track-event="free_trial_click" 
  data-track-label="Start Free Trial - Homepage"
  onclick="openTrialForm()"
>
  Start Free Trial
</button>
```

### Example: Adding Tracking to a Form
```html
<!-- Before -->
<form action="/api/contact" method="POST">

<!-- After -->
<form 
  data-track-form="contact_form"
  action="/api/contact" 
  method="POST"
>
```

## Step 5: Build for Production

- [ ] Run `npm run build`
- [ ] Verify build completes without errors
- [ ] Check that dist/ folder was created
- [ ] No warnings about GA4 tracking disabled

## Step 6: Deploy to Netlify

- [ ] In Netlify Dashboard, go to your site settings
- [ ] Go to "Build & Deploy" > "Environment"
- [ ] Add environment variable:
  - Key: `PUBLIC_GA_MEASUREMENT_ID`
  - Value: `G-XXXXXXXXXX` (your actual measurement ID)
- [ ] Trigger a new deploy (or push to main branch)
- [ ] Wait for deployment to complete

## Step 7: Verify Live Tracking

After deployment (may take 5-10 minutes to propagate):

- [ ] Visit https://allstarbjj.com in your browser
- [ ] Open Google Analytics Real-time view
- [ ] Verify you see page views appearing
- [ ] Click tracked buttons/links
- [ ] Verify "engagement" events appear in Real-time

### Troubleshooting Live Tracking
If you don't see data within 5 minutes:

- [ ] Verify measurement ID in `.env` is correct (matches GA console exactly)
- [ ] Hard refresh the website (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- [ ] Check browser console (F12 > Console) for errors
- [ ] Wait up to 24 hours - sometimes GA takes longer to populate

## Step 8: Set Up Google Analytics Console

Once data starts flowing:

- [ ] Go to Google Analytics dashboard
- [ ] Create a custom dashboard to monitor:
  - Daily page views
  - Button click events
  - Form submission events
  - Top pages
  - Traffic sources

### Custom Dashboard Example
```
Dashboard Name: AllStar BJJ Daily Metrics

Cards:
- Pageviews (last 7 days)
- Button clicks by type (pie chart)
- Form submissions by form (table)
- Top 10 pages (table)
- Device breakdown (pie chart)
- Traffic by source (table)
```

## Step 9: Start Using Analytics

### Weekly Checks
- [ ] Check dashboard for unusual patterns
- [ ] Review top pages and traffic sources
- [ ] Verify all tracking attributes are working
- [ ] Look for any pages with low traffic that need optimization

### Monthly Reporting
- [ ] Generate month-over-month comparison
- [ ] Identify high-performing pages
- [ ] Check conversion funnels
- [ ] Export reports for marketing team

### Quarterly Reviews
- [ ] Analyze quarterly trends
- [ ] Compare traffic growth
- [ ] Identify seasonal patterns
- [ ] Optimize based on data insights

## Reference Files

These files were created/updated for GA4 setup:

- **`.env`** - Your configuration (don't commit to git)
- **`.env.example`** - Template for others to use
- **`src/layouts/PageLayout.astro`** - GA4 script injection
- **`src/lib/ga4-tracker.ts`** - Tracking utility (for future use)
- **`GA4_SETUP_GUIDE.md`** - Detailed setup instructions
- **`GA4_TRACKING_EXAMPLES.md`** - Copy-paste code examples
- **`GA4_DEPLOYMENT_CHECKLIST.md`** - This file

## Common Questions

**Q: How long before data appears in Google Analytics?**
A: Real-time data appears within seconds. Full analytics reports take 24-48 hours to populate.

**Q: Is my tracking ID secret? Should I hide it?**
A: GA4 measurement IDs are not secret - they're embedded in JavaScript on your site. Anyone can see it. Don't worry about security.

**Q: Can I test GA4 without deploying?**
A: Yes! In dev mode (npm run dev), GA4 still initializes, but real-time data might be slower. Deploy to see full testing.

**Q: What if I get "GA4 tracking disabled" warning?**
A: You forgot to add the measurement ID to `.env`. Add it and rebuild.

**Q: Can I track other events besides clicks and form submissions?**
A: Yes! See `src/lib/ga4-tracker.ts` for helper functions to track custom events.

**Q: Do I need to add tracking to every single link?**
A: No, just track the important ones (CTAs, navigation, forms). Too much tracking clutters your data.

**Q: How do I see what events were tracked?**
A: Go to Google Analytics > Events in left sidebar. All tracked events appear there.

## Next Steps After Going Live

1. **Week 1**: Monitor Real-time dashboard, verify all tracking works
2. **Week 2**: Create custom dashboards, set up alerts
3. **Month 1**: Analyze first month of data, identify patterns
4. **Month 2+**: Use insights to optimize site, improve conversions

---

**Need help?** See the other GA4 documentation files or Google's own guides at https://support.google.com/analytics
