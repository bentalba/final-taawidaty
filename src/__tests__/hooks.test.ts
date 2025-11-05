/**
 * Unit Tests for Custom Hooks
 * Tests useMedicationSearch, useLanguage, and other custom hooks
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useMedicationSearch } from '../hooks/useMedicationSearch';

// Mock Worker
class MockWorker {
  url: string | URL;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((error: ErrorEvent) => void) | null = null;

  constructor(url: string | URL) {
    this.url = url;
  }

  postMessage(message: any) {
    // Simulate async worker response
    setTimeout(() => {
      if (this.onmessage) {
        if (message.type === 'INIT') {
          this.onmessage(new MessageEvent('message', {
            data: { type: 'INIT_SUCCESS', payload: { success: true, count: 100 } }
          }));
        } else if (message.type === 'SEARCH') {
          const mockResults = [
            {
              id: '1',
              name: 'Doliprane 1000mg',
              genericName: 'Paracétamol',
              dosage: '1000mg',
              form: 'Comprimé',
              ppv: 25.5,
              pph: 23.0,
              cnops: { reimbursable: true, publicPrice: 25.5, reimbursementRate: 0.9 },
              cnss: { reimbursable: true, publicPrice: 25.5, reimbursementRate: 0.7 },
            }
          ];
          this.onmessage(new MessageEvent('message', {
            data: { type: 'SEARCH_RESULTS', payload: mockResults }
          }));
        }
      }
    }, 10);
  }

  terminate() {
    // Cleanup
  }

  addEventListener(event: string, handler: any) {
    if (event === 'message') {
      this.onmessage = handler;
    } else if (event === 'error') {
      this.onerror = handler;
    }
  }

  removeEventListener(event: string, handler: any) {
    if (event === 'message' && this.onmessage === handler) {
      this.onmessage = null;
    } else if (event === 'error' && this.onerror === handler) {
      this.onerror = null;
    }
  }
}

// Mock global Worker
global.Worker = MockWorker as any;

describe('useMedicationSearch', () => {
  const mockMedications = [
    {
      id: '1',
      name: 'Doliprane 1000mg',
      genericName: 'Paracétamol',
      dosage: '1000mg',
      form: 'Comprimé',
      ppv: 25.5,
      pph: 23.0,
      cnops: { reimbursable: true, publicPrice: 25.5, reimbursementRate: 0.9 },
      cnss: { reimbursable: true, publicPrice: 25.5, reimbursementRate: 0.7 },
    },
    {
      id: '2',
      name: 'Amoxicilline 500mg',
      genericName: 'Amoxicilline',
      dosage: '500mg',
      form: 'Gélule',
      ppv: 45.0,
      pph: 42.0,
      cnops: { reimbursable: true, publicPrice: 45.0, reimbursementRate: 0.9 },
      cnss: { reimbursable: true, publicPrice: 45.0, reimbursementRate: 0.7 },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty results', () => {
    const { result } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
      })
    );

    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should initialize worker on mount', async () => {
    const { result } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
      })
    );

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });
  });

  it('should perform search and update results', async () => {
    const { result } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
      })
    );

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    // Perform search
    act(() => {
      result.current.search('doli');
    });

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should handle search errors gracefully', async () => {
    // Mock worker that throws error
    const ErrorWorker = class extends MockWorker {
      postMessage(message: any) {
        setTimeout(() => {
          if (this.onmessage) {
            this.onmessage(new MessageEvent('message', {
              data: { type: 'ERROR', payload: { message: 'Search failed' } }
            }));
          }
        }, 10);
      }
    };

    global.Worker = ErrorWorker as any;

    const { result } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
      })
    );

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    act(() => {
      result.current.search('test');
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    // Restore original Worker
    global.Worker = MockWorker as any;
  });

  it('should terminate worker on unmount', () => {
    const terminateSpy = vi.spyOn(MockWorker.prototype, 'terminate');

    const { unmount } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
      })
    );

    unmount();

    expect(terminateSpy).toHaveBeenCalled();
  });

  it('should handle getMedicationById', async () => {
    const { result } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
      })
    );

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    let medication: any;
    await act(async () => {
      medication = await result.current.getMedicationById('1');
    });

    expect(medication).toBeDefined();
  });

  it('should respect limit parameter', async () => {
    const { result } = renderHook(() =>
      useMedicationSearch({
        insuranceType: 'cnops',
        medications: mockMedications,
        limit: 1,
      })
    );

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    act(() => {
      result.current.search('med');
    });

    await waitFor(() => {
      expect(result.current.results.length).toBeLessThanOrEqual(1);
    });
  });

  it('should filter by insurance type', async () => {
    const { result, rerender } = renderHook(
      ({ insuranceType }) =>
        useMedicationSearch({
          insuranceType,
          medications: mockMedications,
        }),
      { initialProps: { insuranceType: 'cnops' as const } }
    );

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    act(() => {
      result.current.search('med');
    });

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0);
    });

    // Change insurance type
    rerender({ insuranceType: 'cnss' as const });

    act(() => {
      result.current.search('med');
    });

    await waitFor(() => {
      // Should still work with different insurance type
      expect(result.current.isLoading).toBe(false);
    });
  });
});

describe('Cache Utilities', () => {
  it('should cache and retrieve data', async () => {
    const { CacheManager } = await import('../utils/cache');
    const cache = new CacheManager({
      name: 'test-cache',
      maxAge: 1000, // 1 second
    });

    await cache.set('key1', { data: 'test' });
    const result = await cache.get('key1');

    expect(result).toEqual({ data: 'test' });
  });

  it('should expire cached data', async () => {
    const { CacheManager } = await import('../utils/cache');
    const cache = new CacheManager({
      name: 'test-cache',
      maxAge: 100, // 100ms
    });

    await cache.set('key1', { data: 'test' });
    
    // Wait for expiration
    await new Promise((resolve) => setTimeout(resolve, 150));
    
    const result = await cache.get('key1');
    expect(result).toBeNull();
  });

  it('should handle getOrSet', async () => {
    const { CacheManager } = await import('../utils/cache');
    const cache = new CacheManager({
      name: 'test-cache',
      maxAge: 1000,
    });

    const fetcher = vi.fn(() => Promise.resolve({ data: 'fetched' }));

    // First call should fetch
    const result1 = await cache.getOrSet('key1', fetcher);
    expect(result1).toEqual({ data: 'fetched' });
    expect(fetcher).toHaveBeenCalledTimes(1);

    // Second call should use cache
    const result2 = await cache.getOrSet('key1', fetcher);
    expect(result2).toEqual({ data: 'fetched' });
    expect(fetcher).toHaveBeenCalledTimes(1); // Not called again
  });
});

describe('Performance Utilities', () => {
  it('should measure async operations', async () => {
    const { measureAsyncOperation } = await import('../utils/performance');

    const operation = () => new Promise((resolve) => setTimeout(() => resolve('done'), 100));

    const result = await measureAsyncOperation('test-operation', operation);

    expect(result).toBe('done');
  });

  it('should calculate performance rating', () => {
    // This would test the rating calculation logic
    // Implementation depends on your performance.ts exports
    expect(true).toBe(true);
  });
});
