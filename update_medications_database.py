#!/usr/bin/env python3
"""
Update medication database with barcode and accurate pricing from official guide
"""

import json
from pathlib import Path
from typing import Dict, List
import re

def normalize_name(name: str) -> str:
    """Normalize medication name for matching"""
    if not name:
        return ""
    # Remove extra spaces, convert to upper, remove special chars
    name = str(name).upper().strip()
    name = re.sub(r'\s+', ' ', name)
    return name

def normalize_dci(dci: str) -> str:
    """Normalize DCI name"""
    if not dci:
        return ""
    dci = str(dci).upper().strip()
    dci = re.sub(r'\s+', ' ', dci)
    return dci

def parse_dosage(form_dosage: str) -> tuple:
    """Extract form and dosage from combined string"""
    if not form_dosage:
        return "", ""
    
    form_dosage = str(form_dosage).strip()
    
    # Try to split by "à" or "a" (French form separator)
    if ' à ' in form_dosage.lower() or ' a ' in form_dosage.lower():
        parts = re.split(r'\s+[àa]\s+', form_dosage, flags=re.IGNORECASE, maxsplit=1)
        if len(parts) == 2:
            return parts[0].strip(), parts[1].strip()
    
    # Try to find dosage pattern (number + unit)
    dosage_match = re.search(r'(\d+(?:[.,]\d+)?\s*(?:MG|G|ML|L|UI|%|MCG))', form_dosage, re.IGNORECASE)
    if dosage_match:
        dosage = dosage_match.group(1)
        forme = form_dosage.replace(dosage, '').strip()
        return forme, dosage
    
    return form_dosage, ""

def load_guide_data(file_path: Path) -> List[Dict]:
    """Load and parse guide medications data"""
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    medications = []
    
    # Skip header rows (first 4 rows)
    for row in raw_data[4:]:
        # Skip empty rows
        if not row.get('Column_1'):  # Skip if no name
            continue
        
        try:
            barcode = row.get('ASSURANCE MALADIE OBLIGATOIRE')
            # Convert float barcode to string, remove decimal
            if barcode is not None:
                barcode = str(int(float(barcode))) if isinstance(barcode, (int, float)) else str(barcode)
            else:
                barcode = None
            
            name = row.get('Column_1', '')
            dci = row.get('Column_2', '')
            form_dosage = row.get('Column_3', '')
            presentation = row.get('Column_4', '')
            ppv = float(row.get('Column_5', 0)) if row.get('Column_5') else 0
            prix_br_ppv = float(row.get('Column_6', 0)) if row.get('Column_6') else 0
            ph = float(row.get('Column_7', 0)) if row.get('Column_7') else 0
            prix_br_ph = float(row.get('Column_8', 0)) if row.get('Column_8') else 0
            classe_therapeutique = row.get('Column_9', '')
            type_med = row.get('Column_10', '')
            
            # Parse form and dosage
            forme, dosage = parse_dosage(form_dosage)
            
            # Determine type (Princeps or Generic)
            med_type = "Princeps" if type_med and 'P' in str(type_med).upper() else "Générique"
            
            med = {
                'barcode': barcode,
                'name': name.strip() if name else '',
                'dci': dci.strip() if dci else '',
                'dosage': dosage,
                'forme': forme,
                'presentation': presentation.strip() if presentation else '',
                'ppv': ppv,
                'prix_br': prix_br_ppv,  # Use PPV base reimbursement as standard
                'ph': ph,
                'prix_br_ph': prix_br_ph,
                'classe_therapeutique': classe_therapeutique.strip() if classe_therapeutique else '',
                'type': med_type,
                'name_normalized': normalize_name(name),
                'dci_normalized': normalize_dci(dci)
            }
            
            medications.append(med)
        except Exception as e:
            print(f"⚠️  Error processing row: {e}")
            print(f"   Row data: {row}")
            continue
    
    return medications

def match_medications(guide_meds: List[Dict], current_meds: List[Dict]) -> tuple:
    """Match guide medications with current database"""
    
    # Create lookup dictionaries
    guide_by_name_dci = {}
    guide_by_barcode = {}
    
    for med in guide_meds:
        key = (med['name_normalized'], med['dci_normalized'])
        guide_by_name_dci[key] = med
        if med['barcode']:
            guide_by_barcode[med['barcode']] = med
    
    matched = []
    unmatched_current = []
    
    for current_med in current_meds:
        current_name_norm = normalize_name(current_med.get('name', ''))
        current_dci_norm = normalize_dci(current_med.get('dci', ''))
        key = (current_name_norm, current_dci_norm)
        
        if key in guide_by_name_dci:
            guide_med = guide_by_name_dci[key]
            matched.append({
                'current': current_med,
                'guide': guide_med
            })
        else:
            unmatched_current.append(current_med)
    
    return matched, unmatched_current

