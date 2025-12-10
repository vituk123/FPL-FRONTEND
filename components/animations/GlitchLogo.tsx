
import React from 'react';
import { motion } from 'framer-motion';

interface GlitchLogoProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}

export const GlitchLogo: React.FC<GlitchLogoProps> = ({ src, alt, className = "", size = 160 }) => {
  // Random jitter animation for the glitch layers
  const glitchAnimation = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: {
      opacity: [0, 1, 0, 0, 1, 0],
      x: [0, -2, 2, -5, 5, 0],
      y: [0, 1, -1, 0, 0, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        repeatDelay: Math.random() * 3 + 2, // Random delay between glitches
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      {/* Cyan Layer (Glitch) */}
      <motion.img
        src={src}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-contain opacity-70 mix-blend-screen"
        style={{ filter: 'hue-rotate(90deg) blur(1px)' }}
        variants={glitchAnimation}
        initial="hidden"
        animate="visible"
      />
      
      {/* Magenta Layer (Glitch) */}
      <motion.img
        src={src}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-contain opacity-70 mix-blend-screen"
        style={{ filter: 'hue-rotate(-90deg) blur(1px)' }}
        variants={{
          ...glitchAnimation,
          visible: {
            ...glitchAnimation.visible,
            x: [0, 2, -2, 5, -5, 0], // Opposite direction
            transition: {
                ...glitchAnimation.visible.transition,
                delay: 0.1 // Slight offset
            }
          }
        }}
        initial="hidden"
        animate="visible"
      />

      {/* Main Logo */}
      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_0_rgba(29,30,28,0.2)]"
      />
      
      {/* Scanline Overlay for Logo */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20 rounded-full" />
    </div>
  );
};
