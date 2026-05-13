import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — CogniCAD",
  description: "Weekly engineering logs, product updates, and milestones from the CogniCAD team.",
};

const ENTRIES = [
  {
    version: "0.4.1",
    date: "2024-11-18",
    type: "Build Log",
    title: "CAD Kernel — Constraint propagation stability",
    body: "Fixed a class of failures in constraint propagation across feature tree branches when topology changes invalidate downstream references. Root cause: reference IDs were not being regenerated on B-rep rebuild. This affected 12% of parametric modification sequences in our test set.",
    tags: ["CAD Kernel", "Stability"],
  },
  {
    version: "0.4.0",
    date: "2024-11-11",
    type: "Milestone",
    title: "Multimodal sketch parsing reaches 73.4% accuracy",
    body: "Our sketch-to-constraint pipeline now correctly infers geometric constraints (parallel, perpendicular, tangent, coincident) from freehand engineering sketches at 73.4% on our internal test set. Still below our 85% target, but a significant step. Main failure mode: ambiguous arc tangency detection.",
    tags: ["Sketch Parsing", "Milestone"],
  },
  {
    version: "0.3.8",
    date: "2024-11-04",
    type: "Build Log",
    title: "Reasoning layer — Added multi-turn context window",
    body: "The reasoning layer now maintains design context across up to 24 conversational turns, enabling CogniCAD to reference earlier constraints and decisions when evaluating new design modifications. This eliminated a class of context-amnesia failures in extended design sessions.",
    tags: ["Reasoning Layer", "Context"],
  },
  {
    version: "0.3.5",
    date: "2024-10-28",
    type: "Update",
    title: "Knowledge retrieval — Material database integration",
    body: "Integrated a structured materials database with 4,200+ engineering alloys, polymers, and composites. The reasoning layer can now query material properties during constraint evaluation and suggest material substitutions when specified properties are unachievable.",
    tags: ["Knowledge Retrieval", "Materials"],
  },
  {
    version: "0.3.0",
    date: "2024-10-14",
    type: "Milestone",
    title: "First end-to-end cognitive CAD session",
    body: "CogniCAD completed its first end-to-end design session from natural language intent to parametric solid: a bracket with specified load-bearing requirements, expressed in plain language, resulting in a constrained, manufacturable part. Duration: 4.7 minutes. Manual equivalent: ~45 minutes.",
    tags: ["Milestone", "End-to-end"],
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Build Log": "#8B949E",
  Milestone: "#5DA9FF",
  Update: "#D9D9D9",
};

export default function ChangelogPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Changelog
          </p>
          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-6">
            Weekly engineering updates.
          </h1>
          <p className="text-[var(--color-muted)] max-w-[50ch] leading-relaxed">
            Every week we publish what we built, what broke, and what we learned.
            No polish. Just the work.
          </p>
        </div>

        {/* Entries */}
        <div className="flex flex-col divide-y divide-white/[0.04]">
          {ENTRIES.map((entry) => (
            <article
              key={entry.version}
              className="py-10 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className="text-[10px] tracking-[0.18em] uppercase font-medium"
                  style={{ color: TYPE_COLORS[entry.type] ?? "#8B949E" }}
                >
                  {entry.type}
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-muted)]/50">
                  v{entry.version}
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-muted)]/30">
                  {entry.date}
                </span>
              </div>

              <div>
                <h2 className="text-xl tracking-tight text-[var(--color-accent)] font-light mb-4">
                  {entry.title}
                </h2>
                <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed max-w-[65ch] mb-5">
                  {entry.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.1em] uppercase text-[var(--color-muted)]/40 border border-white/[0.06] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
