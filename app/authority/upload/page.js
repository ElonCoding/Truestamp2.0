'use client';

import Sidebar from '../../../src/components/layout/Sidebar';
import BulkUploader from '../../../src/components/authority/BulkUploader';
import RoleGuard from '../../../src/components/shared/RoleGuard';
import { Upload } from 'lucide-react';

export default function AuthorityUploadPage() {
  const handleBatchComplete = (result) => {
    console.log('Batch complete:', result);
    // In production: save to Firestore
  };

  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Upload size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">Bulk Document Upload</h1>
                <p className="text-white/40 text-sm">Upload to IPFS and anchor Merkle root on Polygon</p>
              </div>
            </div>

            {/* Info callout */}
            <div className="glass-card border border-brand-500/20 rounded-xl p-4 mb-8 text-sm text-white/60 leading-relaxed">
              <strong className="text-white block mb-1">How batch uploading works</strong>
              Files are pinned to IPFS via Lighthouse, a Merkle tree is built from document hashes, and the root is submitted to the TrueStamp smart contract on Polygon. Each document is cryptographically provable without storing files on-chain.
            </div>

            <BulkUploader onBatchComplete={handleBatchComplete} />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
