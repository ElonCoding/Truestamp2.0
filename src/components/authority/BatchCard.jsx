'use client';

import { Layers, FileText, Calendar, Hash, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import StatusBadge from '../shared/StatusBadge';

export default function BatchCard({ batch }) {
  const { id, merkleRoot, ipfsCID, docCount, submittedAt, status = 'verified' } = batch;
  return (
    <div className="glass-card-hover p-5 rounded-2xl group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 flex items-center justify-center">
            <Layers size={18} className="text-brand-400" />
          </div>
          <div>
            <p className="text-xs text-white/30 font-mono">Batch #{id?.slice(0, 8)}</p>
            <div className="flex items-center gap-2">
              <FileText size={12} className="text-white/40" />
              <span className="text-sm font-bold text-white">{docCount} documents</span>
            </div>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2 mb-4">
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Merkle Root</p>
          <p className="font-mono text-xs text-brand-400/80 truncate">{merkleRoot?.slice(0, 30)}...</p>
        </div>
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">IPFS CID</p>
          <p className="font-mono text-xs text-white/40 truncate">{ipfsCID?.slice(0, 30)}...</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <Calendar size={12} />
          {new Date(submittedAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://gateway.lighthouse.storage/ipfs/${ipfsCID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-brand-400 transition-colors"
            title="View on IPFS"
          >
            <ExternalLink size={13} />
          </a>
          <Link href={`/authority/batches/${id}`} className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 font-semibold transition-colors">
            Details <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
