'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '@/types/scene';
import { useState, useEffect } from 'react';

interface FallingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
}

export function EmojiRainScene({ text = 'MARK' }: SceneProps) {
  const [emojis, setEmojis] = useState<FallingEmoji[]>([]);
  const emojiSet = ['👀', '🎯', '⚡', '🔥', '💫', '✨', '🌟', '💥', '🚀', '🎪', '🎨', '🎭'];
  
  useEffect(() => {
    const newEmojis: FallingEmoji[] = [];
    for (let i = 0; i < 30; i++) {
      // Use deterministic values based on index
      newEmojis.push({
        id: i,
        emoji: emojiSet[i % emojiSet.length],
        x: ((i * 31) % 100),
        delay: ((i * 13) % 50) / 10,
        duration: 3 + ((i * 7) % 20) / 10,
      });
    }
    setEmojis(newEmojis);
    
    const interval = setInterval(() => {
      setEmojis(prev => {
        const updated = [...prev];
        const indexToUpdate = Math.floor(Math.random() * updated.length);
        updated[indexToUpdate] = {
          ...updated[indexToUpdate],
          id: Date.now() + indexToUpdate,
          emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
          x: Math.random() * 100,
          delay: 0,
          duration: 3 + Math.random() * 2,
        };
        return updated;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 to-pink-900 overflow-hidden">
      {/* Falling emojis */}
      <AnimatePresence>
        {emojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            className="absolute text-4xl"
            style={{ left: `${emoji.x}%` }}
            initial={{ y: -100, rotate: 0 }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              y: {
                duration: emoji.duration,
                delay: emoji.delay,
                ease: 'linear',
              },
              rotate: {
                duration: emoji.duration,
                delay: emoji.delay,
                ease: 'linear',
              },
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
            >
              {emoji.emoji}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Bouncing text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-white text-8xl md:text-[15vw] font-black"
          animate={{
            y: [0, -20, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            textShadow: '0 0 50px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3)',
          }}
        >
          {text}
        </motion.div>
      </div>
      
      {/* Bottom bounce effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/20 to-transparent"
        animate={{
          scaleY: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
    </div>
  );
}