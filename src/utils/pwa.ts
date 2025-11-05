/**
 * PWA utilities for service worker registration and install prompts
 */

/**
 * Register service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.log('[PWA] Service workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log('[PWA] Service worker registered:', registration.scope);

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000); // Check every hour

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            console.log('[PWA] New service worker available');
            notifyUpdate();
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('[PWA] Service worker registration failed:', error);
    return null;
  }
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const success = await registration.unregister();
      console.log('[PWA] Service worker unregistered:', success);
      return success;
    }
    return false;
  } catch (error) {
    console.error('[PWA] Service worker unregistration failed:', error);
    return false;
  }
}

/**
 * Notify user about app update
 */
function notifyUpdate() {
  // Create custom event for React components to listen to
  const event = new CustomEvent('sw-update-available');
  window.dispatchEvent(event);
}

/**
 * Update service worker
 */
export function updateServiceWorker() {
  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  });
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<void> {
  if (!('caches' in window)) {
    return;
  }

  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((cacheName) => caches.delete(cacheName))
  );
  
  console.log('[PWA] All caches cleared');
}

/**
 * Get service worker version
 */
export async function getServiceWorkerVersion(): Promise<string | null> {
  const registration = await navigator.serviceWorker.getRegistration();
  
  if (!registration?.active) {
    return null;
  }

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();
    
    messageChannel.port1.onmessage = (event) => {
      resolve(event.data.version || null);
    };
    
    registration.active.postMessage(
      { type: 'GET_VERSION' },
      [messageChannel.port2]
    );
    
    // Timeout after 1 second
    setTimeout(() => resolve(null), 1000);
  });
}

/**
 * Check if app is running as PWA
 */
export function isPWA(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
}

/**
 * Install prompt management
 */
let deferredPrompt: any = null;

export function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    console.log('[PWA] Install prompt ready');
    
    // Notify app that install is available
    const event = new CustomEvent('pwa-install-available');
    window.dispatchEvent(event);
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed');
    deferredPrompt = null;
    
    // Notify app that installation completed
    const event = new CustomEvent('pwa-installed');
    window.dispatchEvent(event);
  });
}

/**
 * Show install prompt
 */
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) {
    console.log('[PWA] Install prompt not available');
    return false;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log('[PWA] Install prompt outcome:', outcome);
  
  if (outcome === 'accepted') {
    deferredPrompt = null;
    return true;
  }
  
  return false;
}

/**
 * Check if install prompt is available
 */
export function isInstallAvailable(): boolean {
  return deferredPrompt !== null;
}

/**
 * Check network status
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Listen to network status changes
 */
export function onNetworkChange(callback: (online: boolean) => void) {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Request background sync
 */
export async function requestBackgroundSync(tag: string): Promise<void> {
  const registration = await navigator.serviceWorker.ready;
  
  if ('sync' in registration) {
    try {
      await (registration as any).sync.register(tag);
      console.log('[PWA] Background sync registered:', tag);
    } catch (error) {
      console.error('[PWA] Background sync failed:', error);
    }
  }
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.log('[PWA] Notifications not supported');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

/**
 * Show notification
 */
export async function showNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  const permission = await requestNotificationPermission();
  
  if (permission !== 'granted') {
    console.log('[PWA] Notification permission denied');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  
  await registration.showNotification(title, {
    icon: '/logos/TAAWIDATY.png',
    badge: '/logos/TAAWIDATY.png',
    vibrate: [200, 100, 200],
    ...options,
  });
}

/**
 * Share via Web Share API
 */
export async function share(data: ShareData): Promise<boolean> {
  if (!navigator.share) {
    console.log('[PWA] Web Share API not supported');
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('[PWA] Share failed:', error);
    }
    return false;
  }
}

/**
 * Check if device supports Web Share
 */
export function canShare(): boolean {
  return 'share' in navigator;
}

/**
 * Get device info for PWA
 */
export function getDeviceInfo() {
  return {
    isPWA: isPWA(),
    isOnline: isOnline(),
    canInstall: isInstallAvailable(),
    canShare: canShare(),
    canNotify: 'Notification' in window,
    hasServiceWorker: 'serviceWorker' in navigator,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
  };
}

export default {
  registerServiceWorker,
  unregisterServiceWorker,
  updateServiceWorker,
  clearAllCaches,
  getServiceWorkerVersion,
  isPWA,
  initInstallPrompt,
  showInstallPrompt,
  isInstallAvailable,
  isOnline,
  onNetworkChange,
  requestBackgroundSync,
  requestNotificationPermission,
  showNotification,
  share,
  canShare,
  getDeviceInfo,
};
