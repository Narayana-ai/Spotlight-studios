import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  blur?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  width = "fit-content",
  delay = 0,
  className = "",
  direction = "up",
  duration = 0.8,
  blur = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const offset = 50; 
  
  // 3D-ish entry variants
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -offset : direction === "right" ? offset : 0,
      y: direction === "up" ? offset : direction === "down" ? -offset : 0,
      // Subtle 3D rotation based on direction
      rotateX: direction === "up" ? 10 : direction === "down" ? -10 : 0,
      rotateY: direction === "left" ? -10 : direction === "right" ? 10 : 0,
      scale: 0.95,
      filter: blur ? "blur(8px)" : "none",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        delay: delay,
        type: "spring",
        damping: 25,
        stiffness: 100,
      }
    }
  };

  return (
    <div ref={ref} style={{ width }} className={`relative perspective-1000 ${className}`}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {children}
      </motion.div>
    </div>
  );
};