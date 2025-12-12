import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Camera, Heart } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Micro-parallax: Small amplitude for high performance & subtle feel
  const yMain = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yGhost = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);

  return (
    <section ref={containerRef} id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <Reveal direction="right">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                THE MAN BEHIND <br/>
                <span className="text-brand-orange">THE LENS.</span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.2} direction="right">
              <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-brand-orange pl-6">
                "Spotlight Studios isn't about pressing a shutter button. It's about freezing time. 
                Founded by Vicky Kumar, we blend rigorous technical precision with raw human emotion 
                to craft photos, films, and tangible memories that defy the ordinary."
              </p>
            </Reveal>

            <div className="flex flex-col gap-6">
              {[
                { icon: Camera, title: 'Technical Mastery', desc: 'High-end gear, cinematic color grading.' },
                { icon: Heart, title: 'Emotional Intelligence', desc: 'Capturing the unscripted micro-moments.' },
                { icon: Award, title: 'Premium Output', desc: 'Museum-quality prints and custom artifacts.' }
              ].map((item, idx) => (
                <Reveal key={idx} delay={0.3 + (idx * 0.1)} direction="up">
                  <div 
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-brand-orange/30 transition-colors rounded-lg"
                  >
                    <item.icon className="text-brand-orange" size={24} />
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm tracking-wide">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Visual/Image Abstract with Micro-Parallax */}
          <div className="order-1 md:order-2 relative h-[600px] w-full flex items-center justify-center">
             
             {/* Ghost Layer (Micro-parallax) */}
             <motion.div 
                style={{ y: yGhost, rotate: rotate }} 
                className="absolute inset-0 bg-white/5 rounded-sm z-0 scale-[0.92] opacity-40 border border-white/10 will-change-transform" 
             />
             
             {/* Main Image Layer */}
             <motion.div 
                style={{ y: yMain }}
                className="relative w-full h-[90%] overflow-hidden group rounded-sm z-10 shadow-2xl will-change-transform"
             >
                <div className="absolute inset-0 bg-brand-orange/10 z-10 mix-blend-overlay" />
                <img 
                  src="https://i.postimg.cc/wBrgxxHJ/1000085134.jpg" 
                  alt="Vicky Kumar - Founder" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
             </motion.div>
             
             {/* Floating Label */}
             <motion.div 
                style={{ y: yGhost }}
                className="absolute bottom-[5%] right-[-10px] z-20 bg-black/90 backdrop-blur-md border border-white/10 p-6 shadow-2xl"
             >
                <p className="font-display text-4xl font-bold text-brand-orange mb-2">VICKY KUMAR</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">Founder & Lead Creative</p>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};