/**
 * Blog Listing Page
 * Displays all blog posts
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useLanguage } from '@/hooks/useLanguage';
import { blogPosts } from '@/lib/blogData';
import BlogCard from '@/components/BlogCard';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { SEO } from '@/components/SEO';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const { language, isRTL } = useLanguage();

  const breadcrumbItems = [
    { 
      label: language === 'ar' ? 'المدونة' : 'Blog'
    }
  ];

  const pageTitle = language === 'ar' 
    ? 'مدونة Taawidaty - دليل الاسترداد CNSS و CNOPS'
    : 'Blog Taawidaty - Guide Remboursement CNSS & CNOPS';

  const pageDescription = language === 'ar'
    ? 'مقالات ودلائل شاملة حول استرداد الأدوية من CNSS و CNOPS في المغرب. نصائح وإجراءات ومعلومات محدثة 2025.'
    : 'Articles et guides complets sur le remboursement des médicaments CNSS et CNOPS au Maroc. Conseils, procédures et informations à jour 2025.';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="blog remboursement, guide cnss, guide cnops, médicaments maroc, assurance maladie maroc"
        canonical="https://taawidaty.ma/blog"
        lang={language}
      />

      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <BlogBreadcrumb items={breadcrumbItems} />

          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-primary-700 dark:text-primary-300" />
              <span className={`text-sm font-semibold text-primary-700 dark:text-primary-300 ${
                isRTL ? 'font-arabic' : ''
              }`}>
                {language === 'ar' ? 'المدونة' : 'Blog'}
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 ${
              isRTL ? 'font-arabic' : ''
            }`}>
              {language === 'ar' 
                ? 'دليلك الشامل للاسترداد الطبي'
                : 'Votre Guide Complet du Remboursement'}
            </h1>

            <p className={`text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto ${
              isRTL ? 'font-arabic' : ''
            }`}>
              {language === 'ar'
                ? 'مقالات شاملة ونصائح عملية لفهم نظام استرداد الأدوية في المغرب'
                : 'Articles complets et conseils pratiques pour comprendre le système de remboursement au Maroc'}
            </p>
          </header>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar'
                ? 'احسب استردادك الآن'
                : 'Calculez votre remboursement maintenant'}
            </h2>
            <p className={`text-xl mb-8 opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar'
                ? 'استخدم حاسبتنا المجانية لمعرفة المبلغ الذي سيتم استرداده بالضبط'
                : 'Utilisez notre calculateur gratuit pour savoir exactement combien vous serez remboursé'}
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-lg hover:bg-slate-50 transition-colors shadow-lg"
            >
              {language === 'ar' ? 'الذهاب إلى الحاسبة' : 'Accéder au calculateur'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
