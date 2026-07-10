#!/bin/bash
# Quick Deploy Script — Run this once to deploy AI Overview optimization to Netlify
# Copy-paste entire script or run: bash DEPLOY_NOW.sh

cd ~/allstarbjj-site

echo "🚀 Deploying AI Overview Optimization..."
echo ""

# Stage all AI Overview optimization files
echo "📝 Staging files..."
git add \
  src/components/FAQPageSchema.astro \
  src/components/HowToSchema.astro \
  src/components/VideoSchema.astro \
  src/components/LocalBusinessSchema.astro \
  src/pages/preschool.astro \
  src/pages/cranford.astro \
  src/pages/westfield.astro \
  src/pages/summit.astro \
  src/pages/millburn.astro \
  src/pages/maplewood.astro

if [ $? -ne 0 ]; then
  echo "❌ Failed to stage files"
  exit 1
fi
echo "✓ Files staged"

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "feat: Add AI Overview schema optimization

- Add FAQPageSchema, HowToSchema, VideoSchema components
- Optimize preschool.astro with structured data + improved content
- Add LocalBusiness schema to all location pages
- Update Cubs vs Lions comparison for AI Overview capture
- Enhance heading hierarchy for featured snippets"

if [ $? -ne 0 ]; then
  echo "❌ Failed to commit"
  exit 1
fi
echo "✓ Committed"

# Push
echo ""
echo "🌐 Pushing to Netlify..."
git push origin main

if [ $? -ne 0 ]; then
  echo "❌ Failed to push"
  exit 1
fi

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "Netlify is now building your site..."
echo "Check deployment status: https://app.netlify.com"
echo ""
echo "Deploy typically takes 2-3 minutes."
echo "Live site: https://allstarbjj-new.netlify.app"
echo ""
echo "Next step: Verify schema in 2-3 weeks via Google Search Console"
