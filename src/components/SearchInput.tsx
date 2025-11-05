import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
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

interface SearchInputProps {
  placeholder: string;
  onSelect: (result: SearchResult) => void;
  language: 'ar' | 'fr';
  insuranceType: 'cnops' | 'cnss';
}

// Separate caches for each insurance type
let cnopsCache: SearchResult[] | null = null;
let cnssCache: SearchResult[] | null = null;

export default function SearchInput({ placeholder, onSelect, language, insuranceType }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const listboxId = useId();
  const activeOptionId = isOpen && selectedIndex >= 0 ? `${listboxId}-option-${selectedIndex}` : undefined;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    // Search through database with async loading based on insurance type
    const searchTimer = setTimeout(async () => {
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
        }
        
        // Get the updated cache reference
        const cache = insuranceType === 'cnss' ? cnssCache! : cnopsCache!;
        
        const searchTerm = query.toLowerCase();
        const filtered = cache.filter(med =>
          med.name.toLowerCase().includes(searchTerm) ||
          med.dci?.toLowerCase().includes(searchTerm)
        );
        
        // Limit results to top 50 for performance
        setResults(filtered.slice(0, 50));
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching medications:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, insuranceType]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev === -1 ? 0 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Home':
        event.preventDefault();
        setSelectedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setSelectedIndex(results.length - 1);
        break;
      case 'Enter':
        event.preventDefault();
        {
          const option = selectedIndex >= 0 ? results[selectedIndex] : results[0];
          if (option) {
            handleSelect(option);
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery(result.name);
    setIsOpen(false);
    onSelect(result);
    setSelectedIndex(-1);
  };

  const dropdownInitial = prefersReducedMotion ? undefined : { opacity: 0, y: -10 };
  const dropdownAnimate = { opacity: 1, y: 0 };
  const dropdownTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.2 };
  const itemInitial = prefersReducedMotion ? undefined : { scale: 0.95, opacity: 0 };
  const itemAnimate = { scale: 1, opacity: 1 };
  const itemTransition = (index: number) => (prefersReducedMotion ? { duration: 0 } : { duration: 0.2, delay: index * 0.03 });

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="search"
          dir={dir}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          role="combobox"
          aria-label={placeholder}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={activeOptionId}
          aria-busy={isLoading}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          inputMode="search"
          enterKeyHint="search"
          className={cn(
            `w-full px-5 py-4 text-lg rounded-xl
            border-2 border-slate-300 dark:border-border
            focus:outline-none focus:border-primary-700 dark:focus:border-primary focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary/20
            transition-all shadow-soft
            bg-white dark:bg-card text-slate-900 dark:text-card-foreground placeholder-slate-500 dark:placeholder-muted-foreground
            ${language === 'ar' ? 'font-arabic pr-14' : 'pl-14'}`,
            dir === 'rtl' && 'text-right'
          )}
        />

        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 text-slate-400 dark:text-muted-foreground",
          dir === 'rtl' ? 'right-4' : 'left-4'
        )}>
          <Search className="w-6 h-6" />
        </div>

        {isLoading && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2",
            dir === 'rtl' ? 'left-4' : 'right-4'
          )}>
            <Loader2 className="w-6 h-6 text-primary-700 dark:text-primary animate-spin" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <motion.div
          role="listbox"
          id={listboxId}
          aria-label={placeholder}
          initial={dropdownInitial}
          animate={dropdownAnimate}
          transition={dropdownTransition}
          dir={dir}
          className={cn(
            `absolute z-50 w-full mt-2
            bg-white dark:bg-card rounded-xl shadow-strong border-2 border-slate-200 dark:border-border
            max-h-96 overflow-y-auto`,
            dir === 'rtl' && 'text-right'
          )}
        >
          {results.map((result, index) => (
            <motion.button
              key={result.id}
              type="button"
              role="option"
              id={`${listboxId}-option-${index}`}
              aria-selected={selectedIndex === index}
              initial={itemInitial}
              animate={itemAnimate}
              transition={itemTransition(index)}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={cn(
                `search-result-item w-full px-5 py-4 text-left transition-colors
                hover:bg-primary-50 dark:hover:bg-muted focus:bg-primary-50 dark:focus:bg-muted focus:outline-none
                border-b border-slate-100 dark:border-border last:border-b-0`,
                selectedIndex === index && 'bg-primary-50 dark:bg-muted',
                dir === 'rtl' && 'text-right'
              )}
            >
              <div className={`font-bold text-slate-900 dark:text-card-foreground mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {result.name}
              </div>
              {result.dci && (
                <div className="text-sm text-slate-500 dark:text-muted-foreground">
                  {result.dci} {result.dosage && `• ${result.dosage}`}
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {isOpen && !isLoading && query.length >= 2 && results.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          dir={dir}
          className={cn(
            "absolute z-50 w-full mt-2 bg-white dark:bg-card rounded-xl shadow-strong border-2 border-slate-200 dark:border-border p-5",
            dir === 'rtl' && 'text-right'
          )}
        >
          <p className={`text-slate-500 dark:text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'لم يتم العثور على نتائج' : 'Aucun résultat trouvé'}
          </p>
        </div>
      )}
    </div>
  );
}
