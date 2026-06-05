'use client';

import Sidebar from '../../../../../src/components/layout/Sidebar';
import RoleGuard from '../../../../../src/components/shared/RoleGuard';
import StatusBadge from '../../../../../src/components/shared/StatusBadge';
import { ArrowLeft, FileText, Hash, ExternalLink, Copy } from 'lucide-react';
import Link from 'next/link';

const MOCK_BATCH = {
  id: 'abc123def456',
  merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
  ipfsCID: 'bafybeig2rxvpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s1t',
  docCount: 245,
  submittedAt: '2025-05-20T10:00:00Z',
  status: 'verified',
  txHash: '0xdeadbeef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
  documents: Array.from({ length: 8 }, (_, i) => ({
    hash: '0x' + Math.random().toString(16).slice(2, 66),
    name: `document_${i + 1}.pdf`,
    size: `${(Math.random() * 500 + 50).toFixed(0)} KB`,
    cid: 'bafybei' + Math.random().toString(36).slice(2, 32),
  })),
};

export default function BatchDetailPage({ params }) {
  const batch = MOCK_BATCH;

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <Link href="/authority/batches" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Batches
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Batch #{batch.id.slice(0, 8)}</h1>
              <p className="text-white/40 text-sm">{batch.docCount} documents · {new Date(batch.submittedAt).toLocaleString()}</p>
            </div>
            <StatusBadge status={batch.status} size="lg" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* On-chain data */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { label: 'Merkle Root', value: batch.merkleRoot },
                { label: 'IPFS CID', value: batch.ipfsCID },
                { label: 'Transaction Hash', value: batch.txHash },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-2">{label}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-brand-400 break-all flex-1">{value}</p>
                    <button onClick={() => copy(value)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors flex-shrink-0">
                      <Copy size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="glass-card border border-white/10 rounded-2xl p-5 h-fit space-y-3">
              <h3 className="font-bold text-white text-sm mb-4">Quick Actions</h3>
              <a href={`https://gateway.lighthouse.storage/ipfs/${batch.ipfsCID}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-brand-500/30 transition-all">
                <ExternalLink size={14} className="text-brand-400" /> View on IPFS
              </a>
              <a href={`https://amoy.polygonscan.com/tx/${batch.txHash}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-brand-500/30 transition-all">
                <ExternalLink size={14} className="text-brand-400" /> View on PolygonScan
              </a>
            </div>
          </div>

          {/* Documents in batch */}
          <h2 className="text-lg font-bold text-white mb-4">Documents in Batch (showing 8 of {batch.docCount})</h2>
          <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/5">
              {batch.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-white/3 transition-colors">
                  <FileText size={14} className="text-brand-400 flex-shrink-0" />
                  <span className="text-sm text-white/70 flex-1 truncate">{doc.name}</span>
                  <span className="text-xs text-white/30 flex-shrink-0">{doc.size}</span>
                  <span className="font-mono text-xs text-white/25 hidden md:block">{doc.hash.slice(0, 16)}...</span>
                  <a href={`https://gateway.lighthouse.storage/ipfs/${doc.cid}`} target="_blank" rel="noopener noreferrer"
                    className="text-white/30 hover:text-brand-400 transition-colors flex-shrink-0">
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
