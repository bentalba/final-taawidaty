# TAAWIDATY.ma Implementation Guide: Step-by-Step Coding Blueprint

## Phase 0: Project Setup & Foundation (Day 1-2)

### Step 1: Initialize Enhanced Project Structure
```bash
# Extend existing Vite + React + TypeScript setup
npm install framer-motion react-i18next i18next fuse.js @tanstack/react-virtual
npm install react-hook-form zod @hookform/resolvers
npm install recharts lucide-react
npm install -D @types/node
```

### Step 2: Configure Tailwind for Medical/Financial Design System
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary palette
        'trust-blue': '#0077be',
        'trust-blue-dark': '#005a8b',
        'trust-blue-light': '#e6f2f8',
        
        // Secondary colors
        'success-green': '#4caf50',
        'success-green-light': '#e8f5e9',
        'premium-gold': '#d4af37',
        'alert-orange': '#ff8c00',
        
        // Moroccan cultural touches
        'morocco-green': '#006233',
        'sahara-warm': '#e8d5b7',
        
        // Neutrals
        'neutral-50': '#fafafa',
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e5e5e5',
        'neutral-700': '#404040',
        'neutral-900': '#171717',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'arabic': ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      animation: {
        'breathe': 'breathe 2s ease-in-out infinite',
        'count-up': 'countUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' },
        },
        countUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-rtl")],
}
```

### Step 3: Setup i18n for French/Arabic
```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      hero: {
        title: "Calculez votre remboursement en 30 secondes",
        subtitle: "Découvrez exactement combien vous récupérerez de votre assurance",
      },
      insurance: {
        cnops: "CNOPS - Fonctionnaires",
        cnss: "CNSS - Secteur privé",
        select: "Sélectionnez votre assurance",
      },
      // ... more translations
    }
  },
  ar: {
    translation: {
      hero: {
        title: "احسب تعويضك في 30 ثانية",
        subtitle: "اكتشف بالضبط كم ستسترد من تأمينك",
      },
      insurance: {
        cnops: "CNOPS - الموظفون",
        cnss: "CNSS - القطاع الخاص",
        select: "اختر تأمينك",
      },
      // ... more translations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### Step 4: Create Base Layout with RTL Support
```tsx
// src/layouts/BaseLayout.tsx
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  return (
    <div className={`min-h-screen bg-neutral-50 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      {children}
    </div>
  );
}
```

## Phase 1: Core Components Library (Day 3-7)

### Step 5: Create Apple-Inspired Button Component
```tsx
// src/components/ui/apple-button.tsx
import { motion, useSpring, useTransform } from 'framer-motion';
import { ButtonHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  breathing?: boolean;
}

