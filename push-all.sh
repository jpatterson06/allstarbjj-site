#!/bin/bash
# push-all.sh
# Commits and pushes both the command center and the site.
# Run once from anywhere: sh ~/allstarbjj-site/push-all.sh

set -e

echo ""
echo "=== Pushing Command Center ==="
cd ~/allstarbjj-command-center
git add netlify/functions/capture-lead.mjs \
        netlify/functions/voice-outbound.mjs \
        netlify/functions/voice-status.mjs \
        netlify/functions/ai-scheduler.mjs
git diff --cached --quiet && echo "  (no changes to commit)" || git commit -m "feat: call-first on new lead, SMS on no-pickup, voicemail detection"
git push origin main
echo "  Done."

echo ""
echo "=== Pushing allstarbjj-site ==="
cd ~/allstarbjj-site
git add netlify/functions/lead-capture.mjs
git diff --cached --quiet && echo "  (no changes to commit)" || git commit -m "feat: simplify lead-capture to zero-credential proxy"
git push origin main
echo "  Done."

echo ""
echo "Both repos pushed. Netlify will auto-build in ~60 seconds."
echo "Watch builds at:"
echo "  https://app.netlify.com/sites/jovial-crostata-5c5080/deploys"
echo ""
