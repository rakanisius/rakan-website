@echo off
cd /d D:\rakan-website

echo(
echo ==============================
echo   RAKAN • PUBLISH ASSISTANT
echo ==============================
echo(

echo [1/5] Build website...
call npm run build

if errorlevel 1 (
    echo(
    echo BUILD GAGAL. Perbaiki dulu.
    pause
    exit /b
)

echo(
echo [2/5] Git add...
git add .

echo(
echo [3/5] Git commit...
git commit -m "Publish"

echo(
echo [4/5] Git push...
git push origin main

echo(
echo [5/5] Deploy Cloudflare...
call npx wrangler deploy

echo(
echo ==============================
echo   SELESAI DIPUBLISH
echo ==============================
pause