#!/bin/bash

# Connect Digitals Deployment Script
echo "🚀 Starting Connect Digitals deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if dist folder exists and has content
    if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
        echo "✅ Dist folder created with content"
        
        # Check if images are present
        if [ -d "dist/img" ] && [ "$(ls -A dist/img)" ]; then
            echo "✅ Images copied to dist folder"
            echo "📊 Image count: $(ls -1 dist/img | wc -l)"
        else
            echo "⚠️  Warning: No images found in dist/img"
        fi
        
        # Check if assets are present
        if [ -d "dist/assets" ]; then
            echo "✅ Assets folder created"
        else
            echo "⚠️  Warning: No assets folder found"
        fi
        
        echo ""
        echo "🎉 Deployment ready!"
        echo "📁 Build output: dist/"
        echo "🌐 Ready to deploy to Netlify"
        echo ""
        echo "Next steps:"
        echo "1. Commit and push to your repository"
        echo "2. Netlify will automatically deploy"
        echo "3. Check the deployed site for image loading"
        echo ""
        echo "To test locally: npm run preview"
        
    else
        echo "❌ Error: Dist folder is empty or doesn't exist"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
