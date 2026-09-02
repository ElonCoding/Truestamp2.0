'use client';

import { motion } from 'framer-motion';

export default function SectionTransition({
  children,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
