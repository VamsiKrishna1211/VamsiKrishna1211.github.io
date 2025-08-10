import React from "react";
import "./Hero.css";
import profile_img from "../../assets/MyImage.jpeg";
import resumePDF from "../../assets/UMN-Robotics-Resume-Sem-1.pdf";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import heroData from "../../data/hero.json";
import { trackButtonClick, trackExternalLink, trackFileDownload } from "../../utils/analytics";



const Hero = () => {
    // Icon mapping for dynamic rendering
    const iconMap = {
        FaGithub,
        FaLinkedin,
        FaGoogleScholar,
        FaEnvelope
    };

    // Handle different action types
    const handleAction = (action) => {
        if (action.type === 'scroll') {
            // Track navigation button click
            trackButtonClick(`Navigate to ${action.target}`, 'Hero Section');
            
            // Update URL hash
            window.history.pushState(null, null, `#${action.target}`);
            
            // Scroll to section
            const targetSection = document.getElementById(action.target);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Handle social link clicks
    const handleSocialClick = (link) => {
        trackExternalLink(link.url, link.platform);
    };

    // Handle resume download
    const handleResumeDownload = () => {
        trackFileDownload('Resume', 'PDF');
    };

    return (
        <div className="hero">
            {/* Left Side - Profile */}
            <div className="hero-left">
                <img src={profile_img} alt="profile image" className="hero-img" />
                <h3 className="hero-name" data-text={heroData.profile.name}>
                    {heroData.profile.name}
                </h3>
                <h4 className="hero-title">{heroData.profile.title}</h4>
                <h4 className="hero-title">{heroData.profile.institution}</h4>
                
                {/* Social Icons */}
                <div className="hero-icons">
                    {heroData.socialLinks.map((link, index) => {
                        const IconComponent = iconMap[link.icon];
                        return (
                            <a 
                                key={index}
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                title={link.platform}
                                onClick={() => handleSocialClick(link)}
                            >
                                <IconComponent size={heroData.settings.iconSize} />
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Right Side - Introduction */}
            <div className="hero-right">
                <div className="hero-info">
                    <h1>{heroData.introduction.greeting}</h1>
                    
                    {/* Introduction Paragraphs */}
                    {heroData.introduction.paragraphs.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                    
                    {/* Passions List */}
                    <ul>
                        {heroData.introduction.passions.map((passion, index) => (
                            <li key={index}>{passion}</li>
                        ))}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="hero-action">
                    {heroData.actions.map((action, index) => {
                        if (action.type === 'scroll') {
                            return (
                                <div 
                                    key={index}
                                    className={action.className}
                                    onClick={() => handleAction(action)}
                                >
                                    {action.text}
                                </div>
                            );
                        } else if (action.type === 'download') {
                            return (
                                <a 
                                    key={index}
                                    href={resumePDF} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={action.className}
                                    onClick={handleResumeDownload}
                                >
                                    <div>{action.text}</div>
                                </a>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Hero;
