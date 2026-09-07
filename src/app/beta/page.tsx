import type { Metadata } from "next";
import BetaForm from "@/components/home/BetaForm";

export const metadata: Metadata = {
  title: "Beta Program — JusCAD",
  description:
    "Apply for early access to JusCAD. Help shape the future of cognitive engineering systems.",
};

export default function BetaPage() {
  return (
    <main className="relative z-10 min-h-[100dvh] pt-16 md:pt-[72px] bg-canvas">
      <BetaForm />
    </main>
  );
}
