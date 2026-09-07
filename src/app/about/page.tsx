import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — JusCAD",
  description:
    "We’re building an AI-native engineering platform that transforms how complex physical systems are designed — and, over time, evolves toward a new class of foundation model for engineering itself.",
};

const FOUNDERS = [
  {
    name: "Dhruv Chaturvedi",
    role: "Co-founder",
    background:
      "Researching on ai native cad archtectural black boxes like cad tokenizer, multimodal cad transformers and physics-aware latent space at the core of JusCAD. Background in Aerospace Engineering and  applied ML for engineering systems.",
    initials: "DC",
    photo: "/founders/dhruv.jpeg",
    email: "dhruvchaturvedi@juscad.com",
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
      "Co-founding JusCAD with a focus on developing the physics-aware latent space, manufacturing and synthesis capabilities. Background in Computational Mechanics, Neural Networks and Machine Learning for engineering applications.",
    initials: "SK",
    photo: "/founders/shresht.jpeg",
    email: "shresth@juscad.com",
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
      "Traditional engineering tools execute commands but do not understand intent. JusCAD acts as a domain-aware orchestration layer that converts natural-language objectives into structured engineering workflows across CAD, simulation, optimization, and validation systems.",
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
      "Mechanical, aerospace, electronics, robotics, thermal systems, and beyond — our goal is to build a shared intelligence layer across engineering disciplines. If frontier AI models are becoming the productivity layer for knowledge work, JusCAD aims to become the intelligence layer for engineering workflows — accelerating design cycles from weeks to hours.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-[100dvh] pt-32 md:pt-40 pb-24 md:pb-32 bg-canvas">
      <div className="container-jc">
        <header className="mb-24 md:mb-32 max-w-[62rem]">
          <p className="eyebrow mb-8">
            <span>About</span>
          </p>
          <h1 className="type-hero text-fg mb-10">
            The intelligence layer for engineering.
          </h1>
          <p className="type-lead text-muted measure">
            We&rsquo;re building an AI-native engineering platform that
            fundamentally changes how complex physical systems are designed —
            and over time, evolves into a new class of foundation model for
            engineering itself.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 mb-24 md:mb-32 border-t border-line pt-12 md:pt-16">
          <div>
            <p className="eyebrow mb-6">
              <span>01</span>
              <span>The shift</span>
            </p>
            <h2 className="type-small text-fg max-w-[22ch]">
              From AI as autocomplete to AI as an engineering partner.
            </h2>
          </div>
          <div className="flex flex-col gap-6 measure">
            <p className="type-body text-muted">
              An engineer describes a system in natural language — a propulsion
              assembly, a structural bracket under load, a thermal management
              loop. The platform translates that intent into structured
              engineering artifacts, then orchestrates the workflow: generate
              geometry, apply constraints, run simulations, evaluate
              performance, and iterate.
            </p>
            <p className="type-body text-muted">
              Engineering is fundamentally reasoning under constraints —
              balancing strength against weight, performance against cost,
              efficiency against manufacturability. Most AI systems operate at
              the surface level of engineering. We aim to model the underlying
              structure and physics.
            </p>
            <p className="type-body text-fg/85">
              Rather than replacing existing engineering software, JusCAD
              integrates with CAD, simulation, and analysis workflows as an
              intelligence layer that understands both engineering language and
              physical behavior.
            </p>
          </div>
        </section>

        <section className="mb-24 md:mb-32 border-t border-line pt-12 md:pt-16">
          <p className="eyebrow mb-12">
            <span>02</span>
            <span>How we&rsquo;re different</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <article key={p.title} className="panel p-6 md:p-8 flex flex-col gap-4">
                <span className="type-tech text-muted">{p.index}</span>
                <h3 className="type-title text-fg">{p.title}</h3>
                <p className="type-body text-muted max-w-[52ch]">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-24 md:mb-32 border-t border-line pt-12 md:pt-16">
          <p className="eyebrow mb-12">
            <span>03</span>
            <span>Founders</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {FOUNDERS.map((f) => (
              <article key={f.name} className="flex flex-col">
                <div className="relative mb-6 w-56 h-56 md:w-64 md:h-64 panel overflow-hidden">
                  {f.photo ? (
                    <Image
                      src={f.photo}
                      alt={`Portrait of ${f.name}`}
                      fill
                      sizes="256px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center type-tech text-muted">
                      {f.initials}
                    </span>
                  )}
                </div>

                <h3 className="type-title text-fg">{f.name}</h3>
                <p className="type-tech text-muted mt-1 mb-4">{f.role}</p>
                <p className="type-body text-muted measure-narrow mb-6">
                  {f.background}
                </p>

                <dl className="flex flex-col gap-4 border-t border-line pt-5">
                  <div>
                    <dt className="type-tech text-muted mb-1">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${f.email}`}
                        className="text-base text-fg underline underline-offset-4 decoration-line hover:decoration-fg transition-colors duration-[180ms]"
                      >
                        {f.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="type-tech text-muted mb-1">Connect</dt>
                    <dd className="flex gap-5">
                      {f.socials.twitter && (
                        <a
                          href={f.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-muted hover:text-fg transition-colors duration-[180ms]"
                        >
                          Twitter
                        </a>
                      )}
                      {f.socials.linkedin && (
                        <a
                          href={f.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-muted hover:text-fg transition-colors duration-[180ms]"
                        >
                          LinkedIn
                        </a>
                      )}
                      {f.socials.github && (
                        <a
                          href={f.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-muted hover:text-fg transition-colors duration-[180ms]"
                        >
                          GitHub
                        </a>
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-24 md:mb-32 border-t border-line pt-12 md:pt-16">
          <p className="eyebrow mb-8">
            <span>04</span>
            <span>Long-term vision</span>
          </p>
          <h2 className="type-section text-fg mb-10 max-w-[20ch]">
            The Large Spatial Engineering Model.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[64rem]">
            <p className="type-body text-muted">
              Frontier models excel at language and code, but lack a deep
              understanding of space. Engineering is, at its core, a spatial
              discipline — wings, chips, heat exchangers, robots — geometry,
              topology, and constraints interacting in three dimensions.
            </p>
            <p className="type-body text-muted">
              LSEM unifies geometry, physics, and constraints in a single
              latent space. It enables reasoning across structure and physics
              simultaneously — not just generating designs, but iteratively
              refining them while explaining its reasoning. Engineering
              cognition at scale.
            </p>
          </div>
        </section>

        <section className="border-t border-line pt-12 md:pt-16">
          <p className="eyebrow mb-8">
            <span>05</span>
            <span>Mission</span>
          </p>
          <p className="type-small text-fg max-w-[40ch]">
            In the near term, we accelerate engineers. In the long term, we
            redefine engineering itself — the intelligence layer for the
            machines, systems, and infrastructure that define the real world.
          </p>
        </section>
      </div>
    </main>
  );
}
