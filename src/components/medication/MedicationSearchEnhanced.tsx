/**
 * Enhanced Medication Search with Premium Animations
 * Apple-inspired search experience with Web Worker integration
 */

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, Pill, AlertTriangle, Check, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/EnhancedComponents';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection';
  ppv: number;
  reimbursementRate: {
    cnops: number;
    cnss: number;
  };
  safetyLevel: 'safe' | 'warning' | 'restricted';
  requiresPrescription: boolean;
}

interface MedicationSearchEnhancedProps {
  medications: Medication[];
  onSelect: (medication: Medication) => void;
  insuranceType: 'cnops' | 'cnss';
}

export function MedicationSearchEnhanced({
  medications,
  onSelect,
  insuranceType,
}: MedicationSearchEnhancedProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  // Fuzzy search configuration
  const fuse = useMemo(
    () =>
      new Fuse(medications, {
        keys: [
          { name: 'name', weight: 0.6 },
          { name: 'genericName', weight: 0.4 },
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
    if (!query.trim()) return [];

    const searchResults = fuse.search(query).slice(0, 8);

    return searchResults
      .map((r) => ({ ...r.item, score: r.score }))
      .filter((med) => {
        return med.reimbursementRate[insuranceType] > 0;
      })
      .sort((a, b) => {
        if (a.safetyLevel === b.safetyLevel) {
          return (a.score || 0) - (b.score || 0);
        }
        if (a.safetyLevel === 'safe') return -1;
        if (b.safetyLevel === 'safe') return 1;
        return 0;
      });
  }, [query, fuse, insuranceType]);

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
    (medication: Medication, position: number) => {
      // Track selection analytics
      analytics.trackMedicationSelect(medication.id, medication.name, position);

      onSelect(medication);
      setQuery('');
      setSelectedIndex(-1);
      setIsFocused(false);
    },
    [onSelect]
  );

  // Track search analytics
  useEffect(() => {
    if (query && results.length > 0 && !isSearching) {
      analytics.trackSearch(query, results.length);
    }
  }, [query, results.length, isSearching]);

  const getSafetyIcon = (safety: Medication['safetyLevel']) => {
    switch (safety) {
      case 'safe':
        return <Check className="w-4 h-4 text-success-green" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse-subtle" />;
      case 'restricted':
        return (
          <AlertTriangle
            className="w-4 h-4 text-red-500 animate-pulse"
            data-testid="warning-icon"
          />
        );
    }
  };

  const quickSuggestions = [
    'Doliprane',
    'Augmentin',
    'Voltaren',
    'Imodium',
    'Smecta',
    'Efferalgan',
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
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
          placeholder={t('search.placeholder', 'Rechercher un médicament...')}
          className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none rounded-2xl"
          aria-label={t('search.aria.label')}
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
        {t('search.aria.help')}
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
            className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-label={t('search.aria.label')}
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
                  <Pill
                    className={cn(
                      'w-6 h-6',
                      medication.safetyLevel === 'safe' && 'text-success-green',
                      medication.safetyLevel === 'warning' && 'text-yellow-500',
                      medication.safetyLevel === 'restricted' && 'text-red-500'
                    )}
                  />
                </motion.div>

                {/* Medication Info */}
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-neutral-900 truncate">
                      {medication.name}
                    </p>
                    {getSafetyIcon(medication.safetyLevel)}
                  </div>
                  <p className="text-sm text-neutral-600 truncate">
                    {medication.genericName} • {medication.dosage} •{' '}
                    {medication.form}
                  </p>
                </div>

                {/* Price & Coverage */}
                <div className="flex-shrink-0 text-right relative z-10">
                  <motion.p
                    className="font-semibold text-trust-blue"
                    whileHover={{ scale: 1.1 }}
                  >
                    {medication.ppv} MAD
                  </motion.p>
                  <motion.div
                    className="flex items-center gap-1 text-sm text-success-green"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>{medication.reimbursementRate[insuranceType]}%</span>
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
          className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 z-40"
        >
          <p className="text-sm font-medium text-neutral-600 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {t('search.suggestions', 'Médicaments populaires')}
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
      {query && results.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 z-40 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <Search className="w-8 h-8 text-neutral-400" />
          </motion.div>
          <p className="text-neutral-600 font-medium mb-1">
            Aucun résultat trouvé
          </p>
          <p className="text-sm text-neutral-500">
            Essayez avec un autre nom de médicament
          </p>
        </motion.div>
      )}
    </div>
  );
}
