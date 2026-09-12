import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false });
  if (error) {
    console.error("Unable to load blog posts", error.message);
    return [];
  }
  return data as BlogPost[];
});

export const getPublishedPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return (data as BlogPost | null) ?? null;
});
