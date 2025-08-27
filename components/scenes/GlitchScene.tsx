'use client';

import { motion } from 'framer-motion';
import { SceneProps } from '@/types/scene';
import { useEffect, useState } from 'react';

export function GlitchScene({ text = 'MARK', primaryColor = '#ff0080' }: SceneProps) {
  const [glitchText, setGlitchText] = useState(text);
  
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const interval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        const glitched = text.split('').map(char => 
          Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(text), 100);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* TV static background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
      />
      
      {/* Main glitch text */}
      <div className="relative">
        <motion.div
          className="text-8xl md:text-[12vw] font-black"
          animate={{
            x: [0, -5, 5, -3, 3, 0],
            scaleX: [1, 1.02, 0.98, 1.01, 0.99, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          {/* Red channel */}
          <motion.span
            className="absolute"
            style={{ 
              color: 'transparent',
              textShadow: `-2px 0 ${primaryColor}`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [0, 2, -2, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {glitchText}
          </motion.span>
          
          {/* Blue channel */}
          <motion.span
            className="absolute"
            style={{ 
              color: 'transparent',
              textShadow: `2px 0 cyan`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [0, -2, 2, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {glitchText}
          </motion.span>
          
          {/* Main text */}
          <span
            style={{ 
              color: '#fff',
              textShadow: `0 0 20px ${primaryColor}`,
            }}
          >
            {glitchText}
          </span>
        </motion.div>
        
        {/* Scan lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
          animate={{
            y: [0, 10],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      
      {/* Random bars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-1"
          style={{
            background: primaryColor,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}