/**
 * Settings Page - Native App
 * User preferences: language, theme, notifications, etc.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { isNativeApp } from '@/utils/platform';
import { haptics } from '@/utils/haptics';
import { 
  Settings,
  Globe,
  Moon,
  Sun,
  Bell,
  Shield,
  Info,
  ChevronRight,
  Mail,
  Star,
  Trash2,
  HelpCircle,
  FileText,
  Heart
} from 'lucide-react';

interface SettingItemProps {
  icon: React.ElementType;
  iconColor?: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
}

const SettingItem = ({ icon: Icon, iconColor = 'green', title, subtitle, onClick, rightElement }: SettingItemProps) => (
  <button 
    className="app-setting-item"
    onClick={() => {
      haptics.light();
      onClick?.();
    }}
  >
    <div className={`app-setting-icon ${iconColor}`}>
      <Icon size={20} />
    </div>
    <div className="app-setting-content">
      <span className="app-setting-title">{title}</span>
      {subtitle && <span className="app-setting-subtitle">{subtitle}</span>}
    </div>
    {rightElement || <ChevronRight size={20} className="app-setting-arrow" />}
  </button>
);

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => (
  <button
    className={`app-toggle ${checked ? 'active' : ''}`}
    onClick={(e) => {
      e.stopPropagation();
      haptics.selection();
      onChange(!checked);
    }}
    aria-checked={checked}
    role="switch"
  >
    <div className="app-toggle-thumb" />
  </button>
);

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const isRTL = language === 'ar';

  // For web, redirect
  if (!isNativeApp()) {
    return null;
  }

  const handleClearData = () => {
    haptics.heavy();
    if (confirm(language === 'ar' 
      ? 'هل تريد مسح جميع البيانات المحفوظة؟' 
      : 'Voulez-vous effacer toutes les données sauvegardées ?'
    )) {
      localStorage.clear();
      sessionStorage.clear();
      haptics.success();
      window.location.reload();
    }
  };

  const appVersion = '1.0.0';

  return (
    <div className="app-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="app-page-header">
        <div className="app-page-header-icon blue">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="app-page-title">
            {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
          </h1>
          <p className="app-page-subtitle">
            {language === 'ar' ? 'تخصيص التطبيق' : 'Personnaliser l\'application'}
          </p>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="app-settings-container">
        {/* Preferences */}
        <div className="app-settings-group">
          <h3 className="app-settings-group-title">
            {language === 'ar' ? 'التفضيلات' : 'Préférences'}
          </h3>
          
          <SettingItem
            icon={Globe}
            iconColor="blue"
            title={language === 'ar' ? 'اللغة' : 'Langue'}
            subtitle={language === 'ar' ? 'العربية' : 'Français'}
            onClick={toggleLanguage}
            rightElement={
              <span className="app-setting-value">
                {language === 'ar' ? 'FR' : 'ع'}
              </span>
            }
          />

          <SettingItem
            icon={theme === 'dark' ? Moon : Sun}
            iconColor="orange"
            title={language === 'ar' ? 'المظهر' : 'Apparence'}
            subtitle={
              theme === 'dark' 
                ? (language === 'ar' ? 'داكن' : 'Sombre')
                : theme === 'light'
                ? (language === 'ar' ? 'فاتح' : 'Clair')
                : (language === 'ar' ? 'تلقائي' : 'Auto')
            }
            onClick={() => {
              const themes = ['light', 'dark', 'system'];
              const currentIndex = themes.indexOf(theme || 'system');
              const nextTheme = themes[(currentIndex + 1) % themes.length];
              setTheme(nextTheme);
            }}
          />

          <SettingItem
            icon={Bell}
            iconColor="red"
            title={language === 'ar' ? 'الإشعارات' : 'Notifications'}
            subtitle={
              notifications 
                ? (language === 'ar' ? 'مفعّلة' : 'Activées')
                : (language === 'ar' ? 'معطّلة' : 'Désactivées')
            }
            rightElement={
              <ToggleSwitch 
                checked={notifications} 
                onChange={setNotifications}
              />
            }
          />
        </div>

        {/* Data & Privacy */}
        <div className="app-settings-group">
          <h3 className="app-settings-group-title">
            {language === 'ar' ? 'البيانات والخصوصية' : 'Données & Confidentialité'}
          </h3>

          <SettingItem
            icon={Heart}
            iconColor="red"
            title={language === 'ar' ? 'المفضلة' : 'Favoris'}
            subtitle={language === 'ar' ? 'إدارة الأدوية المحفوظة' : 'Gérer les médicaments sauvegardés'}
            onClick={() => navigate('/favorites')}
          />

          <SettingItem
            icon={Shield}
            iconColor="green"
            title={language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
            onClick={() => navigate('/privacy-policy')}
          />

          <SettingItem
            icon={Trash2}
            iconColor="red"
            title={language === 'ar' ? 'مسح البيانات' : 'Effacer les données'}
            subtitle={language === 'ar' ? 'حذف جميع البيانات المحلية' : 'Supprimer toutes les données locales'}
            onClick={handleClearData}
          />
        </div>

        {/* About */}
        <div className="app-settings-group">
          <h3 className="app-settings-group-title">
            {language === 'ar' ? 'حول التطبيق' : 'À propos'}
          </h3>

          <SettingItem
            icon={Info}
            iconColor="blue"
            title={language === 'ar' ? 'عن تعويضاتي' : 'À propos de Taawidaty'}
            onClick={() => navigate('/about-us')}
          />

          <SettingItem
            icon={FileText}
            iconColor="orange"
            title={language === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'utilisation'}
            onClick={() => navigate('/terms-of-service')}
          />

          <SettingItem
            icon={HelpCircle}
            iconColor="green"
            title={language === 'ar' ? 'المساعدة والدعم' : 'Aide & Support'}
            onClick={() => navigate('/contact-us')}
          />

          <SettingItem
            icon={Mail}
            iconColor="blue"
            title={language === 'ar' ? 'اتصل بنا' : 'Nous contacter'}
            subtitle="contact@taawidaty.ma"
            onClick={() => window.open('mailto:contact@taawidaty.ma')}
          />

          <SettingItem
            icon={Star}
            iconColor="orange"
            title={language === 'ar' ? 'قيّم التطبيق' : 'Noter l\'application'}
            subtitle={language === 'ar' ? 'ساعدنا بتقييمك' : 'Aidez-nous avec votre avis'}
            onClick={() => {
              // TODO: Open Play Store rating
              haptics.success();
            }}
          />
        </div>

        {/* Version Info */}
        <div className="app-version-info">
          <p className="app-version-text">
            Taawidaty v{appVersion}
          </p>
          <p className="app-version-copyright">
            © 2025 BENTALBA ZAKARIA
          </p>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-24"></div>
    </div>
  );
};

export default SettingsPage;
