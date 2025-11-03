#!/usr/bin/env python3
"""
TAAWIDATY - Fix Reimbursement Rates
Author: BENTALBA ZAKARIA

Apply correct reimbursement logic to all medications based on:
1. Génériques: Default 70% reimbursement (Moroccan standard)
2. Princeps: Default 70% for common medications, 0% for special cases
3. Markers: [P], [V], [SS] typically 0% reimbursement
"""

import json
import re

def load_json(filename):
    """Load JSON file"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, filename):
    """Save JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def should_have_reimbursement(medication):
    """
    Determine if medication should have 70% reimbursement
    
    Logic:
    - Génériques: Default YES (70%)
    - Princeps: Check for special markers
    - [P] (Prescription): NO (0%) - Special prescription medications
    - [V] (Vaccine): NO (0%) - Vaccines
    - [SS] (Stupéfiant/Substance): NO (0%) - Controlled substances
    - Very expensive (>10,000 dhs): NO (0%) - Special expensive treatments
    """
    name = medication.get('name', '')
    med_type = medication.get('type', 'Princeps')
    ppv = medication.get('ppv', 0)
    
    # Check for special markers that indicate no reimbursement
    no_reimb_markers = ['[P]', '[V]', '[SS]', '[STUP]']
    for marker in no_reimb_markers:
        if marker in name:
            return False
    
    # Very expensive medications (>10,000 dhs) typically not reimbursed
    if ppv > 10000:
        return False
    
    # Génériques: Default 70% reimbursement
    if med_type == 'Générique':
        return True
    
    # Princeps: Default 70% unless special case
    # Check if it's a basic/common medication type
    common_forms = [
        'COMPRIMÉ', 'GÉLULE', 'SIROP', 'SUSPENSION', 'SOLUTION',
        'INJECTABLE', 'PERFUSION', 'POMMADE', 'CRÈME', 'GEL'
    ]
    
    for form in common_forms:
        if form in name.upper():
            return True
    
    # Default to 70% for Princeps unless identified as special
    return True

def calculate_reimbursement(ppv, taux_remb):
    """Calculate reimbursement amounts"""
    if taux_remb == 0:
        return 0.0, ppv
    
    reimbursement = ppv * (taux_remb / 100)
    patient_pays = ppv - reimbursement
    
    return round(reimbursement, 2), round(patient_pays, 2)

def fix_reimbursement_rates(db_file, output_file, insurance):
    """Fix reimbursement rates for all medications"""
    print(f"\n{'='*80}")
    print(f"Fixing Reimbursement Rates - {insurance}")
    print(f"{'='*80}")
    
    medications = load_json(db_file)
    
    stats = {
        'total': len(medications),
        'already_70': 0,
        'changed_to_70': 0,
        'kept_0': 0,
        'recalculated': 0
    }
    
    for med in medications:
        old_taux = med['taux_remb']
        ppv = med['ppv']
        
        # Determine correct reimbursement rate
        should_reimburse = should_have_reimbursement(med)
        new_taux = 70 if should_reimburse else 0
        
        # Update if different
        if old_taux != new_taux:
            med['taux_remb'] = new_taux
            if new_taux == 70:
                stats['changed_to_70'] += 1
            else:
                stats['kept_0'] += 1
        else:
            if old_taux == 70:
                stats['already_70'] += 1
            else:
                stats['kept_0'] += 1
        
        # Recalculate amounts
        reimbursement, patient_pays = calculate_reimbursement(ppv, med['taux_remb'])
        
        if (med['reimbursement_amount'] != reimbursement or 
            med['patient_pays'] != patient_pays):
            stats['recalculated'] += 1
        
        med['reimbursement_amount'] = reimbursement
        med['patient_pays'] = patient_pays
    
    # Save
    save_json(medications, output_file)
    
    # Report
    print(f"\n📊 Statistics:")
    print(f"  Total medications: {stats['total']}")
    print(f"  Already had 70%: {stats['already_70']}")
    print(f"  Changed to 70%: {stats['changed_to_70']}")
    print(f"  Kept at 0%: {stats['kept_0']}")
    print(f"  Amounts recalculated: {stats['recalculated']}")
    print(f"\n✅ Saved to: {output_file}")
    
    # Show some examples
    changed = [m for m in medications if should_have_reimbursement(m)][:5]
    if changed:
        print(f"\n💰 Sample medications with 70% reimbursement:")
        for m in changed:
            reimb = m['reimbursement_amount']
            patient = m['patient_pays']
            print(f"  {m['name'][:60]}")
            print(f"    PPV: {m['ppv']} dhs → Reimb: {reimb} dhs, Patient: {patient} dhs")
    
    return medications

def main():
    print("="*80)
    print("TAAWIDATY - Reimbursement Rate Fixer")
    print("Author: BENTALBA ZAKARIA")
    print("="*80)
    
    # Fix CNOPS
    print("\n🔄 Processing CNOPS database...")
    cnops = fix_reimbursement_rates(
        "src/data/medications-cnops.json",
        "src/data/medications-cnops-fixed.json",
        "CNOPS"
    )
    
    # Fix CNSS
    print("\n\n🔄 Processing CNSS database...")
    cnss = fix_reimbursement_rates(
        "src/data/medications-cnss.json",
        "src/data/medications-cnss-fixed.json",
        "CNSS"
    )
    
    print("\n" + "="*80)
    print("✅ REIMBURSEMENT FIX COMPLETE!")
    print("="*80)
    print("\n📁 New files created:")
    print("  - src/data/medications-cnops-fixed.json")
    print("  - src/data/medications-cnss-fixed.json")
    print("\n⚠️  Review the files, then replace originals:")
    print("  mv src/data/medications-cnops-fixed.json src/data/medications-cnops.json")
    print("  mv src/data/medications-cnss-fixed.json src/data/medications-cnss.json")
    print("="*80)

if __name__ == "__main__":
    main()
