/**
 * App Header Component for Native App
 * Medical themed header with back navigation
 * Back button is ALWAYS on the left side with LEFT arrow for consistent UX
 */

import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isNativeApp } from '@/utils/platform';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  rightAction?: React.ReactNode;
  language?: 'ar' | 'en' | 'fr';
}

export const AppHeader = ({
  title = 'Taawidaty',
  showBack = true,
  showNotifications = false,
  showSettings = false,
  rightAction,
  language = 'fr',
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show in native app
  if (!isNativeApp()) return null;

  // Don't show back button on home
  const isHome = location.pathname === '/';
  const displayBack = showBack && !isHome;

  const handleBack = () => {
    navigate(-1);
  };

  // Back arrow ALWAYS points LEFT - universal back navigation pattern

  return (
    <header className="app-header">
      <div className="app-header-left">
        {displayBack && (
          <button 
            className="app-header-btn app-header-back-btn" 
            onClick={handleBack}
            aria-label={language === 'ar' ? 'رجوع' : 'Retour'}
          >
            <ArrowLeft size={24} />
          </button>
        )}
      </div>

      <h1 className="app-header-title">{title}</h1>

      <div className="app-header-right">
        {showNotifications && (
          <button 
            className="app-header-btn"
            aria-label={language === 'ar' ? 'الإشعارات' : 'Notifications'}
          >
            <Bell size={22} />
          </button>
        )}
        {showSettings && (
          <button 
            className="app-header-btn"
            onClick={() => navigate('/settings')}
            aria-label={language === 'ar' ? 'الإعدادات' : 'Paramètres'}
          >
            <Settings size={22} />
          </button>
        )}
        {rightAction}
      </div>
    </header>
  );
};

export default AppHeader;
