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

import { useEffect, useMemo, useState } from 'react';
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
import { ArrowRight, CheckCircle2, Sparkles, X, Plus, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { loadMedications } from '@/data/medicationsLoader';
import { BannerAd } from '@/components/BannerAd';


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
            colors={['#0077be', '#40ffaa', '#4079ff', '#40ffaa', '#0077be']}
            animationSpeed={3}
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
            colors={['#0077be', '#40ffaa', '#4079ff', '#40ffaa', '#0077be']}
            animationSpeed={3}
            showBorder={false}
            className="inline-block"
          >
            instantanée.
          </GradientText>
        </>
      );
    }
  };

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
  const scrolled = useScrollPosition();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const addMedication = (medication: Medication) => {
    // Check if medication already added
    if (medications.find(m => m.id === medication.id)) {
      return;
    }
    setMedications(prev => [...prev, medication]);
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

    // Show confetti celebration
    setShowConfetti(true);
  };

  const reset = () => {
    setStep(1);
    setMedications([]);
    setResults([]);
    setShowConfetti(false);
  };

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

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
        {/* Modern Header */}


        {/* Main Content */}
        <main role="main">
          {/* Hero Section */}
          {step === 1 && (
            <section className="relative px-4 py-8 md:py-16 max-w-7xl mx-auto">
              {/* Modern background with warm decorative elements - Smaller on mobile */}
              <div className="absolute inset-0 bg-gradient-modern -z-10"></div>
              <div className="absolute top-10 md:top-20 left-5 md:left-10 w-40 h-40 md:w-72 md:h-72 bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
              <div className="absolute top-20 md:top-40 right-5 md:right-10 w-40 h-40 md:w-72 md:h-72 bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

              <div className="relative z-10 text-center animate-slide-up">
                {/* Modern badge */}
                <div className="mb-4 md:mb-6 inline-flex items-center">
                  <div className="glass px-4 py-2 md:px-6 md:py-3 rounded-full shadow-glow hover-lift">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-600 dark:text-primary animate-bounce-gentle" />
                      <span className={`text-xs md:text-sm font-semibold text-primary-700 dark:text-primary ${isRTL ? 'font-arabic' : ''}`}>
                        {t.app.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main heading - H1 for SEO - Better mobile sizing */}
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight px-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {renderHeroTitle()}
                </h1>

                {/* Modern subtitle - Better mobile sizing */}
                <p className={`text-base md:text-xl text-slate-600 dark:text-muted-foreground mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-2 ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
                  {t.hero.subtitle}
                </p>

                {/* Two Options Cards */}
                <div className="max-w-5xl mx-auto mb-6 md:mb-8">
                  <h3 className={`text-2xl md:text-3xl font-bold text-slate-900 dark:text-foreground mb-6 text-center ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
                    {language === 'ar' ? 'اختر ما تحتاج' : 'Choisissez ce dont vous avez besoin'}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Card 1: Reimbursement Calculator */}
                    <EnhancedCard
                      hoverable={true}
                      glowOnHover={true}
                      animateOnMount={true}
                      delay={0}
                      className="p-6 text-center cursor-pointer group"
                      onClick={() => setStep(2)}
                    >
                      <div className="mx-auto mb-4 relative w-20 h-20">
                        <picture>
                          <source srcSet="/logos/remboursement-logo.webp" type="image/webp" />
                          <img
                            src="/logos/remboursement-logo.png"
                            alt={language === 'ar' ? 'حساب التعويض' : 'Calcul remboursement'}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            width="80"
                            height="80"
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                      </div>
                      <h4 className={`text-xl font-bold text-slate-900 dark:text-foreground mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'حساب التعويض من التأمين' : 'Calculer le remboursement'}
                      </h4>
                      <p className={`text-sm text-slate-600 dark:text-muted-foreground mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar'
                          ? 'احسب المبلغ الذي ستسترده من التأمين الصحي الخاص بك'
                          : 'Calculez combien votre mutuelle va vous rembourser'}
                      </p>
                      <Button
                        size="default"
                        className="w-full group-hover:shadow-xl transition-all duration-300"
                      >
                        <span className={isRTL ? 'font-arabic' : ''}>
                          {language === 'ar' ? 'ابدأ الحساب' : 'Commencer'}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </EnhancedCard>

                    {/* Card 2: Price Checker */}
                    <EnhancedCard
                      hoverable={true}
                      glowOnHover={true}
                      animateOnMount={true}
                      delay={0.1}
                      className="p-6 text-center cursor-pointer group"
                      onClick={() => {
                        window.location.href = '/prix-medicaments';
                      }}
                    >
                      <div className="mx-auto mb-4 relative w-20 h-20">
                        <picture>
                          <source srcSet="/logos/price-check-logo.webp" type="image/webp" />
                          <img
                            src="/logos/price-check-logo.png"
                            alt={language === 'ar' ? 'التحقق من السعر' : 'Vérification prix'}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            width="80"
                            height="80"
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                      </div>
                      <h4 className={`text-xl font-bold text-slate-900 dark:text-foreground mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'التحقق من سعر الدواء' : 'Vérifier le prix'}
                      </h4>
                      <p className={`text-sm text-slate-600 dark:text-muted-foreground mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar'
                          ? 'تحقق من سعر أي دواء في المغرب'
                          : 'Vérifiez le prix de n\'importe quel médicament'}
                      </p>
                      <Button
                        size="default"
                        variant="outline"
                        className="w-full group-hover:shadow-xl transition-all duration-300"
                      >
                        <span className={isRTL ? 'font-arabic' : ''}>
                          {language === 'ar' ? 'تحقق من السعر' : 'Vérifier'}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </EnhancedCard>
                  </div>

                  {/* Modern Trust Badges - Moved Below Cards */}
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {[
                      { icon: CheckCircle2, text: t.hero.trustOfficial },
                      { icon: CheckCircle2, text: t.hero.trustInstant },
                      { icon: CheckCircle2, text: t.hero.trustFree }
                    ].map((item, index) => (
                      <div key={index} className="group flex items-center gap-2 p-2 md:p-3 rounded-xl glass-card hover-lift">
                        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-success-100 dark:bg-success-950 group-hover:bg-success-200 dark:group-hover:bg-success-900 transition-colors">
                          <item.icon className="w-4 h-4 md:w-5 md:h-5 text-success-600 dark:text-success-400" />
                        </div>
                        <span className={`text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 ${isRTL ? 'font-arabic' : ''}`}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <BannerAd />

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

      </div>

      {/* Confetti Celebration */}
      <SuccessCelebration
        show={showConfetti}
        message={language === 'ar' ? '🎉 تم الحساب بنجاح!' : '🎉 Calcul terminé !'}
        onComplete={() => setShowConfetti(false)}
      />
    </>
  );
}
