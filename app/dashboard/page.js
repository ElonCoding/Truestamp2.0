'use client';

import { useState } from 'react';
import Sidebar from '../../src/components/layout/Sidebar';
import RoleGuard from '../../src/components/shared/RoleGuard';
import NomineeForm from '../../src/components/dashboard/NomineeForm';
import StatusBadge from '../../src/components/shared/StatusBadge';
import { FileText, Shield, Clock, ExternalLink, Download, Trash2, Mail } from 'lucide-react';

const MOCK_DOCS = [
  { id: '1', title: 'B.Tech Degree Certificate', issuer: 'LNCT University', date: '2025-05-15', hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', cid: 'bafybeig2rxvpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s1t' },
  { id: '2', title: 'Experience Letter', issuer: 'TechCorp Ltd', date: '2024-11-20', hash: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e', cid: 'bafybeih3syvrpfyg4kkvs7q4b5c6d7e8f9h0i1j2k3l4m5n6o7p8q9r0s2u' }
];

export default function DashboardPage() {
  const [nominees, setNominees] = useState([
    { id: 'n1', email: 'hr@google.com', status: 'active', addedAt: '2025-05-22T10:00:00Z' }
  ]);

  const addNominee = (nominee) => {
    setNominees([...nominees, nominee]);
  };

  const removeNominee = (id) => {
    setNominees(nominees.filter(n => n.id !== id));
  };

  return (
    <RoleGuard requiredRole="user">
      <div className="flex">
        <Sidebar role="user" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">My Documents</h1>
              <p className="text-white/40 text-sm">Manage and share your cryptographically verified records</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Documents List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Verified Records ({MOCK_DOCS.length})</h2>
              {MOCK_DOCS.map(doc => (
                <div key={doc.id} className="glass-card border border-white/10 rounded-2xl p-5 hover:border-brand-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-white/5">
                        <FileText size={20} className="text-brand-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{doc.title}</h3>
                        <p className="text-sm text-white/50">{doc.issuer}</p>
                      </div>
                    </div>
                    <StatusBadge status="verified" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10 mb-4">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Document Hash</p>
                      <p className="font-mono text-xs text-white/70 truncate">{doc.hash.slice(0, 20)}...</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">IPFS CID</p>
                      <p className="font-mono text-xs text-white/70 truncate">{doc.cid.slice(0, 20)}...</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock size={12} />
                      Issued {new Date(doc.date).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <a href={`https://gateway.lighthouse.storage/ipfs/${doc.cid}`} target="_blank" rel="noopener noreferrer" className="btn-ghost py-1.5 px-3 text-xs flex items-center gap-1.5">
                        <ExternalLink size={14} /> View IPFS
                      </a>
                      <button className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1.5">
                        <Download size={14} /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Access Management */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Access Management</h2>
              
              <div className="space-y-4 mb-6">
                {nominees.map(n => (
                  <div key={n.id} className="glass-card border border-white/10 rounded-xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <Mail size={14} className="text-brand-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{n.email}</p>
                        <p className="text-xs text-white/30">Added {new Date(n.addedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button onClick={() => removeNominee(n.id)} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <NomineeForm onAddNominee={addNominee} />
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
