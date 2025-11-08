#!/usr/bin/env python3
"""
Process Guide_des_medicaments_rembourses_dci file and update medication database
This script will:
1. Read the medication guide (Numbers/Excel format)
2. Extract: name, DCI, dosage, form, presentation, barcode, PPV (pharmacy), hospital price
3. Match with existing database and update
4. Add barcode field to all medications
5. Keep medications not in guide but without barcode
"""

import json
import sys
from pathlib import Path

try:
    from numbers_parser import Document
    NUMBERS_AVAILABLE = True
except ImportError:
    NUMBERS_AVAILABLE = False
    print("⚠️  numbers-parser not available. Will try alternative methods.")

try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False
    print("⚠️  pandas not available. Please install: pip install pandas openpyxl")
    sys.exit(1)


def read_numbers_file(file_path):
    """Try to read Apple Numbers file"""
    if not NUMBERS_AVAILABLE:
        print("❌ Cannot read .numbers file directly.")
        print("📝 Please export the file as CSV or XLSX format.")
        print("   In Numbers: File > Export To > Excel...")
        return None
    
    try:
        doc = Document(file_path)
        sheets = doc.sheets
        tables = sheets[0].tables
        table = tables[0]
        
        # Extract data from Numbers table
        data = []
        rows = table.rows()
        
        # First row is header
        headers = [cell.value for cell in rows[0]]
        
        # Process data rows
        for row in rows[1:]:
            row_data = {}
            for i, cell in enumerate(row):
                row_data[headers[i]] = cell.value
            data.append(row_data)
        
        return pd.DataFrame(data)
    except Exception as e:
        print(f"❌ Error reading Numbers file: {e}")
        return None


def read_excel_file(file_path):
    """Read Excel file"""
    try:
        df = pd.read_excel(file_path, engine='openpyxl')
        print(f"✅ Successfully read Excel file with {len(df)} rows")
        print(f"📊 Columns: {list(df.columns)}")
        return df
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return None


def read_csv_file(file_path):
    """Read CSV file"""
    try:
        # Try different encodings
        for encoding in ['utf-8', 'latin-1', 'iso-8859-1', 'cp1252']:
            try:
                df = pd.read_csv(file_path, encoding=encoding)
                print(f"✅ Successfully read CSV file with {len(df)} rows (encoding: {encoding})")
                print(f"📊 Columns: {list(df.columns)}")
                return df
            except UnicodeDecodeError:
                continue
        return None
    except Exception as e:
        print(f"❌ Error reading CSV file: {e}")
        return None


def normalize_medication_name(name):
    """Normalize medication name for matching"""
    if pd.isna(name):
        return ""
    return str(name).upper().strip()


def update_database(guide_df, current_db_path, output_path):
    """Update medication database with guide data"""
    
    # Load current database
    with open(current_db_path, 'r', encoding='utf-8') as f:
        current_meds = json.load(f)
    
    print(f"\n📚 Current database: {len(current_meds)} medications")
    print(f"📖 Guide file: {len(guide_df)} medications")
    
    # Print sample columns to help with mapping
    print(f"\n🔍 Guide columns: {list(guide_df.columns)[:10]}")
    print(f"\n📝 First row sample:")
    print(guide_df.head(1).to_dict('records')[0])
    
    # TODO: Map columns based on actual structure
    # This will be customized once we see the actual columns
    
    return current_meds


def main():
    base_path = Path(__file__).parent
    
    # Try to find the guide file
    numbers_file = base_path / "Guide_des_medicaments_rembourses_dci.numbers"
    excel_file = base_path / "Guide_des_medicaments_rembourses_dci.xlsx"
    csv_file = base_path / "Guide_des_medicaments_rembourses_dci.csv"
    
    guide_df = None
    
    # Try different file formats
    if csv_file.exists():
        print(f"📄 Found CSV file: {csv_file}")
        guide_df = read_csv_file(csv_file)
    elif excel_file.exists():
        print(f"📄 Found Excel file: {excel_file}")
        guide_df = read_excel_file(excel_file)
    elif numbers_file.exists():
        print(f"📄 Found Numbers file: {numbers_file}")
        print("\n⚠️  To process this file, please:")
        print("   1. Open it in Apple Numbers")
        print("   2. Go to: File > Export To > Excel...")
        print("   3. Save as: Guide_des_medicaments_rembourses_dci.xlsx")
        print("   4. Or export as CSV for best compatibility")
        print("\n💡 Then run this script again!")
        sys.exit(0)
    else:
        print("❌ Could not find guide file in any format (.csv, .xlsx, .numbers)")
        sys.exit(1)
    
    if guide_df is None:
        print("❌ Could not read guide file")
        sys.exit(1)
    
    # Update databases
    cnops_db = base_path / "src/data/medications-cnops.json"
    cnss_db = base_path / "src/data/medications-cnss.json"
    
    if cnops_db.exists():
        print(f"\n🔄 Processing CNOPS database...")
        updated_cnops = update_database(guide_df, cnops_db, cnops_db)
    
    if cnss_db.exists():
        print(f"\n🔄 Processing CNSS database...")
        updated_cnss = update_database(guide_df, cnss_db, cnss_db)


if __name__ == "__main__":
    main()
