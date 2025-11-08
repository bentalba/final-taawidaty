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
import { ArrowRight, CheckCircle2, Sparkles, HelpCircle, BookOpen, X, Plus, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { loadMedications } from '@/data/medicationsLoader';

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
    ? 'احسب تعويض أدويتك من التأمين الصحي فوراً أو تحقق من أسعار الأدوية. قاعدة بيانات شاملة 2025. معلومات رسمية محدثة، حساب دقيق، مجاني 100٪!'
    : 'Calculez instantanément votre remboursement mutuelle ou vérifiez le prix des médicaments. Base de données complète 2025, calculs précis, 100% gratuit !';
  const metaKeywords = language === 'ar'
    ? [
        'حساب تعويض CNOPS',
        'حساب تعويض CNSS',
        'مصاريف الأدوية المغرب',
        'تعويض الأدوية CNOPS CNSS',
        'تعويضاتي'
      ]
    : [
        'remboursement cnops',
        'remboursement cnss',
        'calculateur médicaments maroc',
        'base de données médicaments remboursables',
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
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
      {/* Modern Header */}
      <header role="banner" className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
        <div className={`glass border-b border-white/20 dark:border-gray-800/20 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 ${scrolled ? 'opacity-50' : 'opacity-100'}`}></div>
                  <picture>
                    <source srcSet="/logos/taawidaty-logo.webp" type="image/webp" />
                    <img
                      src="/logos/TAAWIDATY.png"
                      alt="Taawidaty logo"
                      width="48"
                      height="48"
                      className={`relative group-hover:scale-105 transition-all duration-300 aspect-square ${scrolled ? 'h-8 w-8' : 'h-12 w-12'}`}
                    />
                  </picture>
                </div>
                <h1 className={`font-black text-gradient-modern ${isRTL ? 'font-arabic' : ''} transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}>
                  {t.app.title}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 p-2 rounded-xl glass-card">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main role="main">
      {/* Hero Section */}
      {step === 1 && (
        <section className="relative px-4 py-20 md:py-32 max-w-7xl mx-auto">
          {/* Modern background with warm decorative elements */}
          <div className="absolute inset-0 bg-gradient-modern -z-10"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-100/25 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

          <div className="relative z-10 text-center animate-slide-up">
            {/* Modern badge */}
            <div className="mb-12 inline-flex items-center">
              <div className="glass px-6 py-3 rounded-full shadow-glow hover-lift">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary animate-bounce-gentle" />
                  <span className={`text-sm font-semibold text-primary-700 dark:text-primary ${isRTL ? 'font-arabic' : ''}`}>
                    {t.app.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Modern heading with gradient text */}
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              <span className="text-gradient-modern block mb-2">
                {heroTitleSegments.leading}
              </span>
              <span className="text-primary-600 dark:text-primary">
                {heroTitleSegments.trailing}
              </span>
            </h2>

            {/* Modern subtitle */}
            <p className={`text-xl md:text-2xl text-slate-600 dark:text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-medium ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
              {t.hero.subtitle}
            </p>

          {/* Modern Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { icon: CheckCircle2, text: t.hero.trustOfficial },
              { icon: CheckCircle2, text: t.hero.trustInstant },
              { icon: CheckCircle2, text: t.hero.trustFree }
            ].map((item, index) => (
              <div key={index} className="group flex items-center gap-3 p-3 rounded-2xl glass-card hover-lift">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-success-100 dark:bg-success-950 group-hover:bg-success-200 dark:group-hover:bg-success-900 transition-colors">
                  <item.icon className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <span className={`text-sm font-medium text-slate-700 dark:text-slate-300 ${isRTL ? 'font-arabic' : ''}`}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Two Options Cards */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className={`text-3xl font-bold text-slate-900 dark:text-foreground mb-8 text-center ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
              {language === 'ar' ? 'اختر ما تحتاج' : 'Choisissez ce dont vous avez besoin'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1: Reimbursement Calculator */}
              <EnhancedCard
                hoverable={true}
                glowOnHover={true}
                animateOnMount={true}
                delay={0}
                className="p-8 text-center cursor-pointer group"
                onClick={() => setStep(2)}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-2xl font-bold text-slate-900 dark:text-foreground mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'حساب التعويض من التأمين' : 'Calculer le remboursement'}
                </h4>
                <p className={`text-slate-600 dark:text-muted-foreground mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' 
                    ? 'احسب المبلغ الذي ستسترده من التأمين الصحي الخاص بك'
                    : 'Calculez combien votre mutuelle va vous rembourser'}
                </p>
                <Button
                  size="lg"
                  className="w-full group-hover:shadow-xl transition-all duration-300"
                >
                  <span className={isRTL ? 'font-arabic' : ''}>
                    {language === 'ar' ? 'ابدأ الحساب' : 'Commencer'}
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </EnhancedCard>

              {/* Card 2: Price Checker */}
              <EnhancedCard
                hoverable={true}
                glowOnHover={true}
                animateOnMount={true}
                delay={0.1}
                className="p-8 text-center cursor-pointer group"
                onClick={() => {
                  // Will implement price checker route
                  alert(language === 'ar' ? 'قريباً...' : 'Bientôt disponible...');
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-2xl font-bold text-slate-900 dark:text-foreground mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'التحقق من سعر الدواء' : 'Vérifier le prix'}
                </h4>
                <p className={`text-slate-600 dark:text-muted-foreground mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' 
                    ? 'تحقق من سعر أي دواء في المغرب'
                    : 'Vérifiez le prix de n\'importe quel médicament'}
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full group-hover:shadow-xl transition-all duration-300"
                >
                  <span className={isRTL ? 'font-arabic' : ''}>
                    {language === 'ar' ? 'تحقق من السعر' : 'Vérifier'}
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </EnhancedCard>
            </div>
          </div>

          {/* FAQ Quick Access Banner */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950/50 dark:to-blue-950/50 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-6 shadow-md transition-colors duration-300">
              <div className="flex items-center justify-center gap-3 mb-3">
                <HelpCircle className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                <h3 className={`text-xl font-bold text-slate-900 dark:text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'هل لديك أسئلة؟' : 'Vous avez des questions ?'}
                </h3>
              </div>
              <p className={`text-slate-600 dark:text-muted-foreground mb-4 text-center ${isRTL ? 'font-arabic' : ''}`}>
                {language === 'ar'
                  ? 'تصفح أسئلتنا الشائعة حول استرجاع مصاريف الأدوية'
                  : 'Consultez notre FAQ sur le remboursement des médicaments'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="default" size="sm">
                  <Link to="/faq-cnops" className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'أسئلة CNOPS' : 'FAQ CNOPS'}
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/faq-cnss" className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'أسئلة CNSS' : 'FAQ CNSS'}
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/blog" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'المدونة' : 'Blog'}
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          </div>
        </section>
      )}

      {/* Step 2: Medication Search */}
      {step === 2 && (
        <section className="px-4 py-16 max-w-4xl mx-auto animate-fade-in">
          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-full bg-primary-700 rounded-full transition-all duration-500"></div>
              <div className="h-2 w-full bg-slate-300 dark:border rounded-full transition-all duration-500"></div>
            </div>
            <p className={`text-center text-sm text-slate-600 dark:text-muted-foreground mt-2 ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'الخطوة 1 من 2' : 'Étape 1 sur 2'}
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-2xl shadow-strong border border-slate-200 dark:border-border p-6 md:p-10 transition-colors duration-300">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className={`mb-4 hover:bg-slate-100 dark:hover:bg-muted transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
              >
                ← {t.calculator.back}
              </Button>
              
              <h2 className={`text-3xl font-black text-slate-900 dark:text-foreground mb-6 ${isRTL ? 'font-arabic' : ''} transition-colors duration-300`}>
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
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold text-slate-900 dark:text-foreground flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <ShoppingCart className="w-5 h-5" />
                      {language === 'ar' ? `الأدوية المحددة (${medications.length})` : `Médicaments sélectionnés (${medications.length})`}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {medications.map((med, index) => (
                      <motion.div
                        key={med.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950/30 dark:to-blue-950/30 border border-primary-200 dark:border-primary-800 rounded-xl"
                      >
                        <div className="flex-1">
                          <p className={`font-bold text-slate-900 dark:text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                            {med.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-muted-foreground">
                            {med.ppv} MAD • {med.taux_remb}% {language === 'ar' ? 'تعويض' : 'remboursement'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedication(med.id)}
                          className="hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <X className="w-5 h-5" />
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
        <section className="px-4 py-16 max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-full bg-primary-700 rounded-full transition-all duration-500"></div>
              <div className="h-2 w-full bg-primary-700 rounded-full transition-all duration-500"></div>
            </div>
            <p className={`text-center text-sm text-slate-600 dark:text-muted-foreground mt-2 ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'الخطوة 2 من 2' : 'Étape 2 sur 2'}
            </p>
          </div>

          {/* Individual Results */}
          <div className="space-y-6 mb-8">
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
              className="bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-700 dark:to-blue-700 rounded-2xl p-8 shadow-2xl text-white mb-8"
            >
              <h3 className={`text-2xl font-black mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'المجموع الكلي' : 'Total Général'}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <p className={`text-sm mb-2 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'السعر الإجمالي' : 'Prix Total'}
                  </p>
                  <p className="text-3xl font-black">
                    {results.reduce((sum, r) => sum + r.originalPrice, 0).toFixed(2)} MAD
                  </p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <p className={`text-sm mb-2 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'التعويض الإجمالي' : 'Remboursement Total'}
                  </p>
                  <p className="text-3xl font-black">
                    {results.reduce((sum, r) => sum + r.reimbursementAmount, 0).toFixed(2)} MAD
                  </p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <p className={`text-sm mb-2 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المبلغ المتبقي' : 'Reste à Payer'}
                  </p>
                  <p className="text-3xl font-black">
                    {results.reduce((sum, r) => sum + r.patientPays, 0).toFixed(2)} MAD
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={reset}
              size="lg"
              className={`text-lg hover:scale-105 transition-all duration-200 hover:shadow-lg ${isRTL ? 'font-arabic' : ''}`}
            >
              {t.calculator.newCalc}
            </Button>
            <Button
              onClick={() => {
                setStep(2);
                setShowConfetti(false);
              }}
              variant="outline"
              size="lg"
              className={`text-lg hover:scale-105 hover:bg-slate-100 dark:hover:bg-muted transition-all duration-200 ${isRTL ? 'font-arabic' : ''}`}
            >
              {language === 'ar' ? 'إضافة المزيد من الأدوية' : 'Ajouter plus de médicaments'}
            </Button>
          </div>
        </section>
      )}
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="border-t bg-white dark:bg-card mt-20 transition-colors duration-300">
        {/* Legal Links */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/privacy-policy" className={`text-slate-600 dark:text-muted-foreground hover:text-primary hover:underline transition-colors ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de Confidentialité'}
            </Link>
            <span className="text-slate-400">•</span>
            <Link to="/cookie-preferences" className={`text-slate-600 dark:text-muted-foreground hover:text-primary hover:underline transition-colors ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'تفضيلات ملفات تعريف الارتباط' : 'Préférences Cookies'}
            </Link>
            <span className="text-slate-400">•</span>
            <Link to="/medical-disclaimer" className={`text-slate-600 dark:text-muted-foreground hover:text-primary hover:underline transition-colors font-semibold ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'إخلاء المسؤولية الطبية' : 'Avertissement Médical'}
            </Link>
            <span className="text-slate-400">•</span>
            <Link to="/terms-of-service" className={`text-slate-600 dark:text-muted-foreground hover:text-primary hover:underline transition-colors ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'Utilisation'}
            </Link>
            <span className="text-slate-400">•</span>
            <Link to="/about-us" className={`text-slate-600 dark:text-muted-foreground hover:text-primary hover:underline transition-colors ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'من نحن' : 'À Propos'}
            </Link>
            <span className="text-slate-400">•</span>
            <Link to="/contact-us" className={`text-slate-600 dark:text-muted-foreground hover:text-primary hover:underline transition-colors ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'اتصل بنا' : 'Contact'}
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 text-center text-slate-600 dark:text-muted-foreground transition-colors duration-300">
          <p className={`text-sm mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            © 2025 TAAWIDATY • {language === 'ar' ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}
          </p>
          
          {/* Official Disclaimer */}
          <div className={`max-w-4xl mx-auto p-6 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-lg mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'ar' 
                ? 'موقع taawidaty.ma هو خدمة خاصة ومستقلة، دون أي انتماء أو ارتباط بالصندوق الوطني للضمان الاجتماعي (CNSS) أو الصندوق الوطني لمنظمات الاحتياط الاجتماعي (CNOPS). نحن لسنا موقعًا رسميًا للـ CNSS أو CNOPS.'
                : 'taawidaty.ma est un service privé et indépendant, sans aucune affiliation avec la CNSS ou la CNOPS. Nous ne sommes pas un site officiel de la CNSS ou de la CNOPS.'}
            </p>
          </div>
          
          <p className={`text-xs mt-2 ${isRTL ? 'font-arabic' : ''}`}>
            {t.disclaimer.text}
          </p>
        </div>
      </footer>
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
