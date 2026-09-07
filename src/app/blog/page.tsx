import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why AI in CAD Is the Path to AGI — JusCAD",
  description:
    "Language models excel at text and code, but lack spatial reasoning. Engineering is the missing modality on the road to general intelligence.",
};

export default function BlogPage() {
  return (
    <main className="relative z-10 min-h-[100dvh] pt-32 md:pt-40 pb-24 md:pb-32 bg-canvas">
      <div className="container-jc">
        <header className="max-w-[62rem]">
          <p className="eyebrow mb-8">
            <span>Blog</span>
          </p>
          <h1 className="type-hero text-fg mb-8">Coming soon</h1>
          {/* <p className="type-lead text-muted measure">
            Frontier models can write essays, prove theorems, and ship code.
            They still cannot reason about a load path. That gap is not an
            edge case — it is the missing modality.
          </p>*/}
        </header>
        {/*

        <article className="flex flex-col gap-7 text-fg/85 leading-[1.75] text-[17px] measure">
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

          <p className="text-muted italic">
            If you build CAD, simulation, or engineering tools and this
            resonates — we&rsquo;d like to hear from you.
          </p>
        </article>

        <div className="mt-20 pt-10 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link href="/beta" className="btn btn-primary">
            Join the beta
          </Link>
          <Link href="/about" className="btn btn-ghost">
            Read the full thesis →
          </Link>
        </div> */}
      </div>
    </main>
  );
}
