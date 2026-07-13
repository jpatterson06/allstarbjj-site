# GA4 Tracking Implementation Examples

This guide shows exactly where and how to add GA4 tracking attributes to components.

## Button Click Tracking

### Basic Button
```html
<button data-track-event="free_trial_click" data-track-label="Start Free Trial">
  Start Your Free Trial
</button>
```

### CTA Button with Styling
```html
<button 
  class="btn btn-primary" 
  data-track-event="contact_us_click" 
  data-track-label="Contact Us - Homepage"
  onclick="window.location.href='/contact'"
>
  Contact Us Today
</button>
```

### Navigation Link
```html
<a 
  href="/classes" 
  data-track-event="nav_classes_click" 
  data-track-label="Classes - Main Nav"
>
  Our Classes
</a>
```

### Phone Call Button
```html
<a 
  href="tel:+1-908-341-1131" 
  data-track-event="call_now_click" 
  data-track-label="Call Now Button"
  class="btn btn-secondary"
>
  Call: (908) 341-1131
</a>
```

### Social Media Links
```html
<!-- Facebook -->
<a 
  href="https://www.facebook.com/allstarbjjmma" 
  target="_blank"
  data-track-event="social_facebook_click" 
  data-track-label="Facebook - Footer"
>
  Facebook
</a>

<!-- Instagram -->
<a 
  href="https://www.instagram.com/allstar_martialarts" 
  target="_blank"
  data-track-event="social_instagram_click" 
  data-track-label="Instagram - Footer"
>
  Instagram
</a>
```

## Form Submission Tracking

### Contact Form
```html
<form 
  data-track-form="contact_form"
  action="/api/contact" 
  method="POST"
>
  <input 
    type="text" 
    name="name" 
    placeholder="Your name" 
    required 
  />
  <input 
    type="email" 
    name="email" 
    placeholder="Your email" 
    required 
  />
  <textarea 
    name="message" 
    placeholder="How can we help?" 
    required
  ></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Class Enrollment Form
```html
<form 
  data-track-form="class_enrollment"
  action="/api/enroll" 
  method="POST"
>
  <select name="age_group" required>
    <option value="">Select age group</option>
    <option value="kids">Kids (4-12)</option>
    <option value="teens">Teens (13-17)</option>
    <option value="adults">Adults (18+)</option>
  </select>
  
  <select name="discipline" required>
    <option value="">Select discipline</option>
    <option value="bjj">Brazilian Jiu Jitsu</option>
    <option value="mma">MMA</option>
    <option value="muay_thai">Muay Thai</option>
  </select>
  
  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" required />
  
  <button type="submit">Enroll Now</button>
</form>
```

### Newsletter Signup
```html
<form 
  data-track-form="newsletter_signup"
  action="/api/newsletter" 
  method="POST"
>
  <input 
    type="email" 
    name="email" 
    placeholder="Enter your email" 
    required 
  />
  <button type="submit">Subscribe</button>
</form>
```

### Free Trial Request
```html
<form 
  data-track-form="free_trial_request"
  action="/api/trial" 
  method="POST"
>
  <input 
    type="text" 
    name="name" 
    placeholder="Your name" 
    required 
  />
  <input 
    type="email" 
    name="email" 
    placeholder="Your email" 
    required 
  />
  <input 
    type="tel" 
    name="phone" 
    placeholder="Your phone" 
    required 
  />
  <select name="interested_in" required>
    <option value="">What are you interested in?</option>
    <option value="adult_bjj">Adult BJJ</option>
    <option value="kids_bjj">Kids BJJ</option>
    <option value="mma">MMA</option>
    <option value="muay_thai">Muay Thai</option>
  </select>
  <button type="submit">Claim Free Trial</button>
</form>
```

## Real-World Component Examples

### Hero Section CTA (Astro/React)
```html
<section class="hero">
  <h1>Learn Brazilian Jiu Jitsu in Union, NJ</h1>
  <p>Beginner-friendly classes for kids & adults</p>
  
  <div class="hero-ctas">
    <button 
      class="btn btn-primary"
      data-track-event="hero_free_trial_click"
      data-track-label="Free Trial - Hero Section"
      onclick="scrollToForm('#trial-form')"
    >
      Start Free Trial
    </button>
    
    <a 
      href="/classes" 
      class="btn btn-secondary"
      data-track-event="hero_view_classes_click"
      data-track-label="View Classes - Hero Section"
    >
      View Our Classes
    </a>
  </div>