export function AppleButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  breathing = false,
  className,
  ...props 
}: AppleButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  const scale = useSpring(1, {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseDown = () => {
    setIsPressed(true);
    scale.set(0.95);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    scale.set(1);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-trust-blue text-white hover:bg-trust-blue-dark',
    secondary: 'bg-white text-trust-blue border-2 border-trust-blue',
  };

  return (
    <motion.button
      className={cn(
        'rounded-xl font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        breathing && 'animate-breathe',
        className
      )}
      style={{ scale }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Step 6: Build Medication Search with Fuzzy Matching
```tsx
// src/components/MedicationSearch.tsx
import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import { Search, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  form: string;
  ppv: number;
  reimbursementRate: number;
}

export function MedicationSearch({ 
  medications,
  onSelect 
}: { 
  medications: Medication[];
  onSelect: (med: Medication) => void;
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(
    () => new Fuse(medications, {
      keys: ['name', 'activeSubstance'],
      threshold: 0.3,
      distance: 100,
      includeScore: true,
    }),
    [medications]
  );

  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).slice(0, 10).map(r => r.item);
  }, [query, fuse]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Rechercher un médicament..."
          className={cn(
            "pl-12 pr-4 py-6 text-lg rounded-2xl",
            "border-2 transition-all duration-200",
            isFocused 
              ? "border-trust-blue shadow-lg shadow-trust-blue/10" 
              : "border-neutral-200"
          )}
        />
      </motion.div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50"
          >
            {results.map((medication, index) => (
              <motion.button
                key={medication.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(medication)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-trust-blue-light transition-colors text-left"
              >
                <Pill className="w-5 h-5 text-trust-blue" />
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{medication.name}</p>
                  <p className="text-sm text-neutral-500">{medication.dosage} - {medication.form}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-trust-blue">{medication.ppv} MAD</p>
                  <p className="text-xs text-success-green">{medication.reimbursementRate}%</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Step 7: Create Multi-Step Form with Progress Indicator
```tsx
// src/components/MultiStepForm/index.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  medication: z.string(),
  monthlyCost: z.number().min(1),
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 'medication', title: 'Médicament' },
  { id: 'cost', title: 'Coût' },
  { id: 'insurance', title: 'Assurance' },
  { id: 'contact', title: 'Contact' },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <FormProvider {...methods}>
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2",
                  index <= currentStep ? "text-trust-blue" : "text-neutral-400"
                )}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    "border-2 transition-colors duration-200",
                    index < currentStep 
                      ? "bg-trust-blue border-trust-blue text-white"
                      : index === currentStep
                      ? "border-trust-blue text-trust-blue"
                      : "border-neutral-300 text-neutral-400"
                  )}
                  animate={{
                    scale: index === currentStep ? 1.1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.div>
                <span className="text-sm font-medium hidden sm:inline">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-trust-blue to-trust-blue-dark"
              animate={{ width: `${progress}%` }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && <StepMedication />}
            {currentStep === 1 && <StepCost />}
            {currentStep === 2 && <StepInsurance />}
            {currentStep === 3 && <StepContact />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <AppleButton
              variant="secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Précédent
            </AppleButton>
          )}
          
          {currentStep < steps.length - 1 ? (
            <AppleButton
              className="ml-auto"
              onClick={() => setCurrentStep(currentStep + 1)}
              breathing
            >
              Suivant
            </AppleButton>
          ) : (
            <AppleButton
              className="ml-auto"
              onClick={methods.handleSubmit(onSubmit)}
              breathing
            >
              Calculer mon remboursement
            </AppleButton>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
```

### Step 8: Build Results Card with Count-Up Animation
```tsx
// src/components/ResultsCard.tsx
import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TrendingUp, Calculator, Calendar } from 'lucide-react';

interface ResultsData {
  publicPrice: number;
  insurancePays: number;
  youPay: number;
  percentageCovered: number;
  annualSavings: number;
}

export function ResultsCard({ data }: { data: ResultsData }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Count-up animation
  const count = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });
  
  const displayValue = useTransform(count, (value) => 
    Math.round(value).toLocaleString('fr-FR')
  );

  useEffect(() => {
    if (!hasAnimated) {
      count.set(data.insurancePays);
      setHasAnimated(true);
    }
  }, [data.insurancePays, hasAnimated]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <Card className="border-2 border-success-green bg-gradient-to-br from-success-green-light to-white overflow-hidden">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-success-green text-white rounded-full text-sm font-medium mb-4"
          >
            <TrendingUp className="w-4 h-4" />
            Économie réalisée
          </motion.div>
          
          <div className="space-y-2">
            <p className="text-neutral-600">Votre assurance vous rembourse</p>
            <motion.div
              className="text-5xl font-bold text-success-green"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                delay: 0.5,
                duration: 0.3,
              }}
            >
              {displayValue} MAD
            </motion.div>
            <p className="text-lg text-neutral-700">
              soit <span className="font-semibold text-success-green">{data.percentageCovered}%</span> du prix total
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Price Breakdown */}
          <motion.div
            className="space-y-3 p-4 bg-white/80 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Prix public</span>
              <span className="font-medium">{data.publicPrice} MAD</span>
            </div>
            
            <div className="flex justify-between items-center text-success-green">
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Remboursement
              </span>
              <span className="font-semibold">-{data.insurancePays} MAD</span>
            </div>
            
            <div className="h-px bg-neutral-200" />
            
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Vous payez</span>
              <motion.span
                className="font-bold text-2xl text-trust-blue"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                {data.youPay} MAD
              </motion.span>
            </div>
          </motion.div>

          {/* Annual Savings */}
          <motion.div
            className="p-4 bg-gradient-to-r from-success-green-light to-transparent rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-success-green" />
              <div>
                <p className="text-sm text-neutral-600">Économie annuelle</p>
                <p className="text-xl font-bold text-success-green">
                  {data.annualSavings.toLocaleString('fr-FR')} MAD
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

