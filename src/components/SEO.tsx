/**
 * TAAWIDATY - Moroccan Medication Reimbursement Calculator
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 * @description SEO Component for improved search engine visibility
 * 
 * NOTE: The name "TAAWIDATY" (تعويضاتي) is proprietary and protected.
 * The code is open source (MIT License), but the brand name cannot be used
 * in derivative works without explicit permission.
 */

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  lang?: 'fr' | 'ar' | 'en';
  canonical?: string;
}

export const SEO = ({ 
  title = 'Calculateur Remboursement CNOPS CNSS Maroc | Taawidaty',
  description = 'Calculez instantanément votre remboursement médicaments CNOPS et CNSS au Maroc. Base de données complète des médicaments remboursables 2025. Gratuit et rapide.',
  keywords = 'calculateur remboursement cnops, cnss maroc, médicaments remboursables, remboursement médicaments maroc, cnops en ligne, assurance maladie maroc',
  lang = 'fr',
  canonical = 'https://taawidaty.ma'
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="fr_MA" />
      <meta property="og:locale:alternate" content="ar_MA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Language alternates */}
      <link rel="alternate" hreflang="fr" href="https://taawidaty.ma/" />
      <link rel="alternate" hreflang="ar" href="https://taawidaty.ma/" />
      <link rel="alternate" hreflang="x-default" href="https://taawidaty.ma/" />

      {/* Structured Data - WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Taawidaty",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "MAD"
          },
          "description": description,
          "inLanguage": ["fr-MA", "ar-MA"],
          "featureList": [
            "Calculateur CNOPS",
            "Calculateur CNSS",
            "Base de données médicaments",
            "Remboursement instantané"
          ]
        })}
      </script>
    </Helmet>
  );
};
