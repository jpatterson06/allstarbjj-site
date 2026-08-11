// The website must tell Analytics when somebody enquires.
//
// It never did. PageLayout.astro fires on forms carrying data-track-form, and
// LeadForm.astro has never had that attribute — verified 2026-08-11 by
// grepping the whole src tree: data-track-form appears only in the layout's own
// helper and in its usage comments, never on an actual element. So the command
// centre's "People who contacted you" card was reading something that had
// nothing to do with the lead form: 8 in a month against 105 real enquiries.
import fs from 'fs';
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FAIL:', m); } };

const form   = fs.readFileSync('src/components/LeadForm.astro', 'utf8');
const layout = fs.readFileSync('src/layouts/PageLayout.astro', 'utf8');

ok(/gtag\('event', 'generate_lead'/.test(form), 'the form reports a lead to GA4');
ok(/generate_lead/.test(form) && !/gtag\('event', 'lead_captured'|'form_success'/.test(form),
   "it uses GA4's own recommended event name, which needs no custom registration");

// Only on success. Firing on submit would count validation failures and server
// errors as enquiries — the same over-counting that made 84 look plausible.
const submitIdx  = form.indexOf("form.addEventListener('submit'");
const successIdx = form.indexOf("gtag('event', 'generate_lead'");
const catchIdx   = form.indexOf('} catch (err) {', submitIdx);
ok(successIdx > submitIdx && successIdx < catchIdx, 'the event fires inside the try, after a successful response');
ok(form.indexOf('const result = await resp.json();') < successIdx, 'and only after the server has actually accepted the lead');
ok(/throw new Error\(result\.error/.test(form.slice(submitIdx, successIdx)),
   'the error path throws BEFORE the event, so a failed submission cannot be counted');

// The redirect must not eat the beacon, and analytics must not hold up a customer.
ok(/event_callback: once/.test(form), 'the redirect waits for the beacon via event_callback');
ok(/setTimeout\(once, 1200\)/.test(form), 'with a timeout so a missing or slow gtag never strands the visitor');
ok(/let moved = false/.test(form) && /if \(!moved\)/.test(form), 'and the redirect can only happen once');
ok(/if \(typeof gtag === 'function'\)/.test(form) && /\} else \{\s*\n\s*goToSchedule\(\);/.test(form),
   'no gtag on the page means straight to the schedule, not a broken form');

// Exactly one redirect path, so the two branches can never diverge.
ok((form.match(/window\.location\.href = prog \?/g) || []).length === 1, 'there is one redirect, shared by both branches');

// The tag itself has to be present for any of this to work.
ok(/ga4MeasurementId &&/.test(layout), 'the GA4 tag only renders when a measurement ID is configured');
ok(/PUBLIC_GA_MEASUREMENT_ID not configured/.test(layout), 'and it says so in the console when it is not');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
