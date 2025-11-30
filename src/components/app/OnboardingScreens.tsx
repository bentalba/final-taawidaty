/**
 * Onboarding Screens
 * First-time user tutorial slides
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Search, 
  Heart, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { haptics } from '@/utils/haptics';
import { isNativeApp } from '@/utils/platform';

const ONBOARDING_KEY = 'taawidaty_onboarding_complete';

interface OnboardingSlide {
  id: number;
  icon: React.ElementType;
  iconColor: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    icon: Sparkles,
    iconColor: 'green',
    titleAr: 'مرحباً بك في تعويضاتي',
    titleFr: 'Bienvenue sur Taawidaty',
    descriptionAr: 'تطبيقك المجاني لحساب تعويضات الأدوية في المغرب',
    descriptionFr: 'Votre application gratuite pour calculer le remboursement des médicaments au Maroc'
  },
  {
    id: 2,
    icon: Search,
    iconColor: 'blue',
    titleAr: 'ابحث عن أي دواء',
    titleFr: 'Recherchez n\'importe quel médicament',
    descriptionAr: 'أكثر من 10,000 دواء بأسعار رسمية ومحدثة',
    descriptionFr: 'Plus de 10,000 médicaments avec prix officiels actualisés'
  },
  {
    id: 3,
    icon: Calculator,
    iconColor: 'orange',
    titleAr: 'احسب التعويض فوراً',
    titleFr: 'Calculez le remboursement instantanément',
    descriptionAr: 'اعرف كم ستسترد من التأمين الصحي في ثوانٍ',
    descriptionFr: 'Découvrez combien vous serez remboursé par votre mutuelle en quelques secondes'
  },
  {
    id: 4,
    icon: Heart,
    iconColor: 'red',
    titleAr: 'احفظ أدويتك المفضلة',
    titleFr: 'Sauvegardez vos médicaments favoris',
    descriptionAr: 'أضف أدويتك المتكررة للوصول السريع',
    descriptionFr: 'Ajoutez vos médicaments récurrents pour un accès rapide'
  }
];

interface OnboardingScreensProps {
  language: 'ar' | 'fr';
  onComplete: () => void;
}

export const OnboardingScreens = ({ language, onComplete }: OnboardingScreensProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isRTL = language === 'ar';

  const handleNext = () => {
    haptics.light();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    haptics.light();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    haptics.success();
    localStorage.setItem(ONBOARDING_KEY, 'true');
    onComplete();
  };

  const handleSkip = () => {
    haptics.light();
    handleComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className="onboarding-container" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Skip Button */}
      <button className="onboarding-skip" onClick={handleSkip}>
        {language === 'ar' ? 'تخطي' : 'Passer'}
      </button>

      {/* Slide Content */}
      <div className="onboarding-content">
        <div className={`onboarding-icon ${slide.iconColor}`}>
          <Icon size={48} />
        </div>
        
        <h1 className="onboarding-title">
          {language === 'ar' ? slide.titleAr : slide.titleFr}
        </h1>
        
        <p className="onboarding-description">
          {language === 'ar' ? slide.descriptionAr : slide.descriptionFr}
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="onboarding-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`onboarding-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => {
              haptics.selection();
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="onboarding-nav">
        {currentSlide > 0 && (
          <button className="onboarding-btn-prev" onClick={handlePrev}>
            {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            <span>{language === 'ar' ? 'السابق' : 'Précédent'}</span>
          </button>
        )}
        
        <button 
          className={`onboarding-btn-next ${isLast ? 'primary' : ''}`}
          onClick={handleNext}
        >
          <span>
            {isLast 
              ? (language === 'ar' ? 'ابدأ الآن' : 'Commencer')
              : (language === 'ar' ? 'التالي' : 'Suivant')
            }
          </span>
          {!isLast && (isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />)}
        </button>
      </div>
    </div>
  );
};

/**
 * Hook to check if onboarding should be shown
 */
export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isNativeApp()) {
      setChecked(true);
      return;
    }

    const completed = localStorage.getItem(ONBOARDING_KEY);
    setShowOnboarding(!completed);
    setChecked(true);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setShowOnboarding(true);
  };

  return { showOnboarding, completeOnboarding, resetOnboarding, checked };
};

export default OnboardingScreens;
