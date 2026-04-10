/**
 * TAAWIDATY - Moroccan Medication Reimbursement Calculator
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 * @description Main landing page with medication search and reimbursement calculator
 * 
 * NOTE: The name "TAAWIDATY" (تعويضاتي) is proprietary and protected.
 * The code is open source (MIT License), but the brand name cannot be used
 * in derivative works without explicit permission.
 */

import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageToggle from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MedicationSearchEnhanced } from '@/components/medication/MedicationSearchEnhanced';
import ResultCard from '@/components/ResultCard';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { SuccessCelebration } from '@/components/ui/Confetti';
import { EnhancedCard } from '@/components/ui/EnhancedComponents';
import GradientText from '@/components/ui/GradientText';
import { CNSSDisclaimer } from '@/components/ui/CNSSDisclaimer';
import { PopunderAd } from '@/components/PopunderAd';
import { SavingsCounter } from '@/components/SavingsCounter';
import { SocialProofBadge } from '@/components/SocialProofBadge';
import { ArrowRight, CheckCircle2, Sparkles, X, Plus, ShoppingCart, Search, Clock, Calculator, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { loadMedications, preloadAllMedications } from '@/data/medicationsLoader';
import { BannerAd } from '@/components/BannerAd';
import { AdUnit } from '@/components/ads/AdUnit';
import { isNativeApp } from '@/utils/platform';
import { AppHome } from '@/components/app/AppHome';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import { Header } from '@/components/layout/Header';


interface Medication {
  id: number;
  name: string;
  dci?: string;
  ppv: number;
  base_remb: number;
  taux_remb: number;
}

interface CalculationResult {
  originalPrice: number;
  reimbursementAmount: number;
  patientPays: number;
  percentageCovered: number;
  medicationName: string;
}

export default function Index() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const _isNativeApp = isNativeApp();

  // All hooks must be called before any conditional returns
  const scrollPosition = useScrollPosition();
  const [selectedInsurance, setSelectedInsurance] = useState<'cnops' | 'cnss'>('cnops');
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [medication, setMedication] = useState<Medication | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopunder, setShowPopunder] = useState(false);
  const { getRecentCalculations, addCalculation } = useCalculationHistory();

  // Moved hooks before early return
  const heroTitleSegments = useMemo(() => {
    const words = t.hero.title.split(' ');
    return {
      leading: words.slice(0, -1).join(' '),
      trailing: words.slice(-1)[0] ?? ''
    };
  }, [t.hero.title]);

  const metaTitle = language === 'ar'
    ? 'حاسبة تعويض وأسعار الأدوية في المغرب - تعويضاتي'
    : 'Calculateur Remboursement & Prix Médicaments Maroc 2025 | Taawidaty';
  const metaDescription = language === 'ar'
    ? 'احسب تعويض أدويتك من التأمين الصحي الإجباري فوراً أو تحقق من أسعار الأدوية الرسمية. قاعدة بيانات شاملة +10,000 دواء. حساب دقيق، مجاني 100٪!'
    : 'Calculez instantanément votre remboursement assurance santé ou consultez les prix officiels des médicaments au Maroc. +10,000 médicaments référencés. Rapide, précis et 100% gratuit !';
  const metaKeywords = language === 'ar'
    ? [
      'حساب تعويض الأدوية',
      'أسعار الأدوية المغرب',
      'تعويض التأمين الصحي',
      'صيدلية المغرب',
      'حاسبة التعويض',
      'تعويضاتي'
    ]
    : [
      'calculateur remboursement médicaments',
      'prix médicaments maroc',
      'remboursement assurance santé',
      'pharmacie maroc prix',
      'base médicaments maroc',
      'taawidaty'
    ];
  const structuredData = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Taawidaty',
      url: 'https://taawidaty.ma',
      inLanguage: language === 'ar' ? 'ar-MA' : 'fr-MA',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://taawidaty.ma/?query={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ], [language]);

  // Preload medications for offline support (Moroccan market optimization)
  useEffect(() => {
    // Preload all medications in background for offline use
    preloadAllMedications().catch(console.error);
  }, []);

  useEffect(() => {
    if (step !== 2) {
      return;
    }

    let isCancelled = false;

    const prefetch = async () => {
      try {
        // Load medications data (CNSS and CNOPS have same rates)
        await loadMedications('cnops');
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to prefetch medications', error);
        }
      }
    };

    prefetch();

    return () => {
      isCancelled = true;
    };
  }, [step]);

  // For native app, render the app-specific home screen
  if (_isNativeApp) {
    return <AppHome />;
  }

  // Custom hero title rendering with animated words
  const renderHeroTitle = () => {
    if (language === 'ar') {
      // Arabic: "تمن؟ التعويض؟ قلب و عرف دابا."
      // Animate: "دابا"
      return (
        <>
          <span className="text-gradient-modern block mb-2">
            تمن؟ التعويض؟ قلب و عرف{' '}
          </span>
          <GradientText
            colors={['#4F6AFF', '#06B6D4', '#818CF8', '#06B6D4', '#4F6AFF']}
            animationSpeed={4}
            showBorder={false}
            className="inline-block"
          >
            دابا.
          </GradientText>
        </>
      );
    } else {
      // French: "Prix ? Remboursement ? La réponse instantanée."
      // Animate: "instantanée"
      return (
        <>
          <span className="text-gradient-modern block mb-2">
            Prix ? Remboursement ? La réponse{' '}
          </span>
          <GradientText
            colors={['#4F6AFF', '#06B6D4', '#818CF8', '#06B6D4', '#4F6AFF']}
            animationSpeed={4}
            showBorder={false}
            className="inline-block"
          >
            instantanée.
          </GradientText>
        </>
      );
    }
  };

  const scrolled = scrollPosition; // Use the hook result from earlier

  // Get recent searches for quick re-calculate
  const recentCalculations = getRecentCalculations(3);

  const addMedication = (medication: Medication) => {
    // Check if medication already added
    if (medications.find(m => m.id === medication.id)) {
      return;
    }
    setMedications(prev => [...prev, medication]);
    // Auto-advance to step 2 when medication is added from hero search
    if (step === 1) {
      setStep(2);
    }
  };

  const removeMedication = (medicationId: number) => {
    setMedications(prev => prev.filter(m => m.id !== medicationId));
  };

  const calculateReimbursement = () => {
    if (medications.length === 0) return;

    const calculatedResults = medications.map(medication => {
      const reimbursement = (medication.base_remb * medication.taux_remb) / 100;
      const patientPays = Math.max(0, medication.ppv - reimbursement);

      return {
        originalPrice: medication.ppv,
        reimbursementAmount: reimbursement,
        patientPays,
        percentageCovered: medication.taux_remb,
        medicationName: medication.name
      };
    });

    setResults(calculatedResults);
    setStep(3);

    // Save to history
    addCalculation(
      medications.map(med => ({
        id: med.id,
        name: med.name,
        ppv: med.ppv,
        reimbursement: (med.base_remb * med.taux_remb) / 100,
        patientPays: Math.max(0, med.ppv - (med.base_remb * med.taux_remb) / 100),
        taux_remb: med.taux_remb
      })),
      'cnops'
    );

    // Show confetti celebration
    setShowConfetti(true);

    // Trigger PopunderAd AFTER user receives value (delayed ad)
    setShowPopunder(true);
  };

  const reset = () => {
    setStep(1);
    setMedications([]);
    setResults([]);
    setShowConfetti(false);
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        lang={language}
        canonical="https://taawidaty.ma"
        structuredData={structuredData}
      />

      {/* CNSS Disclaimer Popup - Shows on first visit */}
      <CNSSDisclaimer />

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh-gradient transition-colors duration-300">
        {/* Premium Header */}
        <Header />

        {/* Main Content */}
        <main role="main">
          {/* Hero Section */}
          {step === 1 && (
            <section className="relative px-4 pt-8 pb-12 md:pt-20 md:pb-16 max-w-7xl mx-auto">

              <div className="relative z-10 text-center animate-slide-up">
                {/* Pill badge */}
                <div className="mb-5 md:mb-8 inline-flex items-center">
                  <div className="shimmer-border bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-500 dark:text-primary-400" />
                      <span className={`text-xs md:text-sm font-semibold text-primary-700 dark:text-primary-300 ${isRTL ? 'font-arabic' : ''}`}>
                        {t.app.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main heading - H1 for SEO */}
                <h1 className={`text-balance text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-7 leading-[1.1] tracking-tight ${isRTL ? 'font-arabic' : ''}`}>
                  {renderHeroTitle()}
                </h1>

                {/* Subtitle */}
                <p className={`text-base md:text-lg text-slate-500 dark:text-slate-400 mb-5 md:mb-7 max-w-2xl mx-auto leading-relaxed font-medium ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
                  {t.hero.subtitle}
                </p>

                {/* Social Proof & Savings */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-10">
                  <SocialProofBadge language={language} />
                  <SavingsCounter language={language} variant="compact" />
                </div>

                {/* Search Card - Premium Frosted Glass */}
                <div className="max-w-2xl mx-auto mb-10">
                  <div className="shimmer-border bg-white/90 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-primary-500/5 dark:shadow-black/20 p-5 md:p-7">
                    <h2 className={`text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <Search className="w-5 h-5 text-primary-500" />
                      {language === 'ar' ? 'ابحث عن دوائك' : 'Recherchez votre médicament'}
                    </h2>
                    <MedicationSearchEnhanced
                      placeholder={t.calculator.searchPlaceholder}
                      onSelect={(selected) => addMedication(selected as Medication)}
                      language={language}
                    />

                    {/* Recent Searches - Quick Re-calculate */}
                    {recentCalculations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-border">
                        <p className={`text-xs text-slate-500 dark:text-muted-foreground mb-2 flex items-center gap-1 ${isRTL ? 'font-arabic' : ''}`}>
                          <Clock className="w-3 h-3" />
                          {language === 'ar' ? 'البحث الأخير:' : 'Récent:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {recentCalculations.slice(0, 3).map((calc, idx) => (
                            <button
                              key={calc.id}
                              onClick={() => {
                                // Re-populate medications from history
                                const meds = calc.medications.map(m => ({
                                  id: m.id,
                                  name: m.name,
                                  ppv: m.ppv,
                                  base_remb: m.reimbursement / (m.taux_remb / 100),
                                  taux_remb: m.taux_remb
                                }));
                                setMedications(meds);
                                setStep(2);
                              }}
                              className={`text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-full transition-colors ${isRTL ? 'font-arabic' : ''}`}
                            >
                              {calc.medications[0]?.name?.substring(0, 20)}
                              {calc.medications.length > 1 && ` +${calc.medications.length - 1}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Cards */}
                <div className="max-w-3xl mx-auto mb-10 md:mb-14">
                  <p className={`text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 text-center ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'أو اختر خدمة' : 'Ou choisissez un service'}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Reimbursement Calculator Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                      onClick={() => setStep(2)}
                    >
                      <div className="shimmer-border bg-white dark:bg-slate-800/60 rounded-2xl p-5 md:p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                            <Calculator className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          </div>
                          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <h4 className={`text-base font-bold text-slate-900 dark:text-white mb-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                              {language === 'ar' ? 'حساب التعويض' : 'Calculer le remboursement'}
                            </h4>
                            <p className={`text-xs text-slate-500 dark:text-slate-400 ${isRTL ? 'font-arabic' : ''}`}>
                              {language === 'ar' ? 'CNSS و CNOPS - نتائج فورية دقيقة' : 'CNSS & CNOPS — Résultats instantanés et précis'}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Price Checker Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                      onClick={() => { window.location.href = '/prix-medicaments'; }}
                    >
                      <div className="shimmer-border bg-white dark:bg-slate-800/60 rounded-2xl p-5 md:p-6 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                            <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          </div>
                          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <h4 className={`text-base font-bold text-slate-900 dark:text-white mb-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                              {language === 'ar' ? 'التحقق من السعر' : 'Vérifier le prix'}
                            </h4>
                            <p className={`text-xs text-slate-500 dark:text-slate-400 ${isRTL ? 'font-arabic' : ''}`}>
                              {language === 'ar' ? 'أسعار رسمية لأكثر من 10,000 دواء' : 'Prix officiels de +10 000 médicaments'}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Stats Ribbon */}
                <div className="max-w-3xl mx-auto mb-6">
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    {[
                      { value: '10 000+', label: language === 'ar' ? 'دواء مرجعي' : 'Médicaments', icon: '💊' },
                      { value: 'CNSS & CNOPS', label: language === 'ar' ? 'تغطية كاملة' : 'Couverture', icon: '🏥' },
                      { value: '100%', label: language === 'ar' ? 'مجاني' : 'Gratuit', icon: '✨' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="text-center p-3 md:p-4 rounded-xl bg-white/60 dark:bg-slate-800/30 border border-slate-200/40 dark:border-slate-700/20"
                      >
                        <span className="text-lg md:text-xl mb-1 block">{stat.icon}</span>
                        <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">{stat.value}</p>
                        <p className={`text-[11px] text-slate-400 dark:text-slate-500 ${isRTL ? 'font-arabic' : ''}`}>{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* BannerAd moved to footer area for cleaner UX */}

          {/* Step 2: Medication Search */}
          {step === 2 && (
            <section className="px-4 py-10 max-w-4xl mx-auto animate-fade-in">
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-full bg-primary-700 rounded-full transition-all duration-500"></div>
                  <div className="h-2 w-full bg-slate-300 dark:border rounded-full transition-all duration-500"></div>
                </div>
                <p className={`text-center text-sm text-slate-600 dark:text-muted-foreground mt-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'الخطوة 1 من 2' : 'Étape 1 sur 2'}
                </p>
              </div>

              <div className="bg-white dark:bg-card rounded-2xl shadow-strong border border-slate-200 dark:border-border p-6 md:p-8 transition-colors duration-300">
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className={`mb-3 hover:bg-slate-100 dark:hover:bg-muted transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                  >
                    ← {t.calculator.back}
                  </Button>

                  <h2 className={`text-2xl md:text-3xl font-black text-slate-900 dark:text-foreground mb-4 ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
                    {t.calculator.searchMed}
                  </h2>
                </div>

                <>
                  <MedicationSearchEnhanced
                    placeholder={t.calculator.searchPlaceholder}
                    onSelect={(selected) => addMedication(selected as Medication)}
                    language={language}
                  />

                  {/* Selected Medications List */}
                  {medications.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-base md:text-lg font-bold text-slate-900 dark:text-foreground flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                          {language === 'ar' ? `الأدوية المحددة (${medications.length})` : `Médicaments sélectionnés (${medications.length})`}
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {medications.map((med, index) => (
                          <motion.div
                            key={med.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950/30 dark:to-blue-950/30 border border-primary-200 dark:border-primary-800 rounded-xl"
                          >
                            <div className="flex-1">
                              <p className={`font-bold text-sm md:text-base text-slate-900 dark:text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                                {med.name}
                              </p>
                              <p className="text-xs md:text-sm text-slate-600 dark:text-muted-foreground">
                                {med.ppv} MAD • {med.taux_remb}% {language === 'ar' ? 'تعويض' : 'remboursement'}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMedication(med.id)}
                              className="hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <X className="w-4 h-4 md:w-5 md:h-5" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>

                      <Button
                        onClick={calculateReimbursement}
                        size="lg"
                        className={`w-full text-lg hover:scale-105 transition-transform duration-200 ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {language === 'ar' ? 'حساب التعويض' : 'Calculer le remboursement'}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'} transition-transform duration-300 group-hover:translate-x-1`} />
                      </Button>
                    </div>
                  )}
                </>
              </div>
            </section>
          )}

          {/* Step 3: Results */}
          {step === 3 && results.length > 0 && (
            <section className="px-4 py-10 max-w-6xl mx-auto">
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-full bg-primary-700 rounded-full transition-all duration-500"></div>
                  <div className="h-2 w-full bg-primary-700 rounded-full transition-all duration-500"></div>
                </div>
                <p className={`text-center text-sm text-slate-600 dark:text-muted-foreground mt-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'الخطوة 2 من 2' : 'Étape 2 sur 2'}
                </p>
              </div>

              {/* Individual Results */}
              <div className="space-y-4 mb-6">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ResultCard {...result} language={language} />
                  </motion.div>
                ))}
              </div>

              {/* Total Summary */}
              {results.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: results.length * 0.1 + 0.2 }}
                  className="bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-700 dark:to-blue-700 rounded-2xl p-6 md:p-8 shadow-2xl text-white mb-6"
                >
                  <h3 className={`text-xl md:text-2xl font-black mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المجموع الكلي' : 'Total Général'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <p className={`text-xs md:text-sm mb-2 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'السعر الإجمالي' : 'Prix Total'}
                      </p>
                      <p className="text-2xl md:text-3xl font-black">
                        {results.reduce((sum, r) => sum + r.originalPrice, 0).toFixed(2)} MAD
                      </p>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <p className={`text-xs md:text-sm mb-2 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'التعويض الإجمالي' : 'Remboursement Total'}
                      </p>
                      <p className="text-2xl md:text-3xl font-black">
                        {results.reduce((sum, r) => sum + r.reimbursementAmount, 0).toFixed(2)} MAD
                      </p>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <p className={`text-xs md:text-sm mb-2 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'المبلغ المتبقي' : 'Reste à Payer'}
                      </p>
                      <p className="text-2xl md:text-3xl font-black">
                        {results.reduce((sum, r) => sum + r.patientPays, 0).toFixed(2)} MAD
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Button
                  onClick={reset}
                  size="default"
                  className={`hover:scale-105 transition-all duration-200 hover:shadow-lg ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t.calculator.newCalc}
                </Button>
                <Button
                  onClick={() => {
                    setStep(2);
                    setShowConfetti(false);
                  }}
                  variant="outline"
                  size="default"
                  className={`hover:scale-105 hover:bg-slate-100 dark:hover:bg-muted transition-all duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {language === 'ar' ? 'إضافة المزيد من الأدوية' : 'Ajouter plus de médicaments'}
                </Button>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer role="contentinfo" className="mt-8 md:mt-12 border-t border-slate-200/70 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm transition-colors duration-300">
          {/* Non-intrusive ad placement */}
          <div className="border-b border-slate-100 dark:border-slate-800/40">
            <div className="container mx-auto max-w-6xl px-4 py-4">
              <BannerAd />
            </div>
          </div>

          <div className="container mx-auto px-4 py-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10">
              {/* Column 1: Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-base">T</span>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">TAAWIDATY</span>
                </div>
                <p className={`text-sm text-slate-500 dark:text-slate-400 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar'
                    ? 'منصة مجانية لحساب استرداد الأدوية من CNSS و CNOPS في المغرب'
                    : 'Plateforme gratuite pour calculer le remboursement des médicaments CNSS et CNOPS au Maroc'}
                </p>
              </div>

              {/* Column 2: Links */}
              <div>
                <h3 className={`text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'روابط مهمة' : 'Liens utiles'}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link to="/blog" className={`text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'المدونة' : 'Blog'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className={`text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'معلومات عنا' : 'À propos'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className={`text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Legal */}
              <div>
                <h3 className={`text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'قانوني' : 'Légal'}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link to="/medical-disclaimer" className={`text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'إخلاء المسؤولية الطبية' : 'Avertissement médical'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service" className={`text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'utilisation'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Tools */}
              <div>
                <h3 className={`text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'الأدوات' : 'Outils'}
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link to="/prix-medicaments" className={`text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'أسعار الأدوية' : 'Prix des médicaments'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-200/70 dark:border-slate-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className={`text-xs text-slate-400 dark:text-slate-500 ${isRTL ? 'font-arabic' : ''}`}>
                © 2025 TAAWIDATY. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
              </p>
              <p className={`text-[11px] text-slate-400 dark:text-slate-600 text-center sm:text-right max-w-md ${isRTL ? 'font-arabic' : ''}`}>
                {t.disclaimer.text}
              </p>
            </div>
          </div>
        </footer>

      </div >

      {/* Confetti Celebration */}
      < SuccessCelebration
        show={showConfetti}
        message={language === 'ar' ? '🎉 تم الحساب بنجاح!' : '🎉 Calcul terminé !'
        }
        onComplete={() => setShowConfetti(false)}
      />

      {/* PopunderAd - Triggered only after calculation (value delivered) */}
      {showPopunder && <PopunderAd />}
    </>
  );
}
