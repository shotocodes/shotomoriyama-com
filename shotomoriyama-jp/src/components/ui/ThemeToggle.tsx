// src/components/ui/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-background-alt" />
    );
  }

  const isDark = theme === 'dark';

  const handleToggle = () => {
    // Play click sound
    playClickSound();

    // Flash effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    // Create particles
    createParticles();

    // Toggle theme
    setTheme(isDark ? 'light' : 'dark');
  };

  const playClickSound = () => {
    // Create audio context for click sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Higher pitch for light mode, lower for dark mode
    oscillator.frequency.value = isDark ? 800 : 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <>
      {/* Flash overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 pointer-events-none ${
              isDark
                ? 'bg-white'
                : 'bg-black'
            }`}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        className="relative w-12 h-12 rounded-full bg-background-alt hover:bg-border transition-colors focus:outline-none focus:ring-2 focus:ring-accent overflow-visible group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotate: 15 }}
        aria-label="Toggle theme"
      >
        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 0
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
              isDark ? 'bg-yellow-400' : 'bg-blue-400'
            }`}
            style={{
              boxShadow: isDark
                ? '0 0 10px rgba(251, 191, 36, 0.8)'
                : '0 0 10px rgba(59, 130, 246, 0.8)'
            }}
          />
        ))}

        {/* Ripple effect on click */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isDark ? 'bg-yellow-400' : 'bg-blue-400'
          }`}
          initial={{ scale: 1, opacity: 0 }}
          whileTap={{
            scale: 2.5,
            opacity: [0, 0.3, 0],
            transition: { duration: 0.6 }
          }}
        />

        {/* Background glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-br from-gray-800 to-gray-900'
              : 'bg-gradient-to-br from-yellow-100 to-orange-100'
          }`}
          animate={{
            boxShadow: isDark
              ? '0 0 0px rgba(59, 130, 246, 0)'
              : '0 0 20px rgba(251, 191, 36, 0.5)',
          }}
        />

        {/* Light bulb icon */}
        <div className="relative flex items-center justify-center w-full h-full">
          <AnimatePresence mode="wait">
            {isDark ? (
              // Dark mode - off bulb
              <motion.div
                key="dark"
                initial={{ rotate: -20, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-2xl"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21h6M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            ) : (
              // Light mode - on bulb
              <motion.div
                key="light"
                initial={{ rotate: 20, opacity: 0, scale: 0.8 }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ rotate: -20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-2xl"
              >
                {/* Glowing effect */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50"
                />

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <path
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="#FCD34D"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />

                  {/* Light rays */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '12px 12px' }}
                  >
                    <line x1="12" y1="2" x2="12" y2="4" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="20" x2="12" y2="22" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="22" y1="12" x2="20" y2="12" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="4" y1="12" x2="2" y2="12" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
                  </motion.g>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          initial={{ y: -5, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          {isDark ? 'ライトモード' : 'ダークモード'}
        </motion.div>
      </motion.button>
    </>
  );
}
