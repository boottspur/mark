'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function LoadingScene() {
  const letters = "MMMAAAAARRK!!!".split('');
  
  // Generate consistent rotation values based on index
  const rotations = useMemo(() => 
    letters.map((_, i) => (i * 47 % 360) - 180),
    [letters]
  );
  
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="flex flex-wrap justify-center max-w-4xl">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-white font-bold text-6xl md:text-8xl lg:text-9xl"
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: rotations[i]
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              rotate: [rotations[i], 0, 0, 360],
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut"
            }}
            style={{
              textShadow: `0 0 ${20 + i * 2}px rgba(255, 255, 255, 0.8)`,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="absolute inset-0 bg-white mix-blend-difference"
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}