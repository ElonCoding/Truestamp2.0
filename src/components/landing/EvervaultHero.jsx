'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ShinyText from '../shared/ShinyText';
import TextReveal from '../motion/TextReveal';
import CipherReveal from '../motion/CipherReveal';
import Parallax from '../motion/Parallax';
import HeroAsciiVisual from './HeroAsciiVisual';

import ConnectWalletButton from '../shared/ConnectWalletButton';

export default function EvervaultHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="bg-black pt-3 px-3 sm:px-5 md:px-6">
      {/* Outer Hero Container with Smooth Rounded Bottom Corners */}
      <section className="relative w-full max-w-[1400px] mx-auto min-h-[640px] md:min-h-[700px] bg-[#060713] rounded-[32px] md:rounded-[44px] border border-white/[0.1] overflow-hidden flex flex-col justify-between shadow-2xl">
        
        {/* Top Navbar */}
        <motion.header 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 w-full px-6 sm:px-10 py-6 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-6 h-6 min-w-[24px] max-w-[24px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                fill="none" 
                className="w-5 h-5 text-white block" 
                style={{ width: '20px', height: '20px', minWidth: '20px', maxWidth: '20px' }}
                stroke="currentColor" 
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              sahyog
            </span>
          </Link>

          {/* Center Pill Nav */}
          <nav className="hidden md:flex items-center gap-6 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 backdrop-blur-md">
            <Link href="/" className="text-white hover:text-white transition-colors">Home</Link>
            <Link href="/verify" className="text-slate-400 hover:text-white transition-colors">Use Cases</Link>
            <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/authority" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
            <Link href="/verify" className="text-slate-400 hover:text-white transition-colors">Docs</Link>
          </nav>

          {/* Right Action: Web3 Connect Wallet Button */}
          <div className="flex items-center gap-3">
            <ConnectWalletButton />
          </div>
        </motion.header>

        {/* Hero Body Content */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 md:py-16 relative z-20 w-full flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
            
            {/* Left Column: Text & Buttons */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-5 text-left"
            >
              
              {/* Beta Pill Badge with Cipher Reveal */}
              <motion.div variants={itemVariants}>
                <Link 
                  href="/verify" 
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-slate-300 hover:border-white/[0.2] transition-colors hover:scale-[1.02] active:scale-95"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <CipherReveal text="Cages are now in Beta — Learn more →" delay={0.2} speed={30} />
                </Link>
              </motion.div>

              {/* Exact 3-Tone Headline with Masked TextReveal */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.08] space-y-1">
                <TextReveal delay={0.2} duration={0.9} mode="line">
                  <ShinyText text="Effortless" speed={3} color="#ffffff" shineColor="#f8fafc" />
                </TextReveal>
                <TextReveal delay={0.3} duration={0.9} mode="line">
                  <ShinyText text="Encryption for" speed={3} color="#a1a1aa" shineColor="#ffffff" />
                </TextReveal>
                <TextReveal delay={0.4} duration={0.9} mode="line">
                  <ShinyText text="Developers" speed={3} color="#71717a" shineColor="#ffffff" />
                </TextReveal>
              </h1>

              {/* Subtitle with TextReveal */}
              <div className="text-slate-300 text-sm sm:text-base max-w-md leading-relaxed font-normal opacity-90">
                <TextReveal delay={0.5} duration={0.8} mode="line">
                  <ShinyText 
                    text="The first encryption platform that allows you to encrypt, process, and share sensitive customer data — without touching it in plaintext." 
                    speed={4} 
                    color="#94a3b8" 
                    shineColor="#ffffff" 
                  />
                </TextReveal>
              </div>

              {/* Action Buttons with Web3 Connect Wallet */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
                <ConnectWalletButton className="px-6 py-2.5 text-xs sm:text-sm font-semibold" />
                <Link 
                  href="/verify" 
                  className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] hover:scale-105 border border-white/[0.12] text-white font-medium text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Launch Trace Studio</span>
                  <span>→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero-Exclusive Interactive Generative ASCII Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <Parallax speed={0.12}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="relative flex items-center justify-center"
                >
                  <HeroAsciiVisual />
                </motion.div>
              </Parallax>
            </div>

          </div>
        </div>

        {/* Radiant Bottom Ambient Gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse 130% 85% at 50% 100%, #8B5CF6 0%, #7C3AED 28%, #6366F1 50%, #1E1B4B 75%, transparent 100%)',
          }}
        />

      </section>
    </div>
  );
}
