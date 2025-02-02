import React from "react";
import profile_img from "../../assets/anime_profile_img.jpeg";
import "./About.css";

const About = () => {
    return (
        <div className="about">
            <div className="about-title">
                <h1>About Me</h1>
            </div>
            <div className="about-section">
                <div className="about-left">
                    <img src={profile_img} alt="profile image" className="about-img" />
                </div>
                <div className="about-right">
                    <div className="about-para">
                        <p>I'm a Robotics Engineer with a knack for making machines see and think. I've spent a good chunk of my career diving deep into the world of computer vision and machine learning, building systems that can understand images and videos. I've also had my hands dirty with hardware, tinkering with everything from drones to self-driving cars. I've even dabbled in the cloud, deploying my creations on platforms like AWS and Azure. I'm always up for a challenge, whether it's implementing cutting-edge research or optimizing models for real-world applications. I've also got a proven track record of leading teams and delivering results in a fast-paced startup environment.</p>
                    </div>
                    <div className="about-skills">
                        <div className="about-skill">
                            <p>Python </p><hr style={{width: "90%"}}/>
                            <p>Golang </p><hr style={{width: "60%"}}/>
                            <p>Computer Vision </p><hr style={{width: "80%"}}/>
                            <p>Deep Learning </p><hr style={{width: "30%"}}/>
                            <p>ROS </p><hr style={{width: "40%"}}/>
                        </div>
                    </div>
                    <div className="about-achievements">
                        <div className="about-achievement">
                            <h1>5+</h1>
                            <p>Years of Experience</p>
                        </div>
                        <hr/>
                        <div className="about-achievement">
                            <h1>10+</h1>
                            <p>Projects Completed</p>
                        </div>
                        <hr/>
                        <div className="about-achievement">
                            <h1>5+</h1>
                            <p>Patents</p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default About;
