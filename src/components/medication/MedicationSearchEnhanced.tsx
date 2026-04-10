/**
 * Enhanced Medication Search with Premium Animations
 * Apple-inspired search experience with Web Worker integration
 */

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, Pill, AlertTriangle, Check, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/EnhancedComponents';
import { loadMedications } from '@/data/medicationsLoader';

interface SearchResult {
  id: number;
  name: string;
  dci?: string;
  dosage?: string;
  ppv: number;
  base_remb: number;
  taux_remb: number;
  forme?: string;
  presentation?: string;
  barcode?: string | null;
  ph?: number;
  prix_br_ph?: number;
  classe_therapeutique?: string;
}

interface MedicationSearchEnhancedProps {
  placeholder: string;
  onSelect: (medication: SearchResult) => void;
  language: 'ar' | 'fr';
}

// Medication data cache (CNSS and CNOPS have same rates)
let medicationsCache: SearchResult[] | null = null;

export function MedicationSearchEnhanced({
  placeholder,
  onSelect,
  language,
}: MedicationSearchEnhancedProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [medications, setMedications] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load medications on mount (same rates for all insurance types)
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load medications if not cached
        if (!medicationsCache) {
          const data = await loadMedications('cnops'); // Use cnops as default (rates are same)
          const mappedData = data.map((med: any) => ({
            id: med.id,
            name: med.name,
            dci: med.dci,
            dosage: med.dosage,
            ppv: med.ppv,
            base_remb: med.prix_br,
            taux_remb: med.taux_remb,
            forme: med.forme,
            presentation: med.presentation,
            barcode: med.barcode,
            ph: med.ph,
            prix_br_ph: med.prix_br_ph,
            classe_therapeutique: med.classe_therapeutique
          }));

          medicationsCache = mappedData;
          setMedications(mappedData);
        } else {
          setMedications(medicationsCache);
        }
      } catch (error) {
        console.error('Error loading medications:', error);
      }
    };

    loadData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fuzzy search configuration
  const fuse = useMemo(
    () =>
      new Fuse(medications, {
        keys: [
          { name: 'name', weight: 0.6 },
          { name: 'dci', weight: 0.4 },
          { name: 'dosage', weight: 0.2 },
          { name: 'barcode', weight: 0.8 }, // High weight for exact barcode matches
        ],
        threshold: 0.3,
        distance: 50,
        includeScore: true,
        useExtendedSearch: true,
      }),
    [medications]
  );

  // Search results with filtering
  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const searchResults = fuse.search(query).slice(0, 8);

    return searchResults.map((r) => r.item);
  }, [query, fuse]);

  // Handle query change with debounce
  const handleQueryChange = (value: string) => {
    setQuery(value);

    // Show loading state
    if (value.trim().length >= 2) {
      setIsSearching(true);

      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(() => {
        setIsSearching(false);
      }, 300);
    } else {
      setIsSearching(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex], selectedIndex);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const selectedElement = document.getElementById(
        `medication-${selectedIndex}`
      );
      selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (medication: SearchResult, position: number) => {
      // Track selection analytics
      if (analytics?.trackMedicationSelect) {
        analytics.trackMedicationSelect(medication.id.toString(), medication.name, position);
      }

      onSelect(medication);
      setQuery('');
      setSelectedIndex(-1);
      setIsFocused(false);
    },
    [onSelect]
  );

  // Track search analytics
  useEffect(() => {
    if (query && results.length > 0 && !isSearching && analytics?.trackSearch) {
      analytics.trackSearch(query, results.length);
    }
  }, [query, results.length, isSearching]);

  const quickSuggestions = [
    'Doliprane',
    'Augmentin',
    'Voltaren',
    'Imodium',
    'Smecta',
    'Efferalgan',
  ];

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto" dir={dir}>
      {/* Search Input */}
      <div
        className={cn(
          "relative bg-white dark:bg-card rounded-2xl border-2 transition-colors duration-200 shadow-md",
          isFocused
            ? "border-primary-500 dark:border-primary-400 shadow-lg"
            : "border-neutral-200 dark:border-border hover:shadow-lg"
        )}
      >
        {/* Search Icon */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500",
            isSearching && "animate-spin",
            language === 'ar' ? 'right-4' : 'left-4'
          )}
        >
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full py-4 text-lg bg-transparent border-none outline-none rounded-2xl text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground",
            language === 'ar' ? 'pr-12 pl-4 font-arabic text-right' : 'pl-12 pr-4'
          )}
          aria-label={placeholder}
          aria-describedby="search-help"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={results.length > 0 && isFocused}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 flex items-center justify-center transition-colors",
                language === 'ar' ? 'left-4' : 'right-4'
              )}
              aria-label="Clear search"
            >
              <span className="text-neutral-600 dark:text-neutral-300 text-sm">×</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div id="search-help" className="sr-only">
        {language === 'ar' ? 'البحث عن الأدوية' : 'Rechercher un médicament'}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {results.length > 0 && isFocused && !isSearching && (
          <motion.div
            id="search-results"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-full mt-3 w-full bg-white dark:bg-card rounded-2xl shadow-2xl border border-neutral-100 dark:border-border overflow-hidden z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-label={placeholder}
          >
            {results.map((medication, index) => (
              <motion.button
                key={medication.id}
                id={`medication-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                onClick={() => handleSelect(medication, index)}
                className={cn(
                  'w-full px-6 py-4 flex items-center gap-4 text-left transition-colors duration-150',
                  'hover:bg-primary-50 dark:hover:bg-primary-900/30 focus:bg-primary-50 dark:focus:bg-primary-900/30 outline-none cursor-pointer',
                  index === selectedIndex && 'bg-primary-50 dark:bg-primary-900/30'
                )}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
              >
                {/* Medication Icon */}
                <div className="flex-shrink-0">
                  <Pill className="w-6 h-6 text-trust-blue" />
                </div>

                {/* Medication Info */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-semibold text-neutral-900 dark:text-foreground truncate mb-1",
                    language === 'ar' && 'font-arabic'
                  )}>
                    {medication.name}
                  </p>
                  {medication.dci && (
                    <p className={cn(
                      "text-sm text-neutral-600 dark:text-muted-foreground truncate",
                      language === 'ar' && 'font-arabic'
                    )}>
                      {medication.dci}{medication.dosage && ` • ${medication.dosage}`}
                    </p>
                  )}
                  {medication.barcode && (
                    <p className="text-xs text-neutral-500 dark:text-muted-foreground/80 truncate font-mono mt-0.5">
                      {medication.barcode}
                    </p>
                  )}
                </div>

                {/* Price & Coverage */}
                <div className="flex-shrink-0 text-right">
                  <p className="font-semibold text-trust-blue dark:text-primary">
                    {medication.ppv} MAD
                  </p>
                  <div className="flex items-center gap-1 text-sm text-success-green justify-end">
                    <TrendingUp className="w-3 h-3" />
                    <span>{medication.taux_remb}%</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Skeleton */}
      {isSearching && query.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 z-40"
        >
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Suggestions */}
      {!query && isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-3 w-full bg-white dark:bg-card rounded-2xl shadow-xl border border-neutral-100 dark:border-border p-4 z-40"
        >
          <p className={cn(
            "text-sm font-medium text-neutral-600 dark:text-muted-foreground mb-3 flex items-center gap-2",
            language === 'ar' && 'font-arabic'
          )}>
            <Zap className="w-4 h-4" />
            {language === 'ar' ? 'أدوية شائعة' : 'Médicaments populaires'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickSuggestions.map((med, index) => (
              <motion.button
                key={med}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuery(med);
                  // Trigger search manually
                  handleQueryChange(med);
                }}
                className={cn(
                  "px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-trust-blue-light dark:hover:bg-primary-900/50 rounded-lg transition-colors text-neutral-700 dark:text-neutral-300",
                  language === 'ar' ? 'text-right font-arabic' : 'text-left'
                )}
              >
                {med}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {query && query.length >= 2 && results.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-3 w-full bg-white dark:bg-card rounded-2xl shadow-xl border border-neutral-100 dark:border-border p-6 z-40 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-neutral-100 dark:bg-muted rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <Search className="w-8 h-8 text-neutral-400" />
          </motion.div>
          <p className={cn(
            "text-neutral-600 dark:text-muted-foreground font-medium mb-1",
            language === 'ar' && 'font-arabic'
          )}>
            {language === 'ar' ? 'لم يتم العثور على نتائج' : 'Aucun résultat trouvé'}
          </p>
          <p className={cn(
            "text-sm text-neutral-500 dark:text-muted-foreground",
            language === 'ar' && 'font-arabic'
          )}>
            {language === 'ar' ? 'حاول باسم دواء آخر' : 'Essayez avec un autre nom de médicament'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
