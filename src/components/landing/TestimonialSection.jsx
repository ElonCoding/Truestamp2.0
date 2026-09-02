'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from '../shared/ShinyText';
import ScrollReveal from '../motion/ScrollReveal';

export default function TestimonialSection() {
  const [activeTab, setActiveTab] = useState(0);

  const testimonials = [
    {
      quote: "Being able to trace unhosted multi-hop crypto flows and attribute them to exchange deposit addresses in seconds has cut FIR resolution time by 90%.",
      author: "Arnav Choksey",
      role: "Co-Founder & Chief Architect",
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 mx-auto" fill="none">
          <circle cx="20" cy="20" r="18" fill="#090D24" stroke="url(#leaGrad)" strokeWidth="1.5" />
          <path d="M20 9L28 13.5V20C28 25.5 24.5 30 20 31.5C15.5 30 12 25.5 12 20V13.5L20 9Z" fill="#3B82F6" fillOpacity="0.2" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="20" cy="19" r="3.5" fill="#A78BFA" />
          <defs>
            <linearGradient id="leaGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      quote: "Automating Section 91 CrPC notice dispatch directly to VASP compliance desks prevents suspect funds from being liquidated off-chain.",
      author: "Dhruv",
      role: "Lead Blockchain Engineer",
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 mx-auto" fill="none">
          <circle cx="20" cy="20" r="18" fill="#090D24" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M20 10L22.5 15.5L28.5 16.4L24.2 20.6L25.2 26.6L20 23.8L14.8 26.6L15.8 20.6L11.5 16.4L17.5 15.5L20 10Z" fill="#F59E0B" fillOpacity="0.3" stroke="#FBBF24" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      quote: "Unified multi-chain graph traversal across Bitcoin, Ethereum, and Tron gives our forensic teams court-admissible cryptographic evidence.",
      author: "Akshat",
      role: "Head of Security & Intelligence Systems",
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 mx-auto" fill="none">
          <circle cx="20" cy="20" r="18" fill="#090D24" stroke="#10B981" strokeWidth="1.5" />
          <path d="M20 11L27 15V21C27 25 24 28.5 20 30C16 28.5 13 25 13 21V15L20 11Z" fill="#10B981" fillOpacity="0.25" stroke="#34D399" strokeWidth="1.5" />
          <path d="M17 19L19 21L23 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const current = testimonials[activeTab];

  return (
    <section className="py-24 bg-black relative text-center overflow-hidden">
      
      {/* Background Arch Line matching Evervault */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[540px] h-[270px] rounded-t-full border-t border-x border-white/[0.08] pointer-events-none opacity-60" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        <ScrollReveal y={20} duration={0.8}>
          {/* Top Agency Emblem / Badge */}
          <div className="h-12 flex items-center justify-center">
            {current.icon}
          </div>
        </ScrollReveal>

        {/* Big Quote with Animated Crossfade */}
        <div className="min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote 
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl font-mono text-slate-100 tracking-tight leading-relaxed"
            >
              <ShinyText 
                text={`"${current.quote}"`} 
                speed={3.5} 
                color="#f1f5f9" 
                shineColor="#ffffff" 
              />
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Tab Selector Pills with Interactive Spring Hover */}
        <ScrollReveal y={15} duration={0.8} delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {testimonials.map((t, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveTab(idx)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === idx
                    ? 'bg-white/[0.14] border border-white/[0.25] text-white shadow-lg'
                    : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-semibold text-white">{t.author}</span>
                <span className="text-slate-400 font-normal">{t.role}</span>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
