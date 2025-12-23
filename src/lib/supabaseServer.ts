import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase server helper created without NEXT_PUBLIC env vars");
}

export function getSupabaseServer() {
  // Use service role key on server if provided for privileged actions
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl || "", serviceKey || "");
}

export async function getUserFromToken(token: string | undefined) {
  // For admin sessions we sign our own JWT (`sb_admin_token`). Verify that
  // JWT here and confirm the user exists in the `admins` table.
  if (!token) return null;
  const secret =
    process.env.SUPABASE_JWT_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "dev_secret";
  try {
    const payload: any = jwt.verify(token, secret);
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("admins")
      .select("user_id, email")
      .eq("user_id", payload.user_id)
      .limit(1);
    if (error || !data || data.length === 0) return null;
    return { id: payload.user_id, email: payload.email || data[0].email };
  } catch (err) {
    return null;
  }
}
