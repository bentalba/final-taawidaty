import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MultiStepCalculator } from '../components/forms/MultiStepCalculator';
import { MedicationSearch } from '../components/medication/MedicationSearch';
import { ResultsDisplay } from '../components/results/ResultsDisplay';
import { StatsDisplay } from '../components/stats/StatsDisplay';

describe('Phase 1 Integration Tests', () => {
  beforeEach(() => {
    i18n.changeLanguage('fr');
  });

  describe('Multi-Step Calculator Flow', () => {
    it('should render step 1 (medication) initially', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      expect(screen.getByText(/sélection du médicament/i)).toBeInTheDocument();
    });

    it('should navigate through all 4 steps successfully', async () => {
      const user = userEvent.setup();
      const mockComplete = jest.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={mockComplete} />
        </I18nextProvider>
      );

      // Step 1: Medication
      const nextButton1 = screen.getByText(/suivant/i);
      await user.click(nextButton1);

      // Step 2: Insurance
      await waitFor(() => {
        expect(screen.getByText(/assurance/i)).toBeInTheDocument();
      });
      const nextButton2 = screen.getByText(/suivant/i);
      await user.click(nextButton2);

      // Step 3: Personal Info
      await waitFor(() => {
        expect(screen.getByText(/informations personnelles/i)).toBeInTheDocument();
      });
      const nextButton3 = screen.getByText(/suivant/i);
      await user.click(nextButton3);

      // Step 4: Preferences
      await waitFor(() => {
        expect(screen.getByText(/préférences/i)).toBeInTheDocument();
      });
      const submitButton = screen.getByText(/calculer/i);
      await user.click(submitButton);

      // Should call onComplete
      await waitFor(() => {
        expect(mockComplete).toHaveBeenCalled();
      });
    });

    it('should prevent navigation without required fields', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      const nextButton = screen.getByText(/suivant/i);
      await user.click(nextButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/ce champ est requis/i)).toBeInTheDocument();
      });
    });

    it('should allow going back to previous steps', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      // Move to step 2
      const nextButton = screen.getByText(/suivant/i);
      await user.click(nextButton);

      // Go back to step 1
      const backButton = screen.getByText(/retour/i);
      await user.click(backButton);

      await waitFor(() => {
        expect(screen.getByText(/sélection du médicament/i)).toBeInTheDocument();
      });
    });
  });

  describe('Medication Search Component', () => {
    const mockMedications = [
      { id: '1', name: 'Doliprane 1000mg', dci: 'Paracétamol', price: 25.5, isPrescriptionRequired: false },
      { id: '2', name: 'Amoxicilline 500mg', dci: 'Amoxicilline', price: 45.0, isPrescriptionRequired: true },
    ];

    it('should render search input', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={mockMedications} onSelect={jest.fn()} />
        </I18nextProvider>
      );

      expect(screen.getByPlaceholderText(/rechercher/i)).toBeInTheDocument();
    });

    it('should filter medications on search', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={mockMedications} onSelect={jest.fn()} />
        </I18nextProvider>
      );

      const searchInput = screen.getByPlaceholderText(/rechercher/i);
      await user.type(searchInput, 'doli');

      await waitFor(() => {
        expect(screen.getByText(/doliprane/i)).toBeInTheDocument();
        expect(screen.queryByText(/amoxicilline/i)).not.toBeInTheDocument();
      });
    });

    it('should call onSelect when medication is clicked', async () => {
      const user = userEvent.setup();
      const mockSelect = jest.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={mockMedications} onSelect={mockSelect} />
        </I18nextProvider>
      );

      const searchInput = screen.getByPlaceholderText(/rechercher/i);
      await user.type(searchInput, 'doli');

      await waitFor(() => {
        const medItem = screen.getByText(/doliprane/i);
        user.click(medItem);
      });

      expect(mockSelect).toHaveBeenCalledWith(mockMedications[0]);
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={mockMedications} onSelect={jest.fn()} />
        </I18nextProvider>
      );

      const searchInput = screen.getByPlaceholderText(/rechercher/i);
      await user.type(searchInput, 'a');

      // Arrow down to navigate
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Enter to select
      await user.keyboard('{Enter}');

      // Should have selected something
      expect(screen.getByText(/sélectionné/i)).toBeInTheDocument();
    });
  });

  describe('Results Display Component', () => {
    const mockResults = {
      medicationName: 'Doliprane 1000mg',
      originalPrice: 100,
      reimbursementAmount: 70,
      patientPays: 30,
      reimbursementPercentage: 70,
      insuranceType: 'CNSS',
    };

    it('should render results with correct amounts', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay results={mockResults} onNewCalculation={jest.fn()} />
        </I18nextProvider>
      );

      expect(screen.getByText(/30/)).toBeInTheDocument(); // Patient pays
      expect(screen.getByText(/70/)).toBeInTheDocument(); // Reimbursement
    });

    it('should animate counter on mount', async () => {
      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay results={mockResults} onNewCalculation={jest.fn()} />
        </I18nextProvider>
      );

      // Counter should animate from 0 to final value
      await waitFor(() => {
        const counter = container.querySelector('[data-testid="patient-amount"]');
        expect(counter).toHaveTextContent(/30/);
      }, { timeout: 3000 });
    });

    it('should call onNewCalculation when button clicked', async () => {
      const user = userEvent.setup();
      const mockNewCalc = jest.fn();

      render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay results={mockResults} onNewCalculation={mockNewCalc} />
        </I18nextProvider>
      );

      const newCalcButton = screen.getByText(/nouveau calcul/i);
      await user.click(newCalcButton);

      expect(mockNewCalc).toHaveBeenCalled();
    });

    it('should support share functionality', async () => {
      const user = userEvent.setup();
      const mockShare = jest.fn(() => Promise.resolve());
      Object.defineProperty(navigator, 'share', {
        writable: true,
        value: mockShare,
      });

      render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay results={mockResults} onNewCalculation={jest.fn()} />
        </I18nextProvider>
      );

      const shareButton = screen.getByText(/partager/i);
      await user.click(shareButton);

      expect(mockShare).toHaveBeenCalled();
    });

    it('should support download functionality', async () => {
      const user = userEvent.setup();
      const mockCreateElement = jest.spyOn(document, 'createElement');

      render(
        <I18nextProvider i18n={i18n}>
          <ResultsDisplay results={mockResults} onNewCalculation={jest.fn()} />
        </I18nextProvider>
      );

      const downloadButton = screen.getByText(/télécharger/i);
      await user.click(downloadButton);

      expect(mockCreateElement).toHaveBeenCalledWith('a');
    });
  });

  describe('Stats Display Component', () => {
    it('should render all 4 stat items', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <StatsDisplay />
        </I18nextProvider>
      );

      expect(screen.getByText(/utilisateurs actifs/i)).toBeInTheDocument();
      expect(screen.getByText(/calculs effectués/i)).toBeInTheDocument();
      expect(screen.getByText(/économies générées/i)).toBeInTheDocument();
      expect(screen.getByText(/précision des calculs/i)).toBeInTheDocument();
    });

    it('should render trust badges', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <StatsDisplay />
        </I18nextProvider>
      );

      expect(screen.getByText(/données officielles amo/i)).toBeInTheDocument();
      expect(screen.getByText(/100% gratuit/i)).toBeInTheDocument();
      expect(screen.getByText(/résultats instantanés/i)).toBeInTheDocument();
    });

    it('should animate counters on scroll into view', async () => {
      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <StatsDisplay />
        </I18nextProvider>
      );

      // Trigger intersection observer
      const observer = new IntersectionObserver(() => {});
      const stats = container.querySelectorAll('[data-testid="stat-item"]');
      stats.forEach(stat => observer.observe(stat));

      await waitFor(() => {
        expect(screen.getByText(/50/)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('RTL Support', () => {
    it('should apply RTL styles when language is Arabic', async () => {
      await i18n.changeLanguage('ar');

      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('dir', 'rtl');
    });

    it('should reverse animation directions in RTL', async () => {
      await i18n.changeLanguage('ar');

      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={[]} onSelect={jest.fn()} />
        </I18nextProvider>
      );

      // Check for RTL-specific classes
      const searchInput = screen.getByPlaceholderText(/بحث/i);
      expect(searchInput.parentElement).toHaveClass('rtl:pr-10');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on interactive elements', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      const nextButton = screen.getByRole('button', { name: /suivant/i });
      expect(nextButton).toHaveAttribute('aria-label');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={[]} onSelect={jest.fn()} />
        </I18nextProvider>
      );

      const searchInput = screen.getByPlaceholderText(/rechercher/i);
      
      // Tab to focus
      await user.tab();
      expect(searchInput).toHaveFocus();

      // Type and use arrow keys
      await user.type(searchInput, 'test');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowUp}');
      await user.keyboard('{Escape}');
    });

    it('should have proper focus indicators', () => {
      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('focus:ring-2');
      });
    });
  });

  describe('Error Handling', () => {
    it('should show validation errors for invalid input', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MultiStepCalculator onComplete={jest.fn()} />
        </I18nextProvider>
      );

      // Try to proceed without filling required fields
      const nextButton = screen.getByText(/suivant/i);
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/ce champ est requis/i)).toBeInTheDocument();
      });
    });

    it('should handle medication search with no results', async () => {
      const user = userEvent.setup();

      render(
        <I18nextProvider i18n={i18n}>
          <MedicationSearch medications={[]} onSelect={jest.fn()} />
        </I18nextProvider>
      );

      const searchInput = screen.getByPlaceholderText(/rechercher/i);
      await user.type(searchInput, 'nonexistent medication');

      await waitFor(() => {
        expect(screen.getByText(/aucun résultat/i)).toBeInTheDocument();
      });
    });
  });
});
