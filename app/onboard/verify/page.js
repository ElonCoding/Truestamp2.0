'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle, Clock, XCircle, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function VerifyContent() {
  const params = useSearchParams();
  const status = params.get('status') ?? 'pending';
  const email = params.get('email') ?? 'your@domain.edu';

  const states = {
    pending: {
      icon: <Clock size={48} className="text-yellow-400 animate-pulse" />,
      title: 'Verification Pending',
      desc: `We sent an OTP to ${email}. Check your inbox and enter the code in the application form.`,
      color: 'border-yellow-500/30 bg-yellow-500/10',
    },
    success: {
      icon: <CheckCircle size={48} className="text-green-400" />,
      title: 'Email Verified!',
      desc: 'Your domain email has been verified. Your application is now under admin review.',
      color: 'border-green-500/30 bg-green-500/10',
    },
    failed: {
      icon: <XCircle size={48} className="text-red-400" />,
      title: 'Verification Failed',
      desc: 'The verification link is invalid or expired. Please restart the application.',
      color: 'border-red-500/30 bg-red-500/10',
    },
  };

  const { icon, title, desc, color } = states[status] ?? states.pending;

  return (
    <div className="max-w-lg mx-auto text-center py-20 px-4">
      <div className={`glass-card border ${color} p-10 rounded-3xl`}>
        <div className="flex justify-center mb-6">{icon}</div>
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        <p className="text-white/50 mb-8">{desc}</p>

        <div className="flex flex-col gap-3">
          {status === 'pending' && (
            <button className="btn-primary flex items-center justify-center gap-2 mx-auto">
              <RefreshCw size={16} /> Resend OTP
            </button>
          )}
          <Link href="/onboard" className="btn-ghost flex items-center justify-center gap-2 mx-auto">
            Back to Application
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OnboardVerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="text-white/40">Loading...</div></div>}>
      <VerifyContent />
    </Suspense>
  );
}
