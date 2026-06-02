/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope, CheckCircle2, FileText } from 'lucide-react';
import { Appointment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSuccess: (newAppointment: Appointment) => void;
  preSelectedReason?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  onBookSuccess,
  preSelectedReason = ''
}: BookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [reason, setReason] = useState(preSelectedReason || 'General Checkup');
  const [notes, setNotes] = useState('');
  
  // Validation and process states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Auto-fill form values pre-selected reason if it changes
  React.useEffect(() => {
    if (preSelectedReason) {
      setReason(preSelectedReason);
    }
  }, [preSelectedReason]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) {
      newErrors.phone = 'Please provide a valid phone number';
    }
    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    } else {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.preferredDate = 'Appointment date cannot be in the past';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate processing delay for professional aesthetics
    setTimeout(() => {
      const appointment: Appointment = {
        id: 'apt-' + Math.random().toString(36).substr(2, 9),
        fullName,
        email,
        phone,
        date: preferredDate,
        timeSlot: preferredTimeSlot,
        reason,
        notes,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      setCreatedAppointment(appointment);
      onBookSuccess(appointment);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setPreferredDate('');
      setPreferredTimeSlot('Morning');
      setReason('General Checkup');
      setNotes('');
    }, 1200);
  };

  const handleFinish = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl z-10"
          >
            {/* Header background band */}
            <div className="bg-brand-primary p-6 text-white text-center relative">
              <button
                id="close-booking-modal"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h3 className="font-display text-2xl font-bold tracking-tight">
                {showSuccess ? 'Appointment Scheduled' : 'Request Appointment'}
              </h3>
              <p className="text-blue-100 text-xs mt-1.5 font-light">
                {showSuccess 
                  ? 'Your holistic health journey is officially queued!' 
                  : 'Submit your details. Our clinical coordinator will confirm in 2 hours.'}
              </p>
            </div>

            {/* Inner Content Scroller */}
            <div className="max-h-[80vh] overflow-y-auto p-6 md:p-8">
              {!showSuccess ? (
                <form id="appointment-booking-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Grid Layout fields */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        id="booking-fullname"
                        type="text"
                        placeholder="e.g., Benjamin Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                          errors.fullName 
                            ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400' 
                            : 'border-slate-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-[11px] font-medium">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id="booking-email"
                          type="email"
                          placeholder="name@personal.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                            errors.email 
                              ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400' 
                              : 'border-slate-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[11px] font-medium">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id="booking-phone"
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                            errors.phone 
                              ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400' 
                              : 'border-slate-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[11px] font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  <hr className="border-slate-100 my-1" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id="booking-date"
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition-all ${
                            errors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.preferredDate && <p className="text-red-500 text-[11px] font-medium">{errors.preferredDate}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Time Segment</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          id="booking-timeslot"
                          value={preferredTimeSlot}
                          onChange={(e) => setPreferredTimeSlot(e.target.value as any)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition-all bg-white"
                        >
                          <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                          <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                          <option value="Evening">Evening (4:00 PM - 7:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Reason for Visit</label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        id="booking-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition-all bg-white"
                      >
                        <option value="General Checkup">General Wellness Checkup & Cleaning</option>
                        <option value="Cosmetic Shaping">Cosmetic Smile Restoration (Whitening/Veneers)</option>
                        <option value="Dental Implants">Permanent Dental Implants Surgery</option>
                        <option value="Orthodontics & Aligners">Orthodontics (Invisalign / Braces)</option>
                        <option value="Pediatric Dentistry">Pediatric Family Care</option>
                        <option value="Emergency Relief">Severe Tooth Pain / Emergency</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Additional Clinical Notes (Optional)</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <textarea
                        id="booking-notes"
                        rows={2}
                        placeholder="e.g. Any underlying tooth sensitivity, medical concerns, or anxieties we can plan for..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition-all"
                      />
                    </div>
                  </div>

                  {/* Submission buttons */}
                  <div className="pt-3">
                    <motion.button
                      id="submit-booking-btn"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-brand-teal text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-brand-teal/95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Verifying Calendar Slots...</span>
                        </>
                      ) : (
                        <span>Secure Appointment Booking</span>
                      )}
                    </motion.button>
                  </div>
                </form>
              ) : (
                /* Success Message Section */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-6"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 animate-[bounce_1s_ease-in-out_2]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-bold text-slate-900">
                      Request Gracefully Processed!
                    </h4>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-slate-800">{createdAppointment?.fullName}</span>. 
                      An automated receipt has been dispatched to <span className="font-semibold text-slate-800">{createdAppointment?.email}</span>.
                    </p>
                  </div>

                  {/* Highlight box of booking metadata */}
                  {createdAppointment && (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 max-w-md mx-auto text-left space-y-2.5">
                      <div className="text-xs grid grid-cols-2">
                        <span className="text-slate-400 font-medium">Record ID:</span>
                        <span className="text-slate-700 font-mono text-right">{createdAppointment.id}</span>
                      </div>
                      <div className="text-xs grid grid-cols-2">
                        <span className="text-slate-400 font-medium">Date Selected:</span>
                        <span className="text-slate-700 text-right font-semibold">
                          {new Date(createdAppointment.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="text-xs grid grid-cols-2">
                        <span className="text-slate-400 font-medium">Time Slot:</span>
                        <span className="text-slate-700 text-right font-semibold">
                          {createdAppointment.timeSlot}
                        </span>
                      </div>
                      <div className="text-xs grid grid-cols-2">
                        <span className="text-slate-400 font-medium">Session Purpose:</span>
                        <span className="text-slate-700 text-right font-medium">
                          {createdAppointment.reason}
                        </span>
                      </div>
                      <div className="text-xs grid grid-cols-2">
                        <span className="text-slate-400 font-medium">Initial Status:</span>
                        <span className="text-right">
                          <span className="inline-block bg-amber-50 text-amber-700 rounded px-2 py-0.5 font-bold font-mono text-[10px] uppercase tracking-wide">
                            Pending Validation
                          </span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-3">
                    <button
                      id="close-booking-success-btn"
                      onClick={handleFinish}
                      className="w-full sm:w-auto px-6 py-2 bg-slate-800 hover:bg-slate-900 transition-colors text-white font-medium rounded-lg text-xs"
                    >
                      Return to Website
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
