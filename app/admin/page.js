'use client';

import { useState, useEffect, useCallback } from 'react';
import { Shield, Users, CheckCircle, Clock, XCircle, TrendingUp, AlertCircle } from 'lucide-react';
import ApplicationCard from '../../src/components/admin/ApplicationCard';
import ApprovalModal from '../../src/components/admin/ApprovalModal';
import RoleGuard from '../../src/components/shared/RoleGuard';
import LoadingSpinner from '../../src/components/shared/LoadingSpinner';

export default function AdminPage() {
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch applications from the API
  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      } else {
        setError(data.error || 'Failed to fetch applications');
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Connection error. Failed to retrieve applications.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle application approved refresh
  const handleApproved = () => {
    setSelectedApp(null);
    fetchApplications();
  };

  // Filter application list
  const filtered = filter === 'all' 
    ? applications 
    : applications.filter(a => a.status === filter);

  // Compute dynamic stats
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;
  const totalCount = applications.length;

  const statsData = [
    { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
    { label: 'Approved', value: approvedCount, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
    { label: 'Rejected', value: rejectedCount, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { label: 'Total Applications', value: totalCount, icon: TrendingUp, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
  ];

  return (
    <RoleGuard requiredRole="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-[0_0_20px_rgba(123,63,228,0.3)]">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
            <p className="text-white/40 text-sm">Manage authority applications and on-chain roles</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statsData.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`glass-card border ${bg} p-5 rounded-2xl`}>
              <Icon size={20} className={`${color} mb-3`} />
              <div className="text-2xl font-extrabold text-white">{isLoading ? '...' : value}</div>
              <div className="text-xs text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                filter === f
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'text-white/50 hover:text-white glass-card border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-400">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" />
            <p className="text-white/40 text-sm mt-4">Loading applications...</p>
          </div>
        ) : (
          <>
            {/* Applications grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(app => (
                <div key={app.id} onClick={() => app.status === 'pending' && setSelectedApp(app)}>
                  <ApplicationCard app={app} />
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <Users size={48} className="mx-auto mb-4 opacity-30" />
                <p>No {filter} applications</p>
              </div>
            )}
          </>
        )}

        {/* Approval modal */}
        {selectedApp && (
          <ApprovalModal
            app={selectedApp}
            onClose={() => setSelectedApp(null)}
            onApproved={handleApproved}
          />
        )}
      </div>
    </RoleGuard>
  );
}
