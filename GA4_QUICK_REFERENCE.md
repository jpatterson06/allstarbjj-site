# GA4 Quick Reference Card

## One-Minute Setup
1. Get GA4 Measurement ID from Google Analytics (G-XXXXXXXXXX)
2. Add to `.env`: `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Deploy
4. Done

## Track Button Clicks
```html
<button data-track-event="event_name" data-track-label="Button Label">
  Click me
</button>
```

## Track Form Submissions
```html
<form data-track-form="form_name" action="/api/submit" method="POST">
  <!-- form fields -->
</form>
```

## Event Naming
Use underscores: `free_trial_click`, `contact_form_click`, `schedule_class_click`

## File Locations
| File | Purpose |
|------|---------|
| `.env` | Your GA4 Measurement ID (don't commit to git) |
| `.env.example` | Template for others |
| `src/layouts/PageLayout.astro` | GA4 script + tracking code |
| `src/lib/ga4-tracker.ts` | Tracking utilities |

## Verify It Works
1. Deploy site
2. Go to Google Analytics > Real-time
3. Visit your site
4. Click tracked buttons
5. Watch events appear in real-time

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "GA4 tracking disabled" in console | Add Measurement ID to `.env` and rebuild |
| No data in Google Analytics | Wait 24-48 hours, or check Real-time view |
| Button clicks not tracking | Verify `data-track-event` spelling and rebuild |
| Form submissions not tracking | Attribute must be on `<form>` tag, not button |

## Important Notes
- Measurement ID is not secret (it's in your JavaScript)
- `.env` is already in `.gitignore` (won't be committed)
- Page views are tracked automatically
- GA4 takes 24-48 hours to show full reports

## Documentation
- **Full setup guide**: `GA4_SETUP_GUIDE.md`
- **Code examples**: `GA4_TRACKING_EXAMPLES.md`
- **Deployment steps**: `GA4_DEPLOYMENT_CHECKLIST.md`

---

**Get started**: Add your Measurement ID to `.env`, deploy, check Real-time. That's it!
