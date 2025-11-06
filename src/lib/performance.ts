/**
 * Performance Monitoring Utilities
 * Apple-inspired performance tracking for medical-grade UX
 */

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

interface ComponentMetric {
  name: string;
  renderTime: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private componentMetrics: ComponentMetric[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  /**
   * Initialize performance monitoring
   */
  private initialize() {
    // Core Web Vitals
    this.setupCoreWebVitals();

    // Page load metrics
    this.measurePageLoad();
  }

  /**
   * Measure page load performance
   */
  measurePageLoad() {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.timeToInteractive = navigation.domInteractive - navigation.fetchStart;

        this.reportMetrics();
      }
    });
  }

  /**
   * Setup Core Web Vitals monitoring
   */
  private setupCoreWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.set('lcp', lcpObserver);
    } catch (e) {
      // LCP not supported
    }

    // First Contentful Paint (FCP)
    try {
      const paintObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.firstContentfulPaint = fcpEntry.startTime;
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
      this.observers.set('paint', paintObserver);
    } catch (e) {
      // Paint timing not supported
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue;
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.set('cls', clsObserver);
    } catch (e) {
      // Layout shift not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.set('fid', fidObserver);
    } catch (e) {
      // First input not supported
    }
  }

  /**
   * Measure component render time
   */
  measureComponentRender(componentName: string, startTime: number): void {
    const renderTime = performance.now() - startTime;

    this.componentMetrics.push({
      name: componentName,
      renderTime,
      timestamp: Date.now(),
    });

    // Warn about slow renders in development
    if (process.env.NODE_ENV === 'development' && renderTime > 100) {
      console.warn(
        `⚠️ Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`
      );
    }

    // Report to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'component_render', {
        component_name: componentName,
        render_time: Math.round(renderTime),
        event_category: 'Performance',
      });
    }
  }

  /**
   * Report metrics to analytics
   */
  private reportMetrics() {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metrics', {
        ...this.metrics,
        event_category: 'Performance',
      });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.table(this.metrics);
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Get component metrics
   */
  getComponentMetrics(): ComponentMetric[] {
    return [...this.componentMetrics];
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics = {};
    this.componentMetrics = [];
  }

  /**
   * Disconnect all observers
   */
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for measuring component performance
 */
export function usePerformanceMonitor(componentName: string) {
  const startTime = performance.now();

  return () => {
    performanceMonitor.measureComponentRender(componentName, startTime);
  };
}

/**
 * Lazy loading with retry logic
 * Handles chunk loading failures gracefully
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  retryCount = 3
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('retry-lazy-refreshed', 'false');
      return component;
    } catch (error) {
      if (!hasRefreshed) {
        // Reload page once if chunk loading failed
        window.sessionStorage.setItem('retry-lazy-refreshed', 'true');
        window.location.reload();
        throw error;
      }

      // Retry loading the chunk
      let lastError = error;
      for (let i = 0; i < retryCount; i++) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
          const component = await componentImport();
          return component;
        } catch (retryError) {
          lastError = retryError;
        }
      }

      throw lastError;
    }
  });
}

/**
 * Debounce function with performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  await Promise.all(srcs.map(preloadImage));
}

// Make React available for lazy loading
import React from 'react';
