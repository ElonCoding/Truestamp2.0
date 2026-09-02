'use client';

import Link from 'next/link';
import ScrollReveal from '../motion/ScrollReveal';

export default function Footer() {
  return (
    <footer className="bg-black text-slate-400 py-16 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.04]">
      <div className="max-w-[1360px] mx-auto space-y-16">
        
        {/* Main Footer Links Grid with ScrollReveal */}
        <ScrollReveal y={20} duration={0.8}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 sm:gap-10">
            
            {/* Col 1: Geometric Stack Logo */}
            <div className="col-span-2 sm:col-span-3 md:col-span-2">
              <Link href="/" className="inline-block group">
                <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg 
                    viewBox="0 0 24 24" 
                    width="26" 
                    height="26" 
                    fill="none" 
                    className="w-6 h-6 text-white block" 
                    style={{ width: '26px', height: '26px' }}
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Col 2: Company */}
            <div className="space-y-3 text-xs">
              <div className="text-white font-medium">Company</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/authority" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div className="space-y-3 text-xs">
              <div className="text-white font-medium">Resources</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/verify" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/verify" className="hover:text-white transition-colors">Papers</Link></li>
                <li><Link href="/authority" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div className="space-y-3 text-xs">
              <div className="text-white font-medium">Legal</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Cookies Policy</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Data Processing</Link></li>
              </ul>
            </div>

            {/* Col 5: Compliance */}
            <div className="space-y-3 text-xs">
              <div className="text-white font-medium">Compliance</div>
              <ul className="space-y-2.5 text-slate-400 text-[11px]">
                <li className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[9px] font-bold text-white font-mono">PCI</span>
                  <span>PCI Level 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center text-[8px]">◯</span>
                  <span>SOC 2 Type II</span>
                </li>
              </ul>
            </div>

          </div>
        </ScrollReveal>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SAHYOG Blockchain Intelligence Engine. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">All systems normal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
