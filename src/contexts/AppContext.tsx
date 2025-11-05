import { createContext, useContext, useState, useCallback } from 'react';
import type { CalculatorFormData } from '@/schemas/calculatorSchema';

interface CalculationResult {
  medicationName: string;
  originalPrice: number;
  reimbursementAmount: number;
  patientPays: number;
  reimbursementPercentage: number;
  insuranceType: string;
  calculatedAt: Date;
}

interface AppState {
  // Calculator state
  currentStep: number;
  selectedInsurance: 'cnops' | 'cnss' | null;
  formData: Partial<CalculatorFormData>;
  calculationResult: CalculationResult | null;
  
  // UI state
  isCalculating: boolean;
  showResults: boolean;
  
  // Actions
  setSelectedInsurance: (type: 'cnops' | 'cnss' | null) => void;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<CalculatorFormData>) => void;
  calculateReimbursement: (data: CalculatorFormData) => Promise<void>;
  resetCalculator: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInsurance, setSelectedInsurance] = useState<'cnops' | 'cnss' | null>(null);
  const [formData, setFormData] = useState<Partial<CalculatorFormData>>({});
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const updateFormData = useCallback((data: Partial<CalculatorFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const calculateReimbursement = useCallback(async (data: CalculatorFormData) => {
    setIsCalculating(true);
    
    try {
      // Simulate API call - replace with actual calculation logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock calculation - replace with real logic
      const basePrice = 100; // This should come from medication data
      const reimbursementRate = data.insuranceType === 'cnops' ? 0.9 : 0.7;
      const reimbursementAmount = basePrice * reimbursementRate;
      const patientPays = basePrice - reimbursementAmount;

      const result: CalculationResult = {
        medicationName: 'Medication Name', // This should come from medication data
        originalPrice: basePrice,
        reimbursementAmount,
        patientPays,
        reimbursementPercentage: reimbursementRate * 100,
        insuranceType: data.insuranceType,
        calculatedAt: new Date(),
      };

      setCalculationResult(result);
      setShowResults(true);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const resetCalculator = useCallback(() => {
    setCurrentStep(0);
    setSelectedInsurance(null);
    setFormData({});
    setCalculationResult(null);
    setShowResults(false);
    setIsCalculating(false);
  }, []);

  const value: AppState = {
    currentStep,
    selectedInsurance,
    formData,
    calculationResult,
    isCalculating,
    showResults,
    setSelectedInsurance,
    setCurrentStep,
    updateFormData,
    calculateReimbursement,
    resetCalculator,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
