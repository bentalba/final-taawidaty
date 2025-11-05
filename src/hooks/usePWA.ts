/**
 * usePWA Hook
 * React hooks for PWA functionality
 */

import { useEffect, useState, useCallback } from 'react';
import {
  registerServiceWorker,
  updateServiceWorker,
  isPWA,
  initInstallPrompt,
  showInstallPrompt,
  isInstallAvailable,
  isOnline,
  onNetworkChange,
  requestNotificationPermission,
  share,
  canShare,
  getDeviceInfo,
} from '../utils/pwa';

/**
 * Main PWA hook
 */
export function usePWA() {
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installPromptAvailable, setInstallPromptAvailable] = useState(false);
  const [online, setOnline] = useState(isOnline());
  const [pwaMode, setPwaMode] = useState(isPWA());

  useEffect(() => {
    // Register service worker
    registerServiceWorker().then(setSwRegistration);

    // Initialize install prompt
    initInstallPrompt();

    // Listen for updates
    const handleUpdate = () => setUpdateAvailable(true);
    window.addEventListener('sw-update-available', handleUpdate);

    // Listen for install availability
    const handleInstallAvailable = () => setInstallPromptAvailable(true);
    window.addEventListener('pwa-install-available', handleInstallAvailable);

    // Listen for network changes
    const cleanup = onNetworkChange(setOnline);

    return () => {
      window.removeEventListener('sw-update-available', handleUpdate);
      window.removeEventListener('pwa-install-available', handleInstallAvailable);
      cleanup();
    };
  }, []);

  const install = useCallback(async () => {
    const installed = await showInstallPrompt();
    if (installed) {
      setInstallPromptAvailable(false);
    }
    return installed;
  }, []);

  const update = useCallback(() => {
    updateServiceWorker();
  }, []);

  return {
    swRegistration,
    updateAvailable,
    installPromptAvailable,
    online,
    pwaMode,
    install,
    update,
  };
}

/**
 * Hook for install prompt
 */
export function useInstallPrompt() {
  const [available, setAvailable] = useState(isInstallAvailable());
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleAvailable = () => setAvailable(true);
    const handleInstalled = () => {
      setInstalled(true);
      setAvailable(false);
    };

    window.addEventListener('pwa-install-available', handleAvailable);
    window.addEventListener('pwa-installed', handleInstalled);

    return () => {
      window.removeEventListener('pwa-install-available', handleAvailable);
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const success = await showInstallPrompt();
    if (success) {
      setAvailable(false);
    }
    return success;
  }, []);

  return {
    available,
    installed,
    promptInstall,
  };
}

/**
 * Hook for network status
 */
export function useNetworkStatus() {
  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    return onNetworkChange(setOnline);
  }, []);

  return { online, offline: !online };
}

/**
 * Hook for Web Share API
 */
export function useShare() {
  const [supported, setSupported] = useState(canShare());

  const shareContent = useCallback(async (data: ShareData) => {
    return await share(data);
  }, []);

  return {
    supported,
    share: shareContent,
  };
}

/**
 * Hook for notifications
 */
export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  const requestPermission = useCallback(async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    return result;
  }, []);

  const isGranted = permission === 'granted';
  const isDenied = permission === 'denied';
  const canRequest = permission === 'default';

  return {
    permission,
    isGranted,
    isDenied,
    canRequest,
    requestPermission,
  };
}

/**
 * Hook for PWA update notification
 */
export function usePWAUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setUpdateAvailable(true);
    window.addEventListener('sw-update-available', handleUpdate);

    return () => {
      window.removeEventListener('sw-update-available', handleUpdate);
    };
  }, []);

  const applyUpdate = useCallback(() => {
    updateServiceWorker();
  }, []);

  const dismissUpdate = useCallback(() => {
    setUpdateAvailable(false);
  }, []);

  return {
    updateAvailable,
    applyUpdate,
    dismissUpdate,
  };
}

/**
 * Hook for device info
 */
export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo());

  useEffect(() => {
    // Update device info periodically
    const interval = setInterval(() => {
      setDeviceInfo(getDeviceInfo());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return deviceInfo;
}

/**
 * Hook for PWA display mode
 */
export function useDisplayMode() {
  const [isPWAMode, setIsPWAMode] = useState(isPWA());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPWAMode(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return {
    isPWA: isPWAMode,
    isBrowser: !isPWAMode,
  };
}

export {
  registerServiceWorker,
  updateServiceWorker,
  isPWA,
  showInstallPrompt,
  isInstallAvailable,
  isOnline,
  share,
  canShare,
};
