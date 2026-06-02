/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CalendarDays, ArrowDown, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onOpenBookingModal: () => void;
}

export default function Hero({ onOpenBookingModal }: HeroProps) {
  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-50 overflow-hidden">
      {/* Decorative vector background lights */}
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-3xl -translate-x-12 -translate-y-12 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-3xl translate-x-12 translate-y-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Layout Description Column */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-center">
            
            {/* Trust announcement tag */}
            <div className="inline-flex self-center lg:self-start items-center space-x-2 bg-teal-50 border border-teal-100/60 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="h-4 w-4 text-brand-teal animate-spin-slow" />
              <span className="text-[10px] sm:text-xs font-bold text-brand-teal uppercase tracking-wider">
                Certified Premium Dental & Facial Aesthetics
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-brand-dark tracking-tight leading-none">
              Crafting Healthy, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-teal-600 to-brand-teal">
                Symmetrical Smiles
              </span> <br />
              With Empathy.
            </h1>

            <p className="text-slate-500 font-light text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the pinnacle of holistic micro-dentistry. We merge computerized 3D smile design with trauma-informed sensory care for a completely gentle, premium dental cycle.
            </p>

            {/* CTA action buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <motion.button
                id="hero-cta-book"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={onOpenBookingModal}
                className="w-full sm:w-auto px-7 py-4 bg-brand-teal hover:bg-brand-teal/95 text-white font-bold text-xs tracking-wider rounded-xl shadow-lg shadow-brand-teal/15 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Book Appointment Online</span>
              </motion.button>

              <motion.a
                id="hero-cta-services"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                href="#services"
                className="w-full sm:w-auto px-7 py-4 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-xs tracking-wider rounded-xl transition-all flex items-center justify-center bg-white shadow-2xs cursor-pointer"
              >
                <span>View Treatment Catalog</span>
              </motion.a>
            </div>

            {/* Quick trust metrics row - Styled as individual Bento Grid items */}
            <div className="pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-3.5 max-w-md mx-auto lg:mx-0">
              <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:border-brand-teal/20 transition-all shadow-3xs">
                <span className="block font-display text-2xl sm:text-3xl font-black text-slate-900 leading-none">14k+</span>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block mt-1.5 leading-tight">Smiles Restored</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:border-brand-teal/20 transition-all shadow-3xs">
                <span className="block font-display text-2xl sm:text-3xl font-black text-slate-900 leading-none">99.8%</span>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block mt-1.5 leading-tight">Excellent Rating</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:border-brand-teal/20 transition-all shadow-3xs">
                <span className="block font-display text-2xl sm:text-3xl font-black text-slate-900 leading-none">12+ Yrs</span>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block mt-1.5 leading-tight">Clinical Mastery</span>
              </div>
            </div>

          </div>

          {/* Right Bento visual grid column */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            
            {/* Bento Grid System styled boxes */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:max-w-none">
              
              {/* Box 1 (Span 2 to capture focal tooth image) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="col-span-2 relative rounded-3xl overflow-hidden border border-slate-200/60 bg-white shadow-md aspect-video md:aspect-auto md:h-72"
              >
                <img
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=900"
                  alt="Modern Dental Operatory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                  <span className="bg-brand-teal/90 backdrop-blur-xs text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-md">
                    Clinical Space
                  </span>
                  <span className="text-[10px] text-teal-100 font-medium">Apex Suite 404</span>
                </div>
              </motion.div>

              {/* Box 2 (Trauma informed care bento box) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:border-brand-primary/10 transition-colors flex flex-col justify-between"
              >
                <div className="h-9 w-9 bg-teal-50 text-brand-teal rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Trauma-Informed Care</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-2.5">
                    Sensory-adapted dental pods reduce procedural anxiety by 90% for clinical confidence.
                  </p>
                </div>
              </motion.div>

              {/* Box 3 (Painless guarantee bento box) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-brand-primary border border-brand-primary rounded-3xl p-5 shadow-sm text-white flex flex-col justify-between"
              >
                <div className="h-9 w-9 bg-white/10 text-white rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                  <Heart className="h-5 w-5 fill-white text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-blue-100">100% Painless Protocol</h4>
                  <p className="text-[11px] text-blue-50/80 leading-relaxed mt-2.5">
                    Ultrasonic, non-invasive diagnostic scanning avoids sharp probes for gentle treatments.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Dynamic scroll down cue indicator */}
        <div className="hidden lg:flex justify-center mt-20">
          <a
            id="scroll-down-cta"
            href="#services"
            className="flex flex-col items-center text-slate-400 hover:text-brand-teal transition-colors text-xs font-semibold focus:outline-none"
          >
            <span className="mb-2">Explore the Clinic</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </a>
        </div>

      </div>
    </section>
  );
}
