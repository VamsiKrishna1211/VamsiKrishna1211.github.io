import React from "react";
import "./Hero.css";
import profile_img from "../../assets/anime_profile_img.jpeg";
import { Link } from 'react-router-dom';
import resumePDF from "../../assets/UMN-Robotics-Resume-Sem-1.pdf";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";



const Hero = () => {

    const icons_size = 20;

    return (
        <div className="hero">
            <div className="hero-left">
                <Link to="/">
                    <img src={profile_img} alt="profile image" className="hero-img" />
                </Link>
                <h3 className="hero-name" data-text="Vamsi Krishna">Vamsi Krishna</h3>
                {/* <h3 className="hero-title" data-text="Master's Student">Masters Student</h3> */}
                <h4 className="hero-title">AI & Robotics Engineer</h4>
                <div className="hero-icons">
                    <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer"><FaGithub size={icons_size} /></a>
                    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer"><FaLinkedin size={icons_size} /></a>
                    <a href="https://scholar.google.com/citations?user=Vm4R7eoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"><FaGoogleScholar size={icons_size} /></a>
                    <a href="mailto:your-email@example.com"><FaEnvelope size={icons_size} /></a>
                </div>
            </div>
            <div className="hero-right">
                {/* <h1>Hello World! <span>&#x1F44B;</span></h1> 

                <p>They say "sleep is for the weak," but I think "sleep is for those who *aren't* building the future of robotics."  <span>&#x1F916;</span></p>  
                <p>I'm Vamsi Krishna, a Robotics enthusiast with a caffeine IV drip and a passion for pushing the boundaries of what machines can do. (But hey, feel free to just call me Vamsi.)</p>
                <p>My mind is a swirling vortex of algorithms, where 3D reconstruction, SLAM, and computer vision dance with cutting-edge concepts like ADAS and autonomous drone navigation. <span>&#x1F680;</span><span>&#x1F3A9;</span>  Imagine drones weaving through cityscapes, delivering packages with pinpoint accuracy, or cars that anticipate your every move on the road.  (And yes, I may or may not be fueled by futuristic sci-fi dreams. <span>&#x1F913;</span>) </p>
                <p>Currently, I'm hacking my way through an <span>MS in Robotics</span> at the <span>University of Minnesota, Twin Cities</span>. <span>&#x1F393;</span>  (My goal? To build robots that can finally take over my chores. <span>&#x1F60E;</span>  Just kidding... mostly. <span>&#x1F608;</span>)</p> */}
                <div className="hero-info">
                    <h1>Hello World! <span>&#x1F44B;</span></h1>

                    <p>👋 I'm <span>Vamsi Krishna Kocherla</span> (or just <span>Vamsi</span> for short!), a Robotics enthusiast with a mind overflowing with algorithms, drones, and self-driving cars. </p>

                    <p>Currently, I'm on a journey of discovery, 
                        pursuing my <span>Master's of Science in Robotics</span> at the <span>University of Minnesota</span>. 
                        When I'm not immersed in research papers or wrestling with code, 
                        you can find me exploring the fascinating world of AI & Robotics, fueled by caffeine and an insatiable curiosity. <span>&#x1F680;</span><span>&#x1F3A9;</span><span>&#x1F913;</span><span>&#x1F602;</span> </p>

                    <p>Here are a few things I'm passionate about:</p>
                    <ul>
                        <li>Autonomous Systems (Drones & Robotics)</li>
                        <li>3D Vision & Perception (Reconstruction, SLAM, Visual Servoing)</li> 
                        <li>AI for Real-World Applications (ADAS, Autonomous Navigation, etc.)</li>
                        <li>Physical AI</li>
                    </ul>
                </div>
                <div className="hero-action">
                    <div className="hero-connect">Connect With me</div>
                    <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="hero-resume">
                        <div>Download Resume</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Hero;
