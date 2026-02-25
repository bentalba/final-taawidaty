/**
 * TAAWIDATY - Moroccan Medication Reimbursement Calculator
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 * @description Main application component with routing and global providers
 * 
 * NOTE: The name "TAAWIDATY" (تعويضاتي) is proprietary and protected.
 * The code is open source (MIT License), but the brand name cannot be used
 * in derivative works without explicit permission.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/transitions/PageTransition";
import { ConsentBanner } from "@/components/ConsentBanner";
import { SocialBarAd } from "@/components/ads/SocialBarAd";
import { BottomNavigation } from "@/components/app/BottomNavigation";
import React, { useEffect, Suspense } from "react";
import { initializeConsent } from "@/utils/consentManager";
import { App as CapacitorApp } from '@capacitor/app';
import { useLanguage } from "@/hooks/useLanguage";

// Lazy load route components for better performance
const Index = React.lazy(() => import('./pages/Index'));
const Blog = React.lazy(() => import('./pages/Blog'));
const GuideRemboursementCnss = React.lazy(() => import('./pages/blog/guide-remboursement-cnss'));
const GuideRemboursementCnops = React.lazy(() => import('./pages/blog/guide-remboursement-cnops'));
const DifferenceCnssCnops = React.lazy(() => import('./pages/blog/difference-cnss-cnops'));
const ComprendrePpvPpm = React.lazy(() => import('./pages/blog/comprendre-ppv-ppm-maroc'));
const MedicamentGenerique = React.lazy(() => import('./pages/blog/medicament-generique-efficacite'));
const ComprendreTicketModerateur = React.lazy(() => import('./pages/blog/comprendre-ticket-moderateur'));
const MedicamentsNonRemboursables = React.lazy(() => import('./pages/blog/medicaments-non-remboursables'));
const LireOrdonnance = React.lazy(() => import('./pages/blog/lire-ordonnance-maroc'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const MedicalDisclaimer = React.lazy(() => import('./pages/MedicalDisclaimer'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const EditorialPolicy = React.lazy(() => import('./pages/EditorialPolicy'));
const CookiePreferences = React.lazy(() => import('./pages/CookiePreferences'));
const AuthorBio = React.lazy(() => import('./pages/AuthorBio'));
const PriceChecker = React.lazy(() => import('./pages/PriceChecker'));
const FaqCnops = React.lazy(() => import('./pages/FaqCnops'));
const FaqCnss = React.lazy(() => import('./pages/FaqCnss'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FavoritesPage = React.lazy(() => import('./pages/app/FavoritesPage'));
const SettingsPage = React.lazy(() => import('./pages/app/SettingsPage'));
const HistoryPage = React.lazy(() => import('./pages/app/HistoryPage'));
const SearchPage = React.lazy(() => import('./pages/app/SearchPage'));
const CalculatorPage = React.lazy(() => import('./pages/app/CalculatorPage'));

const queryClient = new QueryClient();

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  const { language } = useLanguage();

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
            <Route path="/calculator" element={<PageTransition><CalculatorPage /></PageTransition>} />
            <Route path="/favorites" element={<PageTransition><FavoritesPage /></PageTransition>} />
            <Route path="/history" element={<PageTransition><HistoryPage /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><SettingsPage /></PageTransition>} />
            <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
            <Route path="/prix-medicaments" element={<PageTransition><PriceChecker /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/guide-remboursement-cnss" element={<PageTransition><GuideRemboursementCnss /></PageTransition>} />
            <Route path="/blog/guide-remboursement-cnops" element={<PageTransition><GuideRemboursementCnops /></PageTransition>} />
            <Route path="/blog/difference-cnss-cnops" element={<PageTransition><DifferenceCnssCnops /></PageTransition>} />
            <Route path="/blog/comprendre-ppv-ppm-maroc" element={<PageTransition><ComprendrePpvPpm /></PageTransition>} />
            <Route path="/blog/medicament-generique-efficacite" element={<PageTransition><MedicamentGenerique /></PageTransition>} />
            <Route path="/blog/comprendre-ticket-moderateur" element={<PageTransition><ComprendreTicketModerateur /></PageTransition>} />
            <Route path="/blog/medicaments-non-remboursables" element={<PageTransition><MedicamentsNonRemboursables /></PageTransition>} />
            <Route path="/blog/lire-ordonnance-maroc" element={<PageTransition><LireOrdonnance /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/medical-disclaimer" element={<PageTransition><MedicalDisclaimer /></PageTransition>} />
            <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
            <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
            <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
            <Route path="/editorial-policy" element={<PageTransition><EditorialPolicy /></PageTransition>} />
            <Route path="/author" element={<PageTransition><AuthorBio /></PageTransition>} />
            <Route path="/cookies" element={<PageTransition><CookiePreferences /></PageTransition>} />
            <Route path="/price-checker" element={<PageTransition><PriceChecker /></PageTransition>} />
            <Route path="/faq-cnops" element={<PageTransition><FaqCnops /></PageTransition>} />
            <Route path="/faq-cnss" element={<PageTransition><FaqCnss /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <BottomNavigation language={language} />
    </>
  );
}

import { StickyBottomAd } from "@/components/ads/StickyBottomAd";

const App = () => {
  // Initialize consent management on app mount
  useEffect(() => {
    initializeConsent();
  }, []);

  // Handle Android hardware back button - synced with React Router
  useEffect(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      // Get current path from window.location since we're outside Router context
      const currentPath = window.location.pathname;

      // If on home screen, confirm exit
      if (currentPath === '/' || currentPath === '/home') {
        CapacitorApp.exitApp();
      } else {
        // Let React Router handle the back logic visually
        window.history.back();
      }
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider defaultTheme="system" attribute="class">
          <TooltipProvider>
            <SEO />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
              <ConsentBanner />
              <SocialBarAd />
              <StickyBottomAd />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
