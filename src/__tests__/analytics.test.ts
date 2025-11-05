/**
 * Analytics Tests
 * Unit tests for analytics tracking utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initGA4,
  trackPageView,
  trackEvent,
  CalculatorEvents,
  UserEvents,
  Conversions,
  ErrorTracking,
  PerformanceTracking,
  setUserProperties,
  updateConsent,
} from '../utils/analytics';

// Mock window.gtag
const mockGtag = vi.fn();

describe('Analytics Initialization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete (window as any).gtag;
    delete (window as any).dataLayer;
  });

  it('should initialize GA4 correctly', () => {
    initGA4();
    expect(window.dataLayer).toBeDefined();
  });

  it('should load gtag script', () => {
    initGA4();
    const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('should not initialize in non-browser environment', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    
    initGA4();
    expect(window.dataLayer).toBeUndefined();
    
    // @ts-ignore
    global.window = originalWindow;
  });
});

describe('Page View Tracking', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    (window as any).dataLayer = [];
  });

  it('should track page view with path', () => {
    trackPageView('/calculator');
    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_path: '/calculator',
    }));
  });

  it('should track page view with custom title', () => {
    trackPageView('/calculator', 'Medication Calculator');
    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_title: 'Medication Calculator',
    }));
  });

  it('should not track without gtag', () => {
    delete (window as any).gtag;
    expect(() => trackPageView('/test')).not.toThrow();
  });
});

describe('Event Tracking', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    (window as any).dataLayer = [];
    vi.clearAllMocks();
  });

  it('should track custom event', () => {
    trackEvent({
      category: 'Test',
      action: 'test_action',
      label: 'test_label',
      value: 100,
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'test_action', {
      event_category: 'Test',
      event_label: 'test_label',
      value: 100,
    });
  });

  it('should track event without optional parameters', () => {
    trackEvent({
      category: 'Test',
      action: 'simple_action',
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'simple_action', expect.objectContaining({
      event_category: 'Test',
    }));
  });
});

describe('Calculator Events', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should track insurance selection', () => {
    CalculatorEvents.insuranceSelected('cnops');
    expect(mockGtag).toHaveBeenCalledWith('event', 'insurance_selected', expect.objectContaining({
      event_label: 'CNOPS',
    }));
  });

  it('should track step completion', () => {
    CalculatorEvents.stepCompleted(2, 'Medication Selection');
    expect(mockGtag).toHaveBeenCalledWith('event', 'step_completed', expect.objectContaining({
      event_label: 'Medication Selection',
      value: 2,
    }));
  });

  it('should track calculation start', () => {
    CalculatorEvents.calculationStarted();
    expect(mockGtag).toHaveBeenCalledWith('event', 'calculation_started', expect.any(Object));
  });

  it('should track calculation completion', () => {
    CalculatorEvents.calculationCompleted('cnss', 250.50);
    expect(mockGtag).toHaveBeenCalledWith('event', 'calculation_completed', expect.objectContaining({
      event_label: 'cnss',
      value: 251, // Rounded
    }));
  });

  it('should track results sharing', () => {
    CalculatorEvents.resultsShared('copy');
    expect(mockGtag).toHaveBeenCalledWith('event', 'results_shared', expect.objectContaining({
      event_label: 'copy',
    }));
  });

  it('should track results download', () => {
    CalculatorEvents.resultsDownloaded();
    expect(mockGtag).toHaveBeenCalledWith('event', 'results_downloaded', expect.any(Object));
  });

  it('should track results print', () => {
    CalculatorEvents.resultsPrinted();
    expect(mockGtag).toHaveBeenCalledWith('event', 'results_printed', expect.any(Object));
  });

  it('should track new calculation', () => {
    CalculatorEvents.newCalculationStarted();
    expect(mockGtag).toHaveBeenCalledWith('event', 'new_calculation_started', expect.any(Object));
  });
});

describe('User Events', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should track language change', () => {
    UserEvents.languageChanged('fr', 'ar');
    expect(mockGtag).toHaveBeenCalledWith('event', 'language_changed', expect.objectContaining({
      event_label: 'fr -> ar',
    }));
  });

  it('should track medication search', () => {
    UserEvents.medicationSearched('doliprane', 5);
    expect(mockGtag).toHaveBeenCalledWith('event', 'medication_searched', expect.objectContaining({
      event_label: 'doliprane',
      value: 5,
    }));
  });

  it('should track medication selection', () => {
    UserEvents.medicationSelected('DOLIPRANE 500MG');
    expect(mockGtag).toHaveBeenCalledWith('event', 'medication_selected', expect.objectContaining({
      event_label: 'DOLIPRANE 500MG',
    }));
  });

  it('should track FAQ question open', () => {
    UserEvents.faqQuestionOpened('Comment calculer le remboursement?');
    expect(mockGtag).toHaveBeenCalledWith('event', 'question_opened', expect.objectContaining({
      event_label: 'Comment calculer le remboursement?',
    }));
  });

  it('should track FAQ search', () => {
    UserEvents.faqSearched('remboursement');
    expect(mockGtag).toHaveBeenCalledWith('event', 'faq_searched', expect.objectContaining({
      event_label: 'remboursement',
    }));
  });

  it('should track FAQ category selection', () => {
    UserEvents.faqCategorySelected('CNOPS');
    expect(mockGtag).toHaveBeenCalledWith('event', 'category_selected', expect.objectContaining({
      event_label: 'CNOPS',
    }));
  });
});

describe('Conversion Tracking', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should track calculation conversion', () => {
    Conversions.calculationCompleted(500);
    expect(mockGtag).toHaveBeenCalledWith('event', 'conversion', expect.objectContaining({
      value: 500,
      currency: 'MAD',
    }));
  });

  it('should track email signup', () => {
    Conversions.emailSignup();
    expect(mockGtag).toHaveBeenCalledWith('event', 'email_signup', expect.any(Object));
  });

  it('should track contact form submission', () => {
    Conversions.contactFormSubmitted();
    expect(mockGtag).toHaveBeenCalledWith('event', 'contact_form_submitted', expect.any(Object));
  });

  it('should track app install', () => {
    Conversions.appInstalled();
    expect(mockGtag).toHaveBeenCalledWith('event', 'app_installed', expect.any(Object));
  });
});

describe('Error Tracking', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should track generic error', () => {
    const error = new Error('Test error');
    ErrorTracking.trackError(error, 'Calculator');
    expect(mockGtag).toHaveBeenCalledWith('event', 'error_occurred', expect.objectContaining({
      event_label: 'Calculator: Test error',
    }));
  });

  it('should track 404 error', () => {
    ErrorTracking.track404('/nonexistent');
    expect(mockGtag).toHaveBeenCalledWith('event', '404_not_found', expect.objectContaining({
      event_label: '/nonexistent',
    }));
  });

  it('should track calculation error', () => {
    ErrorTracking.trackCalculationError('Invalid medication');
    expect(mockGtag).toHaveBeenCalledWith('event', 'calculation_error', expect.objectContaining({
      event_label: 'Invalid medication',
    }));
  });
});

describe('Performance Tracking', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should track web vital', () => {
    PerformanceTracking.trackWebVital('LCP', 2345.67, 'good');
    expect(mockGtag).toHaveBeenCalledWith('event', 'LCP', {
      value: 2346, // Rounded
      metric_rating: 'good',
      event_category: 'Web Vitals',
    });
  });

  it('should track load time', () => {
    PerformanceTracking.trackLoadTime(1234.56);
    expect(mockGtag).toHaveBeenCalledWith('event', 'page_load_time', expect.objectContaining({
      value: 1235, // Rounded
    }));
  });

  it('should track search time', () => {
    PerformanceTracking.trackSearchTime(123.45);
    expect(mockGtag).toHaveBeenCalledWith('event', 'search_time', expect.objectContaining({
      value: 123, // Rounded
    }));
  });
});

describe('User Properties', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should set user properties', () => {
    setUserProperties({
      userId: 'user123',
      insuranceType: 'cnops',
      language: 'fr',
      isReturningUser: true,
    });

    expect(mockGtag).toHaveBeenCalledWith('set', 'user_properties', {
      userId: 'user123',
      insuranceType: 'cnops',
      language: 'fr',
      isReturningUser: true,
    });
  });

  it('should handle partial properties', () => {
    setUserProperties({
      language: 'ar',
    });

    expect(mockGtag).toHaveBeenCalledWith('set', 'user_properties', {
      language: 'ar',
    });
  });
});

describe('Consent Management', () => {
  beforeEach(() => {
    (window as any).gtag = mockGtag;
    vi.clearAllMocks();
  });

  it('should grant consent', () => {
    updateConsent(true);
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  });

  it('should deny consent', () => {
    updateConsent(false);
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    });
  });
});
