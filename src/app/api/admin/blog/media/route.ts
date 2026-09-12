import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const ALLOWED = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"]]);
export async function POST(request: Request) {
  const viewer = await getViewer();
  if (!viewer || viewer.role !== "admin") return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  const extension = ALLOWED.get(file.type);
  if (!extension || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Use a JPEG, PNG, or WebP image under 5 MB." }, { status: 400 });
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  const path = `${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("blog-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data: publicUrl } = supabase.storage.from("blog-media").getPublicUrl(path);
  return NextResponse.json({ path, url: publicUrl.publicUrl }, { status: 201 });
}
