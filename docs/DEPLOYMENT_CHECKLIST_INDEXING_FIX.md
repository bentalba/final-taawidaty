# 🚀 DEPLOYMENT CHECKLIST - Indexing Crisis Fix

**Date:** November 23, 2025  
**Priority:** 🚨 CRITICAL  
**Estimated Time:** 15 minutes

---

## ✅ PRE-DEPLOYMENT VERIFICATION (Completed)

- [x] Sitemap contains exactly 19 URLs (verified: ✓)
- [x] No fake `/prix/` URLs in sitemap (verified: 0)
- [x] File size is ~9KB (verified: 8.9KB)
- [x] Build passes successfully (verified: ✓)
- [x] All changes committed to Git (verified: 3 commits)

---

## 🔄 DEPLOYMENT STEPS

### Step 1: Deploy to Production
```bash
# Push to main branch (triggers auto-deployment)
git push origin main

# OR manual deployment
npm run deploy  # or your deployment command
```

**Expected:** Site rebuilds and deploys within 2-5 minutes

---

### Step 2: Verify Live Sitemap
Once deployed, verify the sitemap is accessible:

```bash
# Check sitemap exists
curl -I https://taawidaty.ma/sitemap.xml

# Expected: HTTP/200
# Expected: Content-Type: application/xml
```

**Or visit in browser:**
- https://taawidaty.ma/sitemap.xml
- Should show 19 URLs
- Should NOT contain any `/prix/` URLs

---

### Step 3: Google Search Console Actions

#### A. Submit Clean Sitemap (IMMEDIATE)
1. Go to: https://search.google.com/search-console
2. Select property: `taawidaty.ma`
3. Navigate to: **Sitemaps** (left sidebar)
4. Remove any old sitemaps
5. Click **"Add a new sitemap"**
6. Enter: `sitemap.xml`
7. Click **Submit**
8. Wait for "Success" status (1-2 hours)

**Screenshot locations to verify:**
- ✅ Status: Success
- ✅ Discovered URLs: 19
- ✅ Last read: Today's date

---

#### B. Request Removal of Fake URLs (URGENT)
1. Navigate to: **Removals** (left sidebar)
2. Click: **"New Request"**
3. Select: **"Remove all URLs with this prefix"**
4. Enter: `https://taawidaty.ma/prix/`
5. Click: **"Next"**
6. Confirm: **"Submit Request"**

**Expected Result:**
- Status: "Temporarily removed" (appears in 24-48 hours)
- Duration: 6 months (permanent after that)
- Affected URLs: ~5,000+ fake medication links

**IMPORTANT:** This is NOT optional. Without this step, the 5,000 fake URLs will remain in Google's index and continue causing problems.

---

#### C. Monitor Index Coverage (DAILY for 7 days)
1. Navigate to: **Index Coverage** (left sidebar)
2. Check the "Valid" graph
3. Should increase from current low number to 19 within 7 days

**Key Metrics to Watch:**
| Metric | Before | Target | Timeline |
|--------|--------|--------|----------|
| Valid Pages | 3-5 | 19 | 7 days |
| Excluded Pages | 5,000+ | 0 | 14 days |
| 404 Errors | 5,000+ | 0 | 3 days |
| Crawl Budget | Low | Normal | 7 days |

---

## 🔍 POST-DEPLOYMENT TESTS

### Test 1: Canonical URLs (CRITICAL)
Visit each page type and verify canonical URLs:

```bash
# Homepage
curl -s https://taawidaty.ma | grep canonical
# Expected: <link rel="canonical" href="https://taawidaty.ma" />

# Blog
curl -s https://taawidaty.ma/blog | grep canonical
# Expected: <link rel="canonical" href="https://taawidaty.ma/blog" />

# Blog Post
curl -s https://taawidaty.ma/blog/guide-remboursement-cnss | grep canonical
# Expected: <link rel="canonical" href="https://taawidaty.ma/blog/guide-remboursement-cnss" />

# Author Page
curl -s https://taawidaty.ma/author | grep canonical
# Expected: <link rel="canonical" href="https://taawidaty.ma/author" />
```

**Status:** Each page should have its OWN URL as canonical, NOT the homepage URL.

---

### Test 2: Robots.txt (PROTECTION)
```bash
curl https://taawidaty.ma/robots.txt
```

