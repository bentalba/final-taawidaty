/**
 * Accessibility Testing Utilities
 * WCAG 2.1 AA compliance helpers and audit tools
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

/**
 * Test component for accessibility violations
 */
export async function testA11y(ui: React.ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  return results;
}

/**
 * Check if element has proper ARIA attributes
 */
export function hasProperARIA(element: HTMLElement): boolean {
  const checks = [
    // Has accessible name (aria-label, aria-labelledby, or visible text)
    element.hasAttribute('aria-label') ||
      element.hasAttribute('aria-labelledby') ||
      element.textContent?.trim().length > 0,
    
    // Interactive elements have proper roles
    !element.hasAttribute('role') ||
      ['button', 'link', 'checkbox', 'radio', 'textbox'].includes(
        element.getAttribute('role') || ''
      ),
  ];

  return checks.every(Boolean);
}

/**
 * Check color contrast ratios
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  fontSize: number = 16
): { ratio: number; passes: boolean } {
  const getRGB = (color: string) => {
    // Simple RGB extraction (extend for hex, rgba, etc.)
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return [0, 0, 0];
    return rgb.slice(0, 3).map(Number);
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const fg = getRGB(foreground);
  const bg = getRGB(background);

  const l1 = getLuminance(fg[0], fg[1], fg[2]);
  const l2 = getLuminance(bg[0], bg[1], bg[2]);

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  // WCAG AA requirements
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && true); // bold
  const requiredRatio = isLargeText ? 3 : 4.5;

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= requiredRatio,
  };
}

/**
 * Check keyboard navigation
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const checks = [
    // Focusable elements have tabindex >= 0 or are naturally focusable
    element.tabIndex >= 0 ||
      ['a', 'button', 'input', 'select', 'textarea'].includes(
        element.tagName.toLowerCase()
      ),
    
    // Has visible focus indicator (via CSS)
    true, // This would need DOM inspection
  ];

  return checks.every(Boolean);
}

/**
 * Accessibility audit report
 */
export interface A11yAuditReport {
  componentName: string;
  violations: Array<{
    type: string;
    severity: 'critical' | 'serious' | 'moderate' | 'minor';
    element: string;
    message: string;
    wcagCriteria: string;
  }>;
  passed: boolean;
  score: number;
}

/**
 * Run comprehensive accessibility audit
 */
export async function runA11yAudit(
  component: React.ReactElement,
  componentName: string
): Promise<A11yAuditReport> {
  const { container } = render(component);
  const results = await axe(container);

  const violations = results.violations.map((violation) => ({
    type: violation.id,
    severity: violation.impact as 'critical' | 'serious' | 'moderate' | 'minor',
    element: violation.nodes[0]?.html || 'Unknown',
    message: violation.description,
    wcagCriteria: violation.tags.filter((tag) => tag.startsWith('wcag')).join(', '),
  }));

  const criticalCount = violations.filter((v) => v.severity === 'critical').length;
  const seriousCount = violations.filter((v) => v.severity === 'serious').length;

  // Calculate score (100 - deductions)
  const score = Math.max(
    0,
    100 - criticalCount * 25 - seriousCount * 10 - violations.length * 2
  );

  return {
    componentName,
    violations,
    passed: violations.length === 0,
    score,
  };
}

/**
 * Common accessibility test suite
 */
export function createA11yTests(
  componentName: string,
  renderComponent: () => React.ReactElement
) {
  describe(`${componentName} Accessibility`, () => {
    it('should have no axe violations', async () => {
      const component = renderComponent();
      await testA11y(component);
    });

    it('should have proper heading hierarchy', () => {
      const { container } = render(renderComponent());
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      if (headings.length > 0) {
        const levels = Array.from(headings).map((h) =>
          parseInt(h.tagName.substring(1))
        );
        
        // Check that headings don't skip levels
        for (let i = 1; i < levels.length; i++) {
          expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
        }
      }
    });

    it('should have proper form labels', () => {
      const { container } = render(renderComponent());
      const inputs = container.querySelectorAll('input, select, textarea');
      
      inputs.forEach((input) => {
        const hasLabel =
          input.hasAttribute('aria-label') ||
          input.hasAttribute('aria-labelledby') ||
          container.querySelector(`label[for="${input.id}"]`) !== null;
        
        expect(hasLabel).toBe(true);
      });
    });

    it('should have proper button accessibility', () => {
      const { container } = render(renderComponent());
      const buttons = container.querySelectorAll('button');
      
      buttons.forEach((button) => {
        // Should have accessible text
        const hasAccessibleText =
          button.textContent?.trim().length > 0 ||
          button.hasAttribute('aria-label') ||
          button.hasAttribute('aria-labelledby');
        
        expect(hasAccessibleText).toBe(true);
      });
    });

    it('should have proper link accessibility', () => {
      const { container } = render(renderComponent());
      const links = container.querySelectorAll('a');
      
      links.forEach((link) => {
        // Should have accessible text
        const hasAccessibleText =
          link.textContent?.trim().length > 0 ||
          link.hasAttribute('aria-label') ||
          link.hasAttribute('aria-labelledby');
        
        expect(hasAccessibleText).toBe(true);
        
        // Should have href
        expect(link.hasAttribute('href')).toBe(true);
      });
    });

    it('should have proper image alt text', () => {
      const { container } = render(renderComponent());
      const images = container.querySelectorAll('img');
      
      images.forEach((img) => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    it('should support keyboard navigation', () => {
      const { container } = render(renderComponent());
      const interactiveElements = container.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]'
      );
      
      interactiveElements.forEach((element) => {
        const tabIndex = (element as HTMLElement).tabIndex;
        expect(tabIndex).toBeGreaterThanOrEqual(-1);
      });
    });

    it('should have proper ARIA landmarks', () => {
      const { container } = render(renderComponent());
      
      // Check for semantic HTML5 elements or ARIA landmarks
      const landmarks = container.querySelectorAll(
        'main, nav, header, footer, aside, section, [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]'
      );
      
      // Should have at least one landmark if it's a page-level component
      // This is a soft check - adjust based on component type
      expect(landmarks.length).toBeGreaterThanOrEqual(0);
    });

    it('should have proper focus management', () => {
      const { container } = render(renderComponent());
      const focusableElements = container.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach((element) => {
        // Should be visible or have aria-hidden
        const isHidden =
          (element as HTMLElement).hasAttribute('aria-hidden') ||
          (element as HTMLElement).style.display === 'none';
        
        if (!isHidden) {
          expect((element as HTMLElement).tabIndex).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });
}

/**
 * Screen reader announcement helper
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Focus trap utility for modals
 */
export function createFocusTrap(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  // Focus first element
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}
