/**
 * Cookie Preferences Page
 * Allows users to manage their consent preferences
 * GDPR, IAB TCF v2.2, and Google Consent Mode v2 compliant
 */

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BaseLayout from '@/layouts/BaseLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Cookie, BarChart, Target, Settings, Info, AlertCircle } from 'lucide-react';
import { updateConsent, getConsentState } from '@/utils/consentManager';

export default function CookiePreferences() {
  const { language } = useLanguage();
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [adsConsent, setAdsConsent] = useState(false);
  const [functionalConsent, setFunctionalConsent] = useState(true); // Always true - essential
  const [saved, setSaved] = useState(false);

  const content = {
    fr: {
      title: "Préférences de Cookies",
      subtitle: "Gérez vos préférences de confidentialité",
      description: "Vous avez le contrôle sur les cookies et technologies similaires que nous utilisons. Modifiez vos préférences à tout moment.",
      essentialTitle: "Cookies essentiels",
      essentialDescription: "Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés. Ils sont généralement définis en réponse à des actions que vous effectuez.",
      alwaysActive: "Toujours actif",
      analyticsTitle: "Cookies analytiques",
      analyticsDescription: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site. Toutes les informations sont collectées de manière anonyme.",
      analyticsDetails: [
        "Google Analytics 4 - Analyse du trafic et comportement des utilisateurs",
        "Mesure de performance des pages",
        "Statistiques d'utilisation du calculateur",
        "Aucune donnée personnellement identifiable n'est collectée"
      ],
      adsTitle: "Cookies publicitaires",
      adsDescription: "Ces cookies sont utilisés pour afficher des publicités pertinentes. Ils permettent également de mesurer l'efficacité des campagnes publicitaires.",
      adsDetails: [
        "Google AdSense - Publicités personnalisées",
        "Mesure de performance des publicités",
        "Remarketing (publicités basées sur vos visites)",
        "Les données sont partagées avec des partenaires publicitaires certifiés"
      ],
      currentSettings: "Paramètres actuels",
      notSet: "Non défini",
      lastUpdated: "Dernière mise à jour",
      saveButton: "Enregistrer les préférences",
      acceptAllButton: "Tout accepter",
      rejectAllButton: "Tout refuser",
      savedMessage: "Vos préférences ont été enregistrées avec succès",
      iabInfo: "Conformité IAB TCF",
      iabDescription: "Ce site utilise le Transparency and Consent Framework (TCF) v2.2 de l'IAB Europe. Vos choix seront respectés par tous les partenaires publicitaires certifiés.",
      gdprInfo: "Vos droits RGPD",
      gdprDescription: "Conformément au RGPD, vous avez le droit d'accéder, de rectifier, de supprimer ou de limiter l'utilisation de vos données personnelles. Contactez-nous à privacy@taawidaty.ma",
      expirationInfo: "Expiration des préférences",
      expirationDescription: "Vos préférences de cookies sont stockées pendant 13 mois maximum (conformément aux exigences de l'IAB). Vous devrez confirmer à nouveau vos choix après cette période.",
      partnersInfo: "Nos partenaires",
      partnersDescription: "Nous travaillons uniquement avec des partenaires publicitaires certifiés par Google qui respectent les normes de confidentialité européennes."
    },
    ar: {
      title: "تفضيلات ملفات تعريف الارتباط",
      subtitle: "إدارة تفضيلات الخصوصية الخاصة بك",
      description: "لديك السيطرة الكاملة على ملفات تعريف الارتباط والتقنيات المماثلة التي نستخدمها. يمكنك تغيير تفضيلاتك في أي وقت.",
      essentialTitle: "ملفات تعريف الارتباط الأساسية",
      essentialDescription: "ملفات تعريف الارتباط هذه ضرورية لعمل الموقع ولا يمكن تعطيلها. يتم تعيينها عادةً استجابةً للإجراءات التي تقوم بها.",
      alwaysActive: "نشط دائمًا",
      analyticsTitle: "ملفات تعريف الارتباط التحليلية",
      analyticsDescription: "تساعدنا ملفات تعريف الارتباط هذه على فهم كيفية تفاعل الزوار مع موقعنا. يتم جمع جميع المعلومات بشكل مجهول.",
      analyticsDetails: [
        "Google Analytics 4 - تحليل حركة المرور وسلوك المستخدمين",
        "قياس أداء الصفحات",
        "إحصائيات استخدام الآلة الحاسبة",
        "لا يتم جمع أي بيانات تعريف شخصية"
      ],
      adsTitle: "ملفات تعريف الارتباط الإعلانية",
      adsDescription: "تُستخدم ملفات تعريف الارتباط هذه لعرض إعلانات ذات صلة. كما تسمح بقياس فعالية الحملات الإعلانية.",
      adsDetails: [
        "Google AdSense - إعلانات مخصصة",
        "قياس أداء الإعلانات",
        "إعادة الاستهداف (الإعلانات بناءً على زياراتك)",
        "تتم مشاركة البيانات مع شركاء إعلانيين معتمدين"
      ],
      currentSettings: "الإعدادات الحالية",
      notSet: "غير محدد",
      lastUpdated: "آخر تحديث",
      saveButton: "حفظ التفضيلات",
      acceptAllButton: "قبول الكل",
      rejectAllButton: "رفض الكل",
      savedMessage: "تم حفظ تفضيلاتك بنجاح",
      iabInfo: "امتثال IAB TCF",
      iabDescription: "يستخدم هذا الموقع إطار الشفافية والموافقة (TCF) v2.2 من IAB Europe. سيتم احترام اختياراتك من قبل جميع الشركاء الإعلانيين المعتمدين.",
      gdprInfo: "حقوقك في RGPD",
      gdprDescription: "وفقًا لـ RGPD، لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها أو تقييد استخدامها. اتصل بنا على privacy@taawidaty.ma",
      expirationInfo: "انتهاء صلاحية التفضيلات",
      expirationDescription: "يتم تخزين تفضيلات ملفات تعريف الارتباط الخاصة بك لمدة أقصاها 13 شهرًا (وفقًا لمتطلبات IAB). ستحتاج إلى تأكيد اختياراتك مرة أخرى بعد هذه الفترة.",
      partnersInfo: "شركاؤنا",
      partnersDescription: "نعمل فقط مع شركاء إعلانيين معتمدين من Google يحترمون معايير الخصوصية الأوروبية."
    }
  };

  const t = content[language];

  // Load current consent state on mount
  useEffect(() => {
    const state = getConsentState();
    if (state) {
      setAnalyticsConsent(state.analytics);
      setAdsConsent(state.ads);
      setFunctionalConsent(state.functional);
    }
  }, []);

  const handleSave = () => {
    updateConsent({
      analytics: analyticsConsent,
      ads: adsConsent,
      functional: functionalConsent,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptAll = () => {
    setAnalyticsConsent(true);
    setAdsConsent(true);
    setFunctionalConsent(true);

    updateConsent({
      analytics: true,
      ads: true,
      functional: true,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectAll = () => {
    setAnalyticsConsent(false);
    setAdsConsent(false);
    setFunctionalConsent(true); // Keep functional

    updateConsent({
      analytics: false,
      ads: false,
      functional: true,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentState = getConsentState();

  return (
    <BaseLayout>
      <Helmet>
        <title>{t.title} - TAAWIDATY</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={`min-h-screen py-20 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Cookie className="w-16 h-16 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* Success message */}
          {saved && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-green-900 dark:text-green-100 font-semibold">
                  {t.savedMessage}
                </p>
              </div>
            </div>
          )}

          {/* Current settings info */}
          {currentState && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {t.currentSettings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.lastUpdated}: {new Date(currentState.timestamp || Date.now()).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'ar-MA')}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Cookie categories */}
          <div className="space-y-6">
            {/* Essential Cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Settings className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <CardTitle>{t.essentialTitle}</CardTitle>
                      <CardDescription className="mt-2">
                        {t.essentialDescription}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t.alwaysActive}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Analytics Cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <BarChart className="w-6 h-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <CardTitle>{t.analyticsTitle}</CardTitle>
                      <CardDescription className="mt-2">
                        {t.analyticsDescription}
                      </CardDescription>
                      <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {t.analyticsDetails.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-600">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Switch
                    checked={analyticsConsent}
                    onCheckedChange={setAnalyticsConsent}
                    className="mt-1"
                  />
                </div>
              </CardHeader>
            </Card>

            {/* Advertising Cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Target className="w-6 h-6 text-orange-600 mt-1" />
                    <div className="flex-1">
                      <CardTitle>{t.adsTitle}</CardTitle>
                      <CardDescription className="mt-2">
                        {t.adsDescription}
                      </CardDescription>
                      <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {t.adsDetails.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-600">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Switch
                    checked={adsConsent}
                    onCheckedChange={setAdsConsent}
                    className="mt-1"
                  />
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
            >
              {t.saveButton}
            </Button>
            <Button
              onClick={handleAcceptAll}
              variant="outline"
              className="flex-1 py-6 text-lg"
            >
              {t.acceptAllButton}
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="ghost"
              className="flex-1 py-6 text-lg"
            >
              {t.rejectAllButton}
            </Button>
          </div>

          {/* Additional information */}
          <div className="mt-12 space-y-6">
            {/* IAB TCF */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                  <Shield className="w-5 h-5" />
                  {t.iabInfo}
                </CardTitle>
                <CardDescription className="text-blue-800 dark:text-blue-200">
                  {t.iabDescription}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* GDPR Rights */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                  <AlertCircle className="w-5 h-5" />
                  {t.gdprInfo}
                </CardTitle>
                <CardDescription className="text-green-800 dark:text-green-200">
                  {t.gdprDescription}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Expiration info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {t.expirationInfo}
                </CardTitle>
                <CardDescription>
                  {t.expirationDescription}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Partners info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {t.partnersInfo}
                </CardTitle>
                <CardDescription>
                  {t.partnersDescription}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
