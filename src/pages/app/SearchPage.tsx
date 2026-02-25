/**
 * Native App Search Page
 * Full-featured medication search with filters
 * Shows all medications by default with filtering capabilities
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/app/AppHeader';
import { SearchFiltersSheet, SearchFilters, defaultFilters, FilterButton } from '@/components/app/SearchFilters';
import { useFavorites, useRecentSearches } from '@/hooks/useFavorites';
import { haptics } from '@/utils/haptics';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllMedications } from '@/data/medicationsLoader';

interface Medication {
  id: number;
  name: string;
  ppv: number;
  taux_remb: number;
  base_remb?: number;
  code?: string;
  lab?: string;
  source?: 'cnops' | 'cnss';
}

const ITEMS_PER_PAGE = 30;

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addRecentSearch } = useRecentSearches();
  const { language } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);

  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch medications asynchronously
  useEffect(() => {
    let mounted = true;
    const fetchMeds = async () => {
      try {
        const allMeds = await getAllMedications();
        if (!mounted) return;

        // Deduplicate by name (keep first occurrence)
        const seen = new Set<string>();
        const uniqueMeds = (allMeds as Medication[]).filter(med => {
          const key = med.name.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        setMedications(uniqueMeds);
      } catch (error) {
        console.error("Failed to load medications:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchMeds();
    return () => { mounted = false; };
  }, []);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, filters]);

  // Filter and sort medications - show all by default
  const filteredMedications = useMemo(() => {
    let results = [...medications];

    // Text search (optional)
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      results = results.filter(med =>
        med.name.toLowerCase().includes(query) ||
        med.code?.toLowerCase().includes(query)
      );
    }

    // Price range filter
    if (filters.priceMin !== null) {
      results = results.filter(med => med.ppv >= (filters.priceMin || 0));
    }
    if (filters.priceMax !== null) {
      results = results.filter(med => med.ppv <= (filters.priceMax || Infinity));
    }

    // Reimbursement rate filter
    if (filters.reimbursementRate !== null) {
      results = results.filter(med => med.taux_remb === filters.reimbursementRate);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.ppv - b.ppv);
        break;
      case 'price-desc':
        results.sort((a, b) => b.ppv - a.ppv);
        break;
      case 'reimbursement':
        results.sort((a, b) => b.taux_remb - a.taux_remb);
        break;
      case 'name':
      default:
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return results;
  }, [searchQuery, medications, filters]);

  // Paginated results for display
  const displayedMedications = useMemo(() => {
    return filteredMedications.slice(0, displayCount);
  }, [filteredMedications, displayCount]);

  // Load more when scrolling near bottom
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      if (displayCount < filteredMedications.length) {
        setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredMedications.length));
      }
    }
  }, [displayCount, filteredMedications.length]);

  const handleMedicationSelect = useCallback((med: Medication) => {
    haptics.light();
    addRecentSearch({
      id: med.id,
      name: med.name,
      ppv: med.ppv
    });
    // Navigate to calculator with selected medication
    sessionStorage.setItem('selectedMedication', JSON.stringify(med));
    navigate('/calculator');
  }, [addRecentSearch, navigate]);

  const toggleFavorite = useCallback((med: Medication) => {
    haptics.medium();
    if (isFavorite(med.id)) {
      removeFavorite(med.id);
    } else {
      addFavorite({
        id: med.id,
        name: med.name,
        ppv: med.ppv,
        base_remb: med.base_remb || 0,
        taux_remb: med.taux_remb
      });
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin !== null || filters.priceMax !== null) count++;
    if (filters.reimbursementRate !== null) count++;
    if (filters.sortBy !== 'name') count++;
    return count;
  }, [filters]);

  return (
    <div className="app-page">
      <AppHeader title={language === 'ar' ? 'البحث عن الأدوية' : 'Rechercher'} language={language} showBack />

      <div className="app-page-content" onScroll={handleScroll} ref={listRef} style={{ overflowY: 'auto', height: 'calc(100vh - 140px)' }}>
        {/* Search Header */}
        <div className="search-header-sticky">
          {/* Search Input */}
          <div className="search-input-row">
            <div className="search-input-container">
              <svg
                className="search-input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث بالاسم أو الرمز...' : 'Rechercher par nom ou code...'}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Button */}
            <FilterButton
              onClick={() => setShowFilters(true)}
              activeCount={activeFiltersCount}
              language={language}
            />
          </div>

          {/* Results count */}
          <div className="results-count">
            <span className="results-count-number">{filteredMedications.length}</span>
            <span> {language === 'ar' ? 'دواء' : 'médicament(s)'}</span>
            {searchQuery && (
              <span className="results-count-filter">
                {language === 'ar' ? ' للفلتر' : ' trouvé(s)'}
              </span>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="search-results-container">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-gray-500">
                {language === 'ar' ? 'جاري تحميل الأدوية...' : 'Chargement des médicaments...'}
              </p>
            </div>
          ) : filteredMedications.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <div className="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3 className="empty-state-title">
                {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
              </h3>
              <p className="empty-state-description">
                {language === 'ar'
                  ? 'حاول تعديل البحث أو الفلاتر'
                  : 'Essayez d\'ajuster votre recherche ou vos filtres.'
                }
              </p>
            </div>
          ) : (
            <div className="medication-list">
              {displayedMedications.map((med, index) => (
                <MedicationCard
                  key={med.id}
                  medication={med}
                  isFavorite={isFavorite(med.id)}
                  onToggleFavorite={() => toggleFavorite(med)}
                  onSelect={() => handleMedicationSelect(med)}
                  language={language}
                  index={index}
                />
              ))}

              {/* Load more indicator */}
              {displayCount < filteredMedications.length && (
                <div className="load-more-indicator">
                  <div className="loading-spinner-small"></div>
                  <span>{language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filters Sheet */}
      <SearchFiltersSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApply={setFilters}
        language={language}
      />
    </div>
  );
};

interface MedicationCardProps {
  medication: Medication;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
  language: 'ar' | 'fr';
  index: number;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  isFavorite,
  onToggleFavorite,
  onSelect,
  language,
  index
}) => {
  const reimbursementAmount = (medication.ppv * medication.taux_remb) / 100;
  const patientPays = medication.ppv - reimbursementAmount;

  return (
    <div
      onClick={onSelect}
      className="medication-card animate-slide-up"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <div className="medication-card-header">
        <div className="medication-card-info">
          <div className="medication-card-name">
            {medication.name}
          </div>
          {medication.code && (
            <div className="medication-card-code">
              Code: {medication.code}
            </div>
          )}
          <div className="medication-card-badges">
            <span className="badge badge-primary">
              {medication.taux_remb}% {language === 'ar' ? 'تعويض' : 'remb.'}
            </span>
            <span className="badge badge-neutral">
              {medication.ppv.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="medication-card-footer">
        <div className="medication-card-amount reimbursed">
          <span className="amount-label">
            {language === 'ar' ? 'التعويض:' : 'Remboursé:'}
          </span>
          <span className="amount-value">
            {reimbursementAmount.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
          </span>
        </div>
        <div className="medication-card-amount patient-pays">
          <span className="amount-label">
            {language === 'ar' ? 'تدفع:' : 'Vous payez:'}
          </span>
          <span className="amount-value">
            {patientPays.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
