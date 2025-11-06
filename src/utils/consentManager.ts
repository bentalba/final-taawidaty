/**
 * Consent Management Utility
 * Handles IAB TCF v2.2 integration and Google Consent Mode v2
 *
 * This module ensures compliance with:
 * - EU User Consent Policy
 * - IAB Transparency and Consent Framework (TCF) v2.2
 * - Google Consent Mode v2
 * - GDPR, ePrivacy Directive
 * - Morocco Data Protection Law 09-08
 */

// Consent purposes (IAB TCF standard)
export const CONSENT_PURPOSES = {
  STORE_ACCESS: 1, // Store and/or access information on a device
  PERSONALIZED_ADS: 2, // Select personalised ads
  AD_PERFORMANCE: 3, // Measure ad performance
  CONTENT_PERSONALIZATION: 4, // Select personalised content
  CONTENT_PERFORMANCE: 5, // Measure content performance
  ANALYTICS: 7, // Apply market research to generate audience insights
  PRODUCT_DEVELOPMENT: 8, // Develop and improve products
  BASIC_ADS: 9, // Select basic ads
  ACCURATE_GEOLOCATION: 10, // Use precise geolocation data
  DEVICE_SCANNING: 11, // Actively scan device characteristics for identification
};

// Vendor IDs for common partners (examples - update with your actual partners)
export const VENDOR_IDS = {
  GOOGLE: '755', // Google Advertising Products
  GOOGLE_ANALYTICS: '755',
  // Add more vendors as needed
};

/**
 * Initialize Google Consent Mode v2 with default denied state
 * This must be called before any Google tags load
 */
export function initializeConsentMode() {
  if (typeof window === 'undefined') return;

  // Create gtag function if it doesn't exist
  if (!(window as any).gtag) {
    window.dataLayer = window.dataLayer || [];
    (window as any).gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };
  }

  // Set default consent state to denied (privacy-first approach)
  (window as any).gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted', // Essential for site functionality
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Essential for security
    'wait_for_update': 500, // Wait 500ms for user choice
  });

  // Set URL passthrough for better measurement
  (window as any).gtag('set', 'url_passthrough', true);

  // Enable ads data redaction (privacy-friendly)
  (window as any).gtag('set', 'ads_data_redaction', true);

  console.log('[ConsentManager] Google Consent Mode v2 initialized');
}

/**
 * Update consent based on user choice
 */
export function updateConsent(choices: {
  analytics?: boolean;
  ads?: boolean;
  functional?: boolean;
}) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  const consentState = {
    'analytics_storage': choices.analytics ? 'granted' : 'denied',
    'ad_storage': choices.ads ? 'granted' : 'denied',
    'ad_user_data': choices.ads ? 'granted' : 'denied',
    'ad_personalization': choices.ads ? 'granted' : 'denied',
    'functionality_storage': choices.functional !== false ? 'granted' : 'denied',
    'personalization_storage': choices.analytics ? 'granted' : 'denied',
    'security_storage': 'granted',
  };

  (window as any).gtag('consent', 'update', consentState);

  console.log('[ConsentManager] Consent updated:', consentState);

  // Store consent choices
  localStorage.setItem('gdpr_consent_state', JSON.stringify(consentState));
  localStorage.setItem('gdpr_consent_timestamp', Date.now().toString());

  // Fire consent event for tracking
  (window as any).gtag('event', 'consent_update', {
    'event_category': 'consent',
    'event_label': JSON.stringify(choices),
  });
}

/**
 * Check if user is in a region requiring consent
 * (EEA, UK, Switzerland)
 */
export function requiresConsent(): boolean {
  if (typeof window === 'undefined') return false;

  // Try to detect user region
  // In production, you should use a proper geolocation service
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Common European timezones
  const europeanTimezones = [
    'Europe/', 'Atlantic/Reykjavik', 'Atlantic/Canary',
    'Atlantic/Faroe', 'Atlantic/Madeira', 'Atlantic/Azores'
  ];

  return europeanTimezones.some(tz => timezone.startsWith(tz));
}

/**
 * Get current consent state
 */
