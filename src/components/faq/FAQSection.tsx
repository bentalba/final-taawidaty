import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'cnops' | 'cnss' | 'general';
}

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQAccordionItem({ item, isOpen, onToggle, index }: FAQAccordionItemProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-xl border-2 border-neutral-100 overflow-hidden hover:border-trust-blue/30 transition-colors"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-neutral-900 flex-1 pr-4 rtl:pr-0 rtl:pl-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-trust-blue" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-2 text-neutral-700 leading-relaxed border-t border-neutral-100">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQSectionProps {
  className?: string;
}

export function FAQSection({ className }: FAQSectionProps) {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cnops' | 'cnss' | 'general'>('all');

  const faqData: FAQItem[] = [
    // CNOPS Questions
    {
      question: t('faq.cnops.q1', 'Quel est le taux de remboursement CNOPS ?'),
      answer: t(
        'faq.cnops.a1',
        'Le taux de remboursement CNOPS est de 90% pour les médicaments remboursables. Les 10% restants sont à la charge de l\'assuré.'
      ),
      category: 'cnops',
    },
    {
      question: t('faq.cnops.q2', 'Comment obtenir ma carte CNOPS ?'),
      answer: t(
        'faq.cnops.a2',
        'Vous pouvez obtenir votre carte CNOPS en vous rendant à l\'agence CNOPS la plus proche avec votre pièce d\'identité et une attestation de travail. La carte est délivrée gratuitement.'
      ),
      category: 'cnops',
    },
    {
      question: t('faq.cnops.q3', 'Quels médicaments sont remboursés par CNOPS ?'),
      answer: t(
        'faq.cnops.a3',
        'CNOPS rembourse les médicaments figurant sur la liste officielle de l\'AMO. Cette liste comprend la plupart des médicaments essentiels et génériques. Consultez notre base de données pour vérifier un médicament spécifique.'
      ),
      category: 'cnops',
    },

    // CNSS Questions
    {
      question: t('faq.cnss.q1', 'Quel est le taux de remboursement CNSS ?'),
      answer: t(
        'faq.cnss.a1',
        'Le taux de remboursement CNSS est de 70% pour les médicaments remboursables. Les 30% restants sont à la charge de l\'assuré.'
      ),
      category: 'cnss',
    },
    {
      question: t('faq.cnss.q2', 'Comment m\'affilier à la CNSS ?'),
      answer: t(
        'faq.cnss.a2',
        'L\'affiliation à la CNSS est automatique dès votre embauche dans le secteur privé. Votre employeur effectue les démarches nécessaires et verse les cotisations mensuelles.'
      ),
      category: 'cnss',
    },
    {
      question: t('faq.cnss.q3', 'Délai de remboursement CNSS ?'),
      answer: t(
        'faq.cnss.a3',
        'Le délai de remboursement CNSS est généralement de 15 à 30 jours après le dépôt de votre dossier complet. Assurez-vous de fournir tous les documents requis pour éviter les retards.'
      ),
      category: 'cnss',
    },

    // General Questions
    {
      question: t('faq.general.q1', 'Comment fonctionne le calculateur ?'),
      answer: t(
        'faq.general.a1',
        'Notre calculateur utilise les données officielles de l\'AMO pour calculer le montant exact de votre remboursement. Il suffit de sélectionner votre médicament, votre type d\'assurance, et d\'entrer les informations demandées.'
      ),
      category: 'general',
    },
    {
      question: t('faq.general.q2', 'Les résultats sont-ils fiables ?'),
      answer: t(
        'faq.general.a2',
        'Oui, nos calculs sont basés sur les tarifs officiels publiés par l\'AMO et mis à jour régulièrement. Cependant, pour une confirmation définitive, consultez votre organisme d\'assurance.'
      ),
      category: 'general',
    },
    {
      question: t('faq.general.q3', 'Le service est-il gratuit ?'),
      answer: t(
        'faq.general.a3',
        'Oui, TAAWIDATY est 100% gratuit. Notre mission est d\'aider tous les Marocains à comprendre leurs droits en matière de remboursement médical.'
      ),
      category: 'general',
    },
    {
      question: t('faq.general.q4', 'Mes données sont-elles sécurisées ?'),
      answer: t(
        'faq.general.a4',
        'Absolument. Nous ne stockons aucune donnée personnelle. Tous les calculs sont effectués localement dans votre navigateur. Votre vie privée est notre priorité.'
      ),
      category: 'general',
    },
  ];

  const categories = [
    { id: 'all' as const, label: t('faq.categories.all', 'Tout'), count: faqData.length },
    {
      id: 'cnops' as const,
      label: t('faq.categories.cnops', 'CNOPS'),
      count: faqData.filter((f) => f.category === 'cnops').length,
    },
    {
      id: 'cnss' as const,
      label: t('faq.categories.cnss', 'CNSS'),
      count: faqData.filter((f) => f.category === 'cnss').length,
    },
    {
      id: 'general' as const,
      label: t('faq.categories.general', 'Général'),
      count: faqData.filter((f) => f.category === 'general').length,
    },
  ];

  const filteredFAQs = faqData
    .filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("py-16 bg-neutral-50", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-trust-blue/10 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8 text-trust-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('faq.title', 'Questions Fréquentes')}
          </h2>
          <p className="text-lg text-neutral-600">
            {t('faq.subtitle', 'Trouvez rapidement les réponses à vos questions')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('faq.searchPlaceholder', 'Rechercher une question...')}
              className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-4 bg-white border-2 border-neutral-200 rounded-xl focus:border-trust-blue focus:outline-none focus:ring-2 focus:ring-trust-blue/20 transition-colors text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-5 py-2.5 rounded-full font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-offset-2",
                selectedCategory === category.id
                  ? "bg-trust-blue text-white shadow-medium"
                  : "bg-white text-neutral-700 border-2 border-neutral-200 hover:border-trust-blue/50"
              )}
            >
              {category.label}
              <span className="ml-2 rtl:ml-0 rtl:mr-2 text-sm opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-xl border-2 border-neutral-100"
            >
              <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">
                {t('faq.noResults', 'Aucune question ne correspond à votre recherche')}
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center bg-trust-blue/5 rounded-2xl p-8 border-2 border-trust-blue/10"
        >
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            {t('faq.stillHaveQuestions', 'Vous avez encore des questions ?')}
          </h3>
          <p className="text-neutral-600 mb-4">
            {t('faq.contactText', 'Notre équipe est là pour vous aider')}
          </p>
          <a
            href="mailto:contact@taawidaty.ma"
            className="inline-flex items-center justify-center px-6 py-3 bg-trust-blue text-white font-semibold rounded-xl hover:bg-trust-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-offset-2"
          >
            {t('faq.contactButton', 'Nous contacter')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
