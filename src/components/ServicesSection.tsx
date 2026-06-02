/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Layers, Compass, Star, Clock, Tag, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceName: string) => void;
}

// Icon mapper for dynamic lists
const getIcon = (name: string, className = "h-6 w-6") => {
  switch (name) {
    case 'ShieldAlert':
      return <Shield className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Activity':
      return <Layers className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Star':
      return <Star className={className} />;
    default:
      return <Shield className={className} />;
  }
};

export default function ServicesSection({ onSelectServiceToBook }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleBookFromService = (serviceName: string) => {
    setSelectedService(null);
    onSelectServiceToBook(serviceName);
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with high-end typography */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full inline-block">
            Elite Dental Architecture
          </span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-brand-dark mt-4 tracking-tight leading-tight">
            Premium Treatment Catalog
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Experience therapeutic clinical dental programs, merging scientific biomechanics with highly polished aesthetic designs.
          </p>
        </div>

        {/* Interactive Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const isFeatured = service.id === 'cosmetic';
            return (
              <motion.div
                id={`service-card-${service.id}`}
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px -5px rgb(0 0 0 / 0.05), 0 5px 15px -7px rgb(0 0 0 / 0.05)" 
                }}
                onClick={() => setSelectedService(service)}
                className={`group p-8 rounded-3xl border border-slate-200/60 bg-white hover:border-brand-teal/30 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isFeatured ? 'md:col-span-2 relative overflow-hidden bg-gradient-to-br from-white to-teal-50/25' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    {/* Icon Wrapper */}
                    <div className="h-12 w-12 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center mb-6 group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                      {getIcon(service.iconName, "h-5 w-5")}
                    </div>
                    {isFeatured && (
                      <span className="text-[9px] font-bold tracking-widest uppercase text-brand-teal bg-teal-100/60 px-2.5 py-1 rounded-md">
                        Popular Choice
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-200">
                    {service.name}
                  </h3>
                  
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed max-w-2xl">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bottom trigger tag */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-brand-primary transition-colors">
                    {service.price}
                  </span>
                  
                  <span className="text-xs font-semibold text-brand-teal flex items-center group-hover:translate-x-1 transition-transform duration-200">
                    <span>Explore Treatment</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div id="service-modal-overlay" className="fixed inset-0 z-55 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                id="close-service-modal"
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header block */}
              <div className="flex items-start space-x-4 pr-8">
                <div className="h-12 w-12 flex-shrink-0 bg-teal-50 text-brand-teal rounded-xl flex items-center justify-center">
                  {getIcon(selectedService.iconName, "h-6 w-6")}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded">
                    Clinical Program
                  </span>
                  <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
                    {selectedService.name}
                  </h3>
                </div>
              </div>

              {/* Main Content scroller */}
              <div className="space-y-6 mt-6 max-h-[60vh] overflow-y-auto pr-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Program Overview
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedService.fullDescription}
                  </p>
                </div>

                {/* Duration and Pricing info banner */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <div className="flex items-center space-x-2.5">
                    <Clock className="h-4 w-4 text-brand-teal" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">ESTIMATED TIME</span>
                      <span className="text-xs font-bold text-slate-700">{selectedService.duration || 'Session-dependent'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2.5 border-l border-slate-200 pl-4">
                    <Tag className="h-4 w-4 text-brand-teal" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">REFERENCE PRICE</span>
                      <span className="text-xs font-bold text-slate-700">{selectedService.price || 'Quotes available'}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Premium Capabilities & Perks
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-end">
                <button
                  id="modal-cancel-service-btn"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-center"
                >
                  Dismiss Details
                </button>
                <button
                  id={`modal-book-${selectedService.id}`}
                  onClick={() => handleBookFromService(selectedService.name)}
                  className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal/95 transition-all text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                >
                  <span>Request This Treatment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
