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
      ar: 'مقارنة CNSS و CNOPS'
    }
  },
  {
    id: 'comprendre-ppv-ppm-maroc',
    title: {
      fr: 'Comprendre la différence entre PPV et PPM au Maroc',
      ar: 'فهم الفرق بين سعر البيع للعموم وسعر المستشفى في المغرب'
    },
    description: {
      fr: 'Guide explicatif sur les prix des médicaments au Maroc : différence entre Prix Public de Vente (PPV) et Prix Public Hôpital (PPM) et leur impact sur votre remboursement.',
      ar: 'دليل توضيحي حول أسعار الأدوية في المغرب: الفرق بين سعر البيع للعموم وسعر المستشفى وتأثيرهما على استرداد أموالك.'
    },
    keywords: [
      'PPV maroc',
      'PPM maroc',
      'prix médicaments maroc',
      'remboursement médicaments',
      'prix public vente',
      'prix hospitalier'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-24',
    lastModified: '2025-11-24',
    readTime: 6,
    category: 'general',
    image: '/blog-images/ppv-ppm-guide.svg',
    imageAlt: {
      fr: 'Différence PPV et PPM',
      ar: 'الفرق بين PPV و PPM'
    }
  },
  {
    id: 'medicament-generique-efficacite',
    title: {
      fr: 'Médicaments génériques : Efficacité et Remboursement',
      ar: 'الأدوية الجنيسة: الفعالية والاسترداد'
    },
    description: {
      fr: 'Les médicaments génériques sont-ils aussi efficaces ? Tout savoir sur leur remboursement et pourquoi ils sont moins chers.',
      ar: 'هل الأدوية الجنيسة فعالة بنفس القدر؟ كل ما تحتاج معرفته حول استردادها ولماذا هي أرخص.'
    },
    keywords: [
      'médicament générique maroc',
      'remboursement générique',
      'efficacité générique',
      'prix générique',
      'médicament princeps'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-25',
    lastModified: '2025-11-25',
    readTime: 7,
    category: 'general',
    image: '/blog-images/generique-guide.svg',
    imageAlt: {
      fr: 'Médicaments génériques',
      ar: 'الأدوية الجنيسة'
    }
  },
  {
    id: 'comprendre-ticket-moderateur',
    title: {
      fr: 'Le Ticket Modérateur : Pourquoi je paie une partie de mes médicaments ?',
      ar: 'تذكرة التعديل: لماذا أدفع جزءاً من ثمن أدويتي؟'
    },
    description: {
      fr: 'Comprendre pourquoi le remboursement n\'est jamais de 100%. Tout savoir sur le "Ticket Modérateur" et le reste à charge au Maroc.',
      ar: 'فهم لماذا لا يكون التعويض 100٪ أبداً. كل ما تحتاج لمعرفته حول "تذكرة التعديل" والمبلغ المتبقي على عاتقك في المغرب.'
    },
    keywords: [
      'ticket modérateur maroc',
      'reste à charge',
      'remboursement 70%',
      'assurance maladie maroc',
      'tarif national référence'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-25',
    lastModified: '2025-11-25',
    readTime: 5,
    category: 'general',
    image: '/blog-images/calculator-money.svg',
    imageAlt: {
      fr: 'Calcul reste à charge',
      ar: 'حساب المبلغ المتبقي'
    }
  },
  {
    id: 'medicaments-non-remboursables',
    title: {
      fr: 'Vitamines et Compléments : Pourquoi certains médicaments ne sont pas remboursés ?',
      ar: 'الفيتامينات والمكملات الغذائية: لماذا لا يتم تعويض بعض الأدوية؟'
    },
    description: {
      fr: 'Votre dossier a été accepté mais le remboursement est faible ? C\'est peut-être à cause des médicaments "hors panier". Voici comment les identifier.',
      ar: 'هل تم قبول ملفك ولكن التعويض ضعيف؟ قد يكون ذلك بسبب الأدوية "خارج سلة العلاجات". إليك كيفية التعرف عليها.'
    },
    keywords: [
      'médicaments non remboursables',
      'vitamine remboursement',
      'complément alimentaire maroc',
      'panier de soins',
      'remboursement partiel'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-26',
    lastModified: '2025-11-26',
    readTime: 4,
    category: 'general',
    image: '/blog-images/vitamins.svg',
    imageAlt: {
      fr: 'Médicaments non remboursés',
      ar: 'أدوية غير معوضة'
    }
  },
  {
    id: 'lire-ordonnance-maroc',
    title: {
      fr: 'Checklist : 5 points à vérifier sur votre ordonnance avant de quitter le médecin',
      ar: 'قائمة التحقق: 5 نقاط يجب مراقبتها في وصفتك الطبية قبل مغادرة الطبيب'
    },
    description: {
      fr: 'Une simple erreur de date ou de cachet peut bloquer tout votre remboursement. Voici comment valider votre ordonnance médicale.',
      ar: 'خطأ بسيط في التاريخ أو الختم قد يوقف تعويضك بالكامل. إليك كيفية التحقق من صحة وصفتك الطبية.'
    },
    keywords: [
      'ordonnance médicale maroc',
      'validité ordonnance',
      'INPE médecin',
      'refus dossier maladie',
      'cachet médecin'
    ],
    author: 'BENTALBA ZAKARIA',
    publishDate: '2025-11-27',
    lastModified: '2025-11-27',
    readTime: 6,
    category: 'general',
    image: '/blog-images/prescription.svg',
    imageAlt: {
      fr: 'Ordonnance médicale',
      ar: 'وصفة طبية'
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
