import "server-only";

import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

type FormKind = "beta" | "contact" | "join";

function requestAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown";
}

async function verifyTurnstile(token: string, remoteip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" });
  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

export async function checkSubmissionSecurity(request: Request, input: { website?: string; startedAt: number; turnstileToken?: string; email: string }, kind: FormKind) {
  if (input.website) return { ok: false as const, status: 400, error: "Submission rejected." };
  const elapsed = Date.now() - input.startedAt;
  if (elapsed < 1200 || elapsed > 24 * 60 * 60 * 1000) return { ok: false as const, status: 400, error: "Please reload the form and try again." };
  const address = requestAddress(request);
  if (!(await verifyTurnstile(input.turnstileToken ?? "", address))) return { ok: false as const, status: 400, error: "Spam verification failed. Please try again." };

  const admin = createAdminClient();
  const salt = process.env.RATE_LIMIT_SALT;
  if (!admin || !salt) {
    if (process.env.NODE_ENV === "production") return { ok: false as const, status: 503, error: "Submission service is not configured." };
    return { ok: true as const };
  }
  const hash = createHash("sha256").update(`${salt}:${address}:${input.email}`).digest("hex");
  const windowSeconds = kind === "join" ? 3600 : 900;
  const limit = kind === "join" ? 3 : 5;
  const since = new Date(Date.now() - windowSeconds * 1000).toISOString();
  const { count } = await admin.from("form_rate_limits").select("id", { count: "exact", head: true }).eq("key_hash", hash).eq("form_type", kind).gte("created_at", since);
  if ((count ?? 0) >= limit) return { ok: false as const, status: 429, error: "Too many attempts. Please try again later." };
  await admin.from("form_rate_limits").insert({ key_hash: hash, form_type: kind });
  await admin.from("form_rate_limits").delete().lt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  return { ok: true as const };
}
