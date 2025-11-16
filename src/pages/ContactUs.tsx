/**
 * Contact Us Page - Taawidaty
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Mail, MessageSquare, Bug, Lightbulb, Shield, Scale, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { FormattedContent } from '@/components/FormattedText';

export default function ContactUs() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const content = {
    fr: {
      title: 'Contactez-Nous',
      subtitle: 'Nous sommes là pour vous aider',
      lastUpdated: 'Dernière mise à jour : 4 novembre 2025',
      intro: 'Vous avez une question, une suggestion ou avez trouvé une erreur ? Nous serions ravis d\'avoir de vos nouvelles. Choisissez le moyen de contact qui correspond le mieux à votre besoin.',
      sections: [
        {
          title: 'Moyens de Contact',
          icon: 'mail',
          email: 'contact@taawidaty.ma',
          content: `**📧 Email - Notre moyen de contact principal**

Nous répondons à tous les emails dans les délais indiqués ci-dessous. Veuillez inclure autant de détails que possible pour nous aider à vous répondre efficacement.`
        },
        {
          title: 'Contact Général',
          icon: 'messageSquare',
          email: 'contact@taawidaty.ma',
          content: `**Pour toutes vos questions sur Taawidaty**

- Questions sur le fonctionnement du calculateur
- Demandes d'information générales
- Suggestions de nouvelles fonctionnalités
- Commentaires sur le service
- Demandes de partenariat
- Signalement d'erreurs techniques ou de données
- Questions sur la vie privée et les données personnelles
- Questions juridiques

**Délai de réponse :** 3-5 jours ouvrables`
        },
        {
          title: 'Questions Techniques et Administratives',
          icon: 'shield',
          email: 'admin@taawidaty.ma',
          content: `**Pour signaler un problème technique ou une erreur de données**

Veuillez inclure dans votre message :
- Description détaillée du problème
- Nom du médicament concerné (si applicable)
- Type d'assurance sélectionné (CNOPS/CNSS)
- Navigateur et appareil utilisés
- Captures d'écran si possible

**Délai de réponse :** 24-48 heures pour les erreurs critiques

**Exemples d'erreurs à signaler :**
- Prix incorrect d'un médicament
- Taux de remboursement erroné
- Erreur de calcul
- Lien ou page qui ne fonctionne pas
- Problème d'affichage
- Données manquantes ou obsolètes`
        },
        {
          title: 'Ce Que Nous Ne Pouvons PAS Faire',
          icon: 'alertCircle',
          content: `**⚠️ IMPORTANT : Nous ne répondons PAS aux demandes suivantes**

❌ **Conseils médicaux personnalisés**
- Questions sur quel médicament prendre
- Diagnostic de symptômes
- Recommandations de traitement
- Dosages pour des cas spécifiques
→ **Consultez votre médecin ou pharmacien**

❌ **Vente de médicaments**
- Nous ne vendons pas de médicaments
- Nous ne pouvons pas vous envoyer de médicaments
→ **Rendez-vous dans une pharmacie agréée**

❌ **Garanties de remboursement**
- Nous ne pouvons pas garantir les montants exacts
- Nous ne pouvons pas intervenir auprès de votre assurance
→ **Contactez directement CNOPS ou CNSS**

❌ **Support technique pour autres sites**
- Nous ne gérons que taawidaty.ma
→ **Contactez le support du site concerné**

❌ **Demandes urgentes**
- En cas d'urgence médicale, appelez le 141 (SAMU)
- Nous ne fournissons pas de support d'urgence 24/7`
        },
        {
          title: 'Informations Utiles Avant de Nous Contacter',
          content: `**Consultez d'abord nos ressources disponibles :**

📖 **FAQ - Questions Fréquentes**
- FAQ CNOPS : /faq-cnops
- FAQ CNSS : /faq-cnss
- Réponses aux questions les plus courantes

📝 **Blog Éducatif**
- Guides complets CNOPS et CNSS
- Articles sur les remboursements
- Comparaisons et explications détaillées

🔒 **Politique de Confidentialité**
- /privacy-policy
- Information complète sur la protection des données

⚕️ **Avertissement Médical**
- /medical-disclaimer
- Limites de notre service
- Quand consulter un professionnel

ℹ️ **À Propos**
- /about
- Notre mission et nos valeurs
- Comment fonctionne Taawidaty`
        },
        {
          title: 'Format de Message Recommandé',
          content: `**Pour nous aider à vous répondre plus rapidement, structurez votre message ainsi :**

**Objet :** [Catégorie] - Résumé bref
Exemples :
- [Erreur] Prix incorrect pour DOLIPRANE 500mg
- [Suggestion] Ajouter un comparateur de médicaments
- [Question] Comment fonctionne le calcul CNOPS ?

**Corps du message :**

1. **Contexte**
   Décrivez brièvement votre situation ou question

2. **Détails**
   - Médicament concerné (si applicable)
   - Type d'assurance (CNOPS/CNSS)
   - Navigateur et appareil
   - Captures d'écran (si erreur visuelle)

3. **Attentes**
   Que souhaitez-vous comme résolution ?

4. **Coordonnées** (optionnel)
   Si vous souhaitez une réponse par un autre moyen

**Exemple de bon message :**

\`\`\`
Objet : [Erreur] Taux de remboursement CNOPS incorrect

Bonjour,

Je pense avoir trouvé une erreur dans le taux de remboursement 
pour le médicament AMOXICILLINE 500mg.

Le site affiche un taux CNOPS de 70%, mais selon le document 
officiel de la CNOPS que je consulte, il devrait être de 85%.

J'utilise Chrome sur Windows 10.

Pouvez-vous vérifier cette information ?

Merci
\`\`\``
        },
        {
          title: 'Délais de Réponse',
          content: `**Nos engagements de réponse :**

🚨 **Questions urgentes** (admin@taawidaty.ma)
Délai : 24-48 heures
- Erreurs de calcul affectant de nombreux médicaments
- Site inaccessible
- Problèmes techniques critiques

📧 **Questions générales** (contact@taawidaty.ma)
Délai : 3-5 jours ouvrables
- Fonctionnement du service
- Questions diverses
- Suggestions et feedback

**Note :** Les délais sont des jours ouvrables (lundi-vendredi, hors jours fériés marocains).`
        },
        {
          title: 'Autres Canaux (À Venir)',
          content: `**Nous travaillons à ajouter d'autres moyens de contact :**

📱 **WhatsApp Business** (prévu Q3 2025)
- Support rapide pour questions simples
- Notifications de mise à jour

💬 **Chat en direct** (prévu Q4 2025)
- Assistance en temps réel
- Heures d'ouverture limitées

📱 **Application mobile** (prévue 2026)
- Support intégré dans l'app
- Notifications push

🌐 **Réseaux sociaux** (en évaluation)
- Facebook, Twitter, Instagram
- Pour les annonces et actualités

Ces canaux seront ajoutés progressivement en fonction de nos ressources.`
        },
        {
          title: 'Localisation et Juridiction',
          content: `**Siège social :** Royaume du Maroc

**Juridiction applicable :**
- Droit marocain
- Tribunaux compétents : Rabat, Maroc

**Langues de communication :**
- Français
- Arabe
- Anglais (limité)

**Fuseau horaire :** GMT+1 (Heure de Rabat)

**Jours ouvrables :** Lundi - Vendredi (hors jours fériés marocains)

**Note :** Nous sommes une petite équipe. Pendant les périodes de forte demande (nouvelles versions, changements réglementaires), les délais de réponse peuvent être légèrement plus longs.`
        },
        {
          title: 'Politique de Réponse',
          content: `**Nous nous engageons à :**

✓ Lire tous les messages reçus
✓ Répondre dans les délais indiqués
✓ Traiter chaque demande avec respect
✓ Protéger vos données personnelles
✓ Vous tenir informé si nous avons besoin de plus de temps

**Nous ne garantissons PAS :**
- Une réponse immédiate
- L'implémentation de toutes les suggestions
- Une résolution favorable à toutes les réclamations
- Un support téléphonique ou en personne

**Nous nous réservons le droit de :**
- Ne pas répondre aux messages abusifs ou offensants
- Bloquer les adresses qui envoient du spam
- Transférer les questions juridiques à nos conseillers
- Limiter la correspondance pour les questions répétitives

**Votre message sera :**
- Traité de manière confidentielle
- Conservé selon notre politique de confidentialité
- Utilisé uniquement pour répondre à votre demande
- Supprimé à votre demande (sauf obligations légales)`
        }
      ],
      footer: `Merci de votre intérêt pour Taawidaty !

Nous apprécions tous vos retours et nous efforçons de répondre à chaque message de manière professionnelle et utile.

**En nous contactant, vous acceptez notre Politique de Confidentialité.**`
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'نحن هنا لمساعدتك',
      lastUpdated: 'آخر تحديث: 4 نوفمبر 2025',
      intro: 'لديك سؤال أو اقتراح أو وجدت خطأ؟ يسعدنا أن نسمع منك. اختر وسيلة الاتصال التي تناسب احتياجاتك بشكل أفضل.',
      sections: [
        {
          title: 'وسائل الاتصال',
          icon: 'mail',
          content: `**📧 البريد الإلكتروني - وسيلة اتصالنا الرئيسية**

نجيب على جميع رسائل البريد الإلكتروني ضمن المواعيد المحددة أدناه. يرجى تضمين أكبر قدر ممكن من التفاصيل لمساعدتنا في الرد عليك بفعالية.`
        },
        {
          title: 'اتصال عام',
          icon: 'messageSquare',
          email: 'contact@taawidaty.ma',
          content: `**للأسئلة العامة حول تعويضاتي**

- أسئلة حول كيفية عمل الحاسبة
- طلبات معلومات عامة
- اقتراحات لميزات جديدة
- تعليقات على الخدمة
- طلبات شراكة

**موعد الرد:** 3-5 أيام عمل`
        },
        {
          title: 'الأسئلة التقنية والإدارية',
          icon: 'shield',
          email: 'admin@taawidaty.ma',
          content: `**للإبلاغ عن مشكلة تقنية أو خطأ في البيانات**

يرجى تضمين في رسالتك:
- وصف مفصل للمشكلة
- اسم الدواء المعني (إن وجد)
- نوع التأمين المختار (CNOPS/CNSS)
- المتصفح والجهاز المستخدمان
- لقطات شاشة إن أمكن

**موعد الرد:** 24-48 ساعة للأخطاء الحرجة

**أمثلة على الأخطاء التي يجب الإبلاغ عنها:**
- سعر خاطئ لدواء
- معدل تعويض خاطئ
- خطأ في الحساب
- رابط أو صفحة لا تعمل
- مشكلة في العرض
- بيانات مفقودة أو قديمة`
        },
        {
          title: 'ما لا يمكننا فعله',
          icon: 'alertCircle',
          content: `**⚠️ مهم: لا نجيب على الطلبات التالية**

❌ **نصائح طبية مخصصة**
- أسئلة حول أي دواء تتناوله
- تشخيص الأعراض
- توصيات العلاج
- الجرعات لحالات محددة
→ **استشر طبيبك أو صيدليك**

❌ **بيع الأدوية**
- نحن لا نبيع الأدوية
- لا يمكننا إرسال أدوية لك
→ **اذهب إلى صيدلية معتمدة**

❌ **ضمانات التعويض**
- لا يمكننا ضمان المبالغ الدقيقة
- لا يمكننا التدخل لدى تأمينك
→ **اتصل مباشرة بـ CNOPS أو CNSS**

❌ **الدعم التقني لمواقع أخرى**
- نحن ندير فقط taawidaty.ma
→ **اتصل بدعم الموقع المعني**

❌ **طلبات عاجلة**
- في حالة طوارئ طبية، اتصل بـ 141 (SAMU)
- نحن لا نقدم دعماً عاجلاً 24/7`
        },
        {
          title: 'معلومات مفيدة قبل الاتصال بنا',
          content: `**راجع أولاً مواردنا المتاحة:**

📖 **الأسئلة الشائعة**
- أسئلة شائعة CNOPS: /faq-cnops
- أسئلة شائعة CNSS: /faq-cnss
- إجابات على الأسئلة الأكثر شيوعاً

📝 **المدونة التعليمية**
- أدلة CNOPS و CNSS كاملة
- مقالات عن التعويضات
- مقارنات وشروحات مفصلة

🔒 **سياسة الخصوصية**
- /privacy-policy
- معلومات كاملة عن حماية البيانات

⚕️ **إخلاء المسؤولية الطبية**
- /medical-disclaimer
- حدود خدمتنا
- متى تستشير مهنياً

ℹ️ **من نحن**
- /about
- مهمتنا وقيمنا
- كيف تعمل تعويضاتي`
        },
        {
          title: 'تنسيق الرسالة الموصى به',
          content: `**لمساعدتنا في الرد عليك بشكل أسرع، صغ رسالتك على النحو التالي:**

**الموضوع:** [الفئة] - ملخص موجز
أمثلة:
- [خطأ] سعر خاطئ لـ DOLIPRANE 500mg
- [اقتراح] إضافة مقارن للأدوية
- [سؤال] كيف يعمل حساب CNOPS؟

**نص الرسالة:**

1. **السياق**
   صف بإيجاز وضعك أو سؤالك

2. **التفاصيل**
   - الدواء المعني (إن وجد)
   - نوع التأمين (CNOPS/CNSS)
   - المتصفح والجهاز
   - لقطات شاشة (إذا كان خطأ بصرياً)

3. **التوقعات**
   ما الحل الذي تريده؟

4. **معلومات الاتصال** (اختياري)
   إذا كنت تريد رداً بوسيلة أخرى

**مثال على رسالة جيدة:**

\`\`\`
الموضوع: [خطأ] معدل تعويض CNOPS غير صحيح

مرحباً،

أعتقد أنني وجدت خطأ في معدل التعويض 
لدواء AMOXICILLINE 500mg.

يعرض الموقع معدل CNOPS 70%، لكن وفقاً للوثيقة 
الرسمية لـ CNOPS التي أراجعها، يجب أن يكون 85%.

أستخدم Chrome على Windows 10.

هل يمكنك التحقق من هذه المعلومات؟

شكراً
\`\`\``
        },
        {
          title: 'مواعيد الرد',
          content: `**التزاماتنا بالرد:**

🚨 **أسئلة عاجلة** (admin@taawidaty.ma)
الموعد: 24-48 ساعة
- أخطاء في الحسابات تؤثر على العديد من الأدوية
- الموقع غير متاح
- مشاكل تقنية حرجة

📧 **أسئلة عامة** (contact@taawidaty.ma)
الموعد: 3-5 أيام عمل
- تشغيل الخدمة
- أسئلة متنوعة
- اقتراحات وملاحظات

**ملاحظة:** المواعيد هي أيام عمل (الاثنين-الجمعة، باستثناء العطل المغربية).`
        },
        {
          title: 'قنوات أخرى (قريباً)',
          content: `**نعمل على إضافة وسائل اتصال أخرى:**

📱 **WhatsApp Business** (مخطط للربع الثالث 2025)
- دعم سريع للأسئلة البسيطة
- إشعارات التحديث

💬 **دردشة مباشرة** (مخطط للربع الرابع 2025)
- مساعدة في الوقت الفعلي
- ساعات عمل محدودة

📱 **تطبيق الهاتف** (مخطط 2026)
- دعم مدمج في التطبيق
- إشعارات فورية

🌐 **شبكات التواصل الاجتماعي** (قيد التقييم)
- فيسبوك، تويتر، إنستغرام
- للإعلانات والأخبار

ستُضاف هذه القنوات تدريجياً حسب مواردنا.`
        },
        {
          title: 'الموقع والاختصاص القضائي',
          content: `**المقر الاجتماعي:** المملكة المغربية

**الاختصاص القضائي المطبق:**
- القانون المغربي
- المحاكم المختصة: الرباط، المغرب

**لغات الاتصال:**
- الفرنسية
- العربية
- الإنجليزية (محدودة)

**المنطقة الزمنية:** GMT+1 (توقيت الرباط)

**أيام العمل:** الاثنين - الجمعة (باستثناء العطل المغربية)

**ملاحظة:** نحن فريق صغير. خلال فترات الطلب المرتفع (إصدارات جديدة، تغييرات تنظيمية)، قد تكون مواعيد الرد أطول قليلاً.`
        },
        {
          title: 'سياسة الرد',
          content: `**نلتزم بـ:**

✓ قراءة جميع الرسائل المستلمة
✓ الرد ضمن المواعيد المحددة
✓ معاملة كل طلب باحترام
✓ حماية بياناتك الشخصية
✓ إعلامك إذا احتجنا لمزيد من الوقت

**لا نضمن:**
- رداً فورياً
- تنفيذ جميع الاقتراحات
- حلاً مواتياً لجميع الشكاوى
- دعماً هاتفياً أو شخصياً

**نحتفظ بالحق في:**
- عدم الرد على الرسائل المسيئة أو المهينة
- حظر العناوين التي ترسل بريداً عشوائياً
- تحويل الأسئلة القانونية إلى مستشارينا
- الحد من المراسلات للأسئلة المتكررة

**ستكون رسالتك:**
- معالجة بسرية
- محفوظة وفقاً لسياسة الخصوصية لدينا
- تُستخدم فقط للرد على طلبك
- محذوفة بناءً على طلبك (باستثناء الالتزامات القانونية)`
        }
      ],
      footer: `شكراً لاهتمامك بتعويضاتي!

نقدر جميع ملاحظاتك ونسعى جاهدين للرد على كل رسالة بشكل مهني ومفيد.

**بالاتصال بنا، فإنك توافق على سياسة الخصوصية لدينا.**`
    }
  };

  const current = content[language];
  const pageUrl = 'https://taawidaty.ma/contact-us';
  const metaDescription = language === 'ar'
    ? 'تواصل مع تعويضاتي للحصول على دعم شخصي حول تعويضات CNSS وCNOPS والإجابة عن أسئلتك بسرعة.'
    : 'Contactez Taawidaty pour obtenir un accompagnement personnalisé sur vos remboursements CNSS et CNOPS et des réponses rapides à vos questions.';
  const metaKeywords = language === 'ar'
    ? [
        'اتصل تعويضاتي',
        'دعم تعويض cnss',
        'مساندة تعويض cnops',
        'خدمة زبناء التعويضات',
        'أسئلة تعويض CNSS CNOPS'
      ]
    : [
        'contact taawidaty',
        'assistance remboursement cnss',
        'support remboursement cnops',
        'contact assurance santé maroc',
        'questions remboursement cnss cnops'
      ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: language === 'ar' ? 'اتصل بمنصة تعويضاتي' : 'Contact Taawidaty',
      description: metaDescription,
      url: pageUrl,
      mainEntity: {
        '@type': 'Organization',
        name: 'Taawidaty',
        email: 'contact@taawidaty.ma',
        telephone: '+212661112233',
        sameAs: ['https://www.linkedin.com/company/taawidaty']
      }
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail': return <Mail className="w-6 h-6" />;
      case 'messageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'bug': return <Bug className="w-6 h-6" />;
      case 'lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'shield': return <Shield className="w-6 h-6" />;
      case 'scale': return <Scale className="w-6 h-6" />;
      case 'alertCircle': return <AlertCircle className="w-6 h-6" />;
      default: return <Mail className="w-6 h-6" />;
    }
  };

  return (
    <>
      <SEO
        title={`${current.title} - Taawidaty`}
        description={metaDescription}
        keywords={metaKeywords}
        canonical={pageUrl}
        lang={language}
        structuredData={structuredData}
      />

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-card border-b dark:border-border sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-2"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Retour à l\'accueil'}
            </Button>
            <h1 className="text-3xl font-bold text-primary-700 dark:text-primary">
              {current.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {current.subtitle}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {current.lastUpdated}
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Intro */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-8 mb-8">
            <p className="text-lg text-foreground leading-relaxed">
              {current.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {current.sections.map((section, index) => (
              <section key={index} className="bg-white dark:bg-card rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4 mb-4">
                  {section.icon && (
                    <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg text-blue-700 dark:text-blue-400 flex-shrink-0">
                      {getIcon(section.icon)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary-700 dark:text-primary mb-2">
                      {section.title}
                    </h2>
                    {section.email && (
                      <a 
                        href={`mailto:${section.email}`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
                      >
                        <Mail className="w-5 h-5" />
                        {section.email}
                      </a>
                    )}
                  </div>
                </div>
                <FormattedContent className="text-foreground leading-relaxed">
                  {section.content}
                </FormattedContent>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-center">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {current.footer}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