## Phase 2: Page Assembly & Flow (Day 8-12)

### Step 9: Create Hero Section with Insurance Selector
```tsx
// src/components/HeroSection.tsx
import { motion } from 'framer-motion';
import { Shield, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function HeroSection({ onInsuranceSelect }: { onInsuranceSelect: (type: string) => void }) {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* CNOPS Card */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onInsuranceSelect('cnops')}
            className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left border-2 border-transparent hover:border-trust-blue"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-trust-blue-light rounded-2xl group-hover:bg-trust-blue transition-colors">
                <Shield className="w-8 h-8 text-trust-blue group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">CNOPS</h3>
                <p className="text-neutral-600">Fonctionnaires et secteur public</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-neutral-500">
              <p>✓ Couverture jusqu'à 90%</p>
              <p>✓ Plus de 8000 médicaments</p>
              <p>✓ Remboursement rapide</p>
            </div>
          </motion.button>

          {/* CNSS Card */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onInsuranceSelect('cnss')}
            className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left border-2 border-transparent hover:border-success-green"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-success-green-light rounded-2xl group-hover:bg-success-green transition-colors">
                <Users className="w-8 h-8 text-success-green group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">CNSS</h3>
                <p className="text-neutral-600">Employés du secteur privé</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-neutral-500">
              <p>✓ Couverture standard 70%</p>
              <p>✓ Médicaments essentiels</p>
              <p>✓ Réseau national</p>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
```

### Step 10: Implement Language Switcher
```tsx
// src/components/LanguageSwitcher.tsx
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇲🇦' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    
    // Animate the transition
    document.documentElement.style.opacity = '0';
    setTimeout(() => {
      document.documentElement.style.opacity = '1';
    }, 300);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 hover:border-trust-blue transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {languages.find(l => l.code === i18n.language)?.label}
          </span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-3"
          >
            <span className="text-xl">{lang.flag}</span>
            <span className={i18n.language === lang.code ? 'font-semibold' : ''}>
              {lang.label}
            </span>
            {i18n.language === lang.code && (
              <Check className="w-4 h-4 ml-auto text-success-green" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Phase 3: Data Integration & State Management (Day 13-16)

### Step 11: Setup Web Worker for Data Loading
```typescript
// src/workers/medicationLoader.worker.ts
import type { Medication } from '@/types';

let medicationsData: {
  cnops: Medication[];
  cnss: Medication[];
} = {
  cnops: [],
  cnss: [],
};

self.onmessage = async (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'LOAD_DATA':
      try {
        // Load both datasets in parallel
        const [cnopsResponse, cnssResponse] = await Promise.all([
          fetch('/data/medications-cnops.json'),
          fetch('/data/medications-cnss.json'),
        ]);

        const [cnopsData, cnssData] = await Promise.all([
          cnopsResponse.json(),
          cnssResponse.json(),
        ]);

        medicationsData = {
          cnops: cnopsData,
          cnss: cnssData,
        };

        self.postMessage({
          type: 'DATA_LOADED',
          payload: {
            cnops: cnopsData.length,
            cnss: cnssData.length,
          },
        });
      } catch (error) {
        self.postMessage({
          type: 'LOAD_ERROR',
          payload: error,
        });
      }
      break;

    case 'SEARCH':
      const { query, insuranceType } = payload;
      const dataset = medicationsData[insuranceType];
      
      // Perform search in worker to keep main thread free
      const results = dataset.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 50);

      self.postMessage({
        type: 'SEARCH_RESULTS',
        payload: results,
      });
      break;

    case 'CALCULATE':
      const { medication, quantity } = payload;
      const reimbursement = medication.ppv * (medication.reimbursementRate / 100) * quantity;
      const youPay = (medication.ppv * quantity) - reimbursement;
      
      self.postMessage({
        type: 'CALCULATION_RESULT',
        payload: {
          publicPrice: medication.ppv * quantity,
          insurancePays: reimbursement,
          youPay,
          percentageCovered: medication.reimbursementRate,
          annualSavings: reimbursement * 12,
        },
      });
      break;
  }
};
```

### Step 12: Create Custom Hook for Web Worker
```typescript
// src/hooks/useMedicationWorker.ts
import { useEffect, useRef, useState } from 'react';

