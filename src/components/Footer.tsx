/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock, Heart, Activity } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const operatingHours = [
    { day: 'Monday', hours: '8:00 AM - 7:00 PM', status: 'Open' },
    { day: 'Tuesday', hours: '8:00 AM - 7:00 PM', status: 'Open' },
    { day: 'Wednesday', hours: '8:00 AM - 7:00 PM', status: 'Open' },
    { day: 'Thursday', hours: '8:00 AM - 7:00 PM', status: 'Open' },
    { day: 'Friday', hours: '8:00 AM - 6:00 PM', status: 'Open' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM', status: 'Limited' },
    { day: 'Sunday', hours: 'Closed - Emergencies Only', status: 'Closed' },
  ];

  return (
    <footer id="contact" className="bg-brand-dark text-slate-300 pt-24 pb-12 relative overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Main Footer layout: Contact + Hours + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Info, Branding, Contacts (Lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-brand-teal text-white flex items-center justify-center">
                  <Activity className="h-4.5 w-4.5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-white tracking-widest block leading-none">
                    APEX DENTAL
                  </h3>
                  <span className="text-[8px] text-brand-teal font-extrabold tracking-widest block mt-0.5 uppercase">
                    & Aesthetics Clinic
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Setting clinical benchmarks in aesthetic prosthodontics and pain-free preventative dentistry, matching precision treatment sequences with biological harmony.
              </p>
            </div>

            {/* Direct Contact info */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-3.5 text-xs text-slate-300">
                <MapPin className="h-4.5 w-4.5 text-brand-teal flex-shrink-0" />
                <span>600 Fifth Avenue, Suite 1200, New York, NY 10020</span>
              </div>
              
              <div className="flex items-center space-x-3.5 text-xs text-slate-300">
                <Phone className="h-4.5 w-4.5 text-brand-teal flex-shrink-0" />
                <a href="tel:+12125550190" className="hover:text-white transition-colors">
                  +1 (212) 555-0190
                </a>
              </div>

              <div className="flex items-center space-x-3.5 text-xs text-slate-300">
                <Mail className="h-4.5 w-4.5 text-brand-teal flex-shrink-0" />
                <a href="mailto:concierge@apexdentalhealth.com" className="hover:text-white transition-colors">
                  concierge@apexdentalhealth.com
                </a>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex space-x-3 pt-2">
              <a
                id="social-fb"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-brand-primary flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Facebook link"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                id="social-ig"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-brand-primary flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Instagram link"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                id="social-li"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-brand-primary flex items-center justify-center transition-colors cursor-pointer"
                aria-label="LinkedIn link"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Operating hours grid (Lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4.5 w-4.5 text-brand-teal" />
              <h4 className="font-display text-sm font-bold text-white tracking-wider uppercase">
                Clinical Hours
              </h4>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/60 divide-y divide-slate-800/40">
              {operatingHours.map((sched) => (
                <div key={sched.day} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0 text-xs">
                  <span className="font-semibold text-slate-300">{sched.day}</span>
                  <div className="flex items-center space-x-2 text-right">
                    <span className="font-mono text-slate-400 text-[11px]">{sched.hours}</span>
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                      sched.status === 'Open' 
                        ? 'bg-emerald-500' 
                        : sched.status === 'Limited' 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Live interactive Google Map frame (Lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display text-sm font-bold text-white tracking-wider uppercase flex items-center space-x-2">
              <MapPin className="h-4.5 w-4.5 text-brand-teal" />
              <span>Location Coordinates</span>
            </h4>

            {/* Embedded Google Maps container */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 relative">
              <iframe
                id="maps-iframe-footer"
                title="Apex Dental Clinic Coordinates"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x89c258fec067d5ff%3A0xf64a51e60f1ad9e9!2s600%205th%20Ave%20Suite%201200%2C%20New%20York%2C%20NY%2010020!5e0!3m2!1sen!2sus!4v1685718290312!5m2!1sen!2sus"
                className="w-full h-full border-0 grayscale opacity-80 hover:opacity-100 transition-opacity"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Closing details and disclosures row */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Apex Dental & Aesthetics. All Rights Reserved. General dentistry, micro-orthodontics and dermal facial rejuvenation registries.</p>
          
          <div className="flex items-center space-x-1.5 text-[11px]">
            <span>Engineered with clinical precision</span>
            <Heart className="h-3 w-3 text-brand-teal fill-brand-teal" />
          </div>
        </div>

      </div>
    </footer>
  );
}
