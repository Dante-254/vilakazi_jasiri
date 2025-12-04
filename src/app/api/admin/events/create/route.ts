import { NextResponse } from "next/server";
import {
  getSupabaseServer,
  getUserFromToken,
} from "../../../../../lib/supabaseServer";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb_admin_token")?.value;
    const user = await getUserFromToken(token);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      title,
      description,
      date,
      location,
      image_url,
      show_main_section,
      show_card,
    } = body;

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
          location: location || null,
          image_url: image_url || null,
          show_main_section: !!show_main_section,
          show_card: !!show_card,
        },
      ])
      .select();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ event: data?.[0] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
