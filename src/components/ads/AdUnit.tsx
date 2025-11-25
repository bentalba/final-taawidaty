/**
 * Professional Ad Unit Component
 * Handles multiple ad sizes with responsive placement
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import React, { useEffect, useRef } from 'react';

// Define all available ad types based on approved sizes
type AdType = 
  | 'banner-300x250'   // Medium Rectangle - High CPM
  | 'banner-728x90'    // Leaderboard - Desktop standard
  | 'banner-320x50'    // Mobile banner - Sticky footer
  | 'native-strip';    // 4:1 Widget - Native content

interface AdUnitProps {
  type: AdType;
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainerRef.current) {
      // Clear previous content to prevent duplicates
      adContainerRef.current.innerHTML = '';

      // Create script based on ad type
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;

      switch (type) {
        case 'banner-300x250':
          // Medium Rectangle - 300x250
          script.innerHTML = `
            atOptions = {
              'key' : '609c413c4d8ec77697f52b90a389e2e1',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          `;
          adContainerRef.current.appendChild(script);
          
          const script300x250 = document.createElement('script');
          script300x250.type = 'text/javascript';
          script300x250.src = '//www.topcreativeformat.com/609c413c4d8ec77697f52b90a389e2e1/invoke.js';
          adContainerRef.current.appendChild(script300x250);
          break;

        case 'banner-728x90':
          // Leaderboard - 728x90
          script.innerHTML = `
            atOptions = {
              'key' : '73248a225bc650e298feffb4ef3b8c55',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `;
          adContainerRef.current.appendChild(script);
          
          const script728x90 = document.createElement('script');
          script728x90.type = 'text/javascript';
          script728x90.src = '//www.topcreativeformat.com/73248a225bc650e298feffb4ef3b8c55/invoke.js';
          adContainerRef.current.appendChild(script728x90);
          break;

        case 'banner-320x50':
          // Mobile Banner - 320x50
          script.innerHTML = `
            atOptions = {
              'key' : '69dd9fc783ee58ca28a59e87b005c014',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `;
          adContainerRef.current.appendChild(script);
          
          const script320x50 = document.createElement('script');
          script320x50.type = 'text/javascript';
          script320x50.src = '//www.topcreativeformat.com/69dd9fc783ee58ca28a59e87b005c014/invoke.js';
          adContainerRef.current.appendChild(script320x50);
          break;

        case 'native-strip':
          // Native 4:1 Widget (already implemented via BannerAd component)
          script.async = true;
          script.setAttribute('data-cfasync', 'false');
          script.src = '//pl28129907.effectivegatecpm.com/e3c362a6fe79c57064310f672d050bef/invoke.js';
          adContainerRef.current.appendChild(script);
          
          const nativeDiv = document.createElement('div');
          nativeDiv.id = 'container-e3c362a6fe79c57064310f672d050bef';
          adContainerRef.current.appendChild(nativeDiv);
          break;

        default:
          console.warn('Unknown ad type:', type);
      }
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
    };
  }, [type]);

  // Dimensions for container to prevent layout shift (CLS)
  const dimensions = {
    'banner-300x250': { width: 300, height: 250 },
    'banner-728x90': { width: 728, height: 90 },
    'banner-320x50': { width: 320, height: 50 },
    'native-strip': { width: '100%', height: 'auto' },
  }[type];

  return (
    <div className={`flex justify-center items-center overflow-hidden ${className}`}>
      <div 
        ref={adContainerRef} 
        style={dimensions} 
        className="flex items-center justify-center relative"
      />
    </div>
  );
};
