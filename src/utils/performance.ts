/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and custom performance metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface WebVitalsMetrics {
  CLS?: PerformanceMetric; // Cumulative Layout Shift
  FID?: PerformanceMetric; // First Input Delay
  FCP?: PerformanceMetric; // First Contentful Paint
  LCP?: PerformanceMetric; // Largest Contentful Paint
  TTFB?: PerformanceMetric; // Time to First Byte
  INP?: PerformanceMetric; // Interaction to Next Paint
}

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

class PerformanceMonitor {
  private metrics: WebVitalsMetrics = {};
  private observers: PerformanceObserver[] = [];
  private reportCallback?: (metrics: WebVitalsMetrics) => void;

  constructor(reportCallback?: (metrics: WebVitalsMetrics) => void) {
    this.reportCallback = reportCallback;
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window && 'largest-contentful-paint' in PerformanceObserver.supportedEntryTypes) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime: number; loadTime: number };
        const value = lastEntry.renderTime || lastEntry.loadTime;
        
        this.recordMetric('LCP', value);
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(lcpObserver);
    }

    // Observe First Input Delay (FID)
    if ('PerformanceObserver' in window && 'first-input' in PerformanceObserver.supportedEntryTypes) {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.push(fidObserver);
    }

    // Observe Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window && 'layout-shift' in PerformanceObserver.supportedEntryTypes) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric('CLS', clsValue);
          }
        });
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(clsObserver);
    }

    // Observe Navigation Timing for TTFB and FCP
    if ('PerformanceObserver' in window && 'navigation' in PerformanceObserver.supportedEntryTypes) {
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          // Time to First Byte
          const ttfb = entry.responseStart - entry.requestStart;
          this.recordMetric('TTFB', ttfb);
        });
      });
      
      navObserver.observe({ type: 'navigation', buffered: true });
      this.observers.push(navObserver);
    }

    // Observe Paint Timing for FCP
    if ('PerformanceObserver' in window && 'paint' in PerformanceObserver.supportedEntryTypes) {
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('FCP', entry.startTime);
          }
        });
      });
      
      paintObserver.observe({ type: 'paint', buffered: true });
      this.observers.push(paintObserver);
    }
  }

  private recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: getRating(name, value),
      timestamp: Date.now(),
    };

    this.metrics[name as keyof WebVitalsMetrics] = metric;

    // Report to callback if provided
    if (this.reportCallback) {
      this.reportCallback(this.metrics);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms (${metric.rating})`);
    }
  }

  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public getScore(): number {
    const metrics = Object.values(this.metrics);
    if (metrics.length === 0) return 0;

    const scores = metrics.map((metric) => {
      if (metric.rating === 'good') return 100;
      if (metric.rating === 'needs-improvement') return 50;
      return 0;
    });

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  public disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Custom performance markers
export function measureAsyncOperation<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  const measureName = name;

  performance.mark(startMark);

  return operation()
    .then((result) => {
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);

      const measure = performance.getEntriesByName(measureName)[0];
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`[Async Operation] ${name}: ${measure.duration.toFixed(2)}ms`);
      }

      return result;
    })
    .catch((error) => {
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);
      throw error;
    });
}

// Bundle size monitoring
export function logBundleMetrics() {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const scripts = resources.filter((r) => r.initiatorType === 'script');
    const styles = resources.filter((r) => r.initiatorType === 'link' || r.initiatorType === 'css');
    
    const totalScriptSize = scripts.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    const totalStyleSize = styles.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    
    console.log('[Bundle Size]', {
      scripts: `${(totalScriptSize / 1024).toFixed(2)} KB`,
      styles: `${(totalStyleSize / 1024).toFixed(2)} KB`,
      total: `${((totalScriptSize + totalStyleSize) / 1024).toFixed(2)} KB`,
    });
  }
}

// Report to analytics
export function reportToAnalytics(metrics: WebVitalsMetrics) {
  // Send to your analytics service
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    Object.entries(metrics).forEach(([name, metric]) => {
      if (metric) {
        (window as any).gtag('event', name, {
          value: Math.round(metric.value),
          metric_rating: metric.rating,
          event_category: 'Web Vitals',
        });
      }
    });
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring(report: boolean = true) {
  const monitor = new PerformanceMonitor(
    report ? reportToAnalytics : undefined
  );

  // Log bundle metrics after page load
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (process.env.NODE_ENV === 'development') {
          logBundleMetrics();
          console.log('[Performance Score]', monitor.getScore());
        }
      }, 0);
    });
  }

  return monitor;
}

export { PerformanceMonitor };
export type { PerformanceMetric, WebVitalsMetrics };
