// Run: node test/chat-function.test.mjs   (mocks Anthropic + command center; no network, no real key)
import assert from 'node:assert/strict';

let anthropicCalls = [];
let ccCalls = [];
let tsCalls = [];
let tsSuccess = true;
let ccResult = { status: 200, body: { success: true } };
let anthropicReply = 'Great question! Try our free 2-week trial.';
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('challenges.cloudflare.com')) {
    tsCalls.push({ url, opts, form: Object.fromEntries(new URLSearchParams(String(opts.body))) });
    return new Response(JSON.stringify({ success: tsSuccess }), { status: 200 });
  }
  const body = JSON.parse(opts.body);
  if (String(url).includes('api.anthropic.com')) {
    anthropicCalls.push({ url, opts, body });
    return new Response(JSON.stringify({ content: [{ type: 'text', text: anthropicReply }] }), { status: 200 });
  }
  ccCalls.push({ url, opts, body });
  return new Response(JSON.stringify(ccResult.body), { status: ccResult.status });
};

delete process.env.ANTHROPIC_API_KEY;
for (const k of ['COMMAND_CENTER_URL', 'INTERNAL_API_SECRET', 'TURNSTILE_SECRET_KEY', 'URL', 'DEPLOY_PRIME_URL']) delete process.env[k];
const mod = await import('../netlify/functions/chat.mjs');
const handler = mod.default;
const req = (body, { ip = '1.1.1.1', ct = 'application/json', raw, origin, method = 'POST' } = {}) =>
  new Request('http://x/api/chat', {
    method,
    headers: { 'content-type': ct, 'x-nf-client-connection-ip': ip, ...(origin ? { origin } : {}) },
    ...(method === 'POST' ? { body: raw ?? JSON.stringify(body) } : {}),
  });
const U = (t) => ({ role: 'user', content: t });
let n = 0; const ok = (name) => console.log(`PASS ${++n}. ${name}`);

// missing key fallback
let r = await handler(req({ messages: [U('hi')] }));
let j = await r.json();
assert.equal(r.status, 200);
assert.equal(j.reply, 'Chat is offline. Call (908) 341-1131 or book your free trial.');
assert.equal(anthropicCalls.length, 0); ok('missing key -> friendly fallback, no API call');

process.env.ANTHROPIC_API_KEY = 'sk-test-SECRET';

// non-JSON
r = await handler(req(null, { ct: 'text/plain', raw: 'hello' })); assert.equal(r.status, 415);
r = await handler(req(null, { raw: '{bad' })); assert.equal(r.status, 400); ok('rejects non-JSON / bad JSON');

// oversized message + too many turns
r = await handler(req({ messages: [U('a'.repeat(1001))] })); assert.equal(r.status, 400); ok('oversized message rejected');
const many = Array.from({ length: 13 }, (_, i) => (i % 2 ? { role: 'assistant', content: 'x' } : U('y')));
r = await handler(req({ messages: many })); assert.equal(r.status, 400); ok('>12 turns rejected');

// request shape
r = await handler(req({ messages: [U('How much is it?')] }, { ip: '2.2.2.2' }));
j = await r.json();
assert.equal(r.status, 200); assert.equal(j.reply, anthropicReply);
const c = anthropicCalls[0];
assert.equal(c.url, 'https://api.anthropic.com/v1/messages');
assert.equal(c.opts.headers['x-api-key'], 'sk-test-SECRET');
assert.equal(c.body.model, 'claude-haiku-4-5');
assert.equal(c.body.max_tokens, 400);
assert.equal(c.body.tools, undefined);
assert.deepEqual(c.body.messages, [U('How much is it?')]);
const sys = c.body.system.map((b) => b.text).join('\n');
assert.ok(sys.includes('YOU MUST NOT'));
assert.ok(sys.includes('Promise membership terms'));
assert.ok(sys.includes('Quote a rating, review count, student count'));
assert.ok(sys.includes('Name any coach except Jamal'));
assert.ok(sys.includes('$179 to $249'));
// already-booked rule
assert.ok(sys.includes('ALREADY BOOKED'));
assert.match(sys, /already booked or scheduled a class, do NOT use the \[\[LEAD_FORM\]\] token and do not ask them to book again/);
assert.match(sys, /check their email for the confirmation/);
assert.match(sys, /Only if they need to change or reschedule it, point them to \/trial\/ or tell them to call \(908\) 341-1131/);
assert.ok(!JSON.stringify(j).includes('sk-test')); ok('request shape: model, max_tokens, no tools, system has Must-NOT rules');

