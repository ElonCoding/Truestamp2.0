'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = '01#$*&%X_+-/<>~!';

export default function CipherReveal({
  text,
  className = '',
  speed = 40,
  delay = 0,
  iterations = 12,
}) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let frame = 0;
    const totalFrames = iterations;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        const scrambled = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index / text.length < progress) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');

        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay, iterations]);

  return (
    <span ref={ref} className={`font-mono inline-block ${className}`}>
      {displayText}
    </span>
  );
}
