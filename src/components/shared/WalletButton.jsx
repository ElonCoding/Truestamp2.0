'use client';

import { useWeb3 } from '../../providers/Web3Provider';
import { Wallet, LogOut, ChevronDown, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { CONSTANTS } from '../../lib/constants';

function truncateAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export default function WalletButton() {
  const { address, isConnected, connect, disconnect, networkName, isCorrectNetwork, switchNetwork } = useWeb3();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwitchNetwork = async () => {
    setSwitching(true);
    try {
      await switchNetwork();
    } catch (e) {
      console.error(e);
    } finally {
      setSwitching(false);
    }
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
    <div className="relative flex items-center gap-2">
      {/* Wrong network banner — shown inline next to address */}
      {!isCorrectNetwork && (
        <button
          onClick={handleSwitchNetwork}
          disabled={switching}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-xs font-semibold hover:bg-yellow-500/25 transition-all duration-200"
          title={`Switch to ${CONSTANTS.NETWORK_PARAMS.chainName}`}
        >
          <AlertTriangle size={12} className="flex-shrink-0" />
          {switching ? 'Switching...' : 'Wrong Network'}
        </button>
      )}

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 glass-card px-4 py-2 rounded-xl border transition-all duration-200 text-sm font-medium ${
            isCorrectNetwork
              ? 'border-brand-500/30 hover:border-brand-500/60'
              : 'border-yellow-500/30 hover:border-yellow-500/60'
          }`}
          id="wallet-connected-btn"
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${isCorrectNetwork ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <span className="text-white/80 font-mono">{truncateAddress(address)}</span>
          <ChevronDown size={14} className={`text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-64 glass-card border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
            <div className="p-3 border-b border-white/10">
              <p className="text-xs text-white/40 mb-1">Connected Wallet</p>
              <p className="font-mono text-xs text-white/80 mb-2">{truncateAddress(address)}</p>
              <p className="text-[10px] text-white/40 mb-0.5">Network</p>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCorrectNetwork ? 'bg-green-400' : 'bg-yellow-400'}`} />
                <span className={`text-xs font-semibold ${isCorrectNetwork ? 'text-brand-300' : 'text-yellow-300'}`}>
                  {networkName || 'Unknown Network'}
                </span>
                {!isCorrectNetwork && (
                  <span className="text-[10px] text-white/30 ml-1">
                    (need {CONSTANTS.NETWORK_PARAMS.chainName})
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 space-y-0.5">
              {!isCorrectNetwork && (
                <button
                  onClick={() => { handleSwitchNetwork(); setOpen(false); }}
                  disabled={switching}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-yellow-500/10 text-sm text-yellow-300 hover:text-yellow-200 transition-colors"
                >
                  <AlertTriangle size={14} />
                  {switching ? 'Switching...' : `Switch to ${CONSTANTS.NETWORK_PARAMS.chainName}`}
                </button>
              )}
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors"
              >
                {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <a
                href={`${CONSTANTS.BLOCK_EXPLORER_URL}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Wallet size={14} />
                View on Explorer
              </a>
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
    </div>
  );
}
