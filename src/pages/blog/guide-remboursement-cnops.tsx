/**
 * CNOPS Reimbursement Guide Blog Post
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

export default function GuideRemboursementCnops() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('guide-remboursement-cnops');
  const recentPosts = getRecentBlogPosts(3).filter(p => p.id !== 'guide-remboursement-cnops');

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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              CNOPS
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

          <div className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? 'prose-rtl font-arabic' : ''}`}>
            {language === 'fr' ? (
              <>
                <p className="lead text-xl text-slate-700 dark:text-slate-300 mb-8">
                  La CNOPS (Caisse Nationale des Organismes de Prévoyance Sociale) gère la couverture santé des fonctionnaires et agents publics au Maroc. En 2025, une réforme majeure transfère cette gestion à la CNSS. Ce guide vous explique tout.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Qu'est-ce que la CNOPS ?</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  La CNOPS était l'organisme historique de protection sociale pour le secteur public marocain, couvrant les fonctionnaires, les agents de l'État et leurs ayants droit pour les frais de santé.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-r-lg my-8">
                  <h3 className="text-yellow-900 dark:text-yellow-100 font-bold text-xl mt-0 mb-3">⚠️ Important - Réforme 2025</h3>
                  <p className="text-yellow-800 dark:text-yellow-200 mb-0">
                    À partir de 2025, la gestion de l'assurance maladie obligatoire (AMO) du secteur public est transférée de la CNOPS à la CNSS. Cette unification vise à harmoniser et simplifier le système de santé marocain.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Taux de remboursement CNOPS/CNSS</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Avec la transition vers la CNSS, les taux s'harmonisent :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li><strong>Médicaments essentiels :</strong> 70% du prix de référence</li>
                  <li><strong>Médicaments vitaux :</strong> 90% du prix de référence</li>
                  <li><strong>Consultations médicales :</strong> Selon barème CNSS</li>
                </ul>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Procédure de remboursement en 2025</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Les anciens assurés CNOPS adoptent progressivement les procédures CNSS :
                </p>

                <div className="space-y-6 my-8">
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Utilisez le formulaire CNSS</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">Le nouveau formulaire unifié remplace l'ancien formulaire CNOPS</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Déposez dans une agence CNSS</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">Les agences CNSS traitent désormais tous les dossiers</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-0 mb-2">Suivez via MaCNSS</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-0">L'application MaCNSS permet de suivre votre dossier en temps réel</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Avantages de l'unification</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li>Un seul interlocuteur pour tous les Marocains</li>
                  <li>Harmonisation des taux de remboursement</li>
                  <li>Simplification administrative</li>
                  <li>Meilleure efficacité de traitement</li>
                  <li>Accès à la plateforme digitale MaCNSS</li>
                </ul>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Documents nécessaires</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li>Carte d'immatriculation (CNSS ou ancienne CNOPS)</li>
                  <li>Ordonnance médicale originale</li>
                  <li>Factures avec codes-barres</li>
                  <li>RIB bancaire</li>
                  <li>CIN</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
                  <h3 className="text-green-900 dark:text-green-100 font-bold text-xl mt-0 mb-3">✅ Conseil pratique</h3>
                  <p className="text-green-800 dark:text-green-200 mb-0">
                    Utilisez notre calculateur de remboursement pour estimer instantanément vos droits selon le nouveau système unifié CNSS. C'est gratuit, rapide et à jour de la réforme 2025 !
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Ressources utiles</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li><a href="https://www.cnss.ma" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Site officiel CNSS</a></li>
                  <li><Link to="/faq-cnops" className="text-primary-600 hover:text-primary-700 underline">FAQ CNOPS</Link></li>
                  <li><Link to="/blog/difference-cnss-cnops" className="text-primary-600 hover:text-primary-700 underline">Comparaison CNSS vs CNOPS</Link></li>
                  <li><Link to="/" className="text-primary-600 hover:text-primary-700 underline">Calculateur de remboursement</Link></li>
                </ul>
              </>
            ) : (
              <>
                <p className="lead text-xl text-slate-700 dark:text-slate-300 mb-8">
                  الصندوق الوطني لهيئات الاحتياط الاجتماعي (CNOPS) يدير التغطية الصحية للموظفين العموميين في المغرب. في 2025، إصلاح كبير ينقل هذه الإدارة إلى CNSS. هذا الدليل يشرح لك كل شيء.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">ما هو CNOPS؟</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  كان CNOPS المؤسسة التاريخية للحماية الاجتماعية للقطاع العام المغربي، يغطي الموظفين العموميين وموظفي الدولة وذوي حقوقهم لنفقات الصحة.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-r-4 border-yellow-600 p-6 rounded-l-lg my-8">
                  <h3 className="text-yellow-900 dark:text-yellow-100 font-bold text-xl mt-0 mb-3">⚠️ مهم - إصلاح 2025</h3>
                  <p className="text-yellow-800 dark:text-yellow-200 mb-0">
                    ابتداءً من 2025، يتم نقل إدارة التأمين الصحي الإلزامي (AMO) للقطاع العام من CNOPS إلى CNSS. يهدف هذا التوحيد إلى تنسيق وتبسيط نظام الصحة المغربي.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">معدلات الاسترداد CNOPS/CNSS</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  مع الانتقال إلى CNSS، المعدلات تتوحد:
                </p>
                <ul className="list-disc pr-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li><strong>الأدوية الأساسية:</strong> 70٪ من السعر المرجعي</li>
                  <li><strong>الأدوية الحيوية:</strong> 90٪ من السعر المرجعي</li>
                  <li><strong>الاستشارات الطبية:</strong> حسب جدول CNSS</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600 p-6 rounded-l-lg my-8">
                  <h3 className="text-green-900 dark:text-green-100 font-bold text-xl mt-0 mb-3">✅ نصيحة عملية</h3>
                  <p className="text-green-800 dark:text-green-200 mb-0">
                    استخدم حاسبة الاسترداد الخاصة بنا لتقدير حقوقك على الفور وفقًا للنظام الموحد الجديد CNSS. إنها مجانية وسريعة ومحدثة لإصلاح 2025!
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-primary-50 to-green-50 dark:from-primary-900/30 dark:to-green-900/30 rounded-2xl border-2 border-primary-200 dark:border-primary-700">
            <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {language === 'ar' ? 'احسب استردادك الآن' : 'Calculez votre remboursement maintenant'}
            </h3>
            <p className={`text-slate-600 dark:text-slate-300 mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
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

        {recentPosts.length > 0 && (
          <section className="bg-slate-100 dark:bg-slate-800/50 py-16">
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center ${isRTL ? 'font-arabic' : ''}`}>
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
