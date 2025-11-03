/**
 * TAAWIDATY - Blog Data
 * Central repository for all blog posts metadata and content
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

export interface BlogPost {
  id: string;                    // URL slug: "guide-remboursement-cnss"
  title: {
    fr: string;
    ar: string;
  };
  description: {
    fr: string;
    ar: string;
  };
  keywords: string[];              // SEO keywords
  author: string;
  publishDate: string;             // ISO format: "2025-11-03"
  lastModified: string;            // ISO format: "2025-11-03"
  readTime: number;                // Minutes to read
  category: 'cnss' | 'cnops' | 'general' | 'comparison';
  image: string;                   // Featured image URL
  imageAlt: {
    fr: string;
    ar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 'guide-remboursement-cnss',
    title: {
      fr: 'Guide Complet du Remboursement CNSS au Maroc 2025',
      ar: 'الدليل الكامل لاسترداد CNSS في المغرب 2025'
    },
    description: {
      fr: 'Découvrez tout ce qu\'il faut savoir sur le remboursement des médicaments par la CNSS : taux, procédures, documents nécessaires et délais de traitement.',
      ar: 'اكتشف كل ما تحتاج لمعرفته حول استرداد الأدوية من CNSS: المعدلات والإجراءات والوثائق المطلوبة ومواعيد المعالجة.'
    },
    keywords: [
      'remboursement cnss',
      'cnss maroc',
      'médicaments cnss',
      'taux remboursement cnss',
      'procédure cnss',
      'guide cnss 2025'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-04',
    lastModified: '2025-11-04',
    readTime: 8,
    category: 'cnss',
    image: '/blog-images/cnss-guide.svg',
    imageAlt: {
      fr: 'Guide du remboursement CNSS',
      ar: 'دليل استرداد CNSS'
    }
  },
  {
    id: 'guide-remboursement-cnops',
    title: {
      fr: 'Guide Complet du Remboursement CNOPS au Maroc 2025',
      ar: 'الدليل الكامل لاسترداد CNOPS في المغرب 2025'
    },
    description: {
      fr: 'Tout savoir sur le remboursement CNOPS : taux de couverture, démarches administratives, délais et astuces pour optimiser vos remboursements.',
      ar: 'كل ما تحتاج معرفته عن استرداد CNOPS: معدلات التغطية، الإجراءات الإدارية، المواعيد ونصائح لتحسين استرداداتك.'
    },
    keywords: [
      'remboursement cnops',
      'cnops maroc',
      'médicaments cnops',
      'taux remboursement cnops',
      'procédure cnops',
      'guide cnops 2025'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-04',
    lastModified: '2025-11-04',
    readTime: 8,
    category: 'cnops',
    image: '/blog-images/cnops-guide.svg',
    imageAlt: {
      fr: 'Guide du remboursement CNOPS',
      ar: 'دليل استرداد CNOPS'
    }
  },
  {
    id: 'difference-cnss-cnops',
    title: {
      fr: 'CNSS vs CNOPS : Quelle Différence pour vos Médicaments ?',
      ar: 'CNSS مقابل CNOPS: ما الفرق بالنسبة لأدويتك؟'
    },
    description: {
      fr: 'Comparaison détaillée entre CNSS et CNOPS : taux de remboursement, procédures, avantages et inconvénients pour vous aider à comprendre votre couverture.',
      ar: 'مقارنة مفصلة بين CNSS و CNOPS: معدلات الاسترداد، الإجراءات، المزايا والعيوب لمساعدتك على فهم تغطيتك.'
    },
    keywords: [
      'cnss vs cnops',
      'différence cnss cnops',
      'comparaison cnss cnops',
      'choisir cnss ou cnops',
      'assurance maladie maroc'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-04',
    lastModified: '2025-11-04',
    readTime: 6,
    category: 'comparison',
    image: '/blog-images/cnss-vs-cnops.svg',
    imageAlt: {
      fr: 'Comparaison CNSS vs CNOPS',
      ar: 'مقارنة CNSS مقابل CNOPS'
    }
  }
];

// Helper function to get blog post by ID
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// Helper function to get all posts by category
export const getBlogPostsByCategory = (category: 'cnss' | 'cnops' | 'general'): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

// Helper function to get recent posts
export const getRecentBlogPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};
