/**
 * GDPR Consent Banner Component
 * EU User Consent Policy compliant with IAB TCF v2.2
 * For use with Google AdSense, Ad Manager, or AdMob
 *
 * This component handles:
 * - EEA, UK, and Switzerland consent requirements
 * - IAB Transparency and Consent Framework (TCF) integration
 * - Google's Additional Consent specification
 * - Proper consent storage and retrieval
 */

import { useEffect, useState } from 'react';
import { X, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

interface ConsentBannerProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export function ConsentBanner({ onAccept, onDecline }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Nous respectons votre vie privée",
      description: "Nous et nos partenaires utilisons des cookies et des technologies similaires pour améliorer votre expérience, personnaliser le contenu et les publicités, et analyser le trafic. En cliquant sur « Accepter tout », vous consentez à l'utilisation de cookies conformément à notre politique de confidentialité.",
      acceptAll: "Accepter tout",
      declineAll: "Tout refuser",
      manageOptions: "Gérer mes choix",
      learnMore: "En savoir plus",
      detailsTitle: "Gestion des préférences de confidentialité",
      purposes: {
        analytics: {
          title: "Cookies analytiques",
          description: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en rapportant des informations de manière anonyme."
        },
        ads: {
          title: "Cookies publicitaires",
          description: "Ces cookies sont utilisés pour vous montrer des publicités pertinentes et engageantes. Ils nous permettent également de mesurer l'efficacité de nos campagnes publicitaires."
        },
        functional: {
          title: "Cookies fonctionnels",
          description: "Ces cookies permettent au site web de se souvenir des choix que vous faites (comme votre langue) et de fournir des fonctionnalités améliorées."
        }
      },
      partners: "Nos partenaires publicitaires",
      partnersDescription: "Nous travaillons avec des partenaires publicitaires certifiés qui respectent les normes de confidentialité européennes. Vous pouvez consulter la liste complète et gérer vos préférences.",
      privacyPolicy: "Politique de confidentialité",
      cookiePolicy: "Politique des cookies",
      iabFramework: "Ce site utilise le Transparency and Consent Framework (TCF) de l'IAB Europe.",
      disclaimer: "En tant que site d'information médicale, nous prenons votre vie privée très au sérieux. Vos données ne seront jamais vendues à des tiers."
    },
    ar: {
      title: "نحن نحترم خصوصيتك",
      description: "نحن وشركاؤنا نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك وتخصيص المحتوى والإعلانات وتحليل حركة المرور. بالنقر على 'قبول الكل'، فإنك توافق على استخدام ملفات تعريف الارتباط وفقًا لسياسة الخصوصية الخاصة بنا.",
      acceptAll: "قبول الكل",
      declineAll: "رفض الكل",
      manageOptions: "إدارة خياراتي",
      learnMore: "معرفة المزيد",
      detailsTitle: "إدارة تفضيلات الخصوصية",
      purposes: {
        analytics: {
          title: "ملفات تعريف الارتباط التحليلية",
          description: "تساعدنا ملفات تعريف الارتباط هذه على فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول."
        },
        ads: {
          title: "ملفات تعريف الارتباط الإعلانية",
          description: "تُستخدم ملفات تعريف الارتباط هذه لعرض إعلانات ذات صلة وجذابة لك. كما تسمح لنا بقياس فعالية حملاتنا الإعلانية."
        },
        functional: {
          title: "ملفات تعريف الارتباط الوظيفية",
          description: "تسمح ملفات تعريف الارتباط هذه لموقع الويب بتذكر الاختيارات التي تقوم بها (مثل لغتك) وتوفير ميزات محسّنة."
        }
      },
      partners: "شركاؤنا الإعلانيون",
      partnersDescription: "نعمل مع شركاء إعلانيين معتمدين يحترمون معايير الخصوصية الأوروبية. يمكنك الاطلاع على القائمة الكاملة وإدارة تفضيلاتك.",
      privacyPolicy: "سياسة الخصوصية",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      iabFramework: "يستخدم هذا الموقع إطار الشفافية والموافقة (TCF) التابع لـ IAB Europe.",
      disclaimer: "كموقع معلومات طبية، نأخذ خصوصيتك على محمل الجد. لن يتم بيع بياناتك لأطراف ثالثة."
    }
  };

  const t = content[language];

  useEffect(() => {
    // Check if user has already made a consent choice
    const consentChoice = localStorage.getItem('gdpr_consent');
    const consentTimestamp = localStorage.getItem('gdpr_consent_timestamp');

    // Show banner if no consent or if consent is older than 13 months (IAB requirement)
    if (!consentChoice || !consentTimestamp) {
      setIsVisible(true);
    } else {
      const thirteenMonthsAgo = Date.now() - (13 * 30 * 24 * 60 * 60 * 1000);
      if (parseInt(consentTimestamp) < thirteenMonthsAgo) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    // Store consent
    localStorage.setItem('gdpr_consent', 'accepted');
    localStorage.setItem('gdpr_consent_timestamp', Date.now().toString());
    localStorage.setItem('gdpr_consent_analytics', 'true');
    localStorage.setItem('gdpr_consent_ads', 'true');
    localStorage.setItem('gdpr_consent_functional', 'true');

    // Update Google consent mode
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted'
      });
    }

    setIsVisible(false);
    onAccept?.();
  };

  const handleDeclineAll = () => {
    // Store rejection
    localStorage.setItem('gdpr_consent', 'declined');
    localStorage.setItem('gdpr_consent_timestamp', Date.now().toString());
    localStorage.setItem('gdpr_consent_analytics', 'false');
    localStorage.setItem('gdpr_consent_ads', 'false');
    localStorage.setItem('gdpr_consent_functional', 'true'); // Functional cookies are essential

    // Update Google consent mode
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted'
      });
    }

    setIsVisible(false);
    onDecline?.();
  };

  const handleManageOptions = () => {
    setShowDetails(!showDetails);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`bg-white dark:bg-gray-900 ${language === 'ar' ? 'rtl' : 'ltr'} rounded-t-2xl md:rounded-2xl shadow-2xl max-w-4xl w-full mx-4 mb-0 md:mb-4 max-h-[90vh] overflow-y-auto`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t.iabFramework}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t.description}
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                {t.disclaimer}
              </p>
            </div>
          </div>

          {/* Detailed options (collapsible) */}
          {showDetails && (
            <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.detailsTitle}
              </h3>

              {/* Analytics */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.purposes.analytics.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.purposes.analytics.description}
                </p>
              </div>

              {/* Ads */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.purposes.ads.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.purposes.ads.description}
                </p>
              </div>

              {/* Functional */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.purposes.functional.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.purposes.functional.description}
                </p>
              </div>

              {/* Partners */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.partners}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.partnersDescription}
                </p>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              to="/privacy-policy"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
            >
              {t.privacyPolicy}
            </Link>
            <Link
              to="/medical-disclaimer"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
            >
              {language === 'fr' ? 'Avertissement médical' : 'تنويه طبي'}
            </Link>
            <a
              href="https://iabeurope.eu/transparency-consent-framework/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
            >
              {language === 'fr' ? 'En savoir plus sur le TCF' : 'المزيد عن TCF'}
            </a>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
            >
              {t.acceptAll}
            </Button>
            <Button
              onClick={handleManageOptions}
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 py-3"
            >
              {t.manageOptions}
            </Button>
            <Button
              onClick={handleDeclineAll}
              variant="ghost"
              className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-700 py-3"
            >
              {t.declineAll}
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            {language === 'fr'
              ? "Vous pouvez modifier vos préférences à tout moment dans les paramètres."
              : "يمكنك تغيير تفضيلاتك في أي وقت من الإعدادات."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
