import { cookies } from "next/headers";
import Link from "next/link";
import { getSupabaseServer, getUserFromToken } from "../../lib/supabaseServer";

export default async function EventsPage() {
  const supabase = getSupabaseServer();
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const admin = await getUserFromToken(token);

  if (error) {
    return <div className="p-6">Error loading events: {error.message}</div>;
  }

  const featured = (events || []).filter((e: any) => e.show_main_section);
  const cards = (events || []).filter(
    (e: any) => e.show_card || !e.show_main_section
  );

  return (
    <main className="min-h-screen">
      <section className="relative">
        {featured[0] ? (
          <div
            className="h-96 md:h-[520px] flex items-end p-8 bg-cover bg-center rounded-b-lg"
            style={{ backgroundImage: `url('${featured[0].image_url || ""}')` }}
          >
            <div className="bg-black/50 text-white p-6 rounded-lg max-w-3xl backdrop-blur-sm transform transition-transform hover:scale-105">
              <h2 className="text-3xl font-bold">{featured[0].title}</h2>
              <p className="mt-2 text-sm">{featured[0].description}</p>
              <div className="mt-3 flex gap-3">
                {admin && (
                  <Link
                    href={`/admin/events/${featured[0].id}/edit`}
                    className="px-3 py-1 bg-yellow-500 text-black rounded"
                  >
                    Edit
                  </Link>
                )}
                <Link
                  href={`/events/${featured[0].id}`}
                  className="px-3 py-1 bg-white text-black rounded"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center bg-gray-100">
            No featured events
          </div>
        )}
      </section>

      <section className="p-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((e: any) => (
              <article
                key={e.id}
                className="group bg-white dark:bg-neutral-900 rounded shadow hover:shadow-lg transform transition-transform hover:scale-105 overflow-hidden"
              >
                {e.image_url ? (
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${e.image_url}')` }}
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{e.title}</h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {e.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/events/${e.id}`}
                      className="text-sm text-blue-600"
                    >
                      Read
                    </Link>
                    <div className="flex gap-2">
                      {admin && (
                        <>
                          <Link
                            href={`/admin/events/${e.id}/edit`}
                            className="text-sm px-2 py-1 bg-yellow-400 rounded"
                          >
                            Edit
                          </Link>
                          <form
                            action={`/api/admin/events/${e.id}?_method=delete`}
                            method="post"
                          >
                            <button
                              type="submit"
                              className="text-sm px-2 py-1 bg-red-500 text-white rounded"
                            >
                              Delete
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
