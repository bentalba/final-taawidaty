/**
 * Popunder Ad Component
 * Loads popunder ad script on every page (WEB ONLY - disabled in native app)
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useEffect } from 'react';
import { isNativeApp } from '@/utils/platform';

export function PopunderAd() {
  useEffect(() => {
    // Don't load popunder ads in native app - too intrusive
    if (isNativeApp()) {
      return;
    }

    // Load the popunder ad script (place before </head>)
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl28133121.effectivegatecpm.com/ee/82/e8/ee82e87dec36e2b4263bbe2d476c53eb.js';
    
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
