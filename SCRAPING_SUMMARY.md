# TAAWIDATY Medication Database Scraping Project
## Author: BENTALBA ZAKARIA
## Date: November 3, 2025

---

## 📊 Project Summary

Successfully scraped medication data from medicament.ma to create an independent medication price database.

### Objectives ✅
- ✅ Scrape all medications from medicament.ma (A-Z)
- ✅ Extract medication names and public prices (PPV)
- ✅ Create comprehensive medication database
- ✅ Document scraping methodology

---

## 📈 Results

### Scraped Data Statistics
- **Total Entries**: 4,888 medications
- **Unique Medications**: 4,030
- **With Prices**: 4,452 (91.1%)
- **Without Prices**: 436 (8.9%)
- **Coverage**: All 26 letters (A-Z)

### Medications by Letter
```
A: 562   |   N: 246
B: 173   |   O: 193
C: 517   |   P: 244
D: 302   |   Q: 15
E: 226   |   R: 190
F: 180   |   S: 321
G: 160   |   T: 255
H: 106   |   U: 60
I: 207   |   V: 140
J: 20    |   W: 5
K: 60    |   X: 60
L: 221   |   Y: 12
M: 282   |   Z: 131
```

---

## 🛠️ Technical Implementation

### Scraper Architecture
1. **URL Discovery**: `https://medicament.ma/listing-des-medicaments/?lettre=A`
2. **Pagination Pattern**: `/page/2/?lettre=A`, `/page/3/?lettre=A`, etc.
3. **HTML Parsing**: BeautifulSoup4 with table-based extraction
4. **Data Format**: JSON with name, publicPrice, and letter fields

### Key Files Created
- `scrape_medicament_ma.py` - Main scraper with pagination support
- `scrape_resumable.py` - Resume-capable version with progress saving
- `scrape_with_selenium.py` - Alternative Selenium-based scraper
- `update_database_prices.py` - Database price updater tool
- `scraped_medications_raw.json` - **Final scraped dataset (4,888 entries)**
- `monitor_scraper.sh` - Progress monitoring script

### Dependencies
```
requests>=2.31.0
beautifulsoup4>=4.12.0
lxml>=5.1.0
selenium>=4.15.0  (optional, for JavaScript-heavy pages)
```

---

## 🔍 Data Format

### Scraped Data Structure
```json
{
  "name": "MEDICATION NAME, FORM",
  "publicPrice": 123.45,
  "letter": "A"
}
```

### Example Entries
```json
[
  {
    "name": "A.V.T. , COMPRIMÉ EFFERVESCENT",
    "publicPrice": 19.1,
    "letter": "A"
  },
  {
    "name": "ABIP 15 MG, COMPRIMÉ PELLICULÉ [P]",
    "publicPrice": 372.0,
    "letter": "A"
  },
  {
    "name": "ACICLOVIR ARWA MEDIC 250 MG, POUDRE POUR SOLUTION POUR PERFUSION IV EN FLACON DE 10 ML",
    "publicPrice": 586.0,
    "letter": "A"
  }
]
```

---

## 📋 Comparison with Existing Database

### TAAWIDATY Current Database
- **Entries**: 5,709 medications (both CNOPS and CNSS)
- **Structure**: Comprehensive with separate fields for:
  - ID, Name, DCI, Dosage, Form, Presentation
  - PPV, Prix BR, Reimbursement rates, Patient cost
  - Insurance type (CNOPS/CNSS)

### medicament.ma Scraped Data
- **Entries**: 4,888 medications
- **Structure**: Simplified with medication name including dosage/form
- **Advantage**: Current prices from live website (2025)
- **Limitation**: Less detailed metadata

### Integration Challenge
The two data sources use different naming conventions:
- **Database**: "ELOXATINE 5 MG/ML" (name + dosage separated)
- **Scraped**: "ELOXATINE 5 MG/ML, SOLUTION INJECTABLE" (name + dosage + form combined)

**Recommendation**: Keep both datasets:
1. **Existing DB** (medications-cnops.json, medications-cnss.json) - Use for calculator functionality
2. **Scraped Data** (scraped_medications_raw.json) - Reference for price updates and verification

---

## 🎯 Achievements

### Successfully Completed
1. ✅ Website structure analysis and URL pattern discovery
2. ✅ Pagination handling (20 medications per page)
3. ✅ HTML table parsing with correct CSS selectors
4. ✅ Price extraction from "PPV: XX.XX dhs" format
5. ✅ Full A-Z scrape (26 letters, ~300 pages)
6. ✅ Data quality verification (91% price coverage)
7. ✅ Resume-capable scraper implementation
8. ✅ Progress monitoring tools

### Tools & Scripts Created
- **Scraper Tools**: 3 different approaches (requests, Selenium, resumable)
- **Data Analysis**: Database comparison and matching scripts
- **Monitoring**: Real-time progress tracking
- **Documentation**: This comprehensive summary

---

## 📊 Usage Examples

### Run Full Scrape
```bash
python scrape_medicament_ma.py
```

### Test Single Letter
```bash
python scrape_medicament_ma.py --test
```

### Resume Interrupted Scrape
```bash
python scrape_resumable.py
```

### Monitor Progress
```bash
./monitor_scraper.sh
```

---

## 💾 Output Files

### Primary Output
- **scraped_medications_raw.json** (4,888 medications)
  - Complete medication list from medicament.ma
  - Current prices as of November 2025
  - Ready for reference or further processing

### Test/Debug Files
- `test_medications_A.json` - Letter A test (562 medications)
- `test_AB.json` - Letters A & B test (735 medications)
- `scrape_full.log` - Full scraping log
- `scrape_resumable.log` - Resumable scraper log

---

## 🚀 Future Enhancements

### Potential Improvements
1. **Automated Price Updates**: Schedule monthly scraping for price updates
2. **Better Name Matching**: Implement fuzzy matching to merge with existing database
3. **API Development**: Create RESTful API for medication price lookups
4. **Database Integration**: Merge scraped prices into main CNOPS/CNSS databases
5. **Duplicate Detection**: Remove duplicate entries from combined names

### Price Update Strategy
If merging with existing database:
1. Extract medication base name (before dosage)
2. Fuzzy match with existing entries
3. Update PPV field if price differs
4. Recalculate reimbursement amounts
5. Log all price changes for review

---

## 📝 Notes

- Scraping performed November 3, 2025
- Source: https://medicament.ma
- Respects server with 0.5s delay between requests
- Handles missing prices gracefully (8.9% without prices)
- Pagination discovered through testing (not /a/ but ?lettre=A)

---

## ✅ Project Status: COMPLETE

**Final Deliverable**: `scraped_medications_raw.json` with 4,888 medication entries

**Author**: BENTALBA ZAKARIA  
**Project**: TAAWIDATY Medication Calculator  
**Repository**: https://github.com/bentalba/final-taawidaty

---

*This scraping project demonstrates the capability to extract and process live medication data from Moroccan pharmaceutical databases for integration into the TAAWIDATY platform.*
