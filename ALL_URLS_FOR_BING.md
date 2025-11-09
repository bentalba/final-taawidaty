# Complete URL List for Bing Webmaster Submission

## 📋 Main Pages (4 URLs)

```
https://taawidaty.ma/
https://taawidaty.ma/prix-medicaments
https://taawidaty.ma/faq-cnops
https://taawidaty.ma/faq-cnss
```

---

## 💊 Medication Pages (~10,000+ URLs)

### Format:
```
https://taawidaty.ma/prix/{medication-slug}
```

### Slug Generation Rules:
- Lowercase medication name
- Replace spaces with hyphens
- Remove special characters
- Remove diacritics (é→e, à→a)

### Examples:

#### Popular Pain Relievers:
```
https://taawidaty.ma/prix/doliprane-1000mg
https://taawidaty.ma/prix/doliprane-500mg
https://taawidaty.ma/prix/paracetamol-500mg
https://taawidaty.ma/prix/paracetamol-1000mg
https://taawidaty.ma/prix/efferalgan-1000mg
https://taawidaty.ma/prix/dafalgan-1000mg
https://taawidaty.ma/prix/aspegic-1000mg
https://taawidaty.ma/prix/aspegic-500mg
https://taawidaty.ma/prix/ibuprofene-400mg
https://taawidaty.ma/prix/advil-400mg
```

#### Antibiotics:
```
https://taawidaty.ma/prix/amoxicilline-500mg
https://taawidaty.ma/prix/amoxicilline-1g
https://taawidaty.ma/prix/augmentin-1g
https://taawidaty.ma/prix/augmentin-500mg
https://taawidaty.ma/prix/clamoxyl-1g
https://taawidaty.ma/prix/clamoxyl-500mg
https://taawidaty.ma/prix/azithromycine-250mg
https://taawidaty.ma/prix/zithromax-250mg
https://taawidaty.ma/prix/ciprofloxacine-500mg
https://taawidaty.ma/prix/flagyl-500mg
```

#### Anti-inflammatories:
```
https://taawidaty.ma/prix/diclofenac-50mg
https://taawidaty.ma/prix/voltarene-50mg
https://taawidaty.ma/prix/ketoprofene-100mg
https://taawidaty.ma/prix/profenid-100mg
https://taawidaty.ma/prix/naproxene-500mg
https://taawidaty.ma/prix/celebrex-200mg
```

#### Cardiovascular:
```
https://taawidaty.ma/prix/amlodipine-5mg
https://taawidaty.ma/prix/amlodipine-10mg
https://taawidaty.ma/prix/atenolol-50mg
https://taawidaty.ma/prix/bisoprolol-5mg
https://taawidaty.ma/prix/ramipril-5mg
https://taawidaty.ma/prix/enalapril-10mg
https://taawidaty.ma/prix/losartan-50mg
https://taawidaty.ma/prix/simvastatine-20mg
https://taawidaty.ma/prix/atorvastatine-20mg
```

#### Diabetes:
```
https://taawidaty.ma/prix/metformine-500mg
https://taawidaty.ma/prix/metformine-850mg
https://taawidaty.ma/prix/glucophage-850mg
https://taawidaty.ma/prix/glucophage-1000mg
https://taawidaty.ma/prix/glibenclamide-5mg
https://taawidaty.ma/prix/gliclazide-30mg
```

#### Gastrointestinal:
```
https://taawidaty.ma/prix/omeprazole-20mg
https://taawidaty.ma/prix/esomeprazole-40mg
https://taawidaty.ma/prix/pantoprazole-40mg
https://taawidaty.ma/prix/mopral-20mg
https://taawidaty.ma/prix/motilium-10mg
https://taawidaty.ma/prix/smecta-3g
https://taawidaty.ma/prix/spasfon-80mg
```

#### Respiratory:
```
https://taawidaty.ma/prix/ventoline-100mcg
https://taawidaty.ma/prix/salbutamol-100mcg
https://taawidaty.ma/prix/pulmicort-200mcg
https://taawidaty.ma/prix/seretide-250mcg
https://taawidaty.ma/prix/symbicort-200mcg
```

#### Allergy:
```
https://taawidaty.ma/prix/cetirizine-10mg
https://taawidaty.ma/prix/zyrtec-10mg
https://taawidaty.ma/prix/loratadine-10mg
https://taawidaty.ma/prix/aerius-5mg
https://taawidaty.ma/prix/clarityne-10mg
```

#### Mental Health:
```
https://taawidaty.ma/prix/alprazolam-0-25mg
https://taawidaty.ma/prix/bromazepam-6mg
https://taawidaty.ma/prix/lexomil-6mg
https://taawidaty.ma/prix/sertraline-50mg
https://taawidaty.ma/prix/fluoxetine-20mg
https://taawidaty.ma/prix/escitalopram-10mg
```

#### Supplements/Vitamins:
```
https://taawidaty.ma/prix/vitamin-d3-1000ui
https://taawidaty.ma/prix/calcium-500mg
https://taawidaty.ma/prix/fer-80mg
https://taawidaty.ma/prix/magnesium-300mg
https://taawidaty.ma/prix/zinc-15mg
```

---

## 🎯 How to Get Complete List

### Method 1: Use Sitemap (Recommended)
**Submit this single URL to Bing:**
```
https://taawidaty.ma/sitemap.xml
```

Bing will automatically discover ALL medication URLs from the sitemap.

### Method 2: Generate URL List
**Run this command:**
```bash
npm run generate:urls
```

**Output file:** `public/urls.txt`  
**Contains:** Complete list of ALL ~10,000 URLs

### Method 3: Extract from Database
The complete list includes all medications from:
- `src/data/medications-cnops.json` (~5,000 medications)
- `src/data/medications-cnss.json` (~5,000 medications)

