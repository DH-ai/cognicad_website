import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(140),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(10).max(320),
  contentMarkdown: z.string().trim().min(20).max(100_000),
  coverImagePath: z.string().trim().max(500).optional(),
  coverImageAlt: z.string().trim().max(180).optional(),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(180).optional(),
  status: z.enum(["draft", "published", "archived"]),
});

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
