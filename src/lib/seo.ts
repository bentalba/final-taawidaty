/**
 * SEO Utilities for Medication Search and Pricing
 * Optimizes content for search engines to rank for medication price queries
 */

interface Medication {
  name: string;
  dci?: string;
  dosage?: string;
  ppv: number;
  ph?: number;
  forme?: string;
  presentation?: string;
  barcode?: string | null;
  classe_therapeutique?: string;
}

/**
 * Generate SEO-friendly slug from medication name
 * Example: "DOLIPRANE 1000 MG" -> "doliprane-1000-mg"
 */
export function generateMedicationSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
}

/**
 * Generate structured data (JSON-LD) for medication pricing
 * Schema.org Product + MedicalWebPage for better Google indexing
 */
export function generateMedicationStructuredData(medication: Medication) {
  const baseUrl = 'https://taawidaty.ma'; // Update with your actual domain
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Product Schema
      {
        '@type': 'Product',
        'name': medication.name,
        'description': `Prix officiel du ${medication.name}${medication.dci ? ` (${medication.dci})` : ''} au Maroc. ${medication.dosage || ''} ${medication.forme || ''}`.trim(),
        'brand': {
          '@type': 'Brand',
          'name': medication.name.split(' ')[0] // First word as brand
        },
        'offers': {
          '@type': 'Offer',
          'price': medication.ppv,
          'priceCurrency': 'MAD',
          'availability': 'https://schema.org/InStock',
          'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          'url': `${baseUrl}/prix/${generateMedicationSlug(medication.name)}`,
          'seller': {
            '@type': 'Organization',
            'name': 'Pharmacies Marocaines'
          }
        },
        'category': medication.classe_therapeutique || 'Médicament',
        ...(medication.barcode && {
          'gtin13': medication.barcode,
          'productID': medication.barcode
        }),
        'additionalProperty': [
          {
            '@type': 'PropertyValue',
            'name': 'Forme pharmaceutique',
            'value': medication.forme || 'N/A'
          },
          {
            '@type': 'PropertyValue',
            'name': 'Dosage',
            'value': medication.dosage || 'N/A'
          },
          ...(medication.ph ? [{
            '@type': 'PropertyValue',
            'name': 'Prix Hospitalier',
            'value': `${medication.ph} MAD`
          }] : [])
        ]
      },
      // MedicalWebPage Schema
      {
        '@type': 'MedicalWebPage',
        'name': `Prix ${medication.name} - Information Médicament Maroc`,
        'description': `Consultez le prix officiel du ${medication.name} au Maroc. Prix pharmacie (PPV): ${medication.ppv} MAD${medication.ph ? `, Prix hôpital: ${medication.ph} MAD` : ''}. Informations sur le remboursement CNOPS et CNSS.`,
        'mainEntity': {
          '@type': 'Drug',
          'name': medication.name,
          'activeIngredient': medication.dci || medication.name,
          'dosageForm': medication.forme,
          'administrationRoute': medication.forme,
          'isAvailableGenerically': medication.dci ? true : false
        },
        'medicalAudience': [
          {
            '@type': 'MedicalAudience',
            'name': 'Patients'
          },
          {
            '@type': 'MedicalAudience',
            'name': 'Pharmaciens'
          }
        ],
        'reviewedBy': {
          '@type': 'Organization',
          'name': 'Ministère de la Santé du Maroc'
        },
        'about': {
          '@type': 'MedicalCondition',
          'name': medication.classe_therapeutique || 'Traitement médical'
        }
      },
      // Organization Schema
      {
        '@type': 'Organization',
        'name': 'Taawidaty',
        'url': baseUrl,
        'logo': `${baseUrl}/logos/logo.svg`,
        'description': 'Calculateur de remboursement CNOPS et CNSS pour les médicaments au Maroc. Trouvez les prix officiels des médicaments.',
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'customer service',
          'availableLanguage': ['French', 'Arabic']
        }
      }
    ]
  };
}

