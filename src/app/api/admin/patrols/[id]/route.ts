import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServer, getUserFromToken } from "../../../../../lib/supabaseServer";

async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  const user = await getUserFromToken(token);
  if (!user) throw new Error("Unauthorized");
  return { token, user };
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const p = await context.params;
    const { id } = p;
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("patrol_members").select("*").eq("id", id).limit(1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ member: data?.[0] || null });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const p = await context.params;
    const { id } = p;
    const body = await req.json();
    const { name, age, patrol_id, role, image_url } = body;
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("patrol_members")
      .update({ name, age: age || null, patrol_id, role, image_url: image_url || null })
      .eq("id", id)
      .select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ member: data?.[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const p = await context.params;
    const { id } = p;
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("patrol_members").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}
