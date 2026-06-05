import Link from 'next/link';
import { Zap, Github, Twitter, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">True</span>
                <span className="gradient-text">Stamp</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Enterprise-grade blockchain document verification. Cryptographically secure, instantly verifiable.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass-card hover:border-white/20 transition-colors text-white/40 hover:text-white">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass-card hover:border-white/20 transition-colors text-white/40 hover:text-white">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Platform</h4>
            <div className="space-y-2.5">
              {[['Verify Document', '/verify'], ['Join as Authority', '/onboard'], ['My Documents', '/dashboard'], ['Admin Panel', '/admin']].map(([label, href]) => (
                <Link key={href} href={href} className="block text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Built With</h4>
            <div className="space-y-2.5">
              {[['Polygon PoS', 'https://polygon.technology'], ['IPFS + Lighthouse', 'https://lighthouse.storage'], ['Hardhat', 'https://hardhat.org'], ['Next.js 14', 'https://nextjs.org']].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
                  {label} <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2025 TrueStamp. Built for LNCT Buildverse Hackathon.</p>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span>Deployed on</span>
            <span className="flex items-center gap-1 text-brand-400 font-semibold">
              <div className="w-3 h-3 rounded-full bg-brand-500" />
              Polygon Amoy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
