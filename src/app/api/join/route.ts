import { NextResponse } from "next/server";
import { Resend } from "resend";
import { jobApplicationConfirmationEmail, teamNotificationTemplate } from "@/lib/email-templates";
import { checkSubmissionSecurity } from "@/lib/forms/security";
import { jobApplicationSchema } from "@/lib/forms/schemas";
import { appendToSheet } from "@/lib/google-sheets";
import { getTimeStamp } from "@/lib/get-time-stamp";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = jobApplicationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid submission." }, { status: 400 });
  const security = await checkSubmissionSecurity(request, parsed.data, "join");
  if (!security.ok) return NextResponse.json({ error: security.error }, { status: security.status });
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Submission service is not configured." }, { status: 503 });
  const body = parsed.data;
  const { data: saved, error: saveError } = await admin.from("job_applications").insert({ name: body.name, email: body.email, role: body.role, portfolio: body.portfolio || null, why_juscad: body.whyJuscad || null, favorite_problem: body.favoriteProblem || null }).select("id").single();
  if (saveError || !saved) return NextResponse.json({ error: "We could not save your application. Please try again." }, { status: 503 });
  let emailSent = false; let sheetSynced = false; const deliveryErrors: string[] = [];
  try { if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) throw new Error("Sheets not configured"); await appendToSheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID, "Job Applications", { timestamp: getTimeStamp(), name: body.name, email: body.email, role: body.role, message_job_application: body.whyJuscad, resume: body.portfolio || "—", fav_problem: body.favoriteProblem || "—" }); sheetSynced = true; } catch (error) { deliveryErrors.push(error instanceof Error ? error.message : "Sheets delivery failed"); }
  try {
    if (!process.env.RESEND_API_KEY) throw new Error("Email not configured"); const resend = new Resend(process.env.RESEND_API_KEY); const recipient = process.env.JUSCAD_NOTIFICATION_EMAIL ?? "enquire@juscad.com";
    const team = await resend.emails.send({ from: "JusCAD <noreply@juscad.com>", to: recipient, replyTo: body.email, subject: `Job application — ${body.role} — ${body.name}`, html: teamNotificationTemplate("Job Application", { Name: body.name, Email: body.email, Role: body.role, Portfolio: body.portfolio || "—", "Why JusCAD": body.whyJuscad || "—", "Favorite problem": body.favoriteProblem || "—" }) });
    const confirmation = await resend.emails.send({ from: "JusCAD <noreply@juscad.com>", to: body.email, subject: "We received your application", html: jobApplicationConfirmationEmail(body.name, body.role) });
    if (team.error || confirmation.error) throw new Error(team.error?.message ?? confirmation.error?.message ?? "Email delivery failed"); emailSent = true;
  } catch (error) { deliveryErrors.push(error instanceof Error ? error.message : "Email delivery failed"); }
  await admin.from("job_applications").update({ email_sent_at: emailSent ? new Date().toISOString() : null, sheet_synced_at: sheetSynced ? new Date().toISOString() : null, delivery_error: deliveryErrors.join("; ") || null }).eq("id", (saved as { id: string }).id);
  return NextResponse.json({ success: true }, { status: 201 });
}
