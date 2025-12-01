/**
 * Savings Statistics Hook
 * Tracks total savings across all calculations for habit formation
 * Shows users the value they're getting = retention hook
 * 
 * @author BENTALBA ZAKARIA
 */

import { useMemo } from 'react';
import { useCalculationHistory } from './useCalculationHistory';

export interface SavingsStats {
  totalSaved: number;
  todaySaved: number;
  thisMonthSaved: number;
  averageSavingsPerCalc: number;
  bestSaving: number;
  totalCalculations: number;
  streak: number; // Days in a row using the app
}

export const useSavingsStats = (): SavingsStats => {
  const { history } = useCalculationHistory();

  return useMemo(() => {
    if (history.length === 0) {
      return {
        totalSaved: 0,
        todaySaved: 0,
        thisMonthSaved: 0,
        averageSavingsPerCalc: 0,
        bestSaving: 0,
        totalCalculations: 0,
        streak: 0
      };
    }

    // Calculate total saved
    const totalSaved = history.reduce((sum, calc) => sum + calc.totalReimbursement, 0);

    // Today's savings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    const todaySaved = history
      .filter(calc => calc.calculatedAt >= todayTimestamp)
      .reduce((sum, calc) => sum + calc.totalReimbursement, 0);

    // This month's savings
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
    const thisMonthSaved = history
      .filter(calc => calc.calculatedAt >= monthStart)
      .reduce((sum, calc) => sum + calc.totalReimbursement, 0);

    // Best single calculation saving
    const bestSaving = Math.max(...history.map(calc => calc.totalReimbursement));

    // Average savings per calculation
    const averageSavingsPerCalc = totalSaved / history.length;

    // Calculate streak (consecutive days)
    const streak = calculateStreak(history);

    return {
      totalSaved,
      todaySaved,
      thisMonthSaved,
      averageSavingsPerCalc,
      bestSaving,
      totalCalculations: history.length,
      streak
    };
  }, [history]);
};

/**
 * Calculate consecutive days streak
 */
function calculateStreak(history: { calculatedAt: number }[]): number {
  if (history.length === 0) return 0;

  const uniqueDays = new Set<string>();
  history.forEach(calc => {
    const date = new Date(calc.calculatedAt);
    uniqueDays.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
  });

  const sortedDays = Array.from(uniqueDays).sort().reverse();
  
  // Check if today or yesterday is in the list (streak must be active)
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

  if (!sortedDays.includes(todayStr) && !sortedDays.includes(yesterdayStr)) {
    return 0; // Streak broken
  }

  let streak = 1;
  for (let i = 0; i < sortedDays.length - 1; i++) {
    const current = new Date(sortedDays[i].split('-').map(Number).join('/'));
    const next = new Date(sortedDays[i + 1].split('-').map(Number).join('/'));
    const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export default useSavingsStats;
