import { NextResponse } from "next/server";
import { Resend } from "resend";
import { appendToSheet } from "@/lib/google-sheets";
import { contactConfirmationEmail, teamNotificationTemplate } from "@/lib/email-templates";
import { getTimeStamp } from "@/lib/get-time-stamp";

export const runtime = "nodejs";

interface ContactInquiry {
  name: string;
  email: string;
  type?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactInquiry = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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
    if (!spreadsheetId) {console.log("Google Sheets Spreadsheet ID:", spreadsheetId);}
    // Save to Google Sheets if credentials available
    if (spreadsheetId) { // temperory will remove it later
      try {
        await appendToSheet("spreadsheetId", "Contact Inquiries", {
          timestamp: getTimeStamp(),
          name: body.name,
          email: body.email,
          inquiry: body.type || "General Inquiry",
          message:body.message || "",
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
        subject: `Contact: ${body.type ?? "General Inquiry"} — ${body.name}`,
        html: teamNotificationTemplate("Contact Inquiry", {
          Name: body.name,
          Email: body.email,
          Inquiry: body.type || "General Inquiry",
          Message: body.message,
        }),
      });

      // Confirmation to sender
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.xyz>",
        to: body.email,
        subject: "We received your message",
        html: contactConfirmationEmail(body.name),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
