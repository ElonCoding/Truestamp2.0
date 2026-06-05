'use client';

import Sidebar from '../../../../src/components/layout/Sidebar';
import RoleGuard from '../../../../src/components/shared/RoleGuard';
import DocumentViewer from '../../../../src/components/dashboard/DocumentViewer';

export default function DocumentDetailPage({ params }) {
  return (
    <RoleGuard requiredRole="user">
      <div className="flex">
        <Sidebar role="user" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <DocumentViewer docId={params.docId} />
        </div>
      </div>
    </RoleGuard>
  );
}
