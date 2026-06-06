'use client';

import { CheckCircle, XCircle, Hash, Layers, RefreshCw, Share2, Copy, ExternalLink } from 'lucide-react';
import IssuerDetails from './IssuerDetails';
import { CONSTANTS } from '../../lib/constants';

export default function VerificationResult({ result, onReset }) {
  if (!result) return null;

  const { verified, file, hash, batchId, issuer } = result;

  const copyHash = () => navigator.clipboard.writeText(hash);
  const shareUrl = () => {
    const url = `${window.location.origin}/verify?hash=${hash}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={`rounded-3xl border-2 p-8 transition-all duration-500 ${
      verified
        ? 'border-green-500/40 bg-green-500/5 verified-glow'
        : 'border-red-500/40 bg-red-500/5 error-glow'
    }`}>
      {/* Main result */}
      <div className="text-center mb-8">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 border-2 ${
          verified ? 'border-green-500/40 bg-green-500/15' : 'border-red-500/40 bg-red-500/15'
        }`}>
          {verified
            ? <CheckCircle size={52} className="text-green-400" />
            : <XCircle size={52} className="text-red-400" />
          }
        </div>

        <h2 className={`text-3xl font-extrabold mb-2 ${verified ? 'text-green-400' : 'text-red-400'}`}>
          {verified ? '✅ Document Verified' : '❌ Not Authentic'}
        </h2>

        <p className="text-white/50 text-base">
          {verified
            ? `This document is cryptographically verified on Polygon Amoy Testnet. It was issued by a TrueStamp-approved authority.`
            : `No matching record found on the TrueStamp network. This document may be tampered, unregistered, or from an unknown issuer.`
          }
        </p>
      </div>

      {/* Hash details */}
      <div className="space-y-3 mb-6">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Hash size={13} className="text-brand-400" />
              <p className="text-xs text-white/30 uppercase tracking-widest">Document Hash (keccak256)</p>
            </div>
            <button onClick={copyHash} className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors" title="Copy hash">
              <Copy size={12} />
            </button>
          </div>
          <p className="font-mono text-xs text-brand-400/80 break-all">{hash}</p>
        </div>

        <div className="flex gap-3">
          <div className="glass-card rounded-xl p-4 flex-1">
            <p className="text-xs text-white/30 mb-1">File Name</p>
            <p className="text-sm text-white font-medium truncate">{file?.name}</p>
          </div>
          {verified && batchId && (
            <div className="glass-card rounded-xl p-4 flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Layers size={12} className="text-brand-400" />
                  <p className="text-xs text-white/30">Batch ID</p>
                </div>
                <a
                  href={`${CONSTANTS.BLOCK_EXPLORER_URL}/address/${CONSTANTS.NETWORK_PARAMS.rpcUrls[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 transition-colors"
                  title="View on Amoy Explorer"
                >
                  <ExternalLink size={10} />
                </a>
              </div>
              <p className="font-mono text-xs text-brand-400">#{batchId.slice(0, 12)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Issuer info on success */}
      {verified && issuer && <IssuerDetails issuer={issuer} />}

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button onClick={onReset} className="btn-ghost flex items-center gap-2 flex-1 justify-center">
          <RefreshCw size={16} /> Verify Another
        </button>
        {verified && (
          <button onClick={shareUrl} className="btn-primary flex items-center gap-2 flex-1 justify-center">
            <Share2 size={16} /> Share Result
          </button>
        )}
      </div>
    </div>
  );
}
