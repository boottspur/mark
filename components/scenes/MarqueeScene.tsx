'use client';

import { motion } from 'framer-motion';
import { SceneProps } from '@/types/scene';

export function MarqueeScene({ text = 'MARK', primaryColor = '#fff', message }: SceneProps) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="whitespace-nowrap"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            duration: 10,
            ease: 'linear',
          },
        }}
      >
        <span
          className="text-[20vw] font-black tracking-tighter"
          style={{ 
            color: primaryColor,
            textShadow: `0 0 50px ${primaryColor}`,
          }}
        >
          {text} {text} {text}
        </span>
      </motion.div>
      
      {message && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p 
            className="text-white text-center text-lg md:text-2xl font-medium leading-relaxed"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
          >
            {decodeURIComponent(message)}
          </p>
        </motion.div>
      )}
    </div>
  );
}