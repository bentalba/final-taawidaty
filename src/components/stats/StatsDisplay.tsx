import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Users, Calculator, TrendingUp, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay?: number;
}

function StatItem({ icon: Icon, value, suffix = '', label, color, delay = 0 }: StatItemProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  const counterValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
  });

  const displayValue = useTransform(counterValue, (val) => {
    if (value >= 1000) {
      return (val / 1000).toFixed(1);
    }
    return Math.round(val).toString();
  });

  useEffect(() => {
    if (!hasAnimated) {
      const timeout = setTimeout(() => {
        counterValue.set(value);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [value, hasAnimated, counterValue, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-neutral-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-white border-2 border-neutral-100 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
          `bg-${color}/10`
        )}>
          <Icon className={cn("w-7 h-7", `text-${color}`)} />
        </div>

        {/* Value */}
        <div className="mb-2">
          <motion.span className="text-4xl font-black text-neutral-900">
            {displayValue}
          </motion.span>
          <span className="text-2xl font-black text-neutral-900">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-neutral-600">{label}</p>

        {/* Animated underline */}
        <motion.div
          className={cn("h-1 rounded-full mt-4", `bg-${color}`)}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: delay / 1000 + 0.3, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

interface StatsDisplayProps {
  className?: string;
}

export function StatsDisplay({ className }: StatsDisplayProps) {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: 50000,
      suffix: '+',
      label: t('stats.users', 'Utilisateurs actifs'),
      color: 'trust-blue',
      delay: 0,
    },
    {
      icon: Calculator,
      value: 150000,
      suffix: '+',
      label: t('stats.calculations', 'Calculs effectués'),
      color: 'success-green',
      delay: 100,
    },
    {
      icon: TrendingUp,
      value: 2500,
      suffix: 'K MAD',
      label: t('stats.savings', 'Économies générées'),
      color: 'prestige-gold',
      delay: 200,
    },
    {
      icon: Shield,
      value: 99,
      suffix: '%',
      label: t('stats.accuracy', 'Précision des calculs'),
      color: 'morocco-green',
      delay: 300,
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {t('stats.title', 'Rejoignez des milliers d\'utilisateurs')}
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {t('stats.subtitle', 'TAAWIDATY aide quotidiennement les Marocains à comprendre leurs remboursements médicaux')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-wrap justify-center gap-6"
      >
        <div className="flex items-center gap-2 bg-white border-2 border-neutral-100 rounded-full px-6 py-3 shadow-soft">
          <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-neutral-700">
            {t('stats.badge1', 'Données officielles AMO')}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white border-2 border-neutral-100 rounded-full px-6 py-3 shadow-soft">
          <div className="w-2 h-2 bg-trust-blue rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-neutral-700">
            {t('stats.badge2', '100% Gratuit')}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white border-2 border-neutral-100 rounded-full px-6 py-3 shadow-soft">
          <div className="w-2 h-2 bg-prestige-gold rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-neutral-700">
            {t('stats.badge3', 'Résultats instantanés')}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
