'use client';

import { motion } from 'framer-motion';
import { SceneProps } from '@/types/scene';

export function MarqueeScene({ text = 'MARK', primaryColor = '#fff' }: SceneProps) {
  return (
    <div className="fixed inset-0 bg-black flex items-center overflow-hidden">
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
    </div>
  );
}