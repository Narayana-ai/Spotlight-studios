import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const WorkGallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  // Duplicate projects 4x to ensure we have enough buffer for seamless looping on large screens
  const galleryItems = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    // Speed doubled from 1.5 to 3.0 as requested
    const speed = 3; 

    const animate = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const handleTouchStart = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    // Wait for potential momentum scroll to settle before resuming auto-scroll
    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section id="work" className="relative py-32 bg-brand-dark overflow-hidden border-t border-white/5">
      
      {/* Header Content */}
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between relative z-10">
        <div className="max-w-2xl">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-display text-4xl md:text-7xl font-bold text-white mb-4">
              SELECTED <span className="text-brand-orange">WORKS</span>
            </h2>
            <div className="h-1 w-24 bg-brand-orange mb-6" />
            <p className="text-gray-400 text-lg font-light max-w-md">
              A curated selection of our most defining moments. Swipe to explore the archive.
            </p>
          </motion.div>
        </div>
        
        {/* Navigation / Link */}
        <motion.a 
          href="#contact"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex items-center gap-3 group cursor-pointer mt-8 md:mt-0"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gray-400 group-hover:text-brand-orange transition-colors">Full Archive</span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-black transition-all duration-300">
             <ArrowRight size={16} />
          </div>
        </motion.a>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full group/marquee">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-brand-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-brand-dark to-transparent z-20 pointer-events-none" />

        <div 
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-auto pl-6 pr-6 pb-8 select-none
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                     cursor-grab active:cursor-grabbing perspective-1000
                     touch-pan-x"
          style={{ scrollBehavior: 'auto' }} // Critical: Prevent smooth scroll from fighting JS loop
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {galleryItems.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>

      {/* Mobile Bottom Link */}
      <div className="container mx-auto px-6 mt-4 md:hidden">
         <a href="#contact" className="flex items-center gap-2 text-brand-orange text-sm uppercase tracking-widest font-bold">
            View All Projects <ArrowRight size={16} />
         </a>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="relative w-[85vw] md:w-[600px] h-[50vh] md:h-[600px] flex-shrink-0 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full bg-gray-900 border border-white/5 rounded-sm overflow-hidden relative group shadow-2xl"
      >
        {/* Image Layer */}
        <div className="absolute inset-0 overflow-hidden transform-gpu" style={{ transform: "translateZ(0px)" }}>
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
            loading="lazy"
            draggable={false} 
          />
        </div>
        
        {/* Depth Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" style={{ transform: "translateZ(20px)" }} />

        {/* Floating Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col items-start transform transition-transform duration-500 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
           <div className="overflow-hidden mb-3">
               <p className="text-brand-orange text-xs uppercase tracking-[0.3em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 drop-shadow-lg">
                  {project.category}
               </p>
           </div>
           <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-500 drop-shadow-lg">
              {project.title}
           </h3>
           <div className="w-12 h-[1px] bg-white/50 group-hover:w-full group-hover:bg-brand-orange transition-all duration-700 delay-100 box-shadow-neon" />
        </div>
        
        {/* 3D Glass Glare */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none mix-blend-overlay" style={{ transform: "translateZ(30px)" }} />
      </motion.div>
    </motion.div>
  );
};