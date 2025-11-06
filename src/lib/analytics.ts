/**
 * Analytics & Tracking System
 * Medical-grade analytics for TAAWIDATY
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  custom?: Record<string, any>;
}

interface CalculationData {
  insuranceType: 'cnops' | 'cnss';
  medicationId: string;
  originalPrice: number;
  savings: number;
  duration: number;
}

class Analytics {
  private initialized = false;
  private queue: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  /**
   * Initialize analytics
   */
  initialize() {
    if (typeof window === 'undefined') return;

    // Check if Google Analytics is available
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          dimension1: 'insurance_type',
          dimension2: 'medication_category',
          dimension3: 'session_id',
        },
      });

      this.initialized = true;

      // Process queued events
      this.queue.forEach((event) => this.track(event));
      this.queue = [];
    }

    // Track page load
    this.trackPageView();
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track generic event
   */
  track(event: AnalyticsEvent): void {
    // Queue events if not initialized
    if (!this.initialized && typeof window !== 'undefined') {
      this.queue.push(event);
      return;
    }

    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        session_id: this.sessionId,
        ...event.custom,
      });
    }

    // Send to custom backend (if available)
    this.sendToBackend(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics:', event);
    }
  }

  /**
   * Track page view
   */
  trackPageView(path?: string): void {
    if (typeof window === 'undefined') return;

    const pagePath = path || window.location.pathname;

    this.track({
      category: 'Navigation',
      action: 'page_view',
      label: pagePath,
      custom: {
        page_path: pagePath,
        page_title: document.title,
        referrer: document.referrer,
      },
    });
  }

  /**
   * Track calculation completion
   */
  trackCalculation(data: CalculationData): void {
    this.track({
      category: 'Calculator',
      action: 'calculation_completed',
      label: `${data.insuranceType}_${data.medicationId}`,
      value: Math.round(data.savings),
      custom: {
        insurance_type: data.insuranceType,
        medication_id: data.medicationId,
        original_price: data.originalPrice,
        savings_amount: data.savings,
        duration_seconds: data.duration,
      },
    });

    // Track conversion value
    this.trackConversion('calculate', data.savings);
  }

  /**
   * Track form step completion
   */
  trackFormStep(step: number, stepName: string, timeSpent: number): void {
    this.track({
      category: 'Form',
      action: 'step_completed',
      label: stepName,
      value: step,
      custom: {
        step_number: step,
        step_name: stepName,
        time_spent_seconds: Math.round(timeSpent / 1000),
      },
    });
  }

  /**
   * Track form abandonment
   */
  trackFormAbandonment(step: number, stepName: string): void {
    this.track({
      category: 'Form',
      action: 'form_abandoned',
      label: stepName,
      value: step,
      custom: {
        step_number: step,
        step_name: stepName,
      },
    });
  }

  /**
   * Track medication search
   */
  trackSearch(query: string, resultCount: number): void {
    this.track({
      category: 'Search',
      action: 'medication_search',
      label: query,
      value: resultCount,
      custom: {
        search_query: query,
        result_count: resultCount,
      },
    });
  }

  /**
   * Track medication selection
   */
  trackMedicationSelect(
    medicationId: string,
    medicationName: string,
    position: number
  ): void {
    this.track({
      category: 'Search',
      action: 'medication_selected',
      label: medicationName,
      value: position,
      custom: {
        medication_id: medicationId,
        medication_name: medicationName,
        selection_position: position,
      },
    });
  }

  /**
   * Track user interaction
   */
  trackInteraction(element: string, action: string): void {
    this.track({
      category: 'Interaction',
      action: action,
      label: element,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error, context: string): void {
    this.track({
      category: 'Error',
      action: 'error_occurred',
      label: `${context}: ${error.message}`,
      custom: {
        error_message: error.message,
        error_stack: error.stack,
        error_context: context,
      },
    });

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', { error, context });
    }
  }

  /**
   * Track conversion
   */
  trackConversion(type: string, value: number): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID', // Replace with actual conversion ID
        value: value,
        currency: 'MAD',
        transaction_id: this.sessionId,
      });
    }

    this.track({
      category: 'Conversion',
      action: type,
      value: Math.round(value),
    });
  }

  /**
   * Track share action
   */
  trackShare(method: string, content: string): void {
    this.track({
      category: 'Social',
      action: 'share',
      label: method,
      custom: {
        share_method: method,
        shared_content: content,
      },
    });
  }

  /**
   * Track download
   */
  trackDownload(filename: string): void {
    this.track({
      category: 'Download',
      action: 'file_download',
      label: filename,
    });
  }

  /**
   * Track language change
   */
  trackLanguageChange(from: string, to: string): void {
    this.track({
      category: 'Settings',
      action: 'language_changed',
      label: `${from}_to_${to}`,
      custom: {
        previous_language: from,
        new_language: to,
      },
    });
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(path: string, timeSeconds: number): void {
    this.track({
      category: 'Engagement',
      action: 'time_on_page',
      label: path,
      value: Math.round(timeSeconds),
      custom: {
        page_path: path,
        time_seconds: timeSeconds,
      },
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage: number): void {
    const milestone = Math.floor(percentage / 25) * 25; // 0, 25, 50, 75, 100

    this.track({
      category: 'Engagement',
      action: 'scroll_depth',
      label: `${milestone}%`,
      value: milestone,
    });
  }

  /**
   * Send event to custom backend
   * Disabled: No analytics backend configured
   */
  private async sendToBackend(event: AnalyticsEvent): Promise<void> {
    // Analytics backend is not configured - skip API call
    // TODO: Enable this when backend analytics endpoint is ready
    return;

    /* Commented out until backend is configured
    if (process.env.NODE_ENV !== 'production') return;

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          url: window.location.href,
          sessionId: this.sessionId,
        }),
      });
    } catch (error) {
      // Silent fail for analytics
      console.debug('Analytics backend error:', error);
    }
    */
  }
}

// Singleton instance
export const analytics = new Analytics();

/**
 * Error tracking utility
 */
export const errorTracker = {
  /**
   * Initialize error tracking
   */
  init() {
    if (typeof window === 'undefined') return;

    // Global error handler
    window.addEventListener('error', this.handleError);

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  },

  /**
   * Handle global errors
   */
  handleError(event: ErrorEvent) {
    analytics.trackError(event.error || new Error(event.message), 'window_error');
  },

  /**
   * Handle unhandled promise rejections
   */
  handlePromiseRejection(event: PromiseRejectionEvent) {
    analytics.trackError(
      new Error(event.reason?.message || 'Promise rejected'),
      'promise_rejection'
    );
  },

  /**
   * Cleanup
   */
  cleanup() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('error', this.handleError);
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection);
  },
};

/**
 * React hook for tracking component mount
 */
import { useEffect } from 'react';

export function useComponentTracking(componentName: string) {
  useEffect(() => {
    analytics.track({
      category: 'Component',
      action: 'component_mounted',
      label: componentName,
    });

    return () => {
      analytics.track({
        category: 'Component',
        action: 'component_unmounted',
        label: componentName,
      });
    };
  }, [componentName]);
}

/**
 * React hook for tracking time on page
 */
export function usePageTimer(path?: string) {
  useEffect(() => {
    const startTime = Date.now();
    const pagePath = path || window.location.pathname;

    return () => {
      const timeSpent = (Date.now() - startTime) / 1000;
      analytics.trackTimeOnPage(pagePath, timeSpent);
    };
  }, [path]);
}

/**
 * React hook for tracking scroll depth
 */
export function useScrollDepth() {
  useEffect(() => {
    let maxScroll = 0;
    const milestones = new Set<number>();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPercentage =
        ((scrollTop + windowHeight) / documentHeight) * 100;

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        // Track milestones (25%, 50%, 75%, 100%)
        const milestone = Math.floor(scrollPercentage / 25) * 25;
        if (milestone > 0 && !milestones.has(milestone)) {
          milestones.add(milestone);
          analytics.trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
