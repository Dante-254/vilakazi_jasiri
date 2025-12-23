"use client";
import PatrolMemberForm from "../../../../components/admin/PatrolMemberForm";

export default function AddPatrolMemberPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-2xl mx-auto">
        <PatrolMemberForm />
      </div>
    </div>
  );
}
