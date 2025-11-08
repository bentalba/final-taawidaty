#!/usr/bin/env python3
"""
Read Numbers file directly and display structure
"""

from numbers_parser import Document
from pathlib import Path
import json

file_path = Path("Guide_des_medicaments_rembourses_dci.numbers")

try:
    print(f"📖 Opening: {file_path}")
    doc = Document(file_path)
    
    print(f"\n📊 Document has {len(doc.sheets)} sheet(s)")
    
    for sheet_idx, sheet in enumerate(doc.sheets):
        print(f"\n📄 Sheet {sheet_idx + 1}: {sheet.name}")
        print(f"   Tables: {len(sheet.tables)}")
        
        for table_idx, table in enumerate(sheet.tables):
            print(f"\n   📋 Table {table_idx + 1}: {table.name}")
            print(f"      Rows: {table.num_rows}")
            print(f"      Cols: {table.num_cols}")
            
            # Get column headers
            if table.num_rows > 0:
                headers = []
                for col_idx in range(table.num_cols):
                    cell = table.cell(0, col_idx)
                    headers.append(str(cell.value) if cell.value is not None else f"Column_{col_idx}")
                
                print(f"\n      📌 Headers: {headers}")
                
                # Show first 3 data rows
                print(f"\n      📝 Sample data (first 3 rows):")
                for row_idx in range(1, min(4, table.num_rows)):
                    row_data = {}
                    for col_idx in range(table.num_cols):
                        cell = table.cell(row_idx, col_idx)
                        row_data[headers[col_idx]] = cell.value
                    print(f"         Row {row_idx}: {json.dumps(row_data, ensure_ascii=False, indent=10)[:200]}...")
    
    # Extract first table data
    if len(doc.sheets) > 0 and len(doc.sheets[0].tables) > 0:
        table = doc.sheets[0].tables[0]
        print(f"\n\n💾 Extracting data from first table...")
        
        # Get headers
        headers = []
        for col_idx in range(table.num_cols):
            cell = table.cell(0, col_idx)
            headers.append(str(cell.value) if cell.value is not None else f"Column_{col_idx}")
        
        # Extract all data
        data = []
        for row_idx in range(1, table.num_rows):
            row_data = {}
            for col_idx in range(table.num_cols):
                cell = table.cell(row_idx, col_idx)
                row_data[headers[col_idx]] = cell.value
            data.append(row_data)
        
        # Save to JSON for inspection
        output_file = Path("guide_medications_extracted.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2, default=str)
        
        print(f"✅ Extracted {len(data)} medications to: {output_file}")
        print(f"📊 Total columns: {len(headers)}")
        print(f"📌 Column names: {headers}")

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
