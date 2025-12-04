"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddPatrolMemberPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [patrol_id, setPatrolId] = useState("dove");
  const [role, setRole] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [patrols, setPatrols] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load patrols from static data or API
    setPatrols([
      { id: "dove", name: "Dove Patrol" },
      { id: "cat", name: "Cat Patrol" },
      { id: "leo", name: "Leo Patrol" },
    ]);
  }, []);

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !patrol_id || !role) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/patrols/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age: age ? parseInt(age) : null,
          patrol_id,
          role,
          image_url,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to create patrol member");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Error creating patrol member");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Add Patrol Member
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Member Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                placeholder="e.g., John Doe"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                  placeholder="18"
                  min="10"
                  max="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Patrol *
                </label>
                <select
                  value={patrol_id}
                  onChange={(e) => setPatrolId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                >
                  {patrols.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
              >
                <option value="">Select a role</option>
                <option value="PL">Patrol Leader (PL)</option>
                <option value="APL">Assistant Patrol Leader (APL)</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Quartermaster">Quartermaster</option>
                <option value="Discipline Master">Discipline Master</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
