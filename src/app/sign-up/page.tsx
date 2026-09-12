import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Create account — JusCAD", robots: { index: false, follow: false } };
export default function SignUpPage() {
  return <AuthShell eyebrow="Early access" title="Create your JusCAD account." description="Your account is the foundation for product access as the platform becomes available."><AuthForm mode="sign-up" /></AuthShell>;
}
