#!/bin/bash
# Vercel Deployment Quick Start Checklist

echo "🚀 Warehouse Stock Management - Vercel Deployment Checklist"
echo "=========================================================="
echo ""

# Step 1: Check Prerequisites
echo "📋 STEP 1: Checking Prerequisites..."
echo ""

if command -v git &> /dev/null; then
    echo "✅ Git is installed"
else
    echo "❌ Git is NOT installed - Please install Git"
fi

if command -v npm &> /dev/null; then
    echo "✅ Node.js and npm are installed"
    npm --version
else
    echo "❌ Node.js and npm are NOT installed"
fi

echo ""
echo "=========================================================="
echo "📝 STEP 2: Pre-Deployment Checklist"
echo "=========================================================="
echo ""

echo "Before pushing to GitHub and deploying to Vercel:"
echo ""
echo "1. Project Setup:"
echo "   [ ] Verify app runs locally: npm run dev"
echo "   [ ] All dependencies installed: npm install"
echo "   [ ] Build succeeds: npm run build"
echo ""

echo "2. Firebase Setup:"
echo "   [ ] Firebase project exists: warehouse-simulation-89d63"
echo "   [ ] Authentication enabled (Email/Password)"
echo "   [ ] Firestore Database created in test mode"
echo "   [ ] Storage bucket enabled"
echo ""

echo "3. Code Repository:"
echo "   [ ] Git repository initialized: git init"
echo "   [ ] .env.local is in .gitignore"
echo "   [ ] All code committed: git add . && git commit"
echo "   [ ] Repository pushed to GitHub"
echo ""

echo "4. Environment Variables Ready:"
echo "   [ ] Firebase API Key copied"
echo "   [ ] Firebase Auth Domain copied"
echo "   [ ] Firebase Project ID: warehouse-simulation-89d63"
echo "   [ ] Firebase Storage Bucket copied"
echo "   [ ] Firebase Messaging Sender ID copied"
echo "   [ ] Firebase App ID copied"
echo "   [ ] Firebase Admin Client Email copied"
echo "   [ ] Firebase Admin Private Key copied"
echo ""

echo "=========================================================="
echo "🚀 STEP 3: Deployment Steps"
echo "=========================================================="
echo ""

echo "1. Go to https://vercel.com/signup (sign up if needed)"
echo "   [ ] Create Vercel account (prefer GitHub auth)"
echo ""

echo "2. Import your project:"
echo "   [ ] Go to https://vercel.com/new"
echo "   [ ] Click 'Import Git Repository'"
echo "   [ ] Paste GitHub repo URL"
echo "   [ ] Click 'Continue'"
echo ""

echo "3. Configure project:"
echo "   [ ] Project name: warehouse-stock-management"
echo "   [ ] Framework: Next.js (should be auto-detected)"
echo "   [ ] Root directory: ./ (if using root) or warehouse-stock-management-main"
echo ""

echo "4. Add Environment Variables:"
echo "   [ ] NEXT_PUBLIC_FIREBASE_API_KEY (Public)"
echo "   [ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (Public)"
echo "   [ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID (Public)"
echo "   [ ] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET (Public)"
echo "   [ ] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID (Public)"
echo "   [ ] NEXT_PUBLIC_FIREBASE_APP_ID (Public)"
echo "   [ ] NEXT_PUBLIC_APP_URL (Public) - leave as default for now"
echo "   [ ] FIREBASE_ADMIN_CLIENT_EMAIL (Secret)"
echo "   [ ] FIREBASE_ADMIN_PRIVATE_KEY (Secret)"
echo ""

echo "5. Deploy:"
echo "   [ ] Click 'Deploy'"
echo "   [ ] Wait for build to complete (2-3 minutes)"
echo "   [ ] Click 'Visit' to open deployment"
echo ""

echo "=========================================================="
echo "✅ STEP 4: Post-Deployment Verification"
echo "=========================================================="
echo ""

echo "After deployment completes:"
echo "   [ ] Open your Vercel URL in browser"
echo "   [ ] Go to /firebase-test page"
echo "   [ ] Verify all Firebase services show ✓"
echo "   [ ] Try to register a new account"
echo "   [ ] Login and access dashboard"
echo "   [ ] Create a test item"
echo ""

echo "=========================================================="
echo "🎉 STEP 5: Continuous Deployment Setup (Automatic!)"
echo "=========================================================="
echo ""

echo "Your project is now set up for automatic deployments:"
echo ""
echo "Push to main branch:"
echo "  $ git add ."
echo "  $ git commit -m 'Your message'"
echo "  $ git push origin main"
echo ""
echo "Vercel will automatically:"
echo "  ✅ Pull code from GitHub"
echo "  ✅ Run npm install"
echo "  ✅ Build project (npm run build)"
echo "  ✅ Deploy to production"
echo "  ✅ Show deployment status"
echo ""

echo "=========================================================="
echo "📊 STEP 6: Monitoring"
echo "=========================================================="
echo ""

echo "Monitor your deployment:"
echo "  1. Vercel Dashboard: https://vercel.com/dashboard"
echo "  2. Select your project"
echo "  3. View deployment logs and analytics"
echo "  4. Check performance metrics"
echo ""

echo "=========================================================="
echo "🔐 STEP 7: Security & Custom Domain (Optional)"
echo "=========================================================="
echo ""

echo "After verifying everything works:"
echo "  1. Add custom domain (Vercel Dashboard → Settings → Domains)"
echo "  2. Update NEXT_PUBLIC_APP_URL to your custom domain"
echo "  3. Enable Advanced Security (if available)"
echo "  4. Review Firebase Security Rules before production"
echo ""

echo "=========================================================="
echo "📚 Helpful Resources"
echo "=========================================================="
echo ""

echo "Documentation:"
echo "  • Vercel Deployment: https://vercel.com/docs"
echo "  • Next.js Guide: https://nextjs.org/docs/deployment"
echo "  • Firebase Setup: See FIREBASE_SETUP.md in project"
echo ""

echo "Detailed Guides:"
echo "  • VERCEL_DEPLOYMENT.md - Complete setup guide"
echo "  • VERCEL_ENV_TEMPLATE.md - Environment variables"
echo "  • FIREBASE_SETUP.md - Firebase configuration"
echo ""

echo "=========================================================="
echo ""
echo "Ready to deploy? Follow the steps above!"
echo "For detailed information, see VERCEL_DEPLOYMENT.md"
echo ""
