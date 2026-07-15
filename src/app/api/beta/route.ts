import { NextResponse } from "next/server";
import { Resend } from "resend";
import { appendToSheet } from "@/lib/google-sheets";
import { betaWelcomeEmail, teamNotificationTemplate } from "@/lib/email-templates";
import { getTimeStamp } from "@/lib/get-time-stamp";

export const runtime = "nodejs";

interface BetaApplication {
  name: string;
  email: string;
  role?: string;
  organization?: string;
  operating_system?: string;
  feature_requests?: string;
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
    let sheetSuccess = false;
    let emailSuccess = false;
    // Save to Google Sheets if credentials available
    try {
      if (spreadsheetId) {
        try {
          await appendToSheet(spreadsheetId, "Beta Users", {
            timestamp: getTimeStamp(),
            name: body.name,
            email: body.email,
            // form_type: "Beta Signup", # no longer needed
            role: body.role || "",
            organization: body.organization || "",
            operating_system: body.operating_system || "",
            feature_requests: body.feature_requests || "",
            build_message: body.whatYouBuild || "",
            frustration_message: `Frustration: ${body.frustration || "—"}`,
          });
        } catch (sheetError) {
          console.error("Failed to save to Google Sheets:", sheetError);
          // Continue with email even if sheet save fails
        }
      }
       sheetSuccess = true
    }
    catch  {
      sheetSuccess = false
      // console.error("Error saving to Google Sheets:", error);
    }
    try{
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
       emailSuccess = true
    }catch(error){
      console.error("Error sending emails:", error);

    }

    // Decide response based on what succeeded
    if (!sheetSuccess && !emailSuccess) {
      return NextResponse.json(
        { error: 'All services failed' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      sheet: sheetSuccess,
      email: emailSuccess,
    });
  } catch (error) {
    console.error("Error in beta route:", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
