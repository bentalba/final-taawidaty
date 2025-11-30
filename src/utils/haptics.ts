/**
 * Haptic Feedback Utility
 * Provides vibration feedback for native app interactions
 */

import { Capacitor } from '@capacitor/core';

// Check if vibration API is available
const canVibrate = () => {
  return Capacitor.isNativePlatform() && 'vibrate' in navigator;
};

export const haptics = {
  /**
   * Light tap - for button presses, selections
   */
  light: () => {
    if (canVibrate()) {
      navigator.vibrate(10);
    }
  },

  /**
   * Medium tap - for confirmations, toggles
   */
  medium: () => {
    if (canVibrate()) {
      navigator.vibrate(20);
    }
  },

  /**
   * Heavy tap - for important actions, errors
   */
  heavy: () => {
    if (canVibrate()) {
      navigator.vibrate(30);
    }
  },

  /**
   * Success pattern - double tap
   */
  success: () => {
    if (canVibrate()) {
      navigator.vibrate([10, 50, 10]);
    }
  },

  /**
   * Error pattern - triple tap
   */
  error: () => {
    if (canVibrate()) {
      navigator.vibrate([30, 50, 30, 50, 30]);
    }
  },

  /**
   * Selection changed
   */
  selection: () => {
    if (canVibrate()) {
      navigator.vibrate(5);
    }
  },

  /**
   * Impact notification (like adding to favorites)
   */
  impact: () => {
    if (canVibrate()) {
      navigator.vibrate([15, 30, 15]);
    }
  }
};

export default haptics;
