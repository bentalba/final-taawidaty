/**
 * Terms of Service Page - Taawidaty
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormattedContent } from '@/components/FormattedText';
import { SEO } from '@/components/SEO';

export default function TermsOfService() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const content = {
    fr: {
      title: 'Conditions d\'Utilisation',
      subtitle: 'Taawidaty.ma',
      lastUpdated: 'Dernière mise à jour : 4 novembre 2025',
      backButton: 'Retour à l\'accueil'
    },
    ar: {
      title: 'شروط الاستخدام',
      subtitle: 'Taawidaty.ma',
      lastUpdated: 'آخر تحديث: 4 نوفمبر 2025',
      backButton: 'العودة إلى الصفحة الرئيسية'
    }
  };

  const current = content[language];
  const pageUrl = 'https://taawidaty.ma/terms-of-service';
  const metaDescription = language === 'ar'
    ? 'اكتشف شروط استخدام منصة تعويضاتي وخدماتها التعليمية حول تعويضات الأدوية في المغرب.'
    : 'Consultez les conditions d\'utilisation complètes de Taawidaty, la plateforme marocaine dédiée aux remboursements de médicaments.';
  const metaKeywords = language === 'ar'
    ? [
        'شروط استخدام تعويضاتي',
        'سياسة Taawidaty',
        'قواعد موقع التعويضات',
        'تعويضات الأدوية المغرب',
        'خدمة Taawidaty CNSS CNOPS'
      ]
    : [
        'conditions utilisation taawidaty',
        'politique taawidaty',
        'remboursement medicaments maroc',
        'regles service cnss cnops',
        'site remboursement taawidaty'
      ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: language === 'ar' ? 'شروط الاستخدام - تعويضاتي' : 'Conditions d\'Utilisation - Taawidaty',
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

  // French content
  const frenchContent = `# Conditions d'Utilisation - Taawidaty.ma

**Dernière mise à jour : 4 novembre 2025**

## 1. Acceptation des Conditions

Bienvenue sur Taawidaty.ma ("le Site", "nous", "notre"). En accédant et en utilisant ce site web, vous acceptez d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions dans leur intégralité, veuillez ne pas utiliser ce site.

## 2. Description du Service

Taawidaty.ma est une base de données éducative en ligne qui fournit des informations sur les médicaments commercialisés au Maroc. Notre service comprend :

- Des informations détaillées sur plus de 8 000 médicaments disponibles au Maroc
- Des guides éducatifs sur l'utilisation appropriée des médicaments
- Des articles sur la santé et la sécurité pharmaceutique
- Des outils de recherche et de comparaison de médicaments

**Important : Ce site est exclusivement informatif et éducatif. Il ne remplace pas les conseils, diagnostics ou traitements médicaux professionnels.**

## 3. Avertissement Médical

### 3.1 Nature du Contenu

Les informations fournies sur Taawidaty.ma sont destinées uniquement à des fins éducatives et informatives. Elles ne constituent pas :

- Des conseils médicaux personnalisés
- Des recommandations de traitement
- Un substitut à la consultation d'un professionnel de santé qualifié
- Une prescription médicale

### 3.2 Consultation Médicale Obligatoire

Vous devez toujours :

- Consulter un médecin, pharmacien ou autre professionnel de santé qualifié pour toute question concernant un problème de santé ou un traitement médical
- Lire attentivement la notice des médicaments avant utilisation
- Ne jamais ignorer un avis médical professionnel ni retarder sa recherche en raison d'informations trouvées sur ce site
- Contacter immédiatement les services d'urgence en cas d'urgence médicale

### 3.3 Absence de Relation Médecin-Patient

L'utilisation de ce site ne crée aucune relation médecin-patient, pharmacien-patient ou autre relation professionnelle de santé entre vous et Taawidaty.ma ou ses contributeurs.

## 4. Exactitude des Informations

### 4.1 Efforts de Précision

Nous nous efforçons de fournir des informations exactes, à jour et fiables. Cependant :

- Les informations médicales et pharmaceutiques évoluent constamment
- Malgré nos efforts de vérification, des erreurs peuvent survenir
- Les informations peuvent ne pas être complètes ou exhaustives
- Les informations peuvent ne pas s'appliquer à votre situation personnelle

### 4.2 Non-Garantie

Nous ne garantissons pas que les informations sur ce site sont :

- Totalement exactes ou sans erreur
- Complètes ou exhaustives
- À jour au moment de votre consultation
- Applicables à votre situation spécifique

### 4.3 Vérification Indépendante

Vous êtes responsable de vérifier toute information avec votre professionnel de santé avant de prendre des décisions médicales.

## 5. Utilisation Autorisée

### 5.1 Droits d'Utilisation

Vous êtes autorisé à :

- Consulter les informations sur le site pour votre usage personnel
- Rechercher des informations sur les médicaments
- Lire et partager nos articles éducatifs (avec attribution appropriée)
- Utiliser les outils de recherche et de comparaison

### 5.2 Restrictions d'Utilisation

Vous n'êtes PAS autorisé à :

- Copier, reproduire ou republier le contenu du site sans autorisation écrite
- Utiliser le site à des fins commerciales sans notre accord préalable
- Extraire automatiquement (scraper) le contenu de notre base de données
- Redistribuer nos informations sur d'autres plateformes sans permission
- Modifier ou altérer le contenu du site
- Utiliser le site pour des activités illégales ou frauduleuses
- Vendre, prescrire ou distribuer des médicaments via ce site

## 6. Interdiction de Vente de Médicaments

### 6.1 Site Informatif Uniquement

Taawidaty.ma est strictement un site d'information. Nous ne vendons, ne distribuons, ni ne prescrivons AUCUN médicament.

### 6.2 Obtention Légale de Médicaments

Les médicaments sur ordonnance doivent être obtenus uniquement :

- Auprès de pharmacies autorisées au Maroc
- Avec une prescription valide d'un médecin agréé
- En conformité avec la législation marocaine sur les médicaments

### 6.3 Mise en Garde

L'achat de médicaments auprès de sources non autorisées peut être dangereux et illégal.

## 7. Propriété Intellectuelle

### 7.1 Contenu Protégé

Tout le contenu de Taawidaty.ma, incluant mais sans s'y limiter :

- Textes, articles et descriptions de médicaments
- Graphiques, logos et images
- Structure et organisation de la base de données
- Code source et logiciels
- Marques commerciales

est protégé par les lois marocaines et internationales sur la propriété intellectuelle et appartient à Taawidaty.ma ou à ses concédants de licence.

### 7.2 Droits Réservés

Tous les droits non expressément accordés dans ces Conditions sont réservés.

### 7.3 Attribution des Sources

Lorsque nous citons des sources externes (FDA, OMS, Ministère de la Santé du Maroc, études médicales), ces contenus appartiennent à leurs propriétaires respectifs et sont utilisés conformément aux principes de citation académique et éducative.

## 8. Contenu Généré par l'Utilisateur

### 8.1 Commentaires et Contributions

Si nous permettons aux utilisateurs de soumettre des commentaires ou des contributions :

- Vous conservez la propriété de votre contenu
- Vous nous accordez une licence mondiale, non exclusive, libre de droits pour utiliser, reproduire et afficher votre contenu
- Vous garantissez que votre contenu ne viole aucun droit de tiers

### 8.2 Contenu Interdit

Vous ne pouvez pas soumettre de contenu qui :

- Est illégal, offensant, diffamatoire ou menaçant
- Viole les droits de propriété intellectuelle d'autrui
- Contient des conseils médicaux personnalisés ou des diagnostics
- Fait la promotion de médicaments de manière inappropriée
- Contient des informations médicales fausses ou dangereuses

### 8.3 Modération

Nous nous réservons le droit de modérer, modifier ou supprimer tout contenu utilisateur qui viole ces conditions ou nos politiques.

## 9. Liens vers des Sites Tiers

### 9.1 Présence de Liens

Notre site peut contenir des liens vers des sites web tiers (organisations médicales, institutions pharmaceutiques, sites gouvernementaux).

### 9.2 Non-Responsabilité

- Ces liens sont fournis pour votre commodité
- Nous ne contrôlons pas ces sites tiers
- Nous ne sommes pas responsables de leur contenu, politiques ou pratiques
- L'inclusion d'un lien ne constitue pas une approbation

### 9.3 Utilisation à Vos Risques

Vous accédez aux sites tiers à vos propres risques et devez consulter leurs conditions d'utilisation et politiques de confidentialité.

## 10. Limitation de Responsabilité

### 10.1 Exclusion de Garanties

DANS LA MESURE MAXIMALE PERMISE PAR LA LOI MAROCAINE, TAAWIDATY.MA EST FOURNI "TEL QUEL" ET "SELON DISPONIBILITÉ" SANS GARANTIES D'AUCUNE SORTE, EXPRESSES OU IMPLICITES.

Nous déclinons toute garantie concernant :

- L'exactitude, la fiabilité ou l'exhaustivité des informations
- La disponibilité ininterrompue du site
- L'absence d'erreurs ou de virus
- Les résultats obtenus de l'utilisation du site

### 10.2 Exclusion de Responsabilité pour Dommages

DANS LA MESURE MAXIMALE PERMISE PAR LA LOI, TAAWIDATY.MA, SES PROPRIÉTAIRES, EMPLOYÉS, CONTRIBUTEURS OU AFFILIÉS NE SERONT PAS RESPONSABLES DE :

- Tout dommage direct, indirect, accessoire, spécial, consécutif ou punitif
- Perte de profits, revenus, données ou d'utilisation
- Dommages corporels ou décès résultant de l'utilisation ou de l'incapacité d'utiliser le site
- Décisions médicales prises sur la base des informations du site
- Erreurs ou omissions dans le contenu du site

### 10.3 Juridictions sans Limitation

Certaines juridictions ne permettent pas l'exclusion de certaines garanties ou limitations de responsabilité. Dans ces juridictions, notre responsabilité sera limitée au maximum permis par la loi.

## 11. Indemnisation

Vous acceptez d'indemniser et de dégager de toute responsabilité Taawidaty.ma, ses propriétaires, employés, contributeurs et affiliés contre toute réclamation, perte, responsabilité, coût ou dépense (incluant les honoraires d'avocat raisonnables) résultant de :

- Votre utilisation du site
- Votre violation de ces Conditions d'Utilisation
- Votre violation de droits de tiers
- Tout contenu que vous soumettez au site

## 12. Vie Privée et Protection des Données

### 12.1 Politique de Confidentialité

Votre utilisation du site est également régie par notre Politique de Confidentialité, qui est incorporée par référence dans ces Conditions.

### 12.2 Collecte de Données

Nous collectons et utilisons vos données personnelles conformément à :

- Notre Politique de Confidentialité
- La loi marocaine n°09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel
- Le cas échéant, le Règlement Général sur la Protection des Données (RGPD) de l'UE

### 12.3 Cookies

Nous utilisons des cookies et technologies similaires. Consultez notre Politique de Cookies pour plus d'informations.

## 13. Modifications du Service et des Conditions

### 13.1 Droit de Modification

Nous nous réservons le droit, à notre seule discrétion, de :

- Modifier ces Conditions d'Utilisation à tout moment
- Modifier, suspendre ou interrompre tout aspect du site
- Mettre à jour le contenu médical et pharmaceutique

### 13.2 Notification des Modifications

Les modifications importantes seront :

- Publiées sur cette page avec une nouvelle "Date de Mise à Jour"
- Notifiées par e-mail aux utilisateurs enregistrés (si applicable)

### 13.3 Acceptation des Modifications

Votre utilisation continue du site après les modifications constitue votre acceptation des nouvelles conditions. Si vous n'acceptez pas les modifications, vous devez cesser d'utiliser le site.

## 14. Résiliation

### 14.1 Résiliation par l'Utilisateur

Vous pouvez cesser d'utiliser le site à tout moment.

### 14.2 Résiliation par Taawidaty.ma

Nous pouvons, à notre seule discrétion, suspendre ou résilier votre accès au site si :

- Vous violez ces Conditions d'Utilisation
- Votre utilisation du site est jugée inappropriée ou illégale
- Requis par la loi ou par une ordonnance judiciaire

### 14.3 Effets de la Résiliation

Après résiliation :

- Votre droit d'accès au site cesse immédiatement
- Les dispositions qui, par nature, doivent survivre (limitation de responsabilité, propriété intellectuelle, indemnisation) restent en vigueur

## 15. Conformité Légale au Maroc

### 15.1 Législation Applicable

Taawidaty.ma opère en conformité avec :

- La législation pharmaceutique marocaine
- Les réglementations du Ministère de la Santé du Maroc
- La Loi 17-04 portant Code du Médicament et de la Pharmacie
- Les normes de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP)

### 15.2 Informations Réglementaires

Les informations sur les médicaments sont basées sur :

- Les monographies officielles du Ministère de la Santé du Maroc
- Les données d'enregistrement des médicaments au Maroc
- Les sources internationales reconnues (FDA, EMA, OMS)

## 16. Publicité (Future)

### 16.1 Publicité Prévue

À l'avenir, Taawidaty.ma pourra afficher de la publicité, incluant :

- Des annonces Google AdSense
- Des publicités de tiers
- Du contenu sponsorisé

### 16.2 Séparation du Contenu Publicitaire

Lorsque des publicités seront présentes :

- Elles seront clairement identifiées comme "Publicité" ou "Annonce"
- Le contenu éditorial restera indépendant du contenu publicitaire
- Nous ne permettrons pas de publicités pour des produits ou services illégaux

### 16.3 Politique de Publicité Responsable

Nous nous engageons à :

- Respecter les réglementations marocaines sur la publicité pharmaceutique
- Ne pas faire la promotion de médicaments sur ordonnance directement aux consommateurs de manière inappropriée
- Maintenir des standards éthiques dans toute publicité

## 17. Accès International

### 17.1 Contenu Spécifique au Maroc

Bien que le site soit accessible mondialement, le contenu est spécifiquement conçu pour :

- Les résidents du Maroc
- Le système de santé marocain
- Les médicaments commercialisés au Maroc

### 17.2 Restrictions d'Exportation

Certaines informations ou fonctionnalités peuvent être soumises aux lois sur l'exportation et les sanctions internationales.

### 17.3 Conformité Locale

Si vous accédez au site depuis l'extérieur du Maroc, vous êtes responsable du respect des lois locales de votre juridiction.

## 18. Droit Applicable et Juridiction

### 18.1 Loi Marocaine

Ces Conditions d'Utilisation sont régies et interprétées conformément aux lois du Royaume du Maroc, sans égard à ses principes de conflits de lois.

### 18.2 Juridiction Compétente

Tout litige découlant de ou en relation avec ces Conditions sera soumis à la juridiction exclusive des tribunaux de Kenitra, Maroc.

### 18.3 Renonciation au Jury

Dans la mesure permise par la loi, les parties renoncent à tout droit à un procès devant jury.

## 19. Dispositions Générales

### 19.1 Accord Intégral

Ces Conditions d'Utilisation, conjointement avec notre Politique de Confidentialité et notre Avertissement Médical, constituent l'intégralité de l'accord entre vous et Taawidaty.ma concernant l'utilisation du site.

### 19.2 Divisibilité

Si une disposition de ces Conditions est jugée invalide ou inapplicable, les autres dispositions resteront pleinement en vigueur et applicables.

### 19.3 Renonciation

L'échec de Taawidaty.ma à faire respecter un droit ou une disposition de ces Conditions ne constitue pas une renonciation à ce droit ou à cette disposition.

### 19.4 Cession

Vous ne pouvez pas céder vos droits ou obligations en vertu de ces Conditions sans notre consentement écrit préalable. Nous pouvons céder nos droits et obligations sans restriction.

### 19.5 Titres

Les titres des sections sont fournis pour la commodité uniquement et n'ont aucune valeur juridique ou contractuelle.

### 19.6 Langue

En cas de conflit entre les versions française et arabe de ces Conditions, la version française prévaudra.

## 20. Contact

Pour toute question concernant ces Conditions d'Utilisation, veuillez nous contacter :

**Taawidaty.ma**  
Email : contact@taawidaty.ma  
Site web : https://www.taawidaty.ma  
Adresse : 1890 bir rami sud 14093, Kenitra, Maroc

---

**Accusé de Réception**

EN UTILISANT TAAWIDATY.MA, VOUS RECONNAISSEZ AVOIR LU, COMPRIS ET ACCEPTÉ D'ÊTRE LIÉ PAR CES CONDITIONS D'UTILISATION.

**Date de dernière révision : 4 novembre 2025**

---

## Annexe : Définitions

**Base de données** : L'ensemble des informations sur les médicaments hébergées sur Taawidaty.ma

**Contenu** : Tout texte, image, vidéo, audio, code ou autre matériel affiché sur le site

**Médicament** : Toute substance ou composition présentée comme possédant des propriétés curatives ou préventives à l'égard des maladies humaines

**Professionnel de santé** : Médecin, pharmacien, infirmier ou tout autre praticien de santé dûment qualifié et autorisé

**Utilisateur/Vous** : Toute personne accédant ou utilisant le site Taawidaty.ma

**Nous/Notre/Taawidaty.ma** : Les opérateurs et propriétaires du site web Taawidaty.ma

**YMYL (Your Money Your Life)** : Catégorie de contenu pouvant impacter la santé, la sécurité financière ou le bien-être des utilisateurs

---

*Cette version des Conditions d'Utilisation est conçue pour protéger à la fois Taawidaty.ma et ses utilisateurs tout en respectant les exigences légales marocaines et les meilleures pratiques internationales pour les sites d'information médicale.*`;

  // Arabic content
  const arabicContent = `# شروط الاستخدام - Taawidaty.ma

**آخر تحديث: 4 نوفمبر 2025**

## 1. قبول الشروط

مرحباً بكم في Taawidaty.ma ("الموقع"، "نحن"، "خاصتنا"). من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على هذه الشروط بالكامل، يرجى عدم استخدام هذا الموقع.

## 2. وصف الخدمة

Taawidaty.ma هي قاعدة بيانات تعليمية عبر الإنترنت توفر معلومات حول الأدوية المتاحة تجارياً في المغرب. تشمل خدمتنا:

- معلومات مفصلة عن أكثر من 8000 دواء متوفر في المغرب
- أدلة تعليمية حول الاستخدام الصحيح للأدوية
- مقالات حول الصحة والسلامة الدوائية
- أدوات البحث والمقارنة بين الأدوية

**مهم: هذا الموقع للأغراض الإعلامية والتعليمية فقط. لا يحل محل المشورة الطبية المهنية أو التشخيص أو العلاج.**

## 3. تحذير طبي

### 3.1 طبيعة المحتوى

المعلومات المقدمة على Taawidaty.ma مخصصة للأغراض التعليمية والإعلامية فقط. إنها لا تشكل:

- نصيحة طبية شخصية
- توصيات علاجية
- بديلاً عن استشارة أخصائي صحي مؤهل
- وصفة طبية

### 3.2 الاستشارة الطبية الإلزامية

يجب عليك دائماً:

- استشارة طبيب أو صيدلي أو أخصائي صحي مؤهل آخر لأي أسئلة تتعلق بمشكلة صحية أو علاج طبي
- قراءة نشرة الأدوية بعناية قبل الاستخدام
- عدم تجاهل المشورة الطبية المهنية أو تأخير البحث عنها بسبب المعلومات الموجودة على هذا الموقع
- الاتصال بخدمات الطوارئ فوراً في حالة طوارئ طبية

### 3.3 عدم وجود علاقة طبيب-مريض

استخدام هذا الموقع لا ينشئ أي علاقة طبيب-مريض أو صيدلي-مريض أو أي علاقة مهنية صحية أخرى بينك وبين Taawidaty.ma أو مساهميه.

## 4. دقة المعلومات

### 4.1 جهود الدقة

نبذل جهوداً لتقديم معلومات دقيقة ومحدثة وموثوقة. ومع ذلك:

- المعلومات الطبية والصيدلانية تتطور باستمرار
- على الرغم من جهود التحقق لدينا، يمكن أن تحدث أخطاء
- قد لا تكون المعلومات كاملة أو شاملة
- قد لا تنطبق المعلومات على حالتك الشخصية

### 4.2 عدم الضمان

نحن لا نضمن أن المعلومات الموجودة على هذا الموقع:

- دقيقة تماماً أو خالية من الأخطاء
- كاملة أو شاملة
- محدثة في وقت استشارتك
- قابلة للتطبيق على وضعك المحدد

### 4.3 التحقق المستقل

أنت مسؤول عن التحقق من أي معلومات مع أخصائي الرعاية الصحية الخاص بك قبل اتخاذ قرارات طبية.

## 5. الاستخدام المسموح به

### 5.1 حقوق الاستخدام

يُسمح لك بـ:

- الاطلاع على المعلومات الموجودة على الموقع لاستخدامك الشخصي
- البحث عن معلومات حول الأدوية
- قراءة ومشاركة مقالاتنا التعليمية (مع الإسناد المناسب)
- استخدام أدوات البحث والمقارنة

### 5.2 قيود الاستخدام

لا يُسمح لك بـ:

- نسخ أو إعادة إنتاج أو إعادة نشر محتوى الموقع دون إذن كتابي
- استخدام الموقع لأغراض تجارية دون موافقتنا المسبقة
- استخراج المحتوى تلقائياً (scraping) من قاعدة البيانات الخاصة بنا
- إعادة توزيع معلوماتنا على منصات أخرى دون إذن
- تعديل أو تغيير محتوى الموقع
- استخدام الموقع لأنشطة غير قانونية أو احتيالية
- بيع أو وصف أو توزيع الأدوية عبر هذا الموقع

## 6. حظر بيع الأدوية

### 6.1 موقع معلوماتي فقط

Taawidaty.ma هو موقع معلوماتي بحت. نحن لا نبيع ولا نوزع ولا نصف أي أدوية.

### 6.2 الحصول القانوني على الأدوية

يجب الحصول على الأدوية الموصوفة طبياً فقط من:

- الصيدليات المرخصة في المغرب
- بوصفة طبية صالحة من طبيب مرخص
- بما يتوافق مع التشريعات المغربية الخاصة بالأدوية

### 6.3 تحذير

شراء الأدوية من مصادر غير مصرح بها يمكن أن يكون خطيراً وغير قانوني.

## 7. الملكية الفكرية

### 7.1 المحتوى المحمي

جميع محتويات Taawidaty.ma، بما في ذلك على سبيل المثال لا الحصر:

- النصوص والمقالات ووصف الأدوية
- الرسومات والشعارات والصور
- هيكل وتنظيم قاعدة البيانات
- الكود المصدري والبرمجيات
- العلامات التجارية

محمية بموجب قوانين الملكية الفكرية المغربية والدولية وهي ملك لـ Taawidaty.ma أو مانحي التراخيص.

### 7.2 حقوق محفوظة

جميع الحقوق غير الممنوحة صراحة في هذه الشروط محفوظة.

### 7.3 إسناد المصادر

عندما نستشهد بمصادر خارجية (إدارة الغذاء والدواء الأمريكية، منظمة الصحة العالمية، وزارة الصحة المغربية، الدراسات الطبية)، فإن هذه المحتويات تنتمي إلى أصحابها المعنيين وتُستخدم وفقاً لمبادئ الاستشهاد الأكاديمي والتعليمي.

## 8. المحتوى الذي ينشئه المستخدم

### 8.1 التعليقات والمساهمات

إذا سمحنا للمستخدمين بتقديم تعليقات أو مساهمات:

- تحتفظ بملكية المحتوى الخاص بك
- تمنحنا ترخيصاً عالمياً غير حصري ومجانياً لاستخدام وإعادة إنتاج وعرض المحتوى الخاص بك
- تضمن أن المحتوى الخاص بك لا يخرق حقوق الطرف الثالث

### 8.2 المحتوى المحظور

لا يمكنك تقديم محتوى:

- غير قانوني أو مسيء أو تشهيري أو مهدد
- يخرق حقوق الملكية الفكرية للآخرين
- يحتوي على نصائح طبية شخصية أو تشخيصات
- يروج للأدوية بشكل غير لائق
- يحتوي على معلومات طبية كاذبة أو خطيرة

### 8.3 الإشراف

نحتفظ بالحق في الإشراف على أي محتوى مستخدم أو تعديله أو حذفه إذا انتهك هذه الشروط أو سياساتنا.

## 9. روابط إلى مواقع الطرف الثالث

### 9.1 وجود الروابط

قد يحتوي موقعنا على روابط إلى مواقع ويب تابعة لطرف ثالث (منظمات طبية، مؤسسات صيدلانية، مواقع حكومية).

### 9.2 عدم المسؤولية

- هذه الروابط مقدمة لراحتك
- نحن لا نتحكم في مواقع الطرف الثالث هذه
- نحن غير مسؤولين عن محتواها أو سياساتها أو ممارساتها
- تضمين رابط لا يشكل تأييداً

### 9.3 الاستخدام على مسؤوليتك الخاصة

أنت تصل إلى مواقع الطرف الثالث على مسؤوليتك الخاصة ويجب عليك الرجوع إلى شروط الاستخدام وسياسات الخصوصية الخاصة بها.

## 10. تحديد المسؤولية

### 10.1 استبعاد الضمانات

إلى أقصى حد يسمح به القانون المغربي، يتم توفير TAAWIDATY.MA "كما هو" و"حسب التوافر" دون ضمانات من أي نوع، صريحة أو ضمنية.

نخلي مسؤوليتنا عن أي ضمانات تتعلق بـ:

- دقة أو موثوقية أو اكتمال المعلومات
- توفر الموقع دون انقطاع
- خلو الموقع من الأخطاء أو الفيروسات
- النتائج التي تم الحصول عليها من استخدام الموقع

### 10.2 استبعاد المسؤولية عن الأضرار

إلى أقصى حد يسمح به القانون، لن يكون TAAWIDATY.MA أو مالكوه أو موظفوه أو مساهموه أو الشركات التابعة له مسؤولين عن:

- أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية
- فقدان الأرباح أو الإيرادات أو البيانات أو الاستخدام
- إصابة جسدية أو وفاة ناتجة عن استخدام أو عدم القدرة على استخدام الموقع
- القرارات الطبية المتخذة بناءً على معلومات الموقع
- الأخطاء أو الإغفالات في محتوى الموقع

### 10.3 الولايات القضائية بدون قيود

بعض الولايات القضائية لا تسمح باستبعاد بعض الضمانات أو قيود المسؤولية. في هذه الولايات القضائية، ستقتصر مسؤوليتنا على الحد الأقصى المسموح به بموجب القانون.

## 11. التعويض

أنت توافق على تعويض وإعفاء Taawidaty.ma ومالكيه وموظفيه ومساهميه والشركات التابعة له من المسؤولية عن أي مطالبة أو خسارة أو مسؤولية أو تكلفة أو نفقات (بما في ذلك أتعاب المحاماة المعقولة) الناتجة عن:

- استخدامك للموقع
- انتهاكك لشروط الاستخدام هذه
- انتهاكك لحقوق الطرف الثالث
- أي محتوى تقدمه إلى الموقع

## 12. الخصوصية وحماية البيانات

### 12.1 سياسة الخصوصية

يخضع استخدامك للموقع أيضاً لسياسة الخصوصية الخاصة بنا، والتي يتم دمجها بالإشارة في هذه الشروط.

### 12.2 جمع البيانات

نجمع ونستخدم بياناتك الشخصية وفقاً لـ:

- سياسة الخصوصية الخاصة بنا
- القانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الطبيعيين تجاه معالجة البيانات ذات الطابع الشخصي
- عند الاقتضاء، اللائحة العامة لحماية البيانات (GDPR) للاتحاد الأوروبي

### 12.3 ملفات تعريف الارتباط

نستخدم ملفات تعريف الارتباط (Cookies) وتقنيات مماثلة. راجع سياسة ملفات تعريف الارتباط الخاصة بنا لمزيد من المعلومات.

## 13. تعديلات الخدمة والشروط

### 13.1 حق التعديل

نحتفظ بالحق، وفقاً لتقديرنا الخاص، في:

- تعديل شروط الاستخدام هذه في أي وقت
- تعديل أو تعليق أو إيقاف أي جانب من جوانب الموقع
- تحديث المحتوى الطبي والصيدلاني

### 13.2 إخطار بالتعديلات

سيتم نشر التعديلات الهامة:

- على هذه الصفحة مع "تاريخ التحديث" الجديد
- إخطار عبر البريد الإلكتروني للمستخدمين المسجلين (إن وجد)

### 13.3 قبول التعديلات

يشكل استمرار استخدامك للموقع بعد التعديلات قبولك للشروط الجديدة. إذا كنت لا توافق على التعديلات، يجب عليك التوقف عن استخدام الموقع.

## 14. الإنهاء

### 14.1 الإنهاء من قبل المستخدم

يمكنك التوقف عن استخدام الموقع في أي وقت.

### 14.2 الإنهاء من قبل Taawidaty.ma

يمكننا، وفقاً لتقديرنا الخاص، تعليق أو إنهاء وصولك إلى الموقع إذا:

- انتهكت شروط الاستخدام هذه
- تم اعتبار استخدامك للموقع غير لائق أو غير قانوني
- مطلوب بموجب القانون أو أمر قضائي

### 14.3 آثار الإنهاء

بعد الإنهاء:

- يتوقف حقك في الوصول إلى الموقع فوراً
- تظل الأحكام التي، بطبيعتها، يجب أن تستمر (تحديد المسؤولية، الملكية الفكرية، التعويض) سارية المفعول

## 15. الامتثال القانوني في المغرب

### 15.1 التشريعات المطبقة

يعمل Taawidaty.ma بما يتوافق مع:

- التشريعات الصيدلانية المغربية
- لوائح وزارة الصحة المغربية
- القانون 17-04 بشأن قانون الأدوية والصيدلة
- معايير اللجنة الوطنية لمراقبة حماية البيانات الشخصية (CNDP)

### 15.2 المعلومات التنظيمية

تستند المعلومات حول الأدوية إلى:

- المونوغرافيات الرسمية لوزارة الصحة المغربية
- بيانات تسجيل الأدوية في المغرب
- المصادر الدولية المعترف بها (إدارة الغذاء والدواء، وكالة الأدوية الأوروبية، منظمة الصحة العالمية)

## 16. الإعلانات (مستقبلاً)

### 16.1 الإعلانات المخطط لها

في المستقبل، قد يعرض Taawidaty.ma إعلانات، بما في ذلك:

- إعلانات Google AdSense
- إعلانات الطرف الثالث
- محتوى مدعوم

### 16.2 فصل المحتوى الإعلاني

عندما تكون الإعلانات موجودة:

- سيتم تحديدها بوضوح على أنها "إعلان" أو "إعلان تجاري"
- سيظل المحتوى التحريري مستقلاً عن المحتوى الإعلاني
- لن نسمح بالإعلان عن منتجات أو خدمات غير قانونية

### 16.3 سياسة الإعلان المسؤول

نلتزم بـ:

- احترام اللوائح المغربية بشأن الإعلان الصيدلاني
- عدم الترويج للأدوية الموصوفة طبياً مباشرة للمستهلكين بطريقة غير لائقة
- الحفاظ على المعايير الأخلاقية في أي إعلان

## 17. الوصول الدولي

### 17.1 محتوى خاص بالمغرب

على الرغم من أن الموقع يمكن الوصول إليه عالمياً، فإن المحتوى مصمم خصيصاً لـ:

- سكان المغرب
- نظام الرعاية الصحية المغربي
- الأدوية المتاحة تجارياً في المغرب

### 17.2 قيود التصدير

قد تخضع بعض المعلومات أو الميزات لقوانين التصدير والعقوبات الدولية.

### 17.3 الامتثال المحلي

إذا كنت تصل إلى الموقع من خارج المغرب، فأنت مسؤول عن الامتثال للقوانين المحلية في ولايتك القضائية.

## 18. القانون المطبق والولاية القضائية

### 18.1 القانون المغربي

تخضع شروط الاستخدام هذه وتُفسر وفقاً لقوانين المملكة المغربية، دون اعتبار لمبادئ تنازع القوانين.

### 18.2 الولاية القضائية المختصة

سيتم إحالة أي نزاع ناشئ عن أو يتعلق بهذه الشروط إلى الولاية القضائية الحصرية لمحاكم القنيطرة، المغرب.

### 18.3 التنازل عن هيئة المحلفين

إلى أقصى حد يسمح به القانون، تتنازل الأطراف عن أي حق في محاكمة أمام هيئة محلفين.

## 19. أحكام عامة

### 19.1 الاتفاق الكامل

تشكل شروط الاستخدام هذه، جنباً إلى جنب مع سياسة الخصوصية والتحذير الطبي الخاصين بنا، الاتفاق الكامل بينك وبين Taawidaty.ma فيما يتعلق باستخدام الموقع.

### 19.2 قابلية الفصل

إذا تم اعتبار أي حكم من هذه الشروط غير صالح أو غير قابل للتنفيذ، فستظل الأحكام الأخرى سارية المفعول وقابلة للتنفيذ بالكامل.

### 19.3 التنازل

فشل Taawidaty.ma في إنفاذ حق أو حكم من هذه الشروط لا يشكل تنازلاً عن ذلك الحق أو الحكم.

### 19.4 التنازل عن الحقوق

لا يمكنك التنازل عن حقوقك أو التزاماتك بموجب هذه الشروط دون موافقتنا الكتابية المسبقة. يمكننا التنازل عن حقوقنا والتزاماتنا دون قيود.

### 19.5 العناوين

تُقدم عناوين الأقسام للراحة فقط وليس لها قيمة قانونية أو تعاقدية.

### 19.6 اللغة

في حالة وجود تعارض بين النسختين الفرنسية والعربية من هذه الشروط، ستسود النسخة الفرنسية.

## 20. الاتصال

لأي أسئلة تتعلق بشروط الاستخدام هذه، يرجى الاتصال بنا:

**Taawidaty.ma**  
البريد الإلكتروني: contact@taawidaty.ma  
الموقع الإلكتروني: https://www.taawidaty.ma  
العنوان: 1890 bir rami sud 14093، القنيطرة، المغرب

---

**إقرار الاستلام**

باستخدام TAAWIDATY.MA، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بشروط الاستخدام هذه.

**تاريخ آخر مراجعة: 4 نوفمبر 2025**

---

## ملحق: التعريفات

**قاعدة البيانات**: مجموعة المعلومات حول الأدوية المستضافة على Taawidaty.ma

**المحتوى**: أي نص أو صورة أو فيديو أو صوت أو كود أو مادة أخرى معروضة على الموقع

**الدواء**: أي مادة أو تركيب يقدم على أنه يمتلك خصائص علاجية أو وقائية ضد الأمراض البشرية

**أخصائي الرعاية الصحية**: طبيب أو صيدلي أو ممرض أو أي ممارس رعاية صحية آخر مؤهل ومرخص بشكل صحيح

**المستخدم/أنت**: أي شخص يصل أو يستخدم موقع Taawidaty.ma

**نحن/خاصتنا/Taawidaty.ma**: مشغلي ومالكي موقع الويب Taawidaty.ma

**YMYL (Your Money Your Life)**: فئة من المحتوى يمكن أن تؤثر على الصحة أو الأمان المالي أو رفاهية المستخدمين

---

*تم تصميم هذا الإصدار من شروط الاستخدام لحماية كل من Taawidaty.ma ومستخدميه مع احترام المتطلبات القانونية المغربية وأفضل الممارسات الدولية لمواقع المعلومات الطبية.*`;

  return (
    <>
      <SEO
        title={`${current.title} - ${current.subtitle}`}
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
              <FormattedContent className="font-sans text-base leading-relaxed">
                {language === 'ar' ? arabicContent : frenchContent}
              </FormattedContent>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
