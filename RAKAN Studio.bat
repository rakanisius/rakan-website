@echo off
title RAKAN Studio
color 0A

set "PROJECT=D:\rakan-website"

cd /d "%PROJECT%"

echo ============================================
echo          RAKAN STUDIO
echo ============================================
echo.

echo Membuka browser dalam 5 detik...
start "" cmd /c "timeout /t 5 >nul && start http://localhost:4321"

echo Menjalankan Astro...
echo.
npm run dev