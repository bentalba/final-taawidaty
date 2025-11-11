#!/bin/bash

# Image Optimization Script for Taawidaty
# This script uses ImageMagick's convert command to optimize logo images

echo "🖼️  Optimizing logo images for better performance..."

cd public/logos

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing via Homebrew..."
    brew install imagemagick
fi

# Create optimized versions (160x160 for @2x displays)
echo "📐 Creating optimized versions..."

# Optimize remboursement-logo.png
if [ -f "remboursement-logo.png" ]; then
    echo "  → Optimizing remboursement-logo.png..."
    convert remboursement-logo.png -resize 160x160 -quality 85 -strip remboursement-logo-opt.png
    mv remboursement-logo.png remboursement-logo-original.png
    mv remboursement-logo-opt.png remboursement-logo.png
    echo "  ✅ remboursement-logo.png optimized (160x160)"
fi

# Optimize price-check-logo.png
if [ -f "price-check-logo.png" ]; then
    echo "  → Optimizing price-check-logo.png..."
    convert price-check-logo.png -resize 160x160 -quality 85 -strip price-check-logo-opt.png
    mv price-check-logo.png price-check-logo-original.png
    mv price-check-logo-opt.png price-check-logo.png
    echo "  ✅ price-check-logo.png optimized (160x160)"
fi

# Create WebP versions for better compression
echo "🎨 Creating WebP versions for modern browsers..."

if [ -f "remboursement-logo.png" ]; then
    convert remboursement-logo.png -quality 85 remboursement-logo.webp
    echo "  ✅ remboursement-logo.webp created"
fi

if [ -f "price-check-logo.png" ]; then
    convert price-check-logo.png -quality 85 price-check-logo.webp
    echo "  ✅ price-check-logo.webp created"
fi

cd ../..

echo ""
echo "✨ Image optimization complete!"
echo ""
echo "📊 File size comparison:"
if [ -f "public/logos/remboursement-logo-original.png" ]; then
    original_size=$(du -h public/logos/remboursement-logo-original.png | cut -f1)
    new_size=$(du -h public/logos/remboursement-logo.png | cut -f1)
    echo "  remboursement-logo: $original_size → $new_size"
fi
if [ -f "public/logos/price-check-logo-original.png" ]; then
    original_size=$(du -h public/logos/price-check-logo-original.png | cut -f1)
    new_size=$(du -h public/logos/price-check-logo.png | cut -f1)
    echo "  price-check-logo: $original_size → $new_size"
fi
