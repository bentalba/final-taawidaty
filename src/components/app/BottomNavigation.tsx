/**
 * Bottom Navigation Component for Native App
 * Material Design 3 inspired 5-tab navigation
 */

import { Home, Search, Calculator, Heart, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isNativeApp } from '@/utils/platform';
import { haptics } from '@/utils/haptics';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  labelAr: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: 'Home', labelAr: 'الرئيسية', path: '/' },
  { id: 'search', icon: Search, label: 'Search', labelAr: 'بحث', path: '/search' },
  { id: 'calculator', icon: Calculator, label: 'Calculator', labelAr: 'حاسبة', path: '/calculator' },
  { id: 'favorites', icon: Heart, label: 'Favorites', labelAr: 'المفضلة', path: '/favorites' },
  { id: 'settings', icon: Settings, label: 'Settings', labelAr: 'إعدادات', path: '/profile' },
];

interface BottomNavigationProps {
  language?: 'ar' | 'en' | 'fr';
}

export const BottomNavigation = ({ language = 'ar' }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show in native app
  if (!isNativeApp()) return null;

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        const label = language === 'ar' ? item.labelAr : item.label;

        return (
          <button
            key={item.id}
            onClick={() => {
              haptics.selection();
              navigate(item.path);
            }}
            className={`bottom-nav-item ${active ? 'active' : ''}`}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            <div className="bottom-nav-icon">
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              {active && <div className="bottom-nav-indicator" />}
            </div>
            <span className="bottom-nav-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
