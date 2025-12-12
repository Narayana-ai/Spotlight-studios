import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Use MotionValues to track state without triggering React re-renders (Performance Fix)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the "magnetic" pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Apply movement (Sensitivity 0.35)
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group overflow-hidden cursor-none touch-manipulation ${className}`}
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
      
      {/* Optimized Glow: Uses opacity only to avoid layout thrashing */}
      <div className="absolute inset-0 border-2 border-brand-orange opacity-0 group-hover:opacity-100 rounded-[inherit] transition-opacity duration-300 pointer-events-none will-change-[opacity]" />
      
      {/* Sheen effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-brand-orange to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
    </motion.button>
  );
};