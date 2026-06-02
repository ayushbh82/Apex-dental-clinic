/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Search, Filter } from 'lucide-react';
import { Testimonial } from '../types';
import { TESTIMONIALS } from '../data';

export default function TestimonialSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract unique treatment names for filtering tags
  const treatmentCategories = useMemo(() => {
    const list = new Set<string>();
    TESTIMONIALS.forEach(t => list.add(t.treatment));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    return TESTIMONIALS.filter(item => {
      const matchCategory = selectedFilter === 'All' || item.treatment === selectedFilter;
      const matchSearch = item.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.treatment.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedFilter, searchTerm]);

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full inline-block">
            Client Outcomes
          </span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-brand-dark mt-4 tracking-tight leading-tight">
            Endorsements From Satisfied Patients
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Read transparent, real-world case experiences from families and professionals straight from our aesthetic registries.
          </p>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="mb-12 space-y-4 max-w-4xl mx-auto bg-slate-50 border border-slate-100 p-4 md:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="search-testimonials"
                type="text"
                placeholder="Search treatments or feedback keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition-all"
              />
            </div>

            {/* Filter label indicator */}
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500">
              <Filter className="h-4 w-4 text-brand-teal" />
              <span>Filter Treatments:</span>
            </div>
          </div>

          {/* Tag Selectors */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50">
            {treatmentCategories.map((cat) => (
              <button
                id={`filter-tag-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedFilter === cat
                    ? 'bg-brand-teal text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat === 'All' ? 'All Treatment Successes' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Masonry or Grid list */}
        <div className="max-w-6xl mx-auto">
          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredTestimonials.map((testimonial) => (
                  <motion.div
                    id={`testimonial-bubble-${testimonial.id}`}
                    key={testimonial.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm flex flex-col justify-between hover:border-brand-teal/25 transition-colors"
                  >
                    <div>
                      {/* Rating block & treatment tag */}
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <div className="flex items-center space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating 
                                  ? 'fill-brand-accent text-brand-accent' 
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="bg-teal-50 border border-teal-100/60 text-brand-teal text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          {testimonial.treatment}
                        </span>
                      </div>

                      {/* Review Paragraph */}
                      <p className="text-slate-600 italic text-xs leading-relaxed relative">
                        <MessageSquare className="h-8 w-8 text-indigo-100 absolute -top-4 -left-2 rotate-180 opacity-40 pointer-events-none" />
                        <span className="relative z-10">"{testimonial.reviewText}"</span>
                      </p>
                    </div>

                    {/* Author block details */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center space-x-3.5">
                      <img
                        referrerPolicy="no-referrer"
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover border-2 border-brand-teal/20 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">
                          {testimonial.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Verified Patient Review • {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Empty reviews status details */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-slate-400 text-xs"
            >
              No verified patient endorsements match your keyword search term.
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
