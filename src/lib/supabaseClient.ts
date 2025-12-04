"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // allow import in environments where env is not set; runtime will fail more clearly
  console.warn("Supabase client created without NEXT_PUBLIC env vars");
}

export const supabaseClient = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

export default supabaseClient;
