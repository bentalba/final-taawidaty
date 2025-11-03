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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { SEO } from "@/components/SEO";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import GuideRemboursementCnss from "./pages/blog/guide-remboursement-cnss";
import GuideRemboursementCnops from "./pages/blog/guide-remboursement-cnops";
import DifferenceCnssCnops from "./pages/blog/difference-cnss-cnops";
import FaqCnops from "./pages/FaqCnops";
import FaqCnss from "./pages/FaqCnss";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider defaultTheme="system" attribute="class">
        <TooltipProvider>
          <SEO />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/guide-remboursement-cnss" element={<GuideRemboursementCnss />} />
              <Route path="/blog/guide-remboursement-cnops" element={<GuideRemboursementCnops />} />
              <Route path="/blog/difference-cnss-cnops" element={<DifferenceCnssCnops />} />
              <Route path="/faq-cnops" element={<FaqCnops />} />
              <Route path="/faq-cnss" element={<FaqCnss />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
