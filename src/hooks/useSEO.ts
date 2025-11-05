/**
 * useSEO Hook
 * React hook for managing SEO meta tags and structured data
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  updateMetaTags,
  generateWebApplicationData,
  generateOrganizationData,
  generateBreadcrumbData,
  generateFAQPageData,
  generateHowToData,
  SEOConfigs,
  SEOConfig,
} from '../utils/seo';

/**
 * Main SEO hook
 */
export function useSEO(config: SEOConfig, locale: 'fr' | 'ar' = 'fr') {
  useEffect(() => {
    updateMetaTags(config);
  }, [config]);

  useEffect(() => {
    // Add organization data on every page
    generateOrganizationData();
    
    // Add web application data
    generateWebApplicationData(locale);
  }, [locale]);
}

/**
 * Hook for page-specific SEO
 */
export function usePageSEO(page: 'home' | 'calculator' | 'faqCNOPS' | 'faqCNSS', locale: 'fr' | 'ar' = 'fr') {
  const location = useLocation();

  useEffect(() => {
    const config = SEOConfigs[page](locale);
    updateMetaTags(config);
    
    // Add organization data
    generateOrganizationData();
    
    // Add web application data
    generateWebApplicationData(locale);
    
    // Add breadcrumbs
    const breadcrumbs = generateBreadcrumbsForPage(page, locale);
    if (breadcrumbs.length > 0) {
      generateBreadcrumbData(breadcrumbs);
    }
    
    // Add page-specific structured data
    if (page === 'calculator') {
      generateHowToData(locale);
    }
  }, [page, locale, location]);
}

/**
 * Hook for FAQ pages with structured data
 */
export function useFAQSEO(
  page: 'faqCNOPS' | 'faqCNSS',
  faqs: { question: string; answer: string }[],
  locale: 'fr' | 'ar' = 'fr'
) {
  useEffect(() => {
    const config = SEOConfigs[page](locale);
    updateMetaTags(config);
    
    // Add FAQ structured data
    if (faqs.length > 0) {
      generateFAQPageData(faqs);
    }
    
    // Add organization data
    generateOrganizationData();
  }, [page, faqs, locale]);
}

/**
 * Generate breadcrumbs for different pages
 */
function generateBreadcrumbsForPage(page: string, locale: 'fr' | 'ar'): { name: string; url: string }[] {
  const baseUrl = 'https://taawidaty.ma';
  const homeName = locale === 'fr' ? 'Accueil' : 'الرئيسية';
  
  const breadcrumbs: { name: string; url: string }[] = [
    { name: homeName, url: baseUrl },
  ];

  switch (page) {
    case 'calculator':
      breadcrumbs.push({
        name: locale === 'fr' ? 'Calculateur' : 'حاسبة',
        url: `${baseUrl}/calculator`,
      });
      break;
    case 'faqCNOPS':
      breadcrumbs.push({
        name: locale === 'fr' ? 'FAQ CNOPS' : 'أسئلة CNOPS',
        url: `${baseUrl}/faq-cnops`,
      });
      break;
    case 'faqCNSS':
      breadcrumbs.push({
        name: locale === 'fr' ? 'FAQ CNSS' : 'أسئلة CNSS',
        url: `${baseUrl}/faq-cnss`,
      });
      break;
  }

  return breadcrumbs;
}

/**
 * Hook for social sharing
 */
export function useSocialSharing() {
  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp', url?: string, text?: string) => {
    const shareUrl = url || window.location.href;
    const shareText = text || document.title;
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const nativeShare = async (data?: { title?: string; text?: string; url?: string }) => {
    if (!navigator.share) {
      return false;
    }

    try {
      await navigator.share({
        title: data?.title || document.title,
        text: data?.text || '',
        url: data?.url || window.location.href,
      });
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  };

  return {
    shareOnSocial,
    nativeShare,
    canNativeShare: typeof navigator !== 'undefined' && !!navigator.share,
  };
}

/**
 * Hook for canonical URLs and alternate language links
 */
export function useCanonicalAndAlternate(path: string, currentLocale: 'fr' | 'ar') {
  useEffect(() => {
    const baseUrl = 'https://taawidaty.ma';
    const canonicalUrl = `${baseUrl}${path}`;
    
    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    
    // Update alternate language links
    const alternateLocale = currentLocale === 'fr' ? 'ar' : 'fr';
    
    // Remove existing alternate links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Add French alternate
    const frLink = document.createElement('link');
    frLink.rel = 'alternate';
    frLink.hreflang = 'fr';
    frLink.href = `${canonicalUrl}?lang=fr`;
    document.head.appendChild(frLink);
    
    // Add Arabic alternate
    const arLink = document.createElement('link');
    arLink.rel = 'alternate';
    arLink.hreflang = 'ar';
    arLink.href = `${canonicalUrl}?lang=ar`;
    document.head.appendChild(arLink);
    
    // Add x-default
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = canonicalUrl;
    document.head.appendChild(defaultLink);
  }, [path, currentLocale]);
}

export { SEOConfigs };
