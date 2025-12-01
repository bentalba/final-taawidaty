/**
 * Savings Counter Component
 * Displays user's total savings - creates habit retention
 * "You've saved X DH with TAAWIDATY"
 * 
 * @author BENTALBA ZAKARIA
 */

import { motion } from 'framer-motion';
import { TrendingUp, Flame } from 'lucide-react';
import { useSavingsStats } from '@/hooks/useSavingsStats';
import { formatMoroccanPrice } from '@/utils/darija';
import { cn } from '@/lib/utils';

interface SavingsCounterProps {
  language: 'ar' | 'fr';
  className?: string;
  variant?: 'compact' | 'full';
}

export function SavingsCounter({ language, className, variant = 'compact' }: SavingsCounterProps) {
  const stats = useSavingsStats();
  const isRTL = language === 'ar';

  // Don't show if no savings yet
  if (stats.totalSaved === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
          "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400",
          "text-sm font-medium",
          className
        )}
      >
        <TrendingUp className="w-4 h-4" />
        <span className={isRTL ? 'font-arabic' : ''}>
          {language === 'ar' ? 'وفرت: ' : 'Économisé: '}
          <span className="font-bold">{formatMoroccanPrice(stats.totalSaved)}</span>
        </span>
      </motion.div>
    );
  }

  // Full variant with more details
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "p-4 rounded-2xl bg-gradient-to-br from-success-50 to-success-100",
        "dark:from-success-900/30 dark:to-success-800/20",
        "border border-success-200 dark:border-success-800",
        className
      )}
    >
      <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
        <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
          <div className="w-12 h-12 rounded-xl bg-success-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className={cn("text-sm text-success-600 dark:text-success-400", isRTL && 'font-arabic')}>
              {language === 'ar' ? 'المبلغ الموفر' : 'Total économisé'}
            </p>
            <motion.p 
              className="text-2xl font-bold text-success-700 dark:text-success-300"
              key={stats.totalSaved}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {formatMoroccanPrice(stats.totalSaved)}
            </motion.p>
          </div>
        </div>

        {/* Streak badge */}
        {stats.streak > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
              {stats.streak}
            </span>
          </motion.div>
        )}
      </div>

      {/* Stats row */}
      <div className={cn(
        "mt-4 pt-3 border-t border-success-200 dark:border-success-800",
        "flex justify-between text-xs",
        isRTL && "flex-row-reverse"
      )}>
        <div className={cn("text-center", isRTL && 'font-arabic')}>
          <p className="text-success-500 dark:text-success-500">
            {language === 'ar' ? 'اليوم' : "Aujourd'hui"}
          </p>
          <p className="font-bold text-success-700 dark:text-success-300">
            {formatMoroccanPrice(stats.todaySaved)}
          </p>
        </div>
        <div className={cn("text-center", isRTL && 'font-arabic')}>
          <p className="text-success-500 dark:text-success-500">
            {language === 'ar' ? 'هذا الشهر' : 'Ce mois'}
          </p>
          <p className="font-bold text-success-700 dark:text-success-300">
            {formatMoroccanPrice(stats.thisMonthSaved)}
          </p>
        </div>
        <div className={cn("text-center", isRTL && 'font-arabic')}>
          <p className="text-success-500 dark:text-success-500">
            {language === 'ar' ? 'حسابات' : 'Calculs'}
          </p>
          <p className="font-bold text-success-700 dark:text-success-300">
            {stats.totalCalculations}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SavingsCounter;
