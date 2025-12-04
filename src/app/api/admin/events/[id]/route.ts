import { NextResponse } from "next/server";
import {
  getSupabaseServer,
  getUserFromToken,
} from "../../../../../lib/supabaseServer";
import { cookies } from "next/headers";

async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const user = await getUserFromToken(token);
  if (!user) throw new Error("Unauthorized");
  return { token, user };
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const p = await context.params;
    const { id } = p;
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .limit(1);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ event: data?.[0] || null });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const p = await context.params;
    const { id } = p;
    const body = await req.json();
    const { title, description, date, image, isFeatured } = body;
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("events")
      .update({
        title,
        description,
        date,
        image: image || null,
        isFeatured: !!isFeatured,
      })
      .eq("id", id)
      .select();
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

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const p = await context.params;
    const { id } = p;
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
