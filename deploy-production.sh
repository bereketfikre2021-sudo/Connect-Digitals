#!/bin/bash

# Connect Digitals - Production Deployment Script
echo "🚀 Starting production deployment for Connect Digitals..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run production build
echo "🔨 Building for production..."
npm run build:prod

# Check build size
echo "📊 Build size analysis:"
du -sh dist/

# Verify critical files exist
echo "✅ Verifying critical files..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
    exit 1
fi

if [ -f "dist/assets" ]; then
    echo "✅ Assets directory exists"
else
    echo "❌ Assets directory missing"
    exit 1
fi

# Check for console.log statements (should be removed in production)
echo "🔍 Checking for console statements..."
if grep -r "console\." dist/ --include="*.js"; then
    echo "⚠️  Warning: Console statements found in production build"
else
    echo "✅ No console statements found"
fi

echo "🎉 Production build completed successfully!"
echo "📁 Build output: dist/"
echo "🌐 Ready for deployment to Netlify, Vercel, or any static hosting service"
