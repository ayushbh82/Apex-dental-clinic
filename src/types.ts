/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  price?: string;
  duration?: string;
  benefits: string[];
}

export interface Dentist {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialty: string;
  credentials: string[];
  education: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  treatment: string;
  reviewText: string;
  date: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
  };
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  reason: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}
