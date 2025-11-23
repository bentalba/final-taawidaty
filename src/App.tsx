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
import { useEffect } from "react";
import { initializeConsent } from "@/utils/consentManager";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import GuideRemboursementCnss from "./pages/blog/guide-remboursement-cnss";
import GuideRemboursementCnops from "./pages/blog/guide-remboursement-cnops";
import DifferenceCnssCnops from "./pages/blog/difference-cnss-cnops";
import ComprendrePpvPpm from "./pages/blog/comprendre-ppv-ppm-maroc";
import MedicamentGenerique from "./pages/blog/medicament-generique-efficacite";
import ComprendreTicketModerateur from "./pages/blog/comprendre-ticket-moderateur";
import MedicamentsNonRemboursables from "./pages/blog/medicaments-non-remboursables";
import LireOrdonnance from "./pages/blog/lire-ordonnance-maroc";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MedicalDisclaimer from "./pages/MedicalDisclaimer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";
import EditorialPolicy from "./pages/EditorialPolicy";
import CookiePreferences from "./pages/CookiePreferences";
import AuthorBio from "./pages/AuthorBio";
import PriceChecker from "./pages/PriceChecker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
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
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  // Initialize consent management on app mount
  useEffect(() => {
    initializeConsent();
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
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
