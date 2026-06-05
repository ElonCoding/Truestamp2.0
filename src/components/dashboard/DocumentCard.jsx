'use client';

import { FileText, ExternalLink } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import Link from 'next/link';

export default function DocumentCard({ doc }) {
  return (
    <Link href={`/dashboard/documents/${doc.id}`} className="block">
      <div className="glass-card-hover border border-white/10 rounded-2xl p-5 hover:border-brand-500/30 transition-colors">
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
        <p className="text-xs text-white/40 mt-3">Issued: {new Date(doc.date).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
