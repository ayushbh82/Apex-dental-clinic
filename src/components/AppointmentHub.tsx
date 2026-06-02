/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Trash2, Edit2, AlertCircle, CheckCircle, RefreshCcw, Eye, ShieldAlert, CalendarClock } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentHubProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newTimeSlot: 'Morning' | 'Afternoon' | 'Evening') => void;
}

export default function AppointmentHub({
  appointments,
  onCancelAppointment,
  onRescheduleAppointment
}: AppointmentHubProps) {
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  
  // Status feedback states
  const [successMsg, setSuccessMsg] = useState('');

  const activeAptToReschedule = appointments.find(a => a.id === selectedAptId);

  const startReschedule = (apt: Appointment) => {
    setSelectedAptId(apt.id);
    setNewDate(apt.date);
    setNewTimeSlot(apt.timeSlot);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAptId) return;

    if (!newDate) {
      alert("Please select a valid target residency date.");
      return;
    }

    onRescheduleAppointment(selectedAptId, newDate, newTimeSlot);
    setSelectedAptId(null);
    setSuccessMsg('Appointment updated successfully!');

    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  return (
    <section id="patient-portal" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block">
            Self-Service Coordinator
          </span>
          <h2 className="font-display font-semibold text-3xl text-brand-dark mt-4 tracking-tight leading-tight">
            Comprehensive Appointment Hub
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Manage your booked consultations, live audits, and clinician assignments in real time via our client-side state engine.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden shadow-xs">
          {/* Hub Header Info Bar */}
          <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-full bg-brand-teal text-white flex items-center justify-center">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-sm tracking-wide">
                  Your Security-Isolated Clinical Queue
                </h3>
                <p className="text-slate-400 text-[11px] font-light mt-0.5">
                  Local cache registry. Real changes update immediately.
                </p>
              </div>
            </div>

            {/* Micro pill list stats */}
            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active:</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs font-mono font-bold text-white">
                {appointments.filter(a => a.status !== 'Cancelled').length} Sessions
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-100/60 rounded-xl text-emerald-800 text-xs flex items-center space-x-2.5 font-medium"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {appointments.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-3">
                <AlertCircle className="h-8 w-8 text-slate-300" />
                <p>No active scheduled dentist consultations are currently active.</p>
                <p className="text-[10px] text-slate-400">Use the CTA triggers above to request a fresh slot!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <motion.div
                    id={`active-apt-hub-${apt.id}`}
                    key={apt.id}
                    layoutId={`apt-card-layout-${apt.id}`}
                    className={`bg-white border text-xs p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
                      apt.status === 'Cancelled' 
                        ? 'border-slate-200/40 opacity-60 bg-slate-50/50' 
                        : 'border-slate-200/60 shadow-sm hover:border-brand-teal/20'
                    }`}
                  >
                    {/* Visual metadata block */}
                    <div className="flex items-start space-x-4">
                      {/* Left circular calendar box */}
                      <div className={`h-12 w-12 rounded-xl flex-shrink-0 flex flex-col items-center justify-center font-mono ${
                        apt.status === 'Cancelled' 
                          ? 'bg-slate-100 text-slate-400' 
                          : 'bg-teal-50 text-brand-teal'
                      }`}>
                        <span className="text-[10px] font-bold uppercase">
                          {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-sm font-extrabold leading-none">
                          {new Date(apt.date).getDate() || '--'}
                        </span>
                      </div>

                      {/* Detail metadata strings */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2.5 flex-wrap">
                          <h4 className="font-bold text-slate-800 text-sm">
                            {apt.fullName}
                          </h4>
                          <span className="font-mono text-[9px] text-slate-400">
                            {apt.id}
                          </span>
                        </div>

                        {/* Timing and details info tags */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 text-slate-400 mr-1" />
                            <span>{apt.timeSlot} slot</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center font-medium text-slate-600">
                            <span>Purpose: {apt.reason}</span>
                          </span>
                        </div>

                        {apt.notes && (
                          <p className="text-[10px] text-slate-400 italic font-light mt-1">
                            Notes: "{apt.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right alignment management actions */}
                    <div className="flex items-center space-x-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100/50">
                      
                      {/* Sched status indicator pill */}
                      <div className="mr-2">
                        {apt.status === 'Pending' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-50 text-amber-700 uppercase tracking-wider">
                            Pending Validation
                          </span>
                        )}
                        {apt.status === 'Confirmed' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                            Confirmed
                          </span>
                        )}
                        {apt.status === 'Cancelled' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-50 text-rose-700 uppercase tracking-wider">
                            Cancelled
                          </span>
                        )}
                      </div>

                      {/* Interactive Triggers */}
                      {apt.status !== 'Cancelled' && (
                        <div className="flex items-center space-x-1">
                          
                          {/* Reschedule micro action */}
                          <button
                            id={`resched-trigger-${apt.id}`}
                            onClick={() => startReschedule(apt)}
                            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
                            title="Reschedule Appointment"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>

                          {/* Cancellation trash trigger */}
                          <button
                            id={`cancel-trigger-${apt.id}`}
                            onClick={() => onCancelAppointment(apt.id)}
                            className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Cancel Request"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Rescheduling Floating Overlay Box */}
        <AnimatePresence>
          {selectedAptId && activeAptToReschedule && (
            <div id="reschedule-modal-overlay" className="fixed inset-0 z-55 flex items-center justify-center p-4">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAptId(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white p-6 rounded-2xl w-full max-w-sm border border-slate-100 z-10 shadow-xl space-y-4"
              >
                <div>
                  <h4 className="font-display font-extrabold text-sm text-slate-950">
                    Reschedule Reservation
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    For client record: <span className="font-mono">{activeAptToReschedule.fullName}</span> ({activeAptToReschedule.id})
                  </p>
                </div>

                <form onSubmit={handleRescheduleSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">New Date Choice</label>
                    <input
                      id="resched-new-date"
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Time Segment</label>
                    <select
                      id="resched-new-timeslot"
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value as any)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-white"
                    >
                      <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="Evening">Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>

                  {/* Actions row */}
                  <div className="flex space-x-2 pt-2 text-xs justify-end">
                    <button
                      id="cancel-resched-action"
                      type="button"
                      onClick={() => setSelectedAptId(null)}
                      className="px-4 py-1.5 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      id="submit-resched-action"
                      type="submit"
                      className="px-4 py-1.5 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/95 transition-all font-semibold"
                    >
                      Commit Reschedule
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
