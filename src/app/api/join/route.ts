import { NextResponse } from "next/server";
import { Resend } from "resend";
import { appendToSheet } from "@/lib/google-sheets";
import { jobApplicationConfirmationEmail, teamNotificationTemplate } from "@/lib/email-templates";
import { getTimeStamp } from "@/lib/get-time-stamp";
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
    let sheetSuccess = false;
    let emailSuccess = false;
    // Save to Google Sheets if credentials available
    if (spreadsheetId) {
      try {
        await appendToSheet(spreadsheetId, "Job Applications", {
          timestamp: getTimeStamp(),
          name: body.name,
          email: body.email,
          role: body.role,
          message_job_application: body.whyCognicad || "",
          resume: body.portfolio || "—",
          fav_problem: body.favoriteProblem || "—",
        });
       sheetSuccess = true

      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
        // Continue with email even if sheet save fails
      sheetSuccess = false
        
      }
    }

    try{

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
      emailSuccess = true
    }catch (error){
      console.error("Error sending emails:", error);
      emailSuccess = false

    }

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
    console.error("Error in join route:", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
