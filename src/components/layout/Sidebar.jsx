'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Upload, Layers, Settings,
  ChevronRight, Zap, Building2, Shield, Users, Award,
} from 'lucide-react';

const sidebarSections = {
  authority: {
    label: 'Authority Panel',
    icon: Building2,
    links: [
      { href: '/authority', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/authority/upload', label: 'Bulk Upload', icon: Upload },
      { href: '/authority/batches', label: 'Batch History', icon: Layers },
      { href: '/authority/issue-nft', label: 'Issue NFT', icon: Award },
    ],
  },
  admin: {
    label: 'Admin Panel',
    icon: Shield,
    links: [
      { href: '/admin', label: 'Applications', icon: Users },
      { href: '/admin/authorities', label: 'Authorities', icon: Building2 },
    ],
  },
};

export default function Sidebar({ role = 'authority' }) {
  const pathname = usePathname();
  const section = sidebarSections[role] ?? sidebarSections.authority;
  const SectionIcon = section.icon;

  return (
    <aside className="w-64 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 flex flex-col">
      <div className="glass-card border-r border-white/10 h-full rounded-none p-4 flex flex-col">
        {/* Section header */}
        <div className="flex items-center gap-2.5 px-3 py-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <SectionIcon size={16} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">Panel</p>
            <p className="text-sm font-bold text-white">{section.label}</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1">
          {section.links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-[0_0_10px_rgba(123,63,228,0.15)]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={active ? 'text-brand-400' : 'text-white/40 group-hover:text-white/70'} />
                <span>{label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-brand-400/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom branding */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center gap-2 px-3">
            <Zap size={14} className="text-brand-500" />
            <span className="text-xs text-white/30">TrueStamp v1.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
