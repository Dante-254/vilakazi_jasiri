import { NextResponse } from "next/server";
import {
  getSupabaseServer,
  getUserFromToken,
} from "../../../../lib/supabaseServer";
import { cookies } from "next/headers";

async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const user = await getUserFromToken(token);
  if (!user) throw new Error("Unauthorized");
  return { token, user };
}

export async function GET() {
  try {
    await requireAuth();
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ events: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const { title, description, date, image, isFeatured } = body;
    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          date,
          image: image || null,
          isFeatured: !!isFeatured,
        },
      ]);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ event: data?.[0] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
