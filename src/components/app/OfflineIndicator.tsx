/**
 * Network Status Hook & Component
 * Shows offline/online status to user
 */

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, X } from 'lucide-react';
import { isNativeApp } from '@/utils/platform';
import { haptics } from '@/utils/haptics';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        haptics.success();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      haptics.error();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  return { isOnline, wasOffline };
};

interface OfflineIndicatorProps {
  language: 'ar' | 'fr';
}

export const OfflineIndicator = ({ language }: OfflineIndicatorProps) => {
  const { isOnline, wasOffline } = useNetworkStatus();
  const [showReconnected, setShowReconnected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Only show in native app
  if (!isNativeApp()) return null;

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      setDismissed(false);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // Show "back online" message briefly
  if (showReconnected && !dismissed) {
    return (
      <div className="network-banner online">
        <Wifi size={18} />
        <span>
          {language === 'ar' ? 'تم استعادة الاتصال' : 'Connexion rétablie'}
        </span>
        <button onClick={() => setDismissed(true)}>
          <X size={16} />
        </button>
      </div>
    );
  }

  // Show offline banner
  if (!isOnline) {
    return (
      <div className="network-banner offline">
        <WifiOff size={18} />
        <span>
          {language === 'ar' 
            ? 'لا يوجد اتصال - البيانات المحفوظة متاحة'
            : 'Hors ligne - Données locales disponibles'}
        </span>
      </div>
    );
  }

  return null;
};

export default OfflineIndicator;
