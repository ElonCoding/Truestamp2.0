'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ShinyText from '../shared/ShinyText';
import ScrollReveal from '../motion/ScrollReveal';

export default function CtaSection() {
  return (
    <section className="py-12 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6">
        
        {/* Giant Rounded CTA Card with Radiant Violet Bottom Gradient */}
        <ScrollReveal y={30} duration={0.9}>
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-[32px] md:rounded-[44px] border border-white/[0.12] overflow-hidden p-12 sm:p-16 md:p-20 min-h-[380px] flex flex-col items-center justify-center text-center shadow-2xl bg-[#060814]"
            style={{
              background: `
                radial-gradient(ellipse 130% 85% at 50% 100%, #8B5CF6 0%, #7C3AED 28%, #6366F1 50%, #1E1B4B 75%, transparent 100%),
                #060814
              `,
            }}
          >
            <div className="max-w-2xl mx-auto space-y-6 relative z-20">
              
              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                <ShinyText text="Trace, Attribute," speed={3} color="#ffffff" shineColor="#f8fafc" /> <br />
                <ShinyText text="Enforce." speed={3} color="#ffffff" shineColor="#f8fafc" />
              </h2>

              {/* Subtitle */}
              <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-normal opacity-90 max-w-lg mx-auto">
                <ShinyText 
                  text="The national blockchain intelligence platform for investigators who need to recover digital assets faster." 
                  speed={4} 
                  color="#e2e8f0" 
                  shineColor="#ffffff" 
                />
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <Link 
                  href="/verify" 
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all shadow-lg inline-block"
                >
                  Launch Investigation
                </Link>
              </div>

            </div>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  );
}
