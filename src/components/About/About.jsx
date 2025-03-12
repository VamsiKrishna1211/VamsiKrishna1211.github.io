import React from "react";
import profile_img from "../../assets/MyImage.jpeg";
import "./About.css";
import skills from "./skills.json"

const About = () => {
  return (
    <div className="about" id="about">
      <div className="about-title">
        <h1>About Me</h1>
      </div>
      <div className="about-content">
        {/* Left Section - Image */}
        <div className="about-left">
          <img src={profile_img} alt="profile image" className="about-img" />
        </div>

        {/* Right Section - Text and Skills */}
        <div className="about-right">
          <div className="about-para">
            <p>
            As a Robotics Engineer, I'm passionate about building intelligent machines that can perceive and interact with the world around them. 
            My expertise lies in computer vision and machine learning, where I've developed systems to analyze images and videos, enabling machines to 'see' and 'understand.'  
            I've also gained extensive experience in hardware development, working on projects ranging from autonomous drones to self-driving cars.  
            To bring my creations to life, I've delved into cloud technologies, deploying solutions on platforms like AWS and Azure. 
            I'm driven by a desire to tackle complex challenges, whether it's implementing cutting-edge research or optimizing models for real-world applications.  
            Moreover, I have a proven track record of leading teams and delivering results in a dynamic startup environment.
            </p>
          </div>

          {/* Skills Section */}
          <h2>Skills</h2>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <div key={index} className="skill-group">
                <h3>{skill.category}</h3>
                <ul>
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
