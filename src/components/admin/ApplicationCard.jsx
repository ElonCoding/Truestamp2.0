'use client';

import { Building2, Globe, Mail, Wallet, Calendar, ChevronRight } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import Link from 'next/link';

export default function ApplicationCard({ app }) {
  const {
    id,
    orgName,
    orgType,
    department,
    email,
    website,
    walletAddress,
    status,
    submittedAt,
    emailVerified,
  } = app;

  return (
    <div className="glass-card-hover p-6 rounded-2xl relative group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 flex items-center justify-center">
            <Building2 size={20} className="text-brand-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">{orgName}</h3>
            <p className="text-xs text-white/40">{orgType} · {department}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Mail size={13} className="text-brand-500/60" />
          <span>{email}</span>
          {emailVerified && (
            <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full">✓ Verified</span>
          )}
        </div>
        {website && (
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Globe size={13} className="text-brand-500/60" />
            <span className="truncate">{website}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Wallet size={13} className="text-brand-500/60" />
          <span className="font-mono text-xs">{walletAddress?.slice(0, 14)}...{walletAddress?.slice(-6)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Calendar size={13} />
          <span>Submitted {new Date(submittedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/admin/applications/${id}`}
        className="flex items-center justify-between w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:border-brand-500/30 hover:bg-brand-500/5 transition-all duration-200 group/link"
      >
        <span className="text-sm font-medium text-white/70 group-hover/link:text-white transition-colors">Review Application</span>
        <ChevronRight size={16} className="text-white/30 group-hover/link:text-brand-400 group-hover/link:translate-x-1 transition-all" />
      </Link>
    </div>
  );
}
