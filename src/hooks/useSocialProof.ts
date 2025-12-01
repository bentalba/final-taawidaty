/**
 * Social Proof Hook
 * Shows realistic-looking calculation counts to build trust
 * "5,432 calculations today in Morocco"
 * 
 * Uses a combination of:
 * - Base count (grows over time since app launch)
 * - Time-of-day variance (more during pharmacy hours)
 * - Local storage to persist and grow
 * 
 * @author BENTALBA ZAKARIA
 */

import { useState, useEffect, useMemo } from 'react';

const SOCIAL_PROOF_KEY = 'taawidaty_social_proof';
const APP_LAUNCH_DATE = new Date('2025-01-01').getTime(); // App launch date

interface SocialProofData {
  baseCount: number;
  lastUpdated: number;
}

// Moroccan cities for localization
const MOROCCAN_CITIES = [
  'الدار البيضاء', // Casablanca
  'الرباط',        // Rabat
  'فاس',           // Fes
  'مراكش',         // Marrakech
  'طنجة',          // Tangier
  'أكادير',        // Agadir
  'مكناس',         // Meknes
  'وجدة',          // Oujda
  'القنيطرة',      // Kenitra
  'تطوان'          // Tetouan
];

const MOROCCAN_CITIES_FR = [
  'Casablanca',
  'Rabat',
  'Fès',
  'Marrakech',
  'Tanger',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan'
];

export interface SocialProofStats {
  todayCount: number;
  totalCount: number;
  recentCity: string;
  recentCityFr: string;
  isActive: boolean; // High activity period
}

export const useSocialProof = (language: 'ar' | 'fr' = 'fr'): SocialProofStats => {
  const [data, setData] = useState<SocialProofData>({ baseCount: 0, lastUpdated: 0 });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SOCIAL_PROOF_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        // Initialize if corrupted
        initializeSocialProof();
      }
    } else {
      initializeSocialProof();
    }
  }, []);

  // Increment count periodically (simulates other users)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const hour = new Date().getHours();
      
      // More activity during pharmacy hours (8-20h Morocco)
      const isActiveHours = hour >= 8 && hour <= 20;
      const incrementRate = isActiveHours ? Math.floor(Math.random() * 3) + 1 : Math.random() > 0.7 ? 1 : 0;

      setData(prev => {
        const newData = {
          baseCount: prev.baseCount + incrementRate,
          lastUpdated: now
        };
        localStorage.setItem(SOCIAL_PROOF_KEY, JSON.stringify(newData));
        return newData;
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    const now = Date.now();
    const daysSinceLaunch = Math.floor((now - APP_LAUNCH_DATE) / (1000 * 60 * 60 * 24));
    const hour = new Date().getHours();
    
    // Base calculation: ~50-200 per day average
    const baseDaily = 120 + Math.sin(daysSinceLaunch * 0.1) * 50;
    
    // Time-of-day factor (peak at 10am and 6pm)
    const timeFactor = 0.5 + 0.5 * Math.sin((hour - 6) * Math.PI / 12);
    
    // Calculate today's count (accumulates through the day)
    const todayProgress = (hour * 60 + new Date().getMinutes()) / (24 * 60);
    const todayCount = Math.floor(baseDaily * todayProgress * timeFactor * (1 + Math.random() * 0.1));
    
    // Total count since launch
    const totalCount = Math.floor(daysSinceLaunch * baseDaily + data.baseCount);
    
    // Random city (weighted towards big cities)
    const cityIndex = Math.floor(Math.pow(Math.random(), 2) * MOROCCAN_CITIES.length);
    
    return {
      todayCount: Math.max(todayCount + data.baseCount % 100, 50), // Minimum 50
      totalCount: Math.max(totalCount, 1000),
      recentCity: MOROCCAN_CITIES[cityIndex],
      recentCityFr: MOROCCAN_CITIES_FR[cityIndex],
      isActive: hour >= 8 && hour <= 20
    };
  }, [data, language]);
};

function initializeSocialProof() {
  const initial: SocialProofData = {
    baseCount: Math.floor(Math.random() * 500) + 100, // Start with some history
    lastUpdated: Date.now()
  };
  localStorage.setItem(SOCIAL_PROOF_KEY, JSON.stringify(initial));
}

export default useSocialProof;
