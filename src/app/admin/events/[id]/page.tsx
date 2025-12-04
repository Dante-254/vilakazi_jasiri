import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getUserFromToken,
  getSupabaseServer,
} from "../../../../lib/supabaseServer";
import EventActions from "../../../../components/admin/EventActions";

export default async function EventDetail({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const user = await getUserFromToken(token);
  if (!user) redirect("/admin/login");

  const supabase = getSupabaseServer();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .limit(1);
  const event = data?.[0] || null;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{event?.title || "Event"}</h1>
          {event?.id && <EventActions id={event.id} />}
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-700">{event?.description}</div>
        </div>
      </div>
    </div>
  );
}
