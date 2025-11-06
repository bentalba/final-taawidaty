/**
 * Enhanced Card Component with Micro-interactions
 * Adds Apple-inspired polish to any card
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  glowOnHover?: boolean;
  animateOnMount?: boolean;
  delay?: number;
}

export function EnhancedCard({
  children,
  className,
  onClick,
  hoverable = true,
  glowOnHover = false,
  animateOnMount = true,
  delay = 0,
}: EnhancedCardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      initial={animateOnMount ? { opacity: 0, y: 20 } : false}
      animate={animateOnMount ? { opacity: 1, y: 0 } : false}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hoverable
          ? {
              y: -6,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }
          : undefined
      }
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        'relative bg-white dark:bg-card rounded-2xl border border-neutral-200 dark:border-border p-6',
        'transition-all duration-300',
        hoverable && 'hover:shadow-strong hover:border-trust-blue/30 dark:hover:border-primary/50',
        glowOnHover && 'hover:shadow-glow',
        isClickable && 'cursor-pointer',
        className
      )}
    >
      {/* Shimmer effect on hover */}
      {hoverable && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          whileHover={{
            opacity: [0, 1, 0],
            x: ['-100%', '100%'],
            transition: { duration: 1, ease: 'linear' },
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * Floating Action Button with pulse
 */
interface FloatingButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'success';
  pulsing?: boolean;
}

export function FloatingButton({
  icon,
  label,
  onClick,
  variant = 'primary',
  pulsing = false,
}: FloatingButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        'fixed bottom-8 right-8 z-50',
        'w-16 h-16 rounded-full shadow-floating',
        'flex items-center justify-center',
        'focus:outline-none focus:ring-4 focus:ring-opacity-50',
        variant === 'primary' && 'bg-trust-blue text-white focus:ring-trust-blue',
        variant === 'success' && 'bg-success-green text-white focus:ring-success-green',
        pulsing && 'animate-pulse'
      )}
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}

/**
 * Skeleton Loading Component
 */
interface SkeletonProps {
  className?: string;
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-neutral-200 rounded',
        shimmer && 'animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]',
        className
      )}
    />
  );
}

/**
 * Badge with animation
 */
interface BadgeProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  pulsing?: boolean;
}

export function Badge({ children, variant = 'info', pulsing = false }: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold',
        variant === 'info' && 'bg-trust-blue-light text-trust-blue',
        variant === 'success' && 'bg-success-green-light text-success-green',
        variant === 'warning' && 'bg-yellow-100 text-yellow-800',
        variant === 'error' && 'bg-red-100 text-red-800',
        pulsing && 'animate-pulse-subtle'
      )}
    >
      {children}
    </motion.span>
  );
}
