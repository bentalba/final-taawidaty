#!/usr/bin/env python3
"""
Sitemap Generator for Taawidaty
Generates sitemap.xml with all medication URLs for SEO
Run with: python3 generate-sitemap.py
"""

import json
from datetime import datetime
from pathlib import Path
import re

BASE_URL = 'https://taawidaty.ma'

def generate_medication_slug(name):
    """Convert medication name to URL-friendly slug"""
    # Lowercase
    slug = name.lower()
    # Remove diacritics
    slug = slug.replace('é', 'e').replace('è', 'e').replace('ê', 'e')
    slug = slug.replace('à', 'a').replace('â', 'a')
    slug = slug.replace('ô', 'o').replace('ö', 'o')
    slug = slug.replace('ù', 'u').replace('û', 'u')
    slug = slug.replace('ç', 'c')
    slug = slug.replace('î', 'i').replace('ï', 'i')
    # Remove special characters except spaces and hyphens
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    # Remove duplicate hyphens
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def load_medications():
    """Load medications from both JSON files"""
    medications = []
    existing_names = set()
    
    # Load CNOPS medications
    try:
        with open('src/data/medications-cnops.json', 'r', encoding='utf-8') as f:
            cnops_data = json.load(f)
            medications.extend(cnops_data)
            existing_names.update(m['name'] for m in cnops_data)
            print(f"✅ Loaded {len(cnops_data)} CNOPS medications")
    except Exception as e:
        print(f"⚠️  Could not load CNOPS medications: {e}")
    
    # Load CNSS medications (avoid duplicates)
    try:
        with open('src/data/medications-cnss.json', 'r', encoding='utf-8') as f:
            cnss_data = json.load(f)
            unique_cnss = [m for m in cnss_data if m['name'] not in existing_names]
            medications.extend(unique_cnss)
            print(f"✅ Loaded {len(unique_cnss)} unique CNSS medications")
    except Exception as e:
        print(f"⚠️  Could not load CNSS medications: {e}")
    
    return medications

def generate_sitemap():
    """Generate complete sitemap.xml"""
    medications = load_medications()
    now = datetime.now().isoformat()
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Start XML
    sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Main Pages -->
  <url>
    <loc>{base}/</loc>
    <lastmod>{date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="{base}/" />
    <xhtml:link rel="alternate" hreflang="ar" href="{base}/" />
  </url>
  
  <url>
    <loc>{base}/prix-medicaments</loc>
    <lastmod>{date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="{base}/prix-medicaments" />
    <xhtml:link rel="alternate" hreflang="ar" href="{base}/prix-medicaments" />
  </url>
  
  <url>
    <loc>{base}/faq-cnops</loc>
    <lastmod>{date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>{base}/faq-cnss</loc>
    <lastmod>{date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Medication Pages (Top {count}) -->
'''.format(base=BASE_URL, date=today, count=min(len(medications), 5000))
    
    # Sort medications by price (assuming higher price = more searched)
    medications_sorted = sorted(medications, key=lambda m: m.get('ppv', 0), reverse=True)
    
    # Limit to 5000 for sitemap best practices
    top_medications = medications_sorted[:5000]
    
    # Add medication URLs
    for medication in top_medications:
        slug = generate_medication_slug(medication['name'])
        priority = '0.8' if medication.get('ppv', 0) > 100 else '0.6'
        
        sitemap += f'''  <url>
    <loc>{BASE_URL}/prix/{slug}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>{priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="{BASE_URL}/prix/{slug}" />
    <xhtml:link rel="alternate" hreflang="ar" href="{BASE_URL}/prix/{slug}" />
  </url>
'''
    
    sitemap += '</urlset>'
    
    # Write sitemap
    output_path = Path('public/sitemap.xml')
    output_path.write_text(sitemap, encoding='utf-8')
    
    print(f"\n✅ Sitemap generated successfully!")
    print(f"📊 Total URLs: {len(top_medications) + 4}")
    print(f"📝 Medications indexed: {len(top_medications)}")
    print(f"📄 File: {output_path.absolute()}")
    
    # Also generate URL list for Bing
    generate_url_list(top_medications)

def generate_url_list(medications):
    """Generate plain text URL list for Bing submission"""
    urls = [
        f"{BASE_URL}/",
        f"{BASE_URL}/prix-medicaments",
        f"{BASE_URL}/faq-cnops",
        f"{BASE_URL}/faq-cnss",
    ]
    
    for medication in medications:
        slug = generate_medication_slug(medication['name'])
        urls.append(f"{BASE_URL}/prix/{slug}")
    
    output_path = Path('public/urls.txt')
    output_path.write_text('\n'.join(urls), encoding='utf-8')
    
    print(f"📄 URL list: {output_path.absolute()}")

if __name__ == '__main__':
    print("🚀 Generating sitemap for Taawidaty...\n")
    generate_sitemap()
