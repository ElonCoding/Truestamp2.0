'use client';

import Sidebar from '../../../src/components/layout/Sidebar';
import RoleGuard from '../../../src/components/shared/RoleGuard';
import NomineeForm from '../../../src/components/dashboard/NomineeForm';

export default function NomineeManagementPage() {
  return (
    <RoleGuard requiredRole="user">
      <div className="flex">
        <Sidebar role="user" />
        <div className="flex-1 min-w-0 px-6 py-10">
           <h1 className="text-3xl font-extrabold text-white mb-6">Nominee Access Management</h1>
           <NomineeForm onAddNominee={() => {}} />
        </div>
      </div>
    </RoleGuard>
  );
}
