// Run: node test/chat-function.test.mjs   (mocks Anthropic + command center; no network, no real key)
import assert from 'node:assert/strict';

let anthropicCalls = [];
let ccCalls = [];
let anthropicReply = 'Great question! Try our free 2-week trial.';
globalThis.fetch = async (url, opts) => {
  const body = JSON.parse(opts.body);
  if (String(url).includes('api.anthropic.com')) {
    anthropicCalls.push({ url, opts, body });
    return new Response(JSON.stringify({ content: [{ type: 'text', text: anthropicReply }] }), { status: 200 });
  }
  ccCalls.push({ url, opts, body });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

delete process.env.ANTHROPIC_API_KEY;
const mod = await import('../netlify/functions/chat.mjs');
const handler = mod.default;
const req = (body, { ip = '1.1.1.1', ct = 'application/json', raw } = {}) =>
  new Request('http://x/api/chat', { method: 'POST', headers: { 'content-type': ct, 'x-nf-client-connection-ip': ip }, body: raw ?? JSON.stringify(body) });
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
mod._resetRateLimit();
const lead = { first_name: 'Ann', last_name: 'Lee', email: 'a@b.co', phone: '9083411131', program_of_interest: 'Cubs', sms_consent: 'yes', gym_id: 'evil' };
r = await handler(req({ action: 'lead', lead: { ...lead, sms_consent: '' } })); assert.equal(r.status, 400);
assert.equal(ccCalls.length, 0); ok('lead without SMS consent refused, nothing forwarded');
r = await handler(req({ action: 'lead', lead })); assert.equal(r.status, 200);
const cc = ccCalls[0];
assert.ok(cc.url.endsWith('/api/capture-lead'));
assert.equal(cc.body.source, 'chatbot'); assert.equal(cc.body.sms_consent, 'yes');
assert.equal(cc.body.gym_id, '6e97ae1c-a46d-464b-a1e1-5f26f2899964');
assert.equal(cc.body.program_of_interest, 'Cubs'); assert.ok(cc.opts.headers['x-internal-key']); ok('lead forwarded with LeadForm payload shape, source=chatbot, fixed gym_id');
console.log('\nAll tests passed');
