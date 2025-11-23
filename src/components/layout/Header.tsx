import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MedicalButton } from '@/components/ui/MedicalButton';
import { cn } from '@/lib/utils';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navigation = [
    { name: t('nav.home', 'Accueil'), href: '/' },
    { name: t('nav.calculator', 'Calculateur'), href: '#calculator' },
    { name: t('nav.blog', 'Blog'), href: '/blog' },
    { name: t('nav.faq', 'FAQ'), href: '#faq' },
    { name: t('nav.about', 'À propos'), href: '/about-us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-soft">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo - Responsive sizing */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-trust-blue to-trust-blue-dark rounded-xl flex items-center justify-center shadow-medium">
                <span className="text-white font-black text-lg sm:text-xl">T</span>
              </div>
              <span className="text-base sm:text-xl font-black text-neutral-900 group-hover:text-trust-blue transition-colors hidden xs:inline">
                TAAWIDATY
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 hover:text-trust-blue transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-blue group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-neutral-700 hover:text-trust-blue transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-blue group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
          </div>

          {/* Actions - Compact on mobile */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Language Toggle - Icon only on mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-trust-blue"
              aria-label={t('nav.changeLanguage', 'Changer de langue')}
            >
              <Globe className="w-4 h-4 text-neutral-600" />
              <span className="text-xs sm:text-sm font-medium text-neutral-700 hidden sm:inline">
                {i18n.language === 'fr' ? 'عربية' : 'Français'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-trust-blue"
              aria-label={t('nav.toggleMenu', 'Toggle menu')}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-neutral-200"
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-trust-blue transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-trust-blue transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
