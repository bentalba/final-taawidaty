/**
 * Native App Home Screen
 * Dashboard layout with quick actions, insurance selector, and recent searches
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRecentSearches, useFavorites } from '@/hooks/useFavorites';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import { haptics } from '@/utils/haptics';
import { OnboardingScreens, useOnboarding } from './OnboardingScreens';
import { OfflineIndicator } from './OfflineIndicator';
import { 
  Calculator, 
  Search, 
  BookOpen, 
  Star, 
  Heart,
  Pill,
  Sparkles,
  ChevronRight,
  Clock,
  X,
  History,
  TrendingUp
} from 'lucide-react';

interface QuickAction {
  id: string;
  icon: React.ElementType;
  label: string;
  labelAr: string;
  color: 'green' | 'blue' | 'orange' | 'red';
  path: string;
}

const quickActions: QuickAction[] = [
  { 
    id: 'calculator', 
    icon: Calculator, 
    label: 'Calculate Reimbursement', 
    labelAr: 'حساب التعويض',
    color: 'green',
    path: '/calculator'
  },
  { 
    id: 'search', 
    icon: Search, 
    label: 'Search Medications', 
    labelAr: 'بحث عن دواء',
    color: 'blue',
    path: '/search'
  },
  { 
    id: 'price', 
    icon: Pill, 
    label: 'Check Price', 
    labelAr: 'التحقق من السعر',
    color: 'orange',
    path: '/prix-medicaments'
  },
  { 
    id: 'guide', 
    icon: BookOpen, 
    label: 'Guide', 
    labelAr: 'الدليل',
    color: 'red',
    path: '/blog'
  },
];

export const AppHome = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { recentSearches, removeRecentSearch, clearRecentSearches } = useRecentSearches();
  const { favorites, count: favoriteCount } = useFavorites();
  const { getStatistics, getRecentCalculations } = useCalculationHistory();
  const { showOnboarding, completeOnboarding, checked } = useOnboarding();
  const isRTL = language === 'ar';

  const stats = getStatistics();
  const recentCalculations = getRecentCalculations(3);

  // Show onboarding for first-time users
  if (!checked) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'var(--background)'
      }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingScreens language={language} onComplete={completeOnboarding} />;
  }

  return (
    <div className="app-home" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Welcome Section */}
      <div className="app-welcome-section">
        <div className="app-welcome-bg"></div>
        <div className="app-welcome-content">
          <div className="app-welcome-badge">
            <Sparkles size={16} />
            <span>{language === 'ar' ? 'مجاني 100%' : '100% Gratuit'}</span>
          </div>
          <h1 className="app-welcome-title">
            {language === 'ar' ? 'تعويضاتي' : 'Taawidaty'}
          </h1>
          <p className="app-welcome-subtitle">
            {language === 'ar' 
              ? 'حاسبة تعويض الأدوية المغربية'
              : 'Calculateur de remboursement médicaments'}
          </p>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div className="app-search-container" onClick={() => {
        haptics.light();
        navigate('/search');
      }}>
        <div className="app-search-bar">
          <Search className="app-search-icon" size={20} />
          <span className="app-search-placeholder">
            {language === 'ar' 
              ? 'ابحث عن دواء...'
              : 'Rechercher un médicament...'}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="app-section">
        <div className="app-section-header">
          <h2 className="app-section-title">
            {language === 'ar' ? 'الخدمات' : 'Services'}
          </h2>
        </div>
        <div className="app-quick-actions">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const label = language === 'ar' ? action.labelAr : action.label;
            return (
              <button
                key={action.id}
                className="app-quick-action"
                onClick={() => {
                  haptics.light();
                  navigate(action.path);
                }}
              >
                <div className={`app-quick-action-icon ${action.color}`}>
                  <Icon size={24} />
                </div>
                <span className="app-quick-action-label">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Statistics (if has history) */}
      {stats.totalCalculations > 0 && (
        <div className="app-section">
          <div className="app-section-header">
            <h2 className="app-section-title">
              <TrendingUp size={18} className="inline-block mr-2" />
              {language === 'ar' ? 'إحصائياتك' : 'Vos statistiques'}
            </h2>
            <button 
              className="app-section-action"
              onClick={() => {
                haptics.light();
                navigate('/history');
              }}
            >
              {language === 'ar' ? 'السجل' : 'Historique'}
            </button>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '0.75rem' 
          }}>
            <div style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                {stats.totalCalculations}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {language === 'ar' ? 'حساب' : 'Calculs'}
              </div>
            </div>
            <div style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                {stats.totalSaved.toFixed(0)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {language === 'ar' ? 'درهم موفرة' : 'MAD économisés'}
              </div>
            </div>
            <div style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--error)' }}>
                {favoriteCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {language === 'ar' ? 'مفضلة' : 'Favoris'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offline Indicator */}
      <OfflineIndicator language={language} />

      {/* Featured Info Card */}
      <div className="app-section">
        <div className="app-featured-card" onClick={() => {
          haptics.light();
          navigate('/search');
        }}>
          <div className="app-featured-icon">
            <Star size={24} />
          </div>
          <div className="app-featured-content">
            <h3 className="app-featured-title">
              {language === 'ar' 
                ? '+10,000 دواء'
                : '+10,000 médicaments'}
            </h3>
            <p className="app-featured-description">
              {language === 'ar' 
                ? 'قاعدة بيانات محدثة بأسعار رسمية'
                : 'Base de données actualisée avec prix officiels'}
            </p>
          </div>
          <ChevronRight size={20} className="app-featured-arrow" />
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="app-section">
          <div className="app-section-header">
            <h2 className="app-section-title">
              <Clock size={18} className="inline-block mr-2" />
              {language === 'ar' ? 'البحث الأخير' : 'Recherches récentes'}
            </h2>
            <button 
              className="app-section-action"
              onClick={() => {
                haptics.light();
                clearRecentSearches();
              }}
            >
              {language === 'ar' ? 'مسح' : 'Effacer'}
            </button>
          </div>
          <div className="app-medication-list">
            {recentSearches.slice(0, 5).map((med, index) => (
              <div 
                key={med.id} 
                className="app-medication-card app-animate-fade-in" 
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => {
                  haptics.light();
                  sessionStorage.setItem('selectedMedication', JSON.stringify(med));
                  navigate('/calculator');
                }}
              >
                <div className="app-medication-icon">
                  <Pill size={24} />
                </div>
                <div className="app-medication-info">
                  <h4 className="app-medication-name">{med.name}</h4>
                  <p className="app-medication-details">
                    {med.ppv.toFixed(2)} MAD
                  </p>
                </div>
                <button 
                  className="app-icon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    haptics.light();
                    removeRecentSearch(med.id);
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Medications - Static list */}
      <div className="app-section">
        <div className="app-section-header">
          <h2 className="app-section-title">
            {language === 'ar' ? 'الأكثر بحثاً' : 'Les plus recherchés'}
          </h2>
          <button 
            className="app-section-action"
            onClick={() => {
              haptics.light();
              navigate('/search');
            }}
          >
            {language === 'ar' ? 'عرض الكل' : 'Voir tout'}
          </button>
        </div>
        <div className="app-medication-list">
          {/* Popular items */}
          {[
            { name: 'Doliprane 1000mg', type: language === 'ar' ? 'مسكن للألم' : 'Antalgique' },
            { name: 'Augmentin 1g', type: language === 'ar' ? 'مضاد حيوي' : 'Antibiotique' },
            { name: 'Amoxicilline 500mg', type: language === 'ar' ? 'مضاد حيوي' : 'Antibiotique' }
          ].map((med, index) => (
            <div 
              key={index} 
              className="app-medication-card app-animate-fade-in" 
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                haptics.light();
                navigate('/search');
              }}
            >
              <div className="app-medication-icon">
                <Pill size={24} />
              </div>
              <div className="app-medication-info">
                <h4 className="app-medication-name">{med.name}</h4>
                <p className="app-medication-details">{med.type}</p>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default AppHome;
