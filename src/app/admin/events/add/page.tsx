"use client";
import EventForm from "../../../../components/admin/EventForm";

export default function AddEventPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-2xl mx-auto">
        <EventForm />
      </div>
    </div>
  );
}
