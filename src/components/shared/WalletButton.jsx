'use client';

import { useWeb3 } from '../../providers/Web3Provider';
import { Wallet, LogOut, ChevronDown, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

function truncateAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export default function WalletButton() {
  const { address, isConnected, connect, disconnect } = useWeb3();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        className="btn-primary flex items-center gap-2 text-sm"
        id="wallet-connect-btn"
      >
        <Wallet size={16} />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl border border-brand-500/30 hover:border-brand-500/60 transition-all duration-200 text-sm font-medium"
        id="wallet-connected-btn"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-white/80 font-mono">{truncateAddress(address)}</span>
        <ChevronDown size={14} className={`text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 glass-card border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          <div className="p-3 border-b border-white/10">
            <p className="text-xs text-white/40 mb-1">Connected Wallet</p>
            <p className="font-mono text-xs text-white/80">{truncateAddress(address)}</p>
          </div>
          <div className="p-2">
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors"
            >
              {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Address'}
            </button>
            <button
              onClick={() => { disconnect(); setOpen(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-500/10 text-sm text-red-400 hover:text-red-300 transition-colors"
              id="wallet-disconnect-btn"
            >
              <LogOut size={14} />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
