import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: number;
  name: string;
  dci?: string;
  dosage?: string;
  ppv: number;
  base_remb: number;
  taux_remb: number;
}

interface SearchInputProps {
  placeholder: string;
  onSelect: (result: SearchResult) => void;
  language: 'ar' | 'fr';
}

// Mock data generator
const getMockMedications = (lang: 'ar' | 'fr'): SearchResult[] => [
  {
    id: 1,
    name: lang === 'ar' ? 'باراسيتامول 500 ملغ' : 'Paracétamol 500mg',
    dci: 'Paracétamol',
    dosage: '500mg',
    ppv: 15.50,
    base_remb: 12.00,
    taux_remb: 70
  },
  {
    id: 2,
    name: lang === 'ar' ? 'إيبوبروفين 400 ملغ' : 'Ibuprofène 400mg',
    dci: 'Ibuprofène',
    dosage: '400mg',
    ppv: 22.00,
    base_remb: 18.00,
    taux_remb: 70
  },
  {
    id: 3,
    name: lang === 'ar' ? 'أموكسيسيلين 1 غ' : 'Amoxicilline 1g',
    dci: 'Amoxicilline',
    dosage: '1g',
    ppv: 45.00,
    base_remb: 38.00,
    taux_remb: 80
  },
  {
    id: 4,
    name: lang === 'ar' ? 'أسبرين 500 ملغ' : 'Aspirine 500mg',
    dci: 'Acide acétylsalicylique',
    dosage: '500mg',
    ppv: 18.00,
    base_remb: 14.00,
    taux_remb: 70
  }
];

export default function SearchInput({ placeholder, onSelect, language }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
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
    // Simulate API call
    const timer = setTimeout(() => {
      const meds = getMockMedications(language);
      const filtered = meds.filter(med =>
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.dci?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery(result.name);
    setIsOpen(false);
    onSelect(result);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          dir={dir}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            `w-full px-5 py-4 text-lg rounded-xl
            border-2 border-slate-300
            focus:outline-none focus:border-primary-700 focus:ring-4 focus:ring-primary-200
            transition-all shadow-soft
            ${language === 'ar' ? 'font-arabic pr-14' : 'pl-14'}`,
            dir === 'rtl' && 'text-right'
          )}
        />

        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 text-slate-400",
          dir === 'rtl' ? 'right-4' : 'left-4'
        )}>
          <Search className="w-6 h-6" />
        </div>

        {isLoading && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2",
            dir === 'rtl' ? 'left-4' : 'right-4'
          )}>
            <Loader2 className="w-6 h-6 text-primary-700 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          dir={dir}
          className={cn(
            `absolute z-50 w-full mt-2
            bg-white rounded-xl shadow-strong border-2 border-slate-200
            max-h-96 overflow-y-auto`,
            dir === 'rtl' && 'text-right'
          )}
        >
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className={cn(
                `w-full px-5 py-4 text-left transition-colors
                hover:bg-primary-50 focus:bg-primary-50 focus:outline-none
                border-b border-slate-100 last:border-b-0`,
                selectedIndex === index && 'bg-primary-50',
                dir === 'rtl' && 'text-right'
              )}
            >
              <div className={`font-bold text-slate-900 mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {result.name}
              </div>
              {result.dci && (
                <div className="text-sm text-slate-500">
                  {result.dci} {result.dosage && `• ${result.dosage}`}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && !isLoading && query.length >= 2 && results.length === 0 && (
        <div
          dir={dir}
          className={cn(
            "absolute z-50 w-full mt-2 bg-white rounded-xl shadow-strong border-2 border-slate-200 p-5",
            dir === 'rtl' && 'text-right'
          )}
        >
          <p className={`text-slate-500 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'لم يتم العثور على نتائج' : 'Aucun résultat trouvé'}
          </p>
        </div>
      )}
    </div>
  );
}
