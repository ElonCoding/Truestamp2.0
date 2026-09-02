'use client';

import { Send, Shield, Globe, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ShinyText from '../shared/ShinyText';
import ScrollReveal from '../motion/ScrollReveal';

export default function ShareSection() {
  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal y={24} duration={0.8}>
          <div className="text-center space-y-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              <ShinyText text="Share" speed={2.5} color="#ffffff" shineColor="#f8fafc" />
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-normal">
              <ShinyText 
                text="Safely send and forward encrypted payloads to third-party APIs with automated decryption on the wire." 
                speed={3} 
                color="#94a3b8" 
                shineColor="#ffffff" 
              />
            </p>
          </div>
        </ScrollReveal>

        {/* Full-Width Card */}
        <ScrollReveal y={30} duration={0.9}>
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="rounded-[32px] md:rounded-[44px] border border-white/[0.12] overflow-hidden p-8 sm:p-12 lg:p-14 relative group bg-[#070914] shadow-2xl"
          >
            {/* Ambient Violet Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-40 hero-bottom-glow opacity-50 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  <ShinyText text="Outbound Relay" speed={3} color="#ffffff" shineColor="#f8fafc" />
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90 max-w-md">
                  <ShinyText 
                    text="An outbound proxy that securely routes your API requests, automatically decrypting selected sensitive fields right before they reach third-party endpoints like Stripe, Twilio, or OpenAI." 
                    speed={4} 
                    color="#94a3b8" 
                    shineColor="#ffffff" 
                  />
                </p>
                <div className="pt-2">
                  <Link href="/verify" className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all shadow-md inline-block">
                    Explore Outbound Relay →
                  </Link>
                </div>
              </div>

              {/* Right Column: Code Window & Proxy Payload */}
              <div className="lg:col-span-7 space-y-4 font-mono text-xs text-left">
                
                {/* JSON Proxy Payload Preview */}
                <div className="rounded-2xl bg-[#090C1A] border border-white/[0.08] p-5 shadow-2xl space-y-2 text-[11px] leading-relaxed text-slate-300">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-slate-500">
                    <span>outbound_request.json</span>
                    <span className="text-emerald-400">ENCRYPTED AT REST</span>
                  </div>
                  <div><span className="text-purple-400">&quot;destinationUrl&quot;</span>: <span className="text-white">&quot;https://api.stripe.com/v1/charges&quot;</span>,</div>
                  <div><span className="text-purple-400">&quot;decryptionPolicy&quot;</span>: <span className="text-amber-300">&quot;DECRYPT_ON_EGRESS&quot;</span>,</div>
                  <div><span className="text-purple-400">&quot;encryptedCardNumber&quot;</span>: <span className="text-cyan-300">&quot;ev:0jOpX5djn4k829m1...&quot;</span>,</div>
                  <div><span className="text-purple-400">&quot;complianceScope&quot;</span>: <span className="text-emerald-300">&quot;PCI_DSS_LEVEL_1_CERTIFIED&quot;</span>,</div>
                  <div><span className="text-purple-400">&quot;proxyStatus&quot;</span>: <span className="text-slate-400">&quot;RELAY_ACTIVE_200_OK&quot;</span></div>
                </div>

              </div>

            </div>
          </motion.div>
        </ScrollReveal>

        {/* 3-Column Bullet Points */}
        <ScrollReveal y={20} duration={0.8} delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-400 border-t border-white/[0.08] text-left">
            <div className="flex items-start gap-2.5">
              <Send size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Forward encrypted data directly to third parties without decrypting in your backend." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Configure domain-specific decryption rules with fine-grained field policies." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Lock size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
              <span>
                <ShinyText text="Complete audit logs for every forwarded request and egress payload." speed={3} color="#94a3b8" shineColor="#ffffff" />
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
