# Build & Deployment Guide

## 🏗️ Build Commands

### Development Build
```bash
npm run dev
```
Starts development server at http://localhost:5173

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

### Type Check
```bash
npm run type-check
```
Run TypeScript type checking without building

### Lint
```bash
npm run lint
```
Check code quality with ESLint

## 📦 Build Optimization

### Current Optimizations
- ✅ Code splitting by route
- ✅ Tree shaking for unused code
- ✅ Minification (Terser)
- ✅ CSS optimization
- ✅ Image optimization
- ✅ Gzip/Brotli compression
- ✅ Asset hashing for cache busting
- ✅ Service worker for offline support
- ✅ Web Workers for heavy tasks

### Bundle Size Targets
- Initial JS: <350KB (gzipped)
- Initial CSS: <50KB (gzipped)
- Total assets: <1MB
- LCP: <2.5s
- FCP: <1.8s

### Build Analysis
```bash
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Build with analysis
npm run build -- --mode analyze
```

## 🚀 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

#### Via Git Integration
1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: Set from `.env.example`

#### Via Wrangler CLI
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages publish dist --project-name=taawidaty
```

#### Cloudflare Configuration
Create `wrangler.toml`:
```toml
name = "taawidaty"
compatibility_date = "2025-11-05"

[site]
bucket = "./dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/service-worker.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Option 4: GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add deploy script to package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

## 🔐 Environment Setup

### Production Environment Variables
1. Copy `.env.example` to `.env.production`
2. Fill in actual production values:
```bash
VITE_APP_URL=https://taawidaty.ma
VITE_API_BASE_URL=https://api.taawidaty.ma
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=true
```

### Security Headers
Add these headers in your hosting platform:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 📊 Post-Deployment Checklist

### Performance
- [ ] Run Lighthouse audit (score >90)
- [ ] Test Core Web Vitals
- [ ] Verify bundle sizes
- [ ] Check load time <2.5s
- [ ] Test on slow 3G network

### Functionality
- [ ] Test calculator flow (CNOPS & CNSS)
- [ ] Verify medication search works
- [ ] Test FAQ pages
- [ ] Check language switching (FR ⇄ AR)
- [ ] Verify PWA install prompt
- [ ] Test offline functionality
- [ ] Check service worker caching

### SEO
- [ ] Verify sitemap.xml accessible
- [ ] Check robots.txt
- [ ] Test meta tags (view page source)
- [ ] Verify structured data (Google Rich Results Test)
- [ ] Test social sharing previews
- [ ] Check canonical URLs
- [ ] Verify hreflang tags

### Analytics
- [ ] Verify GA4 tracking
- [ ] Test custom events
- [ ] Check conversion tracking
- [ ] Verify error tracking

### Security
- [ ] Test HTTPS (SSL certificate)
- [ ] Verify security headers
- [ ] Check CSP policy
- [ ] Test XSS protection

### Accessibility
- [ ] Run axe DevTools audit
- [ ] Test with screen reader
- [ ] Verify keyboard navigation
- [ ] Check color contrast
- [ ] Test with zoom (200%)

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
        env:
          VITE_APP_URL: ${{ secrets.APP_URL }}
          VITE_GA_MEASUREMENT_ID: ${{ secrets.GA_ID }}
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: taawidaty
          directory: dist
```

## 📱 PWA Deployment Notes

### Service Worker
- Ensure `/service-worker.js` is at root
- Set proper cache headers
- Version service worker on each deployment

### Manifest
- Update icons for all sizes
- Test on real devices
- Verify shortcuts work

### Install Prompt
- Test on Android (Chrome)
- Test on iOS (Safari)
- Verify install criteria met

## 🎯 Performance Monitoring

### Real User Monitoring (RUM)
- Set up Google Analytics 4
- Track Core Web Vitals
- Monitor error rates
- Track user flows

### Synthetic Monitoring
- Schedule Lighthouse audits
- Monitor uptime
- Check from multiple locations

## 📞 Support

For deployment issues:
- Check build logs
- Verify environment variables
- Test locally with production build
- Review hosting platform docs

---

**Last Updated:** November 5, 2025  
**Version:** 1.0.0
