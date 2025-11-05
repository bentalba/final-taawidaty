/// <reference lib="webworker" />

/**
 * Service Worker for TAAWIDATY PWA
 * Handles caching, offline functionality, and background sync
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `taawidaty-${CACHE_VERSION}`;

// Cache strategies
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
];

const RUNTIME_CACHE = 'taawidaty-runtime';
const API_CACHE = 'taawidaty-api';
const IMAGES_CACHE = 'taawidaty-images';

// Cache durations
const CACHE_DURATION = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  api: 24 * 60 * 60 * 1000, // 1 day
  images: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const self = globalThis as unknown as ServiceWorkerGlobalScope;

/**
 * Install event - precache assets
 */
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching assets');
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      // Force the waiting service worker to become the active service worker
      return self.skipWaiting();
    })
  );
});

/**
 * Activate event - cleanup old caches
 */
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== RUNTIME_CACHE && 
              cacheName !== API_CACHE &&
              cacheName !== IMAGES_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

/**
 * Fetch event - network-first with cache fallback
 */
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // API requests - network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request, API_CACHE));
    return;
  }

  // Images - cache first, network fallback
  if (request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request, IMAGES_CACHE, CACHE_DURATION.images));
    return;
  }

  // Static assets - cache first
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME, CACHE_DURATION.static));
    return;
  }

  // HTML pages - network first, cache fallback
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
    return;
  }

  // Default - network first
  event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
});

/**
 * Network-first strategy
 */
async function networkFirstStrategy(request: Request, cacheName: string): Promise<Response> {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[Service Worker] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    // No cache, return offline page or error
    if (request.destination === 'document') {
      const offlineResponse = await caches.match('/offline.html');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

/**
 * Cache-first strategy with expiration
 */
async function cacheFirstStrategy(
  request: Request, 
  cacheName: string, 
  maxAge: number
): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Check if cached response is still valid
  if (cachedResponse) {
    const cachedDate = new Date(cachedResponse.headers.get('date') || '');
    const now = new Date();
    
    if (now.getTime() - cachedDate.getTime() < maxAge) {
      console.log('[Service Worker] Serving from cache:', request.url);
      return cachedResponse;
    }
  }
  
  // Fetch from network and update cache
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, return stale cache if available
    if (cachedResponse) {
      console.log('[Service Worker] Serving stale cache:', request.url);
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Background sync for offline actions
 */
self.addEventListener('sync', (event: any) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-calculations') {
    event.waitUntil(syncCalculations());
  }
});

async function syncCalculations() {
  // Sync pending calculations when back online
  const cache = await caches.open(API_CACHE);
  const requests = await cache.keys();
  
  for (const request of requests) {
    if (request.url.includes('/calculations')) {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
      }
    }
  }
}

/**
 * Push notifications
 */
self.addEventListener('push', (event: any) => {
  const data = event.data?.json() || {};
  const title = data.title || 'TAAWIDATY';
  const options = {
    body: data.body || 'Nouveau message',
    icon: '/logos/TAAWIDATY.png',
    badge: '/logos/TAAWIDATY.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || [],
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});

/**
 * Message handler for cache management
 */
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
});

export {};
