#!/bin/bash
# setup-env.sh
# Copies Supabase keys from the command center to allstarbjj-site, then deploys.
# Run from ~/allstarbjj-site: sh setup-env.sh

set -e
echo ""
echo "=== AllStar BJJ Site — Env Setup ==="
echo ""

# Step 1: Get keys from command center (already linked to Netlify)
echo "Fetching credentials from command center..."
cd ~/allstarbjj-command-center

SUPABASE_URL=$(netlify env:get SUPABASE_URL 2>/dev/null | tr -d '[:space:]')
SUPABASE_KEY=$(netlify env:get SUPABASE_SERVICE_KEY 2>/dev/null | tr -d '[:space:]')

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
  echo "ERROR: Could not read env vars from command center."
  echo "Make sure you are logged in: netlify login"
  exit 1
fi

echo "  Got SUPABASE_URL: ${SUPABASE_URL:0:35}..."
echo "  Got SUPABASE_SERVICE_KEY: ${SUPABASE_KEY:0:20}..."
echo ""

# Step 2: Set env vars on allstarbjj-site
echo "Setting env vars on allstarbjj-site..."
cd ~/allstarbjj-site

netlify env:set SUPABASE_URL "$SUPABASE_URL"
netlify env:set SUPABASE_SERVICE_KEY "$SUPABASE_KEY"
netlify env:set COMMAND_CENTER_URL "https://jovial-crostata-5c5080.netlify.app"
netlify env:set INTERNAL_API_SECRET "allstar2026"

echo ""
echo "All env vars set. Deploying to production..."
echo ""

# Step 3: Deploy
netlify deploy --prod

echo ""
echo "Done! Test by submitting the form on your site."
