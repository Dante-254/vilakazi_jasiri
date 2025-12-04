"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [show_main_section, setShowMainSection] = useState(false);
  const [show_card, setShowCard] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const res = await fetch("/api/admin/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          image_url,
          show_main_section,
          show_card,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to create event");
        setLoading(false);
        return;
      }

      router.push("/admin/events");
    } catch (err: any) {
      setError(err.message || "Error creating event");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create New Event
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                placeholder="e.g., Community Cleanup Drive"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                placeholder="Event details..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                  placeholder="Kasarani, Nairobi"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-neutral-700"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-3 py-4 border-t border-gray-300 dark:border-neutral-600">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show_main"
                  checked={show_main_section}
                  onChange={(e) => setShowMainSection(e.target.checked)}
                  className="mr-3"
                />
                <label htmlFor="show_main" className="text-sm">
                  Show on main section (featured)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show_card"
                  checked={show_card}
                  onChange={(e) => setShowCard(e.target.checked)}
                  className="mr-3"
                />
                <label htmlFor="show_card" className="text-sm">
                  Show as card
                </label>
              </div>
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
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
