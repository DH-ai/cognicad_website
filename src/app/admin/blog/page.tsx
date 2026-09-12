import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

export const metadata: Metadata = { title: "Blog administration — JusCAD", robots: { index: false, follow: false } };
const notices: Record<string, string> = {
  saved: "Post saved.",
  deleted: "Post permanently deleted.",
  "deleted-media-warning": "Post deleted. Some unused media could not be removed from storage.",
  "delete-failed": "The post could not be deleted.",
  invalid: "Review the post fields and try again.",
  "save-failed": "The post could not be saved.",
  "not-configured": "Supabase is not configured.",
};

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<{ notice?: string; detail?: string }> }) {
  await requireAdmin();
  const { notice, detail } = await searchParams;
  const supabase = await createClient();
  const { data } = supabase ? await supabase.from("blog_posts").select("*").order("updated_at", { ascending: false }) : { data: [] };
  const posts = (data ?? []) as BlogPost[];
  return <main className="relative z-10 min-h-[100dvh] bg-canvas pt-28 pb-24 md:pt-36"><div className="container-jc"><header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow mb-6"><span>Administrator</span></p><h1 className="type-section text-fg">Blog</h1></div><Link href="/admin/blog/new" className="btn btn-primary">New post</Link></header>{notice && <p className="status mb-8 border border-line bg-surface px-4 py-3" role="status">{notices[notice] ?? notice}{detail ? ` ${detail}` : ""}</p>}<section className="panel overflow-hidden"><div className="grid grid-cols-[1fr_auto] gap-4 border-b border-line px-5 py-4 type-tech text-muted md:grid-cols-[1fr_10rem_10rem_auto]"><span>Post</span><span className="hidden md:block">Status</span><span className="hidden md:block">Updated</span><span>Action</span></div>{posts.length === 0 ? <div className="p-8 text-muted">No posts yet. Start with a draft.</div> : posts.map((post) => <article key={post.id} className="grid grid-cols-[1fr_auto] gap-4 border-b border-line px-5 py-5 last:border-0 md:grid-cols-[1fr_10rem_10rem_auto] md:items-center"><div><h2 className="font-[550] text-fg">{post.title}</h2><p className="type-tech-sm text-muted mt-1">/{post.slug}</p></div><span className="hidden md:block type-tech-sm text-muted capitalize">{post.status}</span><time className="hidden md:block type-tech-sm text-muted">{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(post.updated_at))}</time><Link href={`/admin/blog/${post.id}/edit`} className="btn btn-secondary btn-sm">Edit</Link></article>)}</section></div></main>;
}
