'use client';

import { FileText, Layers, TrendingUp, Zap } from 'lucide-react';

export default function UploadStats({ stats }) {
  const {
    totalDocs = 0,
    totalBatches = 0,
    totalSize = '0 MB',
    avgDocsPerBatch = 0,
  } = stats ?? {};

  const cards = [
    { label: 'Total Documents', value: totalDocs.toLocaleString(), icon: FileText, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
    { label: 'Total Batches', value: totalBatches, icon: Layers, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
    { label: 'Storage Used', value: totalSize, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Avg Docs/Batch', value: avgDocsPerBatch, icon: Zap, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className={`glass-card border ${bg} p-5 rounded-2xl`}>
          <div className={`w-9 h-9 rounded-xl ${bg} border flex items-center justify-center mb-3`}>
            <Icon size={18} className={color} />
          </div>
          <div className="text-2xl font-extrabold text-white">{value}</div>
          <div className="text-xs text-white/40 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
