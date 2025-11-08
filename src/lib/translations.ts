export const translations = {
  ar: {
    app: {
      title: 'تعويضاتي',
      subtitle: 'احسب تعويض الأدوية في ثوانٍ'
    },
    hero: {
      title: 'تمن؟ التعويض؟ قلب و عرف دابا.',
      subtitle: 'احسب التعويض من التأمين أو تحقق من أسعار الأدوية في المغرب',
      cta: 'احسب الآن',
      trustOfficial: 'بيانات رسمية محدثة',
      trustInstant: 'نتائج فورية',
      trustFree: 'مجاني 100%'
    },
    howItWorks: {
      title: 'كيف يعمل؟',
      step1: {
        title: 'ابحث عن الدواء',
        description: 'اكتب اسم الدواء الذي تبحث عنه'
      },
      step2: {
        title: 'احصل على النتيجة',
        description: 'شاهد المبلغ المغطى من تأمينك وما ستدفعه'
      }
    },
    calculator: {
      selectInsurance: 'اختر نوع التأمين الصحي',
      cnops: 'CNOPS',
      cnopsDesc: 'الصندوق الوطني للضمان الاجتماعي - الموظفون العموميون',
      cnss: 'CNSS (AMO)',
      cnssDesc: 'الصندوق الوطني للضمان الاجتماعي - القطاع الخاص',
      searchMed: 'ابحث عن دواء',
      searchPlaceholder: 'مثال: باراسيتامول، دولوبران...',
      selected: 'الدواء المختار',
      calculate: 'احسب التعويض',
      back: 'رجوع',
      newCalc: 'حساب جديد',
      changeMed: 'غير الدواء'
    },
    results: {
      title: 'نتيجة الحساب',
      medication: 'الدواء',
      insurance: 'التأمين',
      originalPrice: 'السعر الأصلي',
      reimbursement: 'المبلغ المسترد',
      youPay: 'أنت تدفع',
      covered: 'مغطى',
      savings: 'توفر {amount} مع التأمين!'
    },
    disclaimer: {
      title: 'تنبيه مهم',
      text: 'هذه الأداة للإرشاد فقط. المبالغ الفعلية قد تختلف. يرجى استشارة صيدليتك أو صندوق التأمين للحصول على معلومات دقيقة.'
    },
    faq: {
      cnops: {
        title: 'الأسئلة الشائعة CNOPS',
        subtitle: 'اعثر على جميع الإجابات حول تعويض CNOPS',
        questions: []
      },
      cnss: {
        title: 'الأسئلة الشائعة CNSS',
        subtitle: 'اعثر على جميع الإجابات حول تعويض CNSS',
        questions: []
      },
      cta: {
        title: 'جاهز لحساب تعويضك؟',
        subtitle: 'استخدم الحاسبة لمعرفة المبلغ الدقيق لتعويضك',
        button: 'انتقل إلى الحاسبة'
      }
    },
    noResults: 'لم يتم العثور على نتائج',
    loading: 'جاري التحميل...'
  },
  fr: {
    app: {
      title: 'TAAWIDATY',
      subtitle: 'Calculez le remboursement de vos médicaments en secondes'
    },
    hero: {
      title: 'Prix ? Remboursement ? La réponse instantanée.',
      subtitle: 'Calculez votre remboursement mutuelle ou vérifiez les prix des médicaments au Maroc',
      cta: 'Calculer maintenant',
      trustOfficial: 'Données officielles à jour',
      trustInstant: 'Résultats instantanés',
      trustFree: '100% gratuit'
    },
    howItWorks: {
      title: 'Comment ça marche ?',
      step1: {
        title: 'Recherchez le médicament',
        description: 'Tapez le nom du médicament que vous cherchez'
      },
      step2: {
        title: 'Obtenez le résultat',
        description: 'Voyez le montant couvert par votre mutuelle et ce que vous paierez'
      }
    },
    calculator: {
      selectInsurance: 'Choisissez votre type de mutuelle',
      cnops: 'CNOPS',
      cnopsDesc: 'Caisse Nationale des Organismes de Prévoyance Sociale - Fonctionnaires',
      cnss: 'CNSS (AMO)',
      cnssDesc: 'Caisse Nationale de Sécurité Sociale - Secteur privé',
      searchMed: 'Rechercher un médicament',
      searchPlaceholder: 'Ex: Paracétamol, Doliprane...',
      selected: 'Médicament sélectionné',
      calculate: 'Calculer le remboursement',
      back: 'Retour',
      newCalc: 'Nouveau calcul',
      changeMed: 'Changer de médicament'
    },
    results: {
      title: 'Résultat du calcul',
      medication: 'Médicament',
      insurance: 'Mutuelle',
      originalPrice: 'Prix original',
      reimbursement: 'Montant remboursé par votre mutuelle',
      youPay: 'Vous payez',
      covered: 'Couvert',
      savings: 'Vous économisez {amount} avec votre mutuelle !'
    },
    disclaimer: {
      title: 'Avertissement important',
      text: 'Cet outil est fourni à titre indicatif uniquement. Les montants réels peuvent varier. Veuillez consulter votre pharmacie ou votre mutuelle pour des informations précises.'
    },
    faq: {
      cnops: {
        title: 'FAQ CNOPS - Questions Fréquentes',
        subtitle: 'Trouvez toutes les réponses sur le remboursement CNOPS',
        questions: []
      },
      cnss: {
        title: 'FAQ CNSS - Questions Fréquentes',
        subtitle: 'Trouvez toutes les réponses sur le remboursement CNSS',
        questions: []
      },
      cta: {
        title: 'Prêt à calculer votre remboursement ?',
        subtitle: 'Utilisez notre calculateur pour connaître le montant exact de votre remboursement',
        button: 'Accéder au calculateur'
      }
    },
    noResults: 'Aucun résultat trouvé',
    loading: 'Chargement...'
  }
};

export type TranslationKey = keyof typeof translations.ar;
