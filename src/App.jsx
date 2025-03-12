import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

const App = () => {
  useEffect(() => {
    ReactGA.initialize('G-2PJDJW3LT8');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Hero />
        <About />
      </div>
    </Router>
  );
}

export default App;
