// Netlify Function: /api/lead-capture
//
// Thin proxy — receives the public site form, forwards to the command center.
// No Supabase credentials needed here. All business logic lives in the command center.
//
// POST body (JSON):
//   first_name, last_name, email, phone, program_of_interest, sms_consent,
//   source_town?, utm_source?, utm_medium?, utm_campaign?, utm_content?, utm_term?

const CC_URL    = process.env.COMMAND_CENTER_URL || 'https://jovial-crostata-5c5080.netlify.app';
const CC_SECRET = process.env.INTERNAL_API_SECRET || 'allstar2026';

// The command center went multi-tenant (Andre Gusmao Academy onboarded onto
// JFive alongside All Star), so it now refuses any lead that doesn't say
// which gym it belongs to. This site only ever serves All Star BJJ leads,
// so the id is fixed here server-side — never taken from the visitor's
// request — to prevent a client-supplied gym_id from ever overriding it.
const GYM_ID = process.env.GYM_ID || '6e97ae1c-a46d-464b-a1e1-5f26f2899964';

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return respond(204, '');
  }
  if (request.method !== 'POST') {
    return respond(405, { error: 'POST required' });
  }

  // ── Parse body ────────────────────────────────────────────────────────────────
  let fields = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      fields = await request.json();
    } else {
      const text = await request.text();
      for (const [k, v] of new URLSearchParams(text)) fields[k] = v;
    }
  } catch {
    return respond(400, { error: 'Could not parse request body' });
  }

  // ── Basic validation (fast fail before calling command center) ────────────────
  const { first_name, last_name, email, phone, sms_consent } = fields;
  if (!first_name || !last_name || !email || !phone) {
    return respond(400, { error: 'Missing required fields: first_name, last_name, email, phone' });
  }
  if (sms_consent !== 'yes') {
    return respond(400, { error: 'SMS consent is required' });
  }

  // ── Forward to command center ─────────────────────────────────────────────────
  try {
    const ccResp = await fetch(`${CC_URL}/api/capture-lead`, {
      method:  'POST',
      headers: {
        'Content-Type':   'application/json',
        'x-internal-key': CC_SECRET,
      },
      body: JSON.stringify({ ...fields, gym_id: GYM_ID }),
    });

    const result = await ccResp.json();

    if (!ccResp.ok || result.error) {
      console.error('Command center error:', result);
      return respond(ccResp.status || 500, { error: result.error || 'Command center error' });
    }

    return respond(200, result);

  } catch (err) {
    console.error('Proxy fetch failed:', err.message);
    return respond(502, { error: 'Could not reach command center. Try again.' });
  }
};

// ── Response helpers ──────────────────────────────────────────────────────────
function cors() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
function respond(status, data) {
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

export const config = { path: '/api/lead-capture' };
