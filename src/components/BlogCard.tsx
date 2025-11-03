/**
 * BlogCard Component
 * Displays a blog post preview card
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { BlogPost } from '@/lib/blogData';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { language, isRTL } = useLanguage();

  const title = post.title[language];
  const description = post.description[language];
  const imageAlt = post.imageAlt[language];

  // Format date
  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    language === 'ar' ? 'ar-MA' : 'fr-FR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Image */}
      <Link to={`/blog/${post.id}`} className="block overflow-hidden">
        <img
          src={post.image}
          alt={imageAlt}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            post.category === 'cnss' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : post.category === 'cnops'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
          }`}>
            {post.category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <Link to={`/blog/${post.id}`}>
          <h3 className={`text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${
            isRTL ? 'font-arabic text-right' : ''
          }`}>
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className={`text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 ${
          isRTL ? 'font-arabic text-right' : ''
        }`}>
          {description}
        </p>

        {/* Meta Info */}
        <div className={`flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 ${
          isRTL ? 'flex-row-reverse' : ''
        }`}>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className={isRTL ? 'font-arabic' : ''}>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className={isRTL ? 'font-arabic' : ''}>
              {post.readTime} {language === 'ar' ? 'دقيقة' : 'min'}
            </span>
          </div>
        </div>

        {/* Read More Button */}
        <Link to={`/blog/${post.id}`}>
          <Button variant="ghost" className={`group/btn ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={isRTL ? 'font-arabic' : ''}>
              {language === 'ar' ? 'اقرأ المزيد' : 'Lire la suite'}
            </span>
            <ArrowRight className={`w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform ${
              isRTL ? 'rotate-180 mr-2 ml-0 group-hover/btn:-translate-x-1' : ''
            }`} />
          </Button>
        </Link>
      </div>
    </article>
  );
}
