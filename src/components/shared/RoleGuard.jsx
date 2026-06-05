'use client';

import { useWeb3 } from '../../providers/Web3Provider';
import { Shield, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RoleGuard({ children, requiredRole, fallback }) {
  const { isConnected, role } = useWeb3();

  const roles = { admin: 3, authority: 2, user: 1 };
  const userLevel = roles[role] ?? 0;
  const requiredLevel = roles[requiredRole] ?? 1;

  if (!isConnected) {
    return fallback ?? (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center neon-border">
          <Lock className="text-brand-400" size={36} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Wallet Required</h2>
          <p className="text-white/50 mb-6">Connect your wallet to access this page</p>
          <Link href="/" className="btn-primary">Go to Home</Link>
        </div>
      </div>
    );
  }

  if (userLevel < requiredLevel) {
    return fallback ?? (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center border border-red-500/30">
          <Shield className="text-red-400" size={36} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-white/50 mb-6">
            This page requires <span className="text-brand-400 font-semibold capitalize">{requiredRole}</span> privileges
          </p>
          <Link href="/dashboard" className="btn-ghost">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return children;
}
