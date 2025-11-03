#!/usr/bin/env python3
"""
TAAWIDATY - Medication Database Scraper
Author: BENTALBA ZAKARIA
Copyright: 2025 BENTALBA ZAKARIA

Scrapes medication data from medicament.ma to update CNOPS/CNSS database
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from typing import List, Dict
import sys

# Configuration
BASE_URL = "https://medicament.ma"
LETTERS = [chr(i) for i in range(ord('A'), ord('Z') + 1)]  # A-Z
MEDICATIONS_PER_PAGE = 20

# Letter counts from medicament.ma (total: 5,396)
LETTER_COUNTS = {
    'A': 562, 'B': 174, 'C': 516, 'D': 345, 'E': 281, 'F': 180,
    'G': 154, 'H': 174, 'I': 221, 'J': 13, 'K': 83, 'L': 283,
    'M': 435, 'N': 267, 'O': 203, 'P': 478, 'Q': 16, 'R': 267,
    'S': 385, 'T': 271, 'U': 57, 'V': 137, 'W': 12, 'X': 51,
    'Y': 6, 'Z': 131
}

def get_total_pages(letter: str) -> int:
    """Calculate total pages for a letter based on medication count"""
    count = LETTER_COUNTS.get(letter, 0)
    return (count + MEDICATIONS_PER_PAGE - 1) // MEDICATIONS_PER_PAGE  # Ceiling division

def scrape_medication_page(letter: str, page: int = 1) -> List[Dict]:
    """
    Scrape medications from a specific letter and page
    
    Args:
        letter: Letter to scrape (A-Z)
        page: Page number (starts at 1)
    
    Returns:
        List of medication dictionaries with name and price
    """
    medications = []
    
    # Build URL with pagination
    # Page 1: ?lettre=A
    # Page 2+: /page/2/?lettre=A
    if page == 1:
        url = f"{BASE_URL}/listing-des-medicaments/?lettre={letter}"
    else:
        url = f"{BASE_URL}/listing-des-medicaments/page/{page}/?lettre={letter}"
    
    try:
        # Add headers to mimic browser
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find medication table
        table = soup.find('table', class_='table')
        
        if not table:
            # No table means we've reached beyond available pages
            return medications
        
        # Find all medication rows
        rows = table.find_all('tr')[1:]  # Skip header row
        
        for row in rows:
            try:
                # Find the details span
                details_span = row.find('span', class_='details')
                if not details_span:
                    continue
                
                # Extract medication name (first text before <br>)
                name_parts = list(details_span.stripped_strings)
                if len(name_parts) < 2:
                    continue
                
                name = name_parts[0].strip()
                
                # Extract price from the small span
                small_span = details_span.find('span', class_='small')
                price = None
                
                if small_span:
                    price_text = small_span.get_text()
                    # Extract price: "Boite de X - PPV: XX.XX dhs"
                    price_match = re.search(r'PPV:\s*(\d+[.,]\d+)', price_text)
                    if price_match:
                        price = float(price_match.group(1).replace(',', '.'))
                
                if name:
                    medications.append({
                        'name': name.upper(),
                        'publicPrice': price,
                        'letter': letter
                    })
                    
            except Exception as e:
                print(f"   ⚠️  Error parsing row: {e}")
                continue
        
        # Delay to be respectful to the server
        time.sleep(0.5)
        
    except requests.RequestException as e:
        print(f"   ❌ Error fetching page {page}: {e}")
    
    return medications

def scrape_all_medications() -> List[Dict]:
    """
    Scrape all medications from A-Z
    
    Returns:
        List of all medication dictionaries
    """
    all_medications = []
    total_expected = sum(LETTER_COUNTS.values())
    
    print(f"\n🚀 Starting scrape of {total_expected} medications across {len(LETTERS)} letters\n")
    
    for letter in LETTERS:
        total_pages = get_total_pages(letter)
        expected_count = LETTER_COUNTS[letter]
        
        print(f"\n📋 Letter {letter}: {expected_count} medications, {total_pages} pages")
        print("=" * 60)
        
        letter_medications = []
        
        for page in range(1, total_pages + 1):
            page_medications = scrape_medication_page(letter, page)
            letter_medications.extend(page_medications)
            
            print(f"   Page {page}/{total_pages}: {len(page_medications)} medications")
        
        all_medications.extend(letter_medications)
        
        print(f"✅ Letter {letter} complete: {len(letter_medications)}/{expected_count} medications")
        
        # Progress update
        print(f"\n📊 Progress: {len(all_medications)}/{total_expected} medications ({len(all_medications)/total_expected*100:.1f}%)\n")
    
    return all_medications

def save_medications(medications: List[Dict], filename: str):
    """Save medications to JSON file"""
    print(f"\n💾 Saving {len(medications)} medications to {filename}")
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(medications, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Saved successfully!")

def main():
    """Main execution"""
    print("=" * 80)
    print("TAAWIDATY - Medication Database Scraper")
    print("Author: BENTALBA ZAKARIA")
    print("=" * 80)
    
    # Test mode: scrape only letter A first
    if len(sys.argv) > 1 and sys.argv[1] == '--test':
        print("\n🧪 TEST MODE: Scraping letter A only\n")
        test_meds = []
        total_pages = get_total_pages('A')
        
        for page in range(1, total_pages + 1):
            page_meds = scrape_medication_page('A', page)
            test_meds.extend(page_meds)
            print(f"Page {page}/{total_pages}: {len(page_meds)} medications")
        
        save_medications(test_meds, 'test_medications_A.json')
        print(f"\n✅ Test complete: {len(test_meds)} medications scraped from letter A")
        print("📁 Saved to: test_medications_A.json")
        return
    
    # Full scrape
    medications = scrape_all_medications()
    
    # Save results
    save_medications(medications, 'scraped_medications_raw.json')
    
    # Summary
    print("\n" + "=" * 80)
    print("📊 SCRAPING SUMMARY")
    print("=" * 80)
    print(f"Total medications scraped: {len(medications)}")
    print(f"Expected total: {sum(LETTER_COUNTS.values())}")
    print(f"Success rate: {len(medications)/sum(LETTER_COUNTS.values())*100:.1f}%")
    print("\n✅ Scraping complete!")
    print("📁 Output file: scraped_medications_raw.json")
    print("\nNext steps:")
    print("1. Review the scraped data")
    print("2. Map to CNOPS/CNSS databases")
    print("3. Update medications-cnops.json and medications-cnss.json")
    print("=" * 80)

if __name__ == "__main__":
    main()
