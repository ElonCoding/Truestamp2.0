'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../../../src/components/layout/Sidebar';
import RoleGuard from '../../../../src/components/shared/RoleGuard';
import StatusBadge from '../../../../src/components/shared/StatusBadge';
import { ArrowLeft, FileText, Hash, ExternalLink, Copy, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BatchDetailPage({ params }) {
  const { batchId } = params;
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!batchId) return;

    setLoading(true);
    fetch(`/api/authority/batches/${batchId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Batch not found');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.batch) {
          setBatch(data.batch);
        } else {
          throw new Error('Failed to parse batch data');
        }
      })
      .catch((err) => {
        console.error('Error fetching batch:', err);
        setErrorMsg(err.message || 'An error occurred while fetching batch details');
      })
      .finally(() => setLoading(false));
  }, [batchId]);

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <Link href="/authority/batches" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Batches
          </Link>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-brand-400 animate-spin mb-4" />
              <p className="text-white/40 text-sm">Fetching batch details from Polygon Amoy...</p>
            </div>
          ) : errorMsg ? (
            <div className="glass-card border border-red-500/30 bg-red-500/5 rounded-2xl p-8 text-center max-w-lg mx-auto">
              <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Error Loading Batch</h3>
              <p className="text-sm text-red-300/70 mb-6 font-mono break-all">{errorMsg}</p>
              <Link href="/authority/batches" className="btn-primary inline-flex">Go to Batch History</Link>
            </div>
          ) : (
            <>
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
                        <p className="font-mono text-xs text-brand-400 break-all flex-1">{value || 'N/A'}</p>
                        {value && (
                          <button onClick={() => copy(value)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors flex-shrink-0">
                            <Copy size={13} />
                          </button>
                        )}
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
                  {batch.txHash && (
                    <a href={`https://amoy.polygonscan.com/tx/${batch.txHash}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-brand-500/30 transition-all">
                      <ExternalLink size={14} className="text-brand-400" /> View on PolygonScan
                    </a>
                  )}
                </div>
              </div>

              {/* Documents in batch */}
              <h2 className="text-lg font-bold text-white mb-4">Documents in Batch ({batch.docCount})</h2>
              <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
                <div className="divide-y divide-white/5">
                  {batch.files?.map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-white/3 transition-colors">
                      <FileText size={14} className="text-brand-400 flex-shrink-0" />
                      <span className="text-sm text-white/70 flex-1 truncate">{doc.name}</span>
                      <span className="text-xs text-white/30 flex-shrink-0">
                        {doc.size ? (typeof doc.size === 'number' ? `${(doc.size / 1024).toFixed(1)} KB` : doc.size) : 'Unknown Size'}
                      </span>
                      <span className="font-mono text-xs text-white/25 hidden md:block">
                        {(doc.keccak256 || doc.keccak || '').slice(0, 16)}...
                      </span>
                      <a href={`https://gateway.lighthouse.storage/ipfs/${batch.ipfsCID}`} target="_blank" rel="noopener noreferrer"
                        className="text-white/30 hover:text-brand-400 transition-colors flex-shrink-0">
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
