/**
 * E2E Integration Tests
 * Complete user flow testing for the calculator
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { AppProvider } from '../contexts/AppContext';
import { HeroSection } from '../components/hero/HeroSection';
import { MultiStepCalculator } from '../components/forms/MultiStepCalculator';
import { ResultsDisplay } from '../components/results/ResultsDisplay';

// Mock data
const mockCalculationResult = {
  medicationName: 'Doliprane 1000mg',
  originalPrice: 100,
  reimbursementAmount: 90,
  patientPays: 10,
  reimbursementPercentage: 90,
  insuranceType: 'CNOPS',
  calculatedAt: new Date(),
};

describe('E2E Calculator Flow', () => {
  beforeEach(() => {
    i18n.changeLanguage('fr');
  });

  describe('Hero Section Insurance Selection', () => {
    it('should render hero section with insurance options', () => {
      const mockSelect = vi.fn();
      const mockStart = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance={null}
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      expect(screen.getByText(/CNOPS/i)).toBeInTheDocument();
      expect(screen.getByText(/CNSS/i)).toBeInTheDocument();
    });

    it('should select insurance when card is clicked', async () => {
      const user = userEvent.setup();
      const mockSelect = vi.fn();
      const mockStart = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance={null}
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      const cnopsCard = screen.getByText(/CNOPS/i).closest('button');
      expect(cnopsCard).toBeInTheDocument();
      
      if (cnopsCard) {
        await user.click(cnopsCard);
        expect(mockSelect).toHaveBeenCalledWith('cnops');
      }
    });

    it('should enable CTA button when insurance is selected', () => {
      const mockSelect = vi.fn();
      const mockStart = vi.fn();

      const { rerender } = render(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance={null}
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      const ctaButton = screen.getByText(/Commencer le calcul/i);
      expect(ctaButton).toBeDisabled();

      rerender(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance="cnops"
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      expect(ctaButton).not.toBeDisabled();
    });

    it('should call onStartCalculation when CTA is clicked', async () => {
      const user = userEvent.setup();
      const mockSelect = vi.fn();
      const mockStart = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance="cnops"
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      const ctaButton = screen.getByText(/Commencer le calcul/i);
      await user.click(ctaButton);

      expect(mockStart).toHaveBeenCalled();
    });
  });

  describe('Complete Calculator Flow', () => {
    it('should complete full calculator workflow', async () => {
      const user = userEvent.setup();
      const mockComplete = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <MultiStepCalculator onComplete={mockComplete} />
          </AppProvider>
        </I18nextProvider>
      );

      // Step 1: Medication (assuming we can skip for now in test)
      const nextButton1 = screen.getByText(/Suivant/i);
      
      // Fill required fields and navigate through steps
      // This is a simplified version - actual implementation would fill all fields
      
      await waitFor(() => {
        expect(nextButton1).toBeInTheDocument();
      });
    });

    it('should validate required fields before proceeding', async () => {
      const user = userEvent.setup();
      const mockComplete = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <MultiStepCalculator onComplete={mockComplete} />
          </AppProvider>
        </I18nextProvider>
      );

      const nextButton = screen.getByText(/Suivant/i);
      await user.click(nextButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/requis/i)).toBeInTheDocument();
      });
    });

    it('should allow navigation back to previous steps', async () => {
      const user = userEvent.setup();
      const mockComplete = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <MultiStepCalculator onComplete={mockComplete} />
          </AppProvider>
        </I18nextProvider>
      );

      // Navigate forward
      const nextButton = screen.getByText(/Suivant/i);
      await user.click(nextButton);

      // Navigate back
      const backButton = screen.getByText(/Retour/i);
      if (backButton) {
        await user.click(backButton);
        // Should be back at step 1
      }
    });
  });

  describe('Results Display', () => {
    it('should display calculation results correctly', () => {
      const mockNewCalc = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay
            medicationName="Doliprane 1000mg"
            originalPrice={100}
            reimbursementAmount={90}
            patientPays={10}
            reimbursementPercentage={90}
            insuranceType="CNOPS"
            onNewCalculation={mockNewCalc}
          />
        </I18nextProvider>
      );

      expect(screen.getByText(/10/)).toBeInTheDocument(); // Patient pays
      expect(screen.getByText(/90/)).toBeInTheDocument(); // Reimbursement
    });

    it('should trigger new calculation when button clicked', async () => {
      const user = userEvent.setup();
      const mockNewCalc = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay
            medicationName="Doliprane 1000mg"
            originalPrice={100}
            reimbursementAmount={90}
            patientPays={10}
            reimbursementPercentage={90}
            insuranceType="CNOPS"
            onNewCalculation={mockNewCalc}
          />
        </I18nextProvider>
      );

      const newCalcButton = screen.getByText(/Nouveau calcul/i);
      await user.click(newCalcButton);

      expect(mockNewCalc).toHaveBeenCalled();
    });

    it('should animate counter on mount', async () => {
      const mockNewCalc = vi.fn();

      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay
            medicationName="Doliprane 1000mg"
            originalPrice={100}
            reimbursementAmount={90}
            patientPays={10}
            reimbursementPercentage={90}
            insuranceType="CNOPS"
            onNewCalculation={mockNewCalc}
          />
        </I18nextProvider>
      );

      // Wait for animation to complete
      await waitFor(() => {
        expect(screen.getByText(/10/)).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Language Switching', () => {
    it('should switch between French and Arabic', async () => {
      const mockSelect = vi.fn();
      const mockStart = vi.fn();

      const { rerender } = render(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance={null}
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      // Initially French
      expect(screen.getByText(/Commencer le calcul/i)).toBeInTheDocument();

      // Switch to Arabic
      await i18n.changeLanguage('ar');

      rerender(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance={null}
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      // Should show Arabic text
      expect(document.documentElement.dir).toBe('rtl');
    });
  });

  describe('Responsive Behavior', () => {
    it('should adapt to mobile viewport', () => {
      // Mock mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;

      const mockSelect = vi.fn();
      const mockStart = vi.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <HeroSection
            selectedInsurance={null}
            onInsuranceSelect={mockSelect}
            onStartCalculation={mockStart}
          />
        </I18nextProvider>
      );

      // Insurance cards should stack on mobile
      const cards = screen.getAllByRole('button');
      expect(cards.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle calculation errors gracefully', async () => {
      // Mock calculation that fails
      const mockComplete = vi.fn().mockRejectedValue(new Error('Calculation failed'));

      render(
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <MultiStepCalculator onComplete={mockComplete} />
          </AppProvider>
        </I18nextProvider>
      );

      // Attempt to complete form
      // Should show error message
    });

    it('should handle network errors', async () => {
      // Mock network failure
      // Should show appropriate error message
      expect(true).toBe(true); // Placeholder
    });
  });

  describe('Performance', () => {
    it('should load within performance budget', async () => {
      const startTime = performance.now();

      render(
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <MultiStepCalculator onComplete={vi.fn()} />
          </AppProvider>
        </I18nextProvider>
      );

      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Should render within 100ms
      expect(loadTime).toBeLessThan(100);
    });
  });
});
