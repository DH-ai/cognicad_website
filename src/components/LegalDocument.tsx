import type { ReactNode } from "react";

export function LegalDocument({ eyebrow, title, summary, children }: { eyebrow: string; title: string; summary: string; children: ReactNode }) {
  return <main className="relative z-10 min-h-[100dvh] bg-canvas pt-32 pb-24 md:pt-40 md:pb-32"><div className="container-jc"><header className="max-w-4xl mb-14 border-b border-line pb-12"><p className="eyebrow mb-8"><span>{eyebrow}</span><span>Effective 12 September 2026</span></p><h1 className="type-section text-fg mb-7">{title}</h1><p className="type-lead text-muted">{summary}</p></header><article className="legal-copy max-w-3xl">{children}</article></div></main>;
}
