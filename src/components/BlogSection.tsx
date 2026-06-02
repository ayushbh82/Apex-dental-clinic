/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, User, Clock, ArrowRight, X, Heart } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl -translate-x-12 translate-y-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full inline-block">
            Evidence-Based Dentistry
          </span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-brand-dark mt-4 tracking-tight leading-tight">
            Patient Wellness & Resource Academy
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Deep dive into dental biology, clinical research guides, and expert hygiene techniques compiled by our lead clinicians.
          </p>
        </div>

        {/* 3 Blog Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post, index) => {
            const numLikes = likes[post.id] || 0;
            return (
              <motion.article
                id={`blog-article-${post.id}`}
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Aspect ratio bounding box for image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      referrerPolicy="no-referrer"
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                    />
                    {/* Category pill on image */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-dark/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body elements */}
                  <div className="p-6 md:p-8">
                    {/* Timeline metadata */}
                    <div className="flex items-center space-x-3 text-slate-400 text-[10px] uppercase tracking-wide mb-3 font-semibold">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-brand-teal" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-brand-teal" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-teal transition-colors leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs mt-3 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer metadata details */}
                <div className="px-6 md:px-8 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-brand-teal font-extrabold text-[10px]">
                      {post.author.name.split(' ')[1][0]}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {post.author.name}
                    </span>
                  </div>

                  {/* Likes trigger, stopPropagation to avoid full click */}
                  <button
                    id={`like-btn-${post.id}`}
                    onClick={(e) => handleLike(post.id, e)}
                    className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center space-x-1.5 transition-colors cursor-pointer text-[11px]"
                    title="Like article"
                  >
                    <Heart className={`h-3.5 w-3.5 ${numLikes > 0 ? 'fill-rose-500 text-rose-500 scale-110' : ''} transition-all`} />
                    <span className="font-mono text-[10px]">{numLikes}</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Immersive Expanded Blog Article modal */}
      <AnimatePresence>
        {selectedPost && (
          <div id="blog-modal-overlay" className="fixed inset-0 z-55 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              
              {/* Close Button details */}
              <button
                id="close-blog-modal"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-600 md:bg-white/15 md:hover:bg-white/25 md:text-white transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Embedded Banner image */}
              <div className="relative h-44 sm:h-56 bg-slate-100 flex-shrink-0">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-brand-teal text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                    {selectedPost.category}
                  </span>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl mt-2 tracking-tight">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              {/* Blog Article Body details (Scroller) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                
                {/* Author attribution metadata layout */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2 text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-brand-teal font-black text-xs">
                      {selectedPost.author.name.split(' ')[1][0]}
                    </span>
                    <div>
                      <span className="font-bold text-slate-800 block">{selectedPost.author.name}</span>
                      <span className="text-[10px] text-slate-400 block">{selectedPost.author.role}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-slate-400 text-[10px] font-semibold uppercase tracking-wide">
                    <span>Published: {selectedPost.date}</span>
                    <span>•</span>
                    <span>Read length: {selectedPost.readTime}</span>
                  </div>
                </div>

                {/* Formatted body paragraph space */}
                <div className="text-slate-600 space-y-4 text-[13px] leading-relaxed font-light whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>

              {/* Footer dismissal drawer */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 sm:px-8 py-4 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <button
                    id="blog-modal-like-indicator"
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className="p-1 rounded-full hover:bg-rose-100 text-rose-500 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                    <span className="font-mono text-xs font-bold text-slate-600">{likes[selectedPost.id] || 0} Likes</span>
                  </button>
                </div>
                
                <button
                  id="dismiss-blog-modal-btn"
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Finished Reading
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
