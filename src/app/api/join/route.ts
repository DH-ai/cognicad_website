import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

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

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Notify team
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.io>",
        to: "hello@cognicad.io",
        replyTo: body.email,
        subject: `Application — ${body.role} — ${body.name}`,
        html: `
          <h2>New Internship Application</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          <p><strong>Role:</strong> ${body.role}</p>
          <p><strong>Portfolio:</strong> ${body.portfolio ? `<a href="${body.portfolio}">${body.portfolio}</a>` : "—"}</p>
          <p><strong>Why CogniCAD:</strong><br>${body.whyCognicad ?? "—"}</p>
          <p><strong>Favorite problem:</strong><br>${body.favoriteProblem ?? "—"}</p>
          <p><em>Submitted: ${new Date().toISOString()}</em></p>
        `,
      });

      // Confirmation to applicant
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.io>",
        to: body.email,
        subject: "We received your application",
        html: `
          <p>Hi ${body.name},</p>
          <p>Thanks for applying for the ${body.role} role at CogniCAD. We review every application carefully and will be in touch if there is a fit.</p>
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
