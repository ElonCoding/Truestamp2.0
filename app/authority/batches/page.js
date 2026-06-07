'use client';

import { useEffect, useState } from 'react';
import { useWeb3 } from '../../../src/providers/Web3Provider';
import Sidebar from '../../../src/components/layout/Sidebar';
import BatchCard from '../../../src/components/authority/BatchCard';
import RoleGuard from '../../../src/components/shared/RoleGuard';
import { Layers, Loader2 } from 'lucide-react';

export default function BatchHistoryPage() {
  const { address } = useWeb3();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch all batches
    fetch(`/api/authority/batches`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.batches) {
          setBatches(data.batches);
        }
      })
      .catch(err => console.error('Error fetching batches:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalDocs = batches.reduce((s, b) => s + (b.docCount || 0), 0);

  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Layers size={24} className="text-brand-400" />
            <div>
              <h1 className="text-3xl font-extrabold text-white">Batch History</h1>
              <p className="text-white/40 text-sm">
                {loading ? 'Loading batches...' : `${batches.length} batches — ${totalDocs.toLocaleString()} total documents`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
            </div>
          ) : batches.length === 0 ? (
            <div className="glass-card border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-white/40 mb-2 text-sm">No batches uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {batches.map(b => <BatchCard key={b.id} batch={b} />)}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
