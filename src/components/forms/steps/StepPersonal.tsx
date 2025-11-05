import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';

export function StepPersonal() {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<CalculatorFormData>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-12 h-12 text-trust-blue mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900">
          Contact Information
        </h2>
        <p className="text-neutral-600 text-sm mt-2">
          Optional - for receiving results via email/SMS
        </p>
      </div>

      {/* Placeholder: Full implementation in Task 1.4 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
            placeholder="example@email.com (optional)"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Phone
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
            placeholder="+212 6 12 34 56 78 (optional)"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Region
          </label>
          <select
            {...register('region')}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
          >
            <option value="">Select your region</option>
            <option value="casablanca">Casablanca</option>
            <option value="rabat">Rabat</option>
            <option value="marrakech">Marrakech</option>
            <option value="fes">Fes</option>
            <option value="tangier">Tangier</option>
            <option value="agadir">Agadir</option>
            <option value="meknes">Meknes</option>
            <option value="oujda">Oujda</option>
            <option value="kenitra">Kenitra</option>
            <option value="tetouan">Tetouan</option>
            <option value="safi">Safi</option>
            <option value="other">Other</option>
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
