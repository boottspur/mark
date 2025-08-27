'use client';

import { motion } from 'framer-motion';
import { SceneProps } from '@/types/scene';
import { useState, useEffect } from 'react';

export function RadarPingScene({ text = 'MARK', primaryColor = '#00ff00' }: SceneProps) {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLocked(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Radar sweep */}
      <motion.div
        className="absolute w-96 h-96 rounded-full border-2"
        style={{ borderColor: primaryColor }}
        initial={{ opacity: 0.3 }}
      />
      
      {/* Ping waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 rounded-full border"
          style={{ borderColor: primaryColor }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Rotating sweep line */}
      <motion.div
        className="absolute w-96 h-0.5"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${primaryColor})`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Target text */}
      <motion.div
        className="relative z-10"
        animate={locked ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 0.5,
          repeat: locked ? Infinity : 0,
        }}
      >
        <span
          className="text-6xl md:text-8xl font-black"
          style={{ 
            color: primaryColor,
            textShadow: locked 
              ? `0 0 30px ${primaryColor}, 0 0 60px ${primaryColor}` 
              : `0 0 10px ${primaryColor}`,
          }}
        >
          {text}
        </span>
        {locked && (
          <motion.div
            className="absolute -inset-8 border-2 border-red-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )}
        {locked && (
          <motion.div
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-red-500 font-mono text-sm whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
          >
            TARGET LOCKED
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}