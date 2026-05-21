import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — CogniCAD",
  description:
    "We’re building an AI-native engineering platform that transforms how complex physical systems are designed — and, over time, evolves toward a new class of foundation model for engineering itself.",
};

const FOUNDERS = [
  {
    name: "Dhruv Chaturvedi",
    role: "Co-founder",
    background:
      "Researching on ai native cad archtectural black boxes like cad tokenizer, multimodal cad transformers and physics-aware latent space at the core of CogniCAD. Background in Aerospace Engineering and  applied ML for engineering systems.",
    initials: "DC",
    photo: "/founders/dhruv.jpeg", // Add photo path
    email: "dhruvchaturvedi@cognicad.xyz",
    socials: {
      twitter: "https://x.com/dhruvatafgc",
      linkedin: "https://www.linkedin.com/in/dhruv-chaturvedi-a01610283/",
      github: "https://github.com/dh-ai",
    },
  },
  {
    name: "Shresth Keshari",
    role: "Co-founder",
    background:
      "Co-founding CogniCAD with a focus on developing the physics-aware latent space, manufacturing and synthesis capabilities. Background in Computational Mechanics, Neural Networks and Machine Learning for engineering applications.",
    initials: "SK",
    photo: "/founders/shresht.jpeg", // Add photo path
    email: "shreshtkesari@cognicad.xyz",
    socials: {
      twitter: "https://twitter.com/SaffronShresht",
      linkedin: "https://www.linkedin.com/in/shresth-keshari-626b2a267/",
      github: "https://github.com/shresth-keshari",
    },
  },
];

const PILLARS = [
  {
    index: "01",
    title: "From passive tools to active collaborators",
    description:
      "Traditional engineering tools execute commands but do not understand intent. CogniCAD acts as a domain-aware orchestration layer that converts natural-language objectives into structured engineering workflows across CAD, simulation, optimization, and validation systems.",
  },
  {
    index: "02",
    title: "Physics-aware latent space",
    description:
      "Most generative design systems produce geometrically plausible outputs without true physical understanding. We represent geometry, constraints, materials, simulation states, and governing equations within a unified latent representation — enabling the system to reason about engineering behavior, not merely generate shapes.",
  },
  {
    index: "03",
    title: "Orchestrator of specialized agents",
    description:
      "Complex engineering tasks are decomposed into coordinated sub-problems handled by specialized agents for geometry generation, simulation, optimization, verification, and manufacturability analysis. A central orchestrator maintains cross-stage context and iteratively converges toward designs that are both physically valid and operationally useful.",
  },
  {
    index: "04",
    title: "A horizontal intelligence layer",
    description:
      "MMechanical, aerospace, electronics, robotics, thermal systems, and beyond — our goal is to build a shared intelligence layer across engineering disciplines. If frontier AI models are becoming the productivity layer for knowledge work, CogniCAD aims to become the intelligence layer for engineering workflows — accelerating design cycles from weeks to hours.",
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
              An engineer describes a system in natural language — a propulsion assembly, a structural bracket under load, a thermal management loop. The platform translates that intent into structured engineering artifacts, then orchestrates the workflow: generate geometry, apply constraints, run simulations, evaluate performance, and iterate.

            </p>
            <p className="text-[var(--color-muted)] leading-relaxed text-base">
              Engineering is fundamentally reasoning under constraints — balancing strength against weight, performance against cost, efficiency against manufacturability. Most AI systems operate at the surface level of engineering. We aim to model the underlying structure and physics.

            </p>
            <p className="text-[var(--color-accent)]/70 leading-relaxed text-base">
              Rather than replacing existing engineering software, CogniCAD integrates with CAD, simulation, and analysis workflows as an intelligence layer that understands both engineering language and physical behavior.

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="flex flex-col">
                {/* Photo Section */}
                <div className="relative mb-6 w-64 h-64 bg-[var(--color-border-subtle)] border border-[var(--color-border-subtle)] flex items-center justify-center overflow-hidden">
                  {f.photo ? (
                    <Image
                      src={f.photo}
                      alt={f.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-[family-name:var(--font-geist-mono)] text-[var(--color-muted)]/40 tracking-widest">
                      Photo
                    </span>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex gap-6 mb-6">
                  <div>
                    <h3 className="text-lg tracking-tight text-[var(--color-accent)] font-light mb-0.5">
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

                {/* Email Section */}
                <div className="mb-4 pb-4 border-b border-[var(--color-border-subtle)]">
                  <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-glow)]/60 mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${f.email}`}
                    className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 transition-colors"
                  >
                    {f.email}
                  </a>
                </div>

                {/* Social Links Section */}
                <div>
                  <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-glow)]/60 mb-3">
                    Connect
                  </p>
                  <div className="flex gap-4">
                    {f.socials.twitter && (
                      <a
                        href={f.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--color-muted)]/60 hover:text-[var(--color-accent)] transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {f.socials.linkedin && (
                      <a
                        href={f.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--color-muted)]/60 hover:text-[var(--color-accent)] transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {f.socials.github && (
                      <a
                        href={f.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--color-muted)]/60 hover:text-[var(--color-accent)] transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
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
