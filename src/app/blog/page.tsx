import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why AI in CAD Is the Path to AGI — CogniCAD",
  description:
    "Language models excel at text and code, but lack spatial reasoning. Engineering is the missing modality on the road to general intelligence.",
};

export default function BlogPage() {
  return (
    <main className="relative z-10 min-h-[100dvh] pt-28 pb-32">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Thesis · 4 min read
          </p>
          <h1 className="text-4xl md:text-6xl tracking-tighter leading-[0.95] text-[var(--color-accent)] font-light mb-8">
            Why AI in CAD Is the Path to AGI.
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed">
            Frontier models can write essays, prove theorems, and ship code.
            They still cannot reason about a load path. That gap is not an
            edge case — it is the missing modality.
          </p>
        </div>

        <article className="flex flex-col gap-7 text-[var(--color-accent)]/85 leading-[1.75] text-[17px]">
          <p>
            The story of frontier AI has been a story of tokens. Words, then
            code, then images decomposed into sequences a transformer can
            attend over. Each modality unlocks a new domain of reasoning, and
            each one moves the field measurably closer to general
            intelligence. But there is a domain the dominant paradigm has
            barely touched: <em>space</em>.
          </p>

          <p>
            Engineering is the discipline of reasoning about space under
            constraints. A wing, a chip, a heat exchanger, a bracket — every
            real-world artifact is a negotiation between geometry, physics,
            and manufacturing reality. Today&rsquo;s models can describe
            these things in language. They cannot reason through them.
          </p>

          <p>
            The current wave of &ldquo;generative design&rdquo; tools
            illustrates the gap. They produce plausible-looking shapes that
            fail under load, ignore manufacturability, or violate constraints
            their training data never encoded. We call this Gaussian noise
            generation — outputs that look correct without being correct.
            Surface-level fluency, no underlying model of how the physical
            world actually behaves.
          </p>

          <p>
            CAD is the right wedge for solving this. It is the most
            structured spatial dataset humans have ever produced — parametric
            histories, constraints, materials, simulation results, every
            iteration captured as a graph of decisions. When an engineer
            edits a model, they are not generating geometry. They are
            traversing a decision space under physical and economic
            constraints. That trace is exactly what a spatial foundation
            model needs to learn from.
          </p>

          <p>
            This is why we think the path runs through engineering software,
            not around it. The orchestration layer we&rsquo;re building today
            — the agents, the physics-aware latent space, the iterative
            validation loop — is also the data-generation infrastructure for
            a Large Spatial Engineering Model. Every workflow we accelerate
            produces another reasoning trace. Every constraint adjustment
            teaches the system something language alone cannot.
          </p>

          <p>
            AGI will not be built purely out of text. It will be built when
            machines can reason about the same physical, geometric,
            constraint-laden world that humans operate in. CAD is the
            shortest path to that capability — and the engineers who use it
            every day are the teachers we have been overlooking.
          </p>

          <p className="text-[var(--color-muted)] italic">
            If you build CAD, simulation, or engineering tools and this
            resonates — we&rsquo;d like to hear from you.
          </p>
        </article>

        <div className="mt-20 pt-10 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            href="/beta"
            className="px-8 py-3.5 bg-[var(--color-accent)] text-[var(--color-void)] text-[11px] tracking-[0.18em] uppercase font-medium hover:opacity-90 active:-translate-y-px transition-all duration-200 cursor-pointer"
          >
            Join the Beta
          </Link>
          <Link
            href="/about"
            className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            Read the full thesis →
          </Link>
        </div>
      </div>
    </main>
  );
}
