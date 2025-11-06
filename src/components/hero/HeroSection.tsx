import { motion } from 'framer-motion';
import { Shield, TrendingUp, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MedicalButton } from '@/components/ui/MedicalButton';
import { cn } from '@/lib/utils';

interface InsuranceCardProps {
  type: 'cnops' | 'cnss';
  title: string;
  coverage: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isSelected: boolean;
  onSelect: () => void;
  delay?: number;
}

function InsuranceCard({
  type,
  title,
  coverage,
  description,
  icon: Icon,
  isSelected,
  onSelect,
  delay = 0,
}: InsuranceCardProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={onSelect}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group w-full text-left",
        "bg-white rounded-2xl p-6 border-2 transition-all duration-300",
        "hover:shadow-strong",
        "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-offset-2",
        isSelected
          ? "border-trust-blue shadow-glow-blue"
          : "border-neutral-200 hover:border-trust-blue/50"
      )}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -right-3 rtl:-left-3 rtl:right-auto w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center shadow-medium"
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.path
              d="M3 8L6 11L13 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Icon */}
      <motion.div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
          isSelected
            ? "bg-trust-blue text-white"
            : "bg-trust-blue/10 text-trust-blue group-hover:bg-trust-blue/20"
        )}
        whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
      >
        <Icon className="w-7 h-7" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-bold text-neutral-900 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-black text-trust-blue">{coverage}</span>
        <span className="text-sm text-neutral-600">
          {isRTL ? 'تغطية' : 'de couverture'}
        </span>
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>

      {/* Hover underline */}
      <motion.div
        className="h-1 bg-trust-blue rounded-full mt-4"
        initial={{ width: 0 }}
        animate={{ width: isSelected ? '100%' : 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

interface TrustIndicatorProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  delay?: number;
}

function TrustIndicator({ icon: Icon, text, delay = 0 }: TrustIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
    >
      <Icon className="w-4 h-4 text-white" />
      <span className="text-sm font-medium text-white">{text}</span>
    </motion.div>
  );
}

interface HeroSectionProps {
  selectedInsurance?: 'cnops' | 'cnss' | null;
  onInsuranceSelect: (type: 'cnops' | 'cnss') => void;
  onStartCalculation: () => void;
}

export function HeroSection({
  selectedInsurance,
  onInsuranceSelect,
  onStartCalculation,
}: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const insuranceOptions = [
    {
      type: 'cnops' as const,
      title: t('hero.cnops.title', 'CNOPS'),
      coverage: '90%',
      description: t(
        'hero.cnops.description',
        'Couverture médicale pour les fonctionnaires et agents de l\'État'
      ),
      icon: Shield,
      delay: 0.2,
    },
    {
      type: 'cnss' as const,
      title: t('hero.cnss.title', 'CNSS'),
      coverage: '70%',
      description: t(
        'hero.cnss.description',
        'Couverture pour les salariés du secteur privé'
      ),
      icon: Award,
      delay: 0.3,
    },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      text: t('hero.trust.official', 'Données officielles AMO'),
      delay: 0.4,
    },
    {
      icon: TrendingUp,
      text: t('hero.trust.accurate', '99% de précision'),
      delay: 0.5,
    },
    {
      icon: Clock,
      text: t('hero.trust.instant', 'Résultats instantanés'),
      delay: 0.6,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-trust-blue via-trust-blue-dark to-trust-blue-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-breathe" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {t(
                'hero.title',
                'Calculez vos remboursements médicaux en toute simplicité'
              )}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t(
                'hero.subtitle',
                'Découvrez instantanément le montant de votre remboursement AMO avec notre calculateur précis et gratuit'
              )}
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {trustIndicators.map((indicator, index) => (
              <TrustIndicator key={index} {...indicator} />
            ))}
          </motion.div>
        </div>

        {/* Insurance Selection Cards */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-bold text-white text-center mb-6"
          >
            {t('hero.selectInsurance', 'Sélectionnez votre assurance')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceOptions.map((option) => (
              <InsuranceCard
                key={option.type}
                {...option}
                isSelected={selectedInsurance === option.type}
                onSelect={() => onInsuranceSelect(option.type)}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <MedicalButton
            variant="success"
            size="xl"
            onClick={onStartCalculation}
            disabled={!selectedInsurance}
            breathing={!!selectedInsurance}
            className="shadow-glow-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('hero.cta', 'Commencer le calcul')}
          </MedicalButton>

          {!selectedInsurance && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/70 text-sm mt-3"
            >
              {t('hero.selectFirst', 'Veuillez sélectionner une assurance')}
            </motion.p>
          )}
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: '50K+', label: t('hero.stats.users', 'Utilisateurs') },
            { value: '150K+', label: t('hero.stats.calculations', 'Calculs') },
            { value: '2.5M MAD', label: t('hero.stats.savings', 'Économies') },
            { value: '99%', label: t('hero.stats.precision', 'Précision') },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
