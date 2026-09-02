'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Search, LayoutDashboard, Menu, X, ArrowUpRight, Layers, FileText, Activity } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/verify', label: 'Trace Studio', icon: Search },
    { href: '/admin', label: 'Case Manager', icon: FileText },
    { href: '/authority', label: 'VASP Portal', icon: Layers },
    { href: '/dashboard', label: 'LEA Alerts', icon: Activity },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#05070E]/80 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/[0.15] flex items-center justify-center text-white group-hover:border-evervault-purple transition-colors">
              <Layers size={15} className="text-white" />
            </div>
            <span className="font-semibold text-base tracking-tight text-white flex items-center gap-1.5">
              sahyog<span className="text-xs text-evervault-light/80 font-mono px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">intel</span>
            </span>
          </Link>

          {/* Desktop Center Pill Nav (Evervault Exact Match) */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#090C19]/90 border border-white/[0.08] shadow-inner">
            {navItems.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.12] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              Log in
            </Link>
            <Link
              href="/verify"
              className="btn-white text-xs px-4 py-2 font-medium"
            >
              Launch Studio
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-[#070913] px-5 py-4 space-y-2">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/[0.05]"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <div className="h-18" />
    </>
  );
}
