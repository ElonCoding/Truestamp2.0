'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Parallax({
  children,
  speed = 0.15,
  direction = 'up',
  className = '',
  scaleRange = null,
  opacityRange = null,
}) {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const multiplier = direction === 'down' ? -1 : 1;
  const rawY = useTransform(smoothProgress, [0, 1], [-speed * 100 * multiplier, speed * 100 * multiplier]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], scaleRange || [1, 1, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], opacityRange || [1, 1, 1]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div style={{ y: rawY, scale, opacity, willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
}
