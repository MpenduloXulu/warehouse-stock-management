# Firebase Setup Instructions

## ⚠️ Important: Enable Authentication First!

You're seeing the error `Firebase: Error (auth/configuration-not-found)` because Email/Password authentication needs to be enabled in the Firebase Console.

## Step-by-Step Setup:

### 1. Enable Email/Password Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **warehouse-simulation-89d63**
3. Click on **"Authentication"** in the left sidebar
4. Click on **"Get Started"** (if you see it)
5. Go to the **"Sign-in method"** tab
6. Click on **"Email/Password"**
7. **Enable** the first toggle (Email/Password)
8. Click **"Save"**

### 2. Create Firestore Database

1. In Firebase Console, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules later)
4. Select a location (closest to your users)
5. Click **"Enable"**

### 3. Enable Storage

1. In Firebase Console, click **"Storage"**
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Next"** and then **"Done"**

### 4. Deploy Security Rules (After databases are created)

Once Firestore and Storage are enabled, deploy the security rules:

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# When prompted:
# - Select "Firestore" and "Storage"
# - Use existing project: warehouse-simulation-89d63
# - Accept default file names (firestore.rules and storage.rules)
# - Don't overwrite the existing rules files

# Deploy the rules
firebase deploy --only firestore:rules,storage:rules
```

### 5. Try Again

After enabling authentication, refresh your app and try to register:

1. Go to http://localhost:3001/register
2. Fill in your details:
   - First Name: Your name
   - Last Name: Your last name
   - Email: Your email
   - Password: At least 6 characters
   - Role: Admin (for first user)
3. Click "Create Account"

## Quick Test

You can also test authentication directly from Firebase Console:
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Click "Add user"

Then manually add the user document in Firestore:
1. Go to Firestore Database
2. Create collection: `users`
3. Document ID: (use the UID from Authentication)
4. Add fields:
   - email: (string) your email
   - firstName: (string) your first name
   - lastName: (string) your last name
   - role: (string) "admin"
   - isActive: (boolean) true
   - createdAt: (timestamp) now
   - updatedAt: (timestamp) now

## Troubleshooting

### Error: "Failed to get document because the client is offline"

This error means Firestore can't connect. Here's how to fix it:

**Step 1: Enable Firestore Database**
1. Go to [Firebase Console](https://console.firebase.google.com/project/warehouse-simulation-89d63/firestore)
2. Click **"Create database"** if you haven't already
3. Select **"Start in test mode"** (we'll add security later)
4. Choose your location (e.g., us-central)
5. Click **"Enable"**

**Step 2: Verify Your Internet Connection**
- Make sure you have a stable internet connection
- Try accessing https://firebase.google.com/ to verify

**Step 3: Check Browser Console**
1. Press **F12** to open Developer Tools
2. Go to the **Console** tab
3. Look for any red error messages
4. Share these if you need more help

### Error: "Firebase: Error (auth/configuration-not-found)"

**Enable Authentication:**
1. Go to [Firebase Console - Authentication](https://console.firebase.google.com/project/warehouse-simulation-89d63/authentication)
2. Click **"Get Started"** (if shown)
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **Enable** to ON
6. Click **"Save"**

### Still seeing errors?

1. **Clear browser cache** and reload (Ctrl+Shift+R)
2. **Check Firebase Console** - Make sure all services are enabled
3. **Restart dev server**: Stop the terminal (Ctrl+C) and run `npm run dev` again
4. **Check network tab** in browser DevTools (F12) for failed requests

### Verify Your Setup Checklist

Go to [Firebase Console](https://console.firebase.google.com/project/warehouse-simulation-89d63) and confirm:

- ✅ **Authentication** > Sign-in method > Email/Password is **ENABLED**
- ✅ **Firestore Database** exists (not just Realtime Database)
- ✅ **Storage** is enabled
- ✅ Internet connection is working
- ✅ No ad-blockers blocking Firebase connections

### Create First User Manually (If Needed)

If registration still doesn't work, create a user manually:

1. **Create Auth User:**
   - Go to Authentication > Users
   - Click "Add user"
   - Email: your email
   - Password: your password
   - Copy the UID

2. **Create Firestore Document:**
   - Go to Firestore Database
   - Click "Start collection"
   - Collection ID: `users`
   - Document ID: (paste the UID from step 1)
   - Add fields:
     - `email` (string): your email
     - `firstName` (string): Your First Name
     - `lastName` (string): Your Last Name  
     - `role` (string): admin
     - `isActive` (boolean): true
     - `createdAt` (timestamp): (click "Set to current time")
     - `updatedAt` (timestamp): (click "Set to current time")
   - Click "Save"

3. **Login:**
   - Now try logging in with your email and password

---

After completing these steps, your authentication should work! 🎉
