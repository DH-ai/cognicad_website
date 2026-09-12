import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Sign in — JusCAD", robots: { index: false, follow: false } };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <AuthShell eyebrow="Account" title="Return to your workspace." description="Sign in to manage your profile and access upcoming JusCAD releases."><AuthForm mode="sign-in" next={next} /></AuthShell>;
}
