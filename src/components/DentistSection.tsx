/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, GraduationCap, X, Heart, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { Dentist } from '../types';
import { DENTISTS } from '../data';

interface DentistSectionProps {
  onBookWithDoctor: (doctorName: string) => void;
}

export default function DentistSection({ onBookWithDoctor }: DentistSectionProps) {
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);

  const handleBookClick = (doctorName: string) => {
    setSelectedDentist(null);
    onBookWithDoctor(doctorName);
  };

  return (
    <section id="dentists" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative architectural circle to convey a luxury aesthetic */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full inline-block">
            Clinical Leadership
          </span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-brand-dark mt-4 tracking-tight leading-tight">
            Meet Our Board-Certified Clinicians
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Leading experts merging compassionate micro-dentistry with outstanding aesthetic craftsmanship.
          </p>
        </div>

        {/* Dentist cards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DENTISTS.map((dentist, index) => (
            <motion.div
              id={`dentist-card-${dentist.id}`}
              key={dentist.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame with curved upper border */}
              <div className="relative h-72 overflow-hidden bg-slate-50">
                <img
                  referrerPolicy="no-referrer"
                  src={dentist.imageUrl}
                  alt={dentist.name}
                  className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-500"
                />
                
                {/* Specialty Floating Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-brand-dark/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                    {dentist.specialty}
                  </span>
                </div>
              </div>

              {/* Body details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                    {dentist.name}
                  </h3>
                  <p className="text-xs text-brand-teal font-semibold mt-1">
                    {dentist.title}
                  </p>
                  <p className="text-slate-505 text-xs mt-4 line-clamp-3 leading-relaxed">
                    {dentist.bio}
                  </p>
                </div>

                {/* Interactive button indicators */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  {/* Education snippet */}
                  <span className="inline-flex items-center text-[10px] text-slate-400 font-bold">
                    <GraduationCap className="h-3.5 w-3.5 text-brand-teal mr-1.5" />
                    <span>{dentist.education.split(' ')[0]} Alum</span>
                  </span>

                  <button
                    id={`view-bio-${dentist.id}`}
                    onClick={() => setSelectedDentist(dentist)}
                    className="text-xs font-bold text-brand-primary hover:text-brand-teal transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>View Biography</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dentist Biography Details modal */}
      <AnimatePresence>
        {selectedDentist && (
          <div id="dentist-modal-overlay" className="fixed inset-0 z-55 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDentist(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              
              {/* Close Button details */}
              <button
                id="close-dentist-modal"
                onClick={() => setSelectedDentist(null)}
                className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-600 md:text-white md:bg-white/10 md:hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close bio"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Side image column */}
              <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-slate-200">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedDentist.imageUrl}
                  alt={selectedDentist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-brand-teal text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                    {selectedDentist.specialty}
                  </span>
                </div>
              </div>

              {/* Side Text Details details */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-slate-900">
                      {selectedDentist.name}
                    </h3>
                    <p className="text-xs text-brand-teal font-semibold mt-0.5">
                      {selectedDentist.title}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Biography & Focus
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed mt-1">
                      {selectedDentist.bio}
                    </p>
                  </div>

                  {/* Education details */}
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400 mr-1" />
                      <span>Alma Mater</span>
                    </h4>
                    <p className="text-slate-700 font-medium text-xs">
                      {selectedDentist.education}
                    </p>
                  </div>

                  {/* Credentials / Awards list */}
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                      <Award className="h-3.5 w-3.5 text-brand-accent mr-1 animate-pulse" />
                      <span>Certifications & Credentials</span>
                    </h4>
                    <ul className="space-y-1">
                      {selectedDentist.credentials.map((cred, i) => (
                        <li key={i} className="flex items-center space-x-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span>{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Trigger Button */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-end items-stretch">
                  <button
                    id="dentist-dismiss-button"
                    onClick={() => setSelectedDentist(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-center"
                  >
                    Close Profile
                  </button>
                  <button
                    id={`book-doctor-btn-${selectedDentist.id}`}
                    onClick={() => handleBookClick(selectedDentist.name)}
                    className="px-5 py-2 bg-brand-primary hover:bg-brand-primary/95 transition-all text-white rounded-lg text-xs font-semibold shadow-md cursor-pointer text-center"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