**Expected output:**
```txt
User-Agent: *
Allow: /
Disallow: /prix/          ← Must be present
Allow: /prix-medicaments  ← Must be present
Sitemap: https://taawidaty.ma/sitemap.xml
```

---

### Test 3: Sitemap Accessibility
```bash
curl -s https://taawidaty.ma/sitemap.xml | grep -c "<url>"
```

**Expected:** `19`

---

### Test 4: No 404 Errors
Test that all sitemap URLs are accessible:

```bash
# Test a few key URLs
curl -I https://taawidaty.ma
curl -I https://taawidaty.ma/blog
curl -I https://taawidaty.ma/author
curl -I https://taawidaty.ma/blog/comprendre-ticket-moderateur

# All should return: HTTP/200
```

---

## 📊 SUCCESS CRITERIA

### Immediate (0-24 hours)
- [ ] Sitemap submitted to GSC (Status: Success)
- [ ] Removal request submitted for `/prix/` prefix
- [ ] All 19 URLs return HTTP 200
- [ ] Canonical URLs are correct (self-referencing)

### Short-term (1-7 days)
- [ ] Google re-crawls valid pages (check GSC "Last Crawled" dates)
- [ ] Index Coverage shows 19 valid pages
- [ ] 404 errors reduce to near 0
- [ ] Fake URLs start disappearing from search results

### Medium-term (7-14 days)
- [ ] All 19 pages indexed and visible in search
- [ ] No duplicate content warnings
- [ ] Organic traffic begins recovering
- [ ] Search Console shows healthy indexing status

---

## 🚨 TROUBLESHOOTING

### Issue: Sitemap shows "Failed to fetch"
**Solution:**
```bash
# Verify sitemap is accessible
curl -I https://taawidaty.ma/sitemap.xml

# If 404, re-deploy:
python3 generate-sitemap.py
git add public/sitemap.xml
git commit -m "fix: regenerate sitemap"
git push
```

---

### Issue: Canonical URLs still point to homepage
**Solution:**
```bash
# Verify SEO.tsx was deployed
# Check browser source code for any page
# Look for: <link rel="canonical" href="...">

# If wrong, rebuild and redeploy:
bun run build
git push
```

---

### Issue: Fake URLs still appearing in search
**Solution:**
1. Verify removal request is "Active" in GSC → Removals
2. If "Cancelled" or "Expired", submit a new request
3. Wait 48 hours for Google to process

---

## 📞 EMERGENCY CONTACTS

If something goes wrong:
1. Check GSC for error messages
2. Review build logs for deployment issues
3. Verify DNS/CDN cache is cleared (if using Cloudflare/similar)

---

## ✅ FINAL CHECKLIST

Before marking as complete:

- [ ] Code deployed to production
- [ ] Sitemap accessible at `https://taawidaty.ma/sitemap.xml`
- [ ] Sitemap submitted to Google Search Console
- [ ] Removal request submitted for `/prix/` prefix
- [ ] All 19 URLs tested (return 200)
- [ ] Canonical URLs verified (self-referencing)
- [ ] Robots.txt verified (`Disallow: /prix/`)
- [ ] Documentation updated (this file)
- [ ] Calendar reminder set (check GSC daily for 7 days)

---

## 📅 MONITORING SCHEDULE

**Daily (Days 1-7):**
- Check Google Search Console → Index Coverage
- Note number of "Valid" pages (target: 19)
- Note number of "Excluded" pages (target: 0)

**Weekly (Weeks 2-4):**
- Review organic traffic trends
- Check search rankings for key terms
- Monitor AdSense eligibility status

**Monthly:**
- Full site audit
- Verify sitemap is up-to-date
- Review and optimize content

---

## 🎯 SUCCESS METRICS

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Valid URLs in sitemap | 19 | 19 | ✅ |
| Fake `/prix/` URLs | 0 | 0 | ✅ |
| Google indexed pages | TBD | 19 | ⏳ Pending |
| 404 errors | TBD | 0 | ⏳ Pending |
| Organic traffic | TBD | +50% | ⏳ Pending |

---

**Last Updated:** November 23, 2025  
**Next Review:** November 30, 2025  
**Status:** 🟢 Ready for Deployment
