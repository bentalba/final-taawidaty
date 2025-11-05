/**
 * useMedicationSearch Hook
 * Manages Web Worker for medication search
 * Provides optimized search with virtual scrolling support
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Medication } from '@/types/medication';

interface UseMedicationSearchOptions {
  insuranceType: 'cnops' | 'cnss';
  medications: Medication[];
  limit?: number;
}

interface SearchState {
  results: Medication[];
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export function useMedicationSearch({
  insuranceType,
  medications,
  limit = 50,
}: UseMedicationSearchOptions) {
  const workerRef = useRef<Worker | null>(null);
  const [state, setState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null,
    isInitialized: false,
  });

  // Initialize Web Worker
  useEffect(() => {
    // Create worker instance
    workerRef.current = new Worker(
      new URL('../workers/medicationSearch.worker.ts', import.meta.url),
      { type: 'module' }
    );

    // Handle worker messages
    workerRef.current.onmessage = (event) => {
      const { type, payload } = event.data;

      switch (type) {
        case 'INIT_SUCCESS':
          setState((prev) => ({
            ...prev,
            isInitialized: true,
            isLoading: false,
          }));
          break;

        case 'SEARCH_RESULTS':
          setState((prev) => ({
            ...prev,
            results: payload,
            isLoading: false,
            error: null,
          }));
          break;

        case 'ERROR':
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: payload.message,
          }));
          break;
      }
    };

    // Handle worker errors
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Search worker error',
      }));
    };

    // Initialize worker with medications data
    if (medications.length > 0) {
      setState((prev) => ({ ...prev, isLoading: true }));
      workerRef.current.postMessage({
        type: 'INIT',
        payload: { medications },
      });
    }

    // Cleanup on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [medications]);

  // Search function
  const search = useCallback(
    (query: string) => {
      if (!workerRef.current || !state.isInitialized) {
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true }));

      workerRef.current.postMessage({
        type: 'SEARCH',
        payload: {
          query,
          insuranceType,
          limit,
        },
      });
    },
    [insuranceType, limit, state.isInitialized]
  );

  // Get medication by ID
  const getMedicationById = useCallback(
    (id: string): Promise<Medication | null> => {
      return new Promise((resolve, reject) => {
        if (!workerRef.current || !state.isInitialized) {
          reject(new Error('Worker not initialized'));
          return;
        }

        const handleMessage = (event: MessageEvent) => {
          const { type, payload } = event.data;
          if (type === 'MEDICATION_DATA') {
            workerRef.current?.removeEventListener('message', handleMessage);
            resolve(payload);
          } else if (type === 'ERROR') {
            workerRef.current?.removeEventListener('message', handleMessage);
            reject(new Error(payload.message));
          }
        };

        workerRef.current.addEventListener('message', handleMessage);
        workerRef.current.postMessage({
          type: 'GET_BY_ID',
          payload: { id },
        });
      });
    },
    [state.isInitialized]
  );

  return {
    results: state.results,
    isLoading: state.isLoading,
    error: state.error,
    isInitialized: state.isInitialized,
    search,
    getMedicationById,
  };
}
