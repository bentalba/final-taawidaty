/**
 * Page Transition Component
 * Smooth transitions between routes and pages
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AdUnit } from '@/components/ads/AdUnit';
import { isNativeApp } from '@/utils/platform';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const paddingBottomClass = isNativeApp() ? "pb-16 md:pb-0" : "pb-24 md:pb-0";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={`flex flex-col min-h-screen ${paddingBottomClass}`}
      >
        <div className="flex-1">
          {children}
        </div>

        {/* Responsive Bottom Ad - Web only, hidden in native app */}
        {!isNativeApp() && (
          <div className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-4 mt-8">
            <div className="container mx-auto max-w-6xl">
              <p className="text-xs text-center text-slate-400 mb-3">Advertisement</p>

              {/* Mobile: 300x250 */}
              <div className="flex justify-center md:hidden">
                <AdUnit type="banner-300x250" className="w-full" />
              </div>

              {/* Desktop: 728x90 */}
              <div className="hidden md:flex md:justify-center">
                <AdUnit type="banner-728x90" className="w-full" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Section Transition
 * For transitioning between sections within a page
 */
interface SectionTransitionProps {
  children: ReactNode;
  id: string;
  delay?: number;
}

export function SectionTransition({ children, id, delay = 0 }: SectionTransitionProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide Transition
 * Slide content in/out from specified direction
 */
interface SlideTransitionProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}

export function SlideTransition({
  children,
  direction = 'right',
  delay = 0
}: SlideTransitionProps) {
  const directionOffset = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: -100 },
    down: { x: 0, y: 100 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      exit={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      transition={{
        duration: 0.4,
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade Transition
 * Simple fade in/out
 */
interface FadeTransitionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeTransition({
  children,
  delay = 0,
  duration = 0.3
}: FadeTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale Transition
 * Scale in/out with fade
 */
interface ScaleTransitionProps {
  children: ReactNode;
  delay?: number;
}

export function ScaleTransition({ children, delay = 0 }: ScaleTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.3,
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Children
 * Stagger animation for list items
 */
interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export function StaggerChildren({ children, staggerDelay = 0.1 }: StaggerChildrenProps) {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
}
