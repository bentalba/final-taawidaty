/**
 * Offline Medication Cache
 * Caches medication data for offline calculations
 * Critical for Moroccan users who may run out of data
 * 
 * @author BENTALBA ZAKARIA
 */

const CACHE_KEY = 'taawidaty_medications_cache';
const CACHE_TIMESTAMP_KEY = 'taawidaty_cache_timestamp';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface CachedMedication {
  id: number;
  name: string;
  dci?: string;
  ppv: number;
  base_remb: number;
  taux_remb: number;
}

export interface MedicationCache {
  cnops: CachedMedication[];
  cnss: CachedMedication[];
}

/**
 * Save medications to cache
 */
export const cacheMedications = (data: MedicationCache): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    console.log('[Cache] Medications cached successfully');
  } catch (error) {
    console.error('[Cache] Failed to cache medications:', error);
    // Try to free up space by clearing old data
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      console.error('[Cache] Storage quota exceeded');
    }
  }
};

/**
 * Get cached medications
 */
export const getCachedMedications = (): MedicationCache | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cached || !timestamp) {
      return null;
    }

    // Check if cache is still valid
    const cacheAge = Date.now() - parseInt(timestamp, 10);
    if (cacheAge > CACHE_DURATION) {
      console.log('[Cache] Cache expired, clearing...');
      clearMedicationCache();
      return null;
    }

    return JSON.parse(cached);
  } catch (error) {
    console.error('[Cache] Failed to read cache:', error);
    return null;
  }
};

/**
 * Check if cache exists and is valid
 */
export const isCacheValid = (): boolean => {
  const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!timestamp) return false;
  
  const cacheAge = Date.now() - parseInt(timestamp, 10);
  return cacheAge < CACHE_DURATION;
};

/**
 * Get cache age in human-readable format
 */
export const getCacheAge = (language: 'ar' | 'fr'): string | null => {
  const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!timestamp) return null;

  const age = Date.now() - parseInt(timestamp, 10);
  const hours = Math.floor(age / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return language === 'ar' 
      ? `منذ ${days} يوم`
      : `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return language === 'ar'
      ? `منذ ${hours} ساعة`
      : `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    return language === 'ar'
      ? 'منذ قليل'
      : 'Il y a quelques minutes';
  }
};

/**
 * Clear the medication cache
 */
export const clearMedicationCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIMESTAMP_KEY);
};

/**
 * Get cache size in KB
 */
export const getCacheSize = (): number => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return 0;
  return Math.round(new Blob([cached]).size / 1024);
};

export default {
  cacheMedications,
  getCachedMedications,
  isCacheValid,
  getCacheAge,
  clearMedicationCache,
  getCacheSize
};
