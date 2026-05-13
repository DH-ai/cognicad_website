import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Progress — CogniCAD",
  description: "Milestones, engineering updates, and build logs from the CogniCAD team. Building in public.",
};

const MILESTONES = [
  {
    id: "m5",
    type: "Milestone",
    version: "0.5.0",
    date: "2024-12-02",
    title: "First beta cohort onboarded",
    description:
      "12 engineers from 7 companies received beta access. Early sessions focus on aerospace bracket design and turbomachinery parametric workflows. Initial NPS: 63.",
    metric: { label: "Beta engineers", value: "12" },
    tags: ["Beta", "Product"],
  },
  {
    id: "m4",
    type: "Research",
    version: "0.4.8",
    date: "2024-11-25",
    title: "End-to-end session time down to 4.7 min average",
    description:
      "From natural language intent to validated, constrained parametric solid. Baseline manual equivalent on test cases: ~47 minutes. Speed improvement: 10×. Accuracy on constraint satisfaction: 91.3%.",
    metric: { label: "Speed improvement", value: "10×" },
    tags: ["Performance", "Milestone"],
  },
  {
    id: "m3",
    type: "Engineering",
    version: "0.4.0",
    date: "2024-11-11",
    title: "Sketch-to-constraint pipeline: 73.4% accuracy",
    description:
      "Our freehand sketch recognition pipeline now correctly infers geometric constraints at 73.4% on the internal test set. Main failure mode: ambiguous arc tangency detection. Target: 85%.",
    metric: { label: "Sketch accuracy", value: "73.4%" },
    tags: ["Sketch Parsing", "ML"],
  },
  {
    id: "m2",
    type: "Research",
    version: "0.3.5",
    date: "2024-10-28",
    title: "4,200-alloy materials database integrated",
    description:
      "The reasoning layer now queries a structured materials database during constraint evaluation. Material substitution suggestions are now available when specified properties are physically unachievable with specified material class.",
    metric: { label: "Materials indexed", value: "4,200+" },
    tags: ["Knowledge Retrieval", "Materials"],
  },
  {
    id: "m1",
    type: "Milestone",
    version: "0.3.0",
    date: "2024-10-14",
    title: "First end-to-end cognitive CAD session",
    description:
      "CogniCAD completed its first full design session: bracket with specified load-bearing requirements in plain language → constrained, manufacturable solid. This was the first time the full cognitive stack ran without human hand-offs.",
    metric: { label: "First proof", value: "v0.3.0" },
    tags: ["Milestone", "Foundation"],
  },
];

const BUILD_LOGS = [
  {
    week: "Week 18",
    date: "2024-11-18",
    title: "CAD Kernel — Constraint propagation stability",
    note:
      "Fixed constraint propagation failures across feature tree branches on B-rep rebuild. Affected 12% of parametric modification sequences in test set.",
  },
  {
    week: "Week 14",
    date: "2024-11-04",
    title: "Reasoning layer — Multi-turn context window",
    note:
      "Design context maintained across up to 24 conversational turns. Eliminated context-amnesia class of failures in extended sessions.",
  },
  {
    week: "Week 10",
    date: "2024-10-07",
    title: "Assembly graph engine v1 shipped",
    note:
      "Sub-assembly relationships now represented as a directed graph. Enables multi-body reasoning for complex assemblies. Performance: 200ms average graph construction.",
  },
  {
    week: "Week 07",
    date: "2024-09-16",
    title: "Multimodal sketch parser v0.1",
    note:
      "First working version of freehand sketch-to-parametric-profile pipeline. Handles lines, arcs, circles, and basic construction geometry.",
  },
];

const TYPE_COLOR: Record<string, string> = {
  Milestone: "var(--color-glow)",
  Research: "var(--color-accent)",
  Engineering: "var(--color-muted)",
};

export default function ProgressPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Progress
          </p>
          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-6">
            Building in public.
          </h1>
          <p className="text-[var(--color-muted)] max-w-[52ch] leading-relaxed">
            Milestones, metrics, and build logs. We track progress by what we can
            demonstrate, not by what we plan to ship.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase border border-[var(--color-accent)]/22 text-[var(--color-accent)]/70 px-5 py-2.5 hover:border-[var(--color-accent)]/45 hover:text-[var(--color-accent)] transition-all duration-200"
            >
              Read Blog
              <ArrowUpRight size={11} weight="bold" />
            </Link>
            <Link
              href="/changelog"
              className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-muted)]/55 hover:text-[var(--color-muted)] transition-colors border-b border-[var(--color-muted)]/20 pb-px self-center"
            >
              View Changelog
            </Link>
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-24">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-12">
            Key Milestones
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-px bg-[var(--color-border-subtle)]">
            {MILESTONES.map((m) => (
              <div
                key={m.id}
                className="bg-[var(--color-void)] p-8 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase font-medium"
                      style={{ color: TYPE_COLOR[m.type] ?? "var(--color-muted)" }}
                    >
                      {m.type}
                    </span>
                    <p className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--color-muted)]/35 mt-0.5">
                      {m.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl font-[family-name:var(--font-geist-mono)] font-light"
                      style={{ color: TYPE_COLOR[m.type] ?? "var(--color-accent)" }}
                    >
                      {m.metric.value}
                    </p>
                    <p className="text-[10px] text-[var(--color-muted)]/35 mt-0.5">
                      {m.metric.label}
                    </p>
                  </div>
                </div>

                <h3 className="text-base tracking-tight text-[var(--color-accent)] font-light">
                  {m.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]/65 leading-relaxed">
                  {m.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.1em] uppercase text-[var(--color-muted)]/40 border border-[var(--color-border-subtle)] px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Build Logs */}
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-12">
            Build Logs
          </p>

          <div className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
            {BUILD_LOGS.map((log) => (
              <div
                key={log.week}
                className="py-7 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-10"
              >
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-glow)]/60">
                    {log.week}
                  </p>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--color-muted)]/30 mt-0.5">
                    {log.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm tracking-tight text-[var(--color-accent)] font-light mb-2">
                    {log.title}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]/60 leading-relaxed max-w-[60ch]">
                    {log.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
