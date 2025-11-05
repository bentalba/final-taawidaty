import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pill } from 'lucide-react';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';

export function StepMedication() {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<CalculatorFormData>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Pill className="w-12 h-12 text-trust-blue mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900">
          {t('calculator.medication.title')}
        </h2>
      </div>

      {/* Placeholder: Full implementation in Task 1.4 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Medication ID
          </label>
          <input
            {...register('medicationId')}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
            placeholder="Enter medication ID"
          />
          {errors.medicationId && (
            <p className="text-red-500 text-sm mt-1">{errors.medicationId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('calculator.medication.quantity')}
          </label>
          <input
            {...register('quantity', { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
            placeholder="1"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('calculator.medication.duration')}
          </label>
          <input
            {...register('duration', { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
            placeholder="30"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
