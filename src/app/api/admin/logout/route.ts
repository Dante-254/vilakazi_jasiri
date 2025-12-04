import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  // delete the admin token cookie
  cookieStore.delete("sb_admin_token");
  return NextResponse.json({ ok: true });
}
