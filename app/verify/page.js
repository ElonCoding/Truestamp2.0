'use client';

import { useState } from 'react';
import DropZone from '../../src/components/verify/DropZone';
import VerificationResult from '../../src/components/verify/VerificationResult';
import { Shield, Zap, Lock } from 'lucide-react';

export default function VerifyPage() {
  const [result, setResult] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/20 mb-6">
          <Shield size={14} className="text-brand-400" />
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Phase 3 — Instant Authentication</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Verify Any <span className="gradient-text">Document</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Upload a document and get cryptographic proof of authenticity from Polygon in under 2 seconds. No account needed.
        </p>
      </div>

      {/* Trust pillars */}
      {!result && (
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Zap, label: 'Instant', sub: '<2s on-chain lookup' },
            { icon: Shield, label: 'Trustless', sub: 'Polygon Merkle proof' },
            { icon: Lock, label: 'Private', sub: 'File never leaves browser' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="glass-card border border-white/10 rounded-xl p-4 text-center">
              <Icon size={18} className="text-brand-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">{label}</div>
              <div className="text-xs text-white/35 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      )}

      {/* Main action */}
      {!result ? (
        <DropZone onVerify={setResult} />
      ) : (
        <VerificationResult result={result} onReset={() => setResult(null)} />
      )}
    </div>
  );
}
