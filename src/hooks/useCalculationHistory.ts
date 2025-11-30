/**
 * Calculation History Hook & Storage
 * Tracks user's calculation history
 */

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'taawidaty_calc_history';
const MAX_HISTORY_ITEMS = 50;

export interface CalculationHistoryItem {
  id: string;
  medications: Array<{
    id: number;
    name: string;
    ppv: number;
    reimbursement: number;
    patientPays: number;
    taux_remb: number;
  }>;
  totalPrice: number;
  totalReimbursement: number;
  totalPatientPays: number;
  calculatedAt: number;
  insuranceType: 'cnops' | 'cnss';
}

export const useCalculationHistory = () => {
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load calculation history:', e);
    }
  }, []);

  // Save to localStorage
  const saveHistory = useCallback((newHistory: CalculationHistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (e) {
      console.error('Failed to save calculation history:', e);
    }
  }, []);

  const addCalculation = useCallback((
    medications: CalculationHistoryItem['medications'],
    insuranceType: 'cnops' | 'cnss' = 'cnops'
  ) => {
    const newItem: CalculationHistoryItem = {
      id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      medications,
      totalPrice: medications.reduce((sum, m) => sum + m.ppv, 0),
      totalReimbursement: medications.reduce((sum, m) => sum + m.reimbursement, 0),
      totalPatientPays: medications.reduce((sum, m) => sum + m.patientPays, 0),
      calculatedAt: Date.now(),
      insuranceType
    };

    setHistory(prev => {
      const newHistory = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });

    return newItem;
  }, []);

  const removeCalculation = useCallback((id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  const getRecentCalculations = useCallback((count: number = 5) => {
    return history.slice(0, count);
  }, [history]);

  const getTodayCalculations = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    return history.filter(item => item.calculatedAt >= todayTimestamp);
  }, [history]);

  const getStatistics = useCallback(() => {
    if (history.length === 0) {
      return {
        totalCalculations: 0,
        totalSaved: 0,
        averageSaved: 0,
        mostCalculatedMed: null
      };
    }

    const totalSaved = history.reduce((sum, item) => sum + item.totalReimbursement, 0);
    
    // Find most calculated medication
    const medCounts: Record<string, { name: string; count: number }> = {};
    history.forEach(item => {
      item.medications.forEach(med => {
        if (!medCounts[med.name]) {
          medCounts[med.name] = { name: med.name, count: 0 };
        }
        medCounts[med.name].count++;
      });
    });

    const mostCalculated = Object.values(medCounts)
      .sort((a, b) => b.count - a.count)[0];

    return {
      totalCalculations: history.length,
      totalSaved: totalSaved,
      averageSaved: totalSaved / history.length,
      mostCalculatedMed: mostCalculated || null
    };
  }, [history]);

  return {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
    getRecentCalculations,
    getTodayCalculations,
    getStatistics,
    count: history.length
  };
};

export default useCalculationHistory;
