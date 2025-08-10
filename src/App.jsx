import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import './styles/globals.css';
import { useHashRouting } from './hooks/useHashRouting';

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
            id="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.section>

          {/* About Section */}
          <motion.section
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
