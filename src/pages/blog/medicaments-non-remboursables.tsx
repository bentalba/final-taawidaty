import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getBlogPostById } from '@/lib/blogData';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Ban, Search, HelpCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NonRemboursables() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('medicaments-non-remboursables');

  if (!post) return <Navigate to="/blog" replace />;

  const title = post.title[language];
  const description = post.description[language];

  const breadcrumbItems = [
    { label: language === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
    { label: title }
  ];

  const content = {
    fr: {
      intro: "Il n'y a rien de plus frustrant que de déposer un dossier de 500 DH et de ne recevoir que 100 DH. Souvent, la cause n'est pas une erreur de calcul, mais la présence de médicaments « hors panier ». Voici comment les repérer.",
      sections: [
        {
          title: "Le concept du « Panier de Soins »",
          text: "L'assurance maladie au Maroc ne couvre pas tout ce qui se vend en pharmacie. Elle se concentre sur les médicaments essentiels pour traiter les maladies. Cette liste de médicaments couverts s'appelle le « Panier de Soins Remboursables »."
        },
        {
          title: "Ce qui est généralement EXCLU",
          text: "Voici les catégories souvent refusées :\n\n• Vitamines et Minéraux : Sauf s'ils sont prescrits pour une carence pathologique grave.\n• Compléments alimentaires : Jamais remboursés (Protéines, Omega 3, etc.).\n• Dermocosmétique : Crèmes hydratantes, écrans solaires, shampoings anti-chute.\n• Confort sexuel : Les traitements pour les troubles de l'érection sont souvent exclus."
        },
        {
          title: "Comment éviter les surprises ?",
          text: "Avant de passer à la caisse :\n1. Demandez à votre médecin : « Ce complément est-il remboursable ? »\n2. Vérifiez sur notre site TAAWIDATY. Si la base de remboursement affiche 0 DH, vous ne toucherez rien pour ce produit."
        }
      ],
      warning: "Attention : Parfois, un même médicament existe en deux versions. Une version « médicament » remboursable et une version « complément » non remboursable. Vérifiez toujours le code barre.",
      conclusion: "Ne jetez pas votre ordonnance ! Même si certains médicaments ne sont pas remboursés, les autres sur la même feuille peuvent l'être."
    },
    ar: {
      intro: "لا شيء أكثر إحباطاً من إيداع ملف بقيمة 500 درهم واستلام 100 درهم فقط. غالباً ما لا يكون السبب خطأ في الحساب، بل وجود أدوية \"خارج سلة العلاجات\". إليك كيفية اكتشافها.",
      sections: [
        {
          title: "مفهوم \"سلة العلاجات\"",
          text: "التأمين الصحي في المغرب لا يغطي كل ما يباع في الصيدلية. إنه يركز على الأدوية الأساسية لعلاج الأمراض. تسمى قائمة الأدوية المغطاة \"سلة العلاجات القابلة للاسترداد\"."
        },
        {
          title: "ما يتم استبعاده عادةً",
          text: "إليك الفئات التي يتم رفضها غالباً:\n\n• الفيتامينات والمعادن: إلا إذا وصفت لنقص مرضي خطير.\n• المكملات الغذائية: لا تعوض أبداً (البروتينات، أوميغا 3، إلخ).\n• مستحضرات التجميل الطبية: الكريمات المرطبة، واقيات الشمس، شامبو تساقط الشعر.\n• الراحة الجنسية: غالباً ما يتم استبعاد علاجات ضعف الانتصاب."
        },
        {
          title: "كيف تتجنب المفاجآت؟",
          text: "قبل الدفع في الصيدلية:\n1. اسأل طبيبك: \"هل هذا المكمل قابل للاسترداد؟\"\n2. تحقق على موقعنا \"تعويضاتي\". إذا كانت قاعدة الاسترداد تعرض 0 درهم، فلن تحصل على أي شيء لهذا المنتج."
        }
      ],
      warning: "تنبيه: أحياناً، يوجد نفس الدواء في نسختين. نسخة \"دواء\" قابلة للاسترداد ونسخة \"مكمل\" غير قابلة للاسترداد. تحقق دائماً من الرمز الشريطي (Code à barre).",
      conclusion: "لا ترمِ وصفتك الطبية! حتى لو كانت بعض الأدوية غير قابلة للاسترداد، فإن الأدوية الأخرى في نفس الورقة قد تكون مقبولة."
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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              {language === 'ar' ? 'تحذير' : 'Important'}
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium border-b pb-8">
              {t.intro}
            </p>

            <div className="grid gap-8">
              {t.sections.map((section, index) => (
                <Card key={index} className="bg-slate-50 dark:bg-slate-800/50 hover:border-red-100 dark:hover:border-red-900 transition-colors">
                  <CardContent className="pt-6">
                    <h2 className={`text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
                      {index === 0 && <HelpCircle className="w-6 h-6 text-red-500" />}
                      {index === 1 && <Ban className="w-6 h-6 text-red-500" />}
                      {index === 2 && <Search className="w-6 h-6 text-red-500" />}
                      {section.title}
                    </h2>
                    <div className={`text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {section.text}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6">
              <div className="flex gap-3 items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className={`font-bold text-red-900 dark:text-red-100 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'fr' ? "Important" : "مهم"}
                  </h3>
                  <p className={`text-red-800 dark:text-red-200 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t.warning}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <p className={`text-slate-700 dark:text-slate-300 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.conclusion}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
