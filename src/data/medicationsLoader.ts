/**
 * Medications Data Loader with Offline Cache
 * Supports offline-first approach for Moroccan users
 * 
 * @author BENTALBA ZAKARIA
 */

import {
  cacheMedications,
  getCachedMedications,
  isCacheValid
} from '@/utils/offlineCache';

// In-memory cache for fast access
let cnopsCacheData: any[] | null = null;
let cnssCacheData: any[] | null = null;

export async function loadMedications(insuranceType: 'cnops' | 'cnss' = 'cnops') {
  // Return in-memory cached data if available
  if (insuranceType === 'cnops' && cnopsCacheData) {
    return cnopsCacheData;
  }
  if (insuranceType === 'cnss' && cnssCacheData) {
    return cnssCacheData;
  }

  // Try to load from localStorage cache first (offline support)
  const offlineCache = getCachedMedications();
  if (offlineCache) {
    if (insuranceType === 'cnss' && offlineCache.cnss?.length > 0) {
      cnssCacheData = offlineCache.cnss;
      return cnssCacheData;
    } else if (offlineCache.cnops?.length > 0) {
      cnopsCacheData = offlineCache.cnops;
      return cnopsCacheData;
    }
  }

  try {
    const response = await fetch(`/data/medications-${insuranceType}.json`);
    if (!response.ok) throw new Error(`HTTP fetch failed for ${insuranceType}`);

    const data = await response.json();

    if (insuranceType === 'cnss') {
      cnssCacheData = data;
    } else {
      cnopsCacheData = data;
    }

    // Update offline cache
    updateOfflineCache();

    return data;
  } catch (error) {
    if (import.meta.env.DEV) console.error(`Failed to load ${insuranceType} medications:`, error);

    // Fallback to offline cache even if expired
    const fallbackCache = getCachedMedications();
    if (fallbackCache) {
      if (import.meta.env.DEV) console.log('[Loader] Using fallback offline cache');
      if (insuranceType === 'cnss') {
        return fallbackCache.cnss || [];
      }
      return fallbackCache.cnops || [];
    }

    return [];
  }
}

// Update the offline cache when we have fresh data
function updateOfflineCache() {
  if (cnopsCacheData || cnssCacheData) {
    cacheMedications({
      cnops: cnopsCacheData || [],
      cnss: cnssCacheData || []
    });
  }
}

// Preload both datasets for offline use
export async function preloadAllMedications() {
  await Promise.all([
    loadMedications('cnops'),
    loadMedications('cnss')
  ]);
  if (import.meta.env.DEV) console.log('[Loader] All medications preloaded');
}

export async function getAllMedications() {
  await preloadAllMedications();
  // We attach 'source' purely to distinguish them when combined, 
  // as done previously in the Calculator page
  const cnopsWithSource = (cnopsCacheData || []).map(m => ({ ...m, source: 'cnops' as const }));
  const cnssWithSource = (cnssCacheData || []).map(m => ({ ...m, source: 'cnss' as const }));
  return [...cnopsWithSource, ...cnssWithSource];
}

// Check if offline cache is available
export function hasOfflineData(): boolean {
  return isCacheValid();
}

export function searchMedications(query: string, insuranceType: 'cnops' | 'cnss' = 'cnops', limit: number = 50) {
  const cache = insuranceType === 'cnss' ? cnssCacheData : cnopsCacheData;

  if (!cache) {
    // Try offline cache as fallback
    const offlineCache = getCachedMedications();
    if (offlineCache) {
      const data = insuranceType === 'cnss' ? offlineCache.cnss : offlineCache.cnops;
      if (data) {
        return searchInArray(data, query, limit);
      }
    }
    return [];
  }

  return searchInArray(cache, query, limit);
}

function searchInArray(data: any[], query: string, limit: number) {
  const searchTerm = query.toLowerCase();
  const results = data.filter((med: any) =>
    med.name.toLowerCase().includes(searchTerm) ||
    med.dci?.toLowerCase().includes(searchTerm)
  );

  return results.slice(0, limit);
}
