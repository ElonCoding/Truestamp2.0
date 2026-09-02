'use client';

import { Shield, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import ShinyText from '../shared/ShinyText';
import TextReveal from '../motion/TextReveal';
import ScrollReveal from '../motion/ScrollReveal';
import Parallax from '../motion/Parallax';

export default function HeroFeatureCard() {
  return (
    <section className="py-12 md:py-16 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6">
        
        {/* Giant Feature Card */}
        <ScrollReveal y={30} duration={0.9}>
          <div 
            className="relative rounded-[32px] md:rounded-[44px] border border-white/[0.12] overflow-hidden p-8 sm:p-12 lg:p-14 min-h-[560px] flex items-center shadow-2xl"
            style={{
              background: `
                radial-gradient(ellipse 90% 75% at 12% 15%, rgba(196, 181, 253, 0.75) 0%, rgba(139, 92, 246, 0.5) 30%, transparent 65%),
                radial-gradient(ellipse 90% 75% at 88% 15%, rgba(196, 181, 253, 0.75) 0%, rgba(124, 58, 237, 0.5) 30%, transparent 65%),
                linear-gradient(180deg, #6B21A8 0%, #3B0764 35%, #180733 70%, #060212 100%)
              `,
            }}
          >

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full relative z-10">
              
              {/* Left Column: Feature Text with TextReveal */}
              <div className="lg:col-span-5 space-y-5 text-left">
                
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.1] border border-white/[0.2] text-xs font-medium text-white shadow-sm">
                  <ShinyText text="The first encryption platform" speed={3} color="#cbd5e1" shineColor="#ffffff" />
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.1] space-y-1">
                  <TextReveal delay={0.1} mode="line">
                    <ShinyText text="Customer data" speed={3} color="#ffffff" shineColor="#f1f5f9" />
                  </TextReveal>
                  <TextReveal delay={0.2} mode="line">
                    <ShinyText text="that's always" speed={3} color="#ffffff" shineColor="#f1f5f9" />
                  </TextReveal>
                  <TextReveal delay={0.3} mode="line">
                    <ShinyText text="secure and" speed={3} color="#ffffff" shineColor="#f1f5f9" />
                  </TextReveal>
                  <TextReveal delay={0.4} mode="line">
                    <ShinyText text="compliant" speed={3} color="#ffffff" shineColor="#f1f5f9" />
                  </TextReveal>
                </h2>

                {/* Description */}
                <div className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal opacity-90 max-w-md">
                  <TextReveal delay={0.5} mode="line">
                    <ShinyText 
                      text="Automatically secure any inbound data — like credit cards or PII — with best-in-class encryption. With the Evervault platform you can run secure serverless functions and safely share data with third party APIs." 
                      speed={4} 
                      color="#e2e8f0" 
                      shineColor="#ffffff" 
                    />
                  </TextReveal>
                </div>
              </div>

              {/* Right Column: Floating Mockups Composition */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px]">
                
                {/* 1. Center White Mobile Card */}
                <Parallax speed={0.08}>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative z-30 w-64 sm:w-72 bg-white text-black rounded-[26px] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-200 space-y-3.5 transform -translate-x-4 sm:-translate-x-12 cursor-pointer"
                  >
                    <div className="text-center space-y-1">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 mx-auto flex items-center justify-center shadow-md">
                        <Shield size={18} className="text-white" />
                      </div>
                      <div className="font-bold text-xs text-slate-900">Pay PlanetExpress</div>
                      <div className="text-[10px] text-slate-400 font-mono">Billed to Claude Shannon</div>
                    </div>

                    <div className="space-y-2 text-left text-[11px]">
                      <div>
                        <label className="text-[9px] text-slate-400 font-medium block mb-0.5">Email address</label>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-700 text-[10px] truncate">
                          claude@shannon.org
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 font-medium block mb-0.5">Card details</label>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-700 text-[10px]">
                          1234 1234 1234 1234
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px]">
                          <span className="text-slate-400 block text-[8px]">EXPIRY</span>
                          <span className="font-mono text-slate-800 text-[10px]">04/26</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px]">
                          <span className="text-slate-400 block text-[8px]">CVC</span>
                          <span className="font-mono text-slate-800 text-[10px]">110</span>
                        </div>
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 rounded-xl bg-black text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      Pay $25.00
                    </motion.button>
                  </motion.div>
                </Parallax>

                {/* 2. Top-Right Dark Code Window */}
                <Parallax speed={-0.06}>
                  <motion.div 
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-2 right-0 sm:right-4 z-20 w-72 sm:w-80 rounded-2xl bg-[#090C1D]/95 border border-white/[0.15] p-4 shadow-2xl backdrop-blur-xl font-mono text-[11px] text-slate-300 space-y-2"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[10px] text-slate-400">
                      <span>server.js</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.08] text-white text-[9px] border border-white/[0.1]">
                        <Zap size={10} className="text-amber-300" />
                        <span>Run Evervault</span>
                      </div>
                    </div>

                    <div className="space-y-0.5 leading-relaxed text-[10px]">
                      <div><span className="text-purple-400">1</span>  <span className="text-purple-300">export default async function</span> handler(req, res) &#123;</div>
                      <div><span className="text-purple-400">2</span>    <span className="text-purple-300">const</span> &#123; encrypted &#125; = req.body;</div>
                      <div><span className="text-purple-400">3</span></div>
                      <div><span className="text-purple-400">4</span>    <span className="text-purple-300">const</span> lastFour = <span className="text-purple-300">await</span> evervault.run(&apos;getLastFour&apos;, &#123; encrypted &#125;);</div>
                      <div><span className="text-purple-400">5</span>    <span className="text-purple-300">await</span> db.customers.insert(&#123; ...encrypted, lastFour &#125;);</div>
                      <div><span className="text-purple-400">6</span>    <span className="text-purple-300">await</span> stripe.charge.create(&#123; encrypted &#125;);</div>
                      <div><span className="text-purple-400">7</span></div>
                      <div><span className="text-purple-400">8</span>    res.status(200).json(&#123; encrypted &#125;);</div>
                      <div><span className="text-purple-400">9</span>  &#125;</div>
                    </div>
                  </motion.div>
                </Parallax>

                {/* 3. Bottom-Right Code Window */}
                <div className="absolute bottom-2 right-4 z-10 w-64 sm:w-72 rounded-2xl bg-[#090C1D]/90 border border-white/[0.1] p-3.5 shadow-xl font-mono text-[10px] text-slate-300 space-y-1.5 hidden sm:block">
                  <div className="text-[10px] text-slate-500 border-b border-white/[0.06] pb-1">
                    ev-function.js
                  </div>
                  <div className="space-y-0.5 text-slate-400">
                    <div><span className="text-purple-400">1</span>  <span className="text-slate-500">// getLastFour</span></div>
                    <div><span className="text-purple-400">2</span>  exports.handler = <span className="text-purple-300">async function</span>(&#123; encrypted &#125;) &#123;</div>
                    <div><span className="text-purple-400">3</span>    <span className="text-purple-300">const</span> &#123; cardNumber &#125; = encrypted;</div>
                    <div><span className="text-purple-400">4</span>    <span className="text-purple-300">return</span> cardNumber.substr(cardNumber.length - 4);</div>
                    <div><span className="text-purple-400">5</span>  &#125;;</div>
                  </div>
                </div>

                {/* Mini Badges */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-6 right-80 z-40 w-10 h-10 rounded-xl bg-purple-900/80 border border-purple-400/40 flex items-center justify-center text-white shadow-lg hidden md:flex"
                >
                  <Database size={16} className="text-purple-200" />
                </motion.div>

                <div className="absolute bottom-16 right-72 z-40 px-3 py-1.5 rounded-xl bg-black/80 border border-white/20 text-[10px] font-bold text-white shadow-lg hidden md:flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>stripe</span>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section Title Centered Below Card with TextReveal */}
        <div className="text-center mt-24 mb-6 space-y-2.5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            <TextReveal delay={0.1} mode="line">
              <ShinyText text="Encrypt" speed={2.5} color="#ffffff" shineColor="#f8fafc" />
            </TextReveal>
          </h2>
          <div className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-normal">
            <TextReveal delay={0.2} mode="line">
              <ShinyText 
                text="Effortlessly protect customer data with minimal changes to your existing code." 
                speed={3} 
                color="#94a3b8" 
                shineColor="#ffffff" 
              />
            </TextReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
