#!/bin/bash
# Monitor scraping progress

LOG_FILE="/Users/zakaria/dawa-calcul-plus/scrape_full.log"

echo "TAAWIDATY Scraper Progress Monitor"
echo "===================================="
echo ""

if [ ! -f "$LOG_FILE" ]; then
    echo "❌ Log file not found: $LOG_FILE"
    exit 1
fi

# Check if process is running
if pgrep -f "python.*scrape_medicament_ma.py" > /dev/null; then
    echo "✅ Scraper is running"
else
    echo "⚠️  Scraper process not found"
fi

echo ""
echo "Progress:"
echo "---------"

# Count completed letters
completed=$(grep -c "✅ Letter" "$LOG_FILE" 2>/dev/null || echo "0")
echo "Completed letters: $completed/26"

# Show last letter being processed
current=$(grep "📋 Letter" "$LOG_FILE" | tail -1)
if [ -n "$current" ]; then
    echo "Current: $current"
fi

# Show total medications so far
total=$(grep "📊 Progress" "$LOG_FILE" | tail -1)
if [ -n "$total" ]; then
    echo "$total"
fi

echo ""
echo "Last 10 lines:"
echo "--------------"
tail -10 "$LOG_FILE" | grep -v "NotOpenSSLWarning\|urllib3\|warnings.warn"

# Check if complete
if grep -q "✅ Scraping complete!" "$LOG_FILE"; then
    echo ""
    echo "🎉 SCRAPING COMPLETED!"
    echo ""
    grep "Total medications scraped" "$LOG_FILE"
fi
