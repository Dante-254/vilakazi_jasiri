"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { initialData?: any; memberId?: string | null };

export default function PatrolMemberForm({ initialData, memberId }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age ?? "");
  const [patrol_id, setPatrolId] = useState(initialData?.patrol_id || "dove");
  const [role, setRole] = useState(initialData?.role || "");
  const [image_url, setImageUrl] = useState(initialData?.image_url || "");
  const [patrols, setPatrols] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPatrols([
      { id: "dove", name: "Dove Patrol" },
      { id: "cat", name: "Cat Patrol" },
      { id: "leo", name: "Leo Patrol" },
    ]);
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setAge(initialData.age ?? "");
      setPatrolId(initialData.patrol_id || "dove");
      setRole(initialData.role || "");
      setImageUrl(initialData.image_url || "");
    }
  }, [initialData]);

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
      const payload = { name, age: age ? parseInt(String(age)) : null, patrol_id, role, image_url };
      let res: Response;
      if (memberId) {
        res = await fetch(`/api/admin/patrols/${memberId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/patrols/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">{memberId ? "Edit Patrol Member" : "Add Patrol Member"}</h1>
        {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">{error}</div>}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Member Name *</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Patrol *</label>
              <select value={patrol_id} onChange={(e)=>setPatrolId(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                {patrols.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role *</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
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
            <label className="block text-sm font-medium mb-1">Profile Image URL</label>
            <input type="url" value={image_url} onChange={(e)=>setImageUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={()=>router.back()} className="px-6 py-2 border rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-lg">{loading ? (memberId ? "Saving..." : "Adding...") : (memberId ? "Save" : "Add Member")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