</section>
```

### Class Card
```html
<div class="class-card">
  <h3>Adult Brazilian Jiu Jitsu</h3>
  <p>Learn fundamentals to advanced techniques</p>
  <p class="price">Starting at $99/month</p>
  
  <a 
    href="/adult-bjj" 
    class="btn"
    data-track-event="class_card_click"
    data-track-label="Adult BJJ Card"
  >
    Learn More
  </a>
  
  <button 
    class="btn btn-secondary"
    data-track-event="class_schedule_click"
    data-track-label="Schedule Adult BJJ"
    onclick="openScheduler('adult-bjj')"
  >
    Schedule Class
  </button>
</div>
```

### Header Navigation
```html
<header>
  <nav>
    <a 
      href="/" 
      class="logo"
      data-track-event="logo_click"
      data-track-label="Logo Click"
    >
      AllStar
    </a>
    
    <ul class="nav-links">
      <li>
        <a 
          href="/classes"
          data-track-event="nav_click"
          data-track-label="Nav - Classes"
        >
          Classes
        </a>
      </li>
      <li>
        <a 
          href="/about"
          data-track-event="nav_click"
          data-track-label="Nav - About"
        >
          About
        </a>
      </li>
      <li>
        <a 
          href="/schedule"
          data-track-event="nav_click"
          data-track-label="Nav - Schedule"
        >
          Schedule
        </a>
      </li>
      <li>
        <a 
          href="/contact"
          data-track-event="nav_click"
          data-track-label="Nav - Contact"
        >
          Contact
        </a>
      </li>
    </ul>
  </nav>
</header>
```

### Footer Links
```html
<footer>
  <div class="footer-section">
    <h4>Quick Links</h4>
    <ul>
      <li>
        <a 
          href="/free-trial"
          data-track-event="footer_link_click"
          data-track-label="Footer - Free Trial"
        >
          Free Trial
        </a>
      </li>
      <li>
        <a 
          href="/contact"
          data-track-event="footer_link_click"
          data-track-label="Footer - Contact"
        >
          Contact Us
        </a>
      </li>
      <li>
        <a 
          href="/privacy"
          data-track-event="footer_link_click"
          data-track-label="Footer - Privacy"
        >
          Privacy Policy
        </a>
      </li>
    </ul>
  </div>
  
  <div class="footer-section">
    <h4>Call Us</h4>
    <a 
      href="tel:+1-908-341-1131"
      data-track-event="footer_phone_click"
      data-track-label="Footer - Call"
      class="phone-link"
    >
      (908) 341-1131
    </a>
  </div>
</footer>
```

## Naming Conventions

### Event Names (use underscores)
- `free_trial_click` - Free trial button clicked
- `contact_us_click` - Contact button clicked
- `schedule_class_click` - Schedule button clicked
- `view_classes_click` - View classes link clicked
- `nav_click` - Navigation link clicked
- `social_facebook_click` - Social media link clicked

### Labels (descriptive)
- `Free Trial - Homepage` - Shows context
- `Call Now Button` - Clear action
- `Classes - Header Nav` - Shows location
- `Contact Form - Contact Page` - Shows form type
- `Newsletter Signup - Footer` - Shows form and location

## Testing Your Tracking

### In Browser Console
```javascript
// Trigger a test event
gtag('event', 'test_event', {
  'event_label': 'This is a test',
  'event_category': 'engagement'
});
```

### Check Real-time in Google Analytics
1. Open Google Analytics
2. Go to Realtime > Events
3. Click the button/submit the form you're testing
4. Event should appear in real-time (may take a few seconds)

## Common Mistakes to Avoid

1. **Typos in attributes**
   - ❌ `data-track-evt` (wrong)
   - ✅ `data-track-event` (correct)

2. **Forgetting underscores in event names**
   - ❌ `freeTrialClick` (camelCase - won't work)
   - ✅ `free_trial_click` (snake_case - correct)

3. **Not adding to all key buttons**
   - Add tracking to all CTA buttons
   - Don't forget navigation links
   - Include social media links

4. **Using generic labels**
   - ❌ `Button` (not descriptive)
   - ✅ `Free Trial - Homepage` (clear context)

5. **Forgetting form attribute placement**
   - ❌ `<button data-track-form="...">` (wrong - should be on form)
   - ✅ `<form data-track-form="...">` (correct - on form tag)

## Deployment Checklist

- [ ] Add GA4 Measurement ID to `.env`
- [ ] Run `npm run build`
- [ ] Test locally with GA4 console open
- [ ] Deploy to production
- [ ] Check Google Analytics Real-time tab
- [ ] Verify page views and events appear
- [ ] Wait 24-48 hours for full reporting
- [ ] Create dashboards for key metrics
