import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

/**
 * Animates a numeric value from `from` to `to` using requestAnimationFrame.
 * Falls back to the final value instantly when the animation already ran
 * within the same session (keeps the UI snappy when navigating back).
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.5,
  className = '',
  formatter
}: CountUpProps) {
  const [value, setValue] = useState(from);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(from) || !Number.isFinite(to) || duration <= 0) {
      setValue(to);
      return;
    }

    const hasSessionStorage = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    const sessionKey = `countup-${from}-${to}-${duration}`;

    if (hasSessionStorage && sessionStorage.getItem(sessionKey)) {
      setValue(to);
      return;
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const nextValue = from + (to - from) * progress;
      setValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else if (hasSessionStorage) {
        sessionStorage.setItem(sessionKey, 'true');
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = undefined;
      startTimeRef.current = null;
    };
  }, [from, to, duration]);

  const displayValue = formatter
    ? formatter(value)
    : new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  return <span className={className}>{displayValue}</span>;
}
