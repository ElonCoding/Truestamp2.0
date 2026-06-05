'use client';

import { FileText, Shield } from 'lucide-react';

export default function DocumentViewer({ docId }) {
  return (
    <div className="glass-card border border-white/10 rounded-2xl p-8">
       <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/20 flex items-center justify-center">
             <FileText size={32} className="text-brand-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Document Viewer</h2>
            <p className="text-white/50">Viewing Document ID: {docId}</p>
          </div>
       </div>
       <div className="aspect-[1/1.4] w-full max-w-2xl mx-auto bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium">
             <Shield size={16} /> Authenticated
          </div>
          <p className="text-white/30 text-lg">Document Preview Area</p>
       </div>
    </div>
  );
}
