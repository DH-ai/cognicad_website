import { NextResponse } from "next/server";
import { Resend } from "resend";
import { appendToSheet } from "@/lib/google-sheets";
import { jobApplicationConfirmationEmail, teamNotificationTemplate } from "@/lib/email-templates";

export const runtime = "nodejs";

interface JoinApplication {
  name: string;
  email: string;
  role: string;
  portfolio?: string;
  whyCognicad?: string;
  favoriteProblem?: string;
}

export async function POST(request: Request) {
  try {
    const body: JoinApplication = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.role?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and role are required." },
        { status: 400 }
      );
    }
    if (!body.email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Save to Google Sheets if credentials available
    if (spreadsheetId) {
      try {
        await appendToSheet(spreadsheetId, "Job Applications", {
          timestamp: new Date().toISOString(),
          name: body.name,
          email: body.email,
          form_type: "Job Application",
          role_type: body.role,
          organization_message: body.whyCognicad || "",
          additional_info: `Portfolio: ${body.portfolio || "—"}`,
          status: "new",
          notes: `Favorite problem: ${body.favoriteProblem || "—"}`,
        });
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
        // Continue with email even if sheet save fails
      }
    }

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Notify team
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.xyz>",
        to: "dhruvchaturvedi@cognicad.xyz",
        replyTo: body.email,
        subject: `Job Application — ${body.role} — ${body.name}`,
        html: teamNotificationTemplate("Job Application", {
          Name: body.name,
          Email: body.email,
          Role: body.role,
          Portfolio: body.portfolio || "—",
          "Why CogniCAD": body.whyCognicad || "—",
          "Favorite problem": body.favoriteProblem || "—",
        }),
      });

      // Confirmation to applicant
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.xyz>",
        to: body.email,
        subject: "We received your application",
        html: jobApplicationConfirmationEmail(body.name, body.role),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in join route:", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
