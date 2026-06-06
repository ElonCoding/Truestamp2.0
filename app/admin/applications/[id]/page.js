'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Building2, Mail, Globe, Wallet, Users, ShieldCheck, ShieldX, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBadge from '../../../../src/components/shared/StatusBadge';
import ApprovalModal from '../../../../src/components/admin/ApprovalModal';
import LoadingSpinner from '../../../../src/components/shared/LoadingSpinner';
import RoleGuard from '../../../../src/components/shared/RoleGuard';

export default function ApplicationDetailPage({ params }) {
  const router = useRouter();
  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch application details by filtering the general list
  const fetchApplication = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.success) {
        const found = data.applications.find(a => a.id === params.id);
        if (found) {
          setApp(found);
        } else {
          setError('Application not found');
        }
      } else {
        setError(data.error || 'Failed to retrieve applications');
      }
    } catch (err) {
      console.error('Error fetching application details:', err);
      setError('Connection error. Failed to retrieve application details.');
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  // Reject application call
  const handleReject = async () => {
    if (!app) return;
    setIsRejecting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: app.id,
          status: 'rejected',
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Re-fetch page data
        await fetchApplication();
      } else {
        setError(data.error || 'Failed to reject application');
      }
    } catch (err) {
      console.error('Error rejecting application:', err);
      setError('Failed to contact server to reject application.');
    } finally {
      setIsRejecting(false);
    }
  };

  // Callback from ApprovalModal
  const handleApproved = () => {
    setShowModal(false);
    fetchApplication();
  };

  return (
    <RoleGuard requiredRole="admin">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Applications
        </Link>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-400">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" />
            <p className="text-white/40 text-sm mt-4">Loading application details...</p>
          </div>
        ) : app ? (
          <>
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 flex items-center justify-center">
                  <Building2 size={28} className="text-brand-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">{app.orgName}</h1>
                  <p className="text-white/40">{app.orgType} · {app.department}</p>
                </div>
              </div>
              <StatusBadge status={app.status} size="lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Details */}
              <div className="glass-card border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-white mb-4">Organization Details</h3>
                {[
                  { label: 'Email', value: app.email, icon: Mail, extra: app.emailVerified ? '✓ Verified' : '✗ Not Verified' },
                  { label: 'Website', value: app.website, icon: Globe, link: app.website },
                  { label: 'Wallet', value: app.walletAddress?.slice(0, 20) + '...', icon: Wallet },
                  { label: 'Submitted', value: new Date(app.submittedAt).toLocaleString(), icon: null },
                ].map(({ label, value, icon: Icon, extra, link }) => (
                  <div key={label} className="flex items-start justify-between py-2 border-b border-white/5">
                    <div>
                      <p className="text-xs text-white/30 mb-0.5">{label}</p>
                      <div className="flex items-center gap-2">
                        {Icon && <Icon size={12} className="text-brand-500/60" />}
                        {link ? (
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
                            {value} <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span className="text-sm text-white">{value}</span>
                        )}
                      </div>
                    </div>
                    {extra && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${app.emailVerified ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {extra}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Description + Members */}
              <div className="space-y-6">
                <div className="glass-card border border-white/10 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-3">Description</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{app.description || 'No description provided.'}</p>
                </div>
                {app.members?.filter(Boolean).length > 0 && (
                  <div className="glass-card border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={16} className="text-brand-400" />
                      <h3 className="font-bold text-white">Team Members</h3>
                    </div>
                    {app.members.filter(Boolean).map((m, i) => (
                      <div key={i} className="font-mono text-xs text-white/50 bg-white/5 rounded-lg px-3 py-2 mb-2">{m}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {app.status === 'pending' && (
              <div className="flex gap-4">
                <button
                  onClick={handleReject}
                  disabled={isRejecting}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold transition-all disabled:opacity-50"
                >
                  {isRejecting ? <LoadingSpinner size="sm" /> : <ShieldX size={18} />} Reject Application
                </button>
                <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
                  <ShieldCheck size={18} /> Approve & Whitelist On-Chain
                </button>
              </div>
            )}

            {showModal && (
              <ApprovalModal
                app={app}
                onClose={() => setShowModal(false)}
                onApproved={handleApproved}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 text-white/30">
            <Building2 size={48} className="mx-auto mb-4 opacity-30" />
            <p>No details available for this application.</p>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
