#!/usr/bin/env python3
"""
FIXED Sitemap Generator for Taawidaty
ACTION: Generates ONLY valid routes that exist in the React app.
REMOVED: Medication database loop (caused 5000+ 404 errors).
Run with: python3 generate-sitemap.py
"""

from datetime import datetime
from pathlib import Path

BASE_URL = 'https://taawidaty.ma'

# The ONLY real routes in your application (verified from App.tsx)
VALID_ROUTES = [
    # Core Pages
    "/",
    "/prix-medicaments",
    "/blog",
    "/about-us",
    "/contact-us",
    
    # Blog Posts (All 8 posts)
    "/blog/guide-remboursement-cnss",
    "/blog/guide-remboursement-cnops",
    "/blog/difference-cnss-cnops",
    "/blog/comprendre-ppv-ppm-maroc",
    "/blog/medicament-generique-efficacite",
    "/blog/comprendre-ticket-moderateur",
    "/blog/medicaments-non-remboursables",
    "/blog/lire-ordonnance-maroc",
    
    # Author & Legal Pages
    "/author",
    "/privacy-policy",
    "/terms-of-service",
    "/medical-disclaimer",
    "/editorial-policy",
    "/cookie-preferences"
]

def generate_sitemap():
    """Generate clean sitemap.xml with only valid routes"""
    today = datetime.now().strftime('%Y-%m-%d')
    
    sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
'''
    
    for route in VALID_ROUTES:
        # Determine priority and frequency based on route type
        priority = "0.5"
        changefreq = "monthly"
        
        if route == "/":
            priority = "1.0"
            changefreq = "daily"
        elif route == "/prix-medicaments":
            priority = "0.9"
            changefreq = "weekly"
        elif route == "/blog":
            priority = "0.8"
            changefreq = "weekly"
        elif route.startswith("/blog/"):
            priority = "0.7"
            changefreq = "weekly"
        elif route == "/author":
            priority = "0.6"
            changefreq = "monthly"
        elif route in ["/about-us", "/contact-us"]:
            priority = "0.5"
            changefreq = "monthly"
        elif route in ["/privacy-policy", "/terms-of-service", "/medical-disclaimer", "/editorial-policy", "/cookie-preferences"]:
            priority = "0.3"
            changefreq = "yearly"

        # Build full URL
        full_url = f"{BASE_URL}{route}" if route != "/" else BASE_URL
        
        sitemap += f'''  <url>
    <loc>{full_url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="{full_url}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="{full_url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{full_url}"/>
  </url>
'''
    
    sitemap += '</urlset>'
    
    # Write main sitemap
    Path('public/sitemap.xml').write_text(sitemap, encoding='utf-8')
    
    # Clean up old invalid sitemaps if they exist
    deleted_count = 0
    for i in range(1, 20):
        old_file = Path(f'public/sitemap-{i}.xml')
        if old_file.exists():
            old_file.unlink()
            deleted_count += 1
            print(f"🗑️  Deleted invalid file: {old_file}")

    print(f"\n✅ CLEAN Sitemap generated successfully!")
    print(f"📊 Total Valid URLs: {len(VALID_ROUTES)}")
    print(f"🚫 Fake medication URLs removed: ALL (5000+)")
    if deleted_count > 0:
        print(f"🗑️  Deleted {deleted_count} old sitemap files")
    print(f"📄 File size: ~{len(sitemap)} bytes")
    print(f"\n🔍 Next steps:")
    print(f"   1. Deploy this sitemap")
    print(f"   2. Submit to Google Search Console")
    print(f"   3. Request removal of /prix/ prefix in GSC")

if __name__ == '__main__':
    print("🚀 Generating FIXED sitemap for Taawidaty...\n")
    generate_sitemap()
if __name__ == '__main__':
    print("🚀 Generating FIXED sitemap for Taawidaty...\n")
    generate_sitemap()

