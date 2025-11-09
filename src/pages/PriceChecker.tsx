/**
 * TAAWIDATY - Medication Price Checker
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 * @description Price lookup page for medications without reimbursement calculation
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageToggle from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MedicationSearchEnhanced } from '@/components/medication/MedicationSearchEnhanced';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { EnhancedCard } from '@/components/ui/EnhancedComponents';
import {
  generateMedicationStructuredData,
  generateMetaDescription,
  generatePageTitle,
  generateKeywords,
  generateFAQStructuredData,
  generateBreadcrumbStructuredData
} from '@/lib/seo';
import { 
  ArrowLeft, 
  Search, 
  DollarSign, 
  Building2, 
  Barcode,
  Package,
  Info,
  ShoppingCart,
  X,
  Plus,
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface Medication {
  id: number;
  name: string;
  dci?: string;
  dosage?: string;
  ppv: number;
  base_remb?: number;
  taux_remb?: number;
  forme?: string;
  presentation?: string;
  barcode?: string | null;
  ph?: number;
  prix_br_ph?: number;
  classe_therapeutique?: string;
}

export default function PriceChecker() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const scrolled = useScrollPosition();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const metaTitle = language === 'ar'
    ? 'التحقق من أسعار الأدوية في المغرب - تعويضاتي'
    : 'Vérifier Prix Médicaments Maroc 2025 | Taawidaty';
  
  const metaDescription = language === 'ar'
    ? 'تحقق من أسعار الأدوية في المغرب. قاعدة بيانات شاملة محدثة 2025 مع أسعار الصيدليات والمستشفيات.'
    : 'Vérifiez les prix des médicaments au Maroc. Base de données complète et à jour 2025 avec prix pharmacie et hôpital.';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const addMedication = (medication: Medication) => {
    // Check if medication already added
    if (medications.find(m => m.id === medication.id)) {
      return;
    }
    setMedications(prev => [...prev, medication]);
    setSelectedMedication(medication);
  };

  const removeMedication = (medicationId: number) => {
    setMedications(prev => prev.filter(m => m.id !== medicationId));
    // If removing the selected medication, clear selection
    if (selectedMedication?.id === medicationId) {
      setSelectedMedication(medications.length > 1 ? medications[0] : null);
    }
  };

  const clearAll = () => {
    setMedications([]);
    setSelectedMedication(null);
  };

  // Calculate totals
  const totalPPV = medications.reduce((sum, med) => sum + med.ppv, 0);
  const totalPH = medications.reduce((sum, med) => sum + (med.ph || 0), 0);

  // Dynamic SEO based on selected medication
  const seoTitle = selectedMedication
    ? generatePageTitle(selectedMedication)
    : language === 'ar'
    ? 'أسعار الأدوية في المغرب | تعويضاتي'
    : 'Prix des Médicaments au Maroc | Taawidaty';

  const seoDescription = selectedMedication
    ? generateMetaDescription(selectedMedication)
    : language === 'ar'
    ? 'ابحث عن أسعار الأدوية الرسمية في المغرب. قارن أسعار الصيدليات والمستشفيات. احسب التعويض من CNOPS و CNSS.'
    : 'Recherchez les prix officiels des médicaments au Maroc. Comparez les prix pharmacie et hôpital. Calculez votre remboursement CNOPS et CNSS.';

  const seoKeywords = selectedMedication
    ? generateKeywords(selectedMedication)
    : language === 'ar'
    ? 'أسعار الأدوية, أسعار الأدوية المغرب, سعر الدواء, صيدلية المغرب, CNOPS, CNSS'
    : 'prix médicaments maroc, prix pharmacie, prix médicaments, doliprane prix, paracétamol prix, médicaments maroc, CNOPS, CNSS';

  // Generate structured data for search engines
  const structuredData = selectedMedication
    ? [
        generateMedicationStructuredData(selectedMedication),
        generateFAQStructuredData(selectedMedication),
        generateBreadcrumbStructuredData(selectedMedication)
      ]
    : [];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        lang={language}
        canonical={selectedMedication 
          ? `https://taawidaty.ma/prix/${selectedMedication.name.toLowerCase().replace(/\s+/g, '-')}`
          : 'https://taawidaty.ma/prix-medicaments'
        }
        structuredData={structuredData}
      />
      
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
        {/* Header */}
        <header role="banner" className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
          <div className={`glass border-b border-white/20 dark:border-gray-800/20 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Link to="/" className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 ${scrolled ? 'opacity-50' : 'opacity-100'}`}></div>
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
                  </Link>
                  <h1 className={`font-black text-gradient-modern ${isRTL ? 'font-arabic' : ''} transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}>
                    {language === 'ar' ? 'التحقق من الأسعار' : 'Vérification Prix'}
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
        <main role="main" className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className={isRTL ? 'font-arabic' : ''}>
                {language === 'ar' ? 'العودة للرئيسية' : 'Retour à l\'accueil'}
              </span>
            </Button>
          </Link>

          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-4 md:mb-6">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-foreground mb-3 md:mb-4 px-4 ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'التحقق من أسعار الأدوية' : 'Vérifier le prix des médicaments'}
            </h2>
            <p className={`text-base md:text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto px-4 ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' 
                ? 'ابحث عن أي دواء للحصول على سعره الرسمي في الصيدليات والمستشفيات المغربية'
                : 'Recherchez n\'importe quel médicament pour connaître son prix officiel en pharmacie et à l\'hôpital'}
            </p>
          </div>

          {/* Search Card */}
          <EnhancedCard className="p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
            <div className="mb-4 md:mb-6">
              <h3 className={`text-lg md:text-xl font-bold text-slate-900 dark:text-foreground mb-2 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                {language === 'ar' ? 'ابحث عن دواء' : 'Rechercher un médicament'}
              </h3>
              <p className={`text-xs md:text-sm text-slate-600 dark:text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {language === 'ar' 
                  ? 'يمكنك البحث بالاسم التجاري، الاسم العلمي، أو رمز الباركود'
                  : 'Vous pouvez rechercher par nom commercial, DCI ou code-barres'}
              </p>
            </div>
            
            <MedicationSearchEnhanced
              placeholder={language === 'ar' ? 'ابحث عن دواء...' : 'Rechercher un médicament...'}
              onSelect={(med) => addMedication(med as Medication)}
              language={language}
            />

            {/* Selected Medications List */}
            {medications.length > 0 && (
              <div className="mt-6 md:mt-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <h3 className={`text-base md:text-lg font-bold text-slate-900 dark:text-foreground flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    {language === 'ar' ? `الأدوية المحددة (${medications.length})` : `Médicaments sélectionnés (${medications.length})`}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 text-sm"
                  >
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'مسح الكل' : 'Tout effacer'}
                    </span>
                  </Button>
                </div>

                <div className="space-y-2 md:space-y-3">
                  {medications.map((med, index) => (
                    <motion.div
                      key={med.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-3 md:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedMedication?.id === med.id
                          ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700'
                          : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-800'
                      }`}
                      onClick={() => setSelectedMedication(med)}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className={`font-bold text-sm md:text-base text-slate-900 dark:text-foreground truncate ${isRTL ? 'font-arabic' : ''}`}>
                          {med.name}
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-muted-foreground truncate">
                          {formatCurrency(med.ppv)}
                          {med.ph && ` • ${language === 'ar' ? 'المستشفى' : 'Hôp'}: ${formatCurrency(med.ph)}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMedication(med.id);
                        }}
                        className="hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 flex-shrink-0"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Total Price Card */}
                {medications.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-300 dark:border-green-700 rounded-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                        <Calculator className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className={`text-sm md:text-base text-slate-600 dark:text-muted-foreground font-medium ${isRTL ? 'font-arabic' : ''}`}>
                          {language === 'ar' ? 'المجموع الكلي' : 'Total général'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-muted-foreground">
                          {medications.length} {language === 'ar' ? 'أدوية' : 'médicaments'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between items-center p-2 md:p-3 bg-white/50 dark:bg-slate-900/30 rounded-lg">
                        <span className={`text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 ${isRTL ? 'font-arabic' : ''}`}>
                          {language === 'ar' ? 'المجموع (صيدلية)' : 'Total pharmacie'}
                        </span>
                        <span className="text-lg md:text-2xl font-black text-green-700 dark:text-green-400">
                          {formatCurrency(totalPPV)}
                        </span>
                      </div>
                      {totalPH > 0 && (
                        <div className="flex justify-between items-center p-2 md:p-3 bg-white/50 dark:bg-slate-900/30 rounded-lg">
                          <span className={`text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 ${isRTL ? 'font-arabic' : ''}`}>
                            {language === 'ar' ? 'المجموع (مستشفى)' : 'Total hôpital'}
                          </span>
                          <span className="text-lg md:text-2xl font-black text-blue-700 dark:text-blue-400">
                            {formatCurrency(totalPH)}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </EnhancedCard>

          {/* Individual Medication Details */}
          <AnimatePresence mode="wait">
            {selectedMedication && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <EnhancedCard className="p-4 md:p-6 lg:p-8">
                  {/* Section Header */}
                  <div className="mb-4 md:mb-6">
                    <h3 className={`text-lg md:text-xl font-bold text-slate-900 dark:text-foreground flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <Info className="w-4 h-4 md:w-5 md:h-5" />
                      {language === 'ar' ? 'تفاصيل الدواء' : 'Détails du médicament'}
                    </h3>
                  </div>

                  {/* Medication Header */}
                  <div className="border-b border-slate-200 dark:border-border pb-4 md:pb-6 mb-4 md:mb-6">
                    <div className="mb-3 md:mb-4">
                      <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-bold text-slate-900 dark:text-foreground mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {selectedMedication.name}
                        </h3>
                        {selectedMedication.dci && (
                          <p className="text-sm md:text-base text-slate-600 dark:text-muted-foreground">
                            <span className="font-medium">DCI:</span> {selectedMedication.dci}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                      {selectedMedication.forme && (
                        <div className="flex items-center gap-2 text-xs md:text-sm">
                          <Package className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-muted-foreground truncate">
                            {selectedMedication.forme} {selectedMedication.dosage && `• ${selectedMedication.dosage}`}
                          </span>
                        </div>
                      )}
                      {selectedMedication.barcode && (
                        <div className="flex items-center gap-2 text-xs md:text-sm">
                          <Barcode className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span className="font-mono text-slate-600 dark:text-muted-foreground">
                            {selectedMedication.barcode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prices */}
                  <div className="space-y-3 md:space-y-4">
                    {/* Pharmacy Price */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-xs md:text-sm text-slate-600 dark:text-muted-foreground font-medium ${isRTL ? 'font-arabic' : ''}`}>
                              {language === 'ar' ? 'سعر الصيدلية (PPV)' : 'Prix Public de Vente'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-muted-foreground truncate">
                              {language === 'ar' ? 'السعر في الصيدليات' : 'Prix en pharmacie'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl md:text-3xl font-black text-green-700 dark:text-green-400">
                            {formatCurrency(selectedMedication.ppv)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hospital Price */}
                    {selectedMedication.ph && (
                      <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="min-w-0">
                              <p className={`text-xs md:text-sm text-slate-600 dark:text-muted-foreground font-medium ${isRTL ? 'font-arabic' : ''}`}>
                                {language === 'ar' ? 'سعر المستشفى (PH)' : 'Prix Hospitalier'}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-muted-foreground truncate">
                                {language === 'ar' ? 'السعر في المستشفيات' : 'Prix à l\'hôpital'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl md:text-3xl font-black text-blue-700 dark:text-blue-400">
                              {formatCurrency(selectedMedication.ph)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Therapeutic Class */}
                    {selectedMedication.classe_therapeutique && (
                      <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className={`text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                            {language === 'ar' ? 'الفئة العلاجية' : 'Classe thérapeutique'}
                          </p>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-muted-foreground break-words">
                            {selectedMedication.classe_therapeutique}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Presentation */}
                    {selectedMedication.presentation && (
                      <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                        <Package className="w-4 h-4 md:w-5 md:h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className={`text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                            {language === 'ar' ? 'التقديم' : 'Présentation'}
                          </p>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-muted-foreground break-words">
                            {selectedMedication.presentation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA to Calculator */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-200 dark:border-border">
                    <div className="text-center">
                      <p className={`text-xs md:text-sm text-slate-600 dark:text-muted-foreground mb-3 md:mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' 
                          ? 'هل تريد حساب التعويض من التأمين الصحي؟'
                          : 'Voulez-vous calculer votre remboursement mutuelle ?'}
                      </p>
                      <Link to="/">
                        <Button size="lg" className="w-full md:w-auto">
                          <DollarSign className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className={isRTL ? 'font-arabic' : ''}>
                            {language === 'ar' ? 'احسب التعويض' : 'Calculer le remboursement'}
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </EnhancedCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Banner */}
          {!selectedMedication && (
            <div className="mt-6 md:mt-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 md:p-6">
              <div className="flex items-start gap-2 md:gap-3">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className={`text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 md:mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'ملاحظة مهمة' : 'Note importante'}
                  </p>
                  <p className={`text-xs md:text-sm text-slate-600 dark:text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                    {language === 'ar'
                      ? 'الأسعار المعروضة هي الأسعار الرسمية المحددة من طرف وزارة الصحة المغربية. قد تختلف الأسعار الفعلية حسب الصيدلية.'
                      : 'Les prix affichés sont les prix officiels fixés par le Ministère de la Santé marocain. Les prix réels peuvent varier selon la pharmacie.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
