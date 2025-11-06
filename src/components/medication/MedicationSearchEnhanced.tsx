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
}

interface MedicationSearchEnhancedProps {
  placeholder: string;
  onSelect: (medication: SearchResult) => void;
  language: 'ar' | 'fr';
  insuranceType: 'cnops' | 'cnss';
}

// Separate caches for each insurance type
let cnopsCache: SearchResult[] | null = null;
let cnssCache: SearchResult[] | null = null;

export function MedicationSearchEnhanced({
  placeholder,
  onSelect,
  language,
  insuranceType,
}: MedicationSearchEnhancedProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [medications, setMedications] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load medications on mount and when insurance type changes
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get the appropriate cache for this insurance type
        const currentCache = insuranceType === 'cnss' ? cnssCache : cnopsCache;

        // Load medications if not cached
        if (!currentCache) {
          const data = await loadMedications(insuranceType);
          const mappedData = data.map((med: any) => ({
            id: med.id,
            name: med.name,
            dci: med.dci,
            dosage: med.dosage,
            ppv: med.ppv,
            base_remb: med.prix_br,
            taux_remb: med.taux_remb,
            forme: med.forme,
            presentation: med.presentation
          }));

          // Store in appropriate cache
          if (insuranceType === 'cnss') {
            cnssCache = mappedData;
          } else {
            cnopsCache = mappedData;
          }

          setMedications(mappedData);
        } else {
          setMedications(currentCache);
        }
      } catch (error) {
        console.error('Error loading medications:', error);
      }
    };

    loadData();
  }, [insuranceType]);

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
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          borderColor: isFocused ? 'rgb(0, 119, 190)' : 'rgb(229, 229, 229)',
        }}
        whileHover={{ scale: 1.01 }}
        className="relative bg-white rounded-2xl border-2 transition-colors duration-200 shadow-medium hover:shadow-strong"
      >
        {/* Search Icon with Animation */}
        <motion.div
          animate={{
            rotate: isSearching ? 360 : 0,
            scale: isSearching ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 1, repeat: isSearching ? Infinity : 0, ease: 'linear' },
            scale: { duration: 0.5, repeat: isSearching ? Infinity : 0 },
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        >
          <Search className="w-5 h-5" />
        </motion.div>

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
            "w-full py-4 text-lg bg-transparent border-none outline-none rounded-2xl",
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
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
              aria-label="Clear search"
            >
              <span className="text-neutral-600 text-sm">×</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
                onClick={() => handleSelect(medication, index)}
                whileHover={{
                  x: 6,
                  backgroundColor: 'rgb(230, 242, 248)',
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full px-6 py-4 flex items-center gap-4 text-left transition-colors',
                  'focus:bg-trust-blue-light outline-none cursor-pointer relative overflow-hidden',
                  index === selectedIndex && 'bg-trust-blue-light'
                )}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
              >
                {/* Hover Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '100%',
                    transition: { duration: 0.6, ease: 'linear' },
                  }}
                />

                {/* Medication Icon */}
                <motion.div
                  className="flex-shrink-0 relative z-10"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <Pill className="w-6 h-6 text-trust-blue" />
                </motion.div>

                {/* Medication Info */}
                <div className="flex-1 min-w-0 relative z-10">
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
                </div>

                {/* Price & Coverage */}
                <div className="flex-shrink-0 text-right relative z-10">
                  <motion.p
                    className="font-semibold text-trust-blue dark:text-primary"
                    whileHover={{ scale: 1.1 }}
                  >
                    {medication.ppv} MAD
                  </motion.p>
                  <motion.div
                    className="flex items-center gap-1 text-sm text-success-green justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>{medication.taux_remb}%</span>
                  </motion.div>
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
                  inputRef.current?.focus();
                }}
                className="px-3 py-2 text-sm bg-neutral-100 hover:bg-trust-blue-light rounded-lg transition-colors text-neutral-700 text-left"
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
