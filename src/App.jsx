import React, { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/globals.css';
import { useHashRouting } from './hooks/useHashRouting';
import { useAnalyticsTracking } from './hooks/useAnalyticsTracking';
import { initGA, trackPageView } from './utils/analytics';
import CookieBanner from './components/CookieBanner/CookieBanner';

// Lazy load components
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

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: '-50px' },
};

function App() {
  useHashRouting();

  const heroRef = useAnalyticsTracking('Hero');
  const aboutRef = useAnalyticsTracking('About');
  const experienceRef = useAnalyticsTracking('Experience');
  const projectsRef = useAnalyticsTracking('Projects');
  const skillsRef = useAnalyticsTracking('Skills');
  const educationRef = useAnalyticsTracking('Education');
  const researchRef = useAnalyticsTracking('Research & Recognition');
  const contactRef = useAnalyticsTracking('Contact');

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
        <BackgroundAnimation />
        <Navbar />

        <main>
          <motion.section ref={heroRef} id="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Hero />
          </motion.section>

          <motion.section ref={aboutRef} id="about" {...fadeIn}>
            <About />
          </motion.section>

          <motion.section ref={experienceRef} id="experience" {...fadeIn}>
            <Experience />
          </motion.section>

          <motion.section ref={projectsRef} id="projects" {...fadeIn}>
            <Projects />
          </motion.section>

          <motion.section ref={skillsRef} id="skills" {...fadeIn}>
            <Skills />
          </motion.section>

          <motion.section ref={educationRef} id="education" {...fadeIn}>
            <Education />
          </motion.section>

          <motion.section ref={researchRef} id="research" {...fadeIn}>
            <ResearchRecognition />
          </motion.section>

          <motion.section ref={contactRef} id="contact" {...fadeIn}>
            <Contact />
          </motion.section>
        </main>

        <Footer />
      </Suspense>
      <CookieBanner />
    </div>
  );
}

export default App;
