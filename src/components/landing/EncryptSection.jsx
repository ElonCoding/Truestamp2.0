'use client';

import { ArrowRight, User, CreditCard, Code, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ShinyText from '../shared/ShinyText';
import ScrollReveal from '../motion/ScrollReveal';

export default function EncryptSection() {
  return (
    <section className="py-12 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 space-y-6">
        
        {/* 1. Top Full-Width Card: Inbound Relay with ScrollReveal */}
        <ScrollReveal y={30} duration={0.9}>
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-[32px] md:rounded-[44px] border border-white/[0.12] overflow-hidden p-8 sm:p-12 lg:p-14 min-h-[460px] flex items-center shadow-2xl bg-[#060814]"
            style={{
              background: `
                radial-gradient(ellipse 110% 70% at 50% 100%, rgba(139, 92, 246, 0.75) 0%, rgba(99, 102, 241, 0.45) 30%, rgba(59, 7, 100, 0.25) 55%, transparent 80%),
                #070914
              `,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">
              
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  <ShinyText text="Inbound Relay" speed={3} color="#ffffff" shineColor="#f8fafc" />
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90 max-w-md">
                  <ShinyText 
                    text="An invisible encryption proxy which automatically intercepts and encrypts selected sensitive fields before they touch your server. No additional configuration required." 
                    speed={4} 
                    color="#94a3b8" 
                    shineColor="#ffffff" 
                  />
                </p>
                <div className="pt-2">
                  <Link href="/verify" className="px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] hover:scale-105 active:scale-95 border border-white/[0.12] text-white font-medium text-xs transition-all inline-block">
                    Learn more
                  </Link>
                </div>
              </div>

              {/* Right Column: Floating Intercepted Field Chips Diagram */}
              <div className="lg:col-span-7 relative flex flex-col justify-center min-h-[300px] font-mono text-xs text-slate-300">
                
                {/* Server prompt */}
                <div className="text-[11px] text-slate-400 mb-2 pl-2">
                  Server listening on <span className="text-white font-semibold">port 8080</span>
                  <div className="text-slate-500">&#123;</div>
                </div>

                {/* Floating Chips Container with Stagger Hover */}
                <div className="relative pl-6 space-y-2.5">
                  
                  {/* Row 1: password & email */}
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-200 text-[11px] shadow-lg flex items-center gap-1.5 backdrop-blur-md cursor-default"
                    >
                      <span className="text-slate-400">password:</span>
                      <span className="text-purple-300">ev:OjOpX5djn4...</span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-200 text-[11px] shadow-lg flex items-center gap-1.5 backdrop-blur-md cursor-default"
                    >
                      <span className="text-slate-400">email:</span>
                      <span className="text-purple-300">ev:FzkGF1M4Adqa...</span>
                    </motion.div>
                  </div>

                  {/* Row 2: pan & phone */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[11px] backdrop-blur-md">
                      <span>pan: 4242424242424242</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[11px] backdrop-blur-md">
                      <span>phone: +123456789</span>
                    </div>
                  </div>

                  {/* Row 3: ssn & name */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-500 text-[11px] backdrop-blur-md">
                      <span>ssn: 123-45-6789</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[11px] backdrop-blur-md">
                      <span>name: Claude Shannon</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Glowing Proxy Bar https:// */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="mt-5 w-full max-w-md mx-auto py-2.5 px-5 rounded-full bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-purple-900/60 border border-purple-400/30 text-center text-xs text-purple-200 shadow-[0_0_25px_rgba(124,58,237,0.35)] backdrop-blur-md"
                >
                  https://
                </motion.div>

              </div>

            </div>
          </motion.div>
        </ScrollReveal>

        {/* 2. Bottom Two-Card Grid: Inputs & SDKs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Card: Inputs with ScrollReveal */}
          <ScrollReveal y={24} duration={0.8} delay={0.1}>
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-[32px] md:rounded-[40px] border border-white/[0.1] p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-[#070914] shadow-2xl relative overflow-hidden group h-full"
            >
              <div className="space-y-3.5 text-left relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  <ShinyText text="Inputs" speed={3} color="#ffffff" shineColor="#f8fafc" />
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90">
                  <ShinyText 
                    text="Embeddable forms which minimise your compliance burden by allowing you to collect cardholder data without touching it in plaintext." 
                    speed={4} 
                    color="#94a3b8" 
                    shineColor="#ffffff" 
                  />
                </p>
                <div className="pt-1">
                  <Link href="/verify" className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] hover:scale-105 active:scale-95 border border-white/[0.12] text-white font-medium text-xs transition-all inline-block">
                    Learn more
                  </Link>
                </div>
              </div>

              {/* Inputs UI Mockup Graphic */}
              <div className="relative pt-4 space-y-2">
                {/* Elevated Card Input */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl bg-[#0C0F24] border border-white/[0.12] p-4 shadow-xl space-y-3"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span>Playground</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
                    <span className="text-white tracking-widest text-[11px]">4242 4242 4242 4242</span>
                    <button className="px-3 py-1 rounded-lg bg-white/[0.1] hover:bg-white/[0.2] border border-white/[0.15] text-white text-[10px] font-sans flex items-center gap-1 active:scale-95 transition-all">
                      <Sparkles size={10} className="text-purple-300" />
                      <span>Encrypt</span>
                    </button>
                  </div>
                </motion.div>

                {/* Tucked Terminal Window Header Peek */}
                <div className="rounded-t-xl bg-[#090C1B] border-t border-x border-white/[0.08] p-2.5 px-4 text-[10px] font-mono text-slate-500 opacity-60">
                  Terminal
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right Card: SDKs with ScrollReveal */}
          <ScrollReveal y={24} duration={0.8} delay={0.2}>
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-[32px] md:rounded-[40px] border border-white/[0.1] p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-[#070914] shadow-2xl relative overflow-hidden group h-full"
            >
              <div className="space-y-3.5 text-left relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  <ShinyText text="SDKs" speed={3} color="#ffffff" shineColor="#f8fafc" />
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90">
                  <ShinyText 
                    text="Language-specific tools for performing encryption operations and workflows from your code." 
                    speed={4} 
                    color="#94a3b8" 
                    shineColor="#ffffff" 
                  />
                </p>
                <div className="pt-1">
                  <Link href="/verify" className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] hover:scale-105 active:scale-95 border border-white/[0.12] text-white font-medium text-xs transition-all inline-block">
                    Learn more
                  </Link>
                </div>
              </div>

              {/* Concentric Orbital Radar with Floating Tech Circles */}
              <div className="relative h-44 flex items-center justify-center overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/[0.08]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-white/[0.1]" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full border border-purple-500/20" />
                <div className="absolute -bottom-20 -left-20 w-32 h-32 rounded-full border border-indigo-500/30" />

                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="absolute bottom-20 left-12 w-10 h-10 rounded-full bg-[#11142E] border border-white/[0.2] flex items-center justify-center text-cyan-300 shadow-lg cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="absolute bottom-8 left-28 w-9 h-9 rounded-full bg-[#11142E] border border-white/[0.2] flex items-center justify-center text-emerald-400 shadow-lg font-bold text-[10px] cursor-pointer"
                >
                  node
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="absolute bottom-2 left-44 w-8 h-8 rounded-full bg-[#11142E] border border-white/[0.2] flex items-center justify-center text-amber-300 shadow-lg font-bold text-[10px] cursor-pointer"
                >
                  JS
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>

        </div>

        {/* 3. Three-Column Micro Captions with ScrollReveal */}
        <ScrollReveal y={20} duration={0.8} delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-400 border-t border-white/[0.08] text-left">
            <div className="flex items-start gap-2.5">
              <User size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Encrypt sensitive user data before it reaches your server with Inbound Relay." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <CreditCard size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Collect and encrypt cardholder data without handling it in plaintext using Inputs." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Code size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Encrypt auth tokens on the client using any of our SDKs." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
