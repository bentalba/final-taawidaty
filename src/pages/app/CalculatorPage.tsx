/**
 * Native App Calculator Page
 * Calculate reimbursement for multiple medications
 * Clean interface without redundant insurance type selection
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AppHeader } from '@/components/app/AppHeader';
import { useFavorites, useRecentSearches } from '@/hooks/useFavorites';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import { haptics } from '@/utils/haptics';
import { shareMultipleMedicationResults, MedicationShareData } from '@/utils/share';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllMedications } from '@/data/medicationsLoader';

interface Medication {
  id: number;
  name: string;
  ppv: number;
  taux_remb: number;
  base_remb?: number;
  code?: string;
  source?: 'cnops' | 'cnss';
}

interface SelectedMedication extends Medication {
  quantity: number;
  reimbursement: number;
  patientPays: number;
}

const CalculatorPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeds, setSelectedMeds] = useState<SelectedMedication[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { favorites, isFavorite } = useFavorites();
  const { recentSearches } = useRecentSearches();
  const { addCalculation } = useCalculationHistory();
  const { language } = useLanguage();

  const [allMedications, setAllMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch medications asynchronously
  useEffect(() => {
    let mounted = true;
    const fetchMeds = async () => {
      try {
        const meds = await getAllMedications();
        if (mounted) setAllMedications(meds as Medication[]);
      } catch (error) {
        console.error("Failed to load medications:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchMeds();
    return () => { mounted = false; };
  }, []);

  // Check for pre-selected medication from Search page
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedMedication');
    if (stored) {
      try {
        const med = JSON.parse(stored);
        addMedication(med);
        sessionStorage.removeItem('selectedMedication');
      } catch (e) {
        console.error('Failed to parse stored medication:', e);
      }
    }
  }, []);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return allMedications
      .filter(med => med.name.toLowerCase().includes(query))
      .slice(0, 15);
  }, [searchQuery, allMedications]);

  const addMedication = useCallback((med: Medication) => {
    haptics.success();
    const reimbursement = (med.ppv * med.taux_remb) / 100;
    const patientPays = med.ppv - reimbursement;

    setSelectedMeds(prev => {
      const existing = prev.find(m => m.id === med.id && m.source === med.source);
      if (existing) {
        return prev.map(m =>
          (m.id === med.id && m.source === med.source)
            ? { ...m, quantity: m.quantity + 1, reimbursement: reimbursement * (m.quantity + 1), patientPays: patientPays * (m.quantity + 1) }
            : m
        );
      }
      return [...prev, { ...med, quantity: 1, reimbursement, patientPays }];
    });
    setSearchQuery('');
  }, []);

  const updateQuantity = useCallback((id: number, source: string | undefined, delta: number) => {
    haptics.light();
    setSelectedMeds(prev => prev.map(med => {
      if (med.id !== id || med.source !== source) return med;
      const newQty = Math.max(1, med.quantity + delta);
      const unitReimb = (med.ppv * med.taux_remb) / 100;
      const unitPatient = med.ppv - unitReimb;
      return {
        ...med,
        quantity: newQty,
        reimbursement: unitReimb * newQty,
        patientPays: unitPatient * newQty
      };
    }));
  }, []);

  const removeMedication = useCallback((id: number, source: string | undefined) => {
    haptics.medium();
    setSelectedMeds(prev => prev.filter(m => !(m.id === id && m.source === source)));
  }, []);

  const totals = useMemo(() => {
    const totalPrice = selectedMeds.reduce((sum, m) => sum + (m.ppv * m.quantity), 0);
    const totalReimbursement = selectedMeds.reduce((sum, m) => sum + m.reimbursement, 0);
    const totalPatientPays = selectedMeds.reduce((sum, m) => sum + m.patientPays, 0);
    return { totalPrice, totalReimbursement, totalPatientPays };
  }, [selectedMeds]);

  const handleCalculate = useCallback(() => {
    if (selectedMeds.length === 0) return;
    haptics.success();

    // Save to history
    addCalculation(
      selectedMeds.map(m => ({
        id: m.id,
        name: m.name,
        ppv: m.ppv * m.quantity,
        reimbursement: m.reimbursement,
        patientPays: m.patientPays,
        taux_remb: m.taux_remb
      })),
      selectedMeds[0]?.source || 'cnops'
    );

    setShowResults(true);
  }, [selectedMeds, addCalculation]);

  const handleShare = useCallback(async () => {
    haptics.light();
    const shareData: MedicationShareData[] = selectedMeds.map(m => ({
      name: m.name,
      price: m.ppv * m.quantity,
      reimbursement: m.reimbursement,
      patientPays: m.patientPays,
      percentage: m.taux_remb,
      language
    }));
    await shareMultipleMedicationResults(shareData, language);
  }, [selectedMeds, language]);

  const handleNewCalculation = useCallback(() => {
    setSelectedMeds([]);
    setShowResults(false);
  }, []);

  if (showResults) {
    return (
      <div className="app-page">
        <AppHeader
          title={language === 'ar' ? 'نتائج الحساب' : 'Résultats'}
          language={language}
          showBack
        />
        <div className="app-page-content animate-fade-in" style={{ padding: '1rem' }}>
          {/* Summary Card */}
          <div className="native-card result-card animate-scale-in" style={{ marginBottom: '1rem' }}>
            <div className="native-card-header">
              <h3 className="native-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                {language === 'ar' ? 'ملخص التعويض' : 'Récapitulatif'}
              </h3>
            </div>
            <div className="native-card-content">
              <div className="result-summary-grid">
                <div className="result-summary-item total">
                  <div className="result-summary-label">
                    {language === 'ar' ? 'المجموع' : 'Total'}
                  </div>
                  <div className="result-summary-value">
                    {totals.totalPrice.toFixed(2)}
                  </div>
                  <div className="result-summary-currency">
                    {language === 'ar' ? 'درهم' : 'MAD'}
                  </div>
                </div>
                <div className="result-summary-item reimbursed">
                  <div className="result-summary-label">
                    {language === 'ar' ? 'التعويض' : 'Remboursé'}
                  </div>
                  <div className="result-summary-value">
                    {totals.totalReimbursement.toFixed(2)}
                  </div>
                  <div className="result-summary-currency">
                    {language === 'ar' ? 'درهم' : 'MAD'}
                  </div>
                </div>
                <div className="result-summary-item patient-pays">
                  <div className="result-summary-label">
                    {language === 'ar' ? 'تدفع' : 'Vous payez'}
                  </div>
                  <div className="result-summary-value">
                    {totals.totalPatientPays.toFixed(2)}
                  </div>
                  <div className="result-summary-currency">
                    {language === 'ar' ? 'درهم' : 'MAD'}
                  </div>
                </div>
              </div>

              {/* Medication List */}
              <div className="result-medication-list">
                {selectedMeds.map((med, index) => (
                  <div
                    key={`${med.id}-${med.source}`}
                    className="result-medication-item animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="result-medication-header">
                      <span className="result-medication-name">
                        {med.name}
                      </span>
                      <span className="result-medication-qty">
                        x{med.quantity}
                      </span>
                    </div>
                    <div className="result-medication-details">
                      <span className="result-medication-price">
                        {(med.ppv * med.quantity).toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'} ({med.taux_remb}%)
                      </span>
                      <span className="result-medication-reimb">
                        -{med.reimbursement.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-row">
            <button onClick={handleShare} className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              {language === 'ar' ? 'مشاركة' : 'Partager'}
            </button>
            <button onClick={handleNewCalculation} className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {language === 'ar' ? 'حساب جديد' : 'Nouveau calcul'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <AppHeader title={language === 'ar' ? 'حاسبة التعويض' : 'Calculateur'} language={language} showBack />

      <div className="app-page-content">
        {/* Search Header - Clean without insurance toggle */}
        <div className="calculator-search-header">
          {/* Search Input */}
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
              placeholder={language === 'ar' ? 'أضف دواء...' : 'Ajouter un médicament...'}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="search-dropdown animate-fade-in">
              {searchResults.map((med, index) => (
                <button
                  key={`${med.id}-${med.source}`}
                  onClick={() => addMedication(med)}
                  className="search-dropdown-item"
                  style={{ animationDelay: `${index * 20}ms` }}
                >
                  <div className="search-dropdown-item-info">
                    <div className="search-dropdown-item-name">
                      {med.name}
                    </div>
                    <div className="search-dropdown-item-details">
                      {med.ppv.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'} • {med.taux_remb}%
                      <span className="search-dropdown-item-source">
                        {med.source?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Medications */}
        <div className="calculator-medications-container">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-gray-500">
                {language === 'ar' ? 'جاري تحميل الأدوية...' : 'Chargement des médicaments...'}
              </p>
            </div>
          ) : selectedMeds.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <div className="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                </svg>
              </div>
              <h3 className="empty-state-title">
                {language === 'ar' ? 'لا توجد أدوية' : 'Aucun médicament'}
              </h3>
              <p className="empty-state-description">
                {language === 'ar'
                  ? 'ابحث وأضف الأدوية لحساب التعويض'
                  : 'Recherchez et ajoutez des médicaments pour calculer le remboursement'
                }
              </p>

              {/* Quick Add from Favorites */}
              {favorites.length > 0 && (
                <div className="quick-add-section">
                  <div className="quick-add-title">
                    {language === 'ar' ? 'إضافة سريعة من المفضلة' : 'Ajout rapide depuis les favoris'}
                  </div>
                  <div className="quick-add-chips">
                    {favorites.slice(0, 5).map((fav, index) => (
                      <button
                        key={fav.id}
                        onClick={() => addMedication({
                          id: fav.id,
                          name: fav.name,
                          ppv: fav.ppv,
                          taux_remb: fav.taux_remb
                        })}
                        className="quick-add-chip animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        {fav.name.length > 20 ? fav.name.slice(0, 20) + '...' : fav.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="medication-list">
              {selectedMeds.map((med, index) => (
                <div
                  key={`${med.id}-${med.source}`}
                  className="calculator-medication-card animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="calculator-medication-header">
                    <div className="calculator-medication-info">
                      <div className="calculator-medication-name">
                        {med.name}
                      </div>
                      <div className="calculator-medication-details">
                        {med.ppv.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'} × {med.quantity} • {med.taux_remb}%
                        {med.source && (
                          <span className="medication-source-badge">{med.source.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeMedication(med.id, med.source)}
                      className="remove-medication-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="calculator-medication-footer">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(med.id, med.source, -1)}
                        disabled={med.quantity <= 1}
                        className="quantity-btn minus"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="quantity-value">{med.quantity}</span>
                      <button
                        onClick={() => updateQuantity(med.id, med.source, 1)}
                        className="quantity-btn plus"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </div>

                    <div className="calculator-medication-amounts">
                      <div className="amount-reimbursed">
                        -{med.reimbursement.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
                      </div>
                      <div className="amount-patient-pays">
                        {med.patientPays.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Bar with Totals */}
        {selectedMeds.length > 0 && (
          <div className="calculator-bottom-bar animate-slide-up">
            <div className="totals-row">
              <div className="total-item">
                <div className="total-label">
                  {language === 'ar' ? 'التعويض' : 'Remboursement'}
                </div>
                <div className="total-value success">
                  {totals.totalReimbursement.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
                </div>
              </div>
              <div className="total-item right">
                <div className="total-label">
                  {language === 'ar' ? 'تدفع' : 'Vous payez'}
                </div>
                <div className="total-value error">
                  {totals.totalPatientPays.toFixed(2)} {language === 'ar' ? 'درهم' : 'MAD'}
                </div>
              </div>
            </div>
            <button onClick={handleCalculate} className="calculate-btn">
              {language === 'ar' ? 'حساب التعويض' : 'Calculer le remboursement'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;
