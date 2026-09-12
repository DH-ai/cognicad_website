import { ImageResponse } from "next/og";
import { getPublishedPost } from "@/lib/blog";

export const alt = "JusCAD field note";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b1013", color: "#e9efec", padding: "72px 84px", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 22, letterSpacing: ".16em", color: "#7fa9d1", textTransform: "uppercase" }}>JusCAD / Field note</div><div style={{ display: "flex", maxWidth: 1000, fontSize: 68, lineHeight: 1.08, fontWeight: 700, letterSpacing: "-.04em" }}>{post?.title ?? "Cognitive engineering systems"}</div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#aab9b4" }}><span>juscad.com/blog</span><span>Research under construction</span></div></div>, size);
}
