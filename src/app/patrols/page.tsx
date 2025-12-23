import { cookies } from "next/headers";
import { getSupabaseServer, getUserFromToken } from "../../lib/supabaseServer";
import Link from "next/link";
import PatrolMembersClient from "../../components/patrols/PatrolMembersClient";

export default async function PatrolsPage() {
  const supabase = getSupabaseServer();
  const { data: patrols, error: pErr } = await supabase
    .from("patrols")
    .select("*")
    .order("name", { ascending: true });

  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const admin = await getUserFromToken(token);

  if (pErr) {
    return <div className="p-6">Error loading patrols: {pErr.message}</div>;
  }

  const patrolIds = (patrols || []).map((p: any) => p.id);
  const { data: members } = await supabase
    .from("patrol_members")
    .select("*")
    .in("patrol_id", patrolIds || []);

  const membersByPatrol: Record<string, any[]> = {};
  (members || []).forEach((m: any) => {
    const k = m.patrol_id || "unknown";
    membersByPatrol[k] = membersByPatrol[k] || [];
    membersByPatrol[k].push(m);
  });

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Patrols</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(patrols || []).map((patrol: any) => (
            <section
              key={patrol.id}
              className="p-4 border rounded-lg hover:scale-105 transform transition-transform bg-white dark:bg-neutral-900"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{patrol.name}</h3>
                  <p className="text-sm text-gray-600">{patrol.description}</p>
                </div>
                {admin && (
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/patrols/${patrol.id}/edit`}
                      className="px-2 py-1 bg-yellow-400 rounded"
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </div>

              <PatrolMembersClient
                patrol={{
                  ...patrol,
                  members: membersByPatrol[patrol.id] || [],
                }}
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