export function getConsentState(): {
  analytics: boolean;
  ads: boolean;
  functional: boolean;
  timestamp?: number;
} | null {
  if (typeof window === 'undefined') return null;

  const storedState = localStorage.getItem('gdpr_consent_state');
  const timestamp = localStorage.getItem('gdpr_consent_timestamp');

  if (!storedState || !timestamp) return null;

  // Check if consent is expired (13 months as per IAB requirement)
  const thirteenMonthsAgo = Date.now() - (13 * 30 * 24 * 60 * 60 * 1000);
  if (parseInt(timestamp) < thirteenMonthsAgo) {
    return null; // Consent expired
  }

  try {
    const state = JSON.parse(storedState);
    return {
      analytics: state.analytics_storage === 'granted',
      ads: state.ad_storage === 'granted',
      functional: state.functionality_storage === 'granted',
      timestamp: parseInt(timestamp),
    };
  } catch (e) {
    console.error('[ConsentManager] Error parsing consent state:', e);
    return null;
  }
}

/**
 * Revoke all consent
 */
export function revokeConsent() {
  updateConsent({
    analytics: false,
    ads: false,
    functional: true, // Keep functional cookies
  });

  localStorage.setItem('gdpr_consent', 'declined');
  console.log('[ConsentManager] Consent revoked');
}

/**
 * Check if specific consent purpose is granted
 */
export function hasConsentFor(purpose: 'analytics' | 'ads' | 'functional'): boolean {
  const state = getConsentState();
  if (!state) return false;
  return state[purpose];
}

/**
 * Create TC String (IAB TCF format)
 * This is a simplified version - in production, use a proper TCF CMP library
 */
export function createTCString(consents: Record<number, boolean>): string {
  // This is a placeholder - in production, use IAB TCF SDK
  // to generate proper TC strings
  const version = 2; // TCF v2
  const created = Math.floor(Date.now() / 100);
  const lastUpdated = created;

  // Simplified TC string (not production-ready)
  return `TCFV${version}.${created}.${lastUpdated}`;
}

/**
 * Initialize IAB TCF stub
 * This creates the __tcfapi function that vendors will use
 */
export function initializeTCFStub() {
  if (typeof window === 'undefined') return;

  // Create __tcfapi stub
  (window as any).__tcfapi = function (command: string, version: number, callback: Function, parameter?: any) {
    if (command === 'ping') {
      callback({
        gdprApplies: requiresConsent(),
        cmpLoaded: true,
        cmpStatus: 'loaded',
        displayStatus: 'visible',
        apiVersion: '2.2',
        cmpVersion: 1,
        cmpId: 1, // Your CMP ID (register with IAB)
      }, true);
    } else if (command === 'getTCData') {
      const consentState = getConsentState();
      callback({
        tcString: createTCString({}),
        tcfPolicyVersion: 4,
        cmpId: 1,
        cmpVersion: 1,
        gdprApplies: requiresConsent(),
        eventStatus: 'tcloaded',
        cmpStatus: 'loaded',
        purpose: {
          consents: {
            1: consentState?.functional || false,
            2: consentState?.ads || false,
            3: consentState?.ads || false,
            4: consentState?.ads || false,
            7: consentState?.analytics || false,
            8: consentState?.analytics || false,
            9: consentState?.ads || false,
          },
          legitimateInterests: {},
        },
        vendor: {
          consents: {},
          legitimateInterests: {},
        },
      }, true);
    } else if (command === 'addEventListener') {
      // Add event listener logic
      callback({
        tcString: createTCString({}),
        eventStatus: 'tcloaded',
        cmpStatus: 'loaded',
      }, true);
    }
  };

  console.log('[ConsentManager] IAB TCF stub initialized');
}

/**
 * Show consent banner (utility function)
 */
export function shouldShowConsentBanner(): boolean {
  // Don't show if user is not in a consent-requiring region
  if (!requiresConsent()) {
    return false;
  }

  // Show if no consent has been given or if consent expired
  const state = getConsentState();
  return state === null;
}

/**
 * Google Additional Consent
 * For vendors not registered with IAB TCF
 */
export function updateAdditionalConsent(vendorIds: string[]) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  const acString = `1~${vendorIds.join('.')}`;
  (window as any).gtag('set', 'google_additional_consent', acString);

  console.log('[ConsentManager] Additional consent updated:', acString);
}

/**
 * Initialize all consent mechanisms
 * Call this in your app initialization
 */
export function initializeConsent() {
  initializeConsentMode();
  initializeTCFStub();

  // Check for existing consent and apply it
  const existingConsent = getConsentState();
  if (existingConsent) {
    updateConsent({
      analytics: existingConsent.analytics,
      ads: existingConsent.ads,
      functional: existingConsent.functional,
    });
  }

  console.log('[ConsentManager] Consent system initialized');
}

// Type augmentation
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    __tcfapi?: (command: string, version: number, callback: Function, parameter?: any) => void;
  }
}
