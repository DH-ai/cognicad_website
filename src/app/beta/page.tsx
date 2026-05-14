import type { Metadata } from "next";
import BetaForm from "@/components/home/BetaForm";

export const metadata: Metadata = {
  title: "Beta Program — CogniCAD",
  description:
    "Apply for early access to CogniCAD. Help shape the future of cognitive engineering systems.",
};

export default function BetaPage() {
  return (
    <main className="relative z-10 min-h-[100dvh] pt-16">
      <BetaForm />
    </main>
  );
}
