'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene } from '@/types/scene';

interface SceneFooterProps {
  scenes: Scene[];
  currentSceneId: string;
  debugMode?: boolean;
  loadTime?: number;
}

export function SceneFooter({ scenes, currentSceneId, debugMode, loadTime }: SceneFooterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleSceneSelect = (sceneId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('scene', sceneId);
    if (debugMode) {
      url.searchParams.set('debug', 'true');
    }
    window.location.href = url.toString();
  };

  const handleRandomScene = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('scene');
    url.searchParams.delete('seed');
    if (debugMode) {
      url.searchParams.set('debug', 'true');
    }
    window.location.href = url.toString();
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Scenes {isOpen ? '✕' : '☰'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 z-40 bg-black/90 backdrop-blur-md rounded-lg p-4 max-w-sm max-h-[60vh] overflow-y-auto"
          >
            {debugMode && loadTime && (
              <div className="text-white/60 text-xs mb-3 font-mono">
                Current: {currentSceneId}<br />
                Load time: {loadTime}ms
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <button
                onClick={handleShare}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                {copied ? '✓ Copied!' : 'Share'}
              </button>
              <button
                onClick={handleRandomScene}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Random
              </button>
            </div>

            <div className="space-y-1">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(scene.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    scene.id === currentSceneId
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {scene.name}
                  {scene.requiresAPI && ' 🤖'}
                </button>
              ))}
            </div>

            {debugMode && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <a
                  href="?debug=false"
                  className="text-white/60 hover:text-white text-xs"
                >
                  Disable debug mode
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}