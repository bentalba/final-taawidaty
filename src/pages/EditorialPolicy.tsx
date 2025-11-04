/**
 * Editorial Policy Page - Taawidaty
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

export default function EditorialPolicy() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const content = {
    fr: {
      title: 'Politique Éditoriale',
      subtitle: 'Taawidaty.ma',
      lastUpdated: 'Dernière mise à jour : 4 novembre 2025',
      backButton: 'Retour à l\'accueil',
      content: `# Politique Éditoriale - Taawidaty.ma

**Dernière mise à jour : 4 novembre 2025**

## Avis Important et Limitation de Responsabilité

**TAAWIDATY.MA EST UN SERVICE D'INFORMATION DE BASE. NOUS NE SOMMES PAS DES PROFESSIONNELS DE SANTÉ ET NE FOURNISSONS AUCUN CONSEIL MÉDICAL.**

Cette politique éditoriale décrit nos efforts de bonne foi pour maintenir un contenu de qualité, mais **nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité des informations publiées sur ce site**. Les utilisateurs utilisent ce site à leurs propres risques.

## 1. Nature du Service

### 1.1 Ce Que Nous Sommes

Taawidaty.ma est une **base de données informative** qui compile des informations publiquement disponibles sur les médicaments commercialisés au Maroc. Nous sommes :

- Un agrégateur d'informations pharmaceutiques publiques
- Une plateforme éducative pour la sensibilisation générale
- Un outil de référence rapide (non exhaustif)
- Un projet indépendant sans affiliation pharmaceutique

### 1.2 Ce Que Nous NE Sommes PAS

Nous ne sommes PAS :

- ❌ Des professionnels de santé licenciés
- ❌ Une source de conseils médicaux
- ❌ Un substitut à la consultation médicale
- ❌ Responsables des décisions prises sur la base de notre contenu
- ❌ Une pharmacie ou un fournisseur de médicaments
- ❌ Affiliés à des compagnies pharmaceutiques
- ❌ Supervisés par des autorités médicales

### 1.3 Notre Objectif

Nous faisons de notre mieux pour :

- Compiler des informations de base sur les médicaments au Maroc
- Rendre ces informations accessibles au public
- Citer nos sources quand possible
- Corriger les erreurs portées à notre attention
- Maintenir le site à jour dans la mesure de nos capacités

**Mais nous ne garantissons rien.**

## 2. Limitation de Responsabilité Éditoriale

### 2.1 Absence de Garantie

**NOUS NE GARANTISSONS PAS** :

- ✗ L'exactitude des informations publiées
- ✗ L'exhaustivité de notre base de données
- ✗ Que les informations sont à jour
- ✗ L'absence d'erreurs ou d'omissions
- ✗ Que le contenu convient à votre situation
- ✗ La disponibilité continue du service

### 2.2 Sources d'Erreurs Possibles

Les informations sur ce site peuvent contenir des erreurs dues à :

- Données source incorrectes ou obsolètes
- Erreurs de transcription ou de traduction
- Changements réglementaires non mis à jour
- Limitations de nos ressources
- Erreurs humaines dans la saisie des données
- Informations contradictoires entre sources
- Retards dans les mises à jour

### 2.3 Obligation de Vérification

**IL EST DE VOTRE RESPONSABILITÉ** de :

✓ Vérifier toute information avec votre médecin ou pharmacien  
✓ Lire la notice officielle du médicament  
✓ Consulter un professionnel de santé avant toute décision  
✓ Ne jamais vous fier uniquement à notre site  
✓ Signaler les erreurs que vous identifiez  

## 3. Sources de Contenu

### 3.1 D'où Viennent Nos Informations

Nous compilons des informations provenant de :

**Sources Publiques** :
- Ministère de la Santé du Maroc (site web public)
- Notices officielles des médicaments (quand disponibles)
- Bases de données pharmaceutiques publiques
- Sites web d'organisations de santé reconnues (OMS, FDA, EMA)
- Littérature médicale accessible publiquement

**Méthode de Compilation** :
- Collecte manuelle d'informations
- Agrégation de données publiques
- Traduction et adaptation quand nécessaire
- Mise en forme pour la lisibilité

### 3.2 Ce Que Nous NE Faisons PAS

Nous ne faisons PAS :

- ❌ De recherche médicale originale
- ❌ De vérification clinique des informations
- ❌ D'essais ou de tests de médicaments
- ❌ D'analyse pharmacologique approfondie
- ❌ De révision par des professionnels de santé (sauf indication contraire)

### 3.3 Citations et Références

Nous nous efforçons de :

- Citer nos sources principales quand possible
- Indiquer la date de dernière mise à jour
- Mentionner les sources officielles utilisées

Mais nous reconnaissons que :

- Certaines informations peuvent manquer de citation précise
- Les sources peuvent ne pas toujours être vérifiables
- Nous ne pouvons garantir l'exactitude des sources elles-mêmes

## 4. Processus de Création et Mise à Jour

### 4.1 Comment Nous Créons le Contenu

**Processus de Base** :

1. **Collecte d'Informations**
   - Recherche de sources publiques sur le médicament
   - Compilation des données disponibles
   - Organisation des informations par catégorie

2. **Rédaction**
   - Mise en forme du contenu en langage accessible
   - Structuration des informations
   - Ajout de contexte quand nécessaire

3. **Publication**
   - Vérification de base (orthographe, formatage)
   - Publication sur la plateforme
   - Indexation dans la base de données

**C'est tout.** Nous n'avons pas de processus de révision médicale sophistiqué.

### 4.2 Fréquence de Mise à Jour

**Nous mettons à jour quand nous pouvons** :

- Lorsque nous découvrons des erreurs
- Lorsque des utilisateurs signalent des problèmes
- Lorsque nous avons le temps et les ressources
- Lorsque nous prenons connaissance de changements importants

**Nous ne garantissons PAS** :

- ✗ Des mises à jour régulières ou programmées
- ✗ Que le contenu reflète les derniers changements
- ✗ Une surveillance active des alertes de sécurité
- ✗ Des révisions périodiques systématiques

### 4.3 Correction des Erreurs

Si vous identifiez une erreur :

1. Contactez-nous via le formulaire de contact
2. Fournissez des détails précis sur l'erreur
3. Indiquez la source correcte si possible

Nous ferons de notre mieux pour :
- Examiner votre signalement
- Corriger l'erreur si elle est vérifiable
- Mettre à jour le contenu dans un délai raisonnable

**Mais nous ne garantissons pas** :
- Un délai de réponse spécifique
- Que toutes les corrections seront effectuées
- Que nous contacterons le signaleur

## 5. Normes de Contenu (Effort de Bonne Foi)

### 5.1 Ce Que Nous Essayons de Faire

Dans la mesure de nos capacités, nous nous efforçons de :

**Clarté** :
- Utiliser un langage simple et accessible
- Définir les termes techniques quand possible
- Organiser l'information logiquement

**Objectivité** :
- Présenter les informations sans parti pris commercial
- Éviter les recommandations spécifiques
- Ne pas promouvoir de produits particuliers

**Sécurité** :
- Inclure des avertissements de sécurité quand approprié
- Rappeler l'importance de la consultation médicale
- Ne pas encourager l'automédication dangereuse

**Respect** :
- Respecter les sensibilités culturelles marocaines
- Communiquer avec empathie
- Éviter le langage alarmiste

### 5.2 Limitations Reconnues

Nous reconnaissons que notre contenu peut :

- Manquer de profondeur clinique
- Contenir des simplifications excessives
- Omettre des informations importantes
- Ne pas couvrir tous les cas particuliers
- Être incomplet ou superficiel

**C'est pourquoi vous devez toujours consulter un professionnel de santé.**

## 6. Types de Contenu

### 6.1 Fiches de Médicaments

Nous fournissons des informations de base sur :

- Nom du médicament (commercial et générique)
- Indication principale (à quoi il sert)
- Forme pharmaceutique et dosage
- Informations de prix et disponibilité au Maroc
- Avertissements généraux de sécurité
- Autres informations disponibles publiquement

**Nous ne fournissons PAS** :
- Des recommandations de dosage personnalisées
- Des conseils sur la durée du traitement
- Des analyses d'interactions médicamenteuses complètes
- Des contre-indications exhaustives

### 6.2 Articles Éducatifs

Nous publions occasionnellement des articles sur :

- Utilisation générale des médicaments
- Classes thérapeutiques
- Santé et bien-être général
- Navigation dans le système de santé marocain

**Ces articles sont** :
- Informatifs et généraux
- Non personnalisés
- Non exhaustifs
- Sujets aux limitations décrites ci-dessus

### 6.3 Ce Que Nous NE Publions Jamais

Nous ne publions PAS :

- ❌ Conseils médicaux personnalisés
- ❌ Diagnostics ou recommandations de traitement
- ❌ Informations encourageant l'automédication dangereuse
- ❌ Contenu promotionnel pour des médicaments spécifiques
- ❌ Affirmations médicales non étayées

## 7. Indépendance et Conflits d'Intérêts

### 7.1 Indépendance Éditoriale

Notre contenu est créé de manière indépendante. Nous ne sommes pas :

- Financés par des compagnies pharmaceutiques
- Affiliés à des fabricants de médicaments
- Influencés par des intérêts commerciaux dans nos descriptions

### 7.2 Publicité (Future)

À l'avenir, nous pourrons afficher de la publicité (Google AdSense ou similaire).

**Si nous affichons des publicités** :
- Elles seront clairement identifiées comme "Publicité"
- Elles n'influenceront PAS notre contenu éditorial
- Nous maintiendrons l'indépendance entre contenu et publicité

### 7.3 Aucune Relation Commerciale

Nous ne recevons PAS :

- De paiements de compagnies pharmaceutiques
- De commissions sur les ventes de médicaments
- D'avantages financiers pour mentionner des produits spécifiques

## 8. Droits d'Auteur et Sources

### 8.1 Contenu Original

Le contenu que nous créons (textes, organisation, présentation) est notre propriété intellectuelle.

### 8.2 Informations Publiques

Une grande partie de nos informations provient de :

- Sources publiques et gouvernementales
- Bases de données pharmaceutiques accessibles
- Notices et monographies officielles

Nous utilisons ces informations conformément à leur disponibilité publique.

### 8.3 Citation Respectueuse

Nous nous efforçons de :

- Citer nos sources principales
- Respecter les droits d'auteur
- Utiliser les informations de manière appropriée

## 9. Votre Responsabilité en Tant qu'Utilisateur

### 9.1 Utilisation Responsable

En utilisant Taawidaty.ma, vous acceptez de :

✓ **Consulter un professionnel de santé** pour toute question médicale  
✓ **Vérifier les informations** avec des sources officielles  
✓ **Lire les notices officielles** des médicaments  
✓ **Ne pas vous auto-médiquer** sur la base de notre site seul  
✓ **Signaler les erreurs** que vous identifiez  
✓ **Utiliser le site avec discernement**  

### 9.2 Ce Que Vous NE Devez PAS Faire

Vous ne devez PAS :

- ❌ Prendre des décisions médicales basées uniquement sur notre site
- ❌ Ignorer les conseils de votre médecin ou pharmacien
- ❌ Modifier votre traitement sans consultation médicale
- ❌ Traiter notre site comme une source médicale autoritaire
- ❌ Vous fier exclusivement à nos informations

## 10. Contact et Signalement d'Erreurs

### 10.1 Nous Contacter

Pour signaler des erreurs ou poser des questions :

**Email** : contact@taawidaty.ma  
**Site Web** : https://www.taawidaty.ma/contact-us

### 10.2 Ce Que Nous Pouvons Faire

Nous ferons de notre mieux pour :

- Lire vos messages
- Examiner les erreurs signalées
- Corriger les informations vérifiablement incorrectes
- Répondre dans un délai raisonnable

### 10.3 Ce Que Nous NE Pouvons PAS Faire

Nous ne pouvons PAS :

- ❌ Fournir des conseils médicaux personnalisés
- ❌ Répondre à des questions sur votre traitement
- ❌ Recommander des médicaments
- ❌ Interpréter vos symptômes
- ❌ Garantir une réponse immédiate

**Pour toute question médicale, contactez un professionnel de santé.**

## 11. Modifications de Cette Politique

### 11.1 Changements

Nous nous réservons le droit de modifier cette Politique Éditoriale à tout moment.

Les modifications seront :
- Publiées sur cette page
- Indiquées par une nouvelle "Date de Mise à Jour"

### 11.2 Votre Accord Continu

Votre utilisation continue du site après les modifications constitue votre acceptation de la nouvelle politique.

## 12. Résumé - À Retenir

**EN BREF** :

1. ✓ Nous compilons des informations publiques sur les médicaments au Maroc
2. ✓ Nous faisons de notre mieux pour maintenir un contenu de qualité
3. ✓ **MAIS NOUS NE GARANTISSONS RIEN**
4. ✓ **VOUS DEVEZ TOUJOURS CONSULTER UN PROFESSIONNEL DE SANTÉ**
5. ✓ Utilisez notre site comme référence générale uniquement
6. ✓ Vérifiez toujours les informations avec des sources officielles
7. ✓ Nous déclinons toute responsabilité

---

**AVERTISSEMENT FINAL**

LES INFORMATIONS SUR TAAWIDATY.MA SONT FOURNIES "TELLES QUELLES" SANS GARANTIE D'AUCUNE SORTE. NOUS FAISONS DES EFFORTS DE BONNE FOI POUR MAINTENIR UN CONTENU DE QUALITÉ, MAIS NOUS NE SOMMES PAS RESPONSABLES DES ERREURS, OMISSIONS, OU CONSÉQUENCES DE L'UTILISATION DE CE SITE.

**CONSULTEZ TOUJOURS UN PROFESSIONNEL DE SANTÉ QUALIFIÉ POUR TOUTE QUESTION MÉDICALE.**

---

**Date de dernière mise à jour : 4 novembre 2025**`
    },
    ar: {
      title: 'السياسة التحريرية',
      subtitle: 'Taawidaty.ma',
      lastUpdated: 'آخر تحديث: 4 نوفمبر 2025',
      backButton: 'العودة إلى الصفحة الرئيسية',
      content: `# السياسة التحريرية - Taawidaty.ma

**آخر تحديث: 4 نوفمبر 2025**

## إشعار مهم وتحديد المسؤولية

**TAAWIDATY.MA هي خدمة معلومات أساسية. نحن لسنا متخصصين في الرعاية الصحية ولا نقدم أي نصيحة طبية.**

تصف هذه السياسة التحريرية جهودنا بحسن نية للحفاظ على محتوى عالي الجودة، لكن **نحن لا نضمن دقة أو اكتمال أو حداثة المعلومات المنشورة على هذا الموقع**. يستخدم المستخدمون هذا الموقع على مسؤوليتهم الخاصة.

## 1. طبيعة الخدمة

### 1.1 ما نحن عليه

Taawidaty.ma هي **قاعدة بيانات معلوماتية** تجمع المعلومات المتاحة للجمهور حول الأدوية المتاحة تجارياً في المغرب. نحن:

- مجمع لمعلومات الأدوية العامة
- منصة تعليمية للتوعية العامة
- أداة مرجعية سريعة (غير شاملة)
- مشروع مستقل بدون انتماء صيدلاني

### 1.2 ما لسنا عليه

نحن لسنا:

- ❌ متخصصين رعاية صحية مرخصين
- ❌ مصدراً للمشورة الطبية
- ❌ بديلاً عن الاستشارة الطبية
- ❌ مسؤولين عن القرارات المتخذة بناءً على محتوانا
- ❌ صيدلية أو مورد أدوية
- ❌ تابعين لشركات الأدوية
- ❌ خاضعين لإشراف السلطات الطبية

### 1.3 هدفنا

نبذل قصارى جهدنا من أجل:

- جمع معلومات أساسية حول الأدوية في المغرب
- جعل هذه المعلومات متاحة للجمهور
- الاستشهاد بمصادرنا عندما يكون ذلك ممكناً
- تصحيح الأخطاء التي يتم لفت انتباهنا إليها
- الحفاظ على تحديث الموقع ضمن قدراتنا

**لكننا لا نضمن شيئاً.**

## 2. تحديد المسؤولية التحريرية

### 2.1 عدم الضمان

**نحن لا نضمن**:

- ✗ دقة المعلومات المنشورة
- ✗ اكتمال قاعدة البيانات الخاصة بنا
- ✗ أن المعلومات محدثة
- ✗ عدم وجود أخطاء أو سهو
- ✗ أن المحتوى مناسب لحالتك
- ✗ استمرار توفر الخدمة

### 2.2 مصادر الأخطاء المحتملة

قد تحتوي المعلومات على هذا الموقع على أخطاء بسبب:

- بيانات مصدرية غير صحيحة أو قديمة
- أخطاء في النسخ أو الترجمة
- تغييرات تنظيمية لم يتم تحديثها
- قيود مواردنا
- أخطاء بشرية في إدخال البيانات
- معلومات متناقضة بين المصادر
- تأخيرات في التحديثات

### 2.3 التزام التحقق

**من مسؤوليتك**:

✓ التحقق من أي معلومات مع طبيبك أو صيدليك  
✓ قراءة النشرة الرسمية للدواء  
✓ استشارة أخصائي صحي قبل أي قرار  
✓ عدم الاعتماد على موقعنا فقط  
✓ الإبلاغ عن الأخطاء التي تحددها  

## 3. مصادر المحتوى

### 3.1 من أين تأتي معلوماتنا

نجمع المعلومات من:

**المصادر العامة**:
- وزارة الصحة المغربية (الموقع الإلكتروني العام)
- النشرات الرسمية للأدوية (عند توفرها)
- قواعد البيانات الصيدلانية العامة
- مواقع المنظمات الصحية المعترف بها (منظمة الصحة العالمية، إدارة الغذاء والدواء، وكالة الأدوية الأوروبية)
- الأدبيات الطبية المتاحة للجمهور

**طريقة التجميع**:
- جمع يدوي للمعلومات
- تجميع البيانات العامة
- الترجمة والتكييف عند الضرورة
- التنسيق من أجل سهولة القراءة

### 3.2 ما لا نفعله

نحن لا نقوم بـ:

- ❌ البحث الطبي الأصلي
- ❌ التحقق السريري من المعلومات
- ❌ تجارب أو اختبارات الأدوية
- ❌ التحليل الدوائي المتعمق
- ❌ المراجعة من قبل متخصصي الرعاية الصحية (ما لم يُذكر خلاف ذلك)

### 3.3 الاستشهادات والمراجع

نبذل جهداً من أجل:

- الاستشهاد بمصادرنا الرئيسية عندما يكون ذلك ممكناً
- الإشارة إلى تاريخ آخر تحديث
- ذكر المصادر الرسمية المستخدمة

لكننا ندرك أن:

- بعض المعلومات قد تفتقر إلى استشهاد دقيق
- المصادر قد لا تكون دائماً قابلة للتحقق
- لا يمكننا ضمان دقة المصادر نفسها

## 4. عملية الإنشاء والتحديث

### 4.1 كيف ننشئ المحتوى

**العملية الأساسية**:

1. **جمع المعلومات**
   - البحث عن مصادر عامة حول الدواء
   - تجميع البيانات المتاحة
   - تنظيم المعلومات حسب الفئة

2. **الكتابة**
   - تنسيق المحتوى بلغة واضحة
   - هيكلة المعلومات
   - إضافة السياق عند الضرورة

3. **النشر**
   - التحقق الأساسي (الإملاء، التنسيق)
   - النشر على المنصة
   - الفهرسة في قاعدة البيانات

**هذا كل شيء.** ليس لدينا عملية مراجعة طبية متطورة.

### 4.2 تكرار التحديث

**نقوم بالتحديث عندما نستطيع**:

- عندما نكتشف أخطاء
- عندما يبلغ المستخدمون عن مشاكل
- عندما يكون لدينا الوقت والموارد
- عندما نعلم بتغييرات مهمة

**نحن لا نضمن**:

- ✗ تحديثات منتظمة أو مجدولة
- ✗ أن المحتوى يعكس أحدث التغييرات
- ✗ مراقبة نشطة لتنبيهات السلامة
- ✗ مراجعات دورية منهجية

### 4.3 تصحيح الأخطاء

إذا حددت خطأ:

1. اتصل بنا عبر نموذج الاتصال
2. قدم تفاصيل دقيقة حول الخطأ
3. اذكر المصدر الصحيح إن أمكن

سنبذل قصارى جهدنا من أجل:
- فحص تقريرك
- تصحيح الخطأ إذا كان قابلاً للتحقق
- تحديث المحتوى في وقت معقول

**لكننا لا نضمن**:
- وقت استجابة محدد
- أن جميع التصحيحات سيتم إجراؤها
- أننا سنتصل بالمبلغ

## 5. معايير المحتوى (جهد حسن النية)

### 5.1 ما نحاول القيام به

ضمن قدراتنا، نسعى جاهدين من أجل:

**الوضوح**:
- استخدام لغة بسيطة وواضحة
- تعريف المصطلحات التقنية عندما يكون ذلك ممكناً
- تنظيم المعلومات بشكل منطقي

**الموضوعية**:
- تقديم المعلومات دون تحيز تجاري
- تجنب التوصيات المحددة
- عدم الترويج لمنتجات معينة

**السلامة**:
- تضمين تحذيرات السلامة عندما يكون ذلك مناسباً
- التذكير بأهمية الاستشارة الطبية
- عدم تشجيع العلاج الذاتي الخطير

**الاحترام**:
- احترام الحساسيات الثقافية المغربية
- التواصل بتعاطف
- تجنب اللغة المثيرة للقلق

### 5.2 القيود المعترف بها

ندرك أن محتوانا قد:

- يفتقر إلى العمق السريري
- يحتوي على تبسيطات مفرطة
- يغفل معلومات مهمة
- لا يغطي جميع الحالات الخاصة
- يكون غير مكتمل أو سطحي

**هذا هو السبب في أنه يجب عليك دائماً استشارة أخصائي الرعاية الصحية.**

## 6. أنواع المحتوى

### 6.1 صفحات الأدوية

نوفر معلومات أساسية حول:

- اسم الدواء (التجاري والعام)
- الاستطباب الرئيسي (لماذا يُستخدم)
- الشكل الصيدلاني والجرعة
- معلومات السعر والتوفر في المغرب
- تحذيرات السلامة العامة
- معلومات أخرى متاحة للجمهور

**نحن لا نقدم**:
- توصيات جرعات شخصية
- نصائح حول مدة العلاج
- تحليلات كاملة للتفاعلات الدوائية
- موانع استعمال شاملة

### 6.2 المقالات التعليمية

ننشر أحياناً مقالات حول:

- الاستخدام العام للأدوية
- الفئات العلاجية
- الصحة والعافية العامة
- التنقل في نظام الرعاية الصحية المغربي

**هذه المقالات**:
- إعلامية وعامة
- غير مخصصة
- غير شاملة
- خاضعة للقيود المذكورة أعلاه

### 6.3 ما لا ننشره أبداً

نحن لا ننشر:

- ❌ نصائح طبية شخصية
- ❌ تشخيصات أو توصيات علاج
- ❌ معلومات تشجع على العلاج الذاتي الخطير
- ❌ محتوى ترويجي لأدوية محددة
- ❌ ادعاءات طبية غير مدعومة

## 7. الاستقلالية وتضارب المصالح

### 7.1 الاستقلالية التحريرية

يتم إنشاء محتوانا بشكل مستقل. نحن لسنا:

- ممولين من قبل شركات الأدوية
- تابعين لمصنعي الأدوية
- متأثرين بمصالح تجارية في أوصافنا

### 7.2 الإعلانات (مستقبلاً)

في المستقبل، قد نعرض إعلانات (Google AdSense أو ما شابه).

**إذا عرضنا إعلانات**:
- سيتم تحديدها بوضوح على أنها "إعلان"
- لن تؤثر على محتوانا التحريري
- سنحافظ على الاستقلالية بين المحتوى والإعلان

### 7.3 لا توجد علاقات تجارية

نحن لا نتلقى:

- مدفوعات من شركات الأدوية
- عمولات على مبيعات الأدوية
- مزايا مالية لذكر منتجات محددة

## 8. حقوق الطبع والنشر والمصادر

### 8.1 المحتوى الأصلي

المحتوى الذي ننشئه (النصوص، التنظيم، العرض) هو ملكيتنا الفكرية.

### 8.2 المعلومات العامة

جزء كبير من معلوماتنا يأتي من:

- مصادر عامة وحكومية
- قواعد بيانات صيدلانية متاحة
- نشرات ومونوغرافيات رسمية

نستخدم هذه المعلومات وفقاً لتوفرها العام.

### 8.3 الاستشهاد المحترم

نبذل جهداً من أجل:

- الاستشهاد بمصادرنا الرئيسية
- احترام حقوق الطبع والنشر
- استخدام المعلومات بشكل مناسب

## 9. مسؤوليتك كمستخدم

### 9.1 الاستخدام المسؤول

باستخدام Taawidaty.ma، فإنك توافق على:

✓ **استشارة أخصائي الرعاية الصحية** لأي سؤال طبي  
✓ **التحقق من المعلومات** مع مصادر رسمية  
✓ **قراءة النشرات الرسمية** للأدوية  
✓ **عدم العلاج الذاتي** بناءً على موقعنا وحده  
✓ **الإبلاغ عن الأخطاء** التي تحددها  
✓ **استخدام الموقع بحكمة**  

### 9.2 ما يجب عليك عدم فعله

يجب عليك عدم:

- ❌ اتخاذ قرارات طبية بناءً على موقعنا فقط
- ❌ تجاهل نصيحة طبيبك أو صيدليك
- ❌ تعديل علاجك دون استشارة طبية
- ❌ معاملة موقعنا كمصدر طبي موثوق
- ❌ الاعتماد بشكل حصري على معلوماتنا

## 10. الاتصال والإبلاغ عن الأخطاء

### 10.1 الاتصال بنا

للإبلاغ عن أخطاء أو طرح أسئلة:

**البريد الإلكتروني**: contact@taawidaty.ma  
**الموقع الإلكتروني**: https://www.taawidaty.ma/contact-us

### 10.2 ما يمكننا القيام به

سنبذل قصارى جهدنا من أجل:

- قراءة رسائلك
- فحص الأخطاء المبلغ عنها
- تصحيح المعلومات الخاطئة القابلة للتحقق
- الرد في وقت معقول

### 10.3 ما لا يمكننا القيام به

لا يمكننا:

- ❌ تقديم نصائح طبية شخصية
- ❌ الإجابة على أسئلة حول علاجك
- ❌ التوصية بالأدوية
- ❌ تفسير أعراضك
- ❌ ضمان استجابة فورية

**لأي سؤال طبي، اتصل بأخصائي الرعاية الصحية.**

## 11. تعديلات هذه السياسة

### 11.1 التغييرات

نحتفظ بالحق في تعديل هذه السياسة التحريرية في أي وقت.

سيتم:
- نشر التعديلات على هذه الصفحة
- الإشارة إليها بـ "تاريخ التحديث" الجديد

### 11.2 موافقتك المستمرة

يشكل استمرار استخدامك للموقع بعد التعديلات قبولك للسياسة الجديدة.

## 12. الملخص - تذكر

**باختصار**:

1. ✓ نجمع معلومات عامة حول الأدوية في المغرب
2. ✓ نبذل قصارى جهدنا للحفاظ على محتوى عالي الجودة
3. ✓ **لكننا لا نضمن شيئاً**
4. ✓ **يجب عليك دائماً استشارة أخصائي الرعاية الصحية**
5. ✓ استخدم موقعنا كمرجع عام فقط
6. ✓ تحقق دائماً من المعلومات مع مصادر رسمية
7. ✓ نخلي مسؤوليتنا

---

**تحذير نهائي**

يتم توفير المعلومات على TAAWIDATY.MA "كما هي" دون ضمان من أي نوع. نبذل جهوداً بحسن نية للحفاظ على محتوى عالي الجودة، لكننا لسنا مسؤولين عن الأخطاء أو السهو أو عواقب استخدام هذا الموقع.

**استشر دائماً أخصائي رعاية صحية مؤهل لأي سؤال طبي.**

---

**تاريخ آخر تحديث: 4 نوفمبر 2025**`
    }
  };

  const current = content[language];

  return (
    <>
      <Helmet>
        <title>{current.title} - {current.subtitle}</title>
        <meta name="description" content="Politique éditoriale de Taawidaty.ma - Transparence sur nos processus de création et vérification du contenu" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-cyan-50/20 dark:from-background dark:to-card">
        {/* Header */}
        <header className="bg-white dark:bg-card border-b dark:border-border sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-2"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {current.backButton}
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
          <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8">
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                {current.content}
              </pre>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
