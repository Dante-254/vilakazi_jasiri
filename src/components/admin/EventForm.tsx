"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialData?: any;
  eventId?: string | null;
};

export default function EventForm({ initialData, eventId }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date ? initialData.date.split("T")[0] : "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [image_url, setImageUrl] = useState(initialData?.image_url || "");
  const [show_main_section, setShowMainSection] = useState(!!initialData?.show_main_section);
  const [show_card, setShowCard] = useState(initialData?.show_card ?? true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDate(initialData.date ? initialData.date.split("T")[0] : "");
      setLocation(initialData.location || "");
      setImageUrl(initialData.image_url || "");
      setShowMainSection(!!initialData.show_main_section);
      setShowCard(initialData.show_card ?? true);
    }
  }, [initialData]);

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!title || !description || !date) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const payload = { title, description, date, location, image_url, show_main_section, show_card };
      let res: Response;
      if (eventId) {
        res = await fetch(`/api/admin/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/events/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to save event");
        setLoading(false);
        return;
      }
      router.push("/admin/events");
    } catch (err: any) {
      setError(err.message || "Error saving event");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">{eventId ? "Edit Event" : "Create New Event"}</h1>
        {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">{error}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title *</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input type="url" value={image_url} onChange={(e)=>setImageUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="space-y-3 py-4 border-t">
            <div className="flex items-center">
              <input type="checkbox" checked={show_main_section} onChange={(e)=>setShowMainSection(e.target.checked)} className="mr-3" />
              <label className="text-sm">Show on main section (featured)</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" checked={show_card} onChange={(e)=>setShowCard(e.target.checked)} className="mr-3" />
              <label className="text-sm">Show as card</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={()=>router.back()} className="px-6 py-2 border rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-lg">{loading ? (eventId ? "Saving..." : "Creating...") : (eventId ? "Save" : "Create Event")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
