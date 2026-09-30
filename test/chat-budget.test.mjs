// Run: node test/chat-budget.test.mjs   (mocks Anthropic + Netlify Blobs; no network)
import assert from 'node:assert/strict';

let anthropicCalls = 0;
let usage = { input_tokens: 1000, output_tokens: 100, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
globalThis.fetch = async (url) => {
  if (String(url).includes('api.anthropic.com')) {
    anthropicCalls++;
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'Try our free trial!' }], usage }), { status: 200 });
  }
  return new Response('{}', { status: 200 });
};
process.env.ANTHROPIC_API_KEY = 'sk-test-SECRET';
process.env.CHAT_RATE_LIMIT = '100000';
delete process.env.CHAT_MONTHLY_CAP_USD;

const mod = await import('../netlify/functions/chat.mjs');
const handler = mod.default;
let n = 0; const ok = (name) => console.log(`PASS ${++n}. ${name}`);
let ipn = 0;
const chat = async () => {
  const r = await handler(new Request('http://x/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-nf-client-connection-ip': `10.0.0.${++ipn}` },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
  }));
  return r.json();
};
const fakeBlobs = () => {
  const data = new Map();
  return { data, factory: () => ({ get: async (k) => data.get(k) ?? null, setJSON: async (k, v) => { data.set(k, v); } }) };
};
const RealDate = Date;
const setNow = (iso) => {
  globalThis.Date = class extends RealDate {
    constructor(...a) { super(...(a.length ? a : [iso])); }
    static now() { return new RealDate(iso).getTime(); }
  };
};
const realNow = () => { globalThis.Date = RealDate; };

// 1. cost calculation (micro-dollars, rounded up)
assert.equal(mod.costMicro({ input_tokens: 1_000_000 }), 1_000_000);            // $1.00
assert.equal(mod.costMicro({ output_tokens: 1_000_000 }), 5_000_000);           // $5.00
assert.equal(mod.costMicro({ cache_creation_input_tokens: 1_000_000 }), 1_250_000);
assert.equal(mod.costMicro({ cache_read_input_tokens: 1_000_000 }), 100_000);
assert.equal(mod.costMicro({ input_tokens: 1000, output_tokens: 100, cache_creation_input_tokens: 4000, cache_read_input_tokens: 500 }),
  1000 * 1 + 100 * 5 + 4000 * 1.25 + 500 * 0.10);
assert.equal(mod.costMicro({ input_tokens: 1 }), 1);        // rounds up, never 0
assert.equal(mod.costMicro({ cache_read_input_tokens: 1 }), 1); // 0.1 -> 1
assert.equal(mod.costMicro(undefined), 0);
assert.equal(mod.capUsd(), 15); assert.equal(mod.dayCapUsd(), 2); ok('cost calculation, rounds up; default cap 15, day cap ceil(15/10)=2');

// 2. usage is recorded after a call, month + day
let b = fakeBlobs(); mod._setStoreFactory(b.factory); mod._resetBudget(); mod._resetRateLimit();
setNow('2026-09-15T12:00:00Z');
await chat();
assert.equal(b.data.get('month-2026-09').micro, 1500);
assert.equal(b.data.get('day-2026-09-15').micro, 1500); ok('usage saved to Blobs under month and day keys (UTC)');

// 3. monthly cap reached => friendly message, NO Anthropic call
b = fakeBlobs(); b.data.set('month-2026-09', { micro: 15_000_000 }); mod._setStoreFactory(b.factory); mod._resetBudget();
anthropicCalls = 0;
let j = await chat();
assert.equal(anthropicCalls, 0);
assert.equal(j.reply, 'Chat is taking a break. Call (908) 341-1131 or book your free trial at /trial/.');
assert.equal(j.offline, true); ok('cap reached -> friendly fallback, Anthropic not called');
b.data.set('month-2026-09', { micro: 14_999_999 }); j = await chat();
assert.equal(anthropicCalls, 1); ok('just under cap still answers');

// 4. day cap: ceil(cap/10) dollars
b = fakeBlobs(); b.data.set('day-2026-09-15', { micro: 2_000_000 }); mod._setStoreFactory(b.factory); mod._resetBudget();
anthropicCalls = 0; j = await chat();
assert.equal(anthropicCalls, 0); assert.match(j.reply, /taking a break/); ok('daily cap ($2 of a $15 month) stops the bot for the day');
process.env.CHAT_MONTHLY_CAP_USD = '40'; assert.equal(mod.dayCapUsd(), 4); ok('CHAT_MONTHLY_CAP_USD changes cap and day cap');
delete process.env.CHAT_MONTHLY_CAP_USD;

// 5. month rollover: a new month starts at zero; next day resets the day
setNow('2026-10-01T00:00:01Z');
b = fakeBlobs(); b.data.set('month-2026-09', { micro: 15_000_000 }); b.data.set('day-2026-09-30', { micro: 2_000_000 });
mod._setStoreFactory(b.factory); mod._resetBudget(); anthropicCalls = 0;
await chat();
assert.equal(anthropicCalls, 1);
assert.equal(b.data.get('month-2026-10').micro, 1500); ok('month rollover: October starts fresh');
realNow();

// 6. Blobs failure -> in-memory fallback, request still works, warning has no secrets
const warns = []; const origWarn = console.warn; console.warn = (...a) => warns.push(a.join(' '));
mod._setStoreFactory(() => { throw new Error('blobs down sk-test-SECRET'); }); mod._resetBudget();
setNow('2026-09-15T12:00:00Z');
anthropicCalls = 0; j = await chat();
assert.equal(anthropicCalls, 1); assert.equal(j.reply, 'Try our free trial!');
usage = { input_tokens: 15_000_000 }; await chat(); // $15 in memory
anthropicCalls = 0; j = await chat();
assert.equal(anthropicCalls, 0); assert.match(j.reply, /taking a break/);
console.warn = origWarn; realNow();
assert.ok(warns.length >= 1); assert.ok(!warns.join(' ').includes('SECRET')); ok('Blobs failure -> memory counting still enforces cap; warning logged without secrets');
console.log('\nAll budget tests passed');
