# 🚀 Vercel Deployment Guide - Complete Setup

## Overview
This guide will help you deploy your Warehouse Stock Management System to Vercel in minutes.

---

## ✅ Prerequisites

Before deploying, ensure you have:
- ✅ A GitHub account (or GitLab/Bitbucket)
- ✅ A Vercel account (free tier available)
- ✅ Your Firebase project credentials
- ✅ Git installed on your local machine

---

## 🔧 Step 1: Prepare Your Project

### 1.1 Push Project to GitHub

First, push your project to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - warehouse management system"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/warehouse-stock-management.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📋 Step 2: Set Up Vercel Project

### 2.1 Create Vercel Account

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (recommended) or email
3. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Select **Import Git Repository**
3. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/warehouse-stock-management`
4. Click **Continue**
5. Vercel will auto-detect it's a Next.js project ✓

---

## 🔐 Step 3: Configure Environment Variables

### 3.1 Get Firebase Credentials

Before adding environment variables, gather your Firebase config:

1. Go to **Firebase Console**: [https://console.firebase.google.com](https://console.firebase.google.com)
2. Select your project: `warehouse-simulation-89d63`
3. Click **Settings ⚙️** → **Project Settings**
4. Go to **General** tab
5. Scroll down to find your Firebase Config:

```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 3.2 Get Firebase Admin Credentials

1. In Firebase Console, go to **Settings ⚙️** → **Service Accounts**
2. Click **Generate New Private Key**
3. Download the JSON file
4. Open it and copy:
   - `client_email`
   - `private_key` (keep the entire multi-line key including `\n`)

### 3.3 Add Environment Variables to Vercel

In the Vercel deployment page, under **Environment Variables**, add these:

| Variable Name | Value | Type |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | (from Step 3.1) | Public |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | (from Step 3.1) | Public |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `warehouse-simulation-89d63` | Public |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | (from Step 3.1) | Public |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | (from Step 3.1) | Public |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | (from Step 3.1) | Public |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Public |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | (from Step 3.2) | Secret |
| `FIREBASE_ADMIN_PRIVATE_KEY` | (from Step 3.2) | Secret |

