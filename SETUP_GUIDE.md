# 🚀 Complete Firebase Setup Guide - Step by Step

## ⚠️ IMPORTANT: You Cannot Login/Register Until Firebase is Configured

Your app is ready, but Firebase services need to be enabled in the Firebase Console.

---

## 📋 Pre-Setup Checklist

Before you start, make sure you have:
- ✅ Internet connection
- ✅ Google account with access to Firebase
- ✅ Project ID: `warehouse-simulation-89d63`

---

## 🔧 Step-by-Step Setup

### Step 1: Open Firebase Console

1. Open your browser
2. Go to: **https://console.firebase.google.com/**
3. Sign in with your Google account
4. You should see your project: **warehouse-simulation-89d63**
5. Click on it to open

---

### Step 2: Enable Authentication

**Why?** Without this, users cannot register or login.

1. In the left sidebar, click **"Authentication"**
2. If you see "Get Started", click it
3. Click on the **"Sign-in method"** tab at the top
4. In the list of providers, find **"Email/Password"**
5. Click on **"Email/Password"** (the entire row)
6. A dialog will open
7. Toggle the **first switch** (Email/Password) to **ON**
8. Ignore the second option (Email link - passwordless sign-in)
9. Click **"Save"**
10. You should see "Email/Password" as "Enabled"

**✅ Done!** Authentication is now enabled.

---

### Step 3: Enable Firestore Database

**Why?** This is where user data, items, and tasks are stored.

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"** button
3. A dialog appears:
   - **Step 1:** Choose "Start in **test mode**" (we'll add security later)
   - Click **"Next"**
   - **Step 2:** Choose location closest to you:
     - `us-central` (United States)
     - `europe-west` (Europe)
     - `asia-southeast1` (Asia)
   - Click **"Enable"**
4. Wait 1-2 minutes for the database to be created
5. You'll see the Firestore console with an empty database

**✅ Done!** Firestore is now enabled.

---

### Step 4: Enable Storage (Optional but Recommended)

**Why?** For uploading item images and documents.

1. In the left sidebar, click **"Storage"**
2. Click **"Get started"**
3. Dialog appears:
   - **Step 1:** Choose "Start in **test mode**"
   - Click **"Next"**
   - **Step 2:** Location (use same as Firestore)
   - Click **"Done"**
4. Wait for storage to be enabled

**✅ Done!** Storage is now enabled.

---

### Step 5: Verify Your Setup

**Test Connection Page:**
1. Go to: **http://localhost:3001/firebase-test**
2. You should see:
   - ✅ Authentication SDK loaded
   - ✅ Firestore connected successfully
3. If you see ❌ errors, recheck the steps above

**OR Manually Verify:**
1. Go back to Firebase Console
2. Check these are all created/enabled:
   - **Authentication** → Sign-in method → Email/Password = Enabled
   - **Firestore Database** → Data tab shows database (even if empty)
   - **Storage** → Files tab shows storage (even if empty)

---

## 🎉 You're Ready! Now Create Your First User

### Method 1: Register via the App (Recommended)

1. Go to: **http://localhost:3001/register**
2. Fill in the form:
   - **First Name:** Your name
   - **Last Name:** Your surname
   - **Email:** Your email address
   - **Password:** At least 6 characters
   - **Role:** Select **"Admin"** (for your first account)
3. Click **"Create Account"**
4. You'll be redirected to the admin dashboard

### Method 2: Create Manually in Firebase Console

If registration still fails, create manually:

**Create Auth User:**
1. Go to: **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter email and password (minimum 6 characters)
4. Click **"Add user"**
5. **Copy the UID** (you'll need it)

**Create Firestore User Document:**
1. Go to: **Firestore Database**
2. Click **"Start collection"**
3. Collection ID: `users` (exactly as shown)
4. Click **"Next"**
5. Document ID: Paste the **UID you copied**
6. Add these fields (click "Add field" for each):

   | Field Name | Type | Value |
   |------------|------|-------|
   | `email` | string | your email address |
   | `firstName` | string | Your First Name |
   | `lastName` | string | Your Last Name |
   | `role` | string | `admin` |
   | `isActive` | boolean | `true` |
   | `createdAt` | timestamp | Click "Set to current time" |
   | `updatedAt` | timestamp | Click "Set to current time" |

7. Click **"Save"**

**Now Login:**
1. Go to: **http://localhost:3001/login**
2. Enter your email and password
3. Click **"Sign In"**
4. You should be logged in!

---

## 🐛 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Authentication is not enabled
- Go back to Step 2

### "Failed to get document because the client is offline"
- Firestore is not enabled
- Go back to Step 3

### "Permission denied"
- Make sure you created the database in "test mode"
- Or check Firestore Rules in Firebase Console

### Still Having Issues?
1. **Clear browser cache:** Press Ctrl+Shift+R
2. **Check browser console:** Press F12, look for errors in Console tab
3. **Restart dev server:** 
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```
4. **Verify internet connection:** Make sure you can access firebase.google.com

---

## 📚 Next Steps After Setup

Once you can login:

1. **Explore Admin Dashboard**
   - View at: `/admin/dashboard`
   - Create items, tasks, view reports

2. **Create Items**
   - Items page (coming soon)
   - Add warehouse inventory items

3. **Create Tasks**
   - Tasks page (coming soon)
   - Assign stock-taking tasks

4. **Invite Auditors**
   - Register additional users with "Auditor" role
   - They'll have access to auditor dashboard

---

## 📞 Need Help?

- Check the main `README.md` for architecture details
- Check `FIREBASE_SETUP.md` for more troubleshooting
- Test connection at: **http://localhost:3001/firebase-test**

---

**You're all set! Happy coding! 🎉**
