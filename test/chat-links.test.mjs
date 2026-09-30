// Run: node test/chat-links.test.mjs   (no network)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
process.env.ANTHROPIC_API_KEY = 'x';
const mod = await import('../netlify/functions/chat.mjs');
const widget = readFileSync(new URL('../src/components/ChatWidget.astro', import.meta.url), 'utf8');
const leadForm = readFileSync(new URL('../src/components/LeadForm.astro', import.meta.url), 'utf8');
const schedule = readFileSync(new URL('../src/pages/schedule.astro', import.meta.url), 'utf8');
let n = 0; const ok = (name) => console.log(`PASS ${++n}. ${name}`);

const opts = (src, re) => [...src.matchAll(re)].map((m) => m[1]);
const optRe = /<option value="([^"]+)"/g;
const formVals = opts(leadForm, optRe).filter(Boolean).sort();
const widgetVals = opts(widget, optRe).filter(Boolean).sort();
assert.deepEqual(widgetVals, formVals); ok('widget program dropdown values are identical to LeadForm');

// LeadForm redirect expression vs widget helper
assert.ok(leadForm.includes(`'/schedule/?program=' + encodeURIComponent(prog)`));
const fn = widget.match(/\/\/ BEGIN scheduleUrl\n([\s\S]*?)\/\/ END scheduleUrl/)[1];
const widgetUrl = new Function(fn + '; return scheduleUrl;')();
const formUrl = (prog) => (prog ? '/schedule/?program=' + encodeURIComponent(prog) : '/schedule/'); // copy of LeadForm goToSchedule
for (const p of formVals) assert.equal(widgetUrl(p), formUrl(p));
assert.equal(widgetUrl('Adult BJJ'), '/schedule/?program=Adult%20BJJ'); ok('widget "Pick your class time" link == LeadForm redirect for every program');
assert.ok(widget.includes('Pick your class time') && widget.includes('cta.href = scheduleUrl(data.program_of_interest)'));

// GA4
assert.ok(/gtag\('event', 'generate_lead'/.test(widget) && widget.includes("form_name: 'chat_widget'") && widget.includes("typeof gtag === 'function'") && widget.includes('lead_source'));
assert.ok(widget.includes("track('chat_lead'")); ok('generate_lead (chat_widget) fired guarded, chat_lead kept');

// Bot prompt links: exactly the calendar programs, same format; /trial/ fallback; nothing else
const sys = mod.SYSTEM_RULES;
const calPrograms = [...schedule.matchAll(/^\s*'([^']+)':\s+'[a-z0-9-]+',/gm)].map((m) => m[1]).filter((p) => formVals.includes(p));
assert.deepEqual([...new Set(calPrograms)].sort(), ['Adult BJJ', 'Adult MMA', 'Adult Muay Thai', 'Cubs', 'Lions']);
for (const p of calPrograms) { assert.equal(mod.scheduleLink(p), formUrl(p)); assert.ok(sys.includes(`${p} -> ${formUrl(p)}`), p); }
assert.ok(sys.includes('/trial/'));
const links = sys.match(/\/[a-z]+\/[^\s)]*/g).filter((l) => /^\/(schedule|trial)\//.test(l));
assert.ok(links.length >= 6);
assert.ok(!/https?:\/\//.test(sys.split('KNOWLEDGE BASE')[0])); ok('system prompt allows only /schedule/?program=<value> (same format) and /trial/');
assert.ok(sys.includes('YOU MUST NOT') && sys.includes('Never write any other URL')); ok('Must-NOT rules intact, no other links allowed');
console.log('\nAll link tests passed');
