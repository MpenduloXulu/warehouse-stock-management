@echo off
setlocal enabledelayedexpansion

set PROJECT_ID=warehouse-be591
set "PROJECT_PATH=C:\Users\Mpendulo\Downloads\warehouse-stock-management-main\warehouse-stock-management-main"

cd /d "%PROJECT_PATH%"
set PATH=C:\nodejs;%PATH%

echo Installing Firebase CLI globally...
call npm install -g firebase-tools --silent

echo.
echo Firebase CLI installed. Now we need to authenticate...
echo Please login when the browser opens, then come back here.
echo.
pause

call firebase login

echo.
echo Deploying Firestore rules...
call firebase deploy --project %PROJECT_ID% --only firestore:rules

echo.
echo Deploying Storage rules...
call firebase deploy --project %PROJECT_ID% --only storage:rules

echo.
echo Done! Your security rules have been deployed.
pause
