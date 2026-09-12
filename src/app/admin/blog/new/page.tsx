import type { Metadata } from "next";
import Link from "next/link";
import { BlogEditor } from "@/components/blog/BlogEditor";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "New blog post — JusCAD", robots: { index: false, follow: false } };
export default async function NewBlogPostPage() { await requireAdmin(); return <main className="relative z-10 min-h-[100dvh] bg-canvas pt-28 pb-24 md:pt-36"><div className="container-jc"><header className="mb-10"><Link href="/admin/blog" className="type-tech text-muted underline underline-offset-4">Back to posts</Link><h1 className="type-section text-fg mt-6">New field note</h1></header><BlogEditor /></div></main>; }
