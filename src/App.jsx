import { Suspense, lazy, useEffect } from 'react';
import './styles/globals.css';
import { Router, Routes, Route, usePath } from './router/Router';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { initGA } from './utils/analytics';
import CookieBanner from './components/CookieBanner/CookieBanner';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Loading/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Research = lazy(() => import('./pages/Research'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRoutes() {
  const path = usePath();
  useDocumentMeta(path);

  useEffect(() => {
    // /education lands on the Experience page's Education section, which scrolls itself.
    if (!window.location.hash && path !== '/education') window.scrollTo(0, 0);
  }, [path]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Work section="education" />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId && measurementId !== 'G-2PJDJW3LT8') {
      initGA(measurementId);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      document.body.classList.toggle('tab-hidden', document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <Router>
      <div className="App">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Layout>
          <AppRoutes />
        </Layout>
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;
