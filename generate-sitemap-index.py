#!/usr/bin/env python3
"""
Sitemap Index Generator for Taawidaty
Creates multiple smaller sitemaps and a sitemap index for better crawling
Run with: python3 generate-sitemap-index.py
"""

import json
from datetime import datetime
from pathlib import Path
import re
import math

BASE_URL = 'https://taawidaty.ma'
URLS_PER_SITEMAP = 500  # Bing recommends max 1000, we'll use 500 for safety

def generate_medication_slug(name):
    """Convert medication name to URL-friendly slug"""
    slug = name.lower()
    slug = slug.replace('é', 'e').replace('è', 'e').replace('ê', 'e')
    slug = slug.replace('à', 'a').replace('â', 'a')
    slug = slug.replace('ô', 'o').replace('ö', 'o')
    slug = slug.replace('ù', 'u').replace('û', 'u')
    slug = slug.replace('ç', 'c')
    slug = slug.replace('î', 'i').replace('ï', 'i')
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def load_medications():
    """Load medications from both JSON files"""
    medications = []
    existing_names = set()
    
    try:
        with open('src/data/medications-cnops.json', 'r', encoding='utf-8') as f:
            cnops_data = json.load(f)
            medications.extend(cnops_data)
            existing_names.update(m['name'] for m in cnops_data)
            print(f"✅ Loaded {len(cnops_data)} CNOPS medications")
    except Exception as e:
        print(f"⚠️  Could not load CNOPS medications: {e}")
    
    try:
        with open('src/data/medications-cnss.json', 'r', encoding='utf-8') as f:
            cnss_data = json.load(f)
            unique_cnss = [m for m in cnss_data if m['name'] not in existing_names]
            medications.extend(unique_cnss)
            print(f"✅ Loaded {len(unique_cnss)} unique CNSS medications")
    except Exception as e:
        print(f"⚠️  Could not load CNSS medications: {e}")
    
    return medications

def create_sitemap_chunk(urls, chunk_number, today):
    """Create a single sitemap file"""
    sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
'''
    
    for url_data in urls:
        sitemap += f'''  <url>
    <loc>{url_data['loc']}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{url_data['changefreq']}</changefreq>
    <priority>{url_data['priority']}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="{url_data['loc']}" />
    <xhtml:link rel="alternate" hreflang="ar" href="{url_data['loc']}" />
  </url>
'''
    
    sitemap += '</urlset>'
    return sitemap

def generate_sitemap_index():
    """Generate sitemap index with multiple smaller sitemaps"""
    medications = load_medications()
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Sort medications by price (higher price = more searched)
    medications_sorted = sorted(medications, key=lambda m: m.get('ppv', 0), reverse=True)
    
    # Prepare all URLs
    all_urls = [
        {'loc': f'{BASE_URL}/', 'changefreq': 'daily', 'priority': '1.0'},
        {'loc': f'{BASE_URL}/prix-medicaments', 'changefreq': 'weekly', 'priority': '0.9'},
    ]
    
    # Add medication URLs
    for medication in medications_sorted[:5000]:
        slug = generate_medication_slug(medication['name'])
        priority = '0.8' if medication.get('ppv', 0) > 100 else '0.6'
        all_urls.append({
            'loc': f'{BASE_URL}/prix/{slug}',
            'changefreq': 'monthly',
            'priority': priority
        })
    
    print(f"\n📊 Total URLs to split: {len(all_urls)}")
    
    # Split into chunks
    num_chunks = math.ceil(len(all_urls) / URLS_PER_SITEMAP)
    print(f"📦 Creating {num_chunks} sitemap files ({URLS_PER_SITEMAP} URLs each)")
    
    sitemap_files = []
    
    for i in range(num_chunks):
        start_idx = i * URLS_PER_SITEMAP
        end_idx = min((i + 1) * URLS_PER_SITEMAP, len(all_urls))
        chunk_urls = all_urls[start_idx:end_idx]
        
        # Create sitemap file
        sitemap_content = create_sitemap_chunk(chunk_urls, i + 1, today)
        filename = f'sitemap-{i + 1}.xml' if i > 0 else 'sitemap.xml'
        filepath = Path(f'public/{filename}')
        filepath.write_text(sitemap_content, encoding='utf-8')
        
        sitemap_files.append(filename)
        print(f"  ✅ Created {filename} ({len(chunk_urls)} URLs)")
    
    # Create sitemap index
    sitemap_index = '''<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'''
    
    for filename in sitemap_files:
        sitemap_index += f'''  <sitemap>
    <loc>{BASE_URL}/{filename}</loc>
    <lastmod>{today}</lastmod>
  </sitemap>
'''
    
    sitemap_index += '</sitemapindex>'
    
    # Write sitemap index
    index_path = Path('public/sitemap-index.xml')
    index_path.write_text(sitemap_index, encoding='utf-8')
    
    print(f"\n✅ Sitemap index created: sitemap-index.xml")
    print(f"📄 Total sitemap files: {len(sitemap_files)}")
    print(f"📊 Total URLs indexed: {len(all_urls)}")
    
    # Also generate URL list for Bing
    generate_url_list(all_urls)
    
    # Create robots.txt with sitemap references
    create_robots_txt(sitemap_files)

def generate_url_list(all_urls):
    """Generate plain text URL list"""
    urls = [url_data['loc'] for url_data in all_urls]
    
    output_path = Path('public/urls.txt')
    output_path.write_text('\n'.join(urls), encoding='utf-8')
    
    print(f"📄 URL list: urls.txt ({len(urls)} URLs)")

def create_robots_txt(sitemap_files):
    """Create/update robots.txt with all sitemap references"""
    robots_content = '''# robots.txt for taawidaty.ma
# Last updated: 2025-11-09

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://taawidaty.ma/sitemap-index.xml
'''
    
    for filename in sitemap_files:
        robots_content += f'Sitemap: https://taawidaty.ma/{filename}\n'
    
    robots_path = Path('public/robots.txt')
    robots_path.write_text(robots_content, encoding='utf-8')
    
    print(f"📄 Updated: robots.txt")

if __name__ == '__main__':
    print("🚀 Generating sitemap index for Taawidaty...\n")
    generate_sitemap_index()
    print("\n✅ Done! Submit sitemap-index.xml to Bing Webmaster Tools")
    print("📝 Submit individual sitemaps if needed:")
    print("   - sitemap.xml")
    print("   - sitemap-2.xml")
    print("   - sitemap-3.xml")
    print("   - etc.")
