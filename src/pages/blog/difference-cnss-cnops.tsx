/**
 * CNSS vs CNOPS Comparison Blog Post
 * @author BENTALBA ZAKARIA
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

export default function DifferenceCnsssCnops() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('difference-cnss-cnops');
  const recentPosts = getRecentBlogPosts(3).filter(p => p.id !== 'difference-cnss-cnops');

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

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              COMPARAISON
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${isRTL ? 'font-arabic text-right' : ''}`}>
            {title}
          </h1>

          <div className={`flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
                  CNSS et CNOPS : deux acronymes qui ont longtemps distingué la couverture santé des Marocains. En 2025, cette distinction s'estompe avec l'unification du système. Comprendre les différences historiques et les changements actuels.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Tableau Comparatif CNSS vs CNOPS</h2>
                
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold">Critère</th>
                        <th className="px-6 py-4 text-left font-bold">CNSS (Secteur Privé)</th>
                        <th className="px-6 py-4 text-left font-bold">CNOPS (Secteur Public - avant 2025)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Public cible</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Salariés du secteur privé</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Fonctionnaires et agents publics</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Gestionnaire</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Caisse Nationale de Sécurité Sociale</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">CNOPS (transféré à CNSS en 2025)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Taux remboursement</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">70% (essentiels), 90% (vitaux)</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Harmonisé avec CNSS en 2025</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Plateforme digitale</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">MaCNSS</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">MaCNSS (depuis 2025)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">L'Unification 2025 : Un Tournant Historique</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Le gouvernement marocain a annoncé une réforme majeure : à partir de 2025, la CNSS reprend la gestion de l'assurance maladie obligatoire (AMO) pour le secteur public. Cette décision vise plusieurs objectifs :
                </p>

                <ul className="list-disc pl-6 space-y-3 text-slate-700 dark:text-slate-300 mb-8">
                  <li><strong>Unification administrative :</strong> Un seul organisme gestionnaire pour plus d'efficacité</li>
                  <li><strong>Harmonisation des prestations :</strong> Mêmes taux et procédures pour tous</li>
                  <li><strong>Économies d'échelle :</strong> Réduction des coûts de gestion</li>
                  <li><strong>Équité sociale :</strong> Traitement égal secteur public/privé</li>
                </ul>

                <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600 p-6 rounded-r-lg my-8">
                  <h3 className="text-primary-900 dark:text-primary-100 font-bold text-xl mt-0 mb-3">🎯 Ce qui change concrètement</h3>
                  <ul className="space-y-2 text-primary-800 dark:text-primary-200 mb-0">
                    <li>✓ Formulaire unique CNSS pour tous</li>
                    <li>✓ Même application de suivi (MaCNSS)</li>
                    <li>✓ Taux de remboursement harmonisés</li>
                    <li>✓ Procédures simplifiées</li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Impact sur vos Médicaments</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Avec cette unification, la liste des médicaments remboursables devient unique. Les assurés du secteur public (ancienne CNOPS) bénéficient désormais de la même couverture que le secteur privé :
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-2 border-green-600">
                    <h3 className="font-bold text-lg text-green-900 dark:text-green-100 mb-3">✅ Avantages</h3>
                    <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
                      <li>• Transparence accrue</li>
                      <li>• Processus standardisé</li>
                      <li>• Suivi digital facilité</li>
                      <li>• Délais optimisés</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-600">
                    <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-3">📊 Points d'attention</h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                      <li>• Période de transition</li>
                      <li>• Nouveaux formulaires</li>
                      <li>• Formation aux procédures</li>
                      <li>• Mise à jour documents</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Comment S'adapter ?</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Pour les anciens assurés CNOPS, voici les étapes clés pour la transition :
                </p>

                <ol className="list-decimal pl-6 space-y-3 text-slate-700 dark:text-slate-300 mb-8">
                  <li><strong>Conservez votre numéro d'immatriculation :</strong> Il reste valide</li>
                  <li><strong>Téléchargez MaCNSS :</strong> L'application mobile pour le suivi</li>
                  <li><strong>Utilisez les nouveaux formulaires :</strong> Disponibles sur cnss.ma</li>
                  <li><strong>Familiarisez-vous avec les agences CNSS :</strong> Nouveaux points de dépôt</li>
                </ol>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Notre Calculateur : Votre Allié</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Face à ces changements, notre calculateur de remboursement Taawidaty est mis à jour en temps réel pour refléter le système unifié. Que vous soyez anciennement CNSS ou CNOPS, vous obtenez une estimation précise et instantanée de vos droits.
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border-2 border-purple-300 dark:border-purple-700 my-12 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">💡 Le saviez-vous ?</h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-0">
                    Notre calculateur traite plus de <strong>8,111 médicaments</strong> et est mis à jour avec les <strong>prix 2025</strong> et les <strong>nouveaux taux de remboursement</strong> du système unifié.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Ressources Complémentaires</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                  <li><Link to="/blog/guide-remboursement-cnss" className="text-primary-600 hover:text-primary-700 underline">Guide complet CNSS</Link></li>
                  <li><Link to="/blog/guide-remboursement-cnops" className="text-primary-600 hover:text-primary-700 underline">Guide complet CNOPS (transition)</Link></li>
                  <li><Link to="/faq-cnss" className="text-primary-600 hover:text-primary-700 underline">FAQ CNSS</Link></li>
                  <li><Link to="/faq-cnops" className="text-primary-600 hover:text-primary-700 underline">FAQ CNOPS</Link></li>
                  <li><a href="https://www.cnss.ma" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Site officiel CNSS</a></li>
                </ul>
              </>
            ) : (
              <>
                <p className="lead text-xl text-slate-700 dark:text-slate-300 mb-8">
                  CNSS و CNOPS: اختصاران ميزا منذ فترة طويلة التغطية الصحية للمغاربة. في 2025، هذا التمييز يتلاشى مع توحيد النظام. فهم الاختلافات التاريخية والتغييرات الحالية.
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">جدول مقارن CNSS مقابل CNOPS</h2>
                
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg" dir="rtl">
                    <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                      <tr>
                        <th className="px-6 py-4 text-right font-bold">المعيار</th>
                        <th className="px-6 py-4 text-right font-bold">CNSS (القطاع الخاص)</th>
                        <th className="px-6 py-4 text-right font-bold">CNOPS (القطاع العام - قبل 2025)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">الجمهور المستهدف</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">موظفو القطاع الخاص</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">الموظفون العموميون</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">المدير</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">الصندوق الوطني للضمان الاجتماعي</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">CNOPS (تم نقله إلى CNSS في 2025)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">معدل الاسترداد</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">70% (أساسية)، 90% (حيوية)</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">متناسق مع CNSS في 2025</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">المنصة الرقمية</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">MaCNSS</td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">MaCNSS (منذ 2025)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 border-r-4 border-primary-600 p-6 rounded-l-lg my-8">
                  <h3 className="text-primary-900 dark:text-primary-100 font-bold text-xl mt-0 mb-3">🎯 ما الذي يتغير فعلياً</h3>
                  <ul className="space-y-2 text-primary-800 dark:text-primary-200 mb-0">
                    <li>✓ استمارة CNSS موحدة للجميع</li>
                    <li>✓ نفس تطبيق المتابعة (MaCNSS)</li>
                    <li>✓ معدلات استرداد متناسقة</li>
                    <li>✓ إجراءات مبسطة</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border-2 border-purple-300 dark:border-purple-700 my-12 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">💡 هل تعلم؟</h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-0">
                    تعالج حاسبتنا أكثر من <strong>8,111 دواء</strong> ومحدثة بـ <strong>أسعار 2025</strong> و <strong>معدلات الاسترداد الجديدة</strong> للنظام الموحد.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-primary-200 dark:border-primary-700">
            <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {language === 'ar' ? 'احسب استردادك الآن' : 'Calculez votre remboursement maintenant'}
            </h3>
            <p className={`text-slate-600 dark:text-slate-300 mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {language === 'ar'
                ? 'استخدم حاسبتنا المجانية المحدثة بالنظام الموحد 2025'
                : 'Utilisez notre calculateur gratuit mis à jour avec le système unifié 2025'}
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
