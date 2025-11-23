import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getBlogPostById } from '@/lib/blogData';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle, XCircle, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MedicamentGenerique() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('medicament-generique-efficacite');

  if (!post) return <Navigate to="/blog" replace />;

  const title = post.title[language];
  const description = post.description[language];

  const breadcrumbItems = [
    { label: language === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
    { label: title }
  ];

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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {language === 'ar' ? 'أدوية' : 'Médicaments'}
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            {language === 'fr' ? (
              <>
                <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
                  Les médicaments génériques suscitent souvent des questions : sont-ils aussi efficaces que les originaux ? Pourquoi sont-ils moins chers ? Et surtout, comment sont-ils remboursés ?
                </p>

                <h2>Qu'est-ce qu'un médicament générique ?</h2>
                <p>
                  Un médicament générique est une copie exacte du médicament original (appelé "princeps") en termes de principe actif, de dosage et de mode d'administration. Il est commercialisé lorsque le brevet du médicament original tombe dans le domaine public.
                </p>
                <div className="flex items-center gap-4 my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-100">Même efficacité</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Les autorités de santé exigent que le générique ait la même efficacité thérapeutique que l'original.
                    </p>
                  </div>
                </div>

                <h2>Pourquoi sont-ils moins chers ?</h2>
                <p>
                  Le prix des génériques est inférieur car les coûts de recherche et développement ont déjà été amortis par le laboratoire qui a créé le médicament original. Les fabricants de génériques n'ont pas à refaire toutes les études cliniques, ce qui réduit considérablement les coûts.
                </p>

                <h2>L'impact sur votre remboursement</h2>
                <p>
                  C'est ici que le choix du générique devient stratégique pour votre portefeuille. L'Assurance Maladie Obligatoire (AMO) fixe souvent le <strong>Tarif National de Référence (TNR)</strong> sur la base du prix du générique le moins cher.
                </p>
                <Card className="my-6">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2">Exemple concret :</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Médicament Original : 100 DH</li>
                      <li>Médicament Générique : 70 DH</li>
                      <li>Tarif de Référence (TNR) : 70 DH</li>
                    </ul>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                      Si vous achetez l'original, vous serez remboursé sur la base de 70 DH (moins le ticket modérateur). La différence de 30 DH reste entièrement à votre charge. Si vous achetez le générique, vous êtes remboursé sur la base de ce que vous avez payé.
                    </p>
                  </CardContent>
                </Card>

                <h2>Conclusion</h2>
                <p>
                  Opter pour le médicament générique est un choix sûr pour votre santé et économique pour votre budget. N'hésitez pas à demander conseil à votre pharmacien ou à utiliser <strong>TAAWIDATY</strong> pour comparer les prix.
                </p>
              </>
            ) : (
              <>
                <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8 font-arabic">
                  غالباً ما تثير الأدوية الجنيسة تساؤلات: هل هي فعالة مثل الأدوية الأصلية؟ لماذا هي أرخص؟ والأهم من ذلك، كيف يتم استرداد ثمنها؟
                </p>

                <h2 className="font-arabic">ما هو الدواء الجنيس؟</h2>
                <p className="font-arabic">
                  الدواء الجنيس هو نسخة طبق الأصل من الدواء الأصلي (المسمى "princeps") من حيث المادة الفعالة والجرعة وطريقة الاستعمال. يتم تسويقه عندما تنتهي براءة اختراع الدواء الأصلي وتصبح ملكاً عاماً.
                </p>
                <div className="flex items-center gap-4 my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-100 font-arabic">نفس الفعالية</h4>
                    <p className="text-sm text-green-800 dark:text-green-200 font-arabic">
                      تتطلب السلطات الصحية أن يكون للدواء الجنيس نفس الفعالية العلاجية للدواء الأصلي.
                    </p>
                  </div>
                </div>

                <h2 className="font-arabic">لماذا هي أرخص؟</h2>
                <p className="font-arabic">
                  سعر الأدوية الجنيسة أقل لأن تكاليف البحث والتطوير قد تم استردادها بالفعل من قبل المختبر الذي ابتكر الدواء الأصلي. لا يضطر مصنعو الأدوية الجنيسة إلى إعادة جميع الدراسات السريرية، مما يقلل التكاليف بشكل كبير.
                </p>

                <h2 className="font-arabic">التأثير على استرداد أموالك</h2>
                <p className="font-arabic">
                  هنا يصبح اختيار الدواء الجنيس استراتيجياً لمحفظتك. غالباً ما يحدد التأمين الصحي الإجباري (AMO) <strong>التعريفة الوطنية المرجعية (TNR)</strong> بناءً على سعر الدواء الجنيس الأرخص.
                </p>
                <Card className="my-6">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2 font-arabic">مثال واقعي:</h4>
                    <ul className="list-disc pl-5 space-y-2 font-arabic">
                      <li>الدواء الأصلي: 100 درهم</li>
                      <li>الدواء الجنيس: 70 درهم</li>
                      <li>التعريفة المرجعية (TNR): 70 درهم</li>
                    </ul>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-arabic">
                      إذا اشتريت الأصلي، فسيتم استرداد أموالك بناءً على 70 درهم (ناقص التذكرة المعتدلة). الفرق البالغ 30 درهم يبقى بالكامل على عاتقك. إذا اشتريت الجنيس، فسيتم استرداد أموالك بناءً على ما دفعته.
                    </p>
                  </CardContent>
                </Card>

                <h2 className="font-arabic">خاتمة</h2>
                <p className="font-arabic">
                  اختيار الدواء الجنيس هو خيار آمن لصحتك واقتصادي لميزانيتك. لا تتردد في طلب المشورة من الصيدلي أو استخدام <strong>تعويضاتي</strong> لمقارنة الأسعار.
                </p>
              </>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
