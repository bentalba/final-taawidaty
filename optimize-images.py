#!/usr/bin/env python3
"""
Image Optimization Script for Taawidaty
Optimizes logo images using PIL/Pillow
"""

from PIL import Image
import os
import sys

def optimize_image(input_path, output_path, target_size=(160, 160), quality=85):
    """
    Optimize an image by resizing and compressing it.
    
    Args:
        input_path: Path to input image
        output_path: Path to save optimized image
        target_size: Tuple of (width, height) for resized image
        quality: JPEG/PNG quality (1-100)
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Get original size
            original_size = os.path.getsize(input_path)
            print(f"  Original: {img.size[0]}x{img.size[1]}, {original_size / 1024:.1f} KB")
            
            # Resize image while maintaining aspect ratio
            img.thumbnail(target_size, Image.Resampling.LANCZOS)
            
            # Optimize and save
            if img.mode == 'RGBA':
                # For PNG with transparency
                img.save(output_path, 'PNG', optimize=True, quality=quality)
            else:
                # Convert to RGB if needed
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                img.save(output_path, 'PNG', optimize=True, quality=quality)
            
            # Get new size
            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"  Optimized: {img.size[0]}x{img.size[1]}, {new_size / 1024:.1f} KB")
            print(f"  ✅ Reduced by {reduction:.1f}%")
            
            return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def create_webp(input_path, output_path, quality=85):
    """Create WebP version of image."""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA'):
                # Keep transparency for WebP
                img.save(output_path, 'WEBP', quality=quality, method=6)
            else:
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                img.save(output_path, 'WEBP', quality=quality, method=6)
            
            webp_size = os.path.getsize(output_path)
            print(f"  ✅ WebP created: {webp_size / 1024:.1f} KB")
            return True
    except Exception as e:
        print(f"  ❌ Error creating WebP: {e}")
        return False

def main():
    print("🖼️  Optimizing logo images for better performance...\n")
    
    logos_dir = "public/logos"
    
    if not os.path.exists(logos_dir):
        print(f"❌ Directory {logos_dir} not found!")
        sys.exit(1)
    
    # Images to optimize
    images = [
        "remboursement-logo.png",
        "price-check-logo.png"
    ]
    
    for image_name in images:
        input_path = os.path.join(logos_dir, image_name)
        
        if not os.path.exists(input_path):
            print(f"⚠️  {image_name} not found, skipping...")
            continue
        
        print(f"📐 Optimizing {image_name}...")
        
        # Backup original
        backup_path = os.path.join(logos_dir, image_name.replace('.png', '-original.png'))
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            input_path = backup_path
        
        # Create optimized version
        output_path = os.path.join(logos_dir, image_name)
        optimize_image(input_path, output_path, target_size=(160, 160), quality=85)
        
        # Create WebP version
        webp_path = os.path.join(logos_dir, image_name.replace('.png', '.webp'))
        print(f"🎨 Creating WebP version...")
        create_webp(output_path, webp_path, quality=85)
        
        print()
    
    print("✨ Image optimization complete!\n")
    print("📊 Summary:")
    print("  - Images resized to 160x160 (optimal for @2x displays)")
    print("  - PNG files optimized and compressed")
    print("  - WebP versions created for modern browsers")
    print("  - Original files backed up as *-original.png")

if __name__ == "__main__":
    main()
