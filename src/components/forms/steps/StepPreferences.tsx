import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Settings, Bell, History, Share2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';
import { cn } from '@/lib/utils';

const PREFERENCES = [
  {
    name: 'receiveAlerts',
    icon: Bell,
    title: 'Receive price alerts',
    titleKey: 'calculator.preferences.alerts',
    description: 'Get notified when medication prices change',
    descriptionKey: 'calculator.preferences.alertsDesc',
    color: 'trust-blue',
    defaultValue: true
  },
  {
    name: 'saveHistory',
    icon: History,
    title: 'Save calculation history',
    titleKey: 'calculator.preferences.history',
    description: 'Access your previous calculations anytime',
    descriptionKey: 'calculator.preferences.historyDesc',
    color: 'prestige-gold',
    defaultValue: false
  },
  {
    name: 'shareData',
    icon: Share2,
    title: 'Share anonymous usage data',
    titleKey: 'calculator.preferences.shareData',
    description: 'Help us improve the platform for everyone',
    descriptionKey: 'calculator.preferences.shareDataDesc',
    color: 'success-green',
    defaultValue: false
  },
] as const;

export function StepPreferences() {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<CalculatorFormData>();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-trust-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-trust-blue" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {t('calculator.preferences.title', 'Preferences')}
        </h2>
        <p className="text-neutral-600">
          {t('calculator.preferences.subtitle', 'Customize your experience')}
        </p>
      </motion.div>

      {/* Preferences List */}
      <div className="space-y-4">
        {PREFERENCES.map((pref, index) => {
          const Icon = pref.icon;
          const isEnabled = watch(pref.name as keyof CalculatorFormData);

          return (
            <motion.div
              key={pref.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-5 border-2 rounded-xl transition-all duration-200",
                isEnabled
                  ? "bg-trust-blue/5 border-trust-blue/30"
                  : "bg-white border-neutral-200"
              )}
            >
              <label className="flex items-start gap-4 cursor-pointer group">
                {/* Custom Checkbox */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    {...register(pref.name as keyof CalculatorFormData)}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div
                    className={cn(
                      "w-6 h-6 border-2 rounded-lg transition-all duration-200",
                      "peer-focus:ring-4 peer-focus:ring-trust-blue/20",
                      isEnabled
                        ? "bg-trust-blue border-trust-blue"
                        : "bg-white border-neutral-300 group-hover:border-trust-blue/50"
                    )}
                  >
                    {isEnabled && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="w-5 h-5 text-white absolute inset-0.5" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                    isEnabled
                      ? "bg-trust-blue text-white"
                      : "bg-neutral-100 text-neutral-600 group-hover:bg-trust-blue/10 group-hover:text-trust-blue"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      "font-semibold text-neutral-900 mb-1 transition-colors",
                      "group-hover:text-trust-blue"
                    )}
                  >
                    {t(pref.titleKey, pref.title)}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {t(pref.descriptionKey, pref.description)}
                  </p>
                </div>
              </label>

              {/* Enabled Indicator */}
              {isEnabled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-3 right-3"
                >
                  <div className="w-2 h-2 bg-trust-blue rounded-full" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl"
      >
        <p className="text-xs text-neutral-600 leading-relaxed">
          <span className="font-semibold text-neutral-900">Privacy:</span>{' '}
          {t('calculator.preferences.privacy', 'Your preferences are stored locally and can be changed anytime. We respect your privacy and never share your personal data without consent.')}
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-trust-blue/5 to-success-green/5 border border-trust-blue/20 p-5 rounded-xl"
      >
        <h4 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-trust-blue" />
          {t('calculator.preferences.ready', 'You\'re all set!')}
        </h4>
        <p className="text-sm text-neutral-600">
          {t('calculator.preferences.readyDesc', 'Click finish to complete your calculation and see your results.')}
        </p>
      </motion.div>
    </div>
  );
}

