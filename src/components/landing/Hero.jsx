'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-700/20 animate-pulse border border-brand-500/30" />
    </div>
  ),
});

const stats = [
  { label: 'Documents Verified', value: '1.2M+', icon: Shield },
  { label: 'Authorities Onboarded', value: '340+', icon: Globe },
  { label: 'Avg. Verify Time', value: '<2s', icon: Zap },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-90 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* Radial overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080312] via-[#080312]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/70">Live on Polygon Amoy Testnet</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-xs text-brand-400 font-semibold">LNCT Buildverse 2025</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
            <span className="text-white">Document Truth,</span>
            <br />
            <span className="gradient-text">On Chain.</span>
          </h1>

          <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-lg">
            TrueStamp delivers cryptographic proof for every document — issued by trusted authorities, stored on IPFS, verified in seconds on Polygon. No middlemen. No forgery.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/verify" id="hero-cta-verify" className="btn-primary flex items-center gap-2 text-base">
              <Shield size={18} />
              Verify a Document
              <ArrowRight size={16} />
            </Link>
            <Link href="/onboard" id="hero-cta-onboard" className="btn-ghost flex items-center gap-2 text-base">
              Join as Authority
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-card p-4 rounded-xl border border-white/10 text-center">
                <Icon size={16} className="text-brand-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080312] to-transparent" />
    </section>
  );
}
