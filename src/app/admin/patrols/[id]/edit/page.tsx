"use client";
import { useEffect, useState } from "react";
import PatrolMemberForm from "../../../../../components/admin/PatrolMemberForm";

export default function EditPatrolMemberPage({ params }: any) {
  const { id } = params;
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/admin/patrols/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setInitial(d.member || null);
      })
      .catch(() => {})
      .finally(() => {});
    return () => (mounted = false);
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-2xl mx-auto">
        <PatrolMemberForm initialData={initial} memberId={id} />
      </div>
    </div>
  );
}
