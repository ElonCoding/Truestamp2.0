'use client';

import Sidebar from '../../../src/components/layout/Sidebar';
import BatchCard from '../../../src/components/authority/BatchCard';
import RoleGuard from '../../../src/components/shared/RoleGuard';
import { Layers } from 'lucide-react';

const MOCK_BATCHES = [
  { id: 'abc123def456', merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', ipfsCID: 'bafybeig2rxvpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s1t', docCount: 245, submittedAt: '2025-05-20T10:00:00Z', status: 'verified' },
  { id: 'xyz789uvw012', merkleRoot: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e', ipfsCID: 'bafybeih3syvrpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s2u', docCount: 180, submittedAt: '2025-05-18T14:30:00Z', status: 'verified' },
  { id: 'pqr345stu678', merkleRoot: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', ipfsCID: 'bafybeij4tzwrpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s3v', docCount: 320, submittedAt: '2025-05-15T09:00:00Z', status: 'verified' },
  { id: 'mno901ghi234', merkleRoot: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', ipfsCID: 'bafybeik5uawspfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s4w', docCount: 95, submittedAt: '2025-05-12T16:00:00Z', status: 'verified' },
];

export default function BatchHistoryPage() {
  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Layers size={24} className="text-brand-400" />
            <div>
              <h1 className="text-3xl font-extrabold text-white">Batch History</h1>
              <p className="text-white/40 text-sm">{MOCK_BATCHES.length} batches — {MOCK_BATCHES.reduce((s, b) => s + b.docCount, 0).toLocaleString()} total documents</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {MOCK_BATCHES.map(b => <BatchCard key={b.id} batch={b} />)}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
