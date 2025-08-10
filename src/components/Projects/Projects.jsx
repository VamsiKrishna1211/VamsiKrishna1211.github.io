import React, { useState } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../../data/projects.json';
import './Projects.css';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayCount = 2;
  // Display all projects if showAll is true, otherwise display the first 2
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, displayCount);

  return (
    <section className="projects section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <p className="project-category">{project.category}</p>
                {/* {project.status && (
                  <span className={`project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {project.status}
                  </span>
                )} */}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.slice(0, 8).map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              {project.learned && project.learned.length > 0 && (
                <div className="project-learned">
                  <h5>What I Learned:</h5>
                  <div className="learned-items">
                    {project.learned.map((item, li) => (
                      <span key={li} className="learned-item">• {item}</span>
                    ))}
                  </div>
                </div>
              )}
              {project.video && project.video.trim() !== '' && (
                <div className="project-video">
                  <a href={project.video} target="_blank" rel="noopener noreferrer" className="video-link">Watch Video</a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {projectsData.length > displayCount && (
          <motion.div
            className="show-more-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button 
              className="show-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show More (${projectsData.length - displayCount} more)`}
              <span className="btn-arrow">{showAll ? '↑' : '↓'}</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
