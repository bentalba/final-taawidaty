import { translations } from '@/lib/translations';
import { CheckCircle2, Sparkles } from 'lucide-react';
import CountUp from './CountUp';

interface ResultCardProps {
  originalPrice: number;
  reimbursementAmount: number;
  patientPays: number;
  percentageCovered: number;
  medicationName: string;
  language: 'ar' | 'fr';
}

export default function ResultCard({
  originalPrice,
  reimbursementAmount,
  patientPays,
  percentageCovered,
  medicationName,
  language
}: ResultCardProps) {
  const t = translations[language].results;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div dir={dir} className="w-full max-w-3xl mx-auto space-y-6 animate-scale-in">
      {/* Modern Result Card */}
      <div className="glass-card border-gradient p-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-black text-gradient-modern mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mx-auto"></div>
        </div>

        {/* Modern Medication Info */}
        <div className="glass p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={`text-sm text-slate-600 dark:text-muted-foreground mb-2 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.medication}
              </p>
              <p className={`text-xl font-bold text-slate-900 dark:text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {medicationName}
              </p>
            </div>
          </div>
        </div>

              {/* Modern Main Amount Display */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative bg-gradient-to-br from-primary-600 to-blue-600 text-white rounded-3xl p-10 text-center shadow-glow">
            <p className={`text-lg font-medium mb-4 opacity-90 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.youPay}
            </p>
            <p className="text-5xl md:text-7xl font-black tracking-tight mb-4">
              {formatCurrency(patientPays)}
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Modern Breakdown */}
        <div className="glass p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-border">
            <span className={`text-slate-600 dark:text-muted-foreground font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.originalPrice}
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-foreground">
              {formatCurrency(originalPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-100 dark:bg-success-950 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400" />
              </div>
              <div>
                <span className={`text-slate-600 dark:text-muted-foreground font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t.reimbursement}
                </span>
                <div className={`text-sm text-success-600 dark:text-success-400 font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {percentageCovered}% {t.covered}
                </div>
              </div>
            </div>
            <span className="text-xl font-bold text-success-600 dark:text-success-400">
              -<CountUp
                from={0}
                to={reimbursementAmount}
                duration={1.5}
                formatter={formatCurrency}
              />
            </span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className={`text-lg font-black text-slate-900 dark:text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.youPay}
            </span>
            <span className="text-3xl font-black text-primary-600 dark:text-primary">
              {formatCurrency(patientPays)}
            </span>
          </div>
        </div>
      </div>

          {/* Modern Savings Indicator */}
      {reimbursementAmount > 0 && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-success-400 to-emerald-400 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative glass-card border-2 border-success-200 dark:border-success-800 p-6 text-center animate-slide-up">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-success-100 dark:bg-success-950 flex items-center justify-center animate-bounce-gentle">
                <Sparkles className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <div className="text-left">
                <p className={`text-success-700 dark:text-success-300 font-bold text-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t.savings.split('{amount}')[0]}
                  <CountUp
                    from={0}
                    to={reimbursementAmount}
                    duration={1.5}
                    formatter={formatCurrency}
                    className="inline-block"
                  />
                  {t.savings.split('{amount}')[1]}
                </p>
                <p className={`text-sm text-success-600 dark:text-success-400 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'تم توفير هذا المبلغ بفضل التأمين' : 'Économie grâce à votre mutuelle'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Disclaimer */}
      <div className="glass p-6 rounded-2xl border-l-4 border-warning-500 dark:border-warning-400">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-warning-100 dark:bg-warning-950 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-warning-600 dark:text-warning-400 text-sm font-bold">!</span>
          </div>
          <div>
            <p className={`text-sm font-semibold text-warning-900 dark:text-warning-200 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {translations[language].disclaimer.title}
            </p>
            <p className={`text-sm text-warning-800 dark:text-warning-300 leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {translations[language].disclaimer.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
