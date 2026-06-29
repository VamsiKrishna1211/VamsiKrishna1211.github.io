import React, { Suspense, lazy, useEffect } from 'react';
import './styles/globals.css';
import { useHashRouting } from './hooks/useHashRouting';
import { useAnalyticsTracking } from './hooks/useAnalyticsTracking';
import { initGA, trackPageView } from './utils/analytics';
import CookieBanner from './components/CookieBanner/CookieBanner';

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
          <section ref={heroRef} id="home">
            <Hero />
          </section>

          <section ref={aboutRef} id="about">
            <About />
          </section>

          <section ref={experienceRef} id="experience">
            <Experience />
          </section>

          <section ref={projectsRef} id="projects">
            <Projects />
          </section>

          <section ref={skillsRef} id="skills">
            <Skills />
          </section>

          <section ref={educationRef} id="education">
            <Education />
          </section>

          <section ref={researchRef} id="research">
            <ResearchRecognition />
          </section>

          <section ref={contactRef} id="contact">
            <Contact />
          </section>
        </main>

        <Footer />
      </Suspense>
      <CookieBanner />
    </div>
  );
}

export default App;
