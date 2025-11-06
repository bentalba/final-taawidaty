/**
 * TAAWIDATY Service Worker
 * PWA offline functionality for medical-grade availability
 */

const CACHE_NAME = 'taawidaty-v1.0.0';
const API_CACHE_NAME = 'taawidaty-api-v1.0.0';
const IMAGE_CACHE_NAME = 'taawidaty-images-v1.0.0';

// URLs to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/logos/TAAWIDATY.png',
];

// API endpoints to cache
const API_CACHE_URLS = [
  '/api/medications',
  '/api/insurance-plans',
];

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      }),

      // Cache API data
      caches.open(API_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching API data');
        return Promise.all(
          API_CACHE_URLS.map((url) =>
            fetch(url)
              .then((response) => cache.put(url, response))
              .catch(() => console.log(`[SW] Failed to cache ${url}`))
          )
        );
      }),
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== API_CACHE_NAME &&
              cacheName !== IMAGE_CACHE_NAME
            ) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - serve from cache or network
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.url.includes('/api/')) {
    // API requests - network first, fallback to cache
    event.respondWith(handleAPIRequest(request));
  } else if (
    request.destination === 'image' ||
    /\.(jpg|jpeg|png|webp|svg|gif|ico)$/i.test(url.pathname)
  ) {
    // Images - cache first, fallback to network
    event.respondWith(handleImageRequest(request));
  } else {
    // Other requests - network first, fallback to cache
    event.respondWith(handleStaticRequest(request));
  }
});

/**
 * Handle API requests
 * Strategy: Network first, fallback to cache
 */
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(API_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, using cache:', request.url);

    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return error response
    return new Response(
      JSON.stringify({ error: 'Offline - data not available' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * Handle image requests
 * Strategy: Cache first, fallback to network
 */
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);

  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Try network
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Return placeholder image or error
    return new Response('', { status: 404 });
  }
}

/**
 * Handle static asset requests
 * Strategy: Network first, fallback to cache
 */
async function handleStaticRequest(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, using cache:', request.url);

    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // For navigation requests, return offline page
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }

    // Return error response
    return new Response('Offline - resource not available', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

/**
 * Message event - handle messages from clients
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      })
    );
  }
});

/**
 * Background sync for offline form submissions
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-calculations') {
    event.waitUntil(syncCalculations());
  }
});

/**
 * Sync pending calculations when back online
 */
async function syncCalculations() {
  // Implement if needed - sync offline calculations to server
  console.log('[SW] Syncing calculations...');
}

/**
 * Push notification support (for future features)
 */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body || 'Nouvelle mise à jour disponible',
    icon: '/logos/TAAWIDATY.png',
    badge: '/logos/TAAWIDATY.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'TAAWIDATY',
      options
    )
  );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('[SW] Service worker loaded');
