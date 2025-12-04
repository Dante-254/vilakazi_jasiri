import { createClient } from "@supabase/supabase-js";

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
  // This helper previously called the auth user endpoint directly. We'll now
  // rely on JWT decoding in the admin flow; keep a basic fetch fallback.
  if (!token) return null;
  const url = `${supabaseUrl}/auth/v1/user`;
  try {
    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey || "",
      },
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data;
  } catch (err) {
    console.error("getUserFromToken error", err);
    return null;
  }
}
