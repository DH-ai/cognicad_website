import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import { getBlogImageUrl } from "@/lib/blog-image";

export const metadata: Metadata = { title: "Blog — JusCAD", description: "Research notes and technical perspectives from the JusCAD team." };

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <main className="relative z-10 min-h-[100dvh] bg-canvas pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-jc">
        <header className="mb-16 max-w-[62rem] md:mb-24"><p className="eyebrow mb-8"><span>Field notes</span></p><h1 className="type-hero text-fg mb-8">Ideas under construction.</h1><p className="type-lead text-muted measure">Research notes on spatial reasoning, engineering systems, and the path toward cognitive CAD.</p></header>
        {posts.length === 0 ? (
          <section className="panel p-8 md:p-12"><p className="type-tech text-muted mb-5">No published entries</p><h2 className="type-small text-fg mb-4">The first field note is being prepared.</h2><p className="type-body text-muted max-w-[52ch]">Join the beta to follow the work while the editorial archive takes shape.</p><Link href="/beta" className="btn btn-primary mt-8">Join the beta</Link></section>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => {
              const image = getBlogImageUrl(post.cover_image_path);
              return <article key={post.id} className={`panel overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}>
                {image && <div className="relative aspect-[16/8] border-b border-line bg-surface"><Image src={image} alt={post.cover_image_alt ?? ""} fill sizes={index === 0 ? "(max-width: 768px) 100vw, 1280px" : "(max-width: 768px) 100vw, 640px"} className="object-cover" /></div>}
                <div className="p-6 md:p-8"><p className="type-tech text-muted mb-5">{post.published_at ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(post.published_at)) : "Field note"}</p><h2 className="type-small text-fg mb-4"><Link className="hover:text-blue transition-colors" href={`/blog/${post.slug}`}>{post.title}</Link></h2><p className="type-body text-muted mb-6">{post.excerpt}</p><Link className="type-tech text-fg underline underline-offset-4" href={`/blog/${post.slug}`}>Read article</Link></div>
              </article>;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
