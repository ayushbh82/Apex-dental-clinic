/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, PlusCircle, Activity, CalendarDays, KeyRound } from 'lucide-react';

interface NavbarProps {
  onOpenBookingModal: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth background fading when page is scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Clinicians', href: '#dentists' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Resource Hub', href: '#blog' },
    { name: 'Patient Portal', href: '#patient-portal' },
  ];

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-100 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo Brand Title */}
            <a href="#home" className="flex items-center space-x-2.5 group cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-brand-teal text-white flex items-center justify-center shadow-lg shadow-brand-teal/20 group-hover:scale-105 transition-transform">
                <Activity className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display text-base font-extrabold text-brand-dark tracking-tight block leading-none">
                  APEX DENTAL
                </span>
                <span className="text-[9px] text-brand-teal font-extrabold tracking-widest block mt-0.5 uppercase">
                  & Aesthetics Clinic
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  id={`nav-link-${link.href.replace('#', '')}`}
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-teal transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Book Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                id="navbar-book-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBookingModal}
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold tracking-wide rounded-xl shadow-md cursor-pointer transition-all flex items-center space-x-2"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Book Appointment</span>
              </motion.button>
            </div>

            {/* Mobile Hamburger toggle button */}
            <div className="lg:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpenInput(!isOpenInput)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpenInput ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Navigation drawer */}
        <AnimatePresence>
          {isOpenInput && (
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
            >
              <div className="px-4 pt-4 pb-6 space-y-3.5">
                {navLinks.map((link) => (
                  <a
                    id={`mobile-nav-link-${link.href.replace('#', '')}`}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpenInput(false)}
                    className="block text-slate-700 hover:text-brand-teal text-sm font-semibold tracking-wide py-1.5 border-b border-slate-50"
                  >
                    {link.name}
                  </a>
                ))}

                {/* Mobile specific Reservation Trigger */}
                <div className="pt-3">
                  <button
                    id="mobile-nav-book-cta"
                    onClick={() => {
                      setIsOpenInput(false);
                      onOpenBookingModal();
                    }}
                    className="w-full py-3 bg-brand-teal text-white text-xs font-bold tracking-wide rounded-xl flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <CalendarDays className="h-4.5 w-4.5" />
                    <span>Book Online Session</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
