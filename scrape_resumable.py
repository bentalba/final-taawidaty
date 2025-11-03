#!/usr/bin/env python3
"""
Resume-capable scraper - can pick up where it left off
Author: BENTALBA ZAKARIA
"""

import json
import os
from scrape_medicament_ma import (
    scrape_medication_page, get_total_pages, save_medications,
    LETTERS, LETTER_COUNTS
)

OUTPUT_FILE = "scraped_medications_raw.json"
PROGRESS_FILE = "scrape_progress.json"

def load_progress():
    """Load existing scraped data and progress"""
    medications = []
    completed_letters = set()
    
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r') as f:
            medications = json.load(f)
            # Track which letters are complete
            for med in medications:
                letter = med.get('letter')
                if letter:
                    expected = LETTER_COUNTS.get(letter, 0)
                    actual = len([m for m in medications if m.get('letter') == letter])
                    if actual >= expected - 5:  # Within 5 medications = complete
                        completed_letters.add(letter)
    
    return medications, completed_letters

def main():
    print("=" * 80)
    print("TAAWIDATY - Resumable Medication Scraper")
    print("Author: BENTALBA ZAKARIA")
    print("=" * 80)
    
    # Load existing progress
    all_meds, completed = load_progress()
    
    if completed:
        print(f"\n📂 Loaded {len(all_meds)} medications from previous run")
        print(f"✅ Completed letters: {', '.join(sorted(completed))}")
    
    remaining_letters = [l for l in LETTERS if l not in completed]
    
    if not remaining_letters:
        print("\n🎉 All letters already complete!")
        return
    
    print(f"\n📋 Remaining letters: {', '.join(remaining_letters)} ({len(remaining_letters)}/26)")
    print(f"🎯 Starting from letter {remaining_letters[0]}\n")
    
    total_expected = sum(LETTER_COUNTS.values())
    
    for letter in remaining_letters:
        total_pages = get_total_pages(letter)
        expected = LETTER_COUNTS[letter]
        
        print(f"\n📋 Letter {letter}: {expected} medications, {total_pages} pages")
        print("=" * 60)
        
        letter_meds = []
        
        for page in range(1, total_pages + 1):
            meds = scrape_medication_page(letter, page)
            letter_meds.extend(meds)
            print(f"   Page {page}/{total_pages}: {len(meds)} medications", flush=True)
        
        all_meds.extend(letter_meds)
        
        print(f"✅ Letter {letter} complete: {len(letter_meds)}/{expected} medications")
        
        # Save progress after each letter
        save_medications(all_meds, OUTPUT_FILE)
        
        # Progress update
        progress_pct = len(all_meds) / total_expected * 100
        print(f"📊 Progress: {len(all_meds)}/{total_expected} medications ({progress_pct:.1f}%)\n", flush=True)
    
    print("\n" + "=" * 80)
    print("📊 SCRAPING COMPLETE!")
    print(f"   Total: {len(all_meds)}/{total_expected} medications")
    print(f"   Success rate: {len(all_meds)/total_expected*100:.1f}%")
    print(f"📁 Saved to: {OUTPUT_FILE}")
    print("=" * 80)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted! Progress saved. Run again to resume.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Progress saved. Run again to resume.")
