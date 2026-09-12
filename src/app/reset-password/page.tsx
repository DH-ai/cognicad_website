import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Choose a new password — JusCAD", robots: { index: false, follow: false } };
export default function ResetPasswordPage() {
  return <AuthShell eyebrow="Account recovery" title="Choose a new password." description="Use a unique password with at least eight characters."><AuthForm mode="reset" /></AuthShell>;
}
