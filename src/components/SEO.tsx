/**
 * TAAWIDATY - Moroccan Medication Reimbursement Calculator
 *
 * SEO component centralizing meta tags, Open Graph data, alternate language
 * links, and structured data. Designed to be flexible per page while
 * providing sensible defaults for the whole app.
 */

import { Helmet } from 'react-helmet-async';

type SupportedLang = 'fr' | 'ar' | 'en';

interface AlternateLink {
  hreflang: string;
  href: string;
}

interface StructuredData {
  [key: string]: unknown;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  lang?: SupportedLang;
  canonical?: string;
  image?: string;
  alternates?: AlternateLink[];
  noindex?: boolean;
  structuredData?: StructuredData[];
}

const FALLBACK_CANONICAL = 'https://taawidaty.ma';
const FALLBACK_IMAGE = 'https://taawidaty.ma/og-image.jpg';
const FALLBACK_KEYWORDS = [
  'calculateur remboursement cnops',
  'calculateur remboursement cnss',
  'médicaments remboursables maroc',
  'assurance maladie obligatoire',
  'taawidaty'
];

const localeMap: Record<SupportedLang, string> = {
  fr: 'fr_MA',
  ar: 'ar_MA',
  en: 'en_US'
};

export const SEO = ({
  title = 'Calculateur Remboursement CNOPS CNSS Maroc | Taawidaty',
  description = 'Calculez instantanément votre remboursement médicaments CNOPS et CNSS au Maroc. Base de données complète des médicaments remboursables 2025. Gratuit et rapide.',
  keywords = FALLBACK_KEYWORDS,
  lang,
  canonical = FALLBACK_CANONICAL,
  image = FALLBACK_IMAGE,
  alternates,
  noindex = false,
  structuredData = []
}: SEOProps) => {
  const normalizedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  const normalizedAlternates = (alternates && alternates.length > 0
    ? alternates
    : [
        { hreflang: 'fr', href: canonical },
        { hreflang: 'ar', href: canonical },
        { hreflang: 'x-default', href: canonical }
      ]).filter((alternate, index, array) =>
        alternate.href && alternate.hreflang &&
        array.findIndex((item) => item.hreflang === alternate.hreflang && item.href === alternate.href) === index
      );

  const ogLocale = lang ? localeMap[lang] ?? lang : undefined;
  const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Taawidaty',
    url: 'https://taawidaty.ma',
    logo: 'https://taawidaty.ma/logos/TAAWIDATY.png',
    description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA'
    },
    areaServed: 'MA',
    sameAs: [] as string[]
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Taawidaty',
    alternateName: 'تعويضاتي',
    url: 'https://taawidaty.ma',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MAD'
    },
    description,
    inLanguage: ['fr-MA', 'ar-MA'],
    featureList: [
      'Calculateur CNOPS',
      'Calculateur CNSS',
      'Base de données médicaments',
      'Remboursement instantané'
    ],
    provider: {
      '@type': 'Organization',
      name: 'Taawidaty',
      url: 'https://taawidaty.ma'
    }
  };

  return (
    <Helmet>
      {lang && <html lang={lang} />}
      <title>{title}</title>
      <meta name="description" content={description} />
      {normalizedKeywords && <meta name="keywords" content={normalizedKeywords} />}
      <meta name="robots" content={robotsValue} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Taawidaty - Calculateur de remboursement CNOPS CNSS" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Taawidaty" />
      {ogLocale && <meta property="og:locale" content={ogLocale} />}
      <meta property="og:locale:alternate" content="fr_MA" />
      <meta property="og:locale:alternate" content="ar_MA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Taawidaty - Calculateur de remboursement CNOPS CNSS" />

      {normalizedAlternates.map((alternate) => (
        <link
          key={`${alternate.hreflang}-${alternate.href}`}
          rel="alternate"
          hreflang={alternate.hreflang}
          href={alternate.href}
        />
      ))}

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      {structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
