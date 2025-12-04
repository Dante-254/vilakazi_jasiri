"use client";
import { useRouter } from "next/navigation";

export default function EventActions({ id }: { id: string }) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Delete this event?")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return alert(data?.error || "Delete failed");
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <a
        href={`/admin/events/${id}/edit`}
        className="px-3 py-1 rounded bg-yellow-500 text-white"
      >
        Edit
      </a>
      <button
        onClick={remove}
        className="px-3 py-1 rounded bg-red-600 text-white"
      >
        Delete
      </button>
    </div>
  );
}
