#!/usr/bin/env python3
"""
TAAWIDATY - Smart Database Merger
Author: BENTALBA ZAKARIA

Merges scraped medication data with existing CNOPS/CNSS databases:
- Updates prices from scraped data (2025 current prices)
- Adds new medications found in scraped data
- Preserves existing database structure
- Processes letter by letter for transparency
"""

import json
import re
from typing import List, Dict, Tuple
from datetime import datetime

def load_json(filename):
    """Load JSON file"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, filename):
    """Save JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def extract_base_name(full_name: str) -> str:
    """
    Extract base medication name from full name
    Examples:
    - "A.V.T. , COMPRIMÉ EFFERVESCENT" -> "AVT"
    - "ABIP 15 MG, COMPRIMÉ PELLICULÉ [P]" -> "ABIP"
    - "ALFACEFAL 125 MG/5 ML" -> "ALFACEFAL"
    """
    # Remove everything after comma, parenthesis, or dosage indicators
    base = re.split(r'[,\(]|\d+\s*(MG|ML|G|MCG|UI|%)', full_name, 1)[0]
    # Remove special characters and extra spaces
    base = re.sub(r'[^\w\s]', '', base)
    base = re.sub(r'\s+', ' ', base).strip().upper()
    return base

def find_match_in_db(scraped_name: str, db_medications: List[Dict]) -> Tuple[Dict, float]:
    """
    Find matching medication in database
    Returns (medication, confidence_score)
    """
    scraped_base = extract_base_name(scraped_name)
    
    best_match = None
    best_score = 0
    
    for db_med in db_medications:
        db_base = extract_base_name(db_med['name'])
        
        # Exact base name match
        if scraped_base == db_base:
            # Check if dosage info matches too
            if scraped_name.upper() in db_med['name'].upper() or db_med['name'].upper() in scraped_name.upper():
                return db_med, 1.0
            if best_score < 0.9:
                best_match = db_med
                best_score = 0.9
        
        # Partial match
        elif scraped_base in db_base or db_base in scraped_base:
            if best_score < 0.7:
                best_match = db_med
                best_score = 0.7
    
    return best_match, best_score

def create_new_medication_entry(scraped_med: Dict, next_id: int, insurance: str) -> Dict:
    """
    Create a new medication entry in database format from scraped data
    """
    full_name = scraped_med['name']
    base_name = extract_base_name(full_name)
    
    # Try to extract dosage and form from full name
    dosage = ""
    forme = ""
    
    # Extract dosage (e.g., "15 MG", "5 ML")
    dosage_match = re.search(r'(\d+[\.,]?\d*\s*(MG|ML|G|MCG|UI|%)(?:/\d+\s*(MG|ML|G|MCG|UI|%)?)?)', full_name, re.IGNORECASE)
    if dosage_match:
        dosage = dosage_match.group(1).upper()
    
    # Extract form (after comma)
    if ',' in full_name:
        forme = full_name.split(',', 1)[1].strip()
        # Remove dosage info from form if present
        forme = re.sub(r'\[.*?\]', '', forme).strip()
    
    price = scraped_med['publicPrice'] if scraped_med['publicPrice'] else 0.0
    
    return {
        "id": next_id,
        "name": full_name,
        "dci": "",  # Not available in scraped data
        "dosage": dosage,
        "forme": forme,
        "presentation": "",
        "ppv": price,
        "prix_br": price,
        "taux_remb": 0,
        "reimbursement_amount": 0.0,
        "patient_pays": price,
        "type": "Princeps",  # Default
        "insurance": insurance
    }

def merge_letter(letter: str, db_meds: List[Dict], scraped_meds: List[Dict], 
                 insurance: str, next_id: int) -> Tuple[List[Dict], Dict]:
    """
    Merge scraped data for a specific letter into database
    Returns (updated_medications, stats)
    """
    stats = {
        'db_count': len(db_meds),
        'scraped_count': len(scraped_meds),
        'matched': 0,
        'price_updated': 0,
        'new_added': 0,
        'price_changes': []
    }
    
    print(f"\n{'='*60}")
    print(f"📋 Processing Letter {letter}")
    print(f"{'='*60}")
    print(f"  Database: {len(db_meds)} medications")
    print(f"  Scraped: {len(scraped_meds)} medications")
    
    # Track which scraped meds are matched
    matched_scraped_indices = set()
    
    # Update existing medications
    for db_med in db_meds:
        for idx, scraped_med in enumerate(scraped_meds):
            if scraped_med['publicPrice'] is None:
                continue
                
            match, score = find_match_in_db(scraped_med['name'], [db_med])
            
            if match and score >= 0.85:
                stats['matched'] += 1
                matched_scraped_indices.add(idx)
                
                old_price = db_med['ppv']
                new_price = scraped_med['publicPrice']
                
                if abs(old_price - new_price) > 0.01:  # Price changed
                    stats['price_updated'] += 1
                    stats['price_changes'].append({
                        'name': db_med['name'],
                        'old': old_price,
                        'new': new_price
                    })
                    
                    # Update prices
                    db_med['ppv'] = new_price
                    db_med['prix_br'] = new_price
                    
                    # Recalculate reimbursement
                    taux_remb = db_med.get('taux_remb', 0)
                    if taux_remb > 0:
                        reimbursement = new_price * (taux_remb / 100)
                        db_med['reimbursement_amount'] = round(reimbursement, 2)
                        db_med['patient_pays'] = round(new_price - reimbursement, 2)
                    else:
                        db_med['patient_pays'] = new_price
                
                break
    
    # Add new medications (not matched)
    new_medications = []
    for idx, scraped_med in enumerate(scraped_meds):
        if idx not in matched_scraped_indices and scraped_med['publicPrice'] is not None:
            # Check if it's truly new (not just unmatched)
            match, score = find_match_in_db(scraped_med['name'], db_meds)
            if not match or score < 0.85:
                new_med = create_new_medication_entry(scraped_med, next_id, insurance)
                new_medications.append(new_med)
                stats['new_added'] += 1
                next_id += 1
    
    # Combine and sort
    all_meds = db_meds + new_medications
    all_meds.sort(key=lambda x: x['name'])
    
    # Print stats
    print(f"\n  ✅ Results:")
    print(f"     Matched & checked: {stats['matched']}")
    print(f"     Prices updated: {stats['price_updated']}")
    print(f"     New medications added: {stats['new_added']}")
    print(f"     Total for {letter}: {len(all_meds)}")
    
    # Show some price changes
    if stats['price_changes'][:3]:
        print(f"\n  💰 Sample price updates:")
        for change in stats['price_changes'][:3]:
            print(f"     {change['name']}: {change['old']} → {change['new']} dhs")
    
    return all_meds, stats, next_id

