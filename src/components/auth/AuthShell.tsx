import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10 min-h-[100dvh] bg-canvas pt-28 pb-20 md:pt-36">
      <div className="container-jc grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <header className="max-w-xl">
          <p className="eyebrow mb-8"><span>{eyebrow}</span></p>
          <h1 className="type-section text-fg mb-6">{title}</h1>
          <p className="type-body text-muted max-w-[48ch]">{description}</p>
        </header>
        <section className="panel p-6 md:p-10">{children}</section>
      </div>
      <p className="container-jc mt-12 type-tech-sm text-muted">
        By continuing, you agree to our <Link className="text-fg underline underline-offset-4" href="/terms">Terms</Link>{" "}
        and <Link className="text-fg underline underline-offset-4" href="/privacy">Privacy Policy</Link>.
      </p>
    </main>
  );
}
