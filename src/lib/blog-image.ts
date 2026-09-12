import { supabaseUrl } from "@/lib/supabase/config";

export function getBlogImageUrl(path: string | null) {
  if (!path || !supabaseUrl) return null;
  return `${supabaseUrl}/storage/v1/object/public/blog-media/${path.split("/").map(encodeURIComponent).join("/")}`;
}
