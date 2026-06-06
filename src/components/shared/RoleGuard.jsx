'use client';

import { useWeb3 } from '../../providers/Web3Provider';
import { useAuth } from '../../providers/AuthProvider';
import { Shield, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RoleGuard({ children, requiredRole, fallback }) {
  const { isConnected, role } = useWeb3();
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const roles = { admin: 3, authority: 2, user: 1 };
  
  // A user is considered a basic 'user' if either a wallet is connected or they are logged in via email/social.
  // Higher roles (authority/admin) require a Web3 wallet connected with those roles on-chain.
  const hasUserSession = isConnected || !!user;
  const activeRole = role !== 'user' ? role : (hasUserSession ? 'user' : 'none');
  
  const userLevel = roles[activeRole] ?? 0;
  const requiredLevel = roles[requiredRole] ?? 1;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!hasUserSession) {
    return fallback ?? (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center neon-border">
          <Lock className="text-brand-400" size={36} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Connection Required</h2>
          <p className="text-white/50 mb-6 max-w-sm mx-auto">
            You need to sign in or connect your wallet to access this section of TrueStamp.
          </p>
          <Link 
            href={`/login?redirect=${encodeURIComponent(pathname)}`} 
            className="btn-primary inline-flex items-center gap-2"
          >
            Connect / Sign In
          </Link>
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
