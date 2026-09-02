'use client';

import { motion } from 'framer-motion';

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.85,
  stagger = 0.05,
  as = 'div',
  mode = 'word', // 'word' | 'line' | 'block'
}) {
  const Component = motion[as] || motion.div;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '120%',
      opacity: 0,
      filter: 'blur(6px)',
    },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Word-by-word reveal
  if (typeof children === 'string' && mode === 'word') {
    const words = children.split(' ');
    return (
      <Component
        className={`inline-block overflow-hidden ${className}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <motion.span className="inline-block" variants={itemVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // Line or block reveal
  return (
    <Component
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
    >
      <motion.div variants={itemVariants}>
        {children}
      </motion.div>
    </Component>
  );
}
