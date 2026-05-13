import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology — CogniCAD",
  description:
    "The system architecture, AI stack, and simulation systems powering CogniCAD's cognitive engineering platform.",
};

const SYSTEM_LAYERS = [
  {
    index: "01",
    title: "Multimodal Interface",
    subtitle: "Input Routing & Intent Parsing",
    description:
      "Engineers express design intent through natural language, freehand sketch, existing geometry, or direct parametric input. CogniCAD routes and fuses these modalities into a unified intent representation before any geometric operation begins.",
    details: [
      "Sketch vectorization and constraint inference",
      "Natural language intent decomposition",
      "Multi-turn context maintenance",
      "Ambiguity resolution through clarifying dialogue",
    ],
  },
  {
    index: "02",
    title: "Reasoning Layer",
    subtitle: "Cognitive Processing Engine",
    description:
      "The core of what makes CogniCAD different. A multi-step reasoning system that translates high-level design intent into specific, validated sequences of geometric and simulation operations.",
    details: [
      "Hierarchical design intent decomposition",
      "Physical constraint propagation",
      "Trade-space navigation and suggestion",
      "Failure mode anticipation",
    ],
  },
  {
    index: "03",
    title: "CAD Kernel",
    subtitle: "Parametric Geometry Engine",
    description:
      "A custom parametric solid modeling kernel designed from the ground up to be interrogated and manipulated by AI systems, not just human command sequences. B-rep topology as a first-class data type.",
    details: [
      "Constraint-aware B-rep manipulation",
      "Parametric history tree management",
      "Topological change propagation",
      "Geometry-language alignment representations",
    ],
  },
  {
    index: "04",
    title: "Simulation Systems",
    subtitle: "Physics-Informed Analysis",
    description:
      "Structural, thermal, and fluid simulation systems that connect directly to the reasoning layer — allowing CogniCAD to validate design decisions against physical reality without manual simulation setup.",
    details: [
      "Intent-driven mesh generation",
      "Automated boundary condition specification",
      "Multi-physics coupling",
      "Result interpretation and feedback routing",
    ],
  },
  {
    index: "05",
    title: "Knowledge Retrieval",
    subtitle: "Engineering Memory",
    description:
      "A continuously updated store of engineering standards, material databases, manufacturing constraints, and design precedent. CogniCAD queries this during reasoning to ground suggestions in real-world engineering practice.",
    details: [
      "Standards and specification retrieval",
      "Material selection reasoning",
      "Manufacturing constraint awareness",
      "Precedent-based design suggestion",
    ],
  },
  {
    index: "06",
    title: "Optimization Agents",
    subtitle: "Autonomous Design Exploration",
    description:
      "AI agents that autonomously explore the design space around a given intent, running parametric variations, simulation sweeps, and trade studies — surfacing the Pareto front of viable designs for engineer review.",
    details: [
      "Multi-objective optimization",
      "Automated design space sampling",
      "Constraint-aware variation generation",
      "Trade study synthesis and presentation",
    ],
  },
];

export default function TechnologyPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-24">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            Technology
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-8 max-w-4xl">
            A cognitive stack built for engineering.
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-[55ch]">
            Six tightly integrated layers, each designed to compose naturally with the next.
            No adapters. No seams. A single unified architecture for cognitive engineering.
          </p>
        </div>

        {/* Stack diagram — visual */}
        <div className="mb-24 border-t border-white/[0.04] pt-16">
          <div className="hidden md:flex flex-col gap-px w-full max-w-2xl">
            {SYSTEM_LAYERS.map((layer, i) => (
              <div
                key={layer.index}
                className="flex items-center gap-6 px-8 py-5 border border-white/[0.05] hover:border-[#5DA9FF]/20 transition-colors duration-300 group"
                style={{
                  background: `rgba(11,13,16,${0.3 + i * 0.08})`,
                  borderLeftColor:
                    i === 0
                      ? "rgba(93,169,255,0.4)"
                      : i === 5
                      ? "rgba(139,148,158,0.15)"
                      : "rgba(255,255,255,0.06)",
                }}
              >
                <span className="font-[family-name:var(--font-geist-mono)] text-[9px] text-[var(--color-muted)]/30 tracking-widest w-8 flex-shrink-0">
                  {layer.index}
                </span>
                <span
                  className="text-sm tracking-tight font-light transition-colors duration-200"
                  style={{
                    color:
                      i === 0
                        ? "rgba(93,169,255,0.9)"
                        : i === 5
                        ? "rgba(139,148,158,0.7)"
                        : "rgba(217,217,217,0.8)",
                  }}
                >
                  {layer.title}
                </span>
                <span className="ml-auto text-[10px] tracking-[0.1em] text-[var(--color-muted)]/25 group-hover:text-[var(--color-muted)]/50 transition-colors duration-200 hidden md:block">
                  {layer.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed layer descriptions */}
        <div className="flex flex-col">
          {SYSTEM_LAYERS.map((layer) => (
            <div
              key={layer.title}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 py-16 border-t border-white/[0.04]"
            >
              <div>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--color-muted)]/35 tracking-widest block mb-2">
                  {layer.index}
                </span>
                <h2 className="text-lg tracking-tight text-[var(--color-accent)] font-light mb-1">
                  {layer.title}
                </h2>
                <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-glow)]/50">
                  {layer.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">
                <p className="text-[var(--color-muted)] leading-relaxed text-sm">
                  {layer.description}
                </p>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)]/40 mb-4">
                    Capabilities
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {layer.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm text-[var(--color-muted)]/60"
                      >
                        <div className="w-px h-3 bg-[#5DA9FF]/30 flex-shrink-0 mt-1.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
