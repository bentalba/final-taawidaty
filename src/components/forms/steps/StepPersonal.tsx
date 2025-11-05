import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';
import { cn } from '@/lib/utils';

const MOROCCAN_REGIONS = [
  { value: 'casablanca-settat', label: 'Casablanca-Settat' },
  { value: 'rabat-sale-kenitra', label: 'Rabat-Salé-Kénitra' },
  { value: 'marrakech-safi', label: 'Marrakech-Safi' },
  { value: 'fes-meknes', label: 'Fès-Meknès' },
  { value: 'tangier-tetouan-al-hoceima', label: 'Tanger-Tétouan-Al Hoceïma' },
  { value: 'oriental', label: 'L\'Oriental' },
  { value: 'souss-massa', label: 'Souss-Massa' },
  { value: 'beni-mellal-khenifra', label: 'Béni Mellal-Khénifra' },
  { value: 'draa-tafilalet', label: 'Drâa-Tafilalet' },
  { value: 'guelmim-oued-noun', label: 'Guelmim-Oued Noun' },
  { value: 'laayoune-sakia-el-hamra', label: 'Laâyoune-Sakia El Hamra' },
  { value: 'dakhla-oued-ed-dahab', label: 'Dakhla-Oued Ed-Dahab' },
] as const;

export function StepPersonal() {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<CalculatorFormData>();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-trust-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-trust-blue" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {t('calculator.personal.title', 'Contact Information')}
        </h2>
        <p className="text-neutral-600">
          {t('calculator.personal.subtitle', 'Optional - for receiving results via email/SMS')}
        </p>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-trust-blue/5 border border-trust-blue/20 p-4 rounded-xl"
      >
        <p className="text-sm text-trust-blue-dark flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-trust-blue rounded-full" />
          {t('calculator.personal.privacy', 'Your information is kept private and never shared')}
        </p>
      </motion.div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          <Mail className="w-4 h-4 inline mr-1" />
          {t('calculator.personal.email', 'Email')} <span className="text-neutral-400">(Optional)</span>
        </label>
        <input
          {...register('email')}
          type="email"
          className={cn(
            "w-full px-4 py-3 pl-12 border rounded-xl",
            "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
            "transition-all duration-200",
            errors.email && "border-red-500"
          )}
          placeholder="example@email.com"
        />
        <Mail className="absolute left-4 top-11 w-5 h-5 text-neutral-400 pointer-events-none" />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          <Phone className="w-4 h-4 inline mr-1" />
          {t('calculator.personal.phone', 'Phone')} <span className="text-neutral-400">(Optional)</span>
        </label>
        <div className="relative">
          <input
            {...register('phone')}
            type="tel"
            className={cn(
              "w-full px-4 py-3 pl-12 border rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
              "transition-all duration-200",
              errors.phone && "border-red-500"
            )}
            placeholder="+212 6 12 34 56 78"
          />
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        </div>
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.phone.message}
          </motion.p>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          {t('calculator.personal.phoneHelp', 'Moroccan phone number format: +212 6XX XX XX XX')}
        </p>
      </div>

      {/* Region */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          {t('calculator.personal.region', 'Region')} *
        </label>
        <div className="relative">
          <select
            {...register('region')}
            className={cn(
              "w-full px-4 py-3 pl-12 border rounded-xl appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent",
              "transition-all duration-200 cursor-pointer",
              errors.region && "border-red-500"
            )}
          >
            <option value="">{t('calculator.personal.selectRegion', 'Select your region')}</option>
            {MOROCCAN_REGIONS.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.region && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.region.message}
          </motion.p>
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl">
        <p className="text-xs text-neutral-600">
          <span className="font-semibold text-neutral-900">Why we ask:</span>{' '}
          {t('calculator.personal.whyAsk', 'We use this information to provide you with region-specific pharmacy recommendations and send you calculation results if requested.')}
        </p>
      </div>
    </div>
  );
}

