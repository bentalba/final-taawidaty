import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, Download, Share2, Printer, Sparkles, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MedicalButton } from '@/components/ui/MedicalButton';
import { cn } from '@/lib/utils';

interface ResultsDisplayProps {
  originalPrice: number;
  reimbursementAmount: number;
  patientPays: number;
  percentageCovered: number;
  insuranceType: 'cnops' | 'cnss';
  medicationName: string;
  onNewCalculation: () => void;
}

export function ResultsDisplay({
  originalPrice,
  reimbursementAmount,
  patientPays,
  percentageCovered,
  insuranceType,
  medicationName,
  onNewCalculation,
}: ResultsDisplayProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counter for patient payment
  const counterValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });

  const displayValue = useTransform(counterValue, (value) =>
    value.toLocaleString(isRTL ? 'ar-MA' : 'fr-MA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );

  useEffect(() => {
    if (!hasAnimated) {
      setTimeout(() => {
        counterValue.set(patientPays);
        setHasAnimated(true);
      }, 300);
    }
  }, [patientPays, hasAnimated, counterValue]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-MA' : 'fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TAAWIDATY - ' + medicationName,
          text: `${t('results.youPay')}: ${formatCurrency(patientPays)}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text summary
    const summary = `
TAAWIDATY - Résultat du calcul
=============================

Médicament: ${medicationName}
Assurance: ${insuranceType.toUpperCase()}

Prix original: ${formatCurrency(originalPrice)}
Remboursement (${percentageCovered}%): ${formatCurrency(reimbursementAmount)}
Vous payez: ${formatCurrency(patientPays)}

Économies annuelles: ${formatCurrency(reimbursementAmount * 12)}
    `;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taawidaty-${medicationName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-success-green rounded-full mb-4"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          {t('results.title')}
        </h2>
        <p className="text-neutral-600">{medicationName}</p>
      </motion.div>

      {/* Main Amount Card - Patient Pays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-trust-blue to-trust-blue-dark rounded-3xl blur-xl opacity-30" />
        <div className="relative bg-gradient-to-br from-trust-blue via-trust-blue to-trust-blue-dark text-white rounded-3xl p-10 shadow-glow-blue">
          <p className="text-lg font-medium mb-2 opacity-90">
            {t('results.youPay')}
          </p>
          <motion.div className="text-6xl md:text-7xl font-black tracking-tight mb-4">
            <motion.span>{displayValue}</motion.span> MAD
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </motion.div>

      {/* Breakdown Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-2 border-neutral-100 rounded-2xl p-8 shadow-soft"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">
          {t('results.breakdown', 'Détail du calcul')}
        </h3>

        <div className="space-y-6">
          {/* Original Price */}
          <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
            <span className="text-neutral-600 font-medium">
              {t('results.originalPrice')}
            </span>
            <span className="text-xl font-bold text-neutral-900">
              {formatCurrency(originalPrice)}
            </span>
          </div>

          {/* Reimbursement */}
          <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-green/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success-green" />
              </div>
              <div>
                <span className="text-neutral-600 font-medium block">
                  {t('results.reimbursement')}
                </span>
                <span className="text-sm text-success-green font-semibold">
                  {percentageCovered}% {t('results.covered')}
                </span>
              </div>
            </div>
            <span className="text-xl font-bold text-success-green">
              -{formatCurrency(reimbursementAmount)}
            </span>
          </div>

          {/* You Pay */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-black text-neutral-900">
              {t('results.youPay')}
            </span>
            <span className="text-3xl font-black text-trust-blue">
              {formatCurrency(patientPays)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Savings Indicator */}
      {reimbursementAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-success-green to-emerald-500 rounded-2xl blur-lg opacity-20" />
          <div className="relative bg-gradient-to-br from-success-green/5 to-emerald-500/5 border-2 border-success-green/20 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-success-green flex items-center justify-center animate-pulse">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-success-green-dark font-bold text-xl">
                  {t('results.savings', 'Économie').replace('{amount}', formatCurrency(reimbursementAmount))}
                </p>
                <p className="text-sm text-success-green">
                  {t('results.savingsAnnual', 'Grâce à votre assurance')}
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  {t('results.annualEstimate', 'Économies annuelles estimées')}: {formatCurrency(reimbursementAmount * 12)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <MedicalButton
          variant="primary"
          size="lg"
          onClick={onNewCalculation}
          breathing
          className="flex-1 min-w-[200px]"
        >
          {t('common.newCalc', 'Nouveau calcul')}
        </MedicalButton>

        <MedicalButton
          variant="secondary"
          size="lg"
          onClick={handleShare}
          className="min-w-[120px]"
        >
          <Share2 className="w-5 h-5 mr-2" />
          {t('common.share', 'Partager')}
        </MedicalButton>

        <MedicalButton
          variant="secondary"
          size="lg"
          onClick={handleDownload}
          className="min-w-[120px]"
        >
          <Download className="w-5 h-5 mr-2" />
          {t('common.download', 'Télécharger')}
        </MedicalButton>

        <MedicalButton
          variant="secondary"
          size="lg"
          onClick={handlePrint}
          className="min-w-[120px]"
        >
          <Printer className="w-5 h-5 mr-2" />
          {t('common.print', 'Imprimer')}
        </MedicalButton>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">
              {t('disclaimer.title', 'Avertissement')}
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              {t('disclaimer.text', 'Ce calcul est estimatif. Le montant final peut varier selon votre situation. Consultez votre assurance pour confirmation.')}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
