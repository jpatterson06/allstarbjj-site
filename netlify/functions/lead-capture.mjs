// Netlify Function: /api/lead-capture
//
// POST — receives trial form submissions from the public site.
// 1. Validates required fields
// 2. Inserts lead into Supabase
// 3. Fires the AI follow-up funnel (calls command center /api/ai-followup)
//
// Environment variables required (set in allstarbjj-site Netlify dashboard):
//   SUPABASE_URL
//   SUPABASE_SERVICE_KEY
//   COMMAND_CENTER_URL   — e.g. https://jovial-crostata-5c5080.netlify.app
//   INTERNAL_API_SECRET  — shared secret so command center accepts the call

const SUPABASE_URL    = process.env.SUPABASE_URL;
const SERVICE_KEY     = process.env.SUPABASE_SERVICE_KEY;
const CC_URL          = process.env.COMMAND_CENTER_URL || 'https://jovial-crostata-5c5080.netlify.app';
const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET || '';

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: cors() });
  }
  if (request.method !== 'POST') {
    return jsonError(405, 'POST required');
  }
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return jsonError(500, 'Supabase env vars not configured');
  }

  // ── Parse body (JSON or form-encoded) ────────────────────────────────────
  let fields = {};
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      fields = await request.json();
    } else {
      const text = await request.text();
      for (const [k, v] of new URLSearchParams(text)) fields[k] = v;
    }
  } catch {
    return jsonError(400, 'Could not parse request body');
  }

  const {
    first_name, last_name, email, phone,
    program_of_interest, sms_consent,
    // optional extras from town landing pages
    source_town, utm_source, utm_medium, utm_campaign,
  } = fields;

  // ── Validate ──────────────────────────────────────────────────────────────
  if (!first_name || !last_name || !email || !phone) {
    return jsonError(400, 'Missing required fields: first_name, last_name, email, phone');
  }
  if (sms_consent !== 'yes') {
    return jsonError(400, 'SMS consent is required');
  }

  // ── Normalize phone to E.164 ──────────────────────────────────────────────
  const digits = phone.replace(/\D/g, '');
  const e164   = digits.startsWith('1') ? `+${digits}` : `+1${digits}`;

  // ── Build marketing source string ─────────────────────────────────────────
  let marketingSource = utm_source || 'website';
  if (source_town) marketingSource = `town-page-${source_town}`;
  if (utm_campaign) marketingSource += ` / ${utm_campaign}`;

  // ── Check for duplicate (same phone, last 30 days) ────────────────────────
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const dupResp = await sbFetch(
    `/leads?phone=eq.${encodeURIComponent(e164)}&created_at=gte.${thirtyDaysAgo}&select=id,funnel_stage&limit=1`
  );
  const dups = await dupResp.json();
  if (Array.isArray(dups) && dups.length > 0) {
    // Lead already exists — still fire follow-up for re-engagement but don't create duplicate
    console.log(`Duplicate lead detected: ${e164}, existing id: ${dups[0].id}`);
    await fireFollowUp(dups[0].id, 'resubmit');
    return jsonOk({ ok: true, duplicate: true, lead_id: dups[0].id });
  }

  // ── Insert lead into Supabase ─────────────────────────────────────────────
  const now = new Date().toISOString();
  const leadPayload = {
    first_name:          first_name.trim(),
    last_name:           last_name.trim(),
    full_name:           `${first_name.trim()} ${last_name.trim()}`,
    email:               email.trim().toLowerCase(),
    phone:               e164,
    program_of_interest: program_of_interest || null,
    marketing_source:    marketingSource,
    source:              utm_source || 'website',
    ad_campaign:         utm_campaign || null,
    funnel_stage:        'New Lead',
    contact_type:        'lead',
    claimed_trial:       true,
    attended:            false,
    ai_paused:           false,
    tags:                program_of_interest ? `trial,${program_of_interest.toLowerCase().replace(/\s+/g, '-')}` : 'trial',
    date_entered:        now.slice(0, 10),
    created_at:          now,
    updated_at:          now,
  };

  const insertResp = await sbFetch('/leads', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body:    JSON.stringify(leadPayload),
  });
  const insertData = await insertResp.json();

  if (!insertResp.ok) {
    console.error('Supabase insert failed:', JSON.stringify(insertData));
    return jsonError(500, `Failed to save lead: ${JSON.stringify(insertData)}`);
  }

  const lead = Array.isArray(insertData) ? insertData[0] : insertData;
  if (!lead?.id) {
    return jsonError(500, 'Lead inserted but no ID returned');
  }

  // ── Fire AI follow-up funnel ──────────────────────────────────────────────
  await fireFollowUp(lead.id, 'new_lead');

  return jsonOk({ ok: true, lead_id: lead.id });
};

// ── Fire follow-up via command center ─────────────────────────────────────────
async function fireFollowUp(leadId, mode = 'new_lead') {
  try {
    const resp = await fetch(`${CC_URL}/api/ai-followup`, {
      method:  'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-internal-key':  INTERNAL_SECRET,
      },
      body: JSON.stringify({ lead_id: leadId, mode }),
    });
    if (!resp.ok) {
      const txt = await resp.text();
      console.warn(`ai-followup returned ${resp.status}: ${txt}`);
    }
  } catch (e) {
    // Don't fail the whole request if follow-up has a network hiccup
    console.warn('ai-followup fire failed:', e.message);
  }
}

// ── Supabase helper ───────────────────────────────────────────────────────────
async function sbFetch(path, opts = {}) {
  const fullUrl = `${SUPABASE_URL}/rest/v1${path}`;
  const headers = {
    apikey:        SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    ...(opts.headers || {}),
  };
  return fetch(fullUrl, { ...opts, headers });
}

// ── Response helpers ──────────────────────────────────────────────────────────
function cors() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
function jsonOk(data) {
  return new Response(JSON.stringify(data), {
    status:  200,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}
function jsonError(status, message) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

export const config = { path: '/api/lead-capture' };