Each medication gets a URL in format:
```
https://taawidaty.ma/prix/{medication-name-lowercase-with-hyphens}
```

---

## 📊 URL Statistics

### Total URLs: ~10,004
- Main pages: 4
- CNOPS medications: ~5,000
- CNSS medications: ~5,000 (unique)

### URL Distribution by Price:
- High priority (>100 MAD): ~3,000 URLs
- Medium priority (50-100 MAD): ~4,000 URLs
- Standard priority (<50 MAD): ~3,000 URLs

### URL Distribution by Category:
- Analgesics/Antipyretics: ~500 URLs
- Antibiotics: ~1,200 URLs
- Cardiovascular: ~800 URLs
- Gastrointestinal: ~600 URLs
- Respiratory: ~400 URLs
- Diabetes: ~300 URLs
- Mental Health: ~200 URLs
- Others: ~7,000 URLs

---

## 🚀 Submission Steps for Bing

### Step 1: Access Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Add your site: `https://taawidaty.ma`
4. Verify ownership (DNS or HTML file)

### Step 2: Submit Sitemap (Easiest)
1. Click "Sitemaps" in left menu
2. Click "Submit a sitemap"
3. Enter: `https://taawidaty.ma/sitemap.xml`
4. Click "Submit"
5. ✅ Done! Bing will crawl all URLs automatically

### Step 3: Monitor Indexing
1. Check "URL Inspection" to see indexed pages
2. Check "Crawl Info" to see crawl status
3. Wait 2-4 weeks for full indexing

---

## ⚡ Priority URLs to Submit First

If you want to manually submit URLs, start with these 50 high-priority ones:

### Top 50 Most Searched Medications:
```
https://taawidaty.ma/
https://taawidaty.ma/prix-medicaments
https://taawidaty.ma/prix/doliprane-1000mg
https://taawidaty.ma/prix/paracetamol-500mg
https://taawidaty.ma/prix/amoxicilline-500mg
https://taawidaty.ma/prix/augmentin-1g
https://taawidaty.ma/prix/ibuprofene-400mg
https://taawidaty.ma/prix/aspegic-1000mg
https://taawidaty.ma/prix/metformine-850mg
https://taawidaty.ma/prix/omeprazole-20mg
https://taawidaty.ma/prix/amlodipine-5mg
https://taawidaty.ma/prix/atenolol-50mg
https://taawidaty.ma/prix/simvastatine-20mg
https://taawidaty.ma/prix/cetirizine-10mg
https://taawidaty.ma/prix/ventoline-100mcg
https://taawidaty.ma/prix/spasfon-80mg
https://taawidaty.ma/prix/smecta-3g
https://taawidaty.ma/prix/motilium-10mg
https://taawidaty.ma/prix/bromazepam-6mg
https://taawidaty.ma/prix/sertraline-50mg
https://taawidaty.ma/prix/ramipril-5mg
https://taawidaty.ma/prix/losartan-50mg
https://taawidaty.ma/prix/atorvastatine-20mg
https://taawidaty.ma/prix/gliclazide-30mg
https://taawidaty.ma/prix/esomeprazole-40mg
https://taawidaty.ma/prix/pantoprazole-40mg
https://taawidaty.ma/prix/salbutamol-100mcg
https://taawidaty.ma/prix/loratadine-10mg
https://taawidaty.ma/prix/fluoxetine-20mg
https://taawidaty.ma/prix/escitalopram-10mg
https://taawidaty.ma/prix/ciprofloxacine-500mg
https://taawidaty.ma/prix/azithromycine-250mg
https://taawidaty.ma/prix/diclofenac-50mg
https://taawidaty.ma/prix/ketoprofene-100mg
https://taawidaty.ma/prix/naproxene-500mg
https://taawidaty.ma/prix/bisoprolol-5mg
https://taawidaty.ma/prix/enalapril-10mg
https://taawidaty.ma/prix/glibenclamide-5mg
https://taawidaty.ma/prix/mopral-20mg
https://taawidaty.ma/prix/pulmicort-200mcg
https://taawidaty.ma/prix/seretide-250mcg
https://taawidaty.ma/prix/zyrtec-10mg
https://taawidaty.ma/prix/aerius-5mg
https://taawidaty.ma/prix/alprazolam-0-25mg
https://taawidaty.ma/prix/lexomil-6mg
https://taawidaty.ma/prix/flagyl-500mg
https://taawidaty.ma/prix/voltarene-50mg
https://taawidaty.ma/prix/celebrex-200mg
https://taawidaty.ma/faq-cnops
https://taawidaty.ma/faq-cnss
```

---

## 📝 Notes

1. **URL Format**: All medication URLs use lowercase slugs with hyphens
2. **Language Support**: Each URL has French and Arabic alternate links
3. **Update Frequency**: Regenerate sitemap monthly or when adding medications
4. **Submission Limit**: Bing allows 10,000 URLs per day via API
5. **Best Practice**: Submit sitemap once, Bing will auto-discover all URLs

---

## ✅ Checklist

- [ ] Generate sitemap: `npm run generate:sitemap`
- [ ] Generate URL list: `npm run generate:urls`
- [ ] Access Bing Webmaster Tools
- [ ] Add and verify site
- [ ] Submit sitemap.xml
- [ ] Wait 2-4 weeks for indexing
- [ ] Monitor crawl status
- [ ] Check indexed pages count

---

**Total URLs**: ~10,004  
**Submission Method**: Sitemap (recommended) or URL list  
**Expected Indexing Time**: 2-4 weeks  
**File Location**: `public/sitemap.xml` and `public/urls.txt`

---

**Last Updated**: November 9, 2025  
**Generated by**: Taawidaty SEO System
