# OG Image Setup

## Current Status
An SVG-based Open Graph image has been created at `/public/og-image.svg` with dimensions 1200x630.

## Recommendation
For optimal compatibility with Facebook, LinkedIn, and other social platforms, you should convert the SVG to JPG:

### Option 1: Using Online Tools
1. Visit https://www.adobe.com/express/feature/image/convert/svg-to-jpg
2. Upload `og-image.svg`
3. Download as `og-image.jpg`
4. Replace the file in `/public/`

### Option 2: Using ImageMagick (if available)
```bash
convert og-image.svg -quality 90 og-image.jpg
```

### Option 3: Using Sharp (Node.js)
```bash
npm install sharp
npx sharp -i og-image.svg -o og-image.jpg
```

### Option 4: Using Figma/Canva
Create a custom 1200x630 design with your branding for better visual appeal.

Once you have a JPG version, the SEO component is already configured to use `og-image.jpg`.
