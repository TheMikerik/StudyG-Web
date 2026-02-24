import { createClient } from "@supabase/supabase-js";

// Fallback prevents createClient from throwing during build when env vars aren't set.
// The client is never actually called when NEXT_PUBLIC_SUPABASE_URL is missing
// because posts.ts falls back to mock data in that case.
// || (not ??) because the env var may be an empty string before Supabase is configured
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Public client — for reading published posts (uses anon key + RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only admin client — for writing posts from the cron API route
// Never import this in client components
export function getServiceClient() {
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
