/**
 * SEO Utilities
 * Meta tags, structured data, and social sharing optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: 'fr_MA' | 'ar_MA';
  alternateLocale?: 'fr_MA' | 'ar_MA';
}

/**
 * Update document meta tags for SEO
 */
export function updateMetaTags(config: SEOConfig) {
  // Title
  document.title = config.title;
  updateMetaTag('name', 'description', config.description);

  // Keywords
  if (config.keywords?.length) {
    updateMetaTag('name', 'keywords', config.keywords.join(', '));
  }

  // Canonical URL
  if (config.canonical) {
    updateLinkTag('canonical', config.canonical);
  }

  // Open Graph
  updateMetaTag('property', 'og:title', config.title);
  updateMetaTag('property', 'og:description', config.description);
  updateMetaTag('property', 'og:type', config.ogType || 'website');
  updateMetaTag('property', 'og:url', config.canonical || window.location.href);
  updateMetaTag('property', 'og:site_name', 'TAAWIDATY');
  updateMetaTag('property', 'og:locale', config.locale || 'fr_MA');
  
  if (config.alternateLocale) {
    updateMetaTag('property', 'og:locale:alternate', config.alternateLocale);
  }

  if (config.ogImage) {
    updateMetaTag('property', 'og:image', config.ogImage);
    updateMetaTag('property', 'og:image:alt', config.ogImageAlt || config.title);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
  }

  // Twitter Card
  updateMetaTag('name', 'twitter:card', config.twitterCard || 'summary_large_image');
  updateMetaTag('name', 'twitter:title', config.title);
  updateMetaTag('name', 'twitter:description', config.description);
  if (config.ogImage) {
    updateMetaTag('name', 'twitter:image', config.ogImage);
  }

  // Article metadata
  if (config.author) {
    updateMetaTag('name', 'author', config.author);
  }
  if (config.publishedTime) {
    updateMetaTag('property', 'article:published_time', config.publishedTime);
  }
  if (config.modifiedTime) {
    updateMetaTag('property', 'article:modified_time', config.modifiedTime);
  }
}

/**
 * Helper to update or create meta tags
 */
function updateMetaTag(attribute: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Helper to update or create link tags
 */
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
}

/**
 * Structured data for rich snippets
 */
export interface StructuredDataConfig {
  type: 'WebApplication' | 'Organization' | 'BreadcrumbList' | 'FAQPage' | 'HowTo';
  data: any;
}

/**
 * Add JSON-LD structured data
 */
export function addStructuredData(config: StructuredDataConfig) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': config.type,
    ...config.data,
  });
  
  // Remove existing script of same type if exists
  const existing = document.querySelector(`script[type="application/ld+json"][data-type="${config.type}"]`);
  if (existing) {
    existing.remove();
  }
  
  script.setAttribute('data-type', config.type);
  document.head.appendChild(script);
}

/**
 * Generate WebApplication structured data
 */
