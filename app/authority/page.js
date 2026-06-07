'use client';

import { useEffect, useState } from 'react';
import { useWeb3 } from '../../src/providers/Web3Provider';
import Sidebar from '../../src/components/layout/Sidebar';
import UploadStats from '../../src/components/authority/UploadStats';
import BatchCard from '../../src/components/authority/BatchCard';
import RoleGuard from '../../src/components/shared/RoleGuard';
import Link from 'next/link';
import { Upload, ArrowRight, Loader2 } from 'lucide-react';

export default function AuthorityPage() {
  const { address } = useWeb3();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalDocs: 0, totalBatches: 0, totalSize: '0 KB', avgDocsPerBatch: 0 });

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/authority/batches?authorityWallet=${address}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.batches) {
          const list = data.batches;
          setBatches(list);

          const totalBatches = list.length;
          const totalDocs = list.reduce((s, b) => s + (b.docCount || 0), 0);
          
          let totalBytes = 0;
          list.forEach(b => {
            if (b.files && Array.isArray(b.files)) {
              b.files.forEach(f => {
                totalBytes += f.size || 0;
              });
            }
          });

          let totalSizeStr = '0 KB';
          if (totalBytes > 1024 * 1024 * 1024) {
            totalSizeStr = `${(totalBytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
          } else if (totalBytes > 1024 * 1024) {
            totalSizeStr = `${(totalBytes / 1024 / 1024).toFixed(1)} MB`;
          } else if (totalBytes > 0) {
            totalSizeStr = `${(totalBytes / 1024).toFixed(1)} KB`;
          }

          const avgDocsPerBatch = totalBatches > 0 ? Math.round(totalDocs / totalBatches) : 0;

          setStats({
            totalDocs,
            totalBatches,
            totalSize: totalSizeStr,
            avgDocsPerBatch
          });
        }
      })
      .catch(err => console.error('Error fetching batches:', err))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Authority Dashboard</h1>
              <p className="text-white/40 text-sm mt-1">Manage your document batches and IPFS uploads</p>
            </div>
            <Link href="/authority/upload" className="btn-primary flex items-center gap-2">
              <Upload size={16} /> New Upload
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-10">
            <UploadStats stats={stats} />
          </div>

          {/* Recent batches */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Recent Batches</h2>
              <Link href="/authority/batches" className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
              </div>
            ) : batches.length === 0 ? (
              <div className="glass-card border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-white/40 mb-4 text-sm">No batches uploaded yet</p>
                <Link href="/authority/upload" className="btn-primary inline-flex items-center gap-2 text-sm">
                  <Upload size={14} /> Upload your first batch
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {batches.slice(0, 4).map(b => <BatchCard key={b.id} batch={b} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
