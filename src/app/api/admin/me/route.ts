import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getSupabaseServer } from "../../../../lib/supabaseServer";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_admin_token")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  try {
    const secret =
      process.env.SUPABASE_JWT_SECRET ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "dev_secret";
    const payload: any = jwt.verify(token, secret);
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", payload.user_id)
      .limit(1);
    if (!data || data.length === 0)
      return NextResponse.json({ user: null }, { status: 401 });
    return NextResponse.json({
      user: { id: payload.user_id, email: payload.email },
    });
  } catch (err: any) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
