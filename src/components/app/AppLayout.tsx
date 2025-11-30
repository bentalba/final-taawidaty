/**
 * App Layout Component for Native App
 * Wraps content with header and bottom navigation
 */

import { ReactNode } from 'react';
import { isNativeApp } from '@/utils/platform';
import AppHeader from './AppHeader';
import BottomNavigation from './BottomNavigation';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showBack?: boolean;
  showNav?: boolean;
  headerRightAction?: ReactNode;
  language?: 'ar' | 'en' | 'fr';
  className?: string;
}

export const AppLayout = ({
  children,
  title = 'تعويضاتي',
  showHeader = true,
  showBack = true,
  showNav = true,
  headerRightAction,
  language = 'ar',
  className = '',
}: AppLayoutProps) => {
  // For web, just render children normally
  if (!isNativeApp()) {
    return <>{children}</>;
  }

  return (
    <div className={`app-layout ${className}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {showHeader && (
        <AppHeader 
          title={title}
          showBack={showBack}
          rightAction={headerRightAction}
          language={language}
        />
      )}
      
      <main className="app-content">
        {children}
      </main>

      {showNav && <BottomNavigation language={language} />}
    </div>
  );
};

export default AppLayout;
