import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CogniCAD",
  description:
    "An AI-native engineering platform that turns engineering software from a passive instrument into an active collaborator — and a foundation model for engineering itself.",
};

const FOUNDERS = [
  {
    name: "Dhruv Chaturvedi",
    role: "Co-founder",
    background:
      "Building the orchestration layer and physics-aware latent space at the core of CogniCAD. Background in computational geometry and applied ML for engineering systems.",
    initials: "DC",
  },
  {
    name: "[Co-founder Name]",
    role: "Co-founder",
    background:
      "[Replace this placeholder with your co-founder's bio — background, prior work, and the part of CogniCAD they own.]",
    initials: "—",
  },
];

const PILLARS = [
  {
    index: "01",
    title: "From passive tools to active collaborators",
    description:
      "CAD, simulation, control, VLSI — today's engineering software executes instructions but doesn't understand intent. We sit on top of existing tools as a domain-aware orchestration layer that translates natural-language intent into structured design artifacts.",
  },
  {
    index: "02",
    title: "Physics-aware latent space",
    description:
      "Generative design today produces plausible shapes without physical grounding — Gaussian noise dressed as engineering. We represent geometry, constraints, materials, and governing equations as a single interconnected entity the system can reason about, not just sample from.",
  },
  {
    index: "03",
    title: "Orchestrator of specialized agents",
    description:
      "An orchestrator decomposes engineering problems into sub-tasks and delegates to geometry, simulation, optimization, and validation agents. They maintain context across iterations and converge toward outputs that are syntactically correct and physically valid.",
  },
  {
    index: "04",
    title: "A horizontal intelligence layer",
    description:
      "Mechanical, aerospace, electrical, chemical. If OpenAI and Anthropic are becoming the productivity layer for knowledge work, we aim to become the intelligence layer for engineering — starting with AI-assisted CAD and simulation, compressing design cycles from weeks to hours.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-[100dvh] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="mb-28">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            About
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-12 max-w-4xl">
            The intelligence layer for engineering.
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-[58ch]">
            We&rsquo;re building an AI-native engineering platform that
            fundamentally changes how complex physical systems are designed —
            and over time, evolves into a new class of foundation model for
            engineering itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-20 mb-28 border-t border-[var(--color-border-subtle)] pt-16">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
              The Shift
            </p>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-tight text-[var(--color-accent)] font-light">
              From AI as autocomplete to AI as an engineering partner.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              An engineer describes a system in natural language — a drone
              propulsion assembly, a structural bracket under load, a thermal
              management loop. The platform translates that into structured
              design artifacts, then orchestrates the sequence: generate
              geometry, apply constraints, run simulations, evaluate
              performance, iterate.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              Engineering is reasoning under constraints — every design
              balances strength against weight, performance against cost,
              efficiency against manufacturability. Most current AI-native
              approaches operate at the surface. We don&rsquo;t.
            </p>
            <p className="text-[var(--color-accent)]/70 leading-relaxed text-base">
              We integrate into existing workflows — augmenting CAD,
              simulation, and analysis with intelligence that speaks both the
              language of engineering and the underlying physics.
            </p>
          </div>
        </div>

        <div className="mb-28 border-t border-[var(--color-border-subtle)] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-16">
            How we&rsquo;re different
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y divide-[var(--color-border-subtle)] md:divide-y-0">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={`py-10 pr-0 md:pr-12 ${i % 2 === 0 ? "md:border-r border-[var(--color-border-subtle)]" : "md:pl-12"} ${i < 2 ? "md:border-b border-[var(--color-border-subtle)]" : ""}`}
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--color-muted)]/40 tracking-widest">
                    {p.index}
                  </span>
                  <h3 className="text-lg tracking-tight text-[var(--color-accent)] font-light">
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed max-w-[45ch]">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-28 border-t border-[var(--color-border-subtle)] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-16">
            Founders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 border border-[var(--color-accent)]/15 flex items-center justify-center">
                  <span className="text-sm font-[family-name:var(--font-geist-mono)] text-[var(--color-muted)]/80 tracking-widest">
                    {f.initials}
                  </span>
                </div>
                <div>
                  <h3 className="text-base tracking-tight text-[var(--color-accent)] font-light mb-0.5">
                    {f.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-glow)]/60 mb-4">
                    {f.role}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed">
                    {f.background}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-28 border-t border-[var(--color-border-subtle)] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            Long-Term Vision
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tighter leading-tight text-[var(--color-accent)] font-light mb-10 max-w-3xl">
            The Large Spatial Engineering Model.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              Frontier models excel at language and code, but lack a deep
              understanding of space. Engineering is, at its core, a spatial
              discipline — wings, chips, heat exchangers, robots — geometry,
              topology, and constraints interacting in three dimensions.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              LSEM unifies geometry, physics, and constraints in a single
              latent space. It enables reasoning across structure and physics
              simultaneously — not just generating designs, but iteratively
              refining them while explaining its reasoning. Engineering
              cognition at scale.
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-border-subtle)] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            Mission
          </p>
          <p className="text-3xl md:text-4xl tracking-tighter leading-tight text-[var(--color-accent)] font-light max-w-3xl">
            In the near term, we accelerate engineers. In the long term, we
            redefine engineering itself — the intelligence layer for the
            machines, systems, and infrastructure that define the real world.
          </p>
        </div>
      </div>
    </main>
  );
}
