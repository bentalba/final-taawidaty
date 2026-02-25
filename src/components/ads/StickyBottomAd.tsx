/**
 * Sticky Bottom Ad Component
 * Displays a sticky 320x50 banner ad fixed to the bottom of the screen (WEB ONLY)
 * 
 * @author BENTALBA ZAKARIA
 * @copyright 2025 BENTALBA ZAKARIA
 */

import { useState, useEffect } from 'react';
import { isNativeApp } from '@/utils/platform';
import { AdUnit } from '@/components/ads/AdUnit';

export function StickyBottomAd() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on web
        if (!isNativeApp()) {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[40] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 flex justify-center items-center pb-2 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
            <div className="flex flex-col items-center w-full max-w-full overflow-hidden">
                <span className="text-[10px] text-slate-400 capitalize mb-1 leading-none">Publicité</span>
                <AdUnit type="banner-320x50" className="w-[320px] max-w-full" />
            </div>
        </div>
    );
}
