import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getBlogPostById, getRecentBlogPosts } from '@/lib/blogData';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Tag, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ComprendrePpvPpm() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('comprendre-ppv-ppm-maroc');

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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {language === 'ar' ? 'معلومات عامة' : 'Information Générale'}
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            {language === 'fr' ? (
              <>
                <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
                  Lorsque vous achetez des médicaments au Maroc, vous avez peut-être remarqué deux types de prix : le PPV et le PPM. Comprendre la différence est essentiel pour savoir combien vous allez payer et combien vous serez remboursé.
                </p>

                <h2>Qu'est-ce que le PPV ?</h2>
                <p>
                  Le <strong>PPV</strong> signifie <strong>Prix Public de Vente</strong>. C'est le prix maximum auquel un médicament peut être vendu au public dans les pharmacies d'officine. Ce prix est fixé par le Ministère de la Santé et inclut les marges du grossiste et du pharmacien, ainsi que la TVA.
                </p>
                <Card className="my-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Tag className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Le saviez-vous ?</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Le PPV est obligatoirement affiché sur la boîte du médicament. Si le prix n'est pas affiché ou s'il est différent du prix officiel, vous avez le droit de demander des explications.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h2>Qu'est-ce que le PPM ?</h2>
                <p>
                  Le <strong>PPM</strong> signifie <strong>Prix Public Hôpital</strong> (ou parfois Prix Public Maroc dans d'autres contextes, mais ici il s'agit souvent du prix hospitalier). C'est le prix auquel les hôpitaux et les cliniques achètent les médicaments. Il est généralement inférieur au PPV car il n'inclut pas les mêmes marges commerciales.
                </p>

                <h2>Pourquoi cette différence est importante pour le remboursement ?</h2>
                <p>
                  Le remboursement de vos médicaments par l'assurance maladie (AMO) est généralement basé sur le <strong>Prix de Référence</strong>, qui est souvent aligné sur le prix du médicament générique le moins cher (si un générique existe).
                </p>
                <ul>
                  <li>Si vous achetez un médicament princeps (de marque) dont le PPV est élevé, mais qu'il existe un générique moins cher, le remboursement se fera sur la base du prix du générique.</li>
                  <li>La différence entre le prix que vous payez et le montant remboursé reste à votre charge.</li>
                </ul>

                <h2>Comment vérifier le prix ?</h2>
                <p>
                  Vous pouvez utiliser notre calculateur <strong>TAAWIDATY</strong> pour vérifier le PPV officiel de n'importe quel médicament et estimer votre remboursement. Cela vous permet d'éviter les mauvaises surprises à la pharmacie.
                </p>
              </>
            ) : (
              <>
                <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8 font-arabic">
                  عند شراء الأدوية في المغرب، ربما لاحظت وجود نوعين من الأسعار: PPV و PPM. فهم الفرق بينهما ضروري لمعرفة كم ستدفع وكم سيتم استرداده لك.
                </p>

                <h2 className="font-arabic">ما هو PPV؟</h2>
                <p className="font-arabic">
                  <strong>PPV</strong> تعني <strong>سعر البيع للعموم</strong> (Prix Public de Vente). هو الحد الأقصى للسعر الذي يمكن بيع الدواء به للجمهور في الصيدليات. يتم تحديد هذا السعر من قبل وزارة الصحة ويشمل هوامش ربح الموزع والصيدلي، بالإضافة إلى الضريبة على القيمة المضافة.
                </p>
                
                <Card className="my-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Tag className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2 font-arabic">هل تعلم؟</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200 font-arabic">
                          يجب أن يكون PPV معروضاً بشكل إلزامي على علبة الدواء. إذا لم يكن السعر معروضاً أو كان مختلفاً عن السعر الرسمي، فمن حقك طلب توضيحات.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h2 className="font-arabic">ما هو PPM؟</h2>
                <p className="font-arabic">
                  <strong>PPM</strong> تعني <strong>سعر المستشفى</strong> (Prix Public Hôpital). هو السعر الذي تشتري به المستشفيات والمصحات الأدوية. عادة ما يكون أقل من PPV لأنه لا يشمل نفس الهوامش التجارية.
                </p>

                <h2 className="font-arabic">لماذا هذا الفرق مهم للاسترداد؟</h2>
                <p className="font-arabic">
                  يعتمد استرداد أموال أدويتك من قبل التأمين الصحي الإجباري (AMO) عادةً على <strong>السعر المرجعي</strong>، والذي غالباً ما يتماشى مع سعر الدواء الجنيس الأرخص (إذا كان هناك دواء جنيس).
                </p>
                <ul className="font-arabic">
                  <li>إذا اشتريت دواءً أصلياً (princeps) بسعر PPV مرتفع، ولكن يوجد دواء جنيس أرخص، فسيتم الاسترداد بناءً على سعر الدواء الجنيس.</li>
                  <li>الفرق بين السعر الذي دفعته والمبلغ المسترد يبقى على عاتقك.</li>
                </ul>

                <h2 className="font-arabic">كيف تتحقق من السعر؟</h2>
                <p className="font-arabic">
                  يمكنك استخدام حاسبتنا <strong>تعويضاتي</strong> للتحقق من PPV الرسمي لأي دواء وتقدير المبلغ المسترد. هذا يسمح لك بتجنب المفاجآت غير السارة في الصيدلية.
                </p>
              </>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
