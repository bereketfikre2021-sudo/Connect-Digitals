@echo off
REM Connect Digitals - Production Deployment Script for Windows
echo 🚀 Starting production deployment for Connect Digitals...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite

REM Install dependencies
echo 📦 Installing dependencies...
npm ci --only=production

REM Run production build
echo 🔨 Building for production...
npm run build:prod

REM Check build size
echo 📊 Build size analysis:
dir dist /s

REM Verify critical files exist
echo ✅ Verifying critical files...
if exist "dist\index.html" (
    echo ✅ index.html exists
) else (
    echo ❌ index.html missing
    exit /b 1
)

if exist "dist\assets" (
    echo ✅ Assets directory exists
) else (
    echo ❌ Assets directory missing
    exit /b 1
)

echo 🎉 Production build completed successfully!
echo 📁 Build output: dist\
echo 🌐 Ready for deployment to Netlify, Vercel, or any static hosting service
pause
