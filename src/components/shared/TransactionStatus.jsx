'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, ExternalLink, X } from 'lucide-react';

// Global transaction state - in production wire to wagmi useWaitForTransaction
let globalSetTx = null;

export function triggerTx(tx) {
  if (globalSetTx) globalSetTx(tx);
}

export default function TransactionStatus() {
  const [tx, setTx] = useState(null);

  useEffect(() => {
    globalSetTx = setTx;
    return () => { globalSetTx = null; };
  }, []);

  if (!tx) return null;

  const config = {
    pending: {
      icon: <Clock className="text-yellow-400 animate-pulse" size={20} />,
      title: 'Transaction Pending',
      color: 'border-yellow-500/40 bg-yellow-500/10',
      dot: 'bg-yellow-400',
    },
    confirmed: {
      icon: <CheckCircle className="text-green-400" size={20} />,
      title: 'Transaction Confirmed',
      color: 'border-green-500/40 bg-green-500/10',
      dot: 'bg-green-400',
    },
    failed: {
      icon: <XCircle className="text-red-400" size={20} />,
      title: 'Transaction Failed',
      color: 'border-red-500/40 bg-red-500/10',
      dot: 'bg-red-400',
    },
  };

  const { icon, title, color, dot } = config[tx.status] ?? config.pending;

  return (
    <div className={`fixed bottom-6 right-6 z-50 glass-card border ${color} p-4 rounded-2xl max-w-sm shadow-2xl animate-in slide-in-from-bottom-4`}>
      <div className="flex items-start gap-3">
        {icon}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          {tx.description && (
            <p className="text-xs text-white/50 mt-0.5 truncate">{tx.description}</p>
          )}
          {tx.hash && (
            <a
              href={`https://amoy.polygonscan.com/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 mt-1 transition-colors"
            >
              View on PolygonScan <ExternalLink size={10} />
            </a>
          )}
          {tx.status === 'pending' && (
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-brand-300 rounded-full animate-pulse w-2/3" />
            </div>
          )}
        </div>
        <button
          onClick={() => setTx(null)}
          className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
