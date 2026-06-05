'use client';

import { useState } from 'react';
import { Shield, Users, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import ApplicationCard from '../../src/components/admin/ApplicationCard';
import ApprovalModal from '../../src/components/admin/ApprovalModal';
import RoleGuard from '../../src/components/shared/RoleGuard';

// Mock data — replace with Firebase Firestore fetch
const MOCK_APPS = [
  { id: '1', orgName: 'LNCT University', orgType: 'University', department: "Registrar's Office", email: 'admin@lnct.ac.in', website: 'https://lnct.ac.in', walletAddress: '0xAbCd1234567890AbCd1234567890AbCd12345678', status: 'pending', submittedAt: '2025-05-20T10:00:00Z', emailVerified: true },
  { id: '2', orgName: 'AIIMS Bhopal', orgType: 'Hospital', department: 'Medical Records', email: 'records@aiimsbhopal.edu.in', website: 'https://aiimsbhopal.edu.in', walletAddress: '0x1234AbCd5678Ef901234AbCd5678Ef9012345678', status: 'pending', submittedAt: '2025-05-21T14:30:00Z', emailVerified: true },
  { id: '3', orgName: 'MP State Government', orgType: 'Government Body', department: 'Revenue Department', email: 'revenue@mp.gov.in', website: 'https://mp.gov.in', walletAddress: '0xDeAdBeEf1234567890DeAdBeEf1234567890DeAd', status: 'approved', submittedAt: '2025-05-18T09:15:00Z', emailVerified: true },
  { id: '4', orgName: 'TechCorp Ltd', orgType: 'Corporate', department: 'HR', email: 'hr@techcorp.com', website: 'https://techcorp.com', walletAddress: '0xFaCe0987654321FaCe0987654321FaCe09876543', status: 'rejected', submittedAt: '2025-05-15T08:00:00Z', emailVerified: false },
];

const statsData = [
  { label: 'Pending Review', value: 2, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { label: 'Approved', value: 1, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  { label: 'Rejected', value: 1, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { label: 'Total Applications', value: 4, icon: TrendingUp, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
];

export default function AdminPage() {
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const filtered = filter === 'all' ? MOCK_APPS : MOCK_APPS.filter(a => a.status === filter);

  return (
    <RoleGuard requiredRole="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
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
              <div className="text-2xl font-extrabold text-white">{value}</div>
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

        {/* Approval modal */}
        {selectedApp && (
          <ApprovalModal
            app={selectedApp}
            onClose={() => setSelectedApp(null)}
            onApproved={() => setSelectedApp(null)}
          />
        )}
      </div>
    </RoleGuard>
  );
}
