"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLeaderPage() {
  const [name, setName] = useState("");
  const [patrol, setPatrol] = useState("dove");
  const [phone, setPhone] = useState("");
  const [photo_url, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!name || !patrol || !phone) {
      setError("Please fill required fields");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/leaders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, patrol, phone, photo_url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-4">Add Patrol Leader</h1>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm">Name *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm">Patrol *</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={patrol}
              onChange={(e) => setPatrol(e.target.value)}
            >
              <option value="dove">Dove</option>
              <option value="cat">Cat</option>
              <option value="leo">Leo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Phone *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm">Photo URL</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={photo_url}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Add Leader
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
