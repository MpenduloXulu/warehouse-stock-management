@echo off
REM Warehouse Stock Management - Vercel Deployment Quick Start (Windows)

setlocal enabledelayedexpansion

cls
echo.
echo ============================================================
echo  ^^ Warehouse Stock Management - Vercel Deployment Setup
echo ============================================================
echo.

REM Check Git
echo Checking prerequisites...
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Git is installed
) else (
    echo [ERROR] Git is not installed - Please install from https://git-scm.com
    pause
    exit /b 1
)

REM Check Node
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js is installed
    node --version
) else (
    echo [ERROR] Node.js is not installed - Please install from https://nodejs.org
    pause
    exit /b 1
)

echo.
echo ============================================================
echo  STEP 1: Verify Local Setup
echo ============================================================
echo.

echo Running: npm install
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
)

echo.
echo Running: npm run build
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed - Fix errors before deploying
    pause
    exit /b 1
)

echo.
echo [OK] Local build successful!
echo.

echo ============================================================
echo  STEP 2: Git Setup
echo ============================================================
echo.

REM Check if git repo exists
git rev-parse --git-dir >nul 2>&1
if %errorlevel% neq 0 (
    echo Git repository not found. Initializing...
    git init
    echo [OK] Git repository initialized
) else (
    echo [OK] Git repository already exists
)

echo.
echo Checking .gitignore...
findstr /M ".env.local" .gitignore >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] .env.local not found in .gitignore
    echo Please add this line to .gitignore:
    echo   .env.local
    echo   .env.*.local
)

echo.
echo Current git status:
git status --short

echo.
REM Ask user if ready to commit
set /p commit="Ready to commit all changes? (y/n): "
if /i "%commit%"=="y" (
    git add .
    set /p message="Enter commit message (default: Initial commit): "
    if "!message!"=="" set message=Initial commit
    git commit -m "!message!"
    echo [OK] Changes committed
) else (
    echo Skipping commit...
)

echo.
echo ============================================================
echo  STEP 3: Next Steps - Deploy to Vercel
echo ============================================================
echo.

echo Your project is now ready to deploy!
echo.
echo INSTRUCTIONS:
echo.
echo 1. Go to https://vercel.com/signup
echo    - Sign up with your GitHub account
echo.
echo 2. Go to https://vercel.com/new
echo    - Select "Import Git Repository"
echo    - Paste your GitHub repo URL
echo    - Vercel will auto-detect Next.js
echo.
echo 3. In the configuration screen:
echo    - Project name: warehouse-stock-management
echo    - Framework: Next.js (pre-selected)
echo    - Environment Variables: Set your Firebase credentials
echo      * NEXT_PUBLIC_FIREBASE_API_KEY
echo      * NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
echo      * NEXT_PUBLIC_FIREBASE_PROJECT_ID
echo      * NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
echo      * NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
echo      * NEXT_PUBLIC_FIREBASE_APP_ID
echo      * NEXT_PUBLIC_APP_URL (after first deploy)
echo      * FIREBASE_ADMIN_CLIENT_EMAIL (mark as Secret)
echo      * FIREBASE_ADMIN_PRIVATE_KEY (mark as Secret)
echo.
echo 4. Click "Deploy"
echo    - Wait 2-3 minutes for build to complete
echo    - Click "Visit" to open your app
echo.
echo 5. Verify deployment:
echo    - Go to /firebase-test
echo    - Check all Firebase services show checkmarks
echo    - Try registering and logging in
echo.
echo ============================================================
echo  HELPFUL FILES
echo ============================================================
echo.
echo - VERCEL_DEPLOYMENT.md          : Complete setup guide
echo - VERCEL_ENV_TEMPLATE.md        : Environment variables reference
echo - FIREBASE_SETUP.md             : Firebase configuration guide
echo - README.md                     : Project overview
echo.
echo ============================================================
echo.

pause
