/**
 * About Us Page - Taawidaty
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Users, Target, Shield, Award, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { FormattedContent } from '@/components/FormattedText';

export default function AboutUs() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const content = {
    fr: {
      title: 'À Propos de Nous',
      subtitle: 'Votre allié pour comprendre vos remboursements de médicaments au Maroc',
      lastUpdated: 'Dernière mise à jour : 4 novembre 2025',
      intro: 'Taawidaty (تعويضاتي) est un calculateur de remboursement de médicaments conçu pour aider les citoyens marocains à estimer leurs coûts de médicaments sous les systèmes d\'assurance CNOPS et CNSS.',
      sections: [
        {
          title: 'Notre Mission',
          icon: 'target',
          content: `**Rendre les informations sur les remboursements de médicaments accessibles et compréhensibles pour tous les Marocains.**

Nous croyons que chaque patient a le droit de :
- Comprendre combien coûtera réellement son traitement
- Savoir à l'avance le montant du remboursement de son assurance
- Planifier son budget santé en toute transparence
- Accéder facilement aux informations sur les médicaments

Notre calculateur gratuit et facile à utiliser permet à des milliers de Marocains de prendre des décisions éclairées concernant leurs traitements médicaux.`
        },
        {
          title: 'Notre Histoire',
          icon: 'heart',
          content: `Taawidaty est né d'une expérience personnelle. En cherchant à comprendre combien je serais remboursé pour mes médicaments, j'ai réalisé que cette information n'était pas facilement accessible.

**Le problème :**
- Les informations de remboursement étaient dispersées
- Les calculs étaient complexes et peu clairs
- Pas d'outil simple pour estimer les coûts réels
- Les patients découvraient les montants seulement à la pharmacie

**Notre solution :**
Créer un calculateur transparent, gratuit et accessible qui :
- Centralise les données CNOPS et CNSS
- Calcule instantanément les remboursements
- Fonctionne en français et en arabe
- Est accessible sur tous les appareils

Lancé en 2025, Taawidaty aide déjà des milliers d'utilisateurs chaque mois à mieux comprendre leurs droits de remboursement.`
        },
        {
          title: 'Nos Valeurs',
          icon: 'shield',
          content: `**1. Transparence**
Toutes nos informations sont basées sur des sources officielles publiques. Nous ne cachons rien et expliquons clairement nos calculs.

**2. Accessibilité**
Notre service est 100% gratuit et le restera toujours. Pas d'abonnement, pas de frais cachés.

**3. Précision**
Nous mettons à jour régulièrement notre base de données avec les derniers taux de remboursement officiels.

**4. Respect de la vie privée**
Nous ne collectons pas d'informations personnelles. Vos recherches sont anonymes.

**5. Indépendance**
Nous ne sommes affiliés à aucune compagnie d'assurance, pharmacie ou laboratoire pharmaceutique.

**6. Éducation**
Au-delà du calcul, nous fournissons des informations pour aider les patients à comprendre le système de santé marocain.`
        },
        {
          title: 'Nos Sources de Données',
          icon: 'checkCircle',
          content: `Toutes nos informations proviennent de sources officielles et publiques :

**1. Base de données officielle des médicaments au Maroc**
- Ministère de la Santé du Royaume du Maroc
- Liste nationale des médicaments autorisés
- Prix publics de vente (PPV) officiels

**2. Taux de remboursement CNOPS**
- Site officiel : https://www.cnops.org.ma
- Bulletins officiels de remboursement
- Mises à jour réglementaires

**3. Taux de remboursement CNSS**
- Site officiel : https://www.cnss.ma
- Documentation officielle AMO
- Circulaires et décisions

**4. Informations pharmaceutiques**
- Agence Nationale de l'Assurance Maladie (ANAM)
- Bases de données pharmaceutiques reconnues
- Publications officielles du secteur

**Méthodologie de mise à jour :**
- Vérification trimestrielle des taux de remboursement
- Mise à jour immédiate en cas de changement réglementaire
- Validation croisée avec plusieurs sources
- Documentation de toutes les sources utilisées`
        },
        {
          title: 'Comment Ça Marche',
          icon: 'award',
          content: `**1. Base de données complète**
Nous maintenons une base de données de 4,678 médicaments avec :
- Prix publics de vente (PPV)
- Taux de remboursement CNOPS
- Taux de remboursement CNSS
- Informations pharmaceutiques

**2. Calcul en temps réel**
Lorsque vous recherchez un médicament :
- Le système identifie le médicament dans notre base
- Applique le taux de remboursement de votre assurance
- Calcule le montant remboursé et votre part
- Affiche les résultats instantanément

**3. Précision garantie**
- Les calculs suivent les formules officielles
- Les taux sont mis à jour régulièrement
- Les prix reflètent les données officielles
- Les résultats sont arrondis selon les règles officielles

**4. Accessibilité multilingue**
- Interface en français et en arabe
- Support RTL complet pour l'arabe
- Adaptation culturelle du contenu
- Accessibilité pour tous`
        },
        {
          title: 'Financement et Indépendance',
          icon: 'shield',
          content: `**Modèle actuel : Service 100% gratuit**

Taawidaty est actuellement financé de manière indépendante et fonctionne sans aucune publicité.

**Notre engagement d'indépendance :**
- Aucune affiliation avec des compagnies d'assurance
- Aucun partenariat avec des laboratoires pharmaceutiques
- Aucune commission sur les ventes de médicaments
- Aucune influence commerciale sur nos informations

**Futur modèle de financement :**
Pour assurer la pérennité du service, nous pourrions à l'avenir :
- Afficher des publicités non intrusives (si approuvé par Google AdSense)
- Les publicités ne modifieront JAMAIS nos informations
- L'indépendance éditoriale sera maintenue
- Le service restera toujours gratuit pour les utilisateurs

**Transparence financière :**
- Aucune donnée utilisateur n'est vendue
- Aucun accès privilégié payant
- Les mises à jour restent gratuites
- Pas de fonctionnalités premium payantes`
        },
        {
          title: 'Notre Impact',
          icon: 'award',
          content: `**Depuis notre lancement en 2025 :**

📊 **Utilisation**
- Des milliers de recherches de médicaments effectuées
- Utilisateurs des 12 régions du Maroc
- Disponible 24h/24, 7j/7

💰 **Économies réalisées**
- Aide à la planification budgétaire
- Évite les surprises à la pharmacie
- Permet la comparaison entre médicaments similaires

📱 **Accessibilité**
- Fonctionne sur ordinateur, tablette et mobile
- Interface adaptée aux écrans tactiles
- Temps de chargement rapide

🌍 **Portée**
- Service disponible partout au Maroc
- Accessible depuis l'étranger (pour les Marocains)
- Pas d'application à télécharger nécessaire`
        },
        {
          title: 'Nos Engagements Qualité',
          icon: 'checkCircle',
          content: `**1. Exactitude des informations**
✓ Vérification systématique des sources officielles
✓ Mise à jour régulière de la base de données
✓ Documentation de toutes les modifications
✓ Correction rapide des erreurs signalées

**2. Protection de la vie privée**
✓ Aucune collecte de données personnelles de santé
✓ Recherches totalement anonymes
✓ Conformité RGPD et loi marocaine 09-08
✓ Pas de tracking publicitaire

**3. Accessibilité technique**
✓ Compatible avec tous les navigateurs modernes
✓ Design responsive (mobile-first)
✓ Temps de chargement optimisés
✓ Disponibilité 99.9%

**4. Support utilisateur**
✓ Interface intuitive et facile à utiliser
✓ Instructions claires en FR et AR
✓ FAQ détaillées
✓ Contact disponible pour questions

**5. Amélioration continue**
✓ Écoute des retours utilisateurs
✓ Ajout régulier de fonctionnalités
✓ Optimisation constante de l'expérience
✓ Tests réguliers de qualité`
        },
        {
          title: 'Nos Limites et Avertissements',
          icon: 'shield',
          content: `**Important : Ce que nous NE sommes PAS**

❌ **Pas un conseil médical**
Nous ne recommandons pas de médicaments ni de traitements.

❌ **Pas une pharmacie**
Nous ne vendons pas de médicaments.

❌ **Pas une garantie de remboursement**
Les montants affichés sont indicatifs. Vérifiez toujours avec votre assurance.

❌ **Pas un diagnostic**
Consultez toujours un professionnel de santé.

**Nos recommandations :**
✓ Consultez votre médecin pour toute question médicale
✓ Vérifiez les montants avec votre pharmacien
✓ Confirmez avec votre assurance (CNOPS/CNSS) pour les montants exacts
✓ Lisez toujours la notice du médicament
✓ Respectez les prescriptions médicales`
        },
        {
          title: 'Contact et Support',
          content: `**Pour toute question, suggestion ou signalement d'erreur :**

📧 **Email général**
contact@taawidaty.ma

🔒 **Questions sur la vie privée**
admin@taawidaty.ma

⚖️ **Questions juridiques**
contact@taawidaty.ma

💡 **Suggestions d'amélioration**
contact@taawidaty.ma

🐛 **Signaler une erreur**
admin@taawidaty.ma

**Délais de réponse :**
- Erreurs critiques : 24-48 heures
- Questions générales : 3-5 jours ouvrables
- Suggestions : Prises en compte pour futures mises à jour

**Nous ne répondons PAS aux :**
- Questions médicales personnelles (consultez un médecin)
- Demandes de diagnostic
- Recommandations de traitement
- Vente de médicaments`
        },
        {
          title: 'Conformité et Réglementation',
          content: `**Taawidaty est conforme à :**

🇲🇦 **Réglementation marocaine**
- Loi n° 09-08 sur la protection des données personnelles
- Réglementation du Ministère de la Santé
- Directives de la CNDP

🇪🇺 **Standards internationaux**
- RGPD (Règlement Général sur la Protection des Données)
- Normes d'accessibilité web (WCAG)
- Bonnes pratiques SEO

⚖️ **Juridiction**
- Droit applicable : Loi marocaine
- Tribunaux compétents : Rabat, Maroc

📋 **Licences et propriété intellectuelle**
- Code source : Licence MIT (open source)
- Nom "Taawidaty" : Marque protégée
- Données : Dérivées de sources publiques officielles
- Contenu : © 2025 Taawidaty`
        },
        {
          title: 'Feuille de Route',
          content: `**Améliorations prévues en 2025 :**

**Q1 2025 ✓**
- Lancement de la version 2.0
- Interface bilingue FR/AR
- Base de 4,678 médicaments

**Q2 2025 (en cours)**
- Section blog éducatif
- Guides CNOPS et CNSS détaillés
- Amélioration de la recherche
- Mode sombre

**Q3-Q4 2025 (planifié)**
- Comparateur de médicaments similaires
- Historique de recherches (local)
- Notifications de changements de taux
- Application mobile (PWA)
- API pour développeurs
- Calculateur de traitement complet

**2026 et au-delà**
- Intelligence artificielle pour suggestions
- Intégration avec pharmacies partenaires
- Rappels de prise de médicaments
- Expansion vers d'autres pays du Maghreb

Vos suggestions sont les bienvenues pour orienter nos développements futurs !`
        }
      ],
      footer: `Taawidaty (تعويضاتي) - Votre calculateur de remboursement de confiance au Maroc.

Fait avec ❤️ pour faciliter l'accès aux soins de santé.

© 2025 Taawidaty - Tous droits réservés
Code source disponible sous licence MIT`
    },
    ar: {
      title: 'من نحن',
      subtitle: 'حليفك لفهم تعويضات الأدوية في المغرب',
      lastUpdated: 'آخر تحديث: 4 نوفمبر 2025',
      intro: 'تعويضاتي هي حاسبة تعويضات الأدوية مصممة لمساعدة المواطنين المغاربة على تقدير تكاليف أدويتهم في إطار أنظمة التأمين CNOPS و CNSS.',
      sections: [
        {
          title: 'مهمتنا',
          icon: 'target',
          content: `**جعل معلومات تعويضات الأدوية متاحة ومفهومة لجميع المغاربة.**

نؤمن بأن لكل مريض الحق في:
- فهم التكلفة الحقيقية لعلاجه
- معرفة مبلغ التعويض من تأمينه مسبقاً
- التخطيط لميزانية صحته بشفافية
- الوصول بسهولة إلى معلومات الأدوية

حاسبتنا المجانية وسهلة الاستخدام تمكن آلاف المغاربة من اتخاذ قرارات مستنيرة بشأن علاجاتهم الطبية.`
        },
        {
          title: 'قصتنا',
          icon: 'heart',
          content: `ولدت تعويضاتي من تجربة شخصية. عند محاولتي فهم كم سأُعوَّض عن أدويتي، أدركت أن هذه المعلومات لم تكن متاحة بسهولة.

**المشكلة:**
- كانت معلومات التعويض مبعثرة
- كانت الحسابات معقدة وغير واضحة
- لا توجد أداة بسيطة لتقدير التكاليف الحقيقية
- يكتشف المرضى المبالغ فقط في الصيدلية

**حلنا:**
إنشاء حاسبة شفافة ومجانية ومتاحة:
- تركز بيانات CNOPS و CNSS
- تحسب التعويضات فوراً
- تعمل بالفرنسية والعربية
- يمكن الوصول إليها على جميع الأجهزة

أُطلقت في 2025، تعويضاتي تساعد بالفعل آلاف المستخدمين شهرياً على فهم حقوقهم في التعويض بشكل أفضل.`
        },
        {
          title: 'قيمنا',
          icon: 'shield',
          content: `**1. الشفافية**
جميع معلوماتنا مبنية على مصادر رسمية عامة. لا نخفي شيئاً ونشرح حساباتنا بوضوح.

**2. إمكانية الوصول**
خدمتنا مجانية 100% وستبقى كذلك دائماً. لا اشتراكات، لا رسوم مخفية.

**3. الدقة**
نحدث قاعدة بياناتنا بانتظام بأحدث معدلات التعويض الرسمية.

**4. احترام الخصوصية**
لا نجمع معلومات شخصية. عمليات بحثك مجهولة المصدر.

**5. الاستقلالية**
لسنا تابعين لأي شركة تأمين أو صيدلية أو مختبر صيدلاني.

**6. التعليم**
بالإضافة إلى الحساب، نوفر معلومات لمساعدة المرضى على فهم نظام الصحة المغربي.`
        },
        {
          title: 'فريقنا',
          icon: 'users',
          content: `**بنطلبة زكرياء - المؤسس والمطور**
مهندس معلوميات شغوف باستخدام التكنولوجيا لحل المشاكل الملموسة التي تؤثر على الحياة اليومية للمغاربة.

**التخصص:**
- تطوير تطبيقات الويب
- تحليل ومعالجة البيانات
- تصميم واجهات المستخدم سهلة الوصول

**التكوين:**
- هندسة المعلوميات
- تطوير الويب الكامل
- علوم البيانات

**الاتصال المهني:**
البريد الإلكتروني: bentalba@taawidaty.ma
LinkedIn: [قريباً]

**التزامنا:**
كمؤسس، ألتزم شخصياً بالحفاظ على جودة ودقة المعلومات المقدمة. يتم التحقق من كل تحديث مقابل المصادر الرسمية.`
        },
        {
          title: 'مصادر بياناتنا',
          icon: 'checkCircle',
          content: `جميع معلوماتنا تأتي من مصادر رسمية وعامة:

**1. قاعدة البيانات الرسمية للأدوية في المغرب**
- وزارة الصحة بالمملكة المغربية
- القائمة الوطنية للأدوية المرخصة
- الأسعار العامة للبيع (PPV) الرسمية

**2. معدلات تعويض CNOPS**
- الموقع الرسمي: https://www.cnops.org.ma
- نشرات التعويض الرسمية
- التحديثات التنظيمية

**3. معدلات تعويض CNSS**
- الموقع الرسمي: https://www.cnss.ma
- الوثائق الرسمية AMO
- التعاميم والقرارات

**4. المعلومات الصيدلانية**
- الوكالة الوطنية للتأمين الصحي (ANAM)
- قواعد البيانات الصيدلانية المعترف بها
- المنشورات الرسمية للقطاع

**منهجية التحديث:**
- التحقق الفصلي من معدلات التعويض
- التحديث الفوري في حالة التغيير التنظيمي
- التحقق المتقاطع من مصادر متعددة
- توثيق جميع المصادر المستخدمة`
        },
        {
          title: 'كيف يعمل',
          icon: 'award',
          content: `**1. قاعدة بيانات كاملة**
نحتفظ بقاعدة بيانات من 4,678 دواء مع:
- أسعار البيع العامة (PPV)
- معدلات تعويض CNOPS
- معدلات تعويض CNSS
- معلومات صيدلانية

**2. الحساب في الوقت الفعلي**
عند البحث عن دواء:
- يحدد النظام الدواء في قاعدة بياناتنا
- يطبق معدل تعويض تأمينك
- يحسب المبلغ المعوض وحصتك
- يعرض النتائج فوراً

**3. الدقة المضمونة**
- تتبع الحسابات الصيغ الرسمية
- يتم تحديث المعدلات بانتظام
- تعكس الأسعار البيانات الرسمية
- يتم تقريب النتائج وفقاً للقواعد الرسمية

**4. إمكانية الوصول متعددة اللغات**
- واجهة بالفرنسية والعربية
- دعم كامل RTL للعربية
- تكييف ثقافي للمحتوى
- إمكانية الوصول للجميع`
        },
        {
          title: 'التمويل والاستقلالية',
          icon: 'shield',
          content: `**النموذج الحالي: خدمة مجانية 100%**

تعويضاتي ممولة حالياً بشكل مستقل وتعمل دون أي إعلانات.

**التزامنا بالاستقلالية:**
- لا انتساب لشركات التأمين
- لا شراكة مع المختبرات الصيدلانية
- لا عمولة على مبيعات الأدوية
- لا تأثير تجاري على معلوماتنا

**نموذج التمويل المستقبلي:**
لضمان استمرارية الخدمة، قد نقوم مستقبلاً بـ:
- عرض إعلانات غير مزعجة (إذا تمت الموافقة من Google AdSense)
- الإعلانات لن تغير أبداً معلوماتنا
- سيتم الحفاظ على الاستقلالية التحريرية
- ستبقى الخدمة دائماً مجانية للمستخدمين

**الشفافية المالية:**
- لا يتم بيع بيانات المستخدمين
- لا وصول مميز مدفوع
- التحديثات تبقى مجانية
- لا ميزات متميزة مدفوعة`
        },
        {
          title: 'تأثيرنا',
          icon: 'award',
          content: `**منذ إطلاقنا في 2025:**

📊 **الاستخدام**
- آلاف عمليات البحث عن الأدوية
- مستخدمون من 12 منطقة بالمغرب
- متاح 24/24، 7/7

💰 **الوفورات المحققة**
- مساعدة في التخطيط المالي
- تجنب المفاجآت في الصيدلية
- السماح بالمقارنة بين الأدوية المشابهة

📱 **إمكانية الوصول**
- يعمل على الكمبيوتر والجهاز اللوحي والهاتف
- واجهة مكيفة للشاشات التي تعمل باللمس
- وقت تحميل سريع

🌍 **النطاق**
- الخدمة متاحة في جميع أنحاء المغرب
- يمكن الوصول إليها من الخارج (للمغاربة)
- لا حاجة لتطبيق للتحميل`
        },
        {
          title: 'التزاماتنا بالجودة',
          icon: 'checkCircle',
          content: `**1. دقة المعلومات**
✓ التحقق المنهجي من المصادر الرسمية
✓ تحديث منتظم لقاعدة البيانات
✓ توثيق جميع التعديلات
✓ تصحيح سريع للأخطاء المبلغ عنها

**2. حماية الخصوصية**
✓ عدم جمع بيانات صحية شخصية
✓ عمليات بحث مجهولة تماماً
✓ الامتثال لـ RGPD والقانون المغربي 09-08
✓ لا تتبع إعلاني

**3. إمكانية الوصول التقني**
✓ متوافق مع جميع المتصفحات الحديثة
✓ تصميم متجاوب (الهاتف أولاً)
✓ أوقات تحميل محسنة
✓ توفر 99.9%

**4. دعم المستخدم**
✓ واجهة بديهية وسهلة الاستخدام
✓ تعليمات واضحة بالفرنسية والعربية
✓ أسئلة شائعة مفصلة
✓ اتصال متاح للأسئلة

**5. التحسين المستمر**
✓ الاستماع لملاحظات المستخدمين
✓ إضافة منتظمة للميزات
✓ تحسين مستمر للتجربة
✓ اختبارات جودة منتظمة`
        },
        {
          title: 'حدودنا وتحذيراتنا',
          icon: 'shield',
          content: `**مهم: ما نحن لسنا**

❌ **لسنا نصيحة طبية**
لا نوصي بالأدوية أو العلاجات.

❌ **لسنا صيدلية**
لا نبيع الأدوية.

❌ **لسنا ضماناً للتعويض**
المبالغ المعروضة إرشادية. تحقق دائماً مع تأمينك.

❌ **لسنا تشخيصاً**
استشر دائماً مهنياً صحياً.

**توصياتنا:**
✓ استشر طبيبك لأي سؤال طبي
✓ تحقق من المبالغ مع صيدليك
✓ أكد مع تأمينك (CNOPS/CNSS) للمبالغ الدقيقة
✓ اقرأ دائماً نشرة الدواء
✓ احترم الوصفات الطبية`
        },
        {
          title: 'الاتصال والدعم',
          content: `**لأي سؤال أو اقتراح أو الإبلاغ عن خطأ:**

📧 **البريد الإلكتروني العام**
contact@taawidaty.ma

🔒 **أسئلة حول الخصوصية**
admin@taawidaty.ma

⚖️ **أسئلة قانونية**
contact@taawidaty.ma

💡 **اقتراحات للتحسين**
contact@taawidaty.ma

🐛 **الإبلاغ عن خطأ**
admin@taawidaty.ma

**مواعيد الرد:**
- أخطاء حرجة: 24-48 ساعة
- أسئلة عامة: 3-5 أيام عمل
- اقتراحات: تُؤخذ في الاعتبار للتحديثات المستقبلية

**نحن لا نجيب على:**
- أسئلة طبية شخصية (استشر طبيباً)
- طلبات التشخيص
- توصيات العلاج
- بيع الأدوية`
        },
        {
          title: 'الامتثال والتنظيم',
          content: `**تعويضاتي متوافقة مع:**

🇲🇦 **التنظيم المغربي**
- القانون رقم 09-08 بشأن حماية البيانات الشخصية
- تنظيمات وزارة الصحة
- توجيهات CNDP

🇪🇺 **المعايير الدولية**
- RGPD (اللائحة العامة لحماية البيانات)
- معايير إمكانية الوصول للويب (WCAG)
- أفضل ممارسات SEO

⚖️ **الاختصاص القضائي**
- القانون المطبق: القانون المغربي
- المحاكم المختصة: الرباط، المغرب

📋 **التراخيص والملكية الفكرية**
- الكود المصدري: ترخيص MIT (مفتوح المصدر)
- اسم "تعويضاتي": علامة محمية
- البيانات: مشتقة من مصادر رسمية عامة
- المحتوى: © 2025 بنطلبة زكرياء`
        },
        {
          title: 'خارطة الطريق',
          content: `**التحسينات المخططة في 2025:**

**الربع الأول 2025 ✓**
- إطلاق الإصدار 2.0
- واجهة ثنائية اللغة FR/AR
- قاعدة 4,678 دواء

**الربع الثاني 2025 (جارٍ)**
- قسم مدونة تعليمية
- أدلة CNOPS و CNSS مفصلة
- تحسين البحث
- الوضع الداكن

**الربع الثالث-الرابع 2025 (مخطط)**
- مقارن للأدوية المشابهة
- سجل البحث (محلي)
- إشعارات بتغييرات المعدلات
- تطبيق الهاتف (PWA)
- API للمطورين
- حاسبة علاج كاملة

**2026 وما بعد**
- الذكاء الاصطناعي للاقتراحات
- التكامل مع الصيدليات الشريكة
- تذكيرات بتناول الأدوية
- التوسع إلى دول المغرب العربي الأخرى

اقتراحاتك موضع ترحيب لتوجيه تطوراتنا المستقبلية!`
        }
      ],
      footer: `تعويضاتي - حاسبة التعويضات الموثوقة في المغرب.

صُنع بـ ❤️ لتسهيل الوصول إلى الرعاية الصحية.

© 2025 بنطلبة زكرياء - جميع الحقوق محفوظة على العلامة "تعويضاتي"
الكود المصدري متاح بموجب ترخيص MIT`
    }
  };

  const current = content[language];
  const pageUrl = 'https://taawidaty.ma/about-us';
  const metaDescription = language === 'ar'
    ? 'تعرف على فريق تعويضاتي ورسالتنا في تبسيط تعويضات الأدوية CNSS وCNOPS للمواطنين المغاربة.'
    : 'Découvrez l\'histoire de Taawidaty, notre mission et notre équipe qui simplifie les remboursements CNSS et CNOPS pour tous les Marocains.';
  const metaKeywords = language === 'ar'
    ? [
      'منصة تعويضاتي',
      'فريق Taawidaty',
      'حول تعويضاتي',
      'تعويض الأدوية المغرب',
      'CNSS CNOPS معلومات'
    ]
    : [
      'taawidaty equipe',
      'a propos taawidaty',
      'calculateur remboursement maroc',
      'mission taawidaty',
      'cnss cnops informations'
    ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: language === 'ar' ? 'حول تعويضاتي' : 'À propos de Taawidaty',
      description: metaDescription,
      url: pageUrl,
      inLanguage: language,
      mainEntity: {
        '@type': 'Organization',
        name: 'Taawidaty',
        url: 'https://taawidaty.ma',
        sameAs: ['https://www.linkedin.com/company/taawidaty']
      }
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target': return <Target className="w-6 h-6" />;
      case 'heart': return <Heart className="w-6 h-6" />;
      case 'shield': return <Shield className="w-6 h-6" />;
      case 'users': return <Users className="w-6 h-6" />;
      case 'award': return <Award className="w-6 h-6" />;
      case 'checkCircle': return <CheckCircle className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
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
            <p className="text-lg text-muted-foreground mt-2">
              {current.subtitle}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {current.lastUpdated}
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Intro */}
          <div className="bg-gradient-to-r from-primary-100 to-amber-100 dark:from-primary-950 dark:to-amber-950 rounded-lg p-8 mb-8">
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
                    <div className="p-3 bg-primary-100 dark:bg-primary-950 rounded-lg text-primary-700 dark:text-primary flex-shrink-0">
                      {getIcon(section.icon)}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-primary-700 dark:text-primary">
                    {section.title}
                  </h2>
                </div>
                <FormattedContent className="text-foreground leading-relaxed">
                  {section.content}
                </FormattedContent>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary-600 to-amber-600 text-white rounded-lg text-center">
            <p className="text-lg leading-relaxed whitespace-pre-line font-medium">
              {current.footer}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
