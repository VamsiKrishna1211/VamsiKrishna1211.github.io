import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaRocket } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import personalData from '../../data/personal.json';
import { trackFormSubmission, trackButtonClick, trackExternalLink } from '../../utils/analytics';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Track form submission attempt
    trackButtonClick('Contact Form Submit', 'Contact Section');

    try {
      // For now, we'll just open the default email client
      // You can configure EmailJS later with your service details
      const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      // Track successful form submission
      trackFormSubmission('Contact Form', true);
      showNotification('Email client opened successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      // Track failed form submission
      trackFormSubmission('Contact Form', false);
      showNotification('Failed to open email client. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: personalData.email,
      href: `mailto:${personalData.email}`,
      color: 'var(--primary)'
    },
    // {
    //   icon: FaPhone,
    //   label: 'Phone',
    //   value: personalData.phone,
    //   href: `tel:${personalData.phone}`,
    //   color: 'var(--accent)'
    // },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: personalData.location,
      href: null,
      color: 'var(--secondary)'
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: personalData.linkedin,
      color: '#0077b5'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      href: personalData.github,
      color: '#333'
    }
  ];

  return (
    <section className="contact section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Let's Build the Future{' '}
            <span className="text-gradient">Together</span>
          </h2>
          <p className="section-description">
            Ready to collaborate on cutting-edge robotics and AI projects? 
            Let's connect and explore how we can push the boundaries of autonomous systems.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Information */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-info-title">Get In Touch</h3>
            <p className="contact-info-description">
              Whether you're interested in robotics research collaboration, 
              AI project partnerships, or discussing the future of autonomous systems, 
              I'd love to hear from you.
            </p>

            <div className="contact-details">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="contact-detail"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="contact-icon"
                    style={{ color: item.color }}
                  >
                    <item.icon />
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">{item.label}</span>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="contact-value"
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                  >
                    <social.icon />
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="contact-form-card">
              <div className="form-header">
                <FaRocket className="form-icon" />
                <h3>Start a Conversation</h3>
                <p>Let's discuss how we can innovate together</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="Project Partnership">Project Partnership</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Technical Discussion">Technical Discussion</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell me about your ideas, projects, or how we can collaborate..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <span className="btn-loading">
                      <div className="spinner"></div>
                      Opening Email...
                    </span>
                  ) : (
                    <span className="btn-content">
                      <FaPaperPlane />
                      Send Message
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Notification */}
        {notification && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {notification.message}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