export function useMedicationWorker() {
  const workerRef = useRef<Worker>();
  const [isLoading, setIsLoading] = useState(true);
  const [dataStats, setDataStats] = useState({ cnops: 0, cnss: 0 });

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker(
      new URL('../workers/medicationLoader.worker.ts', import.meta.url),
      { type: 'module' }
    );

    // Setup message handler
    workerRef.current.onmessage = (e: MessageEvent) => {
      const { type, payload } = e.data;
      
      switch (type) {
        case 'DATA_LOADED':
          setDataStats(payload);
          setIsLoading(false);
          break;
        // Handle other message types...
      }
    };

    // Load data
    workerRef.current.postMessage({ type: 'LOAD_DATA' });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const search = (query: string, insuranceType: 'cnops' | 'cnss') => {
    return new Promise((resolve) => {
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'SEARCH_RESULTS') {
          resolve(e.data.payload);
          workerRef.current?.removeEventListener('message', handler);
        }
      };
      
      workerRef.current?.addEventListener('message', handler);
      workerRef.current?.postMessage({
        type: 'SEARCH',
        payload: { query, insuranceType },
      });
    });
  };

  const calculate = (medication: any, quantity: number) => {
    return new Promise((resolve) => {
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'CALCULATION_RESULT') {
          resolve(e.data.payload);
          workerRef.current?.removeEventListener('message', handler);
        }
      };
      
      workerRef.current?.addEventListener('message', handler);
      workerRef.current?.postMessage({
        type: 'CALCULATE',
        payload: { medication, quantity },
      });
    });
  };

  return {
    isLoading,
    dataStats,
    search,
    calculate,
  };
}
```

### Step 13: Implement Global State with Context
```tsx
// src/context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  insuranceType: 'cnops' | 'cnss' | null;
  selectedMedication: any | null;
  calculationResult: any | null;
  formData: any;
}

