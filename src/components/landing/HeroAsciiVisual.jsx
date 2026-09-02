'use client';

import { useEffect, useRef, useState } from 'react';

const ASCII_CHARS = ['·', ':', '+', 'x', '*', '0', '1', '#', '%', '@'];

export default function HeroAsciiVisual() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovering: false,
    hoverIntensity: 0,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = 0;
    let height = 0;

    // Generate large 3D point cloud for cryptographic hyper-structure
    const points = [];
    const cubeSize = 125;
    const steps = 12;

    // 1. Nested Isometric Hypercube Grid
    for (let x = -cubeSize; x <= cubeSize; x += (cubeSize * 2) / steps) {
      for (let y = -cubeSize; y <= cubeSize; y += (cubeSize * 2) / steps) {
        for (let z = -cubeSize; z <= cubeSize; z += (cubeSize * 2) / steps) {
          const isEdge =
            (Math.abs(x) >= cubeSize - 8 && Math.abs(y) >= cubeSize - 8) ||
            (Math.abs(y) >= cubeSize - 8 && Math.abs(z) >= cubeSize - 8) ||
            (Math.abs(x) >= cubeSize - 8 && Math.abs(z) >= cubeSize - 8) ||
            (Math.abs(x) < 8 && Math.abs(y) < 8 && Math.abs(z) < 8);

          if (isEdge || Math.random() > 0.88) {
            points.push({
              baseX: x,
              baseY: y,
              baseZ: z,
              char: ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)],
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    }

    // 2. Dual Orbital Encrypted Rings
    const ringRadius1 = 190;
    const ringCount1 = 60;
    for (let i = 0; i < ringCount1; i++) {
      const theta = (i / ringCount1) * Math.PI * 2;
      points.push({
        baseX: Math.cos(theta) * ringRadius1,
        baseY: Math.sin(theta) * 45,
        baseZ: Math.sin(theta) * ringRadius1,
        char: i % 2 === 0 ? '1' : '0',
        phase: theta,
      });
    }

    const ringRadius2 = 215;
    const ringCount2 = 70;
    for (let i = 0; i < ringCount2; i++) {
      const theta = (i / ringCount2) * Math.PI * 2;
      points.push({
        baseX: Math.sin(theta) * ringRadius2,
        baseY: Math.cos(theta) * ringRadius2,
        baseZ: Math.cos(theta) * 35,
        char: i % 3 === 0 ? '+' : i % 3 === 1 ? '·' : 'x',
        phase: theta,
      });
    }

    // High-DPI Resize
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Smooth Normalized Mouse Tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let baseAngleX = 0.35;
    let baseAngleY = 0.45;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Smooth Lerping for Mouse Rotation Inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const targetIntensity = mouseRef.current.isHovering ? 1 : 0;
      mouseRef.current.hoverIntensity += (targetIntensity - mouseRef.current.hoverIntensity) * 0.06;

      if (!reducedMotion) {
        baseAngleY += 0.003;
        baseAngleX += 0.0015;
      }

      // Compose Angles with Mouse Tilt
      const currentAngleX = baseAngleX - mouseRef.current.y * 0.45;
      const currentAngleY = baseAngleY + mouseRef.current.x * 0.45;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 420;

      const projectedPoints = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Smooth Mathematical Wave Distortion on Hover
        const wave = Math.sin(time * 2 + p.phase) * (4 + mouseRef.current.hoverIntensity * 7);
        const curX = p.baseX + (p.baseX / cubeSize) * wave;
        const curY = p.baseY + (p.baseY / cubeSize) * wave;
        const curZ = p.baseZ + (p.baseZ / cubeSize) * wave;

        // 3D Rotation Matrix
        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 260);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        // Depth and Proximity Alpha
        const depthAlpha = Math.max(0.1, Math.min(0.95, (z2 + cubeSize * 1.8) / (cubeSize * 3.6)));
        const hoverBoost = mouseRef.current.hoverIntensity * 0.25;
        const finalAlpha = Math.min(1, depthAlpha + hoverBoost);

        projectedPoints.push({
          x: projX,
          y: projY,
          char: p.char,
          scale,
          alpha: finalAlpha,
          z: z2,
        });
      }

      // Sort points by Z-depth
      projectedPoints.sort((a, b) => a.z - b.z);

      // Render Clean Monochromatic Glyphs with high-performance direct font calls
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < projectedPoints.length; i++) {
        const pt = projectedPoints[i];
        const fontSize = Math.max(9, Math.min(16, 12.5 * pt.scale));

        ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;

        if (mouseRef.current.hoverIntensity > 0.4 && pt.z > 30) {
          ctx.fillStyle = `rgba(255, 255, 255, ${pt.alpha})`;
        } else {
          ctx.fillStyle = `rgba(241, 245, 249, ${pt.alpha})`;
        }

        ctx.fillText(pt.char, pt.x, pt.y);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[580px] sm:max-w-[640px] h-[440px] sm:h-[500px] flex items-center justify-center select-none cursor-crosshair overflow-hidden"
    >
      {/* Background Soft Purple/Indigo Bloom */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* High-Performance Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block relative z-10"
      />

      {/* Subtle Corner Telemetry Accents */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-white/30 tracking-widest pointer-events-none">
        0xENCRYPTED_LATTICE
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/30 tracking-widest pointer-events-none">
        ACTIVE_FIELD :: 60FPS
      </div>
    </div>
  );
}
