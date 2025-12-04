import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getUserFromToken,
  getSupabaseServer,
} from "../../../lib/supabaseServer";
import Link from "next/link";

export default async function AdminEventsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const user = await getUserFromToken(token);
  if (!user) redirect("/admin/login");

  const supabase = getSupabaseServer();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Events</h1>
          <Link
            href="/admin/events/new"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Create Event
          </Link>
        </div>

        <div className="space-y-3">
          {events?.map((e: any) => (
            <div
              key={e.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm text-gray-600">{e.description}</div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/events/${e.id}/edit`}
                  className="px-3 py-1 rounded bg-yellow-500 text-white"
                >
                  Edit
                </Link>
                <form
                  method="post"
                  action={`/api/admin/events/${e.id}?_method=delete`}
                >
                  <button className="px-3 py-1 rounded bg-red-600 text-white">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
