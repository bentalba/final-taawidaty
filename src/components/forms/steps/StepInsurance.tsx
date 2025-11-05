import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';

export function StepInsurance() {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<CalculatorFormData>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="w-12 h-12 text-trust-blue mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900">
          {t('calculator.insurance.title')}
        </h2>
      </div>

      {/* Placeholder: Full implementation in Task 1.4 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Insurance Type
          </label>
          <select
            {...register('insuranceType')}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
          >
            <option value="">Select insurance type</option>
            <option value="cnops">CNOPS</option>
            <option value="cnss">CNSS</option>
            <option value="private">Private</option>
            <option value="none">None</option>
          </select>
          {errors.insuranceType && (
            <p className="text-red-500 text-sm mt-1">{errors.insuranceType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('calculator.insurance.number')}
          </label>
          <input
            {...register('insuranceNumber')}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
            placeholder="Optional"
          />
        </div>

        <div className="flex items-center">
          <input
            {...register('hasChronicDisease')}
            type="checkbox"
            className="w-4 h-4 text-trust-blue border-neutral-300 rounded"
          />
          <label className="ml-2 text-sm text-neutral-700">
            {t('calculator.insurance.chronicDisease')}
          </label>
        </div>
      </div>
    </div>
  );
}
