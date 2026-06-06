'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletButton from '../shared/WalletButton';
import { useWeb3 } from '../../providers/Web3Provider';
import { useAuth } from '../../providers/AuthProvider';
import { Shield, Building2, Search, LayoutDashboard, Menu, X, Zap, LogOut } from 'lucide-react';

const navLinks = {
  guest: [
    { href: '/verify', label: 'Verify', icon: Search },
  ],
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
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const hasUserSession = isConnected || !!user;
  const activeRole = role !== 'user' ? role : (hasUserSession ? 'user' : 'guest');
  const links = navLinks[activeRole] ?? navLinks.guest;

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

            {/* Email user avatar/dropdown */}
            {user && (
              <div className="relative group">
                <button className="flex items-center gap-2 glass-card px-3.5 py-2 rounded-xl border border-white/10 hover:border-brand-500/30 transition-all duration-200 text-sm font-medium">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full border border-white/20" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-brand-500/30 flex items-center justify-center text-[10px] text-brand-300 font-bold uppercase">
                      {user.displayName?.slice(0, 2)}
                    </div>
                  )}
                  <span className="text-white/80 hidden lg:inline max-w-[100px] truncate">{user.displayName}</span>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-white/10 text-xs">
                    <p className="text-white/40">Logged in as</p>
                    <p className="text-white/80 truncate font-mono mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-500/10 text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={13} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sign In button if unauthenticated */}
            {!isConnected && !user && (
              <Link
                href="/login"
                className="btn-primary py-2.5 px-4 rounded-xl text-xs font-semibold shadow-lg shadow-brand-500/10"
                id="navbar-signin-btn"
              >
                Sign In
              </Link>
            )}

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
