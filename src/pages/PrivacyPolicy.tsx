/**
 * Privacy Policy Page - Taawidaty
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { FormattedContent } from '@/components/FormattedText';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';
  const canonical = 'https://taawidaty.ma/privacy-policy';

  const content = {
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : 4 novembre 2025',
      intro: 'Taawidaty (ci-après "nous", "notre" ou "le Site") s\'engage à protéger la confidentialité de ses utilisateurs. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.',
      sections: [
        {
          title: '1. Informations que nous collectons',
          content: `Nous collectons les types d'informations suivants :

**1.1 Informations fournies volontairement**
- Recherches de médicaments effectuées sur notre calculateur
- Type d'assurance sélectionné (CNOPS ou CNSS)
- Aucune information personnelle identifiable n'est collectée lors de l'utilisation du calculateur

**1.2 Informations collectées automatiquement**
- Adresse IP
- Type de navigateur et version
- Système d'exploitation
- Pages visitées et durée des visites
- Données de localisation géographique (pays, ville)
- Référent (site d'où vous venez)

**1.3 Cookies et technologies similaires**
Nous utilisons des cookies pour améliorer votre expérience :
- Cookies de préférence (langue sélectionnée)
- Cookies de thème (mode clair/sombre)
- Cookies d'analyse (Google Analytics)
- Aucun cookie de suivi publicitaire n'est actuellement utilisé`
        },
        {
          title: '2. Comment nous utilisons vos informations',
          content: `Nous utilisons les informations collectées pour :

- **Fournir nos services** : Calculer les remboursements de médicaments selon votre assurance
- **Améliorer notre site** : Analyser l'utilisation pour optimiser l'expérience utilisateur
- **Préférences utilisateur** : Mémoriser vos choix de langue et de thème
- **Statistiques** : Comprendre quels médicaments sont les plus recherchés
- **Sécurité** : Détecter et prévenir les abus ou utilisations frauduleuses

**Nous ne vendons jamais vos données personnelles à des tiers.**`
        },
        {
          title: '3. Base juridique du traitement (RGPD)',
          content: `Conformément au Règlement Général sur la Protection des Données (RGPD), nous traitons vos données sur les bases juridiques suivantes :

- **Consentement** : Pour les cookies non essentiels
- **Intérêt légitime** : Pour l'analyse et l'amélioration du site
- **Exécution du service** : Pour fournir le calculateur de remboursement

Vous pouvez retirer votre consentement à tout moment en modifiant vos paramètres de cookies.`
        },
        {
          title: '4. Partage des informations avec des tiers',
          content: `Nous partageons certaines informations avec les tiers suivants :

**4.1 Google Analytics**
- Nous utilisons Google Analytics pour analyser le trafic du site
- Google peut utiliser des cookies pour collecter des données anonymisées
- Vous pouvez désactiver Google Analytics : https://tools.google.com/dlpage/gaoptout

**4.2 Services d'hébergement**
- Notre site est hébergé par Cloudflare Pages
- Cloudflare peut accéder à des données techniques pour assurer la disponibilité du service

**4.3 Google AdSense et publicités tierces**

**Utilisation de cookies publicitaires**

Des fournisseurs tiers, notamment Google, utilisent des cookies pour diffuser des annonces en fonction des visites antérieures des utilisateurs sur notre site Web et/ou d'autres sites Web.

**Personnalisation des annonces**

L'utilisation par Google de cookies publicitaires lui permet, ainsi qu'à ses partenaires, de diffuser des annonces aux utilisateurs en fonction de leur visite sur notre site et/ou d'autres sites sur Internet.

**Vos options de désactivation**

Vous pouvez désactiver la personnalisation des annonces de plusieurs manières :

1. **Paramètres des annonces Google**  
   Visitez https://www.google.com/settings/ads pour désactiver les annonces personnalisées de Google.

2. **Désactivation des annonces tierces**  
   Visitez http://www.aboutads.info/choices/ pour désactiver les cookies publicitaires d'autres fournisseurs tiers.

3. **European Interactive Digital Advertising Alliance (EDAA)**  
   Les utilisateurs européens peuvent également visiter http://www.youronlinechoices.eu/ pour gérer leurs préférences publicitaires.

**Liste des partenaires publicitaires**

Actuellement, nous utilisons uniquement :
- **Google AdSense** (google.com) - Réseau publicitaire

Si nous ajoutons d'autres partenaires publicitaires à l'avenir, cette liste sera mise à jour et vous serez informé.

**Conformité IAB Transparency and Consent Framework (TCF)**

Ce site respecte le Transparency and Consent Framework (TCF) v2.2 de l'IAB Europe. Vos choix de consentement sont stockés et respectés par tous nos partenaires publicitaires certifiés.

Nous ne partageons jamais vos données avec des tiers à des fins de marketing sans votre consentement explicite.`
        },
        {
          title: '5. Vos droits',
          content: `Conformément au RGPD et à la loi marocaine n° 09-08, vous disposez des droits suivants :

**5.1 Droit d'accès**
- Vous pouvez demander quelles informations nous détenons sur vous

**5.2 Droit de rectification**
- Vous pouvez corriger toute information inexacte

**5.3 Droit à l'effacement**
- Vous pouvez demander la suppression de vos données

**5.4 Droit à la portabilité**
- Vous pouvez demander une copie de vos données dans un format structuré

**5.5 Droit d'opposition**
- Vous pouvez vous opposer au traitement de vos données pour certaines finalités

**5.6 Droit de retirer votre consentement**
- Vous pouvez retirer votre consentement à tout moment

Pour exercer ces droits, contactez-nous à : admin@taawidaty.ma`
        },
        {
          title: '6. Conservation des données',
          content: `Nous conservons vos données pour les durées suivantes :

- **Cookies de préférence** : Jusqu'à 1 an ou jusqu'à leur suppression manuelle
- **Données analytiques** : Données anonymisées conservées indéfiniment
- **Logs serveur** : 90 jours maximum
- **Données de contact** (si fournies) : Jusqu'à demande de suppression

Les données ne sont conservées que le temps nécessaire aux finalités pour lesquelles elles ont été collectées.`
        },
        {
          title: '7. Sécurité des données',
          content: `Nous mettons en œuvre des mesures de sécurité appropriées :

- **Chiffrement HTTPS** : Toutes les communications sont chiffrées
- **Hébergement sécurisé** : Infrastructure Cloudflare avec protection DDoS
- **Pas de stockage de données sensibles** : Aucune donnée de santé personnelle n'est stockée
- **Accès restreint** : Seuls les administrateurs autorisés ont accès aux systèmes
- **Mises à jour régulières** : Correctifs de sécurité appliqués rapidement

Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée. Nous nous efforçons de protéger vos données mais ne pouvons garantir une sécurité absolue.`
        },
        {
          title: '8. Protection des mineurs',
          content: `Notre site est destiné à un public général et ne cible pas spécifiquement les mineurs de moins de 16 ans.

Si vous êtes parent ou tuteur et découvrez que votre enfant nous a fourni des informations personnelles, contactez-nous pour que nous puissions les supprimer.`
        },
        {
          title: '9. Transferts internationaux',
          content: `Vos données peuvent être transférées et stockées sur des serveurs situés en dehors du Maroc, notamment :

- **Serveurs Google** (États-Unis, Europe) : Pour Google Analytics
- **Cloudflare** (Réseau mondial) : Pour l'hébergement et la distribution de contenu

Ces entreprises sont conformes au RGPD et offrent des garanties appropriées pour la protection de vos données.`
        },
        {
          title: '10. Modifications de cette politique',
          content: `Nous pouvons mettre à jour cette Politique de Confidentialité périodiquement pour refléter :

- Les changements dans nos pratiques
- Les évolutions de la législation
- Les nouvelles fonctionnalités du site

Les modifications importantes seront affichées de manière visible sur le site. La date de "Dernière mise à jour" en haut de cette page indique la version actuelle.

Nous vous encourageons à consulter régulièrement cette page.`
        },
        {
          title: '11. Cookies et gestion des préférences',
          content: `**Types de cookies utilisés :**

1. **Cookies strictement nécessaires** (ne peuvent pas être désactivés)
   - Session utilisateur
   - Sécurité du site

2. **Cookies de préférence** (peuvent être désactivés)
   - Langue sélectionnée (FR/AR)
   - Thème (clair/sombre)

3. **Cookies analytiques** (peuvent être désactivés)
   - Google Analytics
   - Mesure d'audience

**Comment gérer vos cookies :**

- Via votre navigateur : Paramètres → Confidentialité → Cookies
- Suppression manuelle : Effacer les données de navigation
- Extensions de blocage : Privacy Badger, uBlock Origin

Les cookies de préférence améliorent votre expérience mais ne sont pas obligatoires pour utiliser le calculateur.`
        },
        {
          title: '12. Contact et réclamations',
          content: `**Pour toute question concernant cette politique ou vos données :**

📧 Email : admin@taawidaty.ma  
📱 Formulaire de contact : [À venir]

**Délégué à la Protection des Données (DPO) :**  
BENTALBA ZAKARIA  
Email : admin@taawidaty.ma

**Autorité de contrôle au Maroc :**  
Commission Nationale de contrôle de la protection des Données à Caractère Personnel (CNDP)  
Site web : https://www.cndp.ma  
Email : cndp@cndp.ma

Vous avez le droit de déposer une réclamation auprès de la CNDP si vous estimez que vos droits ne sont pas respectés.`
        },
        {
          title: '13. Informations médicales et avertissement',
          content: `**Important :**

Les informations fournies par notre calculateur de remboursement sont à titre informatif uniquement et ne constituent pas un avis médical.

- Nous ne collectons pas d'informations médicales personnelles
- Nous ne stockons pas de données de santé
- Les recherches de médicaments sont anonymisées
- Aucun lien n'est fait entre vos recherches et votre identité

Pour des conseils médicaux personnalisés, consultez toujours un professionnel de santé qualifié.`
        },
        {
          title: '14. Conformité légale',
          content: `Cette Politique de Confidentialité est conforme à :

- **RGPD** (Règlement Général sur la Protection des Données - UE)
- **Loi marocaine n° 09-08** relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel
- **Directives CNDP** (Commission Nationale de contrôle de la protection des Données à Caractère Personnel)

**Juridiction :**  
Cette politique est régie par la loi marocaine. Tout litige sera soumis aux tribunaux compétents de Rabat, Maroc.`
        }
      ],
      footer: `En utilisant Taawidaty, vous acceptez cette Politique de Confidentialité.

Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.`
    },
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: 4 نوفمبر 2025',
      intro: 'تلتزم تعويضاتي (المشار إليها فيما يلي بـ "نحن" أو "موقعنا") بحماية خصوصية مستخدميها. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها.',
      sections: [
        {
          title: '١. المعلومات التي نجمعها',
          content: `نجمع الأنواع التالية من المعلومات:

**١.١ المعلومات المقدمة طوعاً**
- عمليات البحث عن الأدوية في حاسبتنا
- نوع التأمين المختار (CNOPS أو CNSS)
- لا يتم جمع أي معلومات شخصية قابلة للتحديد عند استخدام الحاسبة

**١.٢ المعلومات المجمعة تلقائياً**
- عنوان IP
- نوع وإصدار المتصفح
- نظام التشغيل
- الصفحات المُشاهدة ومدة الزيارات
- بيانات الموقع الجغرافي (البلد، المدينة)
- المُحيل (الموقع الذي أتيت منه)

**١.٣ ملفات تعريف الارتباط والتقنيات المماثلة**
نستخدم ملفات تعريف الارتباط لتحسين تجربتك:
- ملفات تعريف التفضيلات (اللغة المختارة)
- ملفات تعريف السمة (الوضع الفاتح/الداكن)
- ملفات تعريف التحليل (Google Analytics)
- لا تُستخدم حالياً ملفات تعريف التتبع الإعلاني`
        },
        {
          title: '٢. كيف نستخدم معلوماتك',
          content: `نستخدم المعلومات المجمعة من أجل:

- **تقديم خدماتنا**: حساب تعويضات الأدوية حسب تأمينك
- **تحسين موقعنا**: تحليل الاستخدام لتحسين تجربة المستخدم
- **تفضيلات المستخدم**: تذكر اختياراتك للغة والسمة
- **الإحصائيات**: فهم الأدوية الأكثر بحثاً
- **الأمان**: كشف ومنع الاستخدام التعسفي أو الاحتيالي

**لا نبيع بياناتك الشخصية أبداً لأطراف ثالثة.**`
        },
        {
          title: '٣. الأساس القانوني للمعالجة',
          content: `وفقاً للائحة العامة لحماية البيانات (RGPD)، نعالج بياناتك على الأسس القانونية التالية:

- **الموافقة**: لملفات تعريف الارتباط غير الأساسية
- **المصلحة المشروعة**: لتحليل وتحسين الموقع
- **تنفيذ الخدمة**: لتوفير حاسبة التعويضات

يمكنك سحب موافقتك في أي وقت بتعديل إعدادات ملفات تعريف الارتباط الخاصة بك.`
        },
        {
          title: '٤. مشاركة المعلومات مع أطراف ثالثة',
          content: `نشارك بعض المعلومات مع الأطراف الثالثة التالية:

**٤.١ Google Analytics**
- نستخدم Google Analytics لتحليل حركة المرور على الموقع
- قد تستخدم Google ملفات تعريف الارتباط لجمع بيانات مجهولة المصدر

**٤.٢ خدمات الاستضافة**
- يتم استضافة موقعنا بواسطة Cloudflare Pages
- قد تصل Cloudflare إلى بيانات تقنية لضمان توفر الخدمة

**٤.٣ Google AdSense والإعلانات من جهات خارجية**

**استخدام ملفات تعريف الارتباط الإعلانية**

يستخدم موردو الجهات الخارجية، بما في ذلك Google، ملفات تعريف الارتباط لعرض الإعلانات بناءً على زيارات المستخدمين السابقة لموقعنا على الويب و/أو مواقع ويب أخرى.

**تخصيص الإعلانات**

يتيح استخدام Google لملفات تعريف الارتباط الإعلانية لها ولشركائها عرض الإعلانات للمستخدمين بناءً على زيارتهم لموقعنا و/أو مواقع أخرى على الإنترنت.

**خيارات إلغاء الاشتراك**

يمكنك إلغاء تخصيص الإعلانات بعدة طرق:

1. **إعدادات إعلانات Google**  
   تفضل بزيارة https://www.google.com/settings/ads لإلغاء الاشتراك في الإعلانات المخصصة من Google.

2. **إلغاء الاشتراك في إعلانات الجهات الخارجية**  
   تفضل بزيارة http://www.aboutads.info/choices/ لإلغاء الاشتراك في ملفات تعريف الارتباط الإعلانية من موردي الجهات الخارجية الآخرين.

3. **التحالف الأوروبي للإعلان الرقمي التفاعلي (EDAA)**  
   يمكن للمستخدمين الأوروبيين أيضًا زيارة http://www.youronlinechoices.eu/ لإدارة تفضيلاتهم الإعلانية.

**قائمة الشركاء الإعلانيين**

حاليًا، نستخدم فقط:
- **Google AdSense** (google.com) - شبكة إعلانية

إذا أضفنا شركاء إعلانيين آخرين في المستقبل، فسيتم تحديث هذه القائمة وسيتم إعلامك.

**الامتثال لإطار الشفافية والموافقة IAB (TCF)**

يحترم هذا الموقع إطار الشفافية والموافقة (TCF) v2.2 من IAB Europe. يتم تخزين اختيارات موافقتك واحترامها من قبل جميع شركائنا الإعلانيين المعتمدين.

لا نشارك أبداً بياناتك مع أطراف ثالثة لأغراض تسويقية دون موافقتك الصريحة.`
        },
        {
          title: '٥. حقوقك',
          content: `وفقاً للائحة العامة لحماية البيانات والقانون المغربي رقم 09-08، لديك الحقوق التالية:

**٥.١ حق الوصول**
- يمكنك طلب المعلومات التي نحتفظ بها عنك

**٥.٢ حق التصحيح**
- يمكنك تصحيح أي معلومات غير دقيقة

**٥.٣ حق المحو**
- يمكنك طلب حذف بياناتك

**٥.٤ حق قابلية النقل**
- يمكنك طلب نسخة من بياناتك بتنسيق منظم

**٥.٥ حق الاعتراض**
- يمكنك الاعتراض على معالجة بياناتك لأغراض معينة

**٥.٦ حق سحب الموافقة**
- يمكنك سحب موافقتك في أي وقت

لممارسة هذه الحقوق، اتصل بنا على: admin@taawidaty.ma`
        },
        {
          title: '٦. الاحتفاظ بالبيانات',
          content: `نحتفظ ببياناتك للمدد التالية:

- **ملفات تعريف التفضيلات**: حتى سنة واحدة أو حتى الحذف اليدوي
- **بيانات التحليل**: بيانات مجهولة المصدر محفوظة إلى أجل غير مسمى
- **سجلات الخادم**: 90 يوماً كحد أقصى
- **بيانات الاتصال** (إذا قُدمت): حتى طلب الحذف

يتم الاحتفاظ بالبيانات فقط للمدة اللازمة للأغراض التي تم جمعها من أجلها.`
        },
        {
          title: '٧. أمان البيانات',
          content: `نطبق تدابير أمنية مناسبة:

- **تشفير HTTPS**: جميع الاتصالات مشفرة
- **استضافة آمنة**: بنية تحتية Cloudflare مع حماية DDoS
- **عدم تخزين بيانات حساسة**: لا يتم تخزين أي بيانات صحية شخصية
- **وصول مقيد**: فقط المسؤولون المصرح لهم لديهم وصول للأنظمة
- **تحديثات منتظمة**: تطبيق تصحيحات الأمان بسرعة

ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%. نسعى جاهدين لحماية بياناتك لكن لا يمكننا ضمان أمان مطلق.`
        },
        {
          title: '٨. حماية القاصرين',
          content: `موقعنا موجه للجمهور العام ولا يستهدف تحديداً القاصرين دون سن 16 عاماً.

إذا كنت والداً أو وصياً واكتشفت أن طفلك قدم لنا معلومات شخصية، اتصل بنا لكي نتمكن من حذفها.`
        },
        {
          title: '٩. التحويلات الدولية',
          content: `قد يتم نقل بياناتك وتخزينها على خوادم موجودة خارج المغرب، خاصة:

- **خوادم Google** (الولايات المتحدة، أوروبا): لـ Google Analytics
- **Cloudflare** (شبكة عالمية): للاستضافة وتوزيع المحتوى

هذه الشركات متوافقة مع اللائحة العامة لحماية البيانات وتقدم ضمانات مناسبة لحماية بياناتك.`
        },
        {
          title: '١٠. تعديلات على هذه السياسة',
          content: `قد نحدّث سياسة الخصوصية هذه بشكل دوري لتعكس:

- التغييرات في ممارساتنا
- تطورات التشريعات
- الميزات الجديدة للموقع

سيتم عرض التعديلات المهمة بشكل واضح على الموقع. يشير تاريخ "آخر تحديث" أعلى هذه الصفحة إلى الإصدار الحالي.

نشجعك على مراجعة هذه الصفحة بانتظام.`
        },
        {
          title: '١١. ملفات تعريف الارتباط وإدارة التفضيلات',
          content: `**أنواع ملفات تعريف الارتباط المستخدمة:**

1. **ملفات تعريف الارتباط الضرورية تماماً** (لا يمكن تعطيلها)
   - جلسة المستخدم
   - أمان الموقع

2. **ملفات تعريف التفضيلات** (يمكن تعطيلها)
   - اللغة المختارة (FR/AR)
   - السمة (فاتح/داكن)

3. **ملفات تعريف التحليل** (يمكن تعطيلها)
   - Google Analytics
   - قياس الجمهور

**كيفية إدارة ملفات تعريف الارتباط الخاصة بك:**

- عبر متصفحك: الإعدادات ← الخصوصية ← ملفات تعريف الارتباط
- الحذف اليدوي: مسح بيانات التصفح
- امتدادات الحظر: Privacy Badger, uBlock Origin`
        },
        {
          title: '١٢. الاتصال والشكاوى',
          content: `**لأي سؤال بخصوص هذه السياسة أو بياناتك:**

📧 البريد الإلكتروني: admin@taawidaty.ma  
📱 نموذج الاتصال: [قريباً]

**مندوب حماية البيانات:**  
بنطلبة زكرياء  
البريد الإلكتروني: admin@taawidaty.ma

**السلطة الرقابية في المغرب:**  
اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP)  
الموقع: https://www.cndp.ma  
البريد الإلكتروني: cndp@cndp.ma

لديك الحق في تقديم شكوى إلى CNDP إذا كنت تعتقد أن حقوقك غير محترمة.`
        },
        {
          title: '١٣. المعلومات الطبية والتحذير',
          content: `**مهم:**

المعلومات المقدمة من حاسبة التعويضات الخاصة بنا هي لأغراض إعلامية فقط ولا تشكل نصيحة طبية.

- نحن لا نجمع معلومات طبية شخصية
- نحن لا نخزن بيانات صحية
- عمليات البحث عن الأدوية مجهولة المصدر
- لا يوجد ربط بين عمليات البحث وهويتك

للحصول على نصائح طبية شخصية، استشر دائماً مهنياً صحياً مؤهلاً.`
        },
        {
          title: '١٤. الامتثال القانوني',
          content: `سياسة الخصوصية هذه متوافقة مع:

- **اللائحة العامة لحماية البيانات** (الاتحاد الأوروبي)
- **القانون المغربي رقم 09-08** المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي
- **توجيهات CNDP** (اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي)

**الاختصاص القضائي:**  
تخضع هذه السياسة للقانون المغربي. سيتم تقديم أي نزاع إلى المحاكم المختصة في الرباط، المغرب.`
        }
      ],
      footer: `باستخدام تعويضاتي، فإنك توافق على سياسة الخصوصية هذه.

إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام موقعنا.`
    }
  };

  const current = content[language];
  const metaTitle = `${current.title} | Taawidaty`;
  const metaDescription = current.intro;
  const metaKeywords = language === 'ar'
    ? ['سياسة الخصوصية', 'حماية البيانات', 'تعويضاتي']
    : ['politique de confidentialité', 'protection des données', 'taawidaty'];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: current.title,
      url: canonical,
      inLanguage: language === 'ar' ? 'ar-MA' : 'fr-MA',
      description: current.intro
    }
  ];

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        lang={language}
        canonical={canonical}
        structuredData={structuredData}
      />

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-card border-b dark:border-border shadow-sm">
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
            <p className="text-sm text-muted-foreground mt-2">
              {current.lastUpdated}
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8">
            <FormattedContent className="text-lg text-foreground mb-8 leading-relaxed">
              {current.intro}
            </FormattedContent>

            {current.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-primary-700 dark:text-primary mb-4">
                  <FormattedContent>{section.title}</FormattedContent>
                </h2>
                <FormattedContent className="text-foreground leading-relaxed">
                  {section.content}
                </FormattedContent>
              </section>
            ))}

            <div className="mt-12 p-6 bg-primary-50 dark:bg-muted rounded-lg border-l-4 border-primary-700">
              <FormattedContent className="text-foreground leading-relaxed">
                {current.footer}
              </FormattedContent>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
