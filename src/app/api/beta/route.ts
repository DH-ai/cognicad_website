import { NextResponse } from "next/server";
import { Resend } from "resend";
import { appendToSheet } from "@/lib/google-sheets";
import { betaWelcomeEmail, teamNotificationTemplate } from "@/lib/email-templates";

export const runtime = "nodejs";

interface BetaApplication {
  name: string;
  email: string;
  role?: string;
  organization?: string;
  whatYouBuild?: string;
  frustration?: string;
}

export async function POST(request: Request) {
  try {
    const body: BetaApplication = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!body.email?.trim() || !body.email.includes("@")) {
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
        await appendToSheet(spreadsheetId, "Beta Users", {
          timestamp: new Date().toISOString(),
          name: body.name,
          email: body.email,
          form_type: "Beta Signup",
          role_type: body.role || "",
          organization_message: body.organization || "",
          additional_info: body.whatYouBuild || "",
          status: "new",
          notes: `Frustration: ${body.frustration || "—"}`,
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
        subject: `New Beta Signup — ${body.name}`,
        html: teamNotificationTemplate("Beta Signup", {
          Name: body.name,
          Email: body.email,
          Role: body.role || "—",
          Organization: body.organization || "—",
          "What they build": body.whatYouBuild || "—",
          "Biggest frustration": body.frustration || "—",
        }),
      });

      // Welcome email to applicant
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.xyz>",
        to: body.email,
        subject: "Welcome to CogniCAD Beta! 🚀",
        html: betaWelcomeEmail(body.name),
      });
    }

    return NextResponse.json(
      { success: true, message: "Application received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in beta route:", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
