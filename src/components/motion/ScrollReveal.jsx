'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 24,
  stagger = 0,
  once = true,
  as = 'div',
}) {
  const Component = motion[as] || motion.div;

  const variants = {
    hidden: {
      opacity: 0,
      y: y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: stagger,
      },
    },
  };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, margin: '-50px' }}
    >
      {children}
    </Component>
  );
}
