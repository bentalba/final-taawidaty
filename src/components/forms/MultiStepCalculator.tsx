import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Check, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { calculatorSchema, type CalculatorFormData } from '@/schemas/calculatorSchema';
import { MedicalButton } from '@/components/ui/MedicalButton';
import { cn } from '@/lib/utils';

// Import step components (to be created in Task 1.4)
import { StepMedication } from './steps/StepMedication';
import { StepInsurance } from './steps/StepInsurance';
import { StepPersonal } from './steps/StepPersonal';
import { StepPreferences } from './steps/StepPreferences';

const STEPS = [
  { id: 'medication', icon: '💊', component: StepMedication },
  { id: 'insurance', icon: '🛡️', component: StepInsurance },
  { id: 'personal', icon: '👤', component: StepPersonal },
  { id: 'preferences', icon: '⚙️', component: StepPreferences },
] as const;

type StepId = (typeof STEPS)[number]['id'];

interface MultiStepCalculatorProps {
  onComplete: (data: CalculatorFormData) => void;
}

export function MultiStepCalculator({ onComplete }: MultiStepCalculatorProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepStartTime, setStepStartTime] = useState(Date.now());

  const methods = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    mode: 'onBlur',
    defaultValues: {
      quantity: 1,
      duration: 30,
      hasChronicDisease: false,
      receiveAlerts: true,
      saveHistory: false,
      shareData: false,
    },
  });

  const {
    trigger,
    getValues,
    formState: { isValid },
  } = methods;

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  // Track step timing
  useEffect(() => {
    setStepStartTime(Date.now());
  }, [currentStep]);

  // Get fields to validate for current step
  const getStepFields = (step: number): (keyof CalculatorFormData)[] => {
    switch (step) {
      case 0:
        return ['medicationId', 'quantity', 'duration'];
      case 1:
        return ['insuranceType'];
      case 2:
        return ['region'];
      case 3:
        return [];
      default:
        return [];
    }
  };

  // Navigate between steps
  const navigateToStep = async (targetStep: number) => {
    // Prevent navigation beyond bounds
    if (targetStep < 0 || targetStep >= STEPS.length) return;

    const newDirection = targetStep > currentStep ? 1 : -1;
    setDirection(newDirection);

    // Validate current step before proceeding forward
    if (targetStep > currentStep) {
      const fields = getStepFields(currentStep);
      const isValidStep = await trigger(fields);

      if (!isValidStep) {
        // Shake the form to indicate error
        return;
      }

      // Track step completion analytics
      const timeSpent = Date.now() - stepStartTime;
      if (window.analytics) {
        window.analytics.track({
          category: 'Calculator',
          action: 'step_completed',
          label: STEPS[currentStep].id,
          value: timeSpent,
        });
      }
    }

    setCurrentStep(targetStep);
  };

  // Handle form submission
  const onSubmit = async (data: CalculatorFormData) => {
    setIsSubmitting(true);

    try {
      // Track completion
      if (window.analytics) {
        window.analytics.track({
          category: 'Calculator',
          action: 'form_completed',
          label: data.insuranceType,
        });
      }

      await onComplete(data);
    } catch (error) {
      console.error('Form submission failed:', error);
      // Show error toast (will be implemented with toast system)
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Step Indicators */}
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Connector Line */}
                {index > 0 && (
                  <div className="flex-1 h-1 bg-neutral-200 mx-2">
                    <motion.div
                      className="h-full bg-trust-blue"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: index <= currentStep ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <motion.button
                  type="button"
                  onClick={() => navigateToStep(index)}
                  disabled={index > currentStep}
                  className={cn(
                    'relative flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all',
                    'focus:outline-none focus:ring-4 focus:ring-trust-blue/20',
                    index < currentStep && 'bg-trust-blue text-white',
                    index === currentStep &&
                      'bg-trust-blue text-white scale-110',
                    index > currentStep && 'bg-neutral-200 text-neutral-400',
                    index > currentStep && 'cursor-not-allowed'
                  )}
                  whileHover={{
                    scale: index <= currentStep ? 1.1 : 1,
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={index === currentStep ? 'step' : undefined}
                >
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-xl">{step.icon}</span>
                  )}

                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded',
                        index === currentStep
                          ? 'bg-trust-blue text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      )}
                    >
                      {t(`calculator.steps.${step.id}`)}
                    </div>
                  </div>
                </motion.button>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-trust-blue to-trust-blue-dark"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 0.5,
              }}
            />
          </div>
        </motion.div>

        {/* Form Steps */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                },
                exit: (direction: number) => ({
                  x: direction > 0 ? -300 : 300,
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200"
        >
          {/* Back Button */}
          <MedicalButton
            type="button"
            variant="secondary"
            onClick={() => navigateToStep(currentStep - 1)}
            disabled={currentStep === 0}
            className={cn(currentStep === 0 && 'invisible')}
          >
            {t('common.back')}
          </MedicalButton>

          {/* Next/Submit Button */}
          {currentStep < STEPS.length - 1 ? (
            <MedicalButton
              type="button"
              onClick={() => navigateToStep(currentStep + 1)}
              breathing={isValid}
              className="ml-auto"
            >
              {t('common.next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </MedicalButton>
          ) : (
            <MedicalButton
              type="button"
              onClick={methods.handleSubmit(onSubmit)}
              loading={isSubmitting}
              breathing
              pulseOnSuccess
              className="ml-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('common.loading')}
                </>
              ) : (
                t('common.finish')
              )}
            </MedicalButton>
          )}
        </motion.div>
      </div>
    </FormProvider>
  );
}

// Extend Window interface for analytics
declare global {
  interface Window {
    analytics?: {
      track: (event: {
        category: string;
        action: string;
        label: string;
        value?: number;
      }) => void;
    };
  }
}
