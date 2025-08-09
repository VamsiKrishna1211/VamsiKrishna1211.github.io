import React from 'react';
import { motion } from 'framer-motion';
import projectsData from '../../data/projects.json';
import './Projects.css';

const Projects = () => {
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
          {projectsData.slice(0, 3).map((project, index) => (
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
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
