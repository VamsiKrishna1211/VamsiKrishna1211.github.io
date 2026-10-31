import { useEffect } from 'react';

const SITE = 'https://vamsikrishna1211.github.io';

const PAGES = {
  '/': {
    title: 'Vamsi Krishna Kocherla | Robotics & Computer Vision Engineer | MS Robotics @ UMN',
    description:
      'ECE grad turned production CV scientist, now doing MS Robotics at UMN. 5+ years shipping AI for agriculture at the edge — Jetson hardware, Kubernetes inference, real-world deadlines. Currently building visual-inertial SLAM and Gaussian Splatting pipelines for autonomous ground robots. Open to robotics and vision engineering roles.',
  },
  '/education': {
    title: 'Education — Vamsi Krishna Kocherla',
    description: 'M.S. Robotics at the University of Minnesota, and a B.Tech in Electronics & Communication Engineering.',
  },
  '/work': {
    title: 'Work — Vamsi Krishna Kocherla',
    description:
      'Ranked technical skills and a role-by-role history in robotics and computer vision — SLAM, 3D reconstruction, edge AI, and production ML at scale.',
  },
  '/projects': {
    title: 'Projects — Vamsi Krishna Kocherla',
    description:
      'Robotics and computer vision projects — SLAM, 3D reconstruction, edge AI, and production ML at scale.',
  },
  '/about': {
    title: 'About — Vamsi Krishna Kocherla',
    description:
      'Background and current focus of a robotics and computer vision engineer pursuing an MS in Robotics at the University of Minnesota.',
  },
  '/research': {
    title: 'Research & Recognition — Vamsi Krishna Kocherla',
    description:
      'Publications, patents, achievements, and certifications in computer vision, robotics, and deep learning.',
  },
  '/contact': {
    title: 'Contact — Vamsi Krishna Kocherla',
    description: 'Get in touch about robotics, computer vision, or research collaboration.',
  },
};

const DEFAULT = {
  title: 'Vamsi Krishna Kocherla',
  description: PAGES['/'].description,
};

function metaFor(path) {
  if (PAGES[path]) return PAGES[path];
  if (path.startsWith('/projects/')) {
    return {
      title: 'Case study — Vamsi Krishna Kocherla',
      description: 'A robotics or computer vision project case study — what was built, and what it took.',
    };
  }
  return DEFAULT;
}

function upsertMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function useDocumentMeta(path, override) {
  useEffect(() => {
    const base = metaFor(path);
    const { title, description } = { ...base, ...override };

    document.title = title;
    upsertMeta('description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE}${path === '/' ? '' : path}`);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: path, page_title: title });
    }
  }, [path, override]);
}
