import React, { useState } from 'react';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, service, message } = formData;

    if (!name || !phone || !service) {
      alert("Please fill in your Name, Phone Number, and Service.");
      return;
    }

    let msg = `Hi, my name is ${name}. I want to enquire about ${service}. \nMy contact number is ${phone}.`;
    
    if (message.trim()) {
      msg += `\nAdditional message: ${message}`;
    }

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/917277470711?text=${encodedMsg}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-brand-dark border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          {/* Form */}
          <div>
            <Reveal>
              <h2 className="font-display text-5xl font-bold mb-2">START A <span className="text-brand-orange">PROJECT</span></h2>
              <p className="text-gray-400 mb-12">Ready to create something timeless? Reach out.</p>
            </Reveal>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <Reveal delay={0.2}>
                <div className="group">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-brand-orange transition-colors placeholder-gray-600"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="group">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-brand-orange transition-colors placeholder-gray-600"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="group">
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-brand-orange transition-colors text-gray-400"
                  >
                    <option className="bg-black text-gray-500" value="">Select Service</option>
                    <option className="bg-black text-white" value="Wedding Photography">Wedding Photography</option>
                    <option className="bg-black text-white" value="Portrait Session">Portrait Session</option>
                    <option className="bg-black text-white" value="Custom Gift Order">Custom Gift Order</option>
                    <option className="bg-black text-white" value="Cinematic Film">Cinematic Film</option>
                  </select>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="group">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Additional Message (Optional)" 
                    rows={1}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-brand-orange transition-colors placeholder-gray-600 resize-none"
                  />
                </div>
              </Reveal>
              
              <Reveal delay={0.6} className="pt-8">
                 <MagneticButton onClick={() => {}} className="w-full md:w-auto bg-white text-black px-12 py-4 font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors">
                    Send Request
                 </MagneticButton>
              </Reveal>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start h-full pt-12 lg:pt-0 lg:pl-12">
            <div className="space-y-8">
              <Reveal delay={0.2}>
                <div className="flex items-start gap-6">
                  <MapPin className="text-brand-orange mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest mb-2">Studio</h4>
                    <p className="text-gray-400">New Atwarpur Lalu Path<br/>Patna-804453 (Pillar-30)</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-start gap-6">
                  <Phone className="text-brand-orange mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest mb-2">Phone</h4>
                    <p className="text-gray-400">+91 7277470711</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex items-start gap-6">
                  <Mail className="text-brand-orange mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest mb-2">Email</h4>
                    <p className="text-gray-400">pixelsstudio7277@gmail.com</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

        </div>

        {/* Footer Section */}
        <Reveal delay={0.6} width="100%">
          <div className="border-t border-white/10 pt-16 flex flex-col items-center justify-center text-center w-full pb-8">
            
            {/* Brand */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-3xl tracking-widest text-white">
                SPOTLIGHT<span className="text-brand-orange">STUDIOS</span>
              </h3>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-8 mb-12">
              <a href="https://www.instagram.com/pixels__studio_?utm_source=qr&igsh=MXZ1ZmF5NDEzM2c0Mw==" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-brand-orange hover:bg-brand-orange transition-all duration-300">
                  <Instagram size={20} className="text-gray-400 group-hover:text-black transition-colors" />
                </div>
              </a>
              <a href="https://wa.me/917277470711" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-brand-orange hover:bg-brand-orange transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-black transition-colors">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
              </a>
            </div>

            {/* Credits & Copyright - Refined per KRIVA specs */}
            <div className="flex flex-col items-center justify-center w-full mt-8">
              <p className="text-sm text-white font-normal tracking-wide text-center">
                Crafted with ❤️ by{' '}
                <a 
                  href="https://www.instagram.com/grpx_ansine?igsh=MXhha2Q4bnJtN3o5Ng==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-block font-medium pb-1 group"
                >
                  GRPXASINE
                  {/* Subtle curved underline: created via border-bottom and border-radius */}
                  <span className="absolute bottom-0 left-0 w-full h-[3px] border-b border-white/60 rounded-[100%] group-hover:border-white transition-colors duration-300" />
                </a>
              </p>
              <p className="text-xs text-gray-500 font-normal tracking-normal text-center mt-3">
                © 2025 All Rights Reserved.
              </p>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};