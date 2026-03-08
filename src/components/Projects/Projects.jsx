import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaPlay } from 'react-icons/fa';
import projectsData from '../../data/projects.json';
import './Projects.css';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayCount = 3;
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, displayCount);

  return (
    <section className="projects section">
      <div className="container">
        <span className="section-label">projects</span>

        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              className="project-card card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="project-top">
                <h3>{project.title}</h3>
                <span className="project-cat code-comment">{project.category}</span>
              </div>

              <p className="project-desc">{project.description}</p>

              {project.learned && project.learned.length > 0 && (
                <div className="project-learned">
                  <span className="code-comment">{'// what I learned'}</span>
                  <div className="learned-list">
                    {project.learned.map((item, li) => (
                      <span key={li} className="learned-item">• {item}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="project-tech">
                {project.technologies.slice(0, 8).map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
              </div>

              <div className="project-links">
                {project.github && project.github.trim() !== '' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub size={13} /> code
                  </a>
                )}
                {project.video && project.video.trim() !== '' && (
                  <a href={project.video} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaPlay size={11} /> demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {projectsData.length > displayCount && (
          <div className="show-more">
            <button className="btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? '$ ls --less' : `$ ls --all (${projectsData.length - displayCount} more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
