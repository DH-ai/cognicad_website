import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Downloads — JusCAD", robots: { index: false, follow: false } };
export default async function DownloadPage() {
  await requireUser();
  return (
    <main className="relative z-10 min-h-[100dvh] bg-canvas pt-28 pb-24 md:pt-36">
      <div className="container-jc">
        <section className="panel min-h-[30rem] p-8 md:p-14 flex flex-col justify-between overflow-hidden relative">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,transparent,var(--grid-line))]" />
          <div className="relative max-w-3xl"><p className="eyebrow mb-8"><span>Release channel</span><span>Coming soon</span></p><h1 className="type-section text-fg mb-7">The first JusCAD download is being assembled.</h1><p className="type-lead text-muted">There is nothing to install yet. Your account will be ready when early-access builds become available.</p></div>
          <div className="relative mt-16 flex flex-wrap gap-3"><span className="status border border-line bg-canvas px-4 py-3">No active release</span><Link href="/settings" className="btn btn-secondary">Back to settings</Link></div>
        </section>
      </div>
    </main>
  );
}
