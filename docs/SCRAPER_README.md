# TAAWIDATY - Medication Database Scraper

## Overview

This directory contains Python scripts to scrape medication data from medicament.ma and update the TAAWIDATY database with current prices and medication listings.

## Files

- `scrape_medicament_ma.py` - Main scraper (requires updates for pagination)
- `inspect_medicament_structure.py` - HTML structure inspector
- `explore_homepage.py` - Homepage navigation explorer
- `requirements-scraper.txt` - Python dependencies

## Discovered Structure

### URL Pattern
```
https://medicament.ma/listing-des-medicaments/?lettre=A
```

### Medication Counts by Letter
- A: 562 medications
- B: 174 medications  
- C: 516 medications
- **Total: ~5,396 medications across A-Z**

### HTML Structure
Medications are in a table:
```html
<table class="table table-striped table-hover table-mobile">
  <tr>
    <td>
      <a href="medication-url">
        <span class="details">
          MEDICATION NAME
          <br/>
          <span class="small">Boite de X - PPV: XX.XX dhs</span>
        </span>
      </a>
    </td>
  </tr>
</table>
```

## Installation

```bash
# Create Python virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements-scraper.txt
```

## Usage

### 1. Test Single Letter (Letter A)
```bash
python scrape_medicament_ma.py --test
```

### 2. Scrape All Medications
```bash
python scrape_medicament_ma.py
```

## Important Notes

⚠️ **Pagination Issue**: The website uses JavaScript to load 20 medications at a time. The current scraper needs to be enhanced to handle pagination. Options:

1. **Selenium/Playwright** - Automate browser to click "Load More" button
2. **API Endpoint** - Find if medicament.ma has an API
3. **Individual Pages** - Each medication has its own URL that can be scraped directly

## Next Steps

1. ✅ URL structure discovered
2. ✅ HTML selectors identified
3. ⏳ Handle pagination (20 items per load)
4. ⏳ Extract all ~5,396 medications
5. ⏳ Map to CNOPS/CNSS databases
6. ⏳ Update `medications-cnops.json` and `medications-cnss.json`

## Author

**BENTALBA ZAKARIA**  
Copyright © 2025

---

*Part of the TAAWIDATY project - Moroccan Medication Reimbursement Calculator*
