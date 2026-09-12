import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/blog/BlogEditor";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

export const metadata: Metadata = { title: "Edit blog post — JusCAD", robots: { index: false, follow: false } };
export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) { await requireAdmin(); const { id } = await params; const supabase = await createClient(); if (!supabase) notFound(); const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle(); if (!data) notFound(); const post = data as BlogPost; return <main className="relative z-10 min-h-[100dvh] bg-canvas pt-28 pb-24 md:pt-36"><div className="container-jc"><header className="mb-10"><Link href="/admin/blog" className="type-tech text-muted underline underline-offset-4">Back to posts</Link><h1 className="type-section text-fg mt-6">Edit field note</h1></header><BlogEditor post={post} /></div></main>; }
