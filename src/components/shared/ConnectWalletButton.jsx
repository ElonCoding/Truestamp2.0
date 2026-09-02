'use client';

import { useState } from 'react';
import { useWeb3 } from '../../providers/Web3Provider';
import { Wallet, LogOut, Copy, Check, ChevronDown } from 'lucide-react';

export default function ConnectWalletButton({ className = '' }) {
  const { address, isConnected, connect, disconnect, role } = useWeb3();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        className={`px-4 sm:px-5 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-2 ${className}`}
      >
        <Wallet size={14} className="text-black" />
        <span>Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white font-mono text-xs transition-all flex items-center gap-2 shadow-sm active:scale-95 ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{formatAddress(address)}</span>
        <ChevronDown size={12} className="text-slate-400" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#090C1A] border border-white/[0.12] p-2 shadow-2xl z-50 text-xs space-y-1 backdrop-blur-xl">
          <div className="px-2.5 py-1.5 text-[10px] text-slate-400 font-sans border-b border-white/[0.06] flex items-center justify-between">
            <span>Role:</span>
            <span className="uppercase text-purple-300 font-bold font-mono">{role}</span>
          </div>

          <button
            onClick={handleCopy}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/[0.06] text-slate-300 hover:text-white flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Copy size={12} />
              <span>Copy Address</span>
            </span>
            {copied && <Check size={12} className="text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              disconnect();
              setDropdownOpen(false);
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 flex items-center gap-2 transition-colors"
          >
            <LogOut size={12} />
            <span>Disconnect</span>
          </button>
        </div>
      )}
    </div>
  );
}