interface AppContextType extends AppState {
  setInsuranceType: (type: 'cnops' | 'cnss') => void;
  setSelectedMedication: (med: any) => void;
  setCalculationResult: (result: any) => void;
  updateFormData: (data: Partial<AppState['formData']>) => void;
  reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    insuranceType: null,
    selectedMedication: null,
    calculationResult: null,
    formData: {},
  });

  const contextValue: AppContextType = {
    ...state,
    setInsuranceType: (type) => setState(s => ({ ...s, insuranceType: type })),
    setSelectedMedication: (med) => setState(s => ({ ...s, selectedMedication: med })),
    setCalculationResult: (result) => setState(s => ({ ...s, calculationResult: result })),
    updateFormData: (data) => setState(s => ({ ...s, formData: { ...s.formData, ...data } })),
    reset: () => setState({
      insuranceType: null,
      selectedMedication: null,
      calculationResult: null,
      formData: {},
    }),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

## Phase 4: Performance & Polish (Day 17-20)

### Step 14: Add Skeleton Loaders
```tsx
// src/components/SkeletonCard.tsx
import { Card } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card className="p-6 space-y-4">
      <div className="animate-shimmer bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 bg-[length:1000px_100%]">
        <div className="h-4 w-1/3 bg-neutral-200 rounded mb-4" />
        <div className="h-8 w-2/3 bg-neutral-200 rounded mb-2" />
        <div className="h-4 w-1/2 bg-neutral-200 rounded" />
      </div>
      
      <div className="space-y-2">
        <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-neutral-100 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-neutral-100 rounded animate-pulse" />
      </div>
    </Card>
  );
}
```

### Step 15: Implement Error Boundaries
```tsx
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Card className="p-8 max-w-lg mx-auto mt-20">
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-alert-orange" />
            <h2 className="text-xl font-semibold">Une erreur est survenue</h2>
          </div>
          <p className="text-neutral-600 mb-6">
            Nous nous excusons pour le désagrément. Veuillez rafraîchir la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-trust-blue-dark transition-colors"
          >
            Rafraîchir la page
          </button>
        </Card>
      );
    }

    return this.props.children;
  }
}
```

### Step 16: Add Analytics Tracking
```typescript
// src/utils/analytics.ts
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const analytics = {
  track: (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  },

  trackCalculation: (insuranceType: string, medication: string, savings: number) => {
    analytics.track({
      category: 'Calculator',
      action: 'calculation_completed',
      label: `${insuranceType}_${medication}`,
      value: Math.round(savings),
    });
  },

  trackFormStep: (step: number, stepName: string) => {
    analytics.track({
      category: 'Form',
      action: 'step_completed',
      label: stepName,
      value: step,
    });
  },

  trackError: (error: string, location: string) => {
    analytics.track({
      category: 'Error',
      action: 'error_occurred',
      label: `${location}: ${error}`,
    });
  },

  trackLanguageChange: (from: string, to: string) => {
    analytics.track({
      category: 'Settings',
      action: 'language_changed',
      label: `${from}_to_${to}`,
    });
  },
};
```

### Step 17: Setup PWA Configuration
```json
// public/manifest.json
{
  "name": "TAAWIDATY - Calculateur de Remboursement",
  "short_name": "TAAWIDATY",
  "description": "Calculez vos remboursements de médicaments au Maroc",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0077be",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```typescript
// src/serviceWorker.ts
const CACHE_NAME = 'taawidaty-v1';
const urlsToCache = [
  '/',
  '/data/medications-cnops.json',
  '/data/medications-cnss.json',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

## Phase 5: Testing & Launch (Day 21-25)

### Step 18: Setup Testing Infrastructure
```typescript
// src/__tests__/Calculator.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';

describe('Calculator Component', () => {
  test('calculates reimbursement correctly', async () => {
    render(<Calculator />);
    
    // Select medication
    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'Doliprane' } });
    
    await waitFor(() => {
      const option = screen.getByText('DOLIPRANE 1000mg');
      fireEvent.click(option);
    });
    
    // Enter quantity
    const quantityInput = screen.getByLabelText(/quantité/i);
    fireEvent.change(quantityInput, { target: { value: '2' } });
    
    // Submit
    const calculateButton = screen.getByText(/calculer/i);
    fireEvent.click(calculateButton);
    
    // Check results
    await waitFor(() => {
      expect(screen.getByText(/105 MAD/)).toBeInTheDocument();
      expect(screen.getByText(/45 MAD/)).toBeInTheDocument();
    });
  });
});
```

### Step 19: Performance Monitoring
```typescript
// src/utils/performance.ts
export const performanceMonitor = {
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      analytics.track({
        category: 'Performance',
        action: 'page_load',
        value: pageLoadTime,
      });

      console.log('Page Load Metrics:', {
        pageLoadTime,
        connectTime,
        renderTime,
      });
    }
  },

  measureComponentRender: (componentName: string, startTime: number) => {
    const renderTime = performance.now() - startTime;
    
    if (renderTime > 100) {
      console.warn(`Slow render detected: ${componentName} took ${renderTime}ms`);
    }
    
    analytics.track({
      category: 'Performance',
      action: 'component_render',
      label: componentName,
      value: Math.round(renderTime),
    });
  },
};
```

### Step 20: Final App Assembly
```tsx
// src/App.tsx
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProvider } from '@/context/AppContext';
import { BaseLayout } from '@/layouts/BaseLayout';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { HeroSection } from '@/components/HeroSection';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import './i18n/config';

// Lazy load heavy components
const MultiStepForm = lazy(() => import('@/components/MultiStepForm'));
const ResultsCard = lazy(() => import('@/components/ResultsCard'));

function App() {
  const { insuranceType, calculationResult, setInsuranceType } = useApp();

  return (
    <ErrorBoundary>
      <AppProvider>
        <BaseLayout>
          {/* Header */}
          <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-100 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-trust-blue" />
                <span className="text-xl font-bold text-neutral-900">TAAWIDATY</span>
              </div>
              <LanguageSwitcher />
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-20">
            {!insuranceType ? (
              <HeroSection onInsuranceSelect={setInsuranceType} />
            ) : !calculationResult ? (
              <Suspense fallback={<LoadingSpinner />}>
                <MultiStepForm />
              </Suspense>
            ) : (
              <Suspense fallback={<LoadingSpinner />}>
                <div className="max-w-4xl mx-auto px-4 py-12">
                  <ResultsCard data={calculationResult} />
                  <div className="mt-8 flex gap-4 justify-center">
                    <AppleButton
                      variant="secondary"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimer
                    </AppleButton>
                    <AppleButton
                      onClick={() => location.reload()}
                      breathing
                    >
                      Nouveau calcul
                    </AppleButton>
                  </div>
                </div>
              </Suspense>
            )}
          </main>

          {/* Footer */}
          <footer className="mt-auto py-8 px-4 bg-neutral-100">
            <div className="max-w-6xl mx-auto text-center text-sm text-neutral-600">
              <p>© 2025 TAAWIDATY. Données basées sur les tarifs officiels AMO.</p>
              <p className="mt-2">
                <a href="/privacy" className="hover:text-trust-blue">Confidentialité</a>
                {' • '}
                <a href="/terms" className="hover:text-trust-blue">Conditions</a>
                {' • '}
                <a href="/contact" className="hover:text-trust-blue">Contact</a>
              </p>
            </div>
          </footer>
        </BaseLayout>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
```

## Deployment Checklist

### Pre-Launch Testing
- [ ] Test all form flows on mobile devices
- [ ] Verify RTL layout for Arabic
- [ ] Test with slow 3G connection
- [ ] Validate all calculations manually
- [ ] Check accessibility with screen reader
- [ ] Test browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Verify PWA installation on mobile

### Performance Optimization
- [ ] Run Lighthouse audit (target: 95+ performance)
- [ ] Compress all images (WebP format)
- [ ] Enable gzip compression
- [ ] Setup CDN for static assets
- [ ] Implement lazy loading for below-fold content
- [ ] Minify CSS and JavaScript

### Analytics Setup
- [ ] Install Google Analytics 4
- [ ] Setup conversion tracking
- [ ] Configure custom events
- [ ] Setup heatmap tracking (Hotjar/Clarity)
- [ ] Configure error tracking (Sentry)

### SEO Configuration
- [ ] Add meta tags for both languages
- [ ] Create sitemap.xml
- [ ] Setup robots.txt
- [ ] Add structured data (JSON-LD)
- [ ] Configure Open Graph tags
- [ ] Submit to Google Search Console

### Production Deployment
```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to hosting (example with Vercel)
vercel --prod

# Or deploy to traditional hosting
rsync -avz dist/ user@server:/var/www/taawidaty.ma/
```

### Post-Launch Monitoring
- [ ] Monitor Core Web Vitals
- [ ] Track conversion funnel
- [ ] Monitor error rates
- [ ] Gather user feedback
- [ ] A/B test variations
- [ ] Iterate based on data

## Success Metrics to Track

1. **Engagement Metrics**
   - Average session duration: Target 2-3 minutes
   - Bounce rate: Target < 30%
   - Pages per session: Target 3-4

2. **Conversion Metrics**
   - Form completion rate: Target 75%+
   - Time to complete: Target 60-90 seconds
   - Mobile conversion rate: Target 70%+

3. **Technical Metrics**
   - First Contentful Paint: < 1.5s
   - Time to Interactive: < 3.5s
   - Cumulative Layout Shift: < 0.1

4. **User Satisfaction**
   - Net Promoter Score: Target 50+
   - Customer Satisfaction: Target 4.5/5
   - Return visitor rate: Target 40%+

This implementation guide provides a complete, actionable roadmap to build TAAWIDATY.ma from foundation to launch, with specific code examples and technical specifications at every step.
