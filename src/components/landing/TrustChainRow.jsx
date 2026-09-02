'use client';

import { motion } from 'framer-motion';
import ShinyText from '../shared/ShinyText';
import ScrollReveal from '../motion/ScrollReveal';

export default function TrustChainRow() {
  const logos = [
    {
      name: 'Bitcoin',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#F7931A" />
          <path
            d="M21.5 13.5c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.6 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.6-1.7-.4-.7 2.7c-.4-.1-.7-.2-1-.3l-2.3-.6-.5 1.8s1.3.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c.1 0 .1 0 .2.1l-.2-.1-1.1 4.5c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3l-.9 2 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1 2.1-2.5zm-3.8 5.2c-.5 2.1-4 1-5.1.7l.9-3.7c1.1.3 4.8.8 4.2 3zm.5-5.3c-.5 1.9-3.4.9-4.3.7l.8-3.3c.9.2 4 .7 3.5 2.6z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      name: 'Ethereum',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <path d="M16.498 4v8.87l7.497 3.35z" fill="#FFFFFF" fillOpacity="0.6" />
          <path d="M16.498 4L9 16.22l7.498-3.35z" fill="#FFFFFF" />
          <path d="M16.498 21.968v6.027L24 17.616z" fill="#FFFFFF" fillOpacity="0.6" />
          <path d="M16.498 27.995v-6.027L9 17.616z" fill="#FFFFFF" />
          <path d="M16.498 20.573l7.497-4.353-7.497-3.349z" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M9 16.22l7.498 4.353v-7.702z" fill="#FFFFFF" fillOpacity="0.6" />
        </svg>
      ),
    },
    {
      name: 'TRON',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#EF0027" />
          <path d="M7 8l18 3.5-12 14.5L7 8z" fill="#FFFFFF" />
          <path d="M13 26l12-14.5-5.5 12L13 26z" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      ),
    },
    {
      name: 'Solana',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <rect width="32" height="32" rx="16" fill="#000000" />
          <path
            d="M8.5 22.8a.7.7 0 01.5-.2h14.5a.3.3 0 01.2.6l-2.4 2.4a.7.7 0 01-.5.2H6.3a.3.3 0 01-.2-.6l2.4-2.4zm0-9a.7.7 0 01.5-.2h14.5a.3.3 0 01.2.6l-2.4 2.4a.7.7 0 01-.5.2H6.3a.3.3 0 01-.2-.6l2.4-2.4zm12.6-9a.7.7 0 01.5.2l2.4 2.4a.3.3 0 01-.2.6H9.3a.7.7 0 01-.5-.2L6.4 4.4a.3.3 0 01.2-.6h14.5z"
            fill="url(#solGrad)"
          />
          <defs>
            <linearGradient id="solGrad" x1="6" y1="4" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FFA3" />
              <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'BNB Chain',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
          <path d="M16 8l3 3-4.5 4.5L10 11l6-3zm5.5 5.5l3 3-3 3-3-3 3-3zM16 24l-3-3 4.5-4.5L22 21l-6 3zm-5.5-5.5l-3-3 3-3 3 3-3 3zm3-2.5l2.5-2.5 2.5 2.5-2.5 2.5-2.5-2.5z" fill="#000000" />
        </svg>
      ),
    },
    {
      name: 'Polygon',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#8247E5" />
          <path d="M21.5 13.5l-3.5-2a1 1 0 00-1 0l-3.5 2v4l3.5 2a1 1 0 001 0l3.5-2v-4z" fill="#FFFFFF" />
          <path d="M14.5 17.5l-3.5-2a1 1 0 00-1 0l-3.5 2v4l3.5 2a1 1 0 001 0l3.5-2v-4z" fill="#FFFFFF" fillOpacity="0.7" />
        </svg>
      ),
    },
    {
      name: 'MHA / I4C',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#1E293B" stroke="rgba(255,255,255,0.2)" />
          <path d="M16 6l8 3.5v6.5c0 5.2-3.4 10-8 11.5-4.6-1.5-8-6.3-8-11.5V9.5L16 6z" fill="#3B82F6" fillOpacity="0.4" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="16" cy="15" r="3" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'CBI Cyber',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#0F172A" stroke="rgba(255,255,255,0.2)" />
          <path d="M16 7l2.5 5.5 6 .9-4.3 4.2 1 6-5.2-2.8-5.2 2.8 1-6-4.3-4.2 6-.9L16 7z" fill="#F59E0B" />
        </svg>
      ),
    },
    {
      name: 'INTERPOL',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#0369A1" />
          <circle cx="16" cy="16" r="10" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <path d="M16 6v20M6 16h20M9 11l14 10M9 21l14-10" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      ),
    },
    {
      name: 'FIU-IND',
      svg: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <circle cx="16" cy="16" r="16" fill="#065F46" />
          <path d="M16 8l7 4v6c0 4.5-3 8.7-7 10-4-1.3-7-5.5-7-10v-6l7-4z" fill="#10B981" />
          <path d="M13 16l2 2 4-4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const row1 = logos.slice(0, 5);
  const row2 = logos.slice(5, 10);

  return (
    <section className="py-20 bg-black relative z-10 text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-7">
        
        {/* Row 1 Logos with Staggered Entrance */}
        <ScrollReveal y={20} duration={0.8}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            {row1.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-2.5 opacity-80 hover:opacity-100 transition-opacity cursor-default group"
              >
                <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                  {item.svg}
                </div>
                <span className="text-white font-semibold text-sm sm:text-base tracking-tight">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Row 2 Logos with Staggered Entrance */}
        <ScrollReveal y={20} duration={0.8} delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 pt-2">
            {row2.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-2.5 opacity-80 hover:opacity-100 transition-opacity cursor-default group"
              >
                <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                  {item.svg}
                </div>
                <span className="text-white font-semibold text-sm sm:text-base tracking-tight">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Centered Sub-caption with Metallic ShinyText */}
        <ScrollReveal y={15} duration={0.8} delay={0.25}>
          <p className="text-center text-xs sm:text-sm text-slate-400 font-normal pt-4 max-w-lg mx-auto leading-relaxed">
            <ShinyText 
              text="Developers & Law Enforcement across India trust SAHYOG to keep blockchain investigations secure and compliant." 
              speed={3} 
              color="#94a3b8" 
              shineColor="#ffffff" 
            />
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
