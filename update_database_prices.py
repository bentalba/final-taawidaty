#!/usr/bin/env python3
"""
Update CNOPS/CNSS databases with scraped medication prices
Author: BENTALBA ZAKARIA
"""

import json
import re
from difflib import SequenceMatcher

def load_json(filename):
    """Load JSON file"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, filename):
    """Save JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ Saved {len(data)} medications to {filename}")

def normalize_name(name):
    """Normalize medication name for matching"""
    # Remove special characters and extra spaces
    name = re.sub(r'[^\w\s]', ' ', name.upper())
    name = re.sub(r'\s+', ' ', name).strip()
    return name

def similarity(a, b):
    """Calculate similarity between two strings"""
    return SequenceMatcher(None, normalize_name(a), normalize_name(b)).ratio()

def find_best_match(med_name, scraped_dict, threshold=0.85):
    """Find best matching medication from scraped data using dictionary lookup"""
    norm_name = normalize_name(med_name)
    
    # Try exact match first
    if norm_name in scraped_dict:
        return scraped_dict[norm_name], 1.0
    
    # Try partial matches (first few words)
    words = norm_name.split()
    for i in range(min(4, len(words)), 0, -1):
        partial = ' '.join(words[:i])
        if partial in scraped_dict:
            return scraped_dict[partial], 0.9
    
    # No good match found
    return None, 0

def update_database(db_file, scraped_file, output_file):
    """Update database with scraped prices"""
    print(f"\n📊 Updating {db_file}")
    print("=" * 60)
    
    # Load data
    db_meds = load_json(db_file)
    scraped_meds = load_json(scraped_file)
    
    print(f"Database medications: {len(db_meds)}")
    print(f"Scraped medications: {len(scraped_meds)}")
    
    # Create dictionary for faster lookup
    print("Building lookup dictionary...")
    scraped_dict = {}
    for med in scraped_meds:
        if med['publicPrice'] is not None:
            norm = normalize_name(med['name'])
            # Keep the first occurrence (or cheapest if multiple)
            if norm not in scraped_dict or med['publicPrice'] < scraped_dict[norm]['publicPrice']:
                scraped_dict[norm] = med
    
    print(f"Dictionary size: {len(scraped_dict)}")
    
    # Update prices
    updated_count = 0
    matched_count = 0
    price_changed_count = 0
    
    for i, db_med in enumerate(db_meds):
        if i % 1000 == 0:
            print(f"  Processing {i}/{len(db_meds)}...", flush=True)
        
        med_name = db_med.get('name', '')
        
        # Find match in scraped data
        match, score = find_best_match(med_name, scraped_dict)
        
        if match and match['publicPrice'] is not None:
            matched_count += 1
            old_price = db_med.get('ppv')
            new_price = match['publicPrice']
            
            if old_price != new_price:
                price_changed_count += 1
                # Update PPV (Public Price)
                db_med['ppv'] = new_price
                # Also update prix_br if it exists
                if 'prix_br' in db_med:
                    db_med['prix_br'] = new_price
                # Recalculate patient cost if needed
                taux_remb = db_med.get('taux_remb', 0)
                if taux_remb > 0:
                    reimbursement = new_price * (taux_remb / 100)
                    db_med['reimbursement_amount'] = round(reimbursement, 2)
                    db_med['patient_pays'] = round(new_price - reimbursement, 2)
                else:
                    db_med['patient_pays'] = new_price
                
                updated_count += 1
                
                if updated_count <= 5:  # Show first 5 updates
                    print(f"  Updated: {med_name}")
                    print(f"    {old_price} dhs → {new_price} dhs (match: {score:.2%})")
    
    # Save updated database
    save_json(db_meds, output_file)
    
    print(f"\n📈 Statistics:")
    print(f"  Matched: {matched_count}/{len(db_meds)} ({matched_count/len(db_meds)*100:.1f}%)")
    print(f"  Price changes: {price_changed_count}")
    print(f"  Updates applied: {updated_count}")
    
    return db_meds

def main():
    print("=" * 80)
    print("TAAWIDATY - Database Price Updater")
    print("Author: BENTALBA ZAKARIA")
    print("=" * 80)
    
    scraped_file = "scraped_medications_raw.json"
    
    # Update CNOPS database
    cnops_updated = update_database(
        "src/data/medications-cnops.json",
        scraped_file,
        "src/data/medications-cnops.json.new"
    )
    
    # Update CNSS database
    cnss_updated = update_database(
        "src/data/medications-cnss.json",
        scraped_file,
        "src/data/medications-cnss.json.new"
    )
    
    print("\n" + "=" * 80)
    print("✅ UPDATE COMPLETE!")
    print("=" * 80)
    print("\n📁 New files created:")
    print("  - src/data/medications-cnops.json.new")
    print("  - src/data/medications-cnss.json.new")
    print("\n⚠️  Review the changes, then rename .new files to replace originals:")
    print("  mv src/data/medications-cnops.json.new src/data/medications-cnops.json")
    print("  mv src/data/medications-cnss.json.new src/data/medications-cnss.json")
    print("=" * 80)

if __name__ == "__main__":
    main()
