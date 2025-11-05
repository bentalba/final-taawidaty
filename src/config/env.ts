/**
 * Environment configuration
 * Type-safe access to environment variables
 */

interface EnvironmentConfig {
  // Application
  appName: string;
  appVersion: string;
  appUrl: string;
  
  // API
  apiBaseUrl: string;
  apiTimeout: number;
  
  // Analytics
  gaMeasurementId: string;
  
  // Feature Flags
  enableAnalytics: boolean;
  enablePWA: boolean;
  enableNotifications: boolean;
  enableShare: boolean;
  
  // Build
  buildMode: 'development' | 'production';
  sourceMaps: boolean;
  
  // CDN
  cdnUrl: string;
  
  // Monitoring
  sentryDsn: string;
  sentryEnvironment: string;
  enablePerformanceMonitoring: boolean;
  performanceSampleRate: number;
  
  // Security
  cspReportUri: string;
  
  // Computed
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Get environment variable with fallback
 */
function getEnv(key: string, defaultValue: string = ''): string {
  if (typeof import.meta.env !== 'undefined') {
    return import.meta.env[key] ?? defaultValue;
  }
  return defaultValue;
}

/**
 * Get boolean environment variable
 */
function getBoolEnv(key: string, defaultValue: boolean = false): boolean {
  const value = getEnv(key);
  if (value === '') return defaultValue;
  return value === 'true' || value === '1';
}

/**
 * Get number environment variable
 */
function getNumberEnv(key: string, defaultValue: number = 0): number {
  const value = getEnv(key);
  if (value === '') return defaultValue;
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Environment configuration singleton
 */
export const env: EnvironmentConfig = {
  // Application
  appName: getEnv('VITE_APP_NAME', 'TAAWIDATY'),
  appVersion: getEnv('VITE_APP_VERSION', '1.0.0'),
  appUrl: getEnv('VITE_APP_URL', 'https://taawidaty.ma'),
  
  // API
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'https://api.taawidaty.ma'),
  apiTimeout: getNumberEnv('VITE_API_TIMEOUT', 10000),
  
  // Analytics
  gaMeasurementId: getEnv('VITE_GA_MEASUREMENT_ID', 'G-XXXXXXXXXX'),
  
  // Feature Flags
  enableAnalytics: getBoolEnv('VITE_ENABLE_ANALYTICS', true),
  enablePWA: getBoolEnv('VITE_ENABLE_PWA', true),
  enableNotifications: getBoolEnv('VITE_ENABLE_NOTIFICATIONS', false),
  enableShare: getBoolEnv('VITE_ENABLE_SHARE', true),
  
  // Build
  buildMode: (getEnv('VITE_BUILD_MODE', 'production') as 'development' | 'production'),
  sourceMaps: getBoolEnv('VITE_SOURCE_MAPS', false),
  
  // CDN
  cdnUrl: getEnv('VITE_CDN_URL', ''),
  
  // Monitoring
  sentryDsn: getEnv('VITE_SENTRY_DSN', ''),
  sentryEnvironment: getEnv('VITE_SENTRY_ENVIRONMENT', 'production'),
  enablePerformanceMonitoring: getBoolEnv('VITE_ENABLE_PERFORMANCE_MONITORING', true),
  performanceSampleRate: getNumberEnv('VITE_PERFORMANCE_SAMPLE_RATE', 0.1),
  
  // Security
  cspReportUri: getEnv('VITE_CSP_REPORT_URI', ''),
  
  // Computed
  get isDevelopment() {
    return this.buildMode === 'development' || import.meta.env.DEV;
  },
  
  get isProduction() {
    return this.buildMode === 'production' || import.meta.env.PROD;
  },
};

/**
 * Validate environment configuration
 */
export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required in production
  if (env.isProduction) {
    if (!env.appUrl || env.appUrl.includes('localhost')) {
      errors.push('VITE_APP_URL must be set to production URL');
    }
    
    if (env.gaMeasurementId === 'G-XXXXXXXXXX') {
      console.warn('Warning: Google Analytics ID not configured');
    }
  }
  
  // Validate URLs
  if (env.appUrl) {
    try {
      new URL(env.appUrl);
    } catch {
      errors.push('VITE_APP_URL is not a valid URL');
    }
  }
  
  if (env.apiBaseUrl) {
    try {
      new URL(env.apiBaseUrl);
    } catch {
      errors.push('VITE_API_BASE_URL is not a valid URL');
    }
  }
  
  // Validate numbers
  if (env.apiTimeout < 1000) {
    errors.push('VITE_API_TIMEOUT should be at least 1000ms');
  }
  
  if (env.performanceSampleRate < 0 || env.performanceSampleRate > 1) {
    errors.push('VITE_PERFORMANCE_SAMPLE_RATE must be between 0 and 1');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Log environment configuration (development only)
 */
export function logEnvironment(): void {
  if (!env.isDevelopment) {
    return;
  }
  
  console.group('🔧 Environment Configuration');
  console.log('Mode:', env.buildMode);
  console.log('App Name:', env.appName);
  console.log('App Version:', env.appVersion);
  console.log('App URL:', env.appUrl);
  console.log('API Base URL:', env.apiBaseUrl);
  console.log('Analytics:', env.enableAnalytics ? 'Enabled' : 'Disabled');
  console.log('PWA:', env.enablePWA ? 'Enabled' : 'Disabled');
  console.log('Source Maps:', env.sourceMaps ? 'Enabled' : 'Disabled');
  console.groupEnd();
  
  // Validate
  const validation = validateEnvironment();
  if (!validation.valid) {
    console.group('⚠️ Environment Validation Errors');
    validation.errors.forEach(error => console.error(error));
    console.groupEnd();
  }
}

export default env;
