'use client';

export default function StatusBadge({ status, size = 'sm' }) {
  const config = {
    pending:  { label: 'Pending',   cls: 'badge-pending' },
    approved: { label: 'Approved',  cls: 'badge-approved' },
    rejected: { label: 'Rejected',  cls: 'badge-rejected' },
    verified: { label: 'Verified',  cls: 'badge-verified' },
    active:   { label: 'Active',    cls: 'badge-approved' },
    revoked:  { label: 'Revoked',   cls: 'badge-rejected' },
    uploaded: { label: 'Uploaded',  cls: 'badge-verified' },
    processing:{ label: 'Processing', cls: 'badge-pending' },
  };

  const { label, cls } = config[status] ?? { label: status, cls: 'badge-pending' };

  return (
    <span className={`${cls} ${size === 'lg' ? 'text-sm px-4 py-1.5' : ''} inline-flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'approved' || status === 'verified' || status === 'active' || status === 'uploaded'
          ? 'bg-green-400' : status === 'rejected' || status === 'revoked'
          ? 'bg-red-400' : 'bg-yellow-400'
      } animate-pulse`} />
      {label}
    </span>
  );
}
