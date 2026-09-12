import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Reset password — JusCAD", robots: { index: false, follow: false } };
export default function ForgotPasswordPage() {
  return <AuthShell eyebrow="Account recovery" title="Reset your password." description="We will send a secure recovery link to your verified email address."><AuthForm mode="forgot" /></AuthShell>;
}
