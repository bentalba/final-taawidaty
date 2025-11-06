/**
 * Confetti Component
 * Celebration animation for successful calculations
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: {
    x: number;
    y: number;
  };
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
  colors?: string[];
  pieceCount?: number;
}

export function Confetti({
  active,
  duration = 3000,
  colors = ['#0077be', '#4caf50', '#d4af37', '#ff6b6b', '#4ecdc4'],
  pieceCount = 50,
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    // Generate confetti pieces
    const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 2 + 1,
      },
    }));

    setPieces(newPieces);

    // Clear confetti after duration
    const timeout = setTimeout(() => {
      setPieces([]);
    }, duration);

    return () => clearTimeout(timeout);
  }, [active, pieceCount, colors, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            initial={{
              y: piece.y,
              x: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, piece.velocity.x * 100],
              rotate: [0, piece.rotation * 3],
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: duration / 1000,
              ease: 'linear',
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Success Celebration Component
 * Shows confetti and success message
 */
interface SuccessCelebrationProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

export function SuccessCelebration({
  show,
  message = '🎉 Calcul terminé !',
  onComplete,
}: SuccessCelebrationProps) {
  useEffect(() => {
    if (show && onComplete) {
      const timeout = setTimeout(onComplete, 3000);
      return () => clearTimeout(timeout);
    }
  }, [show, onComplete]);

  return (
    <>
      <Confetti active={show} />

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 text-center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 3,
                }}
              >
                🎉
              </motion.div>
              <p className="text-2xl font-bold text-neutral-900">{message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
