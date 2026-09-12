"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import {
  isSupabaseConfigured,
  supabasePublishableKey,
  supabaseUrl,
} from "./config";

export function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }

  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
}
