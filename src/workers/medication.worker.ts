/**
 * Medication Search Web Worker
 * Offloads heavy search processing from main thread
 * for butter-smooth 60fps performance
 */

import Fuse from 'fuse.js';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection';
  ppv: number;
  reimbursementRate: {
    cnops: number;
    cnss: number;
  };
  safetyLevel: 'safe' | 'warning' | 'restricted';
  requiresPrescription: boolean;
}

interface SearchFilters {
  insuranceType?: 'cnops' | 'cnss';
  safetyLevel?: 'safe' | 'warning' | 'restricted';
  minCoverage?: number;
  maxPrice?: number;
}

interface WorkerMessage {
  type: 'INIT' | 'SEARCH' | 'FILTER' | 'GET_STATS';
  payload: any;
  id: string;
}

interface WorkerResponse {
  type: string;
  payload: any;
  id: string;
  error?: string;
}

class MedicationWorker {
  private medications: Map<string, Medication> = new Map();
  private fuse: Fuse<Medication> | null = null;
  private initialized = false;

  /**
   * Initialize worker with medication data
   */
  async initialize(medicationsData: Medication[]): Promise<void> {
    try {
      // Index medications for fast lookup
      medicationsData.forEach((med) => {
        this.medications.set(med.id, med);
      });

      // Initialize Fuse.js for fuzzy search
      this.fuse = new Fuse(medicationsData, {
        keys: [
          { name: 'name', weight: 0.6 },
          { name: 'genericName', weight: 0.4 },
          { name: 'dosage', weight: 0.2 },
        ],
        threshold: 0.3,
        distance: 50,
        includeScore: true,
        useExtendedSearch: true,
        minMatchCharLength: 2,
      });

      this.initialized = true;
    } catch (error) {
      throw new Error(`Worker initialization failed: ${error}`);
    }
  }

  /**
   * Search medications with fuzzy matching
   */
  searchMedications(query: string, filters: SearchFilters = {}): Medication[] {
    if (!this.initialized || !this.fuse) {
      throw new Error('Worker not initialized');
    }

    if (!query || query.trim().length < 2) {
      return [];
    }

    // Perform fuzzy search
    const searchResults = this.fuse.search(query).slice(0, 50);

    // Map results with scores
    let results = searchResults.map((result) => ({
      ...result.item,
      score: result.score,
    }));

    // Apply filters
    results = this.applyFilters(results, filters);

    // Sort by relevance and safety
    results.sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.name.toLowerCase().includes(query.toLowerCase());
      const bExact = b.name.toLowerCase().includes(query.toLowerCase());

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // Then by safety level
      if (a.safetyLevel !== b.safetyLevel) {
        const safetyOrder = { safe: 0, warning: 1, restricted: 2 };
        return safetyOrder[a.safetyLevel] - safetyOrder[b.safetyLevel];
      }

      // Finally by search score
      return (a.score || 0) - (b.score || 0);
    });

    // Limit results
    return results.slice(0, 8);
  }

  /**
   * Apply filters to search results
   */
  private applyFilters(
    medications: Medication[],
    filters: SearchFilters
  ): Medication[] {
    let filtered = medications;

    // Filter by insurance coverage
    if (filters.insuranceType) {
      const minCoverage = filters.minCoverage || 0;
      filtered = filtered.filter(
        (med) => med.reimbursementRate[filters.insuranceType!] >= minCoverage
      );
    }

    // Filter by safety level
    if (filters.safetyLevel) {
      filtered = filtered.filter(
        (med) => med.safetyLevel === filters.safetyLevel
      );
    }

    // Filter by max price
    if (filters.maxPrice) {
      filtered = filtered.filter((med) => med.ppv <= filters.maxPrice!);
    }

    return filtered;
  }

  /**
   * Get statistics about medications
   */
  getStats(): {
    total: number;
    safe: number;
    warning: number;
    restricted: number;
    avgPrice: number;
  } {
    const medications = Array.from(this.medications.values());

    return {
      total: medications.length,
      safe: medications.filter((m) => m.safetyLevel === 'safe').length,
      warning: medications.filter((m) => m.safetyLevel === 'warning').length,
      restricted: medications.filter((m) => m.safetyLevel === 'restricted')
        .length,
      avgPrice:
        medications.reduce((sum, m) => sum + m.ppv, 0) / medications.length,
    };
  }

  /**
   * Get medication by ID
   */
  getMedicationById(id: string): Medication | null {
    return this.medications.get(id) || null;
  }
}

// Worker instance
const worker = new MedicationWorker();

// Message handler
self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = e.data;

  try {
    let result: any;

    switch (type) {
      case 'INIT':
        await worker.initialize(payload);
        result = { success: true, count: payload.length };
        break;

      case 'SEARCH':
        result = worker.searchMedications(payload.query, payload.filters || {});
        break;

      case 'FILTER':
        const allMeds = Array.from(worker['medications'].values());
        result = worker['applyFilters'](allMeds, payload);
        break;

      case 'GET_STATS':
        result = worker.getStats();
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }

    // Send success response
    const response: WorkerResponse = {
      type: `${type}_SUCCESS`,
      payload: result,
      id,
    };
    self.postMessage(response);
  } catch (error: any) {
    // Send error response
    const errorResponse: WorkerResponse = {
      type: `${type}_ERROR`,
      payload: null,
      id,
      error: error.message || 'Unknown error',
    };
    self.postMessage(errorResponse);
  }
};

// Export types for main thread
export type { Medication, SearchFilters, WorkerMessage, WorkerResponse };
