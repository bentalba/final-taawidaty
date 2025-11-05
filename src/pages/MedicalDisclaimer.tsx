/**
 * Medical Disclaimer Page - Taawidaty
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { FormattedContent } from '@/components/FormattedText';

export default function MedicalDisclaimer() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const content = {
    fr: {
      title: 'Avertissement Médical',
      lastUpdated: 'Dernière mise à jour : 4 novembre 2025',
      mainWarning: 'Les informations fournies sur Taawidaty.ma sont à des fins éducatives et informatives uniquement et ne constituent pas des conseils médicaux, un diagnostic ou un traitement.',
      sections: [
        {
          title: 'Objectif du Site',
          content: `Taawidaty.ma est un calculateur de remboursement de médicaments conçu pour aider les patients au Maroc à estimer leurs coûts de médicaments sous les systèmes d'assurance CNOPS et CNSS.

Notre objectif est purement informatif :
- Calculer les montants de remboursement approximatifs
- Fournir des informations générales sur la couverture d'assurance
- Aider à la planification budgétaire pour les médicaments

**Ce site n'est PAS :**
- Un service de conseil médical
- Un outil de diagnostic
- Un substitut à une consultation médicale
- Une pharmacie ou un service de vente de médicaments`
        },
        {
          title: 'Pas de Conseil Médical',
          content: `⚠️ **AVERTISSEMENT IMPORTANT**

Les informations présentées sur ce site ne doivent JAMAIS être utilisées pour :
- Diagnostiquer une condition médicale
- Choisir un traitement médicamenteux
- Modifier ou arrêter un traitement existant
- Remplacer l'avis d'un professionnel de santé qualifié
- Prendre des décisions médicales sans supervision médicale

**Consultez toujours votre médecin, pharmacien ou autre professionnel de santé qualifié pour :**
- Tout problème de santé ou symptôme
- Avant de commencer un nouveau médicament
- Questions sur les dosages ou l'administration
- Interactions médicamenteuses potentielles
- Effets secondaires ou réactions indésirables`
        },
        {
          title: 'Ne Retardez Pas les Soins Médicaux',
          content: `🚨 **EN CAS D'URGENCE MÉDICALE, APPELEZ IMMÉDIATEMENT LE 141 (SAMU Maroc)**

N'ignorez jamais et ne retardez jamais la recherche de conseils médicaux professionnels en raison de quelque chose que vous avez lu ou calculé sur Taawidaty.ma.

Si vous ressentez une urgence médicale :
- Appelez immédiatement les services d'urgence locaux
- Rendez-vous aux urgences de l'hôpital le plus proche
- Ne comptez pas sur les informations de ce site pour des décisions urgentes

Les urgences médicales courantes incluent :
- Douleur thoracique ou difficulté respiratoire
- Perte de conscience ou confusion sévère
- Saignement incontrôlable
- Réaction allergique grave
- Symptômes d'AVC ou de crise cardiaque`
        },
        {
          title: 'Exactitude des Informations',
          content: `Nous nous efforçons de fournir des informations précises et à jour, cependant :

**Limitations :**
- Les taux de remboursement peuvent changer sans préavis
- Les prix des médicaments sont indicatifs et peuvent varier
- Les politiques d'assurance évoluent régulièrement
- Les données peuvent contenir des erreurs ou être incomplètes

**Vos responsabilités :**
- Vérifiez toujours les informations auprès de sources officielles
- Confirmez les taux de remboursement avec votre assurance (CNOPS/CNSS)
- Vérifiez les prix exacts auprès de votre pharmacie
- Consultez les documents officiels de votre assurance

Nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité de toutes les informations sur ce site.`
        },
        {
          title: 'Pas de Relation Médecin-Patient',
          content: `L'utilisation de ce site ne crée pas de relation médecin-patient ou pharmacien-patient entre vous et :
- Taawidaty.ma
- Les opérateurs du site
- Tout contributeur au site
- Toute organisation médicale ou pharmaceutique

Les informations fournies sont générales et non personnalisées. Elles ne tiennent pas compte de :
- Votre historique médical spécifique
- Vos allergies ou contre-indications
- Vos autres médicaments ou conditions
- Votre âge, poids ou circonstances particulières

Pour des conseils médicaux personnalisés, consultez toujours un professionnel de santé en personne.`
        },
        {
          title: 'Informations sur les Médicaments',
          content: `Les informations sur les médicaments présentées sur ce site :

**Source des données :**
- Bases de données publiques officielles
- Publications du Ministère de la Santé marocain
- Informations des assurances CNOPS et CNSS
- Sources pharmaceutiques reconnues

**Limitations :**
- Les informations sont générales et non exhaustives
- Elles ne couvrent pas tous les effets secondaires possibles
- Elles peuvent ne pas refléter les dernières découvertes médicales
- Elles ne remplacent pas la notice du médicament

**Recommandations :**
- Lisez toujours la notice complète du médicament
- Suivez les instructions de votre médecin et pharmacien
- Signalez tout effet secondaire à votre professionnel de santé
- Ne modifiez jamais votre traitement sans avis médical`
        },
        {
          title: 'Populations Spéciales',
          content: `Attention particulière requise pour :

**Femmes enceintes ou allaitantes :**
- Consultez toujours votre médecin avant de prendre tout médicament
- De nombreux médicaments sont contre-indiqués pendant la grossesse
- L'allaitement peut nécessiter des précautions spéciales

**Enfants et adolescents :**
- Les dosages pédiatriques nécessitent une prescription médicale
- Certains médicaments sont contre-indiqués chez les enfants
- Consultez toujours un pédiatre

**Personnes âgées :**
- Le métabolisme des médicaments change avec l'âge
- Risque accru d'interactions médicamenteuses
- Ajustement des doses souvent nécessaire

**Patients avec conditions chroniques :**
- Maladie rénale ou hépatique
- Diabète, hypertension, maladies cardiaques
- Tout état nécessitant un suivi médical régulier

Consultez toujours votre médecin pour des recommandations personnalisées.`
        },
        {
          title: 'Interactions Médicamenteuses',
          content: `⚠️ Les informations sur les interactions médicamenteuses sur ce site sont incomplètes.

**Risques des interactions :**
- Diminution de l'efficacité des médicaments
- Augmentation des effets secondaires
- Toxicité potentiellement dangereuse
- Complications imprévues

**Informez toujours votre médecin et pharmacien de :**
- Tous les médicaments que vous prenez (sur ordonnance et en vente libre)
- Tous les suppléments et vitamines
- Les produits à base de plantes
- Votre consommation d'alcool
- Toute allergie connue

Ne commencez jamais un nouveau médicament sans consulter un professionnel de santé.`
        },
        {
          title: 'Limitation de Responsabilité',
          content: `**TAAWIDATY.MA ET SES OPÉRATEURS DÉCLINENT TOUTE RESPONSABILITÉ POUR :**

- Dommages directs, indirects ou consécutifs résultant de l'utilisation du site
- Décisions médicales prises sur la base des informations du site
- Erreurs ou omissions dans le contenu
- Problèmes techniques ou indisponibilité du site
- Perte de données ou interruption de service
- Toute conséquence sur la santé liée à l'utilisation du site

L'utilisateur assume l'entière responsabilité de :
- Vérifier les informations auprès de sources professionnelles
- Consulter des professionnels de santé qualifiés
- Suivre les prescriptions et recommandations médicales
- Toute décision prise concernant les médicaments ou traitements

**EN UTILISANT CE SITE, VOUS ACCEPTEZ QUE VOUS LE FAITES À VOS PROPRES RISQUES.**`
        },
        {
          title: 'Informations d\'Assurance',
          content: `Les informations sur les remboursements CNOPS et CNSS :

**Caractère indicatif :**
- Les taux affichés sont approximatifs et indicatifs
- Les politiques de remboursement changent régulièrement
- Votre situation personnelle peut affecter le remboursement réel
- Des conditions spécifiques peuvent s'appliquer

**Vérification nécessaire :**
- Consultez directement votre caisse d'assurance (CNOPS ou CNSS)
- Vérifiez votre contrat d'assurance spécifique
- Demandez confirmation écrite pour les médicaments coûteux
- Gardez tous les reçus et documents

Nous ne sommes pas affiliés à CNOPS ou CNSS et ne pouvons garantir les montants de remboursement.`
        },
        {
          title: 'Modifications et Mises à Jour',
          content: `Les informations sur ce site sont susceptibles de changer sans préavis.

**Nous nous réservons le droit de :**
- Modifier, ajouter ou supprimer du contenu à tout moment
- Mettre à jour les taux de remboursement
- Corriger les erreurs
- Améliorer les fonctionnalités

**Recommandations :**
- Vérifiez la date de "Dernière mise à jour" sur chaque page
- Revenez régulièrement pour les informations actualisées
- Ne vous fiez pas aux informations obsolètes
- Vérifiez auprès de sources officielles pour les décisions importantes

La date indiquée en haut de cette page reflète la dernière révision de cet avertissement médical.`
        },
        {
          title: 'Conformité Légale',
          content: `Cet avertissement médical est conforme à :

- La réglementation marocaine sur l'information médicale
- Les directives du Ministère de la Santé du Maroc
- Les normes internationales de divulgation médicale
- Les exigences légales de responsabilité

**Juridiction :**
Ce site est régi par les lois du Royaume du Maroc. Tout litige sera soumis aux tribunaux compétents de Rabat, Maroc.

**Contact légal :**
Pour toute question juridique concernant cet avertissement :
Email : legal@taawidaty.ma`
        },
        {
          title: 'Ressources Officielles',
          content: `Pour des informations médicales officielles au Maroc :

**Ministère de la Santé**
- Site web : http://www.sante.gov.ma
- Hotline : 080 100 47 47

**CNOPS (Caisse Nationale des Organismes de Prévoyance Sociale)**
- Site web : https://www.cnops.org.ma
- Contact : 0801 002 003

**CNSS (Caisse Nationale de Sécurité Sociale)**
- Site web : https://www.cnss.ma
- Contact : 080 2000 212

**Centre Anti-Poison et de Pharmacovigilance du Maroc**
- Urgences : 0801 000 180 (24h/24)

**SAMU (Service d'Aide Médicale Urgente)**
- Urgences : 141 ou 15

Privilégiez toujours ces sources officielles pour les informations critiques sur la santé.`
        }
      ],
      footer: `EN UTILISANT TAAWIDATY.MA, VOUS RECONNAISSEZ AVOIR LU, COMPRIS ET ACCEPTÉ CET AVERTISSEMENT MÉDICAL.

Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.

En cas de doute sur votre santé ou vos médicaments, consultez toujours un professionnel de santé qualifié.`
    },
    ar: {
      title: 'إخلاء المسؤولية الطبية',
      lastUpdated: 'آخر تحديث: 4 نوفمبر 2025',
      mainWarning: 'المعلومات المقدمة على Taawidaty.ma هي لأغراض تعليمية وإعلامية فقط ولا تشكل نصيحة طبية أو تشخيصاً أو علاجاً.',
      sections: [
        {
          title: 'غرض الموقع',
          content: `Taawidaty.ma هي حاسبة تعويضات الأدوية مصممة لمساعدة المرضى في المغرب على تقدير تكاليف أدويتهم في إطار أنظمة التأمين CNOPS و CNSS.

هدفنا هو إعلامي فقط:
- حساب مبالغ التعويضات التقريبية
- توفير معلومات عامة عن التغطية التأمينية
- المساعدة في التخطيط المالي للأدوية

**هذا الموقع ليس:**
- خدمة استشارة طبية
- أداة تشخيص
- بديلاً عن الاستشارة الطبية
- صيدلية أو خدمة بيع أدوية`
        },
        {
          title: 'عدم تقديم نصائح طبية',
          content: `⚠️ **تحذير مهم**

يجب ألا تُستخدم المعلومات المقدمة على هذا الموقع أبداً من أجل:
- تشخيص حالة طبية
- اختيار علاج دوائي
- تعديل أو إيقاف علاج قائم
- استبدال رأي مهني صحي مؤهل
- اتخاذ قرارات طبية دون إشراف طبي

**استشر دائماً طبيبك أو صيدليك أو مهنياً صحياً مؤهلاً آخر من أجل:**
- أي مشكلة صحية أو أعراض
- قبل البدء في دواء جديد
- أسئلة حول الجرعات أو الإعطاء
- التفاعلات الدوائية المحتملة
- الآثار الجانبية أو التفاعلات الضارة`
        },
        {
          title: 'لا تؤخر الرعاية الطبية',
          content: `🚨 **في حالة الطوارئ الطبية، اتصل فوراً بالرقم 141 (SAMU المغرب)**

لا تتجاهل أبداً ولا تؤخر طلب المشورة الطبية المهنية بسبب شيء قرأته أو حسبته على Taawidaty.ma.

إذا كنت تعاني من طوارئ طبية:
- اتصل فوراً بخدمات الطوارئ المحلية
- اذهب إلى قسم الطوارئ في أقرب مستشفى
- لا تعتمد على معلومات هذا الموقع للقرارات العاجلة

تشمل حالات الطوارئ الطبية الشائعة:
- ألم في الصدر أو صعوبة في التنفس
- فقدان الوعي أو ارتباك شديد
- نزيف لا يمكن السيطرة عليه
- رد فعل تحسسي شديد
- أعراض سكتة دماغية أو نوبة قلبية`
        },
        {
          title: 'دقة المعلومات',
          content: `نسعى جاهدين لتقديم معلومات دقيقة ومحدثة، ومع ذلك:

**القيود:**
- قد تتغير معدلات التعويض دون سابق إنذار
- أسعار الأدوية إرشادية وقد تختلف
- سياسات التأمين تتطور بانتظام
- قد تحتوي البيانات على أخطاء أو تكون غير كاملة

**مسؤولياتك:**
- تحقق دائماً من المعلومات من المصادر الرسمية
- أكد معدلات التعويض مع تأمينك (CNOPS/CNSS)
- تحقق من الأسعار الدقيقة مع صيدليتك
- راجع الوثائق الرسمية لتأمينك

نحن لا نضمن دقة أو اكتمال أو حداثة جميع المعلومات على هذا الموقع.`
        },
        {
          title: 'عدم وجود علاقة طبيب-مريض',
          content: `استخدام هذا الموقع لا ينشئ علاقة طبيب-مريض أو صيدلي-مريض بينك وبين:
- Taawidaty.ma
- مشغلي الموقع
- أي مساهم في الموقع
- أي منظمة طبية أو صيدلانية

المعلومات المقدمة عامة وغير مخصصة. لا تأخذ في الاعتبار:
- تاريخك الطبي المحدد
- حساسياتك أو موانع الاستعمال
- أدويتك أو حالاتك الأخرى
- عمرك أو وزنك أو ظروفك الخاصة

للحصول على نصائح طبية مخصصة، استشر دائماً مهنياً صحياً شخصياً.`
        },
        {
          title: 'معلومات عن الأدوية',
          content: `المعلومات حول الأدوية المقدمة على هذا الموقع:

**مصدر البيانات:**
- قواعد البيانات الرسمية العامة
- منشورات وزارة الصحة المغربية
- معلومات تأمينات CNOPS و CNSS
- مصادر صيدلانية معترف بها

**القيود:**
- المعلومات عامة وغير شاملة
- لا تغطي جميع الآثار الجانبية المحتملة
- قد لا تعكس أحدث الاكتشافات الطبية
- لا تحل محل نشرة الدواء

**التوصيات:**
- اقرأ دائماً نشرة الدواء الكاملة
- اتبع تعليمات طبيبك وصيدليك
- أبلغ عن أي أثر جانبي لمهني الصحة الخاص بك
- لا تعدل أبداً علاجك دون استشارة طبية`
        },
        {
          title: 'الفئات الخاصة',
          content: `يلزم اهتمام خاص لـ:

**النساء الحوامل أو المرضعات:**
- استشيري دائماً طبيبك قبل تناول أي دواء
- العديد من الأدوية محظورة أثناء الحمل
- قد تتطلب الرضاعة احتياطات خاصة

**الأطفال والمراهقين:**
- تتطلب الجرعات للأطفال وصفة طبية
- بعض الأدوية محظورة عند الأطفال
- استشر دائماً طبيب أطفال

**كبار السن:**
- يتغير استقلاب الأدوية مع التقدم في العمر
- زيادة خطر التفاعلات الدوائية
- غالباً ما يكون تعديل الجرعات ضرورياً

**المرضى ذوو الحالات المزمنة:**
- مرض كلوي أو كبدي
- السكري، ارتفاع ضغط الدم، أمراض القلب
- أي حالة تتطلب متابعة طبية منتظمة

استشر دائماً طبيبك للحصول على توصيات مخصصة.`
        },
        {
          title: 'التفاعلات الدوائية',
          content: `⚠️ المعلومات حول التفاعلات الدوائية على هذا الموقع غير كاملة.

**مخاطر التفاعلات:**
- انخفاض فعالية الأدوية
- زيادة الآثار الجانبية
- سمية خطيرة محتملة
- مضاعفات غير متوقعة

**أخبر دائماً طبيبك وصيدليك عن:**
- جميع الأدوية التي تتناولها (بوصفة طبية وبدون وصفة)
- جميع المكملات والفيتامينات
- المنتجات العشبية
- استهلاكك للكحول
- أي حساسية معروفة

لا تبدأ أبداً دواءً جديداً دون استشارة مهني صحي.`
        },
        {
          title: 'تحديد المسؤولية',
          content: `**TAAWIDATY.MA ومشغلوها يخلون مسؤوليتهم عن:**

- الأضرار المباشرة أو غير المباشرة أو التبعية الناتجة عن استخدام الموقع
- القرارات الطبية المتخذة بناءً على معلومات الموقع
- الأخطاء أو الإغفالات في المحتوى
- المشاكل التقنية أو عدم توفر الموقع
- فقدان البيانات أو انقطاع الخدمة
- أي عواقب صحية مرتبطة باستخدام الموقع

يتحمل المستخدم المسؤولية الكاملة عن:
- التحقق من المعلومات من مصادر مهنية
- استشارة مهنيي الصحة المؤهلين
- اتباع الوصفات والتوصيات الطبية
- أي قرار يتخذ بشأن الأدوية أو العلاجات

**باستخدام هذا الموقع، فإنك تقبل أنك تفعل ذلك على مسؤوليتك الخاصة.**`
        },
        {
          title: 'معلومات التأمين',
          content: `المعلومات حول تعويضات CNOPS و CNSS:

**طابع إرشادي:**
- المعدلات المعروضة تقريبية وإرشادية
- تتغير سياسات التعويض بانتظام
- قد تؤثر حالتك الشخصية على التعويض الفعلي
- قد تنطبق شروط محددة

**التحقق الضروري:**
- استشر مباشرة صندوق التأمين الخاص بك (CNOPS أو CNSS)
- تحقق من عقد التأمين المحدد الخاص بك
- اطلب تأكيداً كتابياً للأدوية باهظة الثمن
- احتفظ بجميع الإيصالات والوثائق

نحن لسنا منتسبين إلى CNOPS أو CNSS ولا يمكننا ضمان مبالغ التعويض.`
        },
        {
          title: 'التعديلات والتحديثات',
          content: `المعلومات على هذا الموقع عرضة للتغيير دون سابق إنذار.

**نحتفظ بالحق في:**
- تعديل أو إضافة أو حذف المحتوى في أي وقت
- تحديث معدلات التعويض
- تصحيح الأخطاء
- تحسين الوظائف

**التوصيات:**
- تحقق من تاريخ "آخر تحديث" على كل صفحة
- عد بانتظام للحصول على معلومات محدثة
- لا تعتمد على معلومات قديمة
- تحقق من المصادر الرسمية للقرارات المهمة

يعكس التاريخ المشار إليه في أعلى هذه الصفحة آخر مراجعة لهذا الإخلاء من المسؤولية الطبية.`
        },
        {
          title: 'الامتثال القانوني',
          content: `هذا الإخلاء من المسؤولية الطبية متوافق مع:

- اللوائح المغربية المتعلقة بالمعلومات الطبية
- توجيهات وزارة الصحة المغربية
- المعايير الدولية للإفصاح الطبي
- المتطلبات القانونية للمسؤولية

**الاختصاص القضائي:**
يخضع هذا الموقع لقوانين المملكة المغربية. سيتم تقديم أي نزاع إلى المحاكم المختصة في الرباط، المغرب.

**جهة الاتصال القانونية:**
لأي أسئلة قانونية تتعلق بهذا التحذير:
البريد الإلكتروني: legal@taawidaty.ma`
        },
        {
          title: 'الموارد الرسمية',
          content: `للحصول على معلومات طبية رسمية في المغرب:

**وزارة الصحة**
- الموقع: http://www.sante.gov.ma
- الخط الساخن: 080 100 47 47

**CNOPS**
- الموقع: https://www.cnops.org.ma
- جهة الاتصال: 0801 002 003

**CNSS**
- الموقع: https://www.cnss.ma
- جهة الاتصال: 080 2000 212

**مركز مكافحة التسمم واليقظة الدوائية بالمغرب**
- الطوارئ: 0801 000 180 (24 ساعة/24)

**SAMU (خدمة المساعدة الطبية العاجلة)**
- الطوارئ: 141 أو 15

فضل دائماً هذه المصادر الرسمية للحصول على معلومات صحية حاسمة.`
        }
      ],
      footer: `باستخدام TAAWIDATY.MA، فإنك تقر بأنك قرأت وفهمت وقبلت هذا الإخلاء من المسؤولية الطبية.

إذا كنت لا تقبل هذه الشروط، يرجى عدم استخدام هذا الموقع.

في حالة الشك بشأن صحتك أو أدويتك، استشر دائماً مهنياً صحياً مؤهلاً.`
    }
  };

  const current = content[language];
  const pageUrl = 'https://taawidaty.ma/medical-disclaimer';
  const metaDescription = language === 'ar'
    ? 'اقرأ الإشعار الطبي الرسمي لمنصة تعويضاتي وتعرف على حدود استخدام المعلومات الصحية والتعليمية المقدمة.'
    : 'Consultez l\'avertissement médical officiel de Taawidaty et comprenez les limites d\'usage des informations de santé fournies.';
  const metaKeywords = language === 'ar'
    ? [
        'تحذير طبي تعويضاتي',
        'سياسة طبية Taawidaty',
        'مسؤولية تعويضات الأدوية',
        'معلومات طبية المغرب',
        'CNSS CNOPS تحذير'
      ]
    : [
        'avertissement médical taawidaty',
        'disclaimer médical maroc',
        'responsabilite remboursement medicaments',
        'politique sante taawidaty',
        'cnss cnops avertissement'
      ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: language === 'ar' ? 'الإشعار الطبي - تعويضاتي' : 'Avertissement Médical - Taawidaty',
      description: metaDescription,
      url: pageUrl,
      inLanguage: language,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Taawidaty',
        url: 'https://taawidaty.ma'
      }
    }
  ];

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

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-orange-50/20 dark:from-background dark:via-card dark:to-accent/30 transition-colors duration-300">
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
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-3xl font-bold text-red-700 dark:text-red-500">
                  {current.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {current.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Main Warning Box */}
          <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-red-700 dark:text-red-500 mb-2">
                  {language === 'ar' ? 'تحذير مهم' : 'Avertissement Important'}
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  {current.mainWarning}
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8">
            {current.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-primary-700 dark:text-primary mb-4">
                  {section.title}
                </h2>
                <FormattedContent className="text-foreground leading-relaxed">
                  {section.content}
                </FormattedContent>
              </section>
            ))}

            <div className="mt-12 p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-600">
              <FormattedContent className="text-foreground font-bold leading-relaxed">
                {current.footer}
              </FormattedContent>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
