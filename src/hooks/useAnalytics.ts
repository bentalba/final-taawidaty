/**
 * useAnalytics Hook
 * React hook for easy analytics integration in components
 */

import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  trackPageView,
  CalculatorEvents,
  UserEvents,
  Conversions,
  ErrorTracking,
  PerformanceTracking,
  UserFlowTracking,
  AnalyticsEvent,
  trackEvent,
} from '../utils/analytics';

/**
 * Main analytics hook
 */
export function useAnalytics() {
  const location = useLocation();
  const sessionStartRef = useRef<number>(Date.now());
  const journeyStepsRef = useRef<string[]>([]);

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname);
    journeyStepsRef.current.push(location.pathname);
  }, [location]);

  // Track session end on unmount
  useEffect(() => {
    const sessionStart = sessionStartRef.current;
    
    return () => {
      const sessionDuration = Date.now() - sessionStart;
      UserFlowTracking.endSession(sessionDuration);
      UserFlowTracking.trackUserJourney(journeyStepsRef.current);
    };
  }, []);

  return {
    trackEvent,
    calculator: CalculatorEvents,
    user: UserEvents,
    conversions: Conversions,
    errors: ErrorTracking,
    performance: PerformanceTracking,
    userFlow: UserFlowTracking,
  };
}

/**
 * Hook for tracking calculator events
 */
export function useCalculatorAnalytics() {
  const trackInsuranceSelection = useCallback((insuranceType: 'cnops' | 'cnss') => {
    CalculatorEvents.insuranceSelected(insuranceType);
  }, []);

  const trackStepCompletion = useCallback((stepNumber: number, stepName: string) => {
    CalculatorEvents.stepCompleted(stepNumber, stepName);
  }, []);

  const trackCalculationStart = useCallback(() => {
    CalculatorEvents.calculationStarted();
  }, []);

  const trackCalculationComplete = useCallback((insuranceType: string, amount: number) => {
    CalculatorEvents.calculationCompleted(insuranceType, amount);
    Conversions.calculationCompleted(amount);
  }, []);

  const trackResultsAction = useCallback((action: 'share' | 'download' | 'print' | 'new') => {
    switch (action) {
      case 'share':
        CalculatorEvents.resultsShared('native');
        break;
      case 'download':
        CalculatorEvents.resultsDownloaded();
        break;
      case 'print':
        CalculatorEvents.resultsPrinted();
        break;
      case 'new':
        CalculatorEvents.newCalculationStarted();
        break;
    }
  }, []);

  return {
    trackInsuranceSelection,
    trackStepCompletion,
    trackCalculationStart,
    trackCalculationComplete,
    trackResultsAction,
  };
}

/**
 * Hook for tracking search events
 */
export function useSearchAnalytics() {
  const trackSearch = useCallback((query: string, resultsCount: number) => {
    UserEvents.medicationSearched(query, resultsCount);
  }, []);

  const trackSelection = useCallback((medicationName: string) => {
    UserEvents.medicationSelected(medicationName);
  }, []);

  return {
    trackSearch,
    trackSelection,
  };
}

/**
 * Hook for tracking FAQ events
 */
export function useFAQAnalytics() {
  const trackQuestionOpen = useCallback((question: string) => {
    UserEvents.faqQuestionOpened(question);
  }, []);

  const trackFAQSearch = useCallback((query: string) => {
    UserEvents.faqSearched(query);
  }, []);

  const trackCategorySelect = useCallback((category: string) => {
    UserEvents.faqCategorySelected(category);
  }, []);

  return {
    trackQuestionOpen,
    trackFAQSearch,
    trackCategorySelect,
  };
}

/**
 * Hook for tracking errors
 */
export function useErrorTracking() {
  const trackError = useCallback((error: Error, context?: string) => {
    ErrorTracking.trackError(error, context);
    console.error('[Analytics Error]', context, error);
  }, []);

  const track404 = useCallback((path: string) => {
    ErrorTracking.track404(path);
  }, []);

  const trackCalculationError = useCallback((errorType: string) => {
    ErrorTracking.trackCalculationError(errorType);
  }, []);

  return {
    trackError,
    track404,
    trackCalculationError,
  };
}

/**
 * Hook for tracking performance metrics
 */
export function usePerformanceTracking() {
  const trackWebVital = useCallback((name: string, value: number, rating: string) => {
    PerformanceTracking.trackWebVital(name, value, rating);
  }, []);

  const trackLoadTime = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationTiming) {
      const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
      PerformanceTracking.trackLoadTime(loadTime);
    }
  }, []);

  const trackSearchPerformance = useCallback((startTime: number) => {
    const searchTime = performance.now() - startTime;
    PerformanceTracking.trackSearchTime(searchTime);
  }, []);

  return {
    trackWebVital,
    trackLoadTime,
    trackSearchPerformance,
  };
}

/**
 * Hook for tracking user journey
 */
export function useUserJourney() {
  const journeyRef = useRef<{ step: string; timestamp: number }[]>([]);

  const addStep = useCallback((step: string) => {
    journeyRef.current.push({
      step,
      timestamp: Date.now(),
    });
  }, []);

  const getJourney = useCallback(() => {
    return journeyRef.current;
  }, []);

  const trackJourney = useCallback(() => {
    const steps = journeyRef.current.map(s => s.step);
    UserFlowTracking.trackUserJourney(steps);
  }, []);

  return {
    addStep,
    getJourney,
    trackJourney,
  };
}

/**
 * Hook for consent management
 */
export function useAnalyticsConsent() {
  const [consentGiven, setConsentGiven] = useState(false);

  const grantConsent = useCallback(() => {
    setConsentGiven(true);
    updateConsent(true);
    localStorage.setItem('analytics_consent', 'granted');
  }, []);

  const denyConsent = useCallback(() => {
    setConsentGiven(false);
    updateConsent(false);
    localStorage.setItem('analytics_consent', 'denied');
  }, []);

  useEffect(() => {
    const storedConsent = localStorage.getItem('analytics_consent');
    if (storedConsent === 'granted') {
      setConsentGiven(true);
      updateConsent(true);
    }
  }, []);

  return {
    consentGiven,
    grantConsent,
    denyConsent,
  };
}

// Re-export for convenience
export {
  CalculatorEvents,
  UserEvents,
  Conversions,
  ErrorTracking,
  PerformanceTracking,
  UserFlowTracking,
  trackEvent,
  trackPageView,
};

// Missing imports
import { useState } from 'react';
import { updateConsent } from '../utils/analytics';
