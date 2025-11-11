# SEO Implementation Guide for Taawidaty

## 🎯 Goal
Rank **#1 on Google** for medication price searches in Morocco, such as:
- "doliprane 200mg prix"
- "prix paracétamol maroc"
- "prix médicament maroc"
- And 10,000+ medication name variations

---

## ✅ Implementation Checklist

### 1. **Dynamic Meta Tags** ✅
Each medication page has unique, SEO-optimized meta tags:

```typescript
// Automatically generated per medication
<title>DOLIPRANE 200MG Prix - 12.50 MAD | Taawidaty</title>
<meta name="description" content="Prix DOLIPRANE 200MG: 12.50 MAD. Comparez les prix en pharmacie et hôpital au Maroc. Calculez votre remboursement CNOPS/CNSS." />
<meta name="keywords" content="doliprane 200mg prix, doliprane maroc, prix doliprane, médicament maroc" />
```

### 2. **Structured Data (Schema.org)** ✅
Google-friendly JSON-LD markup for rich snippets:

- **Product Schema**: Shows price in search results
- **MedicalWebPage Schema**: Identifies medical content
- **FAQPage Schema**: Powers FAQ rich snippets
- **BreadcrumbList Schema**: Navigation breadcrumbs
- **Organization Schema**: Brand information

Example output in Google search:
```
DOLIPRANE 200MG Prix - 12.50 MAD | Taawidaty
⭐⭐⭐⭐⭐ Prix: 12.50 MAD
Prix officiel du DOLIPRANE 200MG au Maroc. Prix pharmacie...
```

### 3. **Sitemap.xml** ✅
- Auto-generated with `npm run generate:sitemap`
- Includes all medication URLs (up to 5000)
- Sorted by priority (higher-priced = more searched)
- Supports multilingual (French/Arabic)
- Located at: `/public/sitemap.xml`

### 4. **Robots.txt** ✅
Already optimized at `/public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://taawidaty.ma/sitemap.xml
```

### 5. **Canonical URLs** ✅
Each medication has unique canonical URL:
```
https://taawidaty.ma/prix/doliprane-200mg
```

### 6. **Open Graph & Twitter Cards** ✅
Social sharing optimization with dynamic OG tags.

---

## 📊 SEO Components

### `src/lib/seo.ts`
Core SEO utilities:
- `generateMedicationStructuredData()` - Schema.org markup
- `generateMetaDescription()` - 150-160 char descriptions
- `generatePageTitle()` - 50-60 char titles
- `generateKeywords()` - Relevant search terms
- `generateFAQStructuredData()` - FAQ rich snippets
- `generateBreadcrumbStructuredData()` - Navigation

### `src/components/SEO.tsx`
Reusable SEO component with Helmet:
- Dynamic meta tags
- Structured data injection
- Canonical URLs
- Multilingual support

### `src/pages/PriceChecker.tsx`
Implements dynamic SEO:
```typescript
// SEO updates automatically when medication is selected
const seoTitle = selectedMedication
  ? generatePageTitle(selectedMedication)
  : 'Prix des Médicaments au Maroc | Taawidaty';

<SEO
  title={seoTitle}
  description={seoDescription}
  keywords={seoKeywords}
  structuredData={[
    generateMedicationStructuredData(selectedMedication),
    generateFAQStructuredData(selectedMedication),
    generateBreadcrumbStructuredData(selectedMedication)
  ]}
/>
```

---

## 🚀 Usage

### Generate Sitemap
```bash
npm run generate:sitemap
```

### Test SEO in Development
1. Run dev server: `npm run dev`
2. Search for medication: "DOLIPRANE"
3. Check page source (View > Developer > View Source)
4. Look for `<script type="application/ld+json">` - should contain product data

### Validate SEO
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Meta Tags Checker**: https://metatags.io/

---

## 🎯 Target Keywords Strategy

### Primary Keywords (High Volume)
- "prix médicaments maroc"
- "prix pharmacie maroc"
- "doliprane prix"
- "paracétamol prix"
- "médicament maroc"

### Long-Tail Keywords (High Intent)
- "doliprane 1000mg prix maroc"
- "prix officiel médicament maroc"
- "combien coûte doliprane"
- "prix [MEDICATION_NAME] pharmacie"

