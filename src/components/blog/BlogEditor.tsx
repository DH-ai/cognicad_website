"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Markdown } from "@/components/blog/Markdown";
import { saveBlogPost } from "@/app/admin/blog/actions";
import { getBlogImageUrl } from "@/lib/blog-image";
import { slugify } from "@/lib/blog-schema";
import type { BlogPost } from "@/types/database";

export function BlogEditor({ post }: { post?: BlogPost | null }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content_markdown ?? "");
  const [coverPath, setCoverPath] = useState(post?.cover_image_path ?? "");
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const coverUrl = useMemo(() => getBlogImageUrl(coverPath), [coverPath]);

  async function upload(file: File, inline = false) {
    setUploading(true); setUploadError(null);
    const data = new FormData(); data.set("file", file);
    try {
      const response = await fetch("/api/admin/blog/media", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Upload failed");
      if (inline) setContent((value) => `${value}${value ? "\n\n" : ""}![${file.name.replace(/\.[^.]+$/, "")}](${result.url})`);
      else setCoverPath(result.path);
    } catch (error) { setUploadError(error instanceof Error ? error.message : "Upload failed"); }
    finally { setUploading(false); }
  }

  return <form action={saveBlogPost} className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
    <input type="hidden" name="id" value={post?.id ?? ""} /><input type="hidden" name="coverImagePath" value={coverPath} />
    <section className="panel p-6 md:p-8 flex flex-col gap-6">
      <div className="field"><label className="field-label" htmlFor="title">Title</label><input id="title" name="title" className="field-input" value={title} onChange={(event) => { setTitle(event.target.value); if (!post) setSlug(slugify(event.target.value)); }} minLength={3} maxLength={140} required /></div>
      <div className="field"><label className="field-label" htmlFor="slug">Slug</label><input id="slug" name="slug" className="field-input font-mono" value={slug} onChange={(event) => setSlug(slugify(event.target.value))} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></div>
      <div className="field"><label className="field-label" htmlFor="excerpt">Excerpt</label><textarea id="excerpt" name="excerpt" className="field-input" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} minLength={10} maxLength={320} rows={4} required /></div>
      <div className="field"><div className="flex items-center justify-between gap-4"><label className="field-label" htmlFor="contentMarkdown">Markdown</label><button type="button" className="type-tech-sm text-fg underline underline-offset-4" onClick={() => setPreview((value) => !value)}>{preview ? "Edit" : "Preview"}</button></div>{preview ? <div className="min-h-80 border border-line bg-canvas p-6"><Markdown>{content}</Markdown></div> : <textarea id="contentMarkdown" name="contentMarkdown" className="field-input min-h-80 font-mono text-sm" value={content} onChange={(event) => setContent(event.target.value)} minLength={20} required />}{preview && <input type="hidden" name="contentMarkdown" value={content} />}</div>
      <label className="btn btn-secondary self-start cursor-pointer">{uploading ? "Uploading…" : "Add inline image"}<input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file, true); }} /></label>
    </section>
    <aside className="flex flex-col gap-6">
      <section className="panel p-6"><p className="type-tech text-muted mb-5">Publication</p><div className="field"><label className="field-label" htmlFor="status">Status</label><select id="status" name="status" className="field-input" defaultValue={post?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div><button type="submit" className="btn btn-primary w-full mt-6">Save post</button></section>
      <section className="panel p-6"><p className="type-tech text-muted mb-5">Cover image</p>{coverUrl && <Image src={coverUrl} alt="Current cover preview" width={800} height={450} className="w-full aspect-video object-cover border border-line mb-5" />}<label className="btn btn-secondary w-full cursor-pointer">{uploading ? "Uploading…" : "Upload cover"}<input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} /></label><div className="field mt-5"><label className="field-label" htmlFor="coverImageAlt">Cover alt text</label><input id="coverImageAlt" name="coverImageAlt" className="field-input" defaultValue={post?.cover_image_alt ?? ""} maxLength={180} /></div>{uploadError && <p className="status status-error mt-4" role="alert">{uploadError}</p>}</section>
      <section className="panel p-6"><p className="type-tech text-muted mb-5">Search metadata</p><div className="field mb-5"><label className="field-label" htmlFor="seoTitle">SEO title</label><input id="seoTitle" name="seoTitle" className="field-input" defaultValue={post?.seo_title ?? ""} maxLength={70} /></div><div className="field"><label className="field-label" htmlFor="seoDescription">SEO description</label><textarea id="seoDescription" name="seoDescription" className="field-input" defaultValue={post?.seo_description ?? ""} maxLength={180} rows={4} /></div></section>
    </aside>
  </form>;
}
