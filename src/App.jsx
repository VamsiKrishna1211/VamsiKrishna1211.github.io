import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";

const App = () => {
  return (
    <div>
      {/* <h1>Hello, World!</h1> */}
      <Navbar/>
      <Hero/>
      <About/>
    </div>
  );
}

export default App;
