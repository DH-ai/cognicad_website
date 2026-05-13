import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CogniCAD",
  description:
    "Building cognitive tools for engineering. The story, principles, and philosophy behind CogniCAD.",
};

const PRINCIPLES = [
  {
    index: "01",
    title: "First principles thinking",
    description:
      "We do not accept the current model of engineering software as a given. We ask what tools should do if we designed them from scratch, for how engineers actually think.",
  },
  {
    index: "02",
    title: "Technical depth over hype",
    description:
      "We publish our research, show our work, and speak precisely about what we have built versus what we are building. No roadmap theater.",
  },
  {
    index: "03",
    title: "Research-driven development",
    description:
      "The hard problems in cognitive engineering — constraint reasoning, geometric intelligence, multi-modal understanding — are research problems first. We solve them as such.",
  },
  {
    index: "04",
    title: "Long-term orientation",
    description:
      "We are not building a feature. We are building a new substrate for how engineering work gets done over the next twenty years.",
  },
];

const FOUNDERS = [
  {
    name: "Riven Ashmore",
    role: "Co-founder, Engineering",
    background:
      "Previously led geometric reasoning research at a computational geometry lab. 11 years working on parametric kernel design and constraint-solving systems.",
    initials: "RA",
  },
  {
    name: "Mara Solis",
    role: "Co-founder, AI Research",
    background:
      "Research background in structured prediction and program synthesis. Fascinated by the gap between how engineers communicate and how machines process geometry.",
    initials: "MS",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Hero */}
        <div className="mb-28">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            About
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-12 max-w-4xl">
            We are building cognitive tools for engineering.
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-[55ch]">
            CogniCAD exists because the tools engineers use have not kept pace
            with how engineers think. We are changing that — not incrementally,
            but fundamentally.
          </p>
        </div>

        {/* Why We Exist */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-20 mb-28 border-t border-white/[0.04] pt-16">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
              Why We Exist
            </p>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-tight text-[var(--color-accent)] font-light">
              The problem has been hidden in plain sight for decades.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              Every major engineering software product is built on the same
              mental model: a command palette, a feature tree, a ribbon of
              buttons. The engineer drives explicitly. The machine executes
              precisely.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              This model made sense in 1985. It no longer does. The cognitive
              overhead of translating engineering intent into software commands
              is massive, wasteful, and — most importantly — unnecessary.
            </p>
            <p className="text-[var(--color-accent)]/70 leading-relaxed text-base">
              CogniCAD is our answer to the question: what would engineering
              software look like if it understood not just geometry, but
              intent?
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="mb-28 border-t border-white/[0.04] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-16">
            Principles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y divide-white/[0.04] md:divide-y-0">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className={`py-10 pr-0 md:pr-12 ${i % 2 === 0 ? "md:border-r border-white/[0.04]" : "md:pl-12"} ${i < 2 ? "md:border-b border-white/[0.04]" : ""}`}
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

        {/* Founders */}
        <div className="mb-28 border-t border-white/[0.04] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-16">
            Founders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="flex gap-6">
                {/* Avatar — initials styled */}
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

        {/* Mission */}
        <div className="border-t border-white/[0.04] pt-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            Mission
          </p>
          <p className="text-3xl md:text-4xl tracking-tighter leading-tight text-[var(--color-accent)] font-light max-w-3xl">
            To build cognitive engineering systems that expand what humans can
            design, simulate, and understand — starting with the geometry that
            describes the physical world.
          </p>
        </div>
      </div>
    </main>
  );
}
