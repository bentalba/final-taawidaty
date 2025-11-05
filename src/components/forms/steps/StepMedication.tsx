import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pill, Package, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';
import { cn } from '@/lib/utils';

// Mock medication type for now - will integrate with real data later
interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection';
  ppv: number;
}

export function StepMedication() {
  const { t } = useTranslation();
  const { register, watch, setValue, formState: { errors } } = useFormContext<CalculatorFormData>();

  const medicationId = watch('medicationId');
  const quantity = watch('quantity');
  const duration = watch('duration');

  // Mock selected medication - will be replaced with actual medication data
  const selectedMedication: Medication | null = medicationId ? {
    id: medicationId,
    name: 'Doliprane 1000mg',
    genericName: 'Paracetamol',
    dosage: '1000mg',
    form: 'tablet',
    ppv: 45.50
  } : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-trust-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Pill className="w-8 h-8 text-trust-blue" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {t('calculator.medication.title')}
        </h2>
        <p className="text-neutral-600">
          {t('calculator.medication.subtitle', 'Sélectionnez le médicament que vous souhaitez calculer')}
        </p>
      </motion.div>

      {/* Medication ID Input (Placeholder for MedicationSearch integration) */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Medication *
        </label>
        <div className="relative">
          <input
            {...register('medicationId')}
            className={cn(
              "w-full px-4 py-3 pl-12 border rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
              "transition-all duration-200",
              errors.medicationId && "border-red-500"
            )}
            placeholder="Search for a medication..."
          />
          <Pill className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        </div>
        {errors.medicationId && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
            {errors.medicationId.message}
          </motion.p>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          Note: MedicationSearch component will be integrated here in production
        </p>
      </div>

      {/* Selected Medication Card */}
      {selectedMedication && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-trust-blue-light border-2 border-trust-blue/20 p-6 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Pill className="w-6 h-6 text-trust-blue" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">
                {selectedMedication.name}
              </h3>
              <p className="text-sm text-neutral-600 mb-2">
                {selectedMedication.genericName} • {selectedMedication.dosage} • {selectedMedication.form}
              </p>
              <p className="text-trust-blue font-semibold">
                {selectedMedication.ppv} MAD
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quantity & Duration Inputs */}
      <div className="grid grid-cols-2 gap-4">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Package className="w-4 h-4 inline mr-1" />
            {t('calculator.medication.quantity')}
          </label>
          <input
            {...register('quantity', { valueAsNumber: true })}
            type="number"
            min="1"
            max="1000"
            className={cn(
              "w-full px-4 py-3 border rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
              "transition-all duration-200",
              errors.quantity && "border-red-500"
            )}
            placeholder="1"
          />
          {errors.quantity && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.quantity.message}
            </motion.p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            {t('calculator.medication.duration')}
          </label>
          <input
            {...register('duration', { valueAsNumber: true })}
            type="number"
            min="1"
            max="365"
            className={cn(
              "w-full px-4 py-3 border rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
              "transition-all duration-200",
              errors.duration && "border-red-500"
            )}
            placeholder="30"
          />
          {errors.duration && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.duration.message}
            </motion.p>
          )}
          <p className="text-xs text-neutral-500 mt-1">
            {t('calculator.medication.durationHelp', 'Treatment duration in days')}
          </p>
        </div>
      </div>

      {/* Summary */}
      {quantity && duration && selectedMedication && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-100 p-4 rounded-xl"
        >
          <p className="text-sm text-neutral-600">
            <span className="font-semibold text-neutral-900">Total cost:</span>{' '}
            {(selectedMedication.ppv * quantity).toFixed(2)} MAD for{' '}
            {quantity} unit(s) over {duration} day(s)
          </p>
        </motion.div>
      )}
    </div>
  );
}

