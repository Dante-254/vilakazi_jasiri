import { NextResponse } from "next/server";
import { getSupabaseServer } from "../../../../lib/supabaseServer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return NextResponse.json(
        { error: error?.message || "Login failed" },
        { status: 401 }
      );
    }

    const user = data.user;

    // verify that the user is in admins table
    const { data: adminRows, error: adminErr } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", user.id)
      .limit(1);

    if (adminErr) {
      return NextResponse.json({ error: adminErr.message }, { status: 500 });
    }

    if (!adminRows || adminRows.length === 0) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // sign our own admin JWT
    const secret =
      process.env.SUPABASE_JWT_SECRET ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "dev_secret";
    const tokenPayload = { user_id: user.id, email: user.email };
    const jwtToken = jwt.sign(tokenPayload, secret, { expiresIn: "7d" });

    // set httpOnly cookie for server-side checks
    const cookieStore = await cookies();
    cookieStore.set("sb_admin_token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
