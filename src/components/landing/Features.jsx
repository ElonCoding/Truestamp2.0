'use client';

import { Building2, Upload, Search, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const phases = [
  {
    phase: '01',
    title: 'Authority Onboarding',
    description: 'Organizations apply, get domain-verified, and are whitelisted on-chain by the TrueStamp admin. Full KYB pipeline.',
    icon: Building2,
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.3)',
    href: '/onboard',
    features: ['Multi-step application', 'Domain email verification', 'On-chain whitelisting', 'Firebase queue management'],
  },
  {
    phase: '02',
    title: 'Document Issuance',
    description: 'Whitelisted authorities bulk-upload documents to IPFS via Lighthouse. A Merkle tree root is anchored on Polygon.',
    icon: Upload,
    color: 'from-brand-500 to-brand-700',
    glow: 'rgba(123,63,228,0.3)',
    href: '/authority',
    features: ['Drag & drop bulk upload', 'IPFS + Filecoin storage', 'Merkle tree batching', 'On-chain root anchoring'],
  },
  {
    phase: '03',
    title: 'Instant Verification',
    description: 'Anyone can upload a document and get cryptographic verification in under 2 seconds via on-chain Merkle proof.',
    icon: Search,
    color: 'from-blue-500 to-cyan-600',
    glow: 'rgba(59,130,246,0.3)',
    href: '/verify',
    features: ['Drag & drop verification', 'keccak256 hashing', 'Merkle proof on-chain', 'Issuer identity reveal'],
  },
  {
    phase: '04',
    title: 'Holder Control',
    description: 'Document holders control access, preview IPFS files, and configure smart-contract nominees for estate planning.',
    icon: User,
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.3)',
    href: '/dashboard',
    features: ['Document dashboard', 'IPFS file preview', 'Nominee management', 'Smart-contract controlled'],
  },
];

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/20 mb-6">
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Platform Architecture</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Four Phases,
          <span className="gradient-text"> One Truth</span>
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          A complete lifecycle — from authority onboarding to instant cryptographic verification.
        </p>
      </div>

      {/* Phase grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phases.map(({ phase, title, description, icon: Icon, color, glow, href, features }) => (
          <div
            key={phase}
            className="glass-card-hover p-8 rounded-2xl group relative overflow-hidden"
            style={{ '--glow': glow }}
          >
            {/* Background glow */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
              style={{ background: glow }}
            />

            <div className="relative z-10">
              {/* Phase number + icon */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${glow}` }}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-5xl font-black text-white/5 select-none group-hover:text-white/10 transition-colors">
                  {phase}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{description}</p>

              {/* Feature list */}
              <ul className="space-y-2 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} flex-shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group/link"
              >
                Explore Phase {phase}
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
