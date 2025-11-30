/**
 * Calculation History Page
 * Shows past calculations with statistics
 */

import React, { useState } from 'react';
import { AppHeader } from '@/components/app/AppHeader';
import { useCalculationHistory, CalculationHistoryItem } from '@/hooks/useCalculationHistory';
import { haptics } from '@/utils/haptics';

const HistoryPage: React.FC = () => {
  const { history, removeCalculation, clearHistory, getStatistics } = useCalculationHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const stats = getStatistics();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} MAD`;
  };

  const toggleExpand = (id: string) => {
    haptics.light();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    haptics.medium();
    removeCalculation(id);
  };

  const handleClearAll = () => {
    haptics.heavy();
    clearHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="app-page">
      <AppHeader title="History" showBack />

      <div className="app-page-content" style={{ padding: '1rem' }}>
        {/* Statistics Card */}
        <div className="native-card" style={{ marginBottom: '1rem' }}>
          <div className="native-card-header">
            <h3 className="native-card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
              </svg>
              Your Statistics
            </h3>
          </div>
          <div className="native-card-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--surface-elevated)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                  {stats.totalCalculations}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Calculations
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--surface-elevated)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--success)' }}>
                  {formatCurrency(stats.totalSaved)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Total Reimbursed
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--surface-elevated)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {formatCurrency(stats.averageSaved)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Avg. per Calculation
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--surface-elevated)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                  {stats.mostCalculatedMed?.name?.slice(0, 20) || '—'}
                  {stats.mostCalculatedMed?.name && stats.mostCalculatedMed.name.length > 20 && '...'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Most Calculated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="native-card">
          <div className="native-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="native-card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              Recent Calculations
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--error)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
            )}
          </div>
          <div className="native-card-content">
            {history.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <h3 className="empty-state-title">No History Yet</h3>
                <p className="empty-state-description">
                  Your calculation history will appear here. Start by calculating medication reimbursements!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {history.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    isExpanded={expandedId === item.id}
                    onToggle={() => toggleExpand(item.id)}
                    onDelete={(e) => handleDelete(item.id, e)}
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowClearConfirm(false)}
        >
          <div 
            style={{
              background: 'var(--surface)',
              borderRadius: '16px',
              padding: '1.5rem',
              maxWidth: '320px',
              width: '100%'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Clear All History?
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              This will permanently delete all {history.length} calculations. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setShowClearConfirm(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--error)',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface HistoryItemProps {
  item: CalculationHistoryItem;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (e: React.MouseEvent) => void;
  formatDate: (timestamp: number) => string;
  formatCurrency: (amount: number) => string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  isExpanded,
  onToggle,
  onDelete,
  formatDate,
  formatCurrency
}) => {
  return (
    <div
      style={{
        background: 'var(--surface-elevated)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: '1rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ 
              fontSize: '0.625rem', 
              fontWeight: '600',
              padding: '0.125rem 0.375rem',
              borderRadius: '4px',
              background: 'var(--primary)',
              color: 'white',
              textTransform: 'uppercase'
            }}>
              Mutuelle
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              {formatDate(item.calculatedAt)}
            </span>
          </div>
          <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
            {item.medications.length} medication{item.medications.length !== 1 ? 's' : ''}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: '500' }}>
            Reimbursed: {formatCurrency(item.totalReimbursement)}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onDelete}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              borderRadius: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--text-tertiary)" 
            strokeWidth="2"
            style={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div style={{ 
          padding: '0 1rem 1rem 1rem',
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ paddingTop: '0.75rem' }}>
            {item.medications.map((med, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '0.5rem 0',
                  borderBottom: index < item.medications.length - 1 ? '1px dashed var(--border)' : 'none'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {med.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Rate: {med.taux_remb}%
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {formatCurrency(med.ppv)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>
                    -{formatCurrency(med.reimbursement)}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ 
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '2px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Price</div>
                <div style={{ fontWeight: '600' }}>{formatCurrency(item.totalPrice)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Reimbursed</div>
                <div style={{ fontWeight: '600', color: 'var(--success)' }}>{formatCurrency(item.totalReimbursement)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>You Pay</div>
                <div style={{ fontWeight: '600', color: 'var(--error)' }}>{formatCurrency(item.totalPatientPays)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