### Local SEO
- All pages geo-tagged for Morocco (MA)
- Arabic language support for local searches
- CNOPS/CNSS keywords (Morocco-specific)

---

## 📈 Expected Results

### Timeline
- **Week 1-2**: Google indexes new pages
- **Week 3-4**: Rich snippets appear
- **Month 2-3**: Top 10 rankings
- **Month 4-6**: #1 positions for branded terms

### Key Metrics to Track
1. **Organic traffic** (Google Analytics)
2. **Search impressions** (Google Search Console)
3. **Average position** per keyword
4. **Click-through rate (CTR)**
5. **Rich snippet appearances**

---

## 🔧 Maintenance

### After Adding New Medications
```bash
# Regenerate sitemap
npm run generate:sitemap

# Submit to Google Search Console
# Go to: https://search.google.com/search-console
# Sitemaps > Add new sitemap > Submit: https://taawidaty.ma/sitemap.xml
```

### Monthly Tasks
1. Check Google Search Console for crawl errors
2. Monitor top-performing keywords
3. Update medication prices if changed
4. Regenerate sitemap

---

## 🏆 Competitive Advantages

1. **Comprehensive Database**: 10,000+ medications
2. **Rich Snippets**: Product prices in search results
3. **Multilingual**: French + Arabic = broader audience
4. **Mobile-First**: Optimized for mobile searches
5. **Fast Loading**: Vite + React performance
6. **Structured Data**: Google understands content perfectly

---

## 📱 Mobile SEO

- Responsive design (mobile-first)
- Touch-friendly UI (44px minimum targets)
- Fast loading (< 2s LCP)
- No intrusive interstitials
- Readable text (16px minimum)

---

## 🌐 Submit to Search Engines

### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property: `https://taawidaty.ma`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://taawidaty.ma/sitemap.xml`

### Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters
2. Add site: `https://taawidaty.ma`
3. Submit sitemap

---

## 📊 Example: How SEO Works for "Doliprane 200mg Prix"

### User searches: "doliprane 200mg prix"

### Google finds your page because:
1. ✅ Title contains "DOLIPRANE 200MG Prix"
2. ✅ Description contains "doliprane 200mg" + "prix"
3. ✅ Keywords include "doliprane", "200mg", "prix"
4. ✅ Structured data shows it's a Product with price
5. ✅ URL is SEO-friendly: `/prix/doliprane-200mg`
6. ✅ Content is relevant (medication details, prices)
7. ✅ Mobile-optimized (most searches are mobile)
8. ✅ Fast loading (Core Web Vitals)

### Google shows rich snippet:
```
DOLIPRANE 200MG Prix - 12.50 MAD | Taawidaty
https://taawidaty.ma/prix/doliprane-200mg
Prix: 12.50 MAD · En stock
Prix DOLIPRANE 200MG: 12.50 MAD. Comparez les prix en 
pharmacie et hôpital au Maroc. Calculez votre remboursement...
```

### User clicks → Conversion! 🎉

---

## 🔍 Monitoring & Analytics

### Google Search Console Queries to Monitor
- Check "Performance" tab
- Filter by "Queries" containing medication names
- Track impressions, clicks, CTR, position

### Google Analytics Goals
1. Medication search performed
2. Price checker used
3. Reimbursement calculated
4. Time on site > 2 minutes

---

## 💡 Pro Tips

1. **Update content regularly**: Google loves fresh content
2. **Build backlinks**: Get other health sites to link to you
3. **Social signals**: Share on Facebook, Twitter (generates traffic)
4. **User engagement**: Low bounce rate = better rankings
5. **Page speed**: Use Lighthouse to optimize performance

---

## 🎓 Learn More

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Google Rich Results](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Sitemap generated and accessible at `/sitemap.xml`
- [ ] Robots.txt allows all pages
- [ ] All medication pages have unique titles
- [ ] Structured data validates (use Rich Results Test)
- [ ] Meta descriptions are 150-160 characters
- [ ] Canonical URLs are correct
- [ ] Mobile-responsive design works
- [ ] Page load speed < 2 seconds
- [ ] No broken links (404 errors)
- [ ] HTTPS enabled (SSL certificate)
- [ ] Submitted to Google Search Console
- [ ] Google Analytics installed

---

**Last Updated**: November 9, 2025
**Maintained by**: BENTALBA ZAKARIA
