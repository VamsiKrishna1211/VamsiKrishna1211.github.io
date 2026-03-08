import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import personalData from '../../data/personal.json';
import { trackFormSubmission, trackButtonClick, trackExternalLink } from '../../utils/analytics';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    trackButtonClick('Contact Form Submit', 'Contact Section');

    try {
      const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;
      trackFormSubmission('Contact Form', true);
      showNotification('Email client opened!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      trackFormSubmission('Contact Form', false);
      showNotification('Failed to open email client.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact section">
      <div className="container">
        <span className="section-label">contact</span>

        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info">
            <div className="info-block">
              <span className="code-comment">{'// reach out'}</span>
              <div className="info-items">
                <a href={`mailto:${personalData.email}`} className="info-link">
                  <FaEnvelope size={14} />
                  {personalData.email}
                </a>
                <span className="info-item">
                  <FaMapMarkerAlt size={14} />
                  {personalData.location}
                </span>
              </div>
            </div>

            <div className="info-block">
              <span className="code-comment">{'// connect'}</span>
              <div className="info-items">
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link"
                  onClick={() => trackExternalLink(personalData.linkedin, 'LinkedIn')}
                >
                  <FaLinkedin size={14} />
                  LinkedIn
                </a>
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link"
                  onClick={() => trackExternalLink(personalData.github, 'GitHub')}
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">select topic</option>
                  <option value="Research Collaboration">Research Collaboration</option>
                  <option value="Project Partnership">Project Partnership</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Technical Discussion">Technical Discussion</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="your message..."
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading}>
                <FaPaperPlane size={12} />
                {isLoading ? 'sending...' : 'send message'}
              </button>
            </form>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
