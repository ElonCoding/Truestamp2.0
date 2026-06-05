'use client';

import Sidebar from '../../src/components/layout/Sidebar';
import UploadStats from '../../src/components/authority/UploadStats';
import BatchCard from '../../src/components/authority/BatchCard';
import RoleGuard from '../../src/components/shared/RoleGuard';
import Link from 'next/link';
import { Upload, ArrowRight } from 'lucide-react';

const MOCK_STATS = { totalDocs: 1840, totalBatches: 12, totalSize: '2.4 GB', avgDocsPerBatch: 153 };

const MOCK_BATCHES = [
  { id: 'abc123def456', merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', ipfsCID: 'bafybeig2rxvpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s1t', docCount: 245, submittedAt: '2025-05-20T10:00:00Z', status: 'verified' },
  { id: 'xyz789uvw012', merkleRoot: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e', ipfsCID: 'bafybeih3syvrpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s2u', docCount: 180, submittedAt: '2025-05-18T14:30:00Z', status: 'verified' },
];

export default function AuthorityPage() {
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
            <UploadStats stats={MOCK_STATS} />
          </div>

          {/* Recent batches */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Recent Batches</h2>
              <Link href="/authority/batches" className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MOCK_BATCHES.map(b => <BatchCard key={b.id} batch={b} />)}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
