/**
 * Medication Comparison Component
 * Compare two medications side by side
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowLeftRight, 
  Check, 
  X, 
  Pill,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { haptics } from '@/utils/haptics';

interface ComparisonMedication {
  id: number;
  name: string;
  ppv: number;
  base_remb: number;
  taux_remb: number;
  dci?: string;
}

interface ComparisonRowProps {
  label: string;
  value1: string | number;
  value2: string | number;
  highlight?: 'better' | 'worse' | 'equal' | 'none';
  isPrice?: boolean;
}

const ComparisonRow = ({ label, value1, value2, highlight = 'none', isPrice }: ComparisonRowProps) => {
  const getHighlightClass = (position: 1 | 2) => {
    if (highlight === 'none') return '';
    if (highlight === 'equal') return 'neutral';
    if (position === 1) return highlight === 'better' ? 'better' : 'worse';
    return highlight === 'better' ? 'worse' : 'better';
  };

  const getIcon = (position: 1 | 2) => {
    if (highlight === 'none' || highlight === 'equal') return null;
    const isBetter = (position === 1 && highlight === 'better') || 
                     (position === 2 && highlight === 'worse');
    
    if (isPrice) {
      // For price, lower is better
      return isBetter ? <TrendingDown size={14} className="text-green-500" /> : 
                       <TrendingUp size={14} className="text-red-500" />;
    }
    // For reimbursement, higher is better
    return isBetter ? <TrendingUp size={14} className="text-green-500" /> : 
                     <TrendingDown size={14} className="text-red-500" />;
  };

  return (
    <div className="comparison-row">
      <div className={`comparison-value ${getHighlightClass(1)}`}>
        <span>{typeof value1 === 'number' ? value1.toFixed(2) : value1}</span>
        {getIcon(1)}
      </div>
      <div className="comparison-label">{label}</div>
      <div className={`comparison-value ${getHighlightClass(2)}`}>
        <span>{typeof value2 === 'number' ? value2.toFixed(2) : value2}</span>
        {getIcon(2)}
      </div>
    </div>
  );
};

interface MedicationComparisonProps {
  medication1: ComparisonMedication | null;
  medication2: ComparisonMedication | null;
  onSelectMedication: (slot: 1 | 2) => void;
  onClear: (slot: 1 | 2) => void;
}

export const MedicationComparison = ({
  medication1,
  medication2,
  onSelectMedication,
  onClear
}: MedicationComparisonProps) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const calculateReimbursement = (med: ComparisonMedication) => {
    return (med.base_remb * med.taux_remb) / 100;
  };

  const calculatePatientPays = (med: ComparisonMedication) => {
    const reimb = calculateReimbursement(med);
    return Math.max(0, med.ppv - reimb);
  };

  const compareValues = (val1: number, val2: number, lowerIsBetter = false): 'better' | 'worse' | 'equal' => {
    if (val1 === val2) return 'equal';
    if (lowerIsBetter) {
      return val1 < val2 ? 'better' : 'worse';
    }
    return val1 > val2 ? 'better' : 'worse';
  };

  const MedicationSlot = ({ 
    medication, 
    slot, 
    label 
  }: { 
    medication: ComparisonMedication | null; 
    slot: 1 | 2;
    label: string;
  }) => (
    <div className={`comparison-slot ${medication ? 'filled' : 'empty'}`}>
      {medication ? (
        <>
          <div className="comparison-slot-header">
            <div className="comparison-slot-icon">
              <Pill size={20} />
            </div>
            <button 
              className="comparison-slot-clear"
              onClick={() => {
                haptics.light();
                onClear(slot);
              }}
            >
              <X size={16} />
            </button>
          </div>
          <h3 className="comparison-slot-name">{medication.name}</h3>
          {medication.dci && (
            <p className="comparison-slot-dci">{medication.dci}</p>
          )}
        </>
      ) : (
        <button 
          className="comparison-slot-add"
          onClick={() => {
            haptics.light();
            onSelectMedication(slot);
          }}
        >
          <Pill size={24} />
          <span>{label}</span>
        </button>
      )}
    </div>
  );

  const canCompare = medication1 && medication2;

  return (
    <div className="comparison-container" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="comparison-header">
        <ArrowLeftRight size={24} />
        <h2 className="comparison-title">
          {language === 'ar' ? 'مقارنة الأدوية' : 'Comparer les médicaments'}
        </h2>
      </div>

      {/* Medication Slots */}
      <div className="comparison-slots">
        <MedicationSlot 
          medication={medication1} 
          slot={1}
          label={language === 'ar' ? 'اختر الدواء الأول' : 'Sélectionner 1er'}
        />
        
        <div className="comparison-vs">VS</div>
        
        <MedicationSlot 
          medication={medication2} 
          slot={2}
          label={language === 'ar' ? 'اختر الدواء الثاني' : 'Sélectionner 2ème'}
        />
      </div>

      {/* Comparison Results */}
      {canCompare && (
        <div className="comparison-results">
          <ComparisonRow
            label={language === 'ar' ? 'السعر (درهم)' : 'Prix (MAD)'}
            value1={medication1.ppv}
            value2={medication2.ppv}
            highlight={compareValues(medication1.ppv, medication2.ppv, true)}
            isPrice
          />
          
          <ComparisonRow
            label={language === 'ar' ? 'نسبة التعويض' : 'Taux remb.'}
            value1={`${medication1.taux_remb}%`}
            value2={`${medication2.taux_remb}%`}
            highlight={compareValues(medication1.taux_remb, medication2.taux_remb)}
          />
          
          <ComparisonRow
            label={language === 'ar' ? 'التعويض (درهم)' : 'Remb. (MAD)'}
            value1={calculateReimbursement(medication1)}
            value2={calculateReimbursement(medication2)}
            highlight={compareValues(
              calculateReimbursement(medication1),
              calculateReimbursement(medication2)
            )}
          />
          
          <ComparisonRow
            label={language === 'ar' ? 'المتبقي (درهم)' : 'Reste (MAD)'}
            value1={calculatePatientPays(medication1)}
            value2={calculatePatientPays(medication2)}
            highlight={compareValues(
              calculatePatientPays(medication1),
              calculatePatientPays(medication2),
              true
            )}
            isPrice
          />

          {/* Summary */}
          <div className="comparison-summary">
            {calculatePatientPays(medication1) < calculatePatientPays(medication2) ? (
              <div className="comparison-winner">
                <Check size={20} />
                <span>
                  {language === 'ar' 
                    ? `${medication1.name} أرخص بـ ${(calculatePatientPays(medication2) - calculatePatientPays(medication1)).toFixed(2)} درهم`
                    : `${medication1.name} est moins cher de ${(calculatePatientPays(medication2) - calculatePatientPays(medication1)).toFixed(2)} MAD`
                  }
                </span>
              </div>
            ) : calculatePatientPays(medication2) < calculatePatientPays(medication1) ? (
              <div className="comparison-winner">
                <Check size={20} />
                <span>
                  {language === 'ar' 
                    ? `${medication2.name} أرخص بـ ${(calculatePatientPays(medication1) - calculatePatientPays(medication2)).toFixed(2)} درهم`
                    : `${medication2.name} est moins cher de ${(calculatePatientPays(medication1) - calculatePatientPays(medication2)).toFixed(2)} MAD`
                  }
                </span>
              </div>
            ) : (
              <div className="comparison-equal">
                <Minus size={20} />
                <span>
                  {language === 'ar' ? 'نفس التكلفة للمريض' : 'Même coût pour le patient'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationComparison;
