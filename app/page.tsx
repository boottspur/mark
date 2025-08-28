'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const messageOptions = [
  {
    id: 'wake-up',
    text: 'Get out of bed already',
    message: 'WAKE UP MARK! The world needs you!',
    emoji: '🛏️',
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'respond',
    text: 'Respond to me',
    message: 'Mark... please respond. I miss our conversations.',
    emoji: '📱',
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'commit',
    text: 'Commit to plans',
    message: 'Stop being wishy-washy! Make a decision and stick to it!',
    emoji: '📅',
    color: 'from-green-400 to-teal-500'
  },
  {
    id: 'portfolio',
    text: 'Rebalance my portfolio',
    message: 'The markets are moving, Mark! Time to rebalance!',
    emoji: '📈',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'other',
    text: 'Other',
    message: '',
    emoji: '✨',
    color: 'from-purple-400 to-pink-500'
  }
];

export default function ConfigPage() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUrl = () => {
    const option = messageOptions.find(opt => opt.id === selectedOption);
    const message = selectedOption === 'other' ? customMessage : option?.message || '';
    
    if (message.trim()) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const encodedMessage = encodeURIComponent(message);
      const url = `${baseUrl}/scenes?message=${encodedMessage}`;
      setGeneratedUrl(url);
    }
  };

  const copyToClipboard = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentMessage = selectedOption === 'other' 
    ? customMessage 
    : messageOptions.find(opt => opt.id === selectedOption)?.message || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MARK CONFIG
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-purple-200 font-semibold px-6 md:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            What do you need Mark to do that he isn&apos;t doing?
          </motion.p>
        </motion.div>

        {/* Options */}
        <motion.div 
          className="space-y-4 md:space-y-6 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {messageOptions.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-6 sm:p-8 mx-2 sm:mx-0 rounded-2xl border-2 transition-all duration-300 ${
                selectedOption === option.id
                  ? 'border-white bg-white/10 shadow-lg shadow-white/20'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <motion.div
                  className={`text-3xl sm:text-4xl p-2 sm:p-3 rounded-full bg-gradient-to-r ${option.color}`}
                  animate={selectedOption === option.id ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {option.emoji}
                </motion.div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{option.text}</h3>
                  {option.id !== 'other' && (
                    <p className="text-purple-200 mt-2 text-sm sm:text-base leading-relaxed">{option.message}</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Custom Message Input */}
        <AnimatePresence>
          {selectedOption === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 md:mb-12 mx-2 sm:mx-0"
            >
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Tell Mark exactly what you need him to do..."
                className="w-full p-6 sm:p-8 rounded-2xl border-2 border-white/20 bg-white/10 text-white placeholder-purple-200 resize-none focus:border-white focus:outline-none focus:bg-white/20 transition-all duration-300 text-sm sm:text-base leading-relaxed"
                rows={4}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        <AnimatePresence>
          {selectedOption && currentMessage.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-12"
            >
              <motion.button
                onClick={generateUrl}
                className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Generate Mark Link! 🚀
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated URL */}
        <AnimatePresence>
          {generatedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 md:p-8 mx-2 sm:mx-0"
            >
              <h3 className="text-white font-bold text-base sm:text-lg mb-6">Your Mark Link:</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 p-5 bg-black/20 rounded-lg text-purple-100 font-mono text-sm break-all leading-relaxed">
                  {generatedUrl}
                </div>
                <motion.button
                  onClick={copyToClipboard}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </motion.button>
              </div>
              <div className="mt-6 flex justify-center">
                <Link 
                  href={generatedUrl}
                  target="_blank"
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 inline-block text-sm sm:text-base"
                >
                  Preview Link 👀
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 md:mt-16 text-purple-300 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-sm">
            Built with ✨ whimsy and 💜 persistence
          </p>
          <Link 
            href="/scenes"
            className="text-purple-200 hover:text-white transition-colors duration-300 underline mt-2 inline-block"
          >
            View Mark Scenes →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}