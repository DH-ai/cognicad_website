import { NextResponse } from "next/server";

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

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!body.email?.trim() || !body.email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // Log the application (replace with database write in production)
    console.log("[Beta Application]", {
      name: body.name,
      email: body.email,
      role: body.role,
      organization: body.organization,
      whatYouBuild: body.whatYouBuild,
      frustration: body.frustration,
      submittedAt: new Date().toISOString(),
    });

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