// pricing: only the range (plus $150 appearing solely inside a prohibition)
const dollars = [...sys.matchAll(/\$\s?\d[\d,]*/g)].map((m) => m[0].replace(/\s/g, ''));
const allowed = new Set(['$179', '$249', '$150']);
for (const d of dollars) assert.ok(allowed.has(d), `unexpected price ${d}`);
for (const line of sys.split('\n')) if (line.includes('$150')) assert.match(line, /not|NOT|Don't|Quote|Never/i, 'the $150 mention must be a prohibition: ' + line);
assert.ok(!/about \$60|\$80|\$50/i.test(sys)); ok('system prompt has no pricing other than $179-$249 range');
assert.ok(!sys.includes('4.8') && !sys.includes('192 reviews') && !sys.includes('300+')); ok('conflicting facts (rating/student count) not in prompt');

// CHAT_MODEL override + lead marker
process.env.CHAT_MODEL = 'claude-test-x';
anthropicReply = 'Awesome, let us get you booked! [[LEAD_FORM]]';
r = await handler(req({ messages: [U('I want to try a class')] }, { ip: '3.3.3.3' })); j = await r.json();
assert.equal(anthropicCalls.at(-1).body.model, 'claude-test-x');
assert.equal(j.showLeadForm, true); assert.ok(!j.reply.includes('[[')); ok('model override + lead form marker stripped');
delete process.env.CHAT_MODEL;

// rate limit (default 20/hr)
mod._resetRateLimit();
let last;
for (let i = 0; i < 21; i++) last = await handler(req({ messages: [U('hi')] }, { ip: '9.9.9.9' }));
assert.equal(last.status, 429); ok('rate limit: 21st message in an hour -> 429');
r = await handler(req({ messages: [U('hi')] }, { ip: '8.8.8.8' })); assert.equal(r.status, 200); ok('rate limit is per-IP');

// lead capture
process.env.COMMAND_CENTER_URL = 'https://cc.test';
process.env.INTERNAL_API_SECRET = 'test-secret-value';
mod._resetRateLimit();
const lead = { first_name: 'Ann', last_name: 'Lee', email: 'a@b.co', phone: '9083411131', program_of_interest: 'Cubs', sms_consent: 'yes', gym_id: 'evil', form_ms: 8000 };
const L = (over = {}, opts) => handler(req({ action: 'lead', lead: { ...lead, ...over } }, opts));
r = await L({ sms_consent: '' }); assert.equal(r.status, 400);
assert.equal(ccCalls.length, 0); ok('lead without SMS consent refused, nothing forwarded');
r = await L(); assert.equal(r.status, 200);
const cc = ccCalls[0];
assert.equal(cc.url, 'https://cc.test/api/capture-lead');
assert.equal(cc.opts.headers['x-internal-key'], 'test-secret-value');
assert.equal(cc.body.source, 'chatbot'); assert.equal(cc.body.sms_consent, 'yes');
assert.equal(cc.body.gym_id, '6e97ae1c-a46d-464b-a1e1-5f26f2899964');
assert.equal(cc.body.program_of_interest, 'Cubs'); assert.ok(cc.opts.headers['x-internal-key']);
assert.ok(!('form_ms' in cc.body) && !('turnstile_token' in cc.body) && !('bot-field' in cc.body)); ok('lead forwarded with LeadForm payload shape, source=chatbot, fixed gym_id, no bot fields');

// secrets: fail closed, log names only
{
  const errs = []; const origErr = console.error; console.error = (...a) => errs.push(a.join(' '));
  for (const [drop, name] of [['INTERNAL_API_SECRET', 'INTERNAL_API_SECRET'], ['COMMAND_CENTER_URL', 'COMMAND_CENTER_URL']]) {
    const saved = process.env[drop]; delete process.env[drop];
    const before = ccCalls.length; errs.length = 0;
    r = await L({}, { ip: '20.0.0.1' }); j = await r.json();
    assert.equal(r.status, 503);
    assert.deepEqual(j, { error: 'Lead capture is not configured. Call (908) 341-1131.' });
    assert.equal(ccCalls.length, before);
    assert.equal(errs.length, 1); assert.ok(errs[0].includes(name));
    assert.ok(!errs[0].includes('test-secret-value') && !errs[0].includes('cc.test'));
    process.env[drop] = saved;
  }
  console.error = origErr;
}
ok('missing COMMAND_CENTER_URL or INTERNAL_API_SECRET -> 503, one log line with the NAME only');
{
  const src = (await import('node:fs')).readFileSync(new URL('../netlify/functions/chat.mjs', import.meta.url), 'utf8')
    + (await import('node:fs')).readFileSync(new URL('../netlify/functions/lead-capture.mjs', import.meta.url), 'utf8');
  assert.ok(!src.includes('allstar2026') && !src.includes('jovial-crostata'));
} ok('no hardcoded secret or command-center URL fallback in functions');

// upstream errors never reach the visitor
ccResult = { status: 500, body: { error: 'SECRET DB DETAILS: stack at foo.js:1' } };
r = await L({}, { ip: '20.0.0.2' }); j = await r.text();
assert.equal(r.status, 502); assert.ok(!j.includes('SECRET DB') && !j.includes('stack'));
ccResult = { status: 200, body: { success: true } }; ok('command center error text is not passed to the client');

// origin / CORS
mod._resetRateLimit();
r = await handler(req({ messages: [U('hi')] }, { origin: 'https://evil.example', ip: '30.0.0.1' })); assert.equal(r.status, 403);
assert.equal(r.headers.get('access-control-allow-origin'), null);
r = await handler(req(null, { origin: 'https://evil.example', method: 'OPTIONS' })); assert.equal(r.status, 403);
r = await handler(req({ messages: [U('hi')] }, { origin: 'https://allstarbjj.com', ip: '30.0.0.2' }));
assert.equal(r.status, 200); assert.equal(r.headers.get('access-control-allow-origin'), 'https://allstarbjj.com'); assert.equal(r.headers.get('vary'), 'Origin');
r = await handler(req({ messages: [U('hi')] }, { origin: 'https://www.allstarbjj.com', ip: '30.0.0.3' }));
assert.equal(r.headers.get('access-control-allow-origin'), 'https://www.allstarbjj.com');
r = await handler(req({ messages: [U('hi')] }, { ip: '30.0.0.4' }));
assert.equal(r.status, 200); assert.notEqual(r.headers.get('access-control-allow-origin'), '*');
process.env.URL = 'https://main--allstar.netlify.app/'; process.env.DEPLOY_PRIME_URL = 'https://deploy-preview-5--allstar.netlify.app';
r = await handler(req({ messages: [U('hi')] }, { origin: 'https://main--allstar.netlify.app', ip: '30.0.0.5' })); assert.equal(r.status, 200);
r = await handler(req({ messages: [U('hi')] }, { origin: 'https://deploy-preview-5--allstar.netlify.app', ip: '30.0.0.6' })); assert.equal(r.status, 200);
delete process.env.URL; delete process.env.DEPLOY_PRIME_URL;
r = await handler(req({ messages: [U('hi')] }, { origin: 'https://deploy-preview-5--allstar.netlify.app', ip: '30.0.0.7' })); assert.equal(r.status, 403);
ok('CORS: allowed origins echoed with Vary, unknown origin 403, no Origin allowed, no wildcard, Netlify URLs honored');

// anti-bot: honeypot, timing
mod._resetRateLimit();
let before = ccCalls.length;
r = await L({ 'bot-field': 'http://spam' }, { ip: '40.0.0.1' }); j = await r.json();
assert.equal(r.status, 200); assert.deepEqual(j, { ok: true });
r = await L({ 'bot-field': 'x', first_name: '', email: 'bad' }, { ip: '40.0.0.1' }); assert.equal(r.status, 200); // honeypot beats validation
ok('honeypot -> silent fake success, checked before validation');
for (const bad of [0, 2999, undefined, '9000', null, NaN]) {
  r = await L({ form_ms: bad, first_name: '' }, { ip: '40.0.0.2' }); assert.equal(r.status, 200, 'form_ms ' + bad); assert.deepEqual(await r.json(), { ok: true });
}
r = await L({ form_ms: 3000 }, { ip: '40.0.0.3' }); assert.equal(r.status, 200);
assert.equal(ccCalls.length, before + 1); ok('timing: form_ms missing/non-number/<3000 -> silent fake success (not forwarded); >=3000 forwarded');

// Turnstile
mod._resetRateLimit();
before = ccCalls.length;
r = await L({}, { ip: '50.0.0.1' }); assert.equal(r.status, 200); assert.equal(tsCalls.length, 0); ok('turnstile secret unset -> no verification');
process.env.TURNSTILE_SECRET_KEY = 'ts-secret-value';
r = await L({}, { ip: '50.0.0.2' }); j = await r.json();
assert.equal(r.status, 400); assert.deepEqual(j, { error: 'Bot check failed. Please try again.' }); assert.equal(tsCalls.length, 0); ok('turnstile secret set + missing token -> 400');
before = ccCalls.length;
r = await L({ turnstile_token: 'tok-abc' }, { ip: '50.0.0.3' }); assert.equal(r.status, 200);
assert.equal(tsCalls.length, 1);
assert.equal(tsCalls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
assert.deepEqual(tsCalls[0].form, { secret: 'ts-secret-value', response: 'tok-abc', remoteip: '50.0.0.3' });
assert.equal(ccCalls.length, before + 1); assert.ok(!('turnstile_token' in ccCalls.at(-1).body)); ok('turnstile valid token -> siteverify called with secret/response/remoteip, lead forwarded');
tsSuccess = false; before = ccCalls.length;
{
  const logs = []; const oe = console.error, ol = console.log; console.error = console.log = (...a) => logs.push(a.join(' '));
  r = await L({ turnstile_token: 'tok-bad' }, { ip: '50.0.0.4' });
  console.error = oe; console.log = ol;
  assert.ok(!logs.join('\n').includes('tok-bad'));
}
assert.equal(r.status, 400); assert.equal(ccCalls.length, before); tsSuccess = true; ok('turnstile failed token -> 400, nothing forwarded, token not logged');
delete process.env.TURNSTILE_SECRET_KEY;

// widget wiring (source checks)
{
  const fs = await import('node:fs');
  const w = fs.readFileSync(new URL('../src/components/ChatWidget.astro', import.meta.url), 'utf8');
  assert.ok(/name="bot-field"[^>]*tabindex="-1"[^>]*autocomplete="off"[^>]*aria-hidden="true"/.test(w));
  assert.ok(w.includes("'bot-field': f['bot-field'].value") && w.includes('form_ms:'));
  assert.ok(w.includes('PUBLIC_TURNSTILE_SITE_KEY') && w.includes('https://challenges.cloudflare.com/turnstile/v0/api.js') && w.includes('turnstile_token'));
} ok('widget: hidden honeypot, form_ms, optional Turnstile wired');
console.log('\nAll tests passed');
