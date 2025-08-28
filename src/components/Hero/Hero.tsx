import React from "react";
import "./Hero.css";
import profile_img from "../../assets/MyImage.jpeg";
import resumePDF from "../../assets/UMN-Robotics-Resume-Sem-1.pdf";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { IconType } from "react-icons";
import heroData from "../../data/hero.json";
import { trackButtonClick, trackExternalLink, trackFileDownload } from "../../utils/analytics";

interface HeroAction {
    type: 'scroll' | 'external' | 'download';
    text: string;
    target?: string;
    url?: string;
    className: string;
}

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

interface IconMap {
    [key: string]: IconType;
}

const Hero: React.FC = () => {
    // Icon mapping for dynamic rendering
    const iconMap: IconMap = {
        FaGithub,
        FaLinkedin,
        FaGoogleScholar,
        FaEnvelope
    };

    // Handle different action types
    const handleAction = (action: HeroAction): void => {
        if (action.type === 'scroll' && action.target) {
            // Track navigation button click
            trackButtonClick(`Navigate to ${action.target}`, 'Hero Section');
            
            // Update URL hash
            window.history.pushState(null, '', `#${action.target}`);
            
            // Scroll to section
            const targetSection = document.getElementById(action.target);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Handle social link clicks
    // Handle social link clicks
    const handleSocialClick = (link: SocialLink): void => {
        trackExternalLink(link.url, link.platform);
    };

    // Handle resume download
    const handleResumeDownload = (): void => {
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
                        const typedAction = action as HeroAction;
                        if (typedAction.type === 'scroll') {
                            return (
                                <div 
                                    key={index}
                                    className={typedAction.className}
                                    onClick={() => handleAction(typedAction)}
                                >
                                    {typedAction.text}
                                </div>
                            );
                        } else if (typedAction.type === 'download') {
                            return (
                                <a 
                                    key={index}
                                    href={resumePDF} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={typedAction.className}
                                    onClick={handleResumeDownload}
                                >
                                    <div>{typedAction.text}</div>
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
