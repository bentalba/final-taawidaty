/**
 * Performance Testing Configuration
 * Lighthouse CI and performance budget enforcement
 */

export const lighthouseConfig = {
  ci: {
    collect: {
      // URLs to test
      url: [
        'http://localhost:5173/',
        'http://localhost:5173/#calculator',
        'http://localhost:5173/faq-cnops',
        'http://localhost:5173/faq-cnss',
      ],
      // Number of runs per URL
      numberOfRuns: 3,
      settings: {
        // Lighthouse settings
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      // Performance budgets
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],

        // Other metrics
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 3800 }],

        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 350000 }], // 350KB
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 50000 }], // 50KB
        'resource-summary:font:size': ['error', { maxNumericValue: 100000 }], // 100KB
        'resource-summary:image:size': ['error', { maxNumericValue: 200000 }], // 200KB
        'resource-summary:total:size': ['error', { maxNumericValue: 1000000 }], // 1MB

        // Best practices
        'uses-http2': 'error',
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'unused-css-rules': 'warn',
        'uses-text-compression': 'error',
        'uses-rel-preconnect': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

/**
 * Performance budget for Vite build
 */
export const performanceBudget = {
  // Bundle size limits
  bundles: {
    main: 350 * 1024, // 350KB
    vendor: 500 * 1024, // 500KB
    total: 1000 * 1024, // 1MB
  },

  // Asset size limits
  assets: {
    css: 50 * 1024, // 50KB
    fonts: 100 * 1024, // 100KB per font
    images: 200 * 1024, // 200KB per image
  },

  // Performance metrics
  metrics: {
    fcp: 1800, // First Contentful Paint (ms)
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100, // First Input Delay (ms)
    cls: 0.1, // Cumulative Layout Shift
    ttfb: 800, // Time to First Byte (ms)
    tti: 3800, // Time to Interactive (ms)
  },
};

/**
 * Cross-browser testing configuration
 */
export const browserConfig = {
  browsers: [
    {
      name: 'Chrome',
      minVersion: 90,
      features: ['webp', 'avif', 'service-worker', 'intersection-observer'],
    },
    {
      name: 'Firefox',
      minVersion: 88,
      features: ['webp', 'service-worker', 'intersection-observer'],
    },
    {
      name: 'Safari',
      minVersion: 14,
      features: ['webp', 'service-worker', 'intersection-observer'],
    },
    {
      name: 'Edge',
      minVersion: 90,
      features: ['webp', 'avif', 'service-worker', 'intersection-observer'],
    },
  ],
  
  // Mobile browsers
  mobile: [
    {
      name: 'Chrome Mobile',
      minVersion: 90,
    },
    {
      name: 'Safari iOS',
      minVersion: 14,
    },
  ],
};

/**
 * Load testing scenarios
 */
export const loadTestScenarios = [
  {
    name: 'Light Load',
    duration: '1m',
    vus: 10, // Virtual users
    target: 'http://localhost:5173',
  },
  {
    name: 'Normal Load',
    duration: '5m',
    vus: 50,
    target: 'http://localhost:5173',
  },
  {
    name: 'Stress Test',
    duration: '2m',
    vus: 100,
    target: 'http://localhost:5173',
  },
  {
    name: 'Spike Test',
    duration: '1m',
    vus: 200,
    target: 'http://localhost:5173',
  },
];

/**
 * Performance test results validation
 */
export function validatePerformanceResults(results: any): {
  passed: boolean;
  violations: string[];
  score: number;
} {
  const violations: string[] = [];
  let score = 100;

  // Check LCP
  if (results.lcp > performanceBudget.metrics.lcp) {
    violations.push(`LCP too high: ${results.lcp}ms > ${performanceBudget.metrics.lcp}ms`);
    score -= 15;
  }

  // Check FCP
  if (results.fcp > performanceBudget.metrics.fcp) {
    violations.push(`FCP too high: ${results.fcp}ms > ${performanceBudget.metrics.fcp}ms`);
    score -= 10;
  }

  // Check CLS
  if (results.cls > performanceBudget.metrics.cls) {
    violations.push(`CLS too high: ${results.cls} > ${performanceBudget.metrics.cls}`);
    score -= 15;
  }

  // Check bundle size
  if (results.bundleSize > performanceBudget.bundles.total) {
    violations.push(
      `Bundle too large: ${Math.round(results.bundleSize / 1024)}KB > ${performanceBudget.bundles.total / 1024}KB`
    );
    score -= 20;
  }

  return {
    passed: violations.length === 0,
    violations,
    score: Math.max(0, score),
  };
}

export default lighthouseConfig;
