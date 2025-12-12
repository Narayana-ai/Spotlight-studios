import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkGallery } from './components/WorkGallery';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AmbientBackground } from './components/ui/AmbientBackground';

const App: React.FC = () => {
  // Smooth scroll behavior fix for Safari/Mobile
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-brand-orange selection:text-black font-sans relative">
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <WorkGallery />
        <Services />
        <Contact />
      </main>
    </div>
  );
};

export default App;