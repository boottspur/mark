'use client';

import { motion } from 'framer-motion';
import { SceneProps } from '@/types/scene';
import { useState, useEffect } from 'react';

export function SpotlightScene({ text = 'MARK', primaryColor = '#ffff00' }: SceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
    
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        setMousePosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      } else {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMove as EventListener);
    window.addEventListener('touchmove', handleMove as EventListener);
    
    // Start with center position
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    return () => {
      window.removeEventListener('mousemove', handleMove as EventListener);
      window.removeEventListener('touchmove', handleMove as EventListener);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden cursor-none">
      {/* Hidden text (revealed by spotlight) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-[15vw] md:text-[20vw] font-black text-white select-none"
          style={{
            WebkitTextStroke: '2px white',
            color: 'transparent',
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.span>
      </div>

      {/* Spotlight effect */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${primaryColor}88 0%, ${primaryColor}44 40%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Secondary spotlight for depth */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 100,
        }}
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${primaryColor}44 0%, transparent 50%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Instructions */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isMobile ? 'Touch to reveal' : 'Move cursor to reveal'}
      </motion.div>

      {/* Auto-moving spotlight for mobile or no interaction */}
      {isMobile && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            x: [100, window.innerWidth - 300, 100],
            y: [100, window.innerHeight - 300, 100],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${primaryColor}44 0%, transparent 60%)`,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}