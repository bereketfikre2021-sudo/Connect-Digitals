@echo off
echo 🚀 Starting Connect Digitals deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Run build
echo 🔨 Building for production...
call npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    
    REM Check if dist folder exists and has content
    if exist "dist" (
        echo ✅ Dist folder created with content
        
        REM Check if images are present
        if exist "dist\img" (
            echo ✅ Images copied to dist folder
            for /f %%i in ('dir /b dist\img ^| find /c /v ""') do echo 📊 Image count: %%i
        ) else (
            echo ⚠️  Warning: No images found in dist\img
        )
        
        REM Check if assets are present
        if exist "dist\assets" (
            echo ✅ Assets folder created
        ) else (
            echo ⚠️  Warning: No assets folder found
        )
        
        echo.
        echo 🎉 Deployment ready!
        echo 📁 Build output: dist\
        echo 🌐 Ready to deploy to Netlify
        echo.
        echo Next steps:
        echo 1. Commit and push to your repository
        echo 2. Netlify will automatically deploy
        echo 3. Check the deployed site for image loading
        echo.
        echo To test locally: npm run preview
        
    ) else (
        echo ❌ Error: Dist folder doesn't exist
        pause
        exit /b 1
    )
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

pause
