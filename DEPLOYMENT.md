# 🚀 Deployment Guide Quick Links

This project is configured for **Vercel** deployment with a complete Next.js setup.

## 📚 Available Guides

### For Windows Users (Easy Start)
```bash
# Run this file to prepare for deployment:
VERCEL_DEPLOYMENT_SETUP.bat
```

### Comprehensive Guides
1. **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** ⭐ START HERE
   - Complete step-by-step deployment guide
   - Environment variables setup
   - Firebase configuration
   - Troubleshooting & security

2. **[VERCEL_ENV_TEMPLATE.md](./VERCEL_ENV_TEMPLATE.md)**
   - Environment variables reference
   - How to get Firebase credentials
   - What values to use for each variable

3. **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**
   - Firebase authentication setup
   - Firestore database configuration
   - Storage bucket setup

## 🏃 Quick Start (5 Minutes)

### 1️⃣ Verify Local Setup
```bash
npm install
npm run build
npm run dev
```

### 2️⃣ Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 3️⃣ Deploy on Vercel
- Go to [https://vercel.com/new](https://vercel.com/new)
- Select your GitHub repository
- Add environment variables (see [VERCEL_ENV_TEMPLATE.md](./VERCEL_ENV_TEMPLATE.md))
- Click "Deploy"

### 4️⃣ Verify Deployment
- Open your Vercel URL
- Go to `/firebase-test` to verify Firebase
- Test registration and login

## 📋 Configuration Files

### vercel.json
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev"
}
```

This file is already configured with:
- ✅ Correct build and dev commands
- ✅ Environment variable references
- ✅ Next.js auto-detection
- ✅ Optimal region selection

## 🔐 Environment Variables

| Variable | Type | Required |
|----------|------|----------|
| NEXT_PUBLIC_FIREBASE_API_KEY | Public | ✅ |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Public | ✅ |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Public | ✅ |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Public | ✅ |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Public | ✅ |
| NEXT_PUBLIC_FIREBASE_APP_ID | Public | ✅ |
| NEXT_PUBLIC_APP_URL | Public | ✅ |
| FIREBASE_ADMIN_CLIENT_EMAIL | Secret | ✅ |
| FIREBASE_ADMIN_PRIVATE_KEY | Secret | ✅ |

**Note:** Mark Firebase Admin credentials as "Secret" in Vercel Dashboard

## ✅ Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Local build succeeds: `npm run build`
- [ ] App runs locally: `npm run dev`
- [ ] Code pushed to GitHub
- [ ] Firebase project created: `warehouse-simulation-89d63`
- [ ] Firebase credentials ready
- [ ] Vercel account created
- [ ] Environment variables prepared

## 🚀 Deployment Commands

```bash
# Build locally to verify
npm run build

# Preview build locally
npm run start

# Deploy is automatic - just push to GitHub!
git push origin main
```

## 📊 After Deployment

### Monitor Your App
1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **View Deployments:** See all your deployment history
3. **Monitor Analytics:** Track user activity and performance
4. **View Logs:** Debug deployment issues

### Test Your App
1. Open deployment URL
2. Go to `/firebase-test`
3. Verify: ✅ Authentication ✅ Firestore ✅ Storage
4. Test registration and login

### Update Your App
```bash
# Make changes
git add .
git commit -m "Update description"
git push origin main

# Vercel automatically deploys! No extra commands needed
```

## 🎯 Common Next Steps

### Add Custom Domain
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update `NEXT_PUBLIC_APP_URL` in environment variables
4. Redeploy

### Enable Analytics
1. Vercel Dashboard → Your Project → Analytics
2. Enable Web Analytics (included free)
3. View real-time user data

### Set Up Staging Environment
1. Create `staging` branch: `git checkout -b staging`
2. Configure in Vercel to auto-deploy staging branch
3. Test features before merging to main

## 🐛 Troubleshooting

### "Module not found" error during build
- Check package.json has all dependencies
- Run `npm install` locally
- Try rebuilding locally first

### Firebase connection errors
- Verify environment variables are set
- Check Firebase Console for enabled services
- See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### "Permission denied" in Firestore
- Ensure database is created in "test mode"
- Or update security rules
- Temporarily use test mode for quick setup

### Deploy stuck or timing out
- Check Vercel build logs
- Look for errors in "Build" tab
- May need to increase timeouts or split functions

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Guide:** https://nextjs.org/docs/deployment
- **Firebase Guide:** https://firebase.google.com/docs
- **Project README:** [README.md](./README.md)

---

## 🎉 You're All Set!

Your project is ready for production deployment. Start with [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

**Happy Deploying! 🚀**
