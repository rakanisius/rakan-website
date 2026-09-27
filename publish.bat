@echo off
title RAKAN Publisher v2.0
color 0F

echo ========================================
echo        RAKAN Publisher v2.0
echo ========================================
echo.

set /p SLUG=Slug artikel: 
if "%SLUG%"=="" (
  echo Slug wajib diisi.
  pause
  exit /b
)

set ARTICLE=src\pages\tulisan\%SLUG%.astro

if not exist "%ARTICLE%" (
  echo Artikel tidak ditemukan:
  echo %ARTICLE%
  pause
  exit /b
)

findstr /C:"const title=" "%ARTICLE%" >nul || goto metaError
findstr /C:"const world=" "%ARTICLE%" >nul || goto metaError
findstr /C:"const category=" "%ARTICLE%" >nul || goto metaError
findstr /C:"const categorySlug=" "%ARTICLE%" >nul || goto metaError
findstr /C:"const edition=" "%ARTICLE%" >nul || goto metaError
findstr /C:"const image=" "%ARTICLE%" >nul || goto metaError

echo.
echo [1/3] Metadata OK
echo.

echo [2/3] Build Astro
call npm run build
if errorlevel 1 (
  echo Build gagal.
  pause
  exit /b
)

echo.
echo [3/3] Deploy Cloudflare
call npx wrangler deploy
if errorlevel 1 (
  echo Deploy gagal.
  pause
  exit /b
)

echo.
echo ========================================
echo   BERHASIL DITERBITKAN
echo ========================================
echo Slug: %SLUG%
pause
exit /b

:metaError
echo Metadata artikel belum lengkap.
pause
exit /b
