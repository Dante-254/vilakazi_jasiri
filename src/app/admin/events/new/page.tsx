"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    if (!title || !description || !date)
      return alert("Please fill required fields");
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, date, image }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data?.error || "Error");
    router.push("/admin/events");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <form onSubmit={submit}>
          <label className="block text-sm">Title *</label>
          <input
            className="w-full border rounded px-3 py-2 mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="block text-sm">Description *</label>
          <textarea
            className="w-full border rounded px-3 py-2 mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="block text-sm">Date *</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="block text-sm">Image URL</label>
          <input
            className="w-full border rounded px-3 py-2 mb-3"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
