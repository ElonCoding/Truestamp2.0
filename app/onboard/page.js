import ApplicationForm from '../../src/components/onboard/ApplicationForm';
import WalletSetup from '../../src/components/onboard/WalletSetup';
import { Building2, Shield } from 'lucide-react';

export const metadata = {
  title: 'Join as Authority — TrueStamp',
  description: 'Apply to become a verified document-issuing authority on TrueStamp.',
};

export default function OnboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/20 mb-6">
          <Building2 size={14} className="text-brand-400" />
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Phase 1 — Authority Onboarding</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Become a Verified <span className="gradient-text">Authority</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Issue blockchain-verified documents for your institution. Complete the application below.
        </p>
      </div>

      {/* Requirement banner */}
      <div className="flex items-start gap-3 max-w-2xl mx-auto mb-10 p-4 glass-card border border-yellow-500/20 rounded-xl">
        <Shield size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/60">
          Applications are reviewed by TrueStamp admins within <strong className="text-white">24–48 hours</strong>. Upon approval, your wallet will receive the{' '}
          <code className="text-brand-400 font-mono text-xs bg-brand-500/10 px-1.5 py-0.5 rounded">ISSUER_ROLE</code> on Polygon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ApplicationForm />
        </div>
        <div>
          <WalletSetup />
        </div>
      </div>
    </div>
  );
}
