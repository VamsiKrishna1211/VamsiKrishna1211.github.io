import React, { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/globals.css';
import { useHashRouting } from './hooks/useHashRouting';
import { useAnalyticsTracking } from './hooks/useAnalyticsTracking';
import { initGA, trackPageView } from './utils/analytics';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Hero = lazy(() => import('./components/Hero/Hero'));
const About = lazy(() => import('./components/About/About'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Education = lazy(() => import('./components/Education/Education'));
const ResearchRecognition = lazy(() => import('./components/ResearchRecognition/ResearchRecognition'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const LoadingSpinner = lazy(() => import('./components/Loading/LoadingSpinner'));
const BackgroundAnimation = lazy(() => import('./components/Background/BackgroundAnimation'));

function App() {
  // Handle hash routing initialization
  useHashRouting();

  // Analytics tracking refs for each section
  const heroRef = useAnalyticsTracking('Hero');
  const aboutRef = useAnalyticsTracking('About');
  const experienceRef = useAnalyticsTracking('Experience');
  const projectsRef = useAnalyticsTracking('Projects');
  const skillsRef = useAnalyticsTracking('Skills');
  const educationRef = useAnalyticsTracking('Education');
  const researchRef = useAnalyticsTracking('Research & Recognition');
  const contactRef = useAnalyticsTracking('Contact');

  // Initialize Google Analytics
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId && measurementId !== 'G-2PJDJW3LT8') {
      initGA(measurementId);
      trackPageView();
    }
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        {/* Background Animation with Three.js */}
        <BackgroundAnimation />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            id="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.section>

          {/* About Section */}
          <motion.section
            ref={aboutRef}
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <About />
          </motion.section>

          {/* Experience Section */}
          <motion.section
            ref={experienceRef}
            id="experience"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Experience />
          </motion.section>

          {/* Projects Section */}
          <motion.section
            ref={projectsRef}
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Projects />
          </motion.section>

          {/* Skills Section */}
          <motion.section
            ref={skillsRef}
            id="skills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Skills />
          </motion.section>

          {/* Education Section */}
          <motion.section
            ref={educationRef}
            id="education"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Education />
          </motion.section>

          {/* Research & Recognition Section (Publications, Patents, Achievements) */}
          <motion.section
            ref={researchRef}
            id="research"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ResearchRecognition />
          </motion.section>

          {/* Contact Section */}
          <motion.section
            ref={contactRef}
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Contact />
          </motion.section>
        </main>

        {/* Footer */}
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
