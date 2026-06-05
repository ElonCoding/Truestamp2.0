'use client';

import { Building2, Upload, ShieldCheck, UserCheck, ArrowDown } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: 'Authority Applies',
    description: 'Organization submits an application with domain, department, and wallet address. Email domain is verified via OTP.',
    icon: Building2,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/30',
    dot: 'bg-violet-400',
  },
  {
    step: 2,
    title: 'Admin Whitelists On-Chain',
    description: 'TrueStamp admin reviews and approves, triggering a whitelistAuthority() transaction on Polygon, granting ISSUER_ROLE.',
    icon: ShieldCheck,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/30',
    dot: 'bg-brand-400',
  },
  {
    step: 3,
    title: 'Bulk Upload to IPFS',
    description: 'Authority bulk-uploads documents. Files are pinned to IPFS via Lighthouse + Filecoin. A Merkle tree is built from document hashes.',
    icon: Upload,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    dot: 'bg-blue-400',
  },
  {
    step: 4,
    title: 'Merkle Root Anchored',
    description: 'The Merkle root is submitted on-chain via submitBatch(). Each document hash is indexed. The batch is immutable.',
    icon: ShieldCheck,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/30',
    dot: 'bg-cyan-400',
  },
  {
    step: 5,
    title: 'Anyone Verifies Instantly',
    description: 'A verifier uploads a document. TrueStamp hashes it, fetches the Merkle proof, and calls verifyDocument() on-chain in <2s.',
    icon: UserCheck,
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/30',
    dot: 'bg-green-400',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/20 mb-6">
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Verification Flow</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          How <span className="gradient-text">TrueStamp</span> Works
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          From document upload to cryptographic proof — fully transparent and trustless.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {steps.map(({ step, title, description, icon: Icon, color, bg, dot }, idx) => (
          <div key={step} className="relative">
            {/* Step card */}
            <div className={`flex gap-5 glass-card border ${bg} p-6 rounded-2xl mb-2 hover:scale-[1.01] transition-transform duration-200`}>
              {/* Step number + icon */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl ${bg} border flex flex-col items-center justify-center gap-0.5`}>
                  <Icon size={20} className={color} />
                  <span className={`text-[10px] font-bold ${color} opacity-70`}>{String(step).padStart(2, '0')}</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1.5">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Connector */}
            {idx < steps.length - 1 && (
              <div className="flex justify-center py-1 ml-6">
                <ArrowDown size={18} className="text-brand-500/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
