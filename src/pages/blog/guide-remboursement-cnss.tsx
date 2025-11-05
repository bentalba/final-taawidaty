/**
 * CNSS Reimbursement Guide Blog Post
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getBlogPostById, getRecentBlogPosts } from '@/lib/blogData';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import BlogCard from '@/components/BlogCard';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GuideRemboursementCnss() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('guide-remboursement-cnss');
  const recentPosts = getRecentBlogPosts(3).filter(p => p.id !== 'guide-remboursement-cnss');

  if (!post) return <Navigate to="/blog" replace />;

  const title = post.title[language];
  const description = post.description[language];

  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    language === 'ar' ? 'ar-MA' : 'fr-FR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const breadcrumbItems = [
    { label: language === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
    { label: title }
  ];

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": `https://taawidaty.ma${post.image}`,
    "datePublished": post.publishDate,
    "dateModified": post.lastModified,
    "author": { "@type": "Person", "name": post.author },
    "publisher": {
      "@type": "Organization",
      "name": "Taawidaty",
      "logo": { "@type": "ImageObject", "url": "https://taawidaty.ma/logos/TAAWIDATY.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://taawidaty.ma/blog/${post.id}` }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://taawidaty.ma" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://taawidaty.ma/blog" },
      { "@type": "ListItem", "position": 3, "name": title, "item": `https://taawidaty.ma/blog/${post.id}` }
    ]
  };

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
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

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
              CNSS
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${
            isRTL ? 'font-arabic text-right' : ''
          }`}>
            {title}
          </h1>

          <div className={`flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700 ${
            isRTL ? 'flex-row-reverse' : ''
          }`}>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} min</span>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.imageAlt[language]}
            className="w-full h-96 object-cover rounded-2xl mb-12 shadow-lg"
          />

          {/* ACTUAL BLOG CONTENT */}
          <div className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? 'prose-rtl font-arabic' : ''}`}>
            {language === 'fr' ? (
              <>
                <p className="lead text-xl text-slate-700 dark:text-slate-300 mb-8">
                  La CNSS (Caisse Nationale de Sécurité Sociale) est l'organisme qui gère l'assurance maladie obligatoire (AMO) pour les salariés du secteur privé au Maroc. Ce guide complet vous explique tout ce que vous devez savoir sur le remboursement de vos médicaments.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Qu'est-ce que la CNSS ?</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  La CNSS couvre les salariés du secteur privé, les artisans, les travailleurs indépendants et leurs ayants droit. Elle offre une couverture médicale de base pour les soins de santé, y compris les médicaments.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Taux de remboursement CNSS</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Le taux de remboursement varie selon le type de médicament :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li><strong>Médicaments essentiels :</strong> 70% du prix de référence</li>
                  <li><strong>Médicaments vitaux :</strong> 90% du prix de référence</li>
                  <li><strong>Médicaments génériques :</strong> Meilleur taux de remboursement</li>
                  <li><strong>Médicaments non remboursables :</strong> 0%</li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
                  <h3 className="text-blue-900 dark:text-blue-100 font-bold text-xl mt-0 mb-3">💡 Bon à savoir</h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-0">
                    Le remboursement se base sur le prix de référence (base de remboursement), pas sur le prix de vente public. C'est pourquoi vous devez parfois payer une partie du coût.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Comment fonctionne le système de tiers payant ?</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Avec le système de tiers payant, vous ne payez que la part non remboursée à la pharmacie. La CNSS règle directement sa part à la pharmacie.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Conditions pour bénéficier du tiers payant :</h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li>Être à jour de vos cotisations CNSS</li>
                  <li>Présenter votre carte d'immatriculation CNSS</li>
                  <li>Avoir une ordonnance médicale valide</li>
                  <li>Acheter dans une pharmacie conventionnée</li>
                </ol>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Procédure de remboursement sans tiers payant</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Si vous payez la totalité à la pharmacie, voici comment obtenir votre remboursement :
                </p>

                <div className="space-y-6 my-8">
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Conservez vos documents</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">Ordonnance médicale originale et facture détaillée de la pharmacie</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Remplissez le formulaire</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">Téléchargez et remplissez le formulaire de demande de remboursement sur le site CNSS</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Déposez votre dossier</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">Soumettez votre dossier complet à l'agence CNSS ou en ligne</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Recevez votre remboursement</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">Le remboursement est effectué par virement bancaire sous 15 à 30 jours</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Documents nécessaires</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li>Carte d'immatriculation CNSS à jour</li>
                  <li>Ordonnance médicale originale (datant de moins de 3 mois)</li>
                  <li>Facture originale de la pharmacie avec cachet</li>
                  <li>RIB bancaire pour le virement</li>
                  <li>Copie de la CIN</li>
                </ul>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Délais de remboursement</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Les délais varient selon la méthode de soumission :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li><strong>En ligne :</strong> 15 à 20 jours ouvrables</li>
                  <li><strong>En agence :</strong> 20 à 30 jours ouvrables</li>
                  <li><strong>Cas complexes :</strong> Jusqu'à 45 jours</li>
                </ul>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Médicaments non remboursables</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Certains médicaments ne sont pas couverts par la CNSS :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li>Médicaments de confort (vitamines, compléments alimentaires)</li>
                  <li>Médicaments cosmétiques</li>
                  <li>Produits parapharmaceutiques</li>
                  <li>Médicaments non inscrits sur la liste officielle</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
                  <h3 className="text-green-900 dark:text-green-100 font-bold text-xl mt-0 mb-3">✅ Astuce pour maximiser votre remboursement</h3>
                  <ul className="list-disc pl-6 space-y-2 text-green-800 dark:text-green-200 mb-0">
                    <li>Demandez à votre médecin de prescrire des génériques quand c'est possible</li>
                    <li>Vérifiez que vos cotisations sont à jour avant d'acheter</li>
                    <li>Conservez toujours les documents originaux</li>
                    <li>Utilisez notre calculateur pour connaître le montant exact avant d'acheter</li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Différence avec la CNOPS</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  La CNSS couvre les salariés du secteur privé, tandis que la CNOPS couvre les fonctionnaires. Les taux et procédures diffèrent légèrement. Consultez notre <Link to="/blog/difference-cnss-cnops" className="text-primary-600 hover:text-primary-700 underline">article de comparaison détaillée</Link>.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Questions fréquentes</h2>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Puis-je être remboursé pour des médicaments achetés sans ordonnance ?</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Non, une ordonnance médicale valide est obligatoire pour tout remboursement CNSS.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Que faire si ma demande est rejetée ?</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Vous recevrez une notification avec les motifs du rejet. Vous pouvez compléter votre dossier et le soumettre à nouveau dans les 30 jours.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Le remboursement est-il automatique avec la carte CNSS ?</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Oui, si la pharmacie pratique le tiers payant et que vous êtes à jour de vos cotisations.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Ressources utiles</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li><a href="https://www.cnss.ma" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Site officiel CNSS</a></li>
                  <li><Link to="/faq-cnss" className="text-primary-600 hover:text-primary-700 underline">FAQ CNSS complète</Link></li>
                  <li><Link to="/" className="text-primary-600 hover:text-primary-700 underline">Calculateur de remboursement</Link></li>
                </ul>

              </>
            ) : (
              <>
                <p className="lead text-xl text-slate-700 dark:text-slate-300 mb-8">
                  الصندوق الوطني للضمان الاجتماعي (CNSS) هو الهيئة التي تدير التأمين الصحي الإلزامي (AMO) للموظفين في القطاع الخاص في المغرب. يشرح لك هذا الدليل الشامل كل ما تحتاج لمعرفته حول استرداد أدويتك.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">ما هو CNSS؟</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  يغطي CNSS موظفي القطاع الخاص والحرفيين والعاملين المستقلين وذوي حقوقهم. يوفر تغطية طبية أساسية للرعاية الصحية، بما في ذلك الأدوية.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">معدلات الاسترداد CNSS</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  يعتمد معدل الاسترداد على نوع الدواء:
                </p>
                <ul className="list-disc pr-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li><strong>الأدوية الأساسية:</strong> 70٪ من السعر المرجعي</li>
                  <li><strong>الأدوية الحيوية:</strong> 90٪ من السعر المرجعي</li>
                  <li><strong>الأدوية الجنيسة:</strong> أفضل معدل استرداد</li>
                  <li><strong>الأدوية غير القابلة للاسترداد:</strong> 0٪</li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 p-6 rounded-l-lg my-8">
                  <h3 className="text-blue-900 dark:text-blue-100 font-bold text-xl mt-0 mb-3">💡 معلومة مهمة</h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-0">
                    يعتمد الاسترداد على السعر المرجعي (أساس الاسترداد)، وليس على سعر البيع العام. لهذا السبب قد تضطر أحيانًا إلى دفع جزء من التكلفة.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">كيف يعمل نظام الدفع من طرف ثالث؟</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  مع نظام الدفع من طرف ثالث، تدفع فقط الجزء غير المسترد في الصيدلية. تسدد CNSS حصتها مباشرة إلى الصيدلية.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">شروط الاستفادة من الدفع من طرف ثالث:</h3>
                <ol className="list-decimal pr-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li>أن تكون محدثاً لاشتراكاتك في CNSS</li>
                  <li>تقديم بطاقة التسجيل الخاصة بك في CNSS</li>
                  <li>امتلاك وصفة طبية صالحة</li>
                  <li>الشراء من صيدلية معتمدة</li>
                </ol>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">إجراءات الاسترداد بدون طرف ثالث</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  إذا دفعت المبلغ الكامل في الصيدلية، إليك كيفية الحصول على استردادك:
                </p>

                <div className="space-y-6 my-8">
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">احتفظ بمستنداتك</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">الوصفة الطبية الأصلية والفاتورة المفصلة من الصيدلية</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">املأ النموذج</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">قم بتنزيل وملء استمارة طلب الاسترداد من موقع CNSS</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">قدم ملفك</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">قدم ملفك الكامل إلى وكالة CNSS أو عبر الإنترنت</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">استلم استردادك</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">يتم الاسترداد عن طريق التحويل البنكي خلال 15 إلى 30 يومًا</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">الوثائق المطلوبة</h2>
                <ul className="list-disc pr-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li>بطاقة التسجيل CNSS محدثة</li>
                  <li>الوصفة الطبية الأصلية (بتاريخ أقل من 3 أشهر)</li>
                  <li>الفاتورة الأصلية من الصيدلية مع الختم</li>
                  <li>RIB البنكي للتحويل</li>
                  <li>نسخة من بطاقة التعريف الوطنية</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600 p-6 rounded-l-lg my-8">
                  <h3 className="text-green-900 dark:text-green-100 font-bold text-xl mt-0 mb-3">✅ نصيحة لزيادة استردادك إلى أقصى حد</h3>
                  <ul className="list-disc pr-6 space-y-2 text-green-800 dark:text-green-200 mb-0">
                    <li>اطلب من طبيبك وصف الأدوية الجنيسة عندما يكون ذلك ممكنًا</li>
                    <li>تحقق من تحديث اشتراكاتك قبل الشراء</li>
                    <li>احتفظ دائمًا بالمستندات الأصلية</li>
                    <li>استخدم حاسبتنا لمعرفة المبلغ الدقيق قبل الشراء</li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">الفرق مع CNOPS</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  تغطي CNSS موظفي القطاع الخاص، بينما تغطي CNOPS الموظفين العموميين. تختلف المعدلات والإجراءات قليلاً. راجع <Link to="/blog/difference-cnss-cnops" className="text-primary-600 hover:text-primary-700 underline">مقالنا المقارن المفصل</Link>.
                </p>

              </>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-primary-200 dark:border-primary-700">
            <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-4 ${
              isRTL ? 'font-arabic text-right' : ''
            }`}>
              {language === 'ar'
                ? 'احسب استردادك الآن'
                : 'Calculez votre remboursement maintenant'}
            </h3>
            <p className={`text-slate-600 dark:text-slate-300 mb-6 ${
              isRTL ? 'font-arabic text-right' : ''
            }`}>
              {language === 'ar'
                ? 'استخدم حاسبتنا المجانية لمعرفة المبلغ الذي سيتم استرداده بالضبط'
                : 'Utilisez notre calculateur gratuit pour connaître le montant exact de votre remboursement'}
            </p>
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                {language === 'ar' ? 'الذهاب إلى الحاسبة' : 'Accéder au calculateur'}
              </Button>
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        {recentPosts.length > 0 && (
          <section className="bg-slate-100 dark:bg-slate-800/50 py-16">
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center ${
                isRTL ? 'font-arabic' : ''
              }`}>
                {language === 'ar' ? 'مقالات ذات صلة' : 'Articles connexes'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map(p => <BlogCard key={p.id} post={p} />)}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
