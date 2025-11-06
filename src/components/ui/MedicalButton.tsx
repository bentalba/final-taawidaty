import { motion, useSpring } from 'framer-motion';
import { ButtonHTMLAttributes, useState, forwardRef, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface MedicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  breathing?: boolean;
  pulseOnSuccess?: boolean;
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
}

export const MedicalButton = forwardRef<HTMLButtonElement, MedicalButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      breathing = false,
      pulseOnSuccess = false,
      loading = false,
      ripple = true,
      glow = false,
      disabled,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const scale = useSpring(1, { stiffness: 400, damping: 17 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || disabled || loading) return;

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple: Ripple = {
        x,
        y,
        size,
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    const handleInteraction = {
      onMouseDown: () => !loading && !disabled && scale.set(0.95),
      onMouseUp: () => !loading && !disabled && scale.set(1),
      onMouseLeave: () => !loading && !disabled && scale.set(1),
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
      xl: 'px-8 py-5 text-xl',
    };

    const variantClasses = {
      primary:
        'bg-trust-blue text-white hover:bg-trust-blue-dark shadow-lg hover:shadow-strong',
      secondary:
        'bg-white text-trust-blue border-2 border-trust-blue hover:bg-trust-blue-50',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg',
      success:
        'bg-success-green text-white hover:bg-success-green-dark shadow-lg',
    };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        onClick={handleClick}
        className={cn(
          'rounded-xl font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-trust-blue',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'relative overflow-hidden',
          sizeClasses[size],
          variantClasses[variant],
          breathing && 'animate-breathe',
          glow && 'shadow-glow hover:shadow-glow-blue',
          pulseOnSuccess && isSuccess && 'animate-pulse',
          loading && 'cursor-wait',
          className
        )}
        style={{ scale } as any}
        {...handleInteraction}
        disabled={disabled || loading}
        whileTap={{ scale: loading || disabled ? 1 : 0.95 }}
        {...props}
      >
        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}

        {/* Loading State */}
        {loading && (
          <motion.div
            className="absolute inset-0 bg-inherit flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </motion.div>
        )}

        {/* Shimmer on hover */}
        {!loading && !disabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{
              x: '100%',
              transition: { duration: 0.6, ease: 'linear' },
            }}
          />
        )}

        <span className={cn('relative z-10', loading && 'invisible')}>{children}</span>
      </motion.button>
    );
  }
);

MedicalButton.displayName = 'MedicalButton';
