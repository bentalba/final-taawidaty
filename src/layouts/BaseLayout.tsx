import { useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Add transition class for smooth direction change
    document.documentElement.classList.add('direction-transition');
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('direction-transition');
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [isRTL, i18n.language]);

  return (
    <div className={`min-h-screen bg-neutral-50 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      {children}
    </div>
  );
}
