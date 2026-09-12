"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { blogPostSchema } from "@/lib/blog-schema";
import { createClient } from "@/lib/supabase/server";

export async function saveBlogPost(formData: FormData) {
  const viewer = await requireAdmin();
  const parsed = blogPostSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    title: formData.get("title"), slug: formData.get("slug"), excerpt: formData.get("excerpt"),
    contentMarkdown: formData.get("contentMarkdown"), coverImagePath: String(formData.get("coverImagePath") ?? "") || undefined,
    coverImageAlt: String(formData.get("coverImageAlt") ?? "") || undefined,
    seoTitle: String(formData.get("seoTitle") ?? "") || undefined,
    seoDescription: String(formData.get("seoDescription") ?? "") || undefined,
    status: formData.get("status"),
  });
  if (!parsed.success) redirect(`/admin/blog?notice=invalid&detail=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid post")}`);
  const supabase = await createClient();
  if (!supabase) redirect("/admin/blog?notice=not-configured");
  const post = parsed.data;
  let existingPublishedAt: string | null = null;
  if (post.id) {
    const { data: existing } = await supabase.from("blog_posts").select("published_at").eq("id", post.id).maybeSingle();
    existingPublishedAt = existing?.published_at ?? null;
  }
  const payload = {
    title: post.title, slug: post.slug, excerpt: post.excerpt,
    content_markdown: post.contentMarkdown,
    cover_image_path: post.coverImagePath ?? null,
    cover_image_alt: post.coverImageAlt ?? null,
    seo_title: post.seoTitle ?? null,
    seo_description: post.seoDescription ?? null,
    status: post.status,
    author_id: viewer.user.id,
    published_at: post.status === "published" ? (existingPublishedAt ?? new Date().toISOString()) : existingPublishedAt,
  };
  const result = post.id
    ? await supabase.from("blog_posts").update(payload).eq("id", post.id)
    : await supabase.from("blog_posts").insert(payload);
  if (result.error) redirect(`/admin/blog?notice=save-failed&detail=${encodeURIComponent(result.error.message)}`);
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin/blog?notice=saved");
}
