/**
 * Darija (Moroccan Arabic) Localization
 * Creates emotional connection with Moroccan users
 * 
 * "Marhba" instead of "Welcome" creates instant bond
 * 
 * @author BENTALBA ZAKARIA
 */

// Time-based greetings in Darija
export const getDarijaGreeting = (): { darija: string; french: string; arabic: string } => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      darija: 'صباح الخير',
      french: 'Bonjour',
      arabic: 'صباح الخير'
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      darija: 'مسا الخير',
      french: 'Bon après-midi',
      arabic: 'مساء الخير'
    };
  } else if (hour >= 18 && hour < 22) {
    return {
      darija: 'مسا الخير',
      french: 'Bonsoir',
      arabic: 'مساء الخير'
    };
  } else {
    return {
      darija: 'الله يمسيك بالخير',
      french: 'Bonne nuit',
      arabic: 'تصبح على خير'
    };
  }
};

// Casual Darija phrases for UI elements
export const darijaUI = {
  // Welcomes
  welcome: {
    darija: 'مرحبا بيك',
    french: 'Bienvenue',
    standard: 'أهلاً وسهلاً'
  },
  
  // Success messages
  success: {
    darija: 'مزيان! 👍',
    french: 'Parfait !',
    standard: 'ممتاز!'
  },
  
  // Calculation done
  calculated: {
    darija: 'ها هو التعويض ديالك 💰',
    french: 'Voici votre remboursement',
    standard: 'هذا هو تعويضك'
  },
  
  // Call to action
  startNow: {
    darija: 'يلاه نبداو',
    french: 'Commençons',
    standard: 'لنبدأ'
  },
  
  // Search
  searchHint: {
    darija: 'كتب سمية الدوا...',
    french: 'Tapez le nom du médicament...',
    standard: 'اكتب اسم الدواء...'
  },
  
  // Savings celebration
  youSaved: {
    darija: 'ربحتي',
    french: 'Vous économisez',
    standard: 'وفرت'
  },
  
  // Loading
  loading: {
    darija: 'صبر شوية...',
    french: 'Chargement...',
    standard: 'جاري التحميل...'
  },
  
  // Empty state
  noResults: {
    darija: 'ما لقينا والو 😕',
    french: 'Aucun résultat',
    standard: 'لا توجد نتائج'
  },
  
  // Try again
  tryAgain: {
    darija: 'جرب مرة خرا',
    french: 'Réessayer',
    standard: 'حاول مرة أخرى'
  },
  
  // Offline
  offline: {
    darija: 'ما كاينش الانترنت',
    french: 'Hors ligne',
    standard: 'غير متصل'
  },
  
  // Share
  share: {
    darija: 'شارك مع صحابك',
    french: 'Partager',
    standard: 'مشاركة'
  }
};

// Motivational messages after calculation (rotates)
export const getMotivationalMessage = (savedAmount: number, language: 'ar' | 'fr'): string => {
  if (savedAmount > 100) {
    return language === 'ar' 
      ? 'والله وفرتي بزاف! 🎉'
      : 'Wow, belle économie ! 🎉';
  } else if (savedAmount > 50) {
    return language === 'ar'
      ? 'مزيان، التأمين كيساعد 💪'
      : 'Super, la mutuelle aide bien ! 💪';
  } else if (savedAmount > 20) {
    return language === 'ar'
      ? 'كل درهم مهم 👍'
      : 'Chaque dirham compte ! 👍';
  } else {
    return language === 'ar'
      ? 'على الأقل عرفتي الثمن ✓'
      : 'Au moins vous savez le prix ! ✓';
  }
};

// Format number in Moroccan style
export const formatMoroccanPrice = (amount: number): string => {
  return new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount) + ' DH';
};

export default {
  getDarijaGreeting,
  darijaUI,
  getMotivationalMessage,
  formatMoroccanPrice
};
