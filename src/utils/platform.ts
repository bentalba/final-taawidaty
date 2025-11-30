/**
 * Platform detection utilities
 * Detects if running in native app (Capacitor) vs web browser
 */

import { Capacitor } from '@capacitor/core';

/**
 * Check if running as a native mobile app (Android/iOS via Capacitor)
 */
export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Check if running in web browser
 */
export const isWebBrowser = (): boolean => {
  return !Capacitor.isNativePlatform();
};

/**
 * Get the current platform
 */
export const getPlatform = (): 'android' | 'ios' | 'web' => {
  return Capacitor.getPlatform() as 'android' | 'ios' | 'web';
};
