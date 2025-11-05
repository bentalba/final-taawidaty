import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';

export function StepPreferences() {
  const { t } = useTranslation();
  const { register } = useFormContext<CalculatorFormData>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Settings className="w-12 h-12 text-trust-blue mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900">
          Preferences
        </h2>
        <p className="text-neutral-600 text-sm mt-2">
          Customize your experience
        </p>
      </div>

      {/* Placeholder: Full implementation in Task 1.4 */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            {...register('receiveAlerts')}
            type="checkbox"
            className="w-4 h-4 text-trust-blue border-neutral-300 rounded mt-1"
          />
          <div className="ml-3">
            <label className="text-sm font-medium text-neutral-700">
              Receive price alerts
            </label>
            <p className="text-xs text-neutral-500">
              Get notified when medication prices change
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <input
            {...register('saveHistory')}
            type="checkbox"
            className="w-4 h-4 text-trust-blue border-neutral-300 rounded mt-1"
          />
          <div className="ml-3">
            <label className="text-sm font-medium text-neutral-700">
              Save calculation history
            </label>
            <p className="text-xs text-neutral-500">
              Access your previous calculations anytime
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <input
            {...register('shareData')}
            type="checkbox"
            className="w-4 h-4 text-trust-blue border-neutral-300 rounded mt-1"
          />
          <div className="ml-3">
            <label className="text-sm font-medium text-neutral-700">
              Share anonymous usage data
            </label>
            <p className="text-xs text-neutral-500">
              Help us improve the platform for everyone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
