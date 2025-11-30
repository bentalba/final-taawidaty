/**
 * Favorites Hook - Persistent favorites storage for medications
 * Uses localStorage to persist user's favorite medications
 */

import { useState, useEffect, useCallback } from 'react';

export interface FavoriteMedication {
  id: number;
  name: string;
  ppv: number;
  base_remb: number;
  taux_remb: number;
  dci?: string;
  addedAt: number;
}

const FAVORITES_KEY = 'taawidaty_favorites';
const RECENT_SEARCHES_KEY = 'taawidaty_recent_searches';
const MAX_RECENT_SEARCHES = 10;

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMedication[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites:', e);
    }
  }, []);

  // Save to localStorage whenever favorites change
  const saveFavorites = useCallback((newFavorites: FavoriteMedication[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, []);

  const addFavorite = useCallback((medication: Omit<FavoriteMedication, 'addedAt'>) => {
    setFavorites(prev => {
      // Check if already exists
      if (prev.some(f => f.id === medication.id)) {
        return prev;
      }
      const newFavorites = [...prev, { ...medication, addedAt: Date.now() }];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((medicationId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(f => f.id !== medicationId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const toggleFavorite = useCallback((medication: Omit<FavoriteMedication, 'addedAt'>) => {
    const exists = favorites.some(f => f.id === medication.id);
    if (exists) {
      removeFavorite(medication.id);
      return false;
    } else {
      addFavorite(medication);
      return true;
    }
  }, [favorites, addFavorite, removeFavorite]);

  const isFavorite = useCallback((medicationId: number) => {
    return favorites.some(f => f.id === medicationId);
  }, [favorites]);

  const clearAllFavorites = useCallback(() => {
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    count: favorites.length
  };
};

// Recent Searches Hook
export interface RecentSearch {
  id: number;
  name: string;
  ppv: number;
  searchedAt: number;
}

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recent searches:', e);
    }
  }, []);

  const addRecentSearch = useCallback((medication: { id: number; name: string; ppv: number }) => {
    setRecentSearches(prev => {
      // Remove if already exists
      const filtered = prev.filter(s => s.id !== medication.id);
      // Add to beginning
      const newSearches = [
        { ...medication, searchedAt: Date.now() },
        ...filtered
      ].slice(0, MAX_RECENT_SEARCHES);
      
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      return newSearches;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  }, []);

  const removeRecentSearch = useCallback((medicationId: number) => {
    setRecentSearches(prev => {
      const newSearches = prev.filter(s => s.id !== medicationId);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      return newSearches;
    });
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    removeRecentSearch
  };
};

export default useFavorites;
