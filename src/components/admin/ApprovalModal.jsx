'use client';

import { useState } from 'react';
import { ShieldCheck, X, AlertTriangle, Wallet, Building2 } from 'lucide-react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { triggerTx } from '../shared/TransactionStatus';
import { useContract } from '../../hooks/useContract';
import { CONSTANTS } from '../../lib/constants';

export default function ApprovalModal({ app, onClose, onApproved }) {
  const { whitelistAuthority, loading } = useContract();
  const [error, setError] = useState('');

  const handleApprove = async () => {
    setError('');
    triggerTx({ status: 'pending', description: `Whitelisting ${app.orgName}...`, hash: null });

    const result = await whitelistAuthority(
      app.walletAddress,
      app.orgName,
      app.department || '',
      'ipfs://dummy'
    );

    if (result.success) {
      try {
        await fetch('/api/admin/whitelist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationId: app.id,
            status: 'approved',
            txHash: result.txHash,
          }),
        });
      } catch (dbErr) {
        console.error('Failed to update db status:', dbErr);
      }

      triggerTx({ status: 'confirmed', description: `${app.orgName} whitelisted!`, hash: result.txHash });
      onApproved?.(result.txHash);
      onClose();
    } else {
      triggerTx({ status: 'failed', description: 'Transaction failed' });
      setError(result.error || 'Transaction failed. Check your wallet and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass-card border border-brand-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-black/50 animate-in zoom-in-95">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors">
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-[0_0_20px_rgba(123,63,228,0.4)]">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Approve Authority</h2>
            <p className="text-sm text-white/40">On-chain whitelisting · {CONSTANTS.NETWORK_PARAMS.chainName}</p>
          </div>
        </div>

        {/* Details */}
        <div className="glass-card rounded-xl p-4 space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Building2 size={14} className="text-brand-400" />
            <span className="text-white/50">Organization:</span>
            <span className="text-white font-semibold">{app.orgName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wallet size={14} className="text-brand-400" />
            <span className="text-white/50">Wallet:</span>
            <span className="text-white font-mono text-xs">{app.walletAddress?.slice(0, 18)}...</span>
          </div>
          {app.walletAddress && (
            <a
              href={`${CONSTANTS.BLOCK_EXPLORER_URL}/address/${app.walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-400 hover:text-brand-300 underline transition-colors"
            >
              View on Amoy Explorer ↗
            </a>
          )}
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-6">
          <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60">
            This will call <code className="text-brand-400 font-mono bg-brand-500/10 px-1 rounded">whitelistAuthority()</code> on{' '}
            {CONSTANTS.NETWORK_PARAMS.chainName} and grant the{' '}
            <code className="text-brand-400 font-mono bg-brand-500/10 px-1 rounded">ISSUER_ROLE</code>. This action is{' '}
            <strong className="text-white">irreversible</strong> without a revoke transaction.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 mb-4">{error}</div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-ghost flex-1" disabled={loading}>Cancel</button>
          <button onClick={handleApprove} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {loading ? <><LoadingSpinner size="sm" /> Approving...</> : <><ShieldCheck size={16} /> Approve & Whitelist</>}
          </button>
        </div>
      </div>
    </div>
  );
}
