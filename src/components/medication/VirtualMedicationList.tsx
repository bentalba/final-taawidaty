/**
 * VirtualMedicationList Component
 * Implements virtual scrolling for large medication lists
 * Only renders visible items for optimal performance
 */

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  ppv: number;
  cnops?: {
    reimbursable: boolean;
  };
  cnss?: {
    reimbursable: boolean;
  };
}

interface VirtualMedicationListProps {
  medications: Medication[];
  onSelect: (medication: Medication) => void;
  selectedId?: string;
  insuranceType: 'cnops' | 'cnss';
  height?: number;
}

export function VirtualMedicationList({
  medications,
  onSelect,
  selectedId,
  insuranceType,
  height = 400,
}: VirtualMedicationListProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const parentRef = useRef<HTMLDivElement>(null);

  // Virtual scrolling setup
  const rowVirtualizer = useVirtualizer({
    count: medications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Estimated item height
    overscan: 5, // Render 5 extra items above/below viewport
  });

  if (medications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-neutral-300 mb-4" />
        <p className="text-neutral-600">{t('search.noResults', 'Aucun résultat trouvé')}</p>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="overflow-auto rounded-xl border-2 border-neutral-200 bg-white"
      style={{ height: `${height}px` }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const medication = medications[virtualRow.index];
          const isSelected = medication.id === selectedId;
          const isReimbursable = medication[insuranceType]?.reimbursable ?? false;

          return (
            <motion.button
              key={virtualRow.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect(medication)}
              className={cn(
                'absolute top-0 left-0 w-full px-4 py-3 text-left transition-all duration-200',
                'hover:bg-trust-blue/5 focus:outline-none focus:bg-trust-blue/10',
                'border-b border-neutral-100',
                isSelected && 'bg-trust-blue/10'
              )}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-1',
                    isReimbursable ? 'bg-success-green/10' : 'bg-neutral-100'
                  )}
                >
                  <Pill
                    className={cn(
                      'w-5 h-5',
                      isReimbursable ? 'text-success-green' : 'text-neutral-400'
                    )}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-900 truncate mb-1">
                    {medication.name}
                  </h4>
                  <p className="text-sm text-neutral-600 truncate mb-1">
                    {medication.genericName} • {medication.dosage}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-trust-blue">
                      {medication.ppv.toFixed(2)} MAD
                    </span>
                    {!isReimbursable && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        {t('medication.notReimbursable', 'Non remboursable')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 w-6 h-6 bg-trust-blue rounded-full flex items-center justify-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
