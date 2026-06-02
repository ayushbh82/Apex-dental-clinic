/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import DentistSection from './components/DentistSection';
import TestimonialSection from './components/TestimonialSection';
import BlogSection from './components/BlogSection';
import AppointmentHub from './components/AppointmentHub';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Appointment } from './types';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preSelectedReason, setPreSelectedReason] = useState('General Checkup');

  // Load and persist appointments to localStorage with fallback mockup items
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('apex_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed parsing cached clinical records', err);
      }
    }
    return [
      {
        id: 'apt-0402',
        fullName: 'Benjamin Sterling',
        email: 'ben@sterling-design.com',
        phone: '+1 (555) 123-4567',
        date: '2026-06-15',
        timeSlot: 'Morning',
        reason: 'General Checkup',
        notes: 'Needs comprehensive preventive cleaning, has high tooth sensitivity to cold liquids.',
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      },
      {
        id: 'apt-0941',
        fullName: 'Felicia Hardy',
        email: 'felicia@blackcat.org',
        phone: '+1 (555) 987-6543',
        date: '2026-06-22',
        timeSlot: 'Afternoon',
        reason: 'Cosmetic Shaping',
        notes: 'Interested in digital smile mapping for composite porcelain veneers.',
        status: 'Pending',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Sync to local state storage on transitions
  useEffect(() => {
    localStorage.setItem('apex_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Appointment Actions
  const handleAddNewAppointment = (newApt: Appointment) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id 
          ? { ...apt, status: 'Cancelled' as const } 
          : apt
      )
    );
  };

  const handleRescheduleAppointment = (
    id: string, 
    newDate: string, 
    newTimeSlot: 'Morning' | 'Afternoon' | 'Evening'
  ) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id
          ? { ...apt, date: newDate, timeSlot: newTimeSlot, status: 'Pending' as const }
          : apt
      )
    );
  };

  // Open Reservation Triggers with Context Mapping
  const triggerBookingWithServiceContext = (serviceName: string) => {
    // Map human clean names to matching select values
    if (serviceName.includes('Preventive')) {
      setPreSelectedReason('General Checkup');
    } else if (serviceName.includes('Cosmetic') || serviceName.includes('Shaping')) {
      setPreSelectedReason('Cosmetic Shaping');
    } else if (serviceName.includes('Implants')) {
      setPreSelectedReason('Dental Implants');
    } else if (serviceName.includes('Orthodontics') || serviceName.includes('Aligner')) {
      setPreSelectedReason('Orthodontics & Aligners');
    } else if (serviceName.includes('Pediatric') || serviceName.includes('Kids')) {
      setPreSelectedReason('Pediatric Dentistry');
    } else {
      setPreSelectedReason('General Checkup');
    }
    
    setIsBookingModalOpen(true);
  };

  const triggerBookingWithDoctorContext = (doctorName: string) => {
    if (doctorName.includes('Jenkins')) {
      setPreSelectedReason('Orthodontics & Aligners');
    } else if (doctorName.includes('Vance')) {
      setPreSelectedReason('Dental Implants');
    } else if (doctorName.includes('Rostova')) {
      setPreSelectedReason('Pediatric Dentistry');
    } else {
      setPreSelectedReason('General Checkup');
    }
    
    setIsBookingModalOpen(true);
  };

  const triggerGeneralBooking = () => {
    setPreSelectedReason('General Checkup');
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-teal-500/10 selection:text-brand-teal">
      
      {/* Scrollable Layout sections */}
      <Navbar onOpenBookingModal={triggerGeneralBooking} />
      
      <main className="flex-grow">
        <Hero onOpenBookingModal={triggerGeneralBooking} />
        
        <ServicesSection onSelectServiceToBook={triggerBookingWithServiceContext} />
        
        <DentistSection onBookWithDoctor={triggerBookingWithDoctorContext} />
        
        <TestimonialSection />
        
        <BlogSection />
        
        <AppointmentHub 
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onRescheduleAppointment={handleRescheduleAppointment}
        />
      </main>

      <Footer />

      {/* Persistent global Reservation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedReason={preSelectedReason}
        onBookSuccess={handleAddNewAppointment}
      />
    </div>
  );
}
