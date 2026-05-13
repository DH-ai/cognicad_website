import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

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

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Notify research team
      await resend.emails.send({
        from: "CogniCAD <noreply@cognicad.io>",
        to: "research@cognicad.io",
        subject: `Beta Application — ${body.name}`,
        html: `
          <h2>New Beta Application</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Role:</strong> ${body.role ?? "—"}</p>
          <p><strong>Organization:</strong> ${body.organization ?? "—"}</p>
          <p><strong>What they build:</strong><br>${body.whatYouBuild ?? "—"}</p>
          <p><strong>Biggest frustration:</strong><br>${body.frustration ?? "—"}</p>
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
          <p>We received your application for the CogniCAD beta program. We are building a small, focused cohort of engineers for the first release — we will be in touch.</p>
          <p>— The CogniCAD team</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Application received." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
