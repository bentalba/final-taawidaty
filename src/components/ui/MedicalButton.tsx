import { motion, useSpring } from 'framer-motion';
import { ButtonHTMLAttributes, useState, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  breathing?: boolean;
  pulseOnSuccess?: boolean;
  loading?: boolean;
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
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const scale = useSpring(1, { stiffness: 400, damping: 17 });

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
        ref={ref}
        className={cn(
          'rounded-xl font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-trust-blue',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'relative overflow-hidden',
          sizeClasses[size],
          variantClasses[variant],
          breathing && 'animate-breathe',
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

        <span className={cn(loading && 'invisible')}>{children}</span>
      </motion.button>
    );
  }
);

MedicalButton.displayName = 'MedicalButton';
