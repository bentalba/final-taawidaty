/**
 * Google Analytics 4 Integration
 * Event tracking, conversion tracking, and user flow analytics
 */

// GA4 Measurement ID (replace with your actual ID)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Initialize Google Analytics 4
 */
export function initGA4() {
  if (typeof window === 'undefined') return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('[Analytics] GA4 initialized');
}

/**
 * Track page views
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Custom event tracking
 */
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export function trackEvent({ category, action, label, value }: AnalyticsEvent) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });

  console.log('[Analytics] Event tracked:', { category, action, label, value });
}

/**
 * Calculator-specific events
 */
export const CalculatorEvents = {
  // Insurance selection
  insuranceSelected: (insuranceType: 'cnops' | 'cnss') => {
    trackEvent({
      category: 'Calculator',
      action: 'insurance_selected',
      label: insuranceType.toUpperCase(),
    });
  },

  // Step navigation
  stepCompleted: (stepNumber: number, stepName: string) => {
    trackEvent({
      category: 'Calculator',
      action: 'step_completed',
      label: stepName,
      value: stepNumber,
    });
  },

  // Calculation
  calculationStarted: () => {
    trackEvent({
      category: 'Calculator',
      action: 'calculation_started',
    });
  },

  calculationCompleted: (insuranceType: string, reimbursementAmount: number) => {
    trackEvent({
      category: 'Calculator',
      action: 'calculation_completed',
      label: insuranceType,
      value: Math.round(reimbursementAmount),
    });
  },

  // Results actions
  resultsShared: (method: 'native' | 'copy') => {
    trackEvent({
      category: 'Results',
      action: 'results_shared',
      label: method,
    });
  },

  resultsDownloaded: () => {
    trackEvent({
      category: 'Results',
      action: 'results_downloaded',
    });
  },

  resultsPrinted: () => {
    trackEvent({
      category: 'Results',
      action: 'results_printed',
    });
  },

  newCalculationStarted: () => {
    trackEvent({
      category: 'Results',
      action: 'new_calculation_started',
    });
  },
};

/**
 * User interaction events
 */
export const UserEvents = {
  // Language
  languageChanged: (from: string, to: string) => {
    trackEvent({
      category: 'User',
      action: 'language_changed',
      label: `${from} -> ${to}`,
    });
  },

  // Search
  medicationSearched: (query: string, resultsCount: number) => {
    trackEvent({
      category: 'Search',
      action: 'medication_searched',
      label: query,
      value: resultsCount,
    });
  },

  medicationSelected: (medicationName: string) => {
    trackEvent({
      category: 'Search',
      action: 'medication_selected',
      label: medicationName,
    });
  },

  // FAQ
  faqQuestionOpened: (question: string) => {
    trackEvent({
      category: 'FAQ',
      action: 'question_opened',
      label: question,
    });
  },

  faqSearched: (query: string) => {
    trackEvent({
      category: 'FAQ',
      action: 'faq_searched',
      label: query,
    });
  },

  faqCategorySelected: (category: string) => {
    trackEvent({
      category: 'FAQ',
      action: 'category_selected',
      label: category,
    });
  },
};

/**
 * Conversion tracking
 */
export const Conversions = {
  // Primary conversion: Complete calculation
  calculationCompleted: (value: number) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/calculation_complete`,
      value: value,
      currency: 'MAD',
    });
  },

  // Secondary conversions
  emailSignup: () => {
    trackEvent({
      category: 'Conversion',
      action: 'email_signup',
    });
  },

  contactFormSubmitted: () => {
    trackEvent({
      category: 'Conversion',
      action: 'contact_form_submitted',
    });
  },

  appInstalled: () => {
    trackEvent({
      category: 'Conversion',
      action: 'app_installed',
    });
  },
};

/**
 * Error tracking
 */
export const ErrorTracking = {
  trackError: (error: Error, context?: string) => {
    trackEvent({
      category: 'Error',
      action: 'error_occurred',
      label: `${context || 'Unknown'}: ${error.message}`,
    });
  },

  track404: (path: string) => {
    trackEvent({
      category: 'Error',
      action: '404_not_found',
      label: path,
    });
  },

  trackCalculationError: (errorType: string) => {
    trackEvent({
      category: 'Error',
      action: 'calculation_error',
      label: errorType,
    });
  },
};

/**
 * Performance tracking
 */
export const PerformanceTracking = {
  trackWebVital: (name: string, value: number, rating: string) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', name, {
      value: Math.round(value),
      metric_rating: rating,
      event_category: 'Web Vitals',
    });
  },

  trackLoadTime: (loadTime: number) => {
    trackEvent({
      category: 'Performance',
      action: 'page_load_time',
      value: Math.round(loadTime),
    });
  },

  trackSearchTime: (searchTime: number) => {
    trackEvent({
      category: 'Performance',
      action: 'search_time',
      value: Math.round(searchTime),
    });
  },
};

/**
 * User flow tracking
 */
export const UserFlowTracking = {
  startSession: () => {
    trackEvent({
      category: 'Session',
      action: 'session_started',
    });
  },

  endSession: (duration: number) => {
    trackEvent({
      category: 'Session',
      action: 'session_ended',
      value: Math.round(duration / 1000), // Convert to seconds
    });
  },

  trackUserJourney: (steps: string[]) => {
    trackEvent({
      category: 'User Journey',
      action: 'journey_completed',
      label: steps.join(' > '),
      value: steps.length,
    });
  },
};

/**
 * E-commerce tracking (for future monetization)
 */
export const EcommerceTracking = {
  viewItem: (itemId: string, itemName: string, price: number) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', 'view_item', {
      currency: 'MAD',
      value: price,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price: price,
        },
      ],
    });
  },

  addToCart: (itemId: string, itemName: string, price: number) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', 'add_to_cart', {
      currency: 'MAD',
      value: price,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price: price,
        },
      ],
    });
  },

  purchase: (transactionId: string, value: number, items: any[]) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      currency: 'MAD',
      value: value,
      items: items,
    });
  },
};

/**
 * User properties
 */
export function setUserProperties(properties: {
  userId?: string;
  insuranceType?: 'cnops' | 'cnss';
  language?: 'fr' | 'ar';
  isReturningUser?: boolean;
}) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('set', 'user_properties', properties);
}

/**
 * Consent management (GDPR/Cookie compliance)
 */
export function updateConsent(granted: boolean) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
  });
}

// Type augmentation for window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default {
  initGA4,
  trackPageView,
  trackEvent,
  CalculatorEvents,
  UserEvents,
  Conversions,
  ErrorTracking,
  PerformanceTracking,
  UserFlowTracking,
  EcommerceTracking,
  setUserProperties,
  updateConsent,
};
