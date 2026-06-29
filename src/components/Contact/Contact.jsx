import React, { useState } from 'react';
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
      const formDataObj = new FormData(e.target);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        trackFormSubmission('Contact Form', true);
        showNotification('Message sent! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      trackFormSubmission('Contact Form', false);
      showNotification('Failed to send message. Please try again.', 'error');
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
              <input type="hidden" name="access_key" value="1763a221-b65f-4ab4-a5b5-2e69968ed636" />
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

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
