import React from 'react';
import { SERVICES } from '../constants';
import { NeonCard } from './ui/NeonCard';
import { Reveal } from './ui/Reveal';
import { Camera, Film, Heart, Box, Sparkles, RotateCw, Coffee, Image, Smartphone } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  camera: Camera,
  film: Film,
  heart: Heart,
  box: Box,
  sparkles: Sparkles,
  'rotate-cw': RotateCw,
  coffee: Coffee,
  image: Image,
  smartphone: Smartphone,
};

export const Services: React.FC = () => {
  const photoServices = SERVICES.filter(s => s.category === 'photography');

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section 1: Photography */}
        <div className="mb-0">
          <Reveal className="mb-12 mx-auto md:mx-0" direction="right">
            <h2 className="font-display text-4xl font-bold text-center md:text-left">
              STUDIO <span className="text-brand-orange">SERVICES</span>
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoServices.map((service, idx) => {
              const Icon = iconMap[service.iconName] || Camera;
              // Alternating directions: Up/Down flow
              const dir = idx % 2 === 0 ? 'up' : 'down'; 
              return (
                <Reveal key={service.id} delay={idx * 0.1} direction={dir} className="h-full">
                  <NeonCard className="h-64 flex flex-col justify-end">
                    <Icon className="text-brand-orange mb-4" size={32} />
                    <h3 className="font-display text-xl font-bold uppercase mb-2">{service.title}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Professional Grade</p>
                  </NeonCard>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};