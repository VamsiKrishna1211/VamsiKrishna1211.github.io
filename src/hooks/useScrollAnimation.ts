import { useEffect, useRef } from 'react';
import { useInView, useAnimation, AnimationControls, Variants } from 'framer-motion';

interface UseScrollAnimationReturn {
  ref: React.RefObject<any>;
  controls: AnimationControls;
}

export const useScrollAnimation = (threshold: number = 0.1): UseScrollAnimationReturn => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "-100px 0px -100px 0px"
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const slideInFromBottom: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const glowHover: Variants = {
  initial: { 
    boxShadow: "0 0 0px rgba(0, 212, 255, 0)"
  },
  hover: { 
    boxShadow: "0 0 30px rgba(0, 212, 255, 0.4)",
    scale: 1.02,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
