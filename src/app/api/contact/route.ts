import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

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

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Notify team
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.io>",
        to: "hello@cognicad.io",
        replyTo: body.email,
        subject: `Contact: ${body.type ?? "General Inquiry"} — ${body.name}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          <p><strong>Type:</strong> ${body.type ?? "General"}</p>
          <p><strong>Message:</strong><br>${body.message.replace(/\n/g, "<br>")}</p>
          <p><em>Submitted: ${new Date().toISOString()}</em></p>
        `,
      });

      // Confirmation to sender
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.io>",
        to: body.email,
        subject: "We received your message",
        html: `
          <p>Hi ${body.name},</p>
          <p>Thanks for reaching out. We typically respond within 24 hours.</p>
          <p>— The CogniCAD team</p>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
