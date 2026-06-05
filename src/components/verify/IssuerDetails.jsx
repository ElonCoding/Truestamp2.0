'use client';

import { Building2, Calendar, Globe, Wallet, ExternalLink, ShieldCheck } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

export default function IssuerDetails({ issuer }) {
  if (!issuer) return null;

  const { orgName, department, walletAddress, approvedAt, website } = issuer;

  return (
    <div className="glass-card border border-green-500/20 rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <ShieldCheck size={16} className="text-green-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Issuing Authority</h3>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-500/20 flex items-center justify-center flex-shrink-0">
          <Building2 size={26} className="text-green-400" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-lg font-bold text-white">{orgName}</h4>
            <p className="text-sm text-white/40">{department}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                <Globe size={13} />
                {website.replace('https://', '')}
                <ExternalLink size={10} />
              </a>
            )}
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Calendar size={13} />
              Approved {new Date(approvedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/30 bg-white/5 rounded-lg px-3 py-2">
            <Wallet size={12} />
            <span className="font-mono">{walletAddress?.slice(0, 20)}...{walletAddress?.slice(-6)}</span>
            <a
              href={`https://amoy.polygonscan.com/address/${walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-brand-500 hover:text-brand-400 transition-colors"
            >
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status="approved" />
            <span className="text-xs text-white/30">On-chain verified authority</span>
          </div>
        </div>
      </div>
    </div>
  );
}
