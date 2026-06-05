import { ExternalLink, Zap, Shield, Clock, Layers } from 'lucide-react';

const pillars = [
  { icon: Zap, label: 'Low Gas Fees', sub: '~$0.001/tx' },
  { icon: Shield, label: 'EVM Compatible', sub: 'Solidity 0.8.20' },
  { icon: Clock, label: 'Fast Finality', sub: '<2s confirmation' },
  { icon: Layers, label: 'IPFS + Filecoin', sub: 'Lighthouse SDK' },
];

export default function TrustBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="glass-card border border-brand-500/20 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10">
          {/* Polygon badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                {/* Polygon logo mock */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B3FE4] to-[#5A2BAF] flex items-center justify-center shadow-[0_0_20px_rgba(123,63,228,0.5)]">
                  <span className="text-white font-black text-xs">POL</span>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Secured by</p>
                  <h3 className="text-2xl font-extrabold text-white">Polygon Network</h3>
                </div>
              </div>
              <p className="text-white/50 text-sm max-w-md">
                TrueStamp anchors all Merkle roots and authority roles on Polygon PoS — EVM-compatible, battle-tested, and processing 65,000+ TPS.
              </p>
              <a
                href="https://polygon.technology"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-brand-400 hover:text-brand-300 font-semibold transition-colors"
              >
                Learn about Polygon <ExternalLink size={12} />
              </a>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {pillars.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Icon size={18} className="text-brand-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">{label}</div>
                    <div className="text-xs text-white/40">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chain logos row */}
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <span className="text-xs text-white/30 uppercase tracking-widest">Also integrated with</span>
            {['Hardhat', 'IPFS', 'Lighthouse', 'Firebase', 'RainbowKit', 'wagmi'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
