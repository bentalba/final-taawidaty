/**
 * React Hook for Medication Search Web Worker
 * Provides easy access to Web Worker for medication search
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  Medication,
  SearchFilters,
  WorkerMessage,
  WorkerResponse,
} from '@/workers/medication.worker';

interface UseMedicationWorkerReturn {
  search: (query: string, filters?: SearchFilters) => Promise<Medication[]>;
  getStats: () => Promise<any>;
  isReady: boolean;
  error: Error | null;
}

export function useMedicationWorker(
  medications: Medication[]
): UseMedicationWorkerReturn {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const messageCallbacks = useRef<Map<string, (data: any) => void>>(new Map());

  // Initialize worker
  useEffect(() => {
    if (typeof window === 'undefined' || !window.Worker) {
      setError(new Error('Web Workers not supported'));
      return;
    }

    try {
      // Create worker
      workerRef.current = new Worker(
        new URL('../workers/medication.worker.ts', import.meta.url),
        { type: 'module' }
      );

      // Setup message handler
      workerRef.current.onmessage = (e: MessageEvent<WorkerResponse>) => {
        const { type, payload, id, error: workerError } = e.data;

        const callback = messageCallbacks.current.get(id);
        if (callback) {
          if (workerError) {
            callback({ error: new Error(workerError) });
          } else {
            callback({ data: payload });
          }
          messageCallbacks.current.delete(id);
        }
      };

      // Setup error handler
      workerRef.current.onerror = (e) => {
        setError(new Error(e.message));
        console.error('Worker error:', e);
      };

      // Initialize worker with data
      sendMessage('INIT', medications).then(() => {
        setIsReady(true);
      });
    } catch (err) {
      setError(err as Error);
    }

    // Cleanup
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      messageCallbacks.current.clear();
    };
  }, [medications]);

  /**
   * Send message to worker and wait for response
   */
  const sendMessage = useCallback(
    (type: string, payload: any): Promise<any> => {
      return new Promise((resolve, reject) => {
        if (!workerRef.current) {
          reject(new Error('Worker not initialized'));
          return;
        }

        const id = `${Date.now()}-${Math.random()}`;

        // Store callback
        messageCallbacks.current.set(id, (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        });

        // Send message
        const message: WorkerMessage = { type, payload, id };
        workerRef.current.postMessage(message);

        // Timeout after 5 seconds
        setTimeout(() => {
          if (messageCallbacks.current.has(id)) {
            messageCallbacks.current.delete(id);
            reject(new Error('Worker timeout'));
          }
        }, 5000);
      });
    },
    []
  );

  /**
   * Search medications
   */
  const search = useCallback(
    async (query: string, filters: SearchFilters = {}): Promise<Medication[]> => {
      if (!isReady) {
        throw new Error('Worker not ready');
      }

      return sendMessage('SEARCH', { query, filters });
    },
    [isReady, sendMessage]
  );

  /**
   * Get statistics
   */
  const getStats = useCallback(async () => {
    if (!isReady) {
      throw new Error('Worker not ready');
    }

    return sendMessage('GET_STATS', null);
  }, [isReady, sendMessage]);

  return {
    search,
    getStats,
    isReady,
    error,
  };
}

/**
 * Fallback for when Web Workers are not available
 * Uses regular Fuse.js search on main thread
 */
import Fuse from 'fuse.js';

export function useMedicationSearchFallback(
  medications: Medication[]
): UseMedicationWorkerReturn {
  const fuseRef = useRef<Fuse<Medication> | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Fuse.js
    fuseRef.current = new Fuse(medications, {
      keys: [
        { name: 'name', weight: 0.6 },
        { name: 'genericName', weight: 0.4 },
        { name: 'dosage', weight: 0.2 },
      ],
      threshold: 0.3,
      distance: 50,
      includeScore: true,
    });

    setIsReady(true);
  }, [medications]);

  const search = useCallback(
    async (query: string, filters: SearchFilters = {}): Promise<Medication[]> => {
      if (!fuseRef.current) {
        return [];
      }

      if (!query || query.trim().length < 2) {
        return [];
      }

      const results = fuseRef.current.search(query).slice(0, 8);

      let medications = results.map((r) => r.item);

      // Apply filters
      if (filters.insuranceType) {
        medications = medications.filter(
          (m) => m.reimbursementRate[filters.insuranceType!] > 0
        );
      }

      if (filters.safetyLevel) {
        medications = medications.filter(
          (m) => m.safetyLevel === filters.safetyLevel
        );
      }

      if (filters.maxPrice) {
        medications = medications.filter((m) => m.ppv <= filters.maxPrice!);
      }

      return medications;
    },
    []
  );

  const getStats = useCallback(async () => {
    return {
      total: medications.length,
      safe: medications.filter((m) => m.safetyLevel === 'safe').length,
      warning: medications.filter((m) => m.safetyLevel === 'warning').length,
      restricted: medications.filter((m) => m.safetyLevel === 'restricted')
        .length,
      avgPrice:
        medications.reduce((sum, m) => sum + m.ppv, 0) / medications.length,
    };
  }, [medications]);

  return {
    search,
    getStats,
    isReady,
    error: null,
  };
}
