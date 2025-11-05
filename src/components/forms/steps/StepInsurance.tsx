import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';
import { cn } from '@/lib/utils';

const INSURANCE_OPTIONS = [
  {
    value: 'cnops',
    label: 'CNOPS',
    description: 'Fonctionnaires et secteur public',
    icon: Building2,
    coverage: '90%',
    color: 'trust-blue'
  },
  {
    value: 'cnss',
    label: 'CNSS (AMO)',
    description: 'Employés du secteur privé',
    icon: Users,
    coverage: '70%',
    color: 'success-green'
  },
  {
    value: 'private',
    label: 'Private Insurance',
    description: 'Assurance privée',
    icon: Shield,
    coverage: 'Varies',
    color: 'prestige-gold'
  },
  {
    value: 'none',
    label: 'No Insurance',
    description: 'Sans assurance',
    icon: Shield,
    coverage: '0%',
    color: 'neutral'
  }
] as const;

export function StepInsurance() {
  const { t } = useTranslation();
  const { register, watch, setValue, formState: { errors } } = useFormContext<CalculatorFormData>();

  const insuranceType = watch('insuranceType');
  const hasChronicDisease = watch('hasChronicDisease');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-trust-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-trust-blue" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {t('calculator.insurance.title')}
        </h2>
        <p className="text-neutral-600">
          {t('calculator.insurance.subtitle', 'Sélectionnez votre type d\'assurance maladie')}
        </p>
      </motion.div>

      {/* Insurance Cards */}
      <div className="grid grid-cols-2 gap-4">
        {INSURANCE_OPTIONS.map((option, index) => {
          const Icon = option.icon;
          const isSelected = insuranceType === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setValue('insuranceType', option.value)}
              className={cn(
                "relative p-6 rounded-xl border-2 transition-all duration-200",
                "hover:shadow-medium focus:outline-none focus:ring-4 focus:ring-trust-blue/20",
                isSelected
                  ? "border-trust-blue bg-trust-blue-light shadow-medium"
                  : "border-neutral-200 bg-white hover:border-trust-blue/50"
              )}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3"
                >
                  <CheckCircle className="w-6 h-6 text-trust-blue" />
                </motion.div>
              )}

              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                isSelected ? "bg-trust-blue text-white" : "bg-neutral-100 text-neutral-600"
              )}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {option.label}
                </h3>
                <p className="text-xs text-neutral-600 mb-2">
                  {option.description}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-trust-blue">
                  Coverage: {option.coverage}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {errors.insuranceType && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
          {errors.insuranceType.message}
        </motion.p>
      )}

      {/* Insurance Number (Optional) */}
      {insuranceType && insuranceType !== 'none' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('calculator.insurance.number')} (Optional)
          </label>
          <input
            {...register('insuranceNumber')}
            className={cn(
              "w-full px-4 py-3 border rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
              "transition-all duration-200"
            )}
            placeholder="Ex: 123456789"
          />
          <p className="text-xs text-neutral-500 mt-1">
            {t('calculator.insurance.numberHelp', 'Your insurance number for record keeping (optional)')}
          </p>
        </motion.div>
      )}

      {/* Chronic Disease Toggle */}
      {(insuranceType === 'cnops' || insuranceType === 'cnss') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl"
        >
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              {...register('hasChronicDisease')}
              type="checkbox"
              className={cn(
                "w-5 h-5 text-trust-blue border-neutral-300 rounded mt-0.5",
                "focus:ring-2 focus:ring-trust-blue focus:ring-offset-0",
                "cursor-pointer transition-all duration-200"
              )}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-neutral-900 group-hover:text-trust-blue transition-colors">
                {t('calculator.insurance.chronicDisease')}
              </span>
              <p className="text-xs text-neutral-600 mt-1">
                {t('calculator.insurance.chronicDiseaseHelp', 'Maladie de longue durée (ALD) - Higher reimbursement rate')}
              </p>
            </div>
          </label>

          {hasChronicDisease && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 p-3 bg-success-green/10 border border-success-green/20 rounded-lg"
            >
              <p className="text-xs text-success-green-dark font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t('calculator.insurance.chronicBenefit', 'Eligible for enhanced reimbursement rates')}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

