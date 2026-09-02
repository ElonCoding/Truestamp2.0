'use client';

import { useState } from 'react';
import { Shield, Lock, Server, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ShinyText from '../shared/ShinyText';
import ScrollReveal from '../motion/ScrollReveal';

export default function ProcessSection() {
  const [activeTab, setActiveTab] = useState('function');

  return (
    <section className="py-16 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal y={24} duration={0.8}>
          <div className="text-center space-y-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              <ShinyText text="Process" speed={2.5} color="#ffffff" shineColor="#f8fafc" />
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-normal">
              <ShinyText 
                text="Process and decrypt sensitive data securely using serverless Cages and Functions." 
                speed={3} 
                color="#94a3b8" 
                shineColor="#ffffff" 
              />
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Card Grid: Cages & Functions with ScrollReveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Cages */}
          <ScrollReveal y={30} duration={0.8} delay={0.1}>
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-[32px] md:rounded-[40px] border border-white/[0.1] p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#070914] shadow-2xl relative overflow-hidden group h-full"
            >
              {/* Ambient Violet Corner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10 text-left">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    <ShinyText text="Cages" speed={3} color="#ffffff" shineColor="#f8fafc" />
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-purple-300 border border-white/[0.1]">
                    Nitro Enclaves
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90 max-w-md">
                  <ShinyText 
                    text="Confidential computing environments built on AWS Nitro Enclaves that allow you to process sensitive data in complete isolation." 
                    speed={4} 
                    color="#94a3b8" 
                    shineColor="#ffffff" 
                  />
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <Link href="/verify" className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] hover:scale-105 active:scale-95 border border-white/[0.12] text-white font-medium text-xs transition-all inline-block">
                    Learn more
                  </Link>
                  <Link href="/admin" className="text-xs text-slate-400 hover:text-white transition-colors">
                    Cages docs →
                  </Link>
                </div>
              </div>

              {/* Isometric 3D Wireframe Cage Mockup with Hover Animation */}
              <div className="relative h-64 rounded-2xl bg-gradient-to-br from-[#0C0F28] to-[#060814] border border-white/[0.08] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-purple-600/10 blur-3xl" />
                
                {/* Outer Isometric Diamond Frame */}
                <motion.div 
                  whileHover={{ rotate: 50, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative z-10 w-36 h-36 border border-purple-500/30 rounded-2xl transform rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.35)] cursor-pointer"
                >
                  {/* Inner Glowing Enclave Box */}
                  <div className="w-24 h-24 border border-white/20 bg-black/40 backdrop-blur-md rounded-xl flex flex-col items-center justify-center text-[10px] font-mono text-white transform -rotate-45 space-y-1.5 shadow-inner">
                    <Cpu size={22} className="text-purple-300 animate-pulse" />
                    <span className="text-[9px] text-slate-300 font-semibold tracking-wider">NITRO CORE</span>
                  </div>
                </motion.div>

                {/* Surrounding Matrix Points */}
                <div className="absolute inset-x-8 bottom-4 flex justify-between text-[9px] font-mono text-slate-500 opacity-60">
                  <span>0xEnclave_Ready</span>
                  <span>Isolated: Active</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right Card: Functions */}
          <ScrollReveal y={30} duration={0.8} delay={0.2}>
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-[32px] md:rounded-[40px] border border-white/[0.1] p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#070914] shadow-2xl relative overflow-hidden group h-full"
            >
              <div className="space-y-4 text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  <ShinyText text="Functions" speed={3} color="#ffffff" shineColor="#f8fafc" />
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90 max-w-md">
                  <ShinyText 
                    text="Serverless functions that automatically decrypt data before processing, allowing you to run custom business logic without touching plaintext." 
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

              {/* Code Window with Tabs & Smooth Tab Fade */}
              <div className="rounded-2xl bg-[#090C1E] border border-white/[0.08] shadow-2xl overflow-hidden font-mono text-xs text-left">
                
                {/* Tab Selector */}
                <div className="flex items-center gap-1 px-3 py-2 bg-white/[0.02] border-b border-white/[0.06] text-[11px]">
                  <button
                    onClick={() => setActiveTab('function')}
                    className={`px-3 py-1 rounded-md transition-all active:scale-95 ${activeTab === 'function' ? 'bg-white/[0.1] text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    function.js
                  </button>
                  <button
                    onClick={() => setActiveTab('schema')}
                    className={`px-3 py-1 rounded-md transition-all active:scale-95 ${activeTab === 'schema' ? 'bg-white/[0.1] text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    schema.json
                  </button>
                </div>

                {/* Code Panel */}
                <div className="p-4 text-[11px] leading-relaxed text-slate-300 space-y-1 min-h-[140px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'function' ? (
                      <motion.div
                        key="function"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div><span className="text-purple-400">export default async function</span> handler(req, res) &#123;</div>
                        <div className="pl-4"><span className="text-purple-300">const</span> &#123; encrypted &#125; = req.body;</div>
                        <div className="pl-4"><span className="text-purple-300">const</span> result = <span className="text-purple-300">await</span> processData(encrypted);</div>
                        <div className="pl-4">res.status(200).json(&#123; result &#125;);</div>
                        <div>&#125;</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="schema"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-slate-400">&#123;</div>
                        <div className="pl-4"><span className="text-cyan-300">&quot;runtime&quot;</span>: <span className="text-emerald-300">&quot;nodejs18.x&quot;</span>,</div>
                        <div className="pl-4"><span className="text-cyan-300">&quot;decryption&quot;</span>: <span className="text-purple-300">true</span>,</div>
                        <div className="pl-4"><span className="text-cyan-300">&quot;isolation&quot;</span>: <span className="text-white">&quot;nitro_enclave&quot;</span></div>
                        <div className="text-slate-400">&#125;</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </ScrollReveal>

        </div>

        {/* 3-Column Bullet Points */}
        <ScrollReveal y={20} duration={0.8} delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-400 border-t border-white/[0.08] text-left">
            <div className="flex items-start gap-2.5">
              <Lock size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Isolate sensitive workloads in dedicated hardware enclaves using Cages." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Cpu size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Decrypt and process sensitive data on the fly with Functions." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Shield size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Maintain end-to-end encryption throughout the entire processing lifecycle." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