**Important:** 
- Mark Firebase Admin credentials as **Secret** (they won't be exposed in browser)
- Public variables are safe to be visible in client-side code

---

## 🚀 Step 4: Deploy

### 4.1 Initial Deployment

1. After adding all environment variables, click **Deploy**
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Deploy to production
3. Wait for the build to complete (~2-3 minutes)

### 4.2 Monitor Deployment

1. You can watch the deployment logs in real-time
2. Once complete, you'll see: **"Deployment Complete"** ✓
3. Click the **Visit** button to see your live app

---

## ✅ Step 5: Verify Your Deployment

### 5.1 Test the App

1. Open your Vercel deployment URL: `https://your-project.vercel.app`
2. Go to `/firebase-test` page to verify Firebase connection
3. Try the **Register** page to create an account
4. Login with your credentials

### 5.2 Enable Firebase Services

**Important:** Make sure Firebase services are enabled in your Firebase Console:

1. **Authentication** → Enable Email/Password
2. **Firestore Database** → Create database in test mode
3. **Storage** → Enable storage in test mode

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed steps.

---

## 🔄 Step 6: Set Up Custom Domain (Optional)

### 6.1 Add Custom Domain

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain (e.g., `warehouse.yourdomain.com`)
5. Follow the DNS configuration instructions
6. Update `NEXT_PUBLIC_APP_URL` environment variable to your domain

---

## 📝 Step 7: Continuous Deployment Setup

Your project is now set up for **automatic deployments**:

- **Production**: Deploy when you push to `main` branch
- **Preview**: Deploy when you create a pull request (auto-generated preview URL)
- **Staging**: Deploy to a staging environment (optional)

### 7.1 Deploy Updates

To deploy new changes:

```bash
# Make changes to your code
# Commit changes
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin main

# Vercel automatically deploys!
```

---

## 🐛 Troubleshooting

### Issue: "Firebase: Error (auth/configuration-not-found)"
- **Solution**: Firebase Authentication is not enabled
- Go to Firebase Console → Authentication → Enable Email/Password
- Rebuild and redeploy on Vercel

### Issue: "Failed to get document because the client is offline"
- **Solution**: Firestore Database not enabled
- Go to Firebase Console → Firestore Database → Create Database
- Choose "Start in test mode"

### Issue: "Permission denied" errors
- **Solution**: Firestore Security Rules not set
- Option 1: Use "test mode" in Firebase (allows all reads/writes temporarily)
- Option 2: Update security rules (see FIRESTORE.rules in project)

### Issue: Build fails with "Module not found"
- **Solution**: Missing dependencies
- Check `package.json` has all dependencies
- Redeploy: Vercel will retry the build

### Issue: Environment variables not working
- **Solution**: They might not be applied
- In Vercel Dashboard:
  1. Go to Settings → Environment Variables
  2. Click the variable and click "⋮" → Edit
  3. Verify it's correct
  4. Trigger a new deployment (Push to GitHub)

---

## 🎯 Post-Deployment Checklist

- [ ] Deployment URL is working
- [ ] Firebase test page shows ✓ for all services
- [ ] Can register a new account
- [ ] Can login successfully
- [ ] Can create items and tasks
- [ ] Can view admin dashboard
- [ ] Custom domain configured (if needed)
- [ ] Production environment variables are set
- [ ] Monitoring/Analytics enabled in Vercel

---

## 📊 Monitoring & Analytics

### View Deployment Metrics

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. View **Analytics**, **Logs**, **Performance**

### Enable Real User Monitoring

1. In Vercel, go to **Settings** → **Analytics**
2. Enable **Web Analytics** (free tier included)
3. View real-time user analytics

---

## 🔐 Security Best Practices

### 1. Protect Sensitive Data
- ✅ Always use "Secret" for Firebase Admin credentials
- ✅ Never commit `.env.local` to git
- ✅ Review `vercel.json` - don't hardcode secrets

### 2. Enable HTTPS
- ✅ Vercel automatically provides HTTPS
- ✅ All connections are encrypted

### 3. Firebase Security Rules
- ⚠️ Test mode (current) allows all access
- 🔒 Update rules before production (see `firestore.rules`)

### 4. IP Allowlisting (Enterprise)
- Available in Vercel Pro/Enterprise
- Configure trusted IPs for added security

---

## 💰 Pricing & Limits

### Vercel Free Tier
- **Serverless Functions**: 100GB-hrs/month
- **Bandwidth**: 100GB/month
- **Build minutes**: 6,000 minutes/month
- **Deployments**: Unlimited

### When to Upgrade
- Exceeding bandwidth limits
- Need priority support
- Need IP allowlisting
- Custom analytics

---

## 🚀 Advanced Deployment Options

### Option 1: Staging Environment
Create a staging deployment for testing before production:

```bash
# Create staging branch
git checkout -b staging

# Make changes and commit
git push origin staging

# Add to Vercel:
# Dashboard → Settings → Git → Auto-deploy Branches
# Add "staging" to staging branch
```

### Option 2: Preview Deployments
Every pull request gets a preview URL automatically! Perfect for code reviews.

### Option 3: Environment-Specific Variables
Set different variables for production vs staging in Vercel Dashboard.

---

## 📞 Getting Help

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Firebase Deployment Guide](https://firebase.google.com/docs/hosting/deploy)
- [Project README](./README.md)
- [Firebase Setup Guide](./FIREBASE_SETUP.md)

### Common Issues Repo
Check [Troubleshooting](#-troubleshooting) section above first.

---

## 🎉 You're Deployed!

Congratulations! Your Warehouse Stock Management System is now live on Vercel!

**Next Steps:**
1. ✅ Verify everything works
2. ✅ Share the URL with your team
3. ✅ Monitor performance on Vercel Dashboard
4. ✅ Plan future features and updates
5. ✅ Set up backup and disaster recovery

---

**Last Updated:** January 24, 2026
**Project:** Warehouse Stock Management System
**Deployment Platform:** Vercel
