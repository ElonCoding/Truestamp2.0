'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletButton from '../shared/WalletButton';
import { useWeb3 } from '../../providers/Web3Provider';
import { Shield, Building2, Search, LayoutDashboard, Menu, X, Zap } from 'lucide-react';

const navLinks = {
  user: [
    { href: '/verify', label: 'Verify', icon: Search },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ],
  authority: [
    { href: '/authority', label: 'Issue Docs', icon: Building2 },
    { href: '/verify', label: 'Verify', icon: Search },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ],
  admin: [
    { href: '/admin', label: 'Admin', icon: Shield },
    { href: '/authority', label: 'Authority', icon: Building2 },
    { href: '/verify', label: 'Verify', icon: Search },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, isConnected } = useWeb3();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = navLinks[role] ?? navLinks.user;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card border-b border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="navbar-logo">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-[0_0_15px_rgba(123,63,228,0.5)] group-hover:shadow-[0_0_25px_rgba(123,63,228,0.7)] transition-all duration-300">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">True</span>
              <span className="gradient-text">Stamp</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/onboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/onboard'
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Join as Authority
            </Link>
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith(href)
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                id={`nav-${label.toLowerCase().replace(' ', '-')}`}
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isConnected && role === 'admin' && (
              <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-brand-500/20 border border-brand-500/30 rounded-lg text-xs text-brand-300 font-semibold">
                <Shield size={10} />
                Admin
              </span>
            )}
            <WalletButton />
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/60"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 glass-card px-4 py-4 space-y-1">
            <Link href="/onboard" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
              Join as Authority
            </Link>
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
