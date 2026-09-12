import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/blog/Markdown";
import { getPublishedPost } from "@/lib/blog";
import { getBlogImageUrl } from "@/lib/blog-image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found — JusCAD" };
  const image = getBlogImageUrl(post.cover_image_path);
  return { title: `${post.seo_title ?? post.title} — JusCAD`, description: post.seo_description ?? post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: "article", title: post.seo_title ?? post.title, description: post.seo_description ?? post.excerpt, publishedTime: post.published_at ?? undefined, images: image ? [{ url: image, alt: post.cover_image_alt ?? post.title }] : undefined } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const image = getBlogImageUrl(post.cover_image_path);
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, datePublished: post.published_at, dateModified: post.updated_at, author: { "@type": "Organization", name: "JusCAD" }, publisher: { "@type": "Organization", name: "JusCAD", url: "https://juscad.com" }, mainEntityOfPage: `https://juscad.com/blog/${post.slug}`, image: image ?? undefined };
  return <main className="relative z-10 min-h-[100dvh] bg-canvas pt-32 pb-24 md:pt-40 md:pb-32"><article className="container-jc"><header className="max-w-4xl mb-12"><p className="eyebrow mb-8"><span>Field note</span><span>{post.published_at ? new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(post.published_at)) : ""}</span></p><h1 className="type-section text-fg mb-7">{post.title}</h1><p className="type-lead text-muted">{post.excerpt}</p></header>{image && <div className="relative aspect-[16/8] mb-12 border border-line"><Image src={image} alt={post.cover_image_alt ?? ""} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" /></div>}<div className="max-w-3xl"><Markdown>{post.content_markdown}</Markdown><div className="mt-16 border-t border-line pt-8"><Link className="btn btn-secondary" href="/blog">Back to all notes</Link></div></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></article></main>;
}
