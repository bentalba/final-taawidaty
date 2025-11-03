#!/usr/bin/env python3
"""
TAAWIDATY - Medication Database Scraper with Selenium
Author: BENTALBA ZAKARIA

This scraper uses Selenium to handle JavaScript pagination on medicament.ma
"""

import json
import time
import re
from typing import List, Dict
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# Base configuration
BASE_URL = "https://medicament.ma"

# Expected medication counts per letter (total: 5,396)
LETTER_COUNTS = {
    'A': 562, 'B': 174, 'C': 516, 'D': 345, 'E': 281, 'F': 180,
    'G': 154, 'H': 174, 'I': 221, 'J': 13, 'K': 83, 'L': 283,
    'M': 435, 'N': 267, 'O': 203, 'P': 478, 'Q': 16, 'R': 267,
    'S': 385, 'T': 271, 'U': 57, 'V': 137, 'W': 12, 'X': 51,
    'Y': 6, 'Z': 131
}


def setup_driver():
    """Initialize Selenium WebDriver with Chrome options"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Run in background
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
    
    driver = webdriver.Chrome(options=chrome_options)
    return driver


def scrape_letter_with_selenium(driver, letter: str, max_scrolls: int = 50) -> List[Dict]:
    """
    Scrape all medications for a given letter using Selenium to handle JavaScript loading
    
    Args:
        driver: Selenium WebDriver instance
        letter: Letter to scrape (A-Z)
        max_scrolls: Maximum number of scroll attempts (safety limit)
    
    Returns:
        List of medication dictionaries
    """
    medications = []
    url = f"{BASE_URL}/listing-des-medicaments/?lettre={letter}"
    
    print(f"\n📡 Scraping letter {letter} (expected: {LETTER_COUNTS.get(letter, 'unknown')})")
    print(f"   URL: {url}")
    
    try:
        driver.get(url)
        
        # Wait for table to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "table"))
        )
        
        previous_count = 0
        no_change_count = 0
        scroll_count = 0
        
        while scroll_count < max_scrolls:
            # Scroll to bottom to trigger lazy loading
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)  # Wait for content to load
            
            # Count current medications
            rows = driver.find_elements(By.CSS_SELECTOR, "table.table tr")
            current_count = len(rows) - 1  # Exclude header
            
            print(f"   Scroll {scroll_count + 1}: {current_count} medications loaded", end='\r')
            
            # Check if new content loaded
            if current_count == previous_count:
                no_change_count += 1
                if no_change_count >= 3:  # No change for 3 consecutive scrolls
                    print(f"\n   ✓ No more content loading (stable at {current_count})")
                    break
            else:
                no_change_count = 0
            
            previous_count = current_count
            scroll_count += 1
        
        # Extract all medications from loaded table
        rows = driver.find_elements(By.CSS_SELECTOR, "table.table tr")[1:]  # Skip header
        
        print(f"\n   📊 Extracting data from {len(rows)} rows...")
        
        for row in rows:
            try:
                # Find details span
                details_span = row.find_element(By.CLASS_NAME, "details")
                
                # Get all text content
                text_parts = details_span.text.split('\n')
                if not text_parts:
                    continue
                
                name = text_parts[0].strip()
                
                # Extract price from second line if available
                price = None
                if len(text_parts) > 1:
                    price_line = text_parts[1]
                    price_match = re.search(r'PPV:\s*(\d+[.,]\d+)', price_line)
                    if price_match:
                        price = float(price_match.group(1).replace(',', '.'))
                
                if name:
                    medications.append({
                        'name': name.upper(),
                        'publicPrice': price,
                        'letter': letter
                    })
                    
            except NoSuchElementException:
                continue
            except Exception as e:
                print(f"\n   ⚠️  Error parsing row: {e}")
                continue
        
        print(f"   ✅ Scraped {len(medications)} medications")
        
        # Check against expected count
        expected = LETTER_COUNTS.get(letter, 0)
        if expected and abs(len(medications) - expected) > 10:
            print(f"   ⚠️  WARNING: Expected ~{expected} but got {len(medications)}")
        
    except TimeoutException:
        print(f"   ❌ Timeout loading page for letter {letter}")
    except Exception as e:
        print(f"   ❌ Error scraping letter {letter}: {e}")
    
    return medications


def scrape_all_medications(letters: List[str] = None) -> List[Dict]:
    """
    Scrape medications from specified letters or all letters A-Z
    
    Args:
        letters: List of letters to scrape, or None for all
    
    Returns:
        Combined list of all medications
    """
    if letters is None:
        letters = [chr(i) for i in range(ord('A'), ord('Z') + 1)]
    
    all_medications = []
    driver = None
    
    try:
        print("🌐 Initializing Chrome WebDriver...")
        driver = setup_driver()
        print("✅ WebDriver ready\n")
        
        print("="*80)
        print(f"Starting scrape for {len(letters)} letter(s): {', '.join(letters)}")
        print("="*80)
        
        for letter in letters:
            meds = scrape_letter_with_selenium(driver, letter)
            all_medications.extend(meds)
            
            # Brief pause between letters
            if letter != letters[-1]:
                time.sleep(2)
        
        print("\n" + "="*80)
        print(f"✅ SCRAPING COMPLETE")
        print(f"   Total medications scraped: {len(all_medications)}")
        print("="*80)
        
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
    finally:
        if driver:
            driver.quit()
            print("\n🔌 WebDriver closed")
    
    return all_medications


def save_medications(medications: List[Dict], filename: str = "scraped_medications.json"):
    """Save medications to JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(medications, f, ensure_ascii=False, indent=2)
    print(f"\n💾 Saved {len(medications)} medications to {filename}")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Scrape medication data from medicament.ma using Selenium')
    parser.add_argument('--test', action='store_true', help='Test mode: only scrape letter A')
    parser.add_argument('--letters', type=str, help='Specific letters to scrape (e.g., "ABC")')
    parser.add_argument('--output', type=str, default='scraped_medications.json', help='Output filename')
    
    args = parser.parse_args()
    
    print("="*80)
    print("TAAWIDATY - Medication Database Scraper (Selenium)")
    print("Author: BENTALBA ZAKARIA")
    print("="*80)
    
    # Determine which letters to scrape
    if args.test:
        letters = ['A']
        args.output = 'test_medications_A_selenium.json'
        print("\n🧪 TEST MODE: Scraping letter A only\n")
    elif args.letters:
        letters = [l.upper() for l in args.letters if l.isalpha()]
        print(f"\n📋 Custom letters: {', '.join(letters)}\n")
    else:
        letters = None  # All letters
        print("\n🌍 FULL SCRAPE: All letters A-Z\n")
    
    # Scrape
    medications = scrape_all_medications(letters)
    
    # Save
    if medications:
        save_medications(medications, args.output)
        print(f"\n✅ Scraping complete: {len(medications)} medications saved")
    else:
        print("\n⚠️  No medications scraped")