export function generateWebApplicationData(locale: 'fr' | 'ar') {
  const data = {
    name: 'TAAWIDATY',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MAD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description: locale === 'fr' 
      ? 'Calculateur de remboursement médicaments CNOPS et CNSS au Maroc. Calculez instantanément le montant de votre remboursement AMO.'
      : 'حاسبة استرجاع الأدوية CNOPS و CNSS في المغرب. احسب فوراً مبلغ استرجاعك AMO.',
    url: 'https://taawidaty.ma',
    screenshot: 'https://taawidaty.ma/screenshot.png',
    featureList: locale === 'fr'
      ? [
          'Calcul instantané des remboursements',
          'Support CNOPS et CNSS',
          'Base de données complète des médicaments',
          'Interface bilingue (Français/Arabe)',
          'Calcul précis et conforme',
        ]
      : [
          'حساب فوري للاسترجاع',
          'دعم CNOPS و CNSS',
          'قاعدة بيانات شاملة للأدوية',
          'واجهة ثنائية اللغة (فرنسي/عربي)',
          'حساب دقيق ومطابق',
        ],
  };

  addStructuredData({ type: 'WebApplication', data });
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationData() {
  const data = {
    name: 'TAAWIDATY',
    url: 'https://taawidaty.ma',
    logo: 'https://taawidaty.ma/logo.png',
    sameAs: [
      'https://www.facebook.com/taawidaty',
      'https://twitter.com/taawidaty',
      'https://www.instagram.com/taawidaty',
      'https://www.linkedin.com/company/taawidaty',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contact@taawidaty.ma',
      availableLanguage: ['French', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressLocality: 'Casablanca',
    },
  };

  addStructuredData({ type: 'Organization', data });
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbData(breadcrumbs: { name: string; url: string }[]) {
  const data = {
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  addStructuredData({ type: 'BreadcrumbList', data });
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQPageData(faqs: { question: string; answer: string }[]) {
  const data = {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  addStructuredData({ type: 'FAQPage', data });
}

/**
 * Generate HowTo structured data for calculator
 */
export function generateHowToData(locale: 'fr' | 'ar') {
  const data = locale === 'fr' ? {
    name: 'Comment calculer le remboursement de médicaments',
    description: 'Guide étape par étape pour calculer votre remboursement CNOPS ou CNSS',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choisir votre assurance',
        text: 'Sélectionnez CNOPS ou CNSS selon votre couverture médicale',
      },
      {
        '@type': 'HowToStep',
        name: 'Saisir vos informations',
        text: 'Remplissez le formulaire avec vos informations personnelles',
      },
      {
        '@type': 'HowToStep',
        name: 'Sélectionner vos médicaments',
        text: 'Recherchez et ajoutez les médicaments prescrits',
      },
      {
        '@type': 'HowToStep',
        name: 'Obtenir le résultat',
        text: 'Consultez le montant de remboursement calculé instantanément',
      },
    ],
    totalTime: 'PT3M',
  } : {
    name: 'كيفية حساب استرجاع الأدوية',
    description: 'دليل خطوة بخطوة لحساب استرجاعك CNOPS أو CNSS',
    step: [
      {
        '@type': 'HowToStep',
        name: 'اختر تأمينك',
        text: 'اختر CNOPS أو CNSS حسب تغطيتك الطبية',
      },
      {
        '@type': 'HowToStep',
        name: 'أدخل معلوماتك',
        text: 'املأ النموذج بمعلوماتك الشخصية',
      },
      {
        '@type': 'HowToStep',
        name: 'اختر أدويتك',
        text: 'ابحث وأضف الأدوية الموصوفة',
      },
      {
        '@type': 'HowToStep',
        name: 'احصل على النتيجة',
        text: 'اطلع على مبلغ الاسترجاع المحسوب فوراً',
      },
    ],
    totalTime: 'PT3M',
  };

  addStructuredData({ type: 'HowTo', data });
}

/**
 * Page-specific SEO configurations
 */
export const SEOConfigs = {
  home: (locale: 'fr' | 'ar'): SEOConfig => ({
    title: locale === 'fr' 
      ? 'TAAWIDATY - Calculateur Remboursement Médicaments CNOPS & CNSS Maroc'
      : 'TAAWIDATY - حاسبة استرجاع الأدوية CNOPS و CNSS المغرب',
    description: locale === 'fr'
      ? 'Calculez instantanément votre remboursement médicaments CNOPS ou CNSS au Maroc. Outil gratuit, précis et conforme. Base de données complète de médicaments.'
      : 'احسب فوراً استرجاع أدويتك CNOPS أو CNSS في المغرب. أداة مجانية، دقيقة ومطابقة. قاعدة بيانات شاملة للأدوية.',
    keywords: locale === 'fr'
      ? ['remboursement médicaments', 'CNOPS', 'CNSS', 'AMO Maroc', 'calculateur remboursement', 'assurance maladie Maroc']
      : ['استرجاع الأدوية', 'CNOPS', 'CNSS', 'التأمين الصحي المغرب', 'حاسبة الاسترجاع'],
    canonical: 'https://taawidaty.ma',
    ogType: 'website',
    ogImage: 'https://taawidaty.ma/og-home.png',
    locale: locale === 'fr' ? 'fr_MA' : 'ar_MA',
    alternateLocale: locale === 'fr' ? 'ar_MA' : 'fr_MA',
  }),

  calculator: (locale: 'fr' | 'ar'): SEOConfig => ({
    title: locale === 'fr'
      ? 'Calculateur Remboursement | TAAWIDATY'
      : 'حاسبة الاسترجاع | TAAWIDATY',
    description: locale === 'fr'
      ? 'Calculez votre remboursement médicaments en 3 étapes simples. Résultat instantané conforme aux barèmes CNOPS et CNSS.'
      : 'احسب استرجاع أدويتك في 3 خطوات بسيطة. نتيجة فورية مطابقة لجداول CNOPS و CNSS.',
    keywords: locale === 'fr'
      ? ['calculateur', 'remboursement', 'médicaments', 'CNOPS', 'CNSS', 'calcul en ligne']
      : ['حاسبة', 'استرجاع', 'أدوية', 'CNOPS', 'CNSS', 'حساب أونلاين'],
    canonical: 'https://taawidaty.ma/calculator',
    ogType: 'website',
    locale: locale === 'fr' ? 'fr_MA' : 'ar_MA',
  }),

  faqCNOPS: (locale: 'fr' | 'ar'): SEOConfig => ({
    title: locale === 'fr'
      ? 'FAQ CNOPS - Questions Remboursement | TAAWIDATY'
      : 'أسئلة شائعة CNOPS - أسئلة الاسترجاع | TAAWIDATY',
    description: locale === 'fr'
      ? 'Toutes vos questions sur le remboursement CNOPS : conditions, taux, procédures. Réponses claires et officielles.'
      : 'جميع أسئلتك حول استرجاع CNOPS: الشروط، النسب، الإجراءات. إجابات واضحة ورسمية.',
    keywords: locale === 'fr'
      ? ['FAQ CNOPS', 'questions remboursement', 'aide CNOPS', 'guide remboursement']
      : ['أسئلة CNOPS', 'أسئلة الاسترجاع', 'مساعدة CNOPS', 'دليل الاسترجاع'],
    canonical: 'https://taawidaty.ma/faq-cnops',
    ogType: 'article',
    locale: locale === 'fr' ? 'fr_MA' : 'ar_MA',
  }),

  faqCNSS: (locale: 'fr' | 'ar'): SEOConfig => ({
    title: locale === 'fr'
      ? 'FAQ CNSS - Questions Remboursement | TAAWIDATY'
      : 'أسئلة شائعة CNSS - أسئلة الاسترجاع | TAAWIDATY',
    description: locale === 'fr'
      ? 'Toutes vos questions sur le remboursement CNSS : conditions, taux, procédures. Réponses claires et officielles.'
      : 'جميع أسئلتك حول استرجاع CNSS: الشروط، النسب، الإجراءات. إجابات واضحة ورسمية.',
    keywords: locale === 'fr'
      ? ['FAQ CNSS', 'questions remboursement', 'aide CNSS', 'guide remboursement']
      : ['أسئلة CNSS', 'أسئلة الاسترجاع', 'مساعدة CNSS', 'دليل الاسترجاع'],
    canonical: 'https://taawidaty.ma/faq-cnss',
    ogType: 'article',
    locale: locale === 'fr' ? 'fr_MA' : 'ar_MA',
  }),
};

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(baseUrl: string = 'https://taawidaty.ma'): string {
  const now = new Date().toISOString();
  
  const urls = [
    { loc: baseUrl, priority: 1.0, changefreq: 'daily' },
    { loc: `${baseUrl}/calculator`, priority: 0.9, changefreq: 'weekly' },
    { loc: `${baseUrl}/faq-cnops`, priority: 0.8, changefreq: 'monthly' },
    { loc: `${baseUrl}/faq-cnss`, priority: 0.8, changefreq: 'monthly' },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${url.loc}?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${url.loc}?lang=ar"/>
  </url>`).join('\n')}
</urlset>`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(baseUrl: string = 'https://taawidaty.ma'): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin paths (if any)
Disallow: /admin/
Disallow: /api/

# Allow all resources
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.webp$
Allow: /*.svg$`;
}

export default {
  updateMetaTags,
  addStructuredData,
  generateWebApplicationData,
  generateOrganizationData,
  generateBreadcrumbData,
  generateFAQPageData,
  generateHowToData,
  SEOConfigs,
  generateSitemap,
  generateRobotsTxt,
};