/**
 * Generate meta description for medication
 * Optimized for Google search snippets (150-160 chars)
 */
export function generateMetaDescription(medication: Medication): string {
  const price = `${medication.ppv} MAD`;
  const dosage = medication.dosage ? ` ${medication.dosage}` : '';
  const forme = medication.forme ? ` ${medication.forme}` : '';
  
  return `Prix ${medication.name}${dosage}${forme}: ${price}. Comparez les prix en pharmacie et hôpital au Maroc. Calculez votre remboursement CNOPS/CNSS.`;
}

/**
 * Generate page title for medication
 * Optimized for Google search results (50-60 chars)
 */
export function generatePageTitle(medication: Medication): string {
  const dosage = medication.dosage ? ` ${medication.dosage}` : '';
  return `${medication.name}${dosage} Prix - ${medication.ppv} MAD | Taawidaty`;
}

/**
 * Generate keywords for medication SEO
 */
export function generateKeywords(medication: Medication): string {
  const keywords = [
    medication.name.toLowerCase(),
    `${medication.name.toLowerCase()} prix`,
    `${medication.name.toLowerCase()} maroc`,
    `prix ${medication.name.toLowerCase()}`,
    'médicament maroc',
    'prix médicament',
    'pharmacie maroc',
    'remboursement cnops',
    'remboursement cnss'
  ];

  if (medication.dci) {
    keywords.push(
      medication.dci.toLowerCase(),
      `${medication.dci.toLowerCase()} prix`
    );
  }

  if (medication.dosage) {
    keywords.push(
      `${medication.name.toLowerCase()} ${medication.dosage.toLowerCase()}`,
      `${medication.name.toLowerCase()} ${medication.dosage.toLowerCase()} prix`
    );
  }

  return keywords.join(', ');
}

/**
 * Generate Open Graph data for social sharing
 */
export function generateOpenGraphData(medication: Medication) {
  const baseUrl = 'https://taawidaty.ma';
  
  return {
    'og:title': generatePageTitle(medication),
    'og:description': generateMetaDescription(medication),
    'og:type': 'product',
    'og:url': `${baseUrl}/prix/${generateMedicationSlug(medication.name)}`,
    'og:site_name': 'Taawidaty',
    'og:locale': 'fr_MA',
    'og:locale:alternate': 'ar_MA',
    'product:price:amount': medication.ppv,
    'product:price:currency': 'MAD',
    'product:brand': medication.name.split(' ')[0],
    'product:availability': 'in stock'
  };
}

/**
 * Generate Twitter Card data
 */
export function generateTwitterCardData(medication: Medication) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': generatePageTitle(medication),
    'twitter:description': generateMetaDescription(medication),
    'twitter:site': '@taawidaty' // Update with your Twitter handle
  };
}

/**
 * Generate FAQ structured data for common medication questions
 */
export function generateFAQStructuredData(medication: Medication) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `Quel est le prix du ${medication.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Le prix public de vente (PPV) du ${medication.name} est de ${medication.ppv} MAD en pharmacie au Maroc.`
        }
      },
      {
        '@type': 'Question',
        'name': `Le ${medication.name} est-il remboursé par la CNOPS?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Utilisez notre calculateur de remboursement pour vérifier si le ${medication.name} est remboursé par la CNOPS et calculer le montant de votre remboursement.`
        }
      },
      {
        '@type': 'Question',
        'name': `Où acheter ${medication.name} au Maroc?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Le ${medication.name} est disponible dans toutes les pharmacies au Maroc au prix officiel de ${medication.ppv} MAD.`
        }
      }
    ]
  };
}

/**
 * Generate BreadcrumbList for better navigation understanding
 */
export function generateBreadcrumbStructuredData(medication: Medication) {
  const baseUrl = 'https://taawidaty.ma';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Accueil',
        'item': baseUrl
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Prix des Médicaments',
        'item': `${baseUrl}/prix`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': medication.name,
        'item': `${baseUrl}/prix/${generateMedicationSlug(medication.name)}`
      }
    ]
  };
}
