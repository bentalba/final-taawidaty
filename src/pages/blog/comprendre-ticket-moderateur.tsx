import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getBlogPostById } from '@/lib/blogData';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TicketModerateur() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('comprendre-ticket-moderateur');

  if (!post) return <Navigate to="/blog" replace />;

  const title = post.title[language];
  const description = post.description[language];

  const breadcrumbItems = [
    { label: language === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
    { label: title }
  ];

  const content = {
    fr: {
      intro: "Vous avez acheté des médicaments pour 1000 DH, mais vous n'avez reçu que 700 DH de remboursement ? Ce n'est pas une erreur. Cette différence s'appelle le « Ticket Modérateur ». Voici tout ce que vous devez savoir pour mieux gérer votre budget santé.",
      sections: [
        {
          title: "Qu'est-ce que le Ticket Modérateur ?",
          text: "Le ticket modérateur est la partie des frais médicaux qui reste à votre charge après le remboursement de l'assurance maladie. C'est votre contribution personnelle aux frais de santé. En règle générale, pour les soins ambulatoires (consultations, médicaments courants), l'assurance couvre 70% et vous payez les 30% restants."
        },
        {
          title: "Le piège du « Tarif de Référence »",
          text: "C'est ici que beaucoup de gens sont confus. Les 70% ne sont pas toujours calculés sur le prix que vous avez payé à la pharmacie (PPV), mais sur le « Tarif National de Référence » (TNR).\n\nSi vous achetez un médicament de marque à 100 DH, mais qu'il existe un générique à 60 DH, l'assurance calculera le remboursement sur la base de 60 DH. Votre reste à charge sera donc beaucoup plus élevé que les 30% prévus."
        },
        {
          title: "Quand est-on exonéré ?",
          text: "Dans certains cas graves, vous ne payez pas de ticket modérateur (ou très peu). C'est le cas pour les Affections de Longue Durée (ALD) comme le diabète ou l'hypertension, où la couverture peut atteindre 90% voire 100% pour les médicaments liés à la maladie."
        }
      ],
      tip: "Utilisez toujours notre simulateur TAAWIDATY avant d'acheter pour connaître le montant exact qui sera remboursé, basé sur le Tarif de Référence réel.",
      conclusion: "Le ticket modérateur est une règle légale au Maroc. Pour réduire votre facture, demandez toujours à votre médecin ou pharmacien s'il existe un médicament « générique » moins cher."
    },
    ar: {
      intro: "هل اشتريت أدوية بقيمة 1000 درهم، لكنك استلمت 700 درهم فقط كتعويض؟ هذا ليس خطأ. هذا الفرق يسمى \"تذكرة التعديل\" (Ticket Modérateur). إليك كل ما تحتاج لمعرفته لإدارة ميزانيتك الصحية بشكل أفضل.",
      sections: [
        {
          title: "ما هي تذكرة التعديل؟",
          text: "تذكرة التعديل هي جزء من النفقات الطبية الذي يبقى على عاتقك بعد تعويض التأمين الصحي. إنها مساهمتك الشخصية في تكاليف العلاج. بشكل عام، بالنسبة للعلاجات الخارجية (الاستشارات، الأدوية العادية)، يغطي التأمين 70٪ وتدفع أنت الـ 30٪ المتبقية."
        },
        {
          title: "فخ \"التعريفة المرجعية\"",
          text: "هنا يقع الكثير من الناس في الحيرة. لا يتم حساب نسبة 70٪ دائماً على السعر الذي دفعته في الصيدلية (PPV)، بل على \"التعريفة الوطنية المرجعية\" (TNR).\n\nإذا اشتريت دواءً أصلياً بسعر 100 درهم، ولكن يوجد دواء جنيس بسعر 60 درهم، فإن التأمين سيحسب التعويض بناءً على 60 درهم. وبالتالي، سيكون المبلغ المتبقي عليك أعلى بكثير من الـ 30٪ المتوقعة."
        },
        {
          title: "متى يتم الإعفاء؟",
          text: "في بعض الحالات الخطيرة، لا تدفع تذكرة التعديل (أو تدفع القليل جداً). هذا هو الحال بالنسبة للأمراض المزمنة (ALD) مثل السكري أو ارتفاع ضغط الدم، حيث يمكن أن تصل التغطية إلى 90٪ أو حتى 100٪ للأدوية المتعلقة بالمرض."
        }
      ],
      tip: "استخدم دائماً محاكي \"تعويضاتي\" قبل الشراء لمعرفة المبلغ الدقيق الذي سيتم تعويضه، بناءً على التعريفة المرجعية الحقيقية.",
      conclusion: "تذكرة التعديل هي قاعدة قانونية في المغرب. لتقليل فاتورتك، اطلب دائماً من طبيبك أو الصيدلي ما إذا كان هناك دواء \"جنيس\" أرخص."
    }
  };

  const t = content[language];

  return (
    <>
      <SEO
        title={`${title} | Taawidaty`}
        description={description}
        keywords={post.keywords.join(', ')}
        canonical={`https://taawidaty.ma/blog/${post.id}`}
        image={`https://taawidaty.ma${post.image}`}
        lang={language}
      />
      
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <BlogBreadcrumb items={breadcrumbItems} />

          <Link to="/blog" className="mb-8 inline-block">
            <Button variant="ghost" className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              <span className={isRTL ? 'font-arabic' : ''}>
                {language === 'ar' ? 'العودة إلى المدونة' : 'Retour au blog'}
              </span>
            </Button>
          </Link>

          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {language === 'ar' ? 'معلومات عامة' : 'Information Générale'}
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium border-b pb-8">
              {t.intro}
            </p>

            <div className="space-y-12">
              {t.sections.map((section, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="hidden md:flex w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 font-bold text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold text-slate-900 dark:text-white mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {section.title}
                    </h2>
                    <div className={`text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {section.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6 flex flex-col md:flex-row gap-4 items-start">
                <Calculator className="w-8 h-8 text-yellow-600 dark:text-yellow-500 shrink-0" />
                <div>
                  <h3 className={`font-bold text-yellow-900 dark:text-yellow-100 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'fr' ? "Conseil d'expert" : "نصيحة الخبراء"}
                  </h3>
                  <p className={`text-yellow-800 dark:text-yellow-200 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t.tip}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <h3 className={`font-bold text-slate-900 dark:text-white mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'fr' ? "En résumé" : "خلاصة"}
              </h3>
              <p className={`text-slate-700 dark:text-slate-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.conclusion}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
