// Global type definitions for the portfolio project
import * as THREE from 'three';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  icon: string;
  featured?: boolean;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
  url: string | null;
  skills: string[];
  description: string;
  icon: string;
  featured?: boolean;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
  courses?: string[];
  achievements?: string[];
  location: string;
  logo?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
  logo?: string;
}

export interface Hero {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
    website?: string;
  };
}

export interface Patent {
  id: number;
  title: string;
  patentNumber: string;
  status: string;
  filingDate: string;
  publicationDate?: string;
  inventors: string[];
  assignee: string;
  description: string;
  claims?: string[];
  url?: string;
}

export interface Personal {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'planned' | 'on-hold';
  category: string;
  featured: boolean;
  image?: string;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  documentation?: string;
  achievements?: string[];
  challenges?: string[];
}

export interface Publication {
  id: number;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'workshop' | 'thesis' | 'preprint';
  status: 'published' | 'accepted' | 'submitted' | 'in-review' | 'draft';
  abstract: string;
  keywords: string[];
  doi?: string;
  url?: string;
  pdfUrl?: string;
  citations?: number;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  description?: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// Component Props Types
export interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface NavItem {
  name: string;
  href: string;
  offset?: number;
}

// Animation types
export interface MotionVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration: number;
      delay?: number;
      ease?: string;
    };
  };
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Environment variables
export interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Three.js types for background animation
export interface ParticleSystem {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
}

// Hook return types
export interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
}

export interface UseAnalyticsTrackingReturn {
  (elementName: string): React.RefObject<HTMLDivElement>;
}
