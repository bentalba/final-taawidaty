/**
 * TAAWIDATY - Moroccan Medication Reimbursement Calculator
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 * @description Application entry point
 * 
 * NOTE: The name "TAAWIDATY" (تعويضاتي) is proprietary and protected.
 * The code is open source (MIT License), but the brand name cannot be used
 * in derivative works without explicit permission.
 */

import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import App from "./App.tsx";
import "./i18n/config"; // Initialize i18next before rendering (used by Header, FAQ, etc.)
import "./index.css";
// App-specific styles (only applied in native app via CSS selectors)
import "./styles/app-design-system.css";
import "./styles/app-native.css";

const isDev = import.meta.env.DEV;

// Initialize native features (Status Bar for Android)
const initNative = async () => {
  if (!Capacitor.isNativePlatform()) return;
  
  try {
    // Use Light style (dark icons on light background) - matches the app theme
    await StatusBar.setStyle({ style: Style.Light });
    // Make status bar transparent to blend with header gradient
    await StatusBar.setBackgroundColor({ color: '#1e40af' }); // Primary blue to match header
    // Add native class to body for CSS targeting
    document.body.classList.add('native-app');
  } catch (e) {
    console.warn('StatusBar not available:', e);
  }
};
initNative();

if (isDev) {
  console.log("=== TAAWIDATY App Starting ===");
  console.log("main.tsx loaded");
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("ERROR: Root element not found!");
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif;"><h1>Error: Root element not found</h1><p>The #root div is missing from index.html</p></div>';
} else {
  try {
    if (isDev) {
      console.log("Creating React root...");
    }
    const root = createRoot(rootElement);
    if (isDev) {
      console.log("Rendering App component");
    }
    root.render(
      <ErrorBoundary>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ErrorBoundary>
    );
    if (isDev) {
      console.log("✓ App rendered successfully");
    }
  } catch (error) {
    console.error("ERROR rendering app:", error);
    rootElement.innerHTML = `<div style="padding: 20px; font-family: sans-serif;"><h1>Error Loading App</h1><pre>${error}</pre></div>`;
  }
}
