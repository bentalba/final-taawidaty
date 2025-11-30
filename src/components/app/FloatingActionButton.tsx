/**
 * Floating Action Button (FAB)
 * Quick access to calculator from any screen
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calculator, X, Plus, Search, Heart } from 'lucide-react';
import { isNativeApp } from '@/utils/platform';
import { haptics } from '@/utils/haptics';

interface FABAction {
  id: string;
  icon: React.ElementType;
  label: string;
  labelAr: string;
  path: string;
  color: string;
}

const fabActions: FABAction[] = [
  { 
    id: 'calc', 
    icon: Calculator, 
    label: 'Calculate', 
    labelAr: 'حساب',
    path: '/calculator',
    color: 'green'
  },
  { 
    id: 'search', 
    icon: Search, 
    label: 'Search', 
    labelAr: 'بحث',
    path: '/search',
    color: 'blue'
  },
  { 
    id: 'favorites', 
    icon: Heart, 
    label: 'Favorites', 
    labelAr: 'المفضلة',
    path: '/favorites',
    color: 'red'
  }
];

interface FloatingActionButtonProps {
  language?: 'ar' | 'fr';
}

export const FloatingActionButton = ({ language = 'ar' }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Only show in native app
  if (!isNativeApp()) return null;

  // Don't show on calculator page or home
  if (location.pathname === '/calculator' || location.pathname === '/') {
    return null;
  }

  const toggleFab = () => {
    haptics.medium();
    setIsOpen(!isOpen);
  };

  const handleAction = (action: FABAction) => {
    haptics.light();
    setIsOpen(false);
    navigate(action.path);
  };

  return (
    <div className="fab-container">
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fab-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Action buttons */}
      <div className={`fab-actions ${isOpen ? 'open' : ''}`}>
        {fabActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`fab-action ${action.color}`}
              onClick={() => handleAction(action)}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              <Icon size={20} />
              <span className="fab-action-label">
                {language === 'ar' ? action.labelAr : action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main FAB */}
      <button 
        className={`fab-main ${isOpen ? 'open' : ''}`}
        onClick={toggleFab}
        aria-label={language === 'ar' ? 'قائمة سريعة' : 'Quick menu'}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;
