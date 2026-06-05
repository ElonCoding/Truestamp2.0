'use client';

import { Wallet, ExternalLink, ChevronRight, Download } from 'lucide-react';

const walletOptions = [
  { name: 'MetaMask', desc: 'Browser extension wallet', popular: true, link: 'https://metamask.io', color: 'from-orange-500 to-amber-500' },
  { name: 'Coinbase Wallet', desc: 'Easy mobile & extension', popular: false, link: 'https://wallet.coinbase.com', color: 'from-blue-500 to-blue-600' },
  { name: 'WalletConnect', desc: 'Connect any mobile wallet', popular: false, link: 'https://walletconnect.com', color: 'from-brand-500 to-brand-700' },
];

const steps = [
  'Install a wallet from the options below',
  'Create a new wallet and save your seed phrase securely',
  'Add Polygon Amoy Testnet (Chain ID: 80002)',
  'Get test MATIC from the Polygon faucet',
  'Return here and connect your wallet',
];

export default function WalletSetup() {
  return (
    <div className="glass-card border border-brand-500/20 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
          <Wallet size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">New to Web3?</h3>
          <p className="text-sm text-white/40">Set up your wallet in minutes</p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-brand-400">{i + 1}</span>
            </div>
            <p className="text-sm text-white/60">{s}</p>
          </div>
        ))}
      </div>

      {/* Wallet options */}
      <div className="space-y-3">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Supported Wallets</p>
        {walletOptions.map(({ name, desc, popular, link, color }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/30 hover:bg-white/8 transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
              <Download size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{name}</span>
                {popular && <span className="text-[10px] bg-brand-500/20 text-brand-400 border border-brand-500/30 px-2 py-0.5 rounded-full font-semibold">Popular</span>}
              </div>
              <p className="text-xs text-white/40">{desc}</p>
            </div>
            <ExternalLink size={14} className="text-white/30 group-hover:text-brand-400 transition-colors" />
          </a>
        ))}
      </div>

      <a
        href="https://faucet.polygon.technology/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 transition-colors group"
      >
        <div>
          <p className="text-sm font-semibold text-green-400">Get Free Test MATIC</p>
          <p className="text-xs text-white/40">Polygon Amoy Faucet — required for transactions</p>
        </div>
        <ChevronRight size={16} className="text-green-400 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}