def merge_all_letters(db_file: str, scraped_file: str, output_file: str, insurance: str):
    """
    Merge all letters from scraped data into database
    """
    print(f"\n{'='*80}")
    print(f"TAAWIDATY - Smart Database Merger")
    print(f"Author: BENTALBA ZAKARIA")
    print(f"Database: {insurance}")
    print(f"{'='*80}")
    
    # Load data
    db_meds = load_json(db_file)
    scraped_meds = load_json(scraped_file)
    
    print(f"\n📊 Initial Stats:")
    print(f"  Database medications: {len(db_meds)}")
    print(f"  Scraped medications: {len(scraped_meds)}")
    
    # Get next available ID
    next_id = max(m['id'] for m in db_meds) + 1
    
    # Process letter by letter
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    all_updated_meds = []
    total_stats = {
        'matched': 0,
        'price_updated': 0,
        'new_added': 0,
        'total_price_changes': 0
    }
    
    for letter in letters:
        # Filter by letter
        db_letter = [m for m in db_meds if m['name'].startswith(letter)]
        scraped_letter = [m for m in scraped_meds if m['letter'] == letter]
        
        if not db_letter and not scraped_letter:
            continue
        
        # Merge this letter
        updated_meds, stats, next_id = merge_letter(
            letter, db_letter, scraped_letter, insurance, next_id
        )
        
        # Accumulate stats
        total_stats['matched'] += stats['matched']
        total_stats['price_updated'] += stats['price_updated']
        total_stats['new_added'] += stats['new_added']
        total_stats['total_price_changes'] += len(stats['price_changes'])
        
        # Remove old medications for this letter from db_meds
        db_meds = [m for m in db_meds if not m['name'].startswith(letter)]
        
        # Add updated medications
        all_updated_meds.extend(updated_meds)
    
    # Add any remaining medications (those not starting with A-Z)
    all_updated_meds.extend(db_meds)
    
    # Sort by ID
    all_updated_meds.sort(key=lambda x: x['id'])
    
    # Re-assign sequential IDs
    for idx, med in enumerate(all_updated_meds, 1):
        med['id'] = idx
    
    # Save
    save_json(all_updated_meds, output_file)
    
    # Final report
    print(f"\n{'='*80}")
    print(f"📊 FINAL STATISTICS")
    print(f"{'='*80}")
    print(f"  Original database size: {len(load_json(db_file))}")
    print(f"  Updated database size: {len(all_updated_meds)}")
    print(f"  New medications added: {total_stats['new_added']}")
    print(f"  Prices updated: {total_stats['price_updated']}")
    print(f"  Total matches checked: {total_stats['matched']}")
    print(f"\n  💾 Saved to: {output_file}")
    print(f"{'='*80}")

def main():
    scraped_file = "scraped_medications_raw.json"
    
    # Merge CNOPS
    print("\n🔄 Merging CNOPS database...")
    merge_all_letters(
        "src/data/medications-cnops.json",
        scraped_file,
        "src/data/medications-cnops-updated.json",
        "CNOPS"
    )
    
    # Merge CNSS
    print("\n\n🔄 Merging CNSS database...")
    merge_all_letters(
        "src/data/medications-cnss.json",
        scraped_file,
        "src/data/medications-cnss-updated.json",
        "CNSS"
    )
    
    print("\n" + "="*80)
    print("✅ MERGE COMPLETE!")
    print("="*80)
    print("\n📁 New files created:")
    print("  - src/data/medications-cnops-updated.json")
    print("  - src/data/medications-cnss-updated.json")
    print("\n⚠️  Review the files, then replace originals:")
    print("  mv src/data/medications-cnops-updated.json src/data/medications-cnops.json")
    print("  mv src/data/medications-cnss-updated.json src/data/medications-cnss.json")
    print("="*80)

if __name__ == "__main__":
    main()
