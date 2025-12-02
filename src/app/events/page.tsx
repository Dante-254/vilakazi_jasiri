export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Events</h1>
      <p className="mt-2 text-gray-600">
        Upcoming events, camps, hikes and service projects. Timeline support
        planned.
      </p>

      <div className="mt-6 grid gap-4">
        <div className="p-4 border rounded-md">
          No upcoming events — placeholder card
        </div>
      </div>
    </div>
  );
}
