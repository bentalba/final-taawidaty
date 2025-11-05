import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, Pill, AlertTriangle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

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

interface MedicationSearchProps {
  medications: Medication[];
  onSelect: (medication: Medication) => void;
  insuranceType: 'cnops' | 'cnss';
}

export function MedicationSearch({
  medications,
  onSelect,
  insuranceType,
}: MedicationSearchProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

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
        // Filter out medications with no coverage for selected insurance
        return med.reimbursementRate[insuranceType] > 0;
      })
      .sort((a, b) => {
        // Prioritize safer medications
        if (a.safetyLevel === b.safetyLevel) {
          return (a.score || 0) - (b.score || 0);
        }
        if (a.safetyLevel === 'safe') return -1;
        if (b.safetyLevel === 'safe') return 1;
        return 0;
      });
  }, [query, fuse, insuranceType]);

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
      handleSelect(results[selectedIndex]);
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
    (medication: Medication) => {
      onSelect(medication);
      setQuery('');
      setSelectedIndex(-1);
      setIsFocused(false);
    },
    [onSelect]
  );

  const getSafetyIcon = (safety: Medication['safetyLevel']) => {
    switch (safety) {
      case 'safe':
        return <Check className="w-4 h-4 text-success-green" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'restricted':
        return (
          <AlertTriangle
            className="w-4 h-4 text-red-500"
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
        className="relative bg-white rounded-2xl border-2 transition-colors duration-200 shadow-medium"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={t('search.placeholder')}
          className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none rounded-2xl"
          aria-label={t('search.aria.label')}
          aria-describedby="search-help"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={results.length > 0 && isFocused}
        />
      </motion.div>

      <div id="search-help" className="sr-only">
        {t('search.aria.help')}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {results.length > 0 && isFocused && (
          <motion.div
            id="search-results"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-label={t('search.aria.label')}
          >
            {results.map((medication, index) => (
              <motion.button
                key={medication.id}
                id={`medication-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleSelect(medication)}
                className={cn(
                  'w-full px-6 py-4 flex items-center gap-4 text-left transition-colors',
                  'hover:bg-trust-blue-light focus:bg-trust-blue-light outline-none',
                  index === selectedIndex && 'bg-trust-blue-light'
                )}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
              >
                {/* Medication Icon */}
                <div className="flex-shrink-0">
                  <Pill
                    className={cn(
                      'w-6 h-6',
                      medication.safetyLevel === 'safe' && 'text-success-green',
                      medication.safetyLevel === 'warning' && 'text-yellow-500',
                      medication.safetyLevel === 'restricted' && 'text-red-500'
                    )}
                  />
                </div>

                {/* Medication Info */}
                <div className="flex-1 min-w-0">
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
                <div className="flex-shrink-0 text-right">
                  <p className="font-semibold text-trust-blue">
                    {medication.ppv} MAD
                  </p>
                  <p className="text-sm text-success-green">
                    {medication.reimbursementRate[insuranceType]}%
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Suggestions */}
      {!query && isFocused && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 z-40"
        >
          <p className="text-sm font-medium text-neutral-600 mb-3">
            {t('search.suggestions')}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickSuggestions.map((med) => (
              <button
                key={med}
                onClick={() => setQuery(med)}
                className="px-3 py-2 text-sm bg-neutral-100 hover:bg-trust-blue-light rounded-lg transition-colors text-neutral-700 text-left"
              >
                {med}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
