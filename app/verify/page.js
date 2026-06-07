'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DropZone from '../../src/components/verify/DropZone';
import VerificationResult from '../../src/components/verify/VerificationResult';
import { Shield, Zap, Lock, Loader2 } from 'lucide-react';

function VerifyContent({ result, setResult }) {
  const searchParams = useSearchParams();
  const hashParam = searchParams.get('hash');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!hashParam) return;
    
    setLoading(true);
    setError('');
    
    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash: hashParam }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Verification request failed');
        }
        return res.json();
      })
      .then((data) => {
        if (data.verified) {
          setResult({
            verified: true,
            hash: hashParam,
            batchId: data.batchId,
            issuer: data.issuer,
            file: data.file,
            txHash: data.txHash
          });
        } else {
          setResult({
            verified: false,
            hash: hashParam,
            file: { name: 'Direct URL Query' },
          });
        }
      })
      .catch((err) => {
        console.error('API Verification error:', err);
        setError('Failed to contact verification server');
      })
      .finally(() => setLoading(false));
  }, [hashParam, setResult]);

  if (loading) {
    return (
      <div className="glass-card border border-brand-500/20 rounded-3xl p-12 text-center verified-glow">
        <Loader2 className="w-16 h-16 text-brand-400 animate-spin mx-auto mb-6" />
        <h3 className="text-xl font-bold text-white mb-2">Verifying Document Hash</h3>
        <p className="text-brand-400 font-mono text-sm break-all max-w-md mx-auto mb-4">{hashParam}</p>
        <p className="text-white/40 text-xs">Querying Polygon Amoy Testnet & IPFS registry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card border border-red-500/20 rounded-3xl p-12 text-center error-glow">
        <p className="text-red-400 font-bold mb-2">Verification Error</p>
        <p className="text-white/60 mb-6">{error}</p>
        <button onClick={() => window.location.href = '/verify'} className="btn-primary">Try Again</button>
      </div>
    );
  }

  return !result ? (
    <DropZone onVerify={setResult} />
  ) : (
    <VerificationResult result={result} onReset={() => {
      setResult(null);
      window.history.replaceState({}, '', '/verify');
    }} />
  );
}

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
      <Suspense fallback={
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
        </div>
      }>
        <VerifyContent result={result} setResult={setResult} />
      </Suspense>
    </div>
  );
}
