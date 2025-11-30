/**
 * Favorites Page - Native App
 * Displays user's saved favorite medications
 */

import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites, FavoriteMedication } from '@/hooks/useFavorites';
import { isNativeApp } from '@/utils/platform';
import { haptics } from '@/utils/haptics';
import { 
  Heart, 
  HeartOff, 
  Pill, 
  Trash2, 
  Calculator,
  Search,
  Star
} from 'lucide-react';

interface FavoriteCardProps {
  medication: FavoriteMedication;
  onRemove: () => void;
  onCalculate: () => void;
  language: 'ar' | 'fr';
}

const FavoriteCard = ({ medication, onRemove, onCalculate, language }: FavoriteCardProps) => {
  const handleRemove = () => {
    haptics.impact();
    onRemove();
  };

  return (
    <div className="app-medication-card app-animate-fade-in">
      <div className="app-medication-icon">
        <Pill size={24} />
      </div>
      <div className="app-medication-info">
        <h4 className="app-medication-name">{medication.name}</h4>
        <div className="app-medication-details">
          <span className="app-medication-price-value">{medication.ppv.toFixed(2)} MAD</span>
          <span className="app-medication-coverage">{medication.taux_remb}%</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          className="app-icon-btn blue"
          onClick={() => {
            haptics.light();
            onCalculate();
          }}
          aria-label={language === 'ar' ? 'حساب التعويض' : 'Calculer'}
        >
          <Calculator size={18} />
        </button>
        <button 
          className="app-icon-btn red"
          onClick={handleRemove}
          aria-label={language === 'ar' ? 'إزالة' : 'Supprimer'}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites();
  const isRTL = language === 'ar';

  // For web, redirect to home
  if (!isNativeApp()) {
    return null;
  }

  const handleCalculate = (medication: FavoriteMedication) => {
    // Navigate to calculator with pre-filled medication
    // Store in sessionStorage for the calculator to pick up
    sessionStorage.setItem('selectedMedication', JSON.stringify(medication));
    navigate('/calculator');
  };

  const handleClearAll = () => {
    haptics.heavy();
    if (confirm(language === 'ar' 
      ? 'هل تريد حذف جميع المفضلات؟' 
      : 'Voulez-vous supprimer tous les favoris ?'
    )) {
      clearAllFavorites();
    }
  };

  return (
    <div className="app-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="app-page-header">
        <div className="app-page-header-icon red">
          <Heart size={24} />
        </div>
        <div>
          <h1 className="app-page-title">
            {language === 'ar' ? 'المفضلة' : 'Mes Favoris'}
          </h1>
          <p className="app-page-subtitle">
            {language === 'ar' 
              ? `${favorites.length} دواء محفوظ`
              : `${favorites.length} médicament${favorites.length > 1 ? 's' : ''} sauvegardé${favorites.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="app-section">
        {favorites.length === 0 ? (
          <div className="app-empty-state">
            <div className="app-empty-state-icon">
              <HeartOff size={64} />
            </div>
            <h3 className="app-empty-state-title">
              {language === 'ar' ? 'لا توجد مفضلات' : 'Aucun favori'}
            </h3>
            <p className="app-empty-state-message">
              {language === 'ar' 
                ? 'اضغط على أيقونة القلب لحفظ أدويتك المفضلة'
                : 'Appuyez sur l\'icône cœur pour sauvegarder vos médicaments préférés'}
            </p>
            <button 
              className="app-btn app-btn-primary"
              onClick={() => {
                haptics.light();
                navigate('/search');
              }}
            >
              <Search size={18} />
              <span>{language === 'ar' ? 'البحث عن دواء' : 'Rechercher'}</span>
            </button>
          </div>
        ) : (
          <>
            {/* Clear All Button */}
            {favorites.length > 1 && (
              <div className="flex justify-end mb-4">
                <button 
                  className="app-btn app-btn-text"
                  onClick={handleClearAll}
                >
                  <Trash2 size={16} />
                  <span>{language === 'ar' ? 'مسح الكل' : 'Tout supprimer'}</span>
                </button>
              </div>
            )}

            {/* Favorites List */}
            <div className="app-medication-list">
              {favorites
                .sort((a, b) => b.addedAt - a.addedAt)
                .map((medication, index) => (
                  <div 
                    key={medication.id} 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <FavoriteCard
                      medication={medication}
                      onRemove={() => removeFavorite(medication.id)}
                      onCalculate={() => handleCalculate(medication)}
                      language={language}
                    />
                  </div>
                ))}
            </div>

            {/* Quick Calculate All */}
            {favorites.length > 1 && (
              <div className="app-section mt-6">
                <div className="app-featured-card">
                  <div className="app-featured-icon">
                    <Calculator size={24} />
                  </div>
                  <div className="app-featured-content">
                    <h3 className="app-featured-title">
                      {language === 'ar' 
                        ? 'حساب الكل معاً'
                        : 'Calculer tout'}
                    </h3>
                    <p className="app-featured-description">
                      {language === 'ar' 
                        ? `احسب تعويض ${favorites.length} أدوية`
                        : `Calculer le remboursement de ${favorites.length} médicaments`}
                    </p>
                  </div>
                  <button 
                    className="app-btn app-btn-outlined"
                    onClick={() => {
                      haptics.success();
                      sessionStorage.setItem('selectedMedications', JSON.stringify(favorites));
                      navigate('/calculator');
                    }}
                  >
                    {language === 'ar' ? 'حساب' : 'Calculer'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-24"></div>
    </div>
  );
};

export default FavoritesPage;
