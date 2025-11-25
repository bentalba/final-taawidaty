/**
 * Popunder Ad Component
 * Loads popunder ad script on every page
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useEffect } from 'react';

export function PopunderAd() {
  useEffect(() => {
    // Load the popunder ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://www.effectivegatecpm.com/eedsxj9s?key=12ce1a5c04038bbb3cb1a33cd9828574';
    
    document.body.appendChild(script);

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
