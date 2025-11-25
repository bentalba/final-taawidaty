/**
 * Banner Ad Component
 * Displays banner ad on every page without disrupting layout
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useEffect } from 'react';

export function BannerAd() {
  useEffect(() => {
    // Load the banner ad script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl28129907.effectivegatecpm.com/e3c362a6fe79c57064310f672d050bef/invoke.js';
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-4">
      <div 
        id="container-e3c362a6fe79c57064310f672d050bef"
        className="max-w-full overflow-hidden"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}
