/**
 * Accessibility Utilities
 * Medical-grade accessibility for WCAG 2.1 AA compliance
 */

/**
 * Trap focus within an element (for modals, drawers, etc.)
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Announce changes to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  let announcer = document.getElementById('a11y-announcer');

  if (!announcer) {
    announcer = createAnnouncer();
  }

  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;

  // Clear after announcement
  setTimeout(() => {
    if (announcer) announcer.textContent = '';
  }, 1000);
}

/**
 * Create screen reader announcer element
 */
function createAnnouncer(): HTMLElement {
  const announcer = document.createElement('div');
  announcer.id = 'a11y-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  document.body.appendChild(announcer);
  return announcer;
}

/**
 * Check color contrast ratio
 * Returns true if contrast passes WCAG AA (4.5:1 for normal text)
 */
export function checkColorContrast(
  foreground: string,
  background: string
): { ratio: number; passes: boolean } {
  const fgLuminance = getRelativeLuminance(foreground);
  const bgLuminance = getRelativeLuminance(background);

  const ratio =
    fgLuminance > bgLuminance
      ? (fgLuminance + 0.05) / (bgLuminance + 0.05)
      : (bgLuminance + 0.05) / (fgLuminance + 0.05);

  return {
    ratio,
    passes: ratio >= 4.5, // WCAG AA for normal text
  };
}

/**
 * Calculate relative luminance for color contrast
 */
function getRelativeLuminance(color: string): number {
  // Convert hex to RGB
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * ARIA attribute helpers
 */
export const aria = {
  describedBy: (id: string) => ({
    'aria-describedby': id,
  }),

  labelledBy: (id: string) => ({
    'aria-labelledby': id,
  }),

  current: (value: 'page' | 'step' | 'location' | 'date' | 'time') => ({
    'aria-current': value,
  }),

  live: (value: 'polite' | 'assertive' | 'off') => ({
    'aria-live': value,
  }),

  expanded: (isExpanded: boolean) => ({
    'aria-expanded': isExpanded,
  }),

  selected: (isSelected: boolean) => ({
    'aria-selected': isSelected,
  }),

  pressed: (isPressed: boolean) => ({
    'aria-pressed': isPressed,
  }),

  hidden: (isHidden: boolean) => ({
    'aria-hidden': isHidden,
  }),
};

/**
 * Focus first focusable element in container
 */
export function focusFirst(container: HTMLElement): void {
  const focusable = container.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement | null;

  focusable?.focus();
}

/**
 * Escape key handler for closing modals/dialogs
 */
export function onEscapeKey(callback: () => void): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  };
}

/**
 * Generate unique ID for ARIA relationships
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get current language direction
 */
export function getDirection(): 'ltr' | 'rtl' {
  return document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
}

/**
 * Skip to main content (accessibility feature)
 */
export function skipToMainContent(): void {
  const main = document.querySelector('main');
  if (main) {
    main.setAttribute('tabindex', '-1');
    main.focus();
    main.removeAttribute('tabindex');
  }
}

/**
 * Keyboard navigation helper
 */
export function createKeyboardNav(options: {
  onEnter?: () => void;
  onSpace?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEscape?: () => void;
}) {
  return (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        options.onEnter?.();
        break;
      case ' ':
        e.preventDefault();
        options.onSpace?.();
        break;
      case 'ArrowUp':
        e.preventDefault();
        options.onArrowUp?.();
        break;
      case 'ArrowDown':
        e.preventDefault();
        options.onArrowDown?.();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        options.onArrowLeft?.();
        break;
      case 'ArrowRight':
        e.preventDefault();
        options.onArrowRight?.();
        break;
      case 'Escape':
        e.preventDefault();
        options.onEscape?.();
        break;
    }
  };
}

/**
 * Check if element is visible
 */
export function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Scroll element into view with smooth behavior
 */
export function scrollIntoView(
  element: HTMLElement,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'nearest' }
): void {
  if (!prefersReducedMotion()) {
    element.scrollIntoView(options);
  } else {
    element.scrollIntoView({ ...options, behavior: 'auto' });
  }
}

/**
 * React hook for managing focus trap
 */
import { useEffect } from 'react';

export function useFocusTrap(
  ref: React.RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const cleanup = trapFocus(ref.current);
    return cleanup;
  }, [ref, isActive]);
}

/**
 * React hook for screen reader announcements
 */
export function useAnnouncement(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (message) {
      announceToScreenReader(message, priority);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
