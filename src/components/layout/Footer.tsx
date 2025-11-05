import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: t('footer.calculator', 'Calculateur'), href: '#calculator' },
      { name: t('footer.faqCnops', 'FAQ CNOPS'), href: '/faq-cnops' },
      { name: t('footer.faqCnss', 'FAQ CNSS'), href: '/faq-cnss' },
      { name: t('footer.blog', 'Blog'), href: '/blog' },
    ],
    company: [
      { name: t('footer.about', 'À propos'), href: '/about' },
      { name: t('footer.contact', 'Contact'), href: '/contact' },
      { name: t('footer.privacy', 'Confidentialité'), href: '/privacy' },
      { name: t('footer.terms', 'Conditions'), href: '/terms' },
    ],
    resources: [
      { name: t('footer.cnopsGuide', 'Guide CNOPS'), href: '/blog/guide-remboursement-cnops' },
      { name: t('footer.cnssGuide', 'Guide CNSS'), href: '/blog/guide-remboursement-cnss' },
      { name: t('footer.comparison', 'CNSS vs CNOPS'), href: '/blog/difference-cnss-cnops' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/taawidaty', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/taawidaty', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/taawidaty', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/taawidaty', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-trust-blue to-trust-blue-dark rounded-xl flex items-center justify-center shadow-medium">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <span className="text-xl font-black">TAAWIDATY</span>
            </div>
            <p className="text-neutral-400 mb-4 max-w-sm leading-relaxed">
              {t(
                'footer.description',
                'Votre calculateur gratuit et fiable pour les remboursements médicaux au Maroc. Données officielles AMO.'
              )}
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:contact@taawidaty.ma"
                  className="hover:text-trust-blue transition-colors"
                >
                  contact@taawidaty.ma
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4" />
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.productTitle', 'Produit')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-trust-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.companyTitle', 'Entreprise')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-trust-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.resourcesTitle', 'Ressources')}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-trust-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-neutral-400 text-sm text-center md:text-left">
            © {currentYear} TAAWIDATY. {t('footer.copyright', 'Tous droits réservés.')}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-trust-blue transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-xs text-center leading-relaxed max-w-4xl mx-auto">
            {t(
              'footer.disclaimer',
              'TAAWIDATY est un outil informatif indépendant. Les calculs sont basés sur les données officielles de l\'AMO mais peuvent varier selon votre situation personnelle. Consultez votre organisme d\'assurance pour une confirmation définitive. Ce service est gratuit et ne collecte aucune donnée personnelle.'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
