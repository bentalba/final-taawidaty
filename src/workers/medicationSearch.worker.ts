/**
 * Medication Search Web Worker
 * Handles heavy search operations in a separate thread
 * to keep the main UI thread responsive
 */

import Fuse from 'fuse.js';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: string;
  ppv: number;
  pph: number;
  cnops: {
    reimbursable: boolean;
    publicPrice: number;
    reimbursementRate: number;
  };
  cnss: {
    reimbursable: boolean;
    publicPrice: number;
    reimbursementRate: number;
  };
}

interface SearchMessage {
  type: 'INIT' | 'SEARCH' | 'GET_BY_ID';
  payload: {
    medications?: Medication[];
    query?: string;
    insuranceType?: 'cnops' | 'cnss';
    limit?: number;
    id?: string;
  };
}

let fuseInstance: Fuse<Medication> | null = null;
let medicationsData: Medication[] = [];

// Fuse.js configuration for optimal search
const fuseOptions: Fuse.IFuseOptions<Medication> = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'genericName', weight: 0.3 },
    { name: 'dosage', weight: 0.2 },
    { name: 'form', weight: 0.1 },
  ],
  threshold: 0.3,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  useExtendedSearch: true,
  ignoreLocation: true,
};

// Initialize Fuse instance with medications data
function initializeSearch(medications: Medication[]) {
  medicationsData = medications;
  fuseInstance = new Fuse(medications, fuseOptions);
  
  return {
    success: true,
    count: medications.length,
  };
}

// Perform search with filters
function searchMedications(
  query: string,
  insuranceType: 'cnops' | 'cnss',
  limit: number = 50
): Medication[] {
  if (!fuseInstance) {
    return [];
  }

  // If no query, return filtered by reimbursability
  if (!query || query.trim() === '') {
    return medicationsData
      .filter((med) => med[insuranceType].reimbursable)
      .slice(0, limit);
  }

  // Perform fuzzy search
  const results = fuseInstance.search(query);

  // Filter by insurance type reimbursability and apply limit
  return results
    .map((result) => result.item)
    .filter((med) => med[insuranceType].reimbursable)
    .slice(0, limit);
}

// Get medication by ID (optimized with Map for O(1) lookup)
const medicationMap = new Map<string, Medication>();

function getMedicationById(id: string): Medication | null {
  // Build map on first access
  if (medicationMap.size === 0 && medicationsData.length > 0) {
    medicationsData.forEach((med) => {
      medicationMap.set(med.id, med);
    });
  }

  return medicationMap.get(id) || null;
}

// Handle messages from main thread
self.onmessage = (event: MessageEvent<SearchMessage>) => {
  const { type, payload } = event.data;

  try {
    switch (type) {
      case 'INIT': {
        if (!payload.medications) {
          throw new Error('No medications data provided');
        }
        const result = initializeSearch(payload.medications);
        self.postMessage({ type: 'INIT_SUCCESS', payload: result });
        break;
      }

      case 'SEARCH': {
        if (!payload.query || !payload.insuranceType) {
          throw new Error('Missing search parameters');
        }
        const results = searchMedications(
          payload.query,
          payload.insuranceType,
          payload.limit
        );
        self.postMessage({ type: 'SEARCH_RESULTS', payload: results });
        break;
      }

      case 'GET_BY_ID': {
        if (!payload.id) {
          throw new Error('Missing medication ID');
        }
        const medication = getMedicationById(payload.id);
        self.postMessage({ type: 'MEDICATION_DATA', payload: medication });
        break;
      }

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      payload: { message: error instanceof Error ? error.message : 'Unknown error' },
    });
  }
};

// Export types for TypeScript
export type { SearchMessage, Medication };
