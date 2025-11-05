/**
 * Cache Manager
 * Implements intelligent caching strategies for API responses and static assets
 */

interface CacheConfig {
  name: string;
  maxAge: number; // in milliseconds
  maxItems?: number;
}

interface CachedItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class CacheManager {
  private memoryCache: Map<string, CachedItem<any>> = new Map();
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  /**
   * Set item in cache
   */
  async set<T>(key: string, data: T, customMaxAge?: number): Promise<void> {
    const now = Date.now();
    const maxAge = customMaxAge || this.config.maxAge;

    const item: CachedItem<T> = {
      data,
      timestamp: now,
      expiresAt: now + maxAge,
    };

    // Store in memory cache
    this.memoryCache.set(key, item);

    // Enforce max items limit
    if (this.config.maxItems && this.memoryCache.size > this.config.maxItems) {
      const firstKey = this.memoryCache.keys().next().value;
      this.memoryCache.delete(firstKey);
    }

    // Store in localStorage if available
    if (this.isLocalStorageAvailable()) {
      try {
        const storageKey = `${this.config.name}:${key}`;
        localStorage.setItem(storageKey, JSON.stringify(item));
      } catch (error) {
        console.warn('localStorage quota exceeded, using memory cache only');
      }
    }
  }

  /**
   * Get item from cache
   */
  async get<T>(key: string): Promise<T | null> {
    const now = Date.now();

    // Check memory cache first
    let item = this.memoryCache.get(key) as CachedItem<T> | undefined;

    // If not in memory, check localStorage
    if (!item && this.isLocalStorageAvailable()) {
      const storageKey = `${this.config.name}:${key}`;
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        try {
          item = JSON.parse(stored) as CachedItem<T>;
          // Restore to memory cache
          this.memoryCache.set(key, item);
        } catch (error) {
          console.warn('Failed to parse cached item:', error);
        }
      }
    }

    // Check if item exists and is not expired
    if (item) {
      if (now < item.expiresAt) {
        return item.data;
      } else {
        // Item expired, remove it
        await this.delete(key);
      }
    }

    return null;
  }

  /**
   * Delete item from cache
   */
  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key);

    if (this.isLocalStorageAvailable()) {
      const storageKey = `${this.config.name}:${key}`;
      localStorage.removeItem(storageKey);
    }
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    this.memoryCache.clear();

    if (this.isLocalStorageAvailable()) {
      const prefix = `${this.config.name}:`;
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
  }

  /**
   * Get or set with fetcher function
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    customMaxAge?: number
  ): Promise<T> {
    const cached = await this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }

    const data = await fetcher();
    await this.set(key, data, customMaxAge);
    return data;
  }

  /**
   * Check if localStorage is available
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__cache_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      memorySize: this.memoryCache.size,
      config: this.config,
    };
  }
}

// Predefined cache instances
export const medicationCache = new CacheManager({
  name: 'medications',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  maxItems: 100,
});

export const calculationCache = new CacheManager({
  name: 'calculations',
  maxAge: 60 * 60 * 1000, // 1 hour
  maxItems: 50,
});

export const userPreferencesCache = new CacheManager({
  name: 'userPreferences',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxItems: 10,
});

/**
 * Image lazy loading utility
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  placeholder?: string
) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = src;
          
          image.onload = () => {
            image.classList.add('loaded');
          };
          
          observer.unobserve(image);
        }
      });
    });

    if (placeholder) {
      img.src = placeholder;
    }
    
    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
  }
}

/**
 * Component lazy loading with preloading
 */
export async function preloadComponent(importFunc: () => Promise<any>) {
  try {
    await importFunc();
  } catch (error) {
    console.warn('Component preload failed:', error);
  }
}

/**
 * Preload critical resources
 */
export function preloadCriticalAssets(assets: string[]) {
  if (typeof document === 'undefined') return;

  assets.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (href.endsWith('.woff2') || href.endsWith('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (href.endsWith('.css')) {
      link.as = 'style';
    } else if (href.endsWith('.js')) {
      link.as = 'script';
    }
    
    link.href = href;
    document.head.appendChild(link);
  });
}

/**
 * Prefetch assets for next navigation
 */
export function prefetchAssets(assets: string[]) {
  if (typeof document === 'undefined') return;

  assets.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
}
