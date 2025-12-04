import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromToken } from "../../lib/supabaseServer";
import Link from "next/link";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const user = await getUserFromToken(token);
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <form action="/api/admin/logout" method="post">
            <button className="bg-red-600 text-white px-3 py-1 rounded">
              Logout
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/admin/events"
            className="p-4 border rounded hover:shadow-lg bg-white dark:bg-neutral-800"
          >
            <div className="font-semibold">Events Management</div>
            <div className="text-sm text-gray-600">
              Manage events and featured content
            </div>
          </Link>
          <Link
            href="/admin/patrols/add"
            className="p-4 border rounded hover:shadow-lg bg-white dark:bg-neutral-800"
          >
            <div className="font-semibold">Patrol Members</div>
            <div className="text-sm text-gray-600">
              Manage patrol members and leadership
            </div>
          </Link>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/events/add"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Event
          </Link>
          <Link
            href="/admin/patrols/add"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Patrol Member
          </Link>
        </div>
      </div>
    </div>
  );
}
