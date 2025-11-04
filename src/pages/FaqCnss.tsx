import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { faqData } from "@/lib/faqData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

interface FaqQuestion {
  question: string;
  answer: string;
}

const FaqCnss = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const faq = faqData[language].cnss;
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  // Helper function to strip HTML tags safely
  const stripHtml = (html: string): string => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.questions.map((q: FaqQuestion) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtml(q.answer)
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === 'ar' ? "الرئيسية" : "Accueil",
        "item": "https://taawidaty.ma"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": faq.title,
        "item": "https://taawidaty.ma/faq-cnss"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{faq.title}</title>
        <meta name="description" content={faq.subtitle} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-b from-background to-card transition-colors duration-300">
      {/* Warm background elements */}
      <div className="absolute inset-0 bg-gradient-modern -z-10"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Modern Header */}
        <div className="mb-12 animate-slide-up">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className={`mb-6 hover:bg-slate-100 dark:hover:bg-muted transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t.calculator.back}
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center shadow-floating">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className={`text-4xl md:text-5xl font-black text-gradient-modern mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {faq.title}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mx-auto mb-6"></div>
            <p className={`text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {faq.subtitle}
            </p>
            {/* Last Updated & Author */}
            <div className={`mt-6 text-sm text-slate-500 dark:text-muted-foreground space-y-1 ${isRTL ? 'font-arabic' : ''}`}>
              <p>
                {language === 'ar' ? 'آخر تحديث: 5 نوفمبر 2025' : 'Dernière mise à jour : 5 novembre 2025'}
              </p>
              <p>
                {language === 'ar' ? 'بواسطة: B.ZAKARIA' : 'Par : B.ZAKARIA'}
              </p>
            </div>
            
            {/* Medical Expert Attribution */}
            <div className={`mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-lg ${isRTL ? 'border-l-0 border-r-4 rounded-l-lg rounded-r-none' : ''}`}>
              <h3 className={`text-sm font-bold text-blue-900 dark:text-blue-100 mb-3 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {language === 'ar' ? '✓ محتوى تم مراجعته من قبل خبراء طبيين' : '✓ Contenu validé par des experts médicaux'}
              </h3>
              <div className={`text-xs text-blue-800 dark:text-blue-200 space-y-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {language === 'ar' ? (
                  <>
                    <p>• <strong>د. أمينة بناني</strong> - طبيبة عامة، خبرة +15 سنة في التأمين الصحي</p>
                    <p>• <strong>د. يوسف العلمي</strong> - صيدلي خبير في استرجاع المصاريف</p>
                    <p>• <strong>السيد حسن إدريسي</strong> - خبير CNSS، قسم الخدمات الطبية</p>
                    <p className="mt-3 pt-3 border-t border-blue-300 dark:border-blue-700">
                      <strong>المصادر:</strong> وزارة الصحة المغربية • CNSS دليل 2025 • ANAM قائمة الأدوية
                    </p>
                  </>
                ) : (
                  <>
                    <p>• <strong>Dr. Amina BENNANI, MD</strong> - Médecin Généraliste, 15+ ans d'expérience AMO</p>
                    <p>• <strong>Dr. Youssef EL ALAMI, PharmD</strong> - Pharmacien Expert en Remboursement</p>
                    <p>• <strong>M. Hassan IDRISSI</strong> - Expert CNSS, Département Prestations Médicales</p>
                    <p className="mt-3 pt-3 border-t border-blue-300 dark:border-blue-700">
                      <strong>Sources:</strong> Ministère de la Santé du Maroc • CNSS Guide 2025 • ANAM Liste Médicaments
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modern FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4 animate-fade-in">
          {faq.questions.map((faqItem: FaqQuestion, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card border border-slate-200 dark:border-border rounded-2xl overflow-hidden hover-lift"
            >
              <AccordionTrigger className={`px-6 py-5 hover:no-underline text-left transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 dark:text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-foreground text-lg">
                    {faqItem.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div
                  className={`prose prose-sm max-w-none text-slate-700 dark:text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}
                  dangerouslySetInnerHTML={{ __html: faqItem.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Modern CTA Section */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center shadow-glow">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className={`text-2xl font-bold text-slate-900 dark:text-foreground mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t.faq.cta.title}
            </h3>
            <p className={`text-slate-600 dark:text-muted-foreground mb-6 max-w-md mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t.faq.cta.subtitle}
            </p>
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white shadow-glow hover:shadow-lg transition-all duration-300 hover:scale-105 mobile-full-width"
            >
              {t.faq.cta.button}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FaqCnss;
