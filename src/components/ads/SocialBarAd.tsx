/**
 * Social Bar Ad Component
 * High CTR push-notification style ad (WEB ONLY - disabled in native app)
 * Place before </body> tag
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useEffect } from 'react';
import { isNativeApp } from '@/utils/platform';

export function SocialBarAd() {
  useEffect(() => {
    // Don't load social bar ads in native app - too intrusive
    if (isNativeApp()) {
      return;
    }

    // Load the social bar ad script (place before </body>)
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl28133142.effectivegatecpm.com/8b/e7/9d/8be79d31b0cd24e80ac1ab8adf8f6905.js';
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
