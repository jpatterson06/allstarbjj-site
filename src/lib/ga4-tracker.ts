/**
 * Google Analytics 4 Tracking Utility
 *
 * This module provides helper functions to track events with GA4 gtag.js library.
 * The gtag script is loaded in PageLayout.astro
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track a custom event with GA4
 * @param eventName - The event name (e.g., "button_click", "form_submit")
 * @param eventData - Optional event data object
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData || {});
  }
}

/**
 * Track button clicks
 * Looks for data-track-event attribute on buttons/links
 */
export function setupClickTracking() {
  if (typeof document === 'undefined') return;

  // Track any element with data-track-event attribute
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const trackAttr = target.closest('[data-track-event]');

    if (trackAttr) {
      const eventName = trackAttr.getAttribute('data-track-event');
      const eventLabel = trackAttr.getAttribute('data-track-label');

      if (eventName && window.gtag) {
        window.gtag('event', eventName, {
          'event_label': eventLabel || trackAttr.textContent?.trim() || 'unknown',
          'event_category': 'engagement'
        });
      }
    }
  }, true);
}

/**
 * Track form submissions
 * Looks for data-track-form attribute on forms
 */
export function setupFormTracking() {
  if (typeof document === 'undefined') return;

  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement;
    const trackAttr = form.getAttribute('data-track-form');

    if (trackAttr && window.gtag) {
      window.gtag('event', 'form_submit', {
        'event_label': trackAttr,
        'event_category': 'engagement'
      });
    }
  }, true);
}

/**
 * Initialize all GA4 tracking
 * Call this on page load or in a useEffect
 */
export function initializeGA4Tracking() {
  setupClickTracking();
  setupFormTracking();
}
