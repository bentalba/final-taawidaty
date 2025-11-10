/**
 * CNSS Disclaimer Popup Component
 * Shows important notice about non-affiliation with CNSS
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ExternalLink } from 'lucide-react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CNSSDisclaimerProps {
  onClose?: () => void;
}

export function CNSSDisclaimer({ onClose }: CNSSDisclaimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    // Check if user has seen the disclaimer before
    const hasSeenDisclaimer = localStorage.getItem('hasSeenCNSSDisclaimer');
    
    if (!hasSeenDisclaimer) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenCNSSDisclaimer', 'true');
    setIsOpen(false);
    onClose?.();
  };

  const handleRedirect = () => {
    localStorage.setItem('hasSeenCNSSDisclaimer', 'true');
    window.open('https://taawidaty.cnss.ma/', '_blank');
    setIsOpen(false);
  };

  const content = {
    fr: {
      title: "AVIS IMPORTANT / CLAUSE DE NON-RESPONSABILITÉ",
      message: "Vous cherchez peut-être le portail officiel TAAWIDATY de la CNSS (Caisse Nationale de Sécurité Sociale) ?",
      disclaimer: "Veuillez noter que ce site web (taawidaty.ma) n'est PAS le site officiel et n'a AUCUNE affiliation avec la CNSS ou toute autre entité gouvernementale. Nous proposons des services distincts et indépendants.",
      redirectInfo: "Pour être redirigé vers le site officiel de la CNSS, veuillez cliquer sur le bouton ci-dessous.",
      stayInfo: "Pour rester sur notre site, veuillez fermer cet avis.",
      redirectButton: "Aller au site officiel de la CNSS",
      stayButton: "Fermer et continuer sur ce site"
    },
    ar: {
      title: "إشعار هام وإخلاء مسؤولية",
      message: "هل تبحث عن البوابة الرسمية TAAWIDATY الخاصة بـ CNSS (الصندوق الوطني للضمان الاجتماعي)؟",
      disclaimer: "يرجى العلم أن هذا الموقع (taawidaty.ma) ليس الموقع الرسمي وليس له أي ارتباط أو انتماء بالصندوق الوطني للضمان الاجتماعي أو أي جهة حكومية أخرى. نحن نقدم خدمات مستقلة ومختلفة.",
      redirectInfo: "للانتقال إلى الموقع الرسمي للصندوق الوطني للضمان الاجتماعي، يرجى النقر على الزر أدناه.",
      stayInfo: "للبقاء في موقعنا، يرجى إغلاق هذا الإشعار.",
      redirectButton: "الانتقال إلى الموقع الرسمي للضمان الاجتماعي",
      stayButton: "الإغلاق والمتابعة في هذا الموقع"
    }
  };

  const text = content[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Warning Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400 mb-2 leading-tight">
                      {text.title}
                    </h2>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4 mb-6 text-sm md:text-base">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {text.message}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {text.disclaimer}
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-blue-900 dark:text-blue-300 text-sm md:text-base">
                      <span className="font-semibold">ℹ️ </span>
                      {text.redirectInfo}
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {text.stayInfo}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Redirect to CNSS */}
                  <Button
                    onClick={handleRedirect}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base py-6 md:py-7"
                    size="lg"
                  >
                    <ExternalLink className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {text.redirectButton}
                  </Button>

                  {/* Stay on site */}
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 text-sm md:text-base py-6 md:py-7 border-2"
                    size="lg"
                  >
                    {text.stayButton}
                  </Button>
                </div>

                {/* Additional disclaimer */}
                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-500">
                  {language === 'ar' 
                    ? 'هذا الإشعار لن يظهر مرة أخرى بعد إغلاقه'
                    : 'Cet avis ne s\'affichera plus après avoir été fermé'}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
