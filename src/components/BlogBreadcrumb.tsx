/**
 * BlogBreadcrumb Component
 * Navigation breadcrumb for blog pages
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  const { isRTL } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Home */}
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className={`w-4 h-4 text-slate-400 dark:text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
            {item.href ? (
              <Link
                to={item.href}
                className={`text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                  isRTL ? 'font-arabic' : ''
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`text-slate-900 dark:text-white font-semibold ${isRTL ? 'font-arabic' : ''}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
