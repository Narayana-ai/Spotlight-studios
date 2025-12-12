import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects for scrolling
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  // Mouse movement for subtle parallax interactions
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  }

  const moveX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const moveXReverse = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const moveYReverse = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden perspective-1000 bg-black"
    >
      
      {/* Cinematic Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         {/* Deep Space Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#0a0a0a]" />

         {/* Volumetric Light Source (Top Right) */}
         <motion.div 
            style={{ x: moveX, y: moveY, scale: scaleBg }}
            className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow"
         />
         
         {/* Ambient Fill (Bottom Left) */}
         <motion.div 
            style={{ x: moveXReverse, y: moveYReverse }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"
         />

         {/* Moving Spotlight Beam (Cinematic Touch) */}
         <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] opacity-[0.03] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#FFFFFF_50%,#000000_100%)] mix-blend-overlay pointer-events-none"
         />
         
         {/* Texture Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         
         {/* Vignette */}
         <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none" />
      </div>

      {/* Abstract 3D Object: "The Lens" */}
      <motion.div
        style={{ 
            x: moveXReverse,
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]),
            rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
        }}
        className="absolute right-[10%] top-[20%] w-[500px] h-[500px] perspective-1000 hidden lg:flex items-center justify-center pointer-events-none z-0"
      >
        {/* Ring 1: Outer Static Glow */}
        <div className="absolute w-full h-full border border-white/5 rounded-full shadow-[0_0_50px_rgba(255,77,0,0.05)]" />
        
        {/* Ring 2: Slow Rotation */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[90%] h-[90%] border border-white/10 rounded-full border-dashed opacity-30" 
        />

        {/* Ring 3: Counter Rotation */}
        <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[70%] h-[70%] rounded-full border border-brand-orange/20 opacity-50"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_10px_#FF4D00]" />
        </motion.div>

        {/* Inner Core */}
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[40%] h-[40%] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md rounded-full border border-white/10 shadow-inner"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center perspective-1000">
          
          <Reveal delay={0.2} direction="down" blur={true}>
            <div className="flex items-center gap-3 mb-8 border border-white/10 bg-black/40 backdrop-blur-xl px-5 py-2 rounded-full shadow-[0_0_20px_rgba(255,77,0,0.1)] hover:border-brand-orange/50 transition-colors duration-300">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-[pulse_2s_infinite] shadow-[0_0_10px_#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-medium">Spotlight Studios</span>
            </div>
          </Reveal>

          <div className="perspective-1000 mb-8 relative">
             {/* Text Glow Behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-orange/20 blur-[80px] rounded-full -z-10 opacity-50" />
             
            <Reveal delay={0.4} direction="up" blur={true}>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter transform-gpu mix-blend-normal">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl">CAPTURE</span>
                <span className="block text-brand-orange neon-text-shadow relative z-10">MOMENTS.</span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.6} direction="up" blur={true}>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed font-light mix-blend-plus-lighter">
              Premium photography & cinematic custom creations. 
              <br/>We don't just shoot. We engineer memories.
            </p>
          </Reveal>

          <Reveal delay={0.8} direction="up">
            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton className="bg-brand-orange text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_30px_rgba(255,77,0,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                View Portfolio
              </MagneticButton>
              <MagneticButton className="border border-white/20 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                Contact Studio
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Scrolling Arrow */}
      <motion.div 
        initial={{ opacity: 0, x: "-50%" }} 
        animate={{ opacity: 1, y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 left-1/2 text-brand-orange/50 mix-blend-screen cursor-pointer hover:text-brand-orange transition-colors z-20"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};