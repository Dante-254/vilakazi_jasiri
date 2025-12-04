import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServer } from "../../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb_admin_token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, patrol, phone, photo_url } = body;
    if (!name || !patrol || !phone)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("leaders")
      .insert([{ name, patrol, phone, photo_url: photo_url || null }])
      .select();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ leader: data?.[0] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
