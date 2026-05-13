import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Research — CogniCAD",
  description:
    "Papers, essays, experiments, and build logs from the CogniCAD engineering research program.",
};

const CATEGORIES = ["All", "Papers", "Essays", "Experiments", "Build Logs"] as const;

const RESEARCH_ITEMS = [
  {
    category: "Paper",
    title: "Towards Neural-Symbolic CAD Kernels",
    date: "2024-11",
    description:
      "Hybrid architectures where learned geometric reasoning operates alongside deterministic parametric solvers. We introduce a constraint graph formulation that maps natural language design intents to B-rep topology operations.",
    tag: "Geometric Intelligence",
    readTime: "24 min",
  },
  {
    category: "Essay",
    title: "Why Engineers Need Cognitive Partners, Not Just AI Tools",
    date: "2024-10",
    description:
      "The distinction between a tool that executes and a system that understands is the defining problem of this decade in engineering software. This essay maps the philosophical and technical gap.",
    tag: "Engineering Philosophy",
    readTime: "12 min",
  },
  {
    category: "Experiment",
    title: "Training Language Models on Parametric Design Sequences",
    date: "2024-09",
    description:
      "Early results from sequence-prediction experiments on CAD history trees. Can a transformer learn the grammar of parametric modeling well enough to suggest structurally valid next operations?",
    tag: "ML Research",
    readTime: "18 min",
  },
  {
    category: "Build Log",
    title: "Week 14 — CAD Kernel Integration",
    date: "2024-11",
    description:
      "Notes on integrating a custom BREP kernel with multi-modal input routing. Geometry as a first-class token type. Problems encountered with constraint propagation across feature trees.",
    tag: "Engineering Log",
    readTime: "8 min",
  },
  {
    category: "Paper",
    title: "Constraint Satisfaction in Conversational CAD",
    date: "2024-08",
    description:
      "Formalizing the problem of maintaining geometric constraint consistency when design modifications are expressed in natural language rather than explicit parameter changes.",
    tag: "CAD Theory",
    readTime: "31 min",
  },
  {
    category: "Essay",
    title: "The Topology of Engineering Intent",
    date: "2024-07",
    description:
      "Engineers communicate in a rich, ambiguous language of forces, functions, and tradeoffs. We explore what it means to formalize this language for machine understanding without losing its essential richness.",
    tag: "Systems Thinking",
    readTime: "15 min",
  },
  {
    category: "Experiment",
    title: "Mesh Prediction from Textual Load Specifications",
    date: "2024-06",
    description:
      "Can we predict appropriate FEA mesh density from a description of expected loading? An early-stage experiment in bridging intent specification and simulation setup.",
    tag: "Simulation Research",
    readTime: "14 min",
  },
  {
    category: "Build Log",
    title: "Week 07 — Multimodal Sketch Parsing",
    date: "2024-09",
    description:
      "Implementing a sketch recognition pipeline that converts rough engineering sketches into constraint-aware parametric profiles. Current accuracy on standard engineering forms: 73.4%.",
    tag: "Engineering Log",
    readTime: "6 min",
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Research
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-8">
            Building in public.
            <br />
            <span className="text-[var(--color-muted)]">Thinking out loud.</span>
          </h1>
          <p className="text-[var(--color-muted)] max-w-[52ch] leading-relaxed text-base">
            We publish our research process, not just our conclusions.
            Papers, essays, failed experiments, and weekly engineering notes.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-6 mb-16 border-b border-white/[0.04] pb-6 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200 pb-px ${
                cat === "All"
                  ? "text-[var(--color-accent)] border-b border-[var(--color-accent)]/40"
                  : "text-[var(--color-muted)]/60 hover:text-[var(--color-muted)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Research list */}
        <div className="flex flex-col divide-y divide-white/[0.04]">
          {RESEARCH_ITEMS.map((item) => (
            <Link
              href="/research"
              key={item.title}
              className="group py-8 grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-6 md:gap-12 items-start"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-glow)]/60">
                  {item.category}
                </span>
                <span className="text-[11px] text-[var(--color-muted)]/40 font-[family-name:var(--font-geist-mono)]">
                  {item.date}
                </span>
              </div>

              <div>
                <h2 className="text-xl tracking-tight text-[var(--color-accent)] font-light mb-3 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </h2>
                <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed max-w-[65ch]">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-4 md:pt-1">
                <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-muted)]/35 hidden md:block">
                  {item.readTime}
                </span>
                <ArrowUpRight
                  size={16}
                  weight="light"
                  className="text-[var(--color-muted)]/30 group-hover:text-[var(--color-muted)]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
