@echo off
title RAKAN • Publish Assistant
cd /d "%~dp0"

echo.
echo ==============================
echo   RAKAN • PUBLISH ASSISTANT
echo ==============================
echo.

echo [1/5] Build website...
call npm run build
if errorlevel 1 (
    echo.
    echo BUILD GAGAL. Perbaiki dulu.
    pause
    exit /b
)

echo.
echo [2/5] Git add...
git add .

echo.
set /p MSG=Judul commit: 

echo.
echo [3/5] Git commit...
git commit -m "%MSG%"

echo.
echo [4/5] Git push...
git push origin main
if errorlevel 1 (
    echo.
    echo Git push gagal.
    pause
    exit /b
)

echo.
echo [5/5] Deploy Cloudflare...
call npx wrangler deploy
if errorlevel 1 (
    echo.
    echo Deploy gagal.
    pause
    exit /b
)

echo.
echo ==============================
echo      PUBLISH BERHASIL
echo ==============================
echo.
pause