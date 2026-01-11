import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<'drop' | 'bounce' | 'expand'>('drop');

  useEffect(() => {
    // Transition through stages
    const dropTimer = setTimeout(() => setStage('bounce'), 800);
    const bounceTimer = setTimeout(() => setStage('expand'), 1800);
    const expandTimer = setTimeout(onComplete, 3200);

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(bounceTimer);
      clearTimeout(expandTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated ball */}
      <motion.div
        className="absolute left-1/2 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 shadow-2xl"
        style={{
          x: '-50%',
          filter: 'blur(0px)',
        }}
        initial={{
          top: '-200px',
          width: '120px',
          height: '120px',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.8)',
        }}
        animate={
          stage === 'drop'
            ? {
                top: '45%',
                transition: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              }
            : stage === 'bounce'
            ? {
                top: ['45%', '40%', '45%'],
                scale: [1, 1.05, 1],
                transition: {
                  duration: 1,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                },
              }
            : {
                top: '50%',
                left: '50%',
                width: '2000px',
                height: '2000px',
                scale: 3,
                opacity: 0.3,
                filter: 'blur(100px)',
                transition: {
                  duration: 1.4,
                  ease: 'easeInOut',
                },
              }
        }
      />

      {/* Glow effect */}
      {stage === 'bounce' && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [1, 2, 3],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <div className="h-32 w-32 rounded-full bg-purple-500/50 blur-3xl" />
        </motion.div>
      )}
    </div>
  );
}
