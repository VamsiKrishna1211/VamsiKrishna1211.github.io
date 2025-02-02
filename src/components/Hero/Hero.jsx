import React from "react";
import "./Hero.css";
import profile_img from "../../assets/anime_profile_img.jpeg";

const Hero = () => {
    return (
        <div className="hero">
            <img src={profile_img} alt="profile image" className="hero-img" />
            <h1>Hello, <span>I'm Vamsi Krishna,</span><br></br> an <span>AI & Robotics Engineer</span> based in USA</h1>
            <div className="hero-caption">
                <p id="hero-caption">AI Engineer by Day & Robotics Enthusiast by Night.</p>
            </div>
            <p>Currently, I'm pursuing my Master's in Robotics at University of Minnesota, Twin Cities</p>
            <div className="hero-action">
                <div className="hero-connect">Connect With me</div>
                <div className="hero-resume">My Resume</div>
            </div>
        </div>
    );
}

export default Hero;
