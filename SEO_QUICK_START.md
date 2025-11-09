# Quick SEO Setup Guide

## 🚀 What We Built

Your website will now appear on Google when people search for medication prices like:
- **"doliprane 200mg prix"**
- **"prix paracétamol maroc"**
- **"combien coûte doliprane"**
- Any of your 10,000+ medications!

---

## ✅ What's Already Done

### 1. **Smart Page Titles** (Google Search Results)
When someone searches medication, they'll see:
```
DOLIPRANE 200MG Prix - 12.50 MAD | Taawidaty
```

### 2. **Rich Snippets** (Price in Search)
Google will show the price directly in search results:
```
Prix: 12.50 MAD · En stock
```

### 3. **Automatic SEO per Medication**
Every medication automatically gets:
- ✅ Unique title
- ✅ Custom description
- ✅ Relevant keywords
- ✅ Price display
- ✅ Google-friendly URL

### 4. **Sitemap for Google**
A map of all your medication pages so Google can find them all.

---

## 📋 What You Need to Do

### Step 1: Generate Sitemap (One-Time)
Run this command to create the sitemap:
```bash
npm run generate:sitemap
```

This creates `/public/sitemap.xml` with all medication URLs.

### Step 2: Submit to Google Search Console

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Click "Add Property"
   - Enter: `https://taawidaty.ma` (or your domain)

2. **Verify Ownership**
   - Choose "HTML file" method
   - Download the verification file
   - Upload it to your `/public` folder
   - Click "Verify"

3. **Submit Sitemap**
   - In left menu, click "Sitemaps"
   - Enter: `sitemap.xml`
   - Click "Submit"

### Step 3: Wait for Google (2-4 Weeks)
Google will:
- Week 1: Find your sitemap
- Week 2: Start indexing pages
- Week 3-4: Pages appear in search
- Month 2+: Rankings improve

---

## 🎯 Expected Results

### What Will Happen:
1. **Week 1-2**: Google discovers your pages
2. **Week 3-4**: Your medications appear in search
3. **Month 2**: Top 20 positions for medication names
4. **Month 3**: Top 10 positions
5. **Month 4-6**: #1 positions for many medications

### Example Search Results:
```
User searches: "doliprane 1000 prix"
Your result appears:

🔍 DOLIPRANE 1000MG Prix - 28.50 MAD | Taawidaty
    Prix: 28.50 MAD · En stock
    https://taawidaty.ma/prix/doliprane-1000mg
    Prix DOLIPRANE 1000MG: 28.50 MAD. Comparez les 
    prix en pharmacie et hôpital au Maroc...
```

---

## 📊 How to Track Success

### Google Search Console (Free)
After setup, check:
1. **Impressions**: How many times your site appeared in search
2. **Clicks**: How many people clicked
3. **Position**: Where you rank (goal: position 1-3)
4. **Top Queries**: Which medications people search

### Where to Check:
- Dashboard → Performance → Search Results

---

## 🔄 Monthly Maintenance

### Every Month:
1. **Check Google Search Console**
   - Look for errors
   - See which medications are popular
   - Check your rankings

2. **Update Prices** (if needed)
   - If medication prices change
   - Update your database
   - Google will automatically update

3. **Regenerate Sitemap** (if you add medications)
   ```bash
   npm run generate:sitemap
   ```

---

## 💡 Pro Tips for Better Rankings

### 1. **Update Your Domain Name**
In these files, change `https://taawidaty.ma` to your actual domain:
- `src/lib/seo.ts` (line 45)
- `generate-sitemap.mjs` (line 13)

### 2. **Speed Matters**
- Keep your site fast
- Optimize images
- Use a good hosting provider

### 3. **Mobile-First**
- Most searches are on mobile
- We already optimized for mobile ✅

### 4. **Content Quality**
- Keep medication data accurate
- Update prices regularly
- Add more information if possible

---

## ❓ FAQ

### Q: When will I see results?
**A:** 2-4 weeks for indexing, 2-3 months for good rankings.

### Q: Do I need to pay for SEO?
**A:** No! Everything is built-in and free.

### Q: How often should I regenerate sitemap?
**A:** Only when you add new medications or change URLs.

### Q: Will this work for Arabic searches too?
**A:** Yes! Fully supports Arabic (RTL) searches.

### Q: Can I see the SEO data in page source?
**A:** Yes! Right-click on any medication page → "View Page Source" → Look for `<script type="application/ld+json">`

---

## 🆘 Need Help?

### Verify SEO is Working:
1. **Test Rich Results**
   - Go to: https://search.google.com/test/rich-results
   - Enter your medication page URL
   - Should show "Product" detected ✅

2. **Check Meta Tags**
   - Go to: https://metatags.io/
   - Enter your medication page URL
   - Preview how it looks in Google

3. **Validate Schema**
   - Go to: https://validator.schema.org/
   - Paste your page URL
   - Should validate with no errors

---

## 📚 Learn More

Full documentation: See `SEO_GUIDE.md` in your project root.

---

**Remember**: SEO takes time. Be patient, and Google will reward you! 🚀

Last Updated: November 9, 2025
