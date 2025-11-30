/**
 * Search Filters Component
 * Filter medications by price, category, reimbursement rate
 */

import { useState, useEffect } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown,
  Check,
  SlidersHorizontal
} from 'lucide-react';
import { haptics } from '@/utils/haptics';

export interface SearchFilters {
  priceMin: number | null;
  priceMax: number | null;
  reimbursementRate: number | null;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'reimbursement';
}

const defaultFilters: SearchFilters = {
  priceMin: null,
  priceMax: null,
  reimbursementRate: null,
  sortBy: 'name'
};

const priceRanges = [
  { label: '< 50 MAD', labelAr: '< 50 درهم', min: 0, max: 50 },
  { label: '50-100 MAD', labelAr: '50-100 درهم', min: 50, max: 100 },
  { label: '100-200 MAD', labelAr: '100-200 درهم', min: 100, max: 200 },
  { label: '200-500 MAD', labelAr: '200-500 درهم', min: 200, max: 500 },
  { label: '> 500 MAD', labelAr: '> 500 درهم', min: 500, max: null }
];

const reimbursementRates = [100, 70, 40, 0];

const sortOptions = [
  { value: 'name', label: 'Name A-Z', labelAr: 'الاسم أ-ي' },
  { value: 'price-asc', label: 'Price: Low to High', labelAr: 'السعر: من الأقل' },
  { value: 'price-desc', label: 'Price: High to Low', labelAr: 'السعر: من الأعلى' },
  { value: 'reimbursement', label: 'Best Reimbursement', labelAr: 'أفضل تعويض' }
];

interface SearchFiltersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
  language: 'ar' | 'fr';
}

export const SearchFiltersSheet = ({
  isOpen,
  onClose,
  filters,
  onApply,
  language
}: SearchFiltersSheetProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);
  const isRTL = language === 'ar';

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleApply = () => {
    haptics.success();
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    haptics.light();
    setLocalFilters(defaultFilters);
  };

  const selectPriceRange = (min: number, max: number | null) => {
    haptics.selection();
    if (localFilters.priceMin === min && localFilters.priceMax === max) {
      setLocalFilters(prev => ({ ...prev, priceMin: null, priceMax: null }));
    } else {
      setLocalFilters(prev => ({ ...prev, priceMin: min, priceMax: max }));
    }
  };

  const selectReimbursement = (rate: number) => {
    haptics.selection();
    if (localFilters.reimbursementRate === rate) {
      setLocalFilters(prev => ({ ...prev, reimbursementRate: null }));
    } else {
      setLocalFilters(prev => ({ ...prev, reimbursementRate: rate }));
    }
  };

  const activeFiltersCount = [
    localFilters.priceMin !== null,
    localFilters.reimbursementRate !== null,
    localFilters.sortBy !== 'name'
  ].filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="filter-backdrop" onClick={onClose} />

      {/* Sheet */}
      <div className="filter-sheet" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="filter-header">
          <h2 className="filter-title">
            <SlidersHorizontal size={20} />
            {language === 'ar' ? 'فلترة النتائج' : 'Filtrer les résultats'}
          </h2>
          <button className="filter-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="filter-content">
          {/* Price Range */}
          <div className="filter-section">
            <h3 className="filter-section-title">
              {language === 'ar' ? 'نطاق السعر' : 'Fourchette de prix'}
            </h3>
            <div className="filter-chips">
              {priceRanges.map((range, index) => {
                const isSelected = localFilters.priceMin === range.min && 
                                   localFilters.priceMax === range.max;
                return (
                  <button
                    key={index}
                    className={`filter-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => selectPriceRange(range.min, range.max)}
                  >
                    {isSelected && <Check size={14} />}
                    {language === 'ar' ? range.labelAr : range.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reimbursement Rate */}
          <div className="filter-section">
            <h3 className="filter-section-title">
              {language === 'ar' ? 'نسبة التعويض' : 'Taux de remboursement'}
            </h3>
            <div className="filter-chips">
              {reimbursementRates.map((rate) => {
                const isSelected = localFilters.reimbursementRate === rate;
                return (
                  <button
                    key={rate}
                    className={`filter-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => selectReimbursement(rate)}
                  >
                    {isSelected && <Check size={14} />}
                    {rate}%
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort By */}
          <div className="filter-section">
            <h3 className="filter-section-title">
              {language === 'ar' ? 'ترتيب حسب' : 'Trier par'}
            </h3>
            <div className="filter-options">
              {sortOptions.map((option) => {
                const isSelected = localFilters.sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    className={`filter-option ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      haptics.selection();
                      setLocalFilters(prev => ({ 
                        ...prev, 
                        sortBy: option.value as SearchFilters['sortBy']
                      }));
                    }}
                  >
                    <span>{language === 'ar' ? option.labelAr : option.label}</span>
                    {isSelected && <Check size={18} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="filter-footer">
          <button className="filter-btn-reset" onClick={handleReset}>
            {language === 'ar' ? 'إعادة تعيين' : 'Réinitialiser'}
          </button>
          <button className="filter-btn-apply" onClick={handleApply}>
            {language === 'ar' ? 'تطبيق' : 'Appliquer'}
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

interface FilterButtonProps {
  onClick: () => void;
  activeCount: number;
  language: 'ar' | 'fr';
}

export const FilterButton = ({ onClick, activeCount, language }: FilterButtonProps) => (
  <button 
    className="search-filter-btn"
    onClick={() => {
      haptics.light();
      onClick();
    }}
  >
    <Filter size={20} />
    {activeCount > 0 && (
      <span className="search-filter-badge">{activeCount}</span>
    )}
  </button>
);

export { defaultFilters };
export default SearchFiltersSheet;
