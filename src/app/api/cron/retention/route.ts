import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const now = new Date().toISOString();
  const rateLimitCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const results = await Promise.all([
    admin.from("beta_submissions").delete().lt("expires_at", now),
    admin.from("contact_submissions").delete().lt("expires_at", now),
    admin.from("job_applications").delete().lt("expires_at", now),
    admin.from("form_rate_limits").delete().lt("created_at", rateLimitCutoff),
  ]);
  const failure = results.find((result) => result.error);
  if (failure?.error) return NextResponse.json({ error: failure.error.message }, { status: 500 });
  return NextResponse.json({ success: true, completedAt: now });
}
