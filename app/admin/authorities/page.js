'use client';

import { Building2, ExternalLink, ShieldX, Search } from 'lucide-react';
import { useState } from 'react';
import StatusBadge from '../../../src/components/shared/StatusBadge';
import RoleGuard from '../../../src/components/shared/RoleGuard';

const MOCK_AUTHORITIES = [
  { id: '1', orgName: 'MP State Government', department: 'Revenue Dept', walletAddress: '0xDeAdBeEf1234567890DeAdBeEf1234567890DeAd', approvedAt: '2025-05-19T10:00:00Z', batchCount: 12, docCount: 1840 },
  { id: '2', orgName: 'IIT Bhopal', department: "Dean's Office", walletAddress: '0xCaFeBaBe1234567890CaFeBaBe1234567890CaFe', approvedAt: '2025-05-10T08:00:00Z', batchCount: 8, docCount: 920 },
];

export default function AuthoritiesPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_AUTHORITIES.filter(a =>
    a.orgName.toLowerCase().includes(search.toLowerCase()) ||
    a.walletAddress.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleGuard requiredRole="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Whitelisted Authorities</h1>
            <p className="text-white/40 text-sm mt-1">{MOCK_AUTHORITIES.length} active authorities on-chain</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-dark pl-10" placeholder="Search by name or wallet..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="space-y-4">
          {filtered.map(auth => (
            <div key={auth.id} className="glass-card-hover p-6 rounded-2xl flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <Building2 size={22} className="text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{auth.orgName}</h3>
                  <StatusBadge status="approved" />
                </div>
                <p className="text-xs text-white/40 mb-2">{auth.department}</p>
                <p className="font-mono text-xs text-white/30">{auth.walletAddress.slice(0, 20)}...{auth.walletAddress.slice(-6)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-white">{auth.docCount.toLocaleString()}</div>
                <div className="text-xs text-white/40">documents issued</div>
                <div className="text-xs text-brand-400 mt-1">{auth.batchCount} batches</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a href={`https://amoy.polygonscan.com/address/${auth.walletAddress}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass-card border border-white/10 hover:border-brand-500/30 text-white/40 hover:text-brand-400 transition-colors">
                  <ExternalLink size={16} />
                </a>
                <button className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 transition-colors" title="Revoke authority">
                  <ShieldX size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
