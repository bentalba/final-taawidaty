/**
 * Social Proof Badge Component
 * Shows live calculation count to build trust
 * "5,432 personnes ont calculé aujourd'hui"
 * 
 * @author BENTALBA ZAKARIA
 */

import { motion } from 'framer-motion';
import { Users, Activity } from 'lucide-react';
import { useSocialProof } from '@/hooks/useSocialProof';
import { cn } from '@/lib/utils';

interface SocialProofBadgeProps {
  language: 'ar' | 'fr';
  className?: string;
  variant?: 'inline' | 'card';
  showCity?: boolean;
}

export function SocialProofBadge({ 
  language, 
  className, 
  variant = 'inline',
  showCity = false 
}: SocialProofBadgeProps) {
  const stats = useSocialProof(language);
  const isRTL = language === 'ar';

  // Format number with locale
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-MA').format(num);
  };

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400",
          className
        )}
      >
        {stats.isActive && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        )}
        <Users className="w-4 h-4" />
        <span className={isRTL ? 'font-arabic' : ''}>
          {language === 'ar' 
            ? `${formatNumber(stats.todayCount)} مستخدم اليوم`
            : `${formatNumber(stats.todayCount)} utilisateurs aujourd'hui`
          }
        </span>
      </motion.div>
    );
  }

  // Card variant with more details
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50",
        "border border-slate-200 dark:border-slate-700",
        className
      )}
    >
      <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          {stats.isActive && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}
        </div>
        
        <div className={cn("flex-1", isRTL && "text-right")}>
          <p className={cn(
            "text-lg font-bold text-slate-900 dark:text-white",
            isRTL && 'font-arabic'
          )}>
            {formatNumber(stats.todayCount)}
          </p>
          <p className={cn(
            "text-xs text-slate-500 dark:text-slate-400",
            isRTL && 'font-arabic'
          )}>
            {language === 'ar' 
              ? 'حساب اليوم'
              : "calculs aujourd'hui"
            }
          </p>
        </div>

        {showCity && (
          <div className={cn(
            "text-right px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700",
            isRTL && "text-left"
          )}>
            <p className={cn(
              "text-xs text-slate-400 dark:text-slate-500",
              isRTL && 'font-arabic'
            )}>
              {language === 'ar' ? 'آخر من' : 'Dernier de'}
            </p>
            <p className={cn(
              "text-sm font-medium text-slate-600 dark:text-slate-300",
              isRTL && 'font-arabic'
            )}>
              {language === 'ar' ? stats.recentCity : stats.recentCityFr}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default SocialProofBadge;