def update_database(db_path: Path, guide_meds: List[Dict], insurance_type: str):
    """Update medication database"""
    
    # Load current database
    with open(db_path, 'r', encoding='utf-8') as f:
        current_meds = json.load(f)
    
    print(f"\n{'='*60}")
    print(f"📊 {insurance_type.upper()} DATABASE UPDATE")
    print(f"{'='*60}")
    print(f"📚 Current database: {len(current_meds)} medications")
    print(f"📖 Guide medications: {len(guide_meds)} medications")
    
    # Match medications
    matched, unmatched_current = match_medications(guide_meds, current_meds)
    
    print(f"\n✅ Matched: {len(matched)} medications")
    print(f"⚠️  Unmatched (current DB): {len(unmatched_current)} medications")
    
    # Update matched medications
    updated_meds = []
    
    for match in matched:
        current = match['current']
        guide = match['guide']
        
        # Calculate reimbursement (70% standard rate for Morocco)
        taux_remb = current.get('taux_remb', 70)
        ppv = guide['ppv']
        prix_br = guide['prix_br']
        
        reimbursement = (prix_br * taux_remb) / 100
        patient_pays = max(0, ppv - reimbursement)
        
        updated_med = {
            'id': current['id'],
            'barcode': guide['barcode'],
            'name': guide['name'],  # Use official name from guide
            'dci': guide['dci'],  # Use official DCI from guide
            'dosage': guide['dosage'],
            'forme': guide['forme'],
            'presentation': guide['presentation'],
            'ppv': ppv,
            'prix_br': prix_br,
            'ph': guide['ph'],
            'prix_br_ph': guide['prix_br_ph'],
            'taux_remb': taux_remb,
            'reimbursement_amount': round(reimbursement, 2),
            'patient_pays': round(patient_pays, 2),
            'classe_therapeutique': guide['classe_therapeutique'],
            'type': guide['type'],
            'insurance': insurance_type.upper()
        }
        
        updated_meds.append(updated_med)
    
    # Keep unmatched medications but without barcode
    for unmatch in unmatched_current:
        med = unmatch.copy()
        med['barcode'] = None  # No barcode available
        updated_meds.append(med)
    
    # Sort by ID
    updated_meds.sort(key=lambda x: x['id'])
    
    # Save updated database
    with open(db_path, 'w', encoding='utf-8') as f:
        json.dump(updated_meds, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Updated database saved: {db_path}")
    print(f"📊 Total medications: {len(updated_meds)}")
    print(f"   - With barcode: {len([m for m in updated_meds if m.get('barcode')])}")
    print(f"   - Without barcode: {len([m for m in updated_meds if not m.get('barcode')])}")
    
    # Show sample updates
    if matched:
        print(f"\n📝 Sample updates (first 3):")
        for i, match in enumerate(matched[:3], 1):
            current = match['current']
            guide = match['guide']
            print(f"\n   {i}. {guide['name']}")
            print(f"      Barcode: {guide['barcode']}")
            print(f"      PPV: {current.get('ppv')} → {guide['ppv']} MAD")
            print(f"      DCI: {guide['dci']}")
    
    return len(matched), len(unmatched_current)

def main():
    base_path = Path(__file__).parent
    
    # Load guide data
    guide_file = base_path / "guide_medications_extracted.json"
    if not guide_file.exists():
        print("❌ guide_medications_extracted.json not found!")
        print("   Run read_numbers_file.py first")
        return
    
    print("📖 Loading guide medications...")
    guide_meds = load_guide_data(guide_file)
    print(f"✅ Loaded {len(guide_meds)} medications from guide")
    
    # Show sample
    if guide_meds:
        print(f"\n📝 Sample medication from guide:")
        sample = guide_meds[0]
        print(f"   Name: {sample['name']}")
        print(f"   Barcode: {sample['barcode']}")
        print(f"   DCI: {sample['dci']}")
        print(f"   PPV: {sample['ppv']} MAD")
        print(f"   Type: {sample['type']}")
    
    # Update CNOPS database
    cnops_db = base_path / "src/data/medications-cnops.json"
    if cnops_db.exists():
        matched, unmatched = update_database(cnops_db, guide_meds, "CNOPS")
    
    # Update CNSS database  
    cnss_db = base_path / "src/data/medications-cnss.json"
    if cnss_db.exists():
        matched, unmatched = update_database(cnss_db, guide_meds, "CNSS")
    
    print(f"\n{'='*60}")
    print(f"✅ DATABASE UPDATE COMPLETE!")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
