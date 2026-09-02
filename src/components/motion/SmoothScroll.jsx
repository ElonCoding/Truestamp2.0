'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenisInstance = null;
    let rafId = null;

    // Dynamically import Lenis to be fully SSR and bundle safe
    import('lenis').then(({ default: Lenis }) => {
      if (!Lenis) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenis;
      lenisInstance = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }).catch(() => {
      // Fallback to standard native smooth scroll if lenis is not installed
      document.documentElement.style.scrollBehavior = 'smooth';
    });

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href !== '#') {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el, { offset: -80, duration: 1.4 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
