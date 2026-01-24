# Vercel Environment Variables Template
# Copy this to Vercel Dashboard → Settings → Environment Variables

# ============================================
# Firebase Configuration (Public Variables)
# ============================================

# Your Firebase API Key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key

# Your Firebase Auth Domain
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

# Your Firebase Project ID
NEXT_PUBLIC_FIREBASE_PROJECT_ID=warehouse-simulation-89d63

# Your Firebase Storage Bucket
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com

# Your Firebase Messaging Sender ID
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

# Your Firebase App ID
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ============================================
# Application Configuration
# ============================================

# Your Vercel deployment URL (will be auto-assigned)
# Update this after deployment
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app

# ============================================
# Firebase Admin SDK (Secret Variables - Server-side only)
# Mark these as "Secret" in Vercel Dashboard
# ============================================

# Firebase Admin Service Account Email
# From: Firebase Console → Settings → Service Accounts → Generate Private Key (JSON)
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com

# Firebase Admin Private Key
# From: Firebase Console → Settings → Service Accounts → Generate Private Key (JSON)
# Important: Keep the full key including \n line breaks
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...[FULL KEY HERE]\n-----END PRIVATE KEY-----\n"

# ============================================
# How to Get These Values
# ============================================

# 1. Firebase API Key & Other Config:
#    a. Go to Firebase Console (https://console.firebase.google.com)
#    b. Select your project
#    c. Click Settings ⚙️ → Project Settings
#    d. Go to "General" tab
#    e. Scroll down to find Firebase SDK snippet
#    f. Copy the values from the config object

# 2. Firebase Admin Credentials:
#    a. Go to Firebase Console
#    b. Click Settings ⚙️ → Service Accounts
#    c. Click "Generate New Private Key"
#    d. Download JSON file
#    e. Open JSON file and copy:
#       - client_email → FIREBASE_ADMIN_CLIENT_EMAIL
#       - private_key → FIREBASE_ADMIN_PRIVATE_KEY (with \n preserved)

# 3. After Deployment:
#    a. Deploy to Vercel first
#    b. Copy your Vercel URL (e.g., https://warehouse-stock.vercel.app)
#    c. Update NEXT_PUBLIC_APP_URL with that URL
#    d. Redeploy

# ============================================
# Adding to Vercel
# ============================================

# 1. Go to Vercel Dashboard (https://vercel.com/dashboard)
# 2. Select your project
# 3. Click "Settings" → "Environment Variables"
# 4. For each variable:
#    - If it starts with "NEXT_PUBLIC_" → Mark as "Public"
#    - If it's "FIREBASE_ADMIN_*" → Mark as "Secret"
#    - Add value
#    - Select which environments: Production, Preview, Development
# 5. Click "Save"
# 6. Trigger a new deployment (push to GitHub)

# ============================================
# Important Notes
# ============================================

# - NEVER commit this file with real values to GitHub
# - NEVER hardcode secrets in your code
# - Always use Vercel's Environment Variables section
# - Use "Secret" for sensitive data (won't be exposed in browser)
# - Use "Public" only for data that's safe to be visible
# - Redeploy after adding/changing environment variables
