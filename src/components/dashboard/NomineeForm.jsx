'use client';

import { useState } from 'react';
import { Users, UserPlus, Mail, Shield, Check, X } from 'lucide-react';

export default function NomineeForm({ onAddNominee }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !wallet) return;
    
    onAddNominee({
      id: Math.random().toString(36).substr(2, 9),
      email,
      wallet,
      status: 'pending',
      addedAt: new Date().toISOString()
    });
    
    setEmail('');
    setWallet('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full border-2 border-dashed border-white/20 hover:border-brand-500/40 rounded-xl p-4 text-center text-white/50 hover:text-white transition-all flex flex-col items-center gap-2 group bg-white/5 hover:bg-white/10"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-500/20 flex items-center justify-center transition-colors">
          <UserPlus size={20} className="group-hover:text-brand-400" />
        </div>
        <span className="text-sm font-semibold">Add Nominee</span>
      </button>
    );
  }

  return (
    <div className="glass-card border border-brand-500/30 rounded-xl p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Shield size={16} className="text-brand-400" />
          Authorize Nominee
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white p-1">
          <X size={16} />
        </button>
      </div>
      
      <p className="text-xs text-white/50 mb-4">
        Grant access to your documents to a trusted individual or organization (e.g. background check agency).
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-white/40 mb-1">Email Address</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="email" 
              placeholder="verifier@company.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-dark pl-9 w-full text-sm"
            />
          </div>
        </div>
        
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-white/30 text-xs">AND / OR</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div>
          <label className="block text-xs text-white/40 mb-1">Wallet Address (Optional)</label>
          <input 
            type="text" 
            placeholder="0x..." 
            value={wallet}
            onChange={e => setWallet(e.target.value)}
            className="input-dark w-full text-sm font-mono"
          />
        </div>

        <div className="pt-2 flex gap-2">
          <button type="button" onClick={() => setIsOpen(false)} className="btn-ghost flex-1 text-sm py-2">Cancel</button>
          <button type="submit" disabled={!email && !wallet} className="btn-primary flex-1 flex justify-center items-center gap-2 text-sm py-2 disabled:opacity-50">
            <Check size={14} /> Grant Access
          </button>
        </div>
      </form>
    </div>
  );
}
