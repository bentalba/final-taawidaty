import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getBlogPostById } from '@/lib/blogData';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, FileCheck, Calendar, User, Stethoscope, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LireOrdonnance() {
  const { language, isRTL } = useLanguage();
  const post = getBlogPostById('lire-ordonnance-maroc');

  if (!post) return <Navigate to="/blog" replace />;

  const title = post.title[language];
  const description = post.description[language];

  const breadcrumbItems = [
    { label: language === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
    { label: title }
  ];

  const content = {
    fr: {
      intro: "La cause numéro 1 des rejets de dossiers n'est pas médicale, mais administrative. Une ordonnance mal remplie = 0 DH remboursé. Voici la liste ultime pour valider votre ordonnance en 30 secondes.",
      checklist: [
        {
          title: "1. La Date du jour",
          text: "Vérifiez que la date est correcte. Attention : La date de l'ordonnance doit être ANTÉRIEURE ou ÉGALE à la date d'achat des médicaments. Si vous achetez les médicaments le 10 novembre avec une ordonnance datée du 11 novembre, le dossier sera rejeté."
        },
        {
          title: "2. Le Cachet et la Signature",
          text: "Le cachet du médecin doit être lisible. La signature est obligatoire. Sans cela, le document n'a aucune valeur légale."
        },
        {
          title: "3. Le Code INPE (Identifiant National)",
          text: "C'est le numéro d'immatriculation du médecin. Il doit figurer sur son cachet. Sans code INPE, l'assurance ne peut pas identifier le praticien et refusera le remboursement."
        },
        {
          title: "4. Le Nom du Patient",
          text: "Assurez-vous que l'orthographe de votre nom (ou celui de votre enfant) correspond exactement à celle de votre carte d'immatriculation."
        },
        {
          title: "5. Mention « Renouvelable »",
          text: "Si vous avez un traitement chronique pour 3 mois, le médecin DOIT écrire « Renouvelable 2 fois ». Sinon, vous devrez payer une nouvelle consultation le mois prochain pour avoir une nouvelle ordonnance."
        }
      ],
      proTip: "Astuce : Prenez toujours une photo de votre ordonnance avant de la donner au pharmacien ou de l'envoyer dans votre dossier. En cas de perte ou de litige, cette photo peut sauver votre remboursement.",
      conclusion: "Prenez 30 secondes pour vérifier ces points dans le cabinet du médecin. Cela vous évitera des semaines d'attente et de réclamations."
    },
    ar: {
      intro: "السبب الأول لرفض الملفات ليس طبياً، بل إدارياً. وصفة طبية مملوءة بشكل سيء = 0 درهم تعويض. إليك القائمة النهائية للتحقق من وصفتك الطبية في 30 ثانية.",
      checklist: [
        {
          title: "1. تاريخ اليوم",
          text: "تحقق من صحة التاريخ. تنبيه: يجب أن يكون تاريخ الوصفة قبل أو في نفس يوم شراء الأدوية. إذا اشتريت الأدوية في 10 نونبر بوصفة مؤرخة في 11 نونبر، فسيتم رفض الملف."
        },
        {
          title: "2. الختم والتوقيع",
          text: "يجب أن يكون ختم الطبيب مقروءاً. التوقيع إلزامي. بدونهما، لا قيمة قانونية للوثيقة."
        },
        {
          title: "3. الرمز الوطني للممارس (INPE)",
          text: "هذا هو رقم تسجيل الطبيب. يجب أن يظهر على ختمه. بدون رمز INPE، لا يمكن للتأمين تحديد هوية الممارس وسيتم رفض التعويض."
        },
        {
          title: "4. اسم المريض",
          text: "تأكد من أن تهجئة اسمك (أو اسم طفلك) تتطابق تماماً مع تلك الموجودة في بطاقة التسجيل الخاصة بك."
        },
        {
          title: "5. عبارة \"قابل للتجديد\"",
          text: "إذا كان لديك علاج مزمن لمدة 3 أشهر، يجب على الطبيب كتابة \"قابل للتجديد مرتين\" (Renouvelable). وإلا، ستضطر لدفع ثمن استشارة جديدة في الشهر المقبل للحصول على وصفة جديدة."
        }
      ],
      proTip: "نصيحة: التقط دائماً صورة لوصفتك الطبية قبل إعطائها للصيدلي أو إرسالها في ملفك. في حالة الضياع أو النزاع، يمكن لهذه الصورة أن تنقذ تعويضك.",
      conclusion: "خصص 30 ثانية للتحقق من هذه النقاط في عيادة الطبيب. سيوفر عليك ذلك أسابيع من الانتظار والشكايات."
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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              {language === 'ar' ? 'دليل عملي' : 'Guide Pratique'}
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium border-b pb-8">
              {t.intro}
            </p>

            <div className="space-y-6">
              {t.checklist.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900">
                  <div className={`shrink-0 mt-1 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    {index === 0 && <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />}
                    {index === 1 && <FileCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />}
                    {index === 2 && <Stethoscope className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />}
                    {index === 3 && <User className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />}
                    {index === 4 && <AlertTriangle className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg text-slate-900 dark:text-white mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {item.title}
                    </h3>
                    <p className={`text-slate-600 dark:text-slate-400 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-12 bg-slate-900 dark:bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex gap-3 items-start text-white">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h3 className={`font-bold text-emerald-400 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'fr' ? "Astuce Pro" : "نصيحة احترافية"}
                    </h3>
                    <p className={`text-slate-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {t.proTip}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900">
              <p className={`text-emerald-900 dark:text-emerald-100 font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.conclusion}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
