@echo off
title RAKAN • Arsip

cd /d "%~dp0"

echo.
echo ==============================
echo      RAKAN • ARSIP
echo ==============================
echo.

set /p MSG=Pesan arsip: 

if "%MSG%"=="" (
    echo.
    echo Dibatalkan. Pesan arsip kosong.
    pause
    exit /b
)

git add .
git commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo Tidak ada perubahan atau commit gagal.
    pause
    exit /b
)

git push origin main
if errorlevel 1 (
    echo.
    echo Push gagal.
    pause
    exit /b
)

echo.
echo ==============================
echo   Arsip berhasil disimpan.
echo ==============================
pause