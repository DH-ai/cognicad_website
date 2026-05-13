import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founders — CogniCAD",
  description: "The people building CogniCAD — a cognitive engineering system for the next era of physical product development.",
};

const FOUNDERS = [
  {
    name: "Arjun Mehta",
    role: "Chief Executive Officer & Co-founder",
    photo: "https://picsum.photos/seed/arjun-cognicad/600/700",
    location: "San Francisco, CA",
    background: [
      "Arjun spent 9 years at the intersection of robotics software and aerospace manufacturing. Before CogniCAD, he led product engineering at an autonomous systems company where he became increasingly frustrated with how disconnected the design-intent and tooling layers were.",
      "That frustration became an obsession. He started writing down what an engineering system that understood intent — rather than just executing commands — would actually look like. Three years later, that document became CogniCAD.",
      "He studied mechanical engineering at IIT Bombay and holds a master's from Stanford's MS&E program, where he focused on human-machine collaboration and decision systems.",
    ],
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
    ],
  },
  {
    name: "Leila Nakamura",
    role: "Chief Technology Officer & Co-founder",
    photo: "https://picsum.photos/seed/leila-cognicad/600/700",
    location: "San Francisco, CA",
    background: [
      "Leila is a researcher-turned-builder who spent the first decade of her career working on structured prediction systems and program synthesis at a major AI research lab. Her work focused on getting language models to produce structured, verifiable outputs — not just coherent prose.",
      "She joined Arjun when she realized the engineering design problem was the hardest and most consequential instance of the structured-output problem she had ever encountered. Geometry, physics, constraints, and manufacturing realities all need to compose into a single coherent artifact.",
      "Leila holds a PhD in computer science from Carnegie Mellon, with a dissertation on constraint-aware generative models for structured domains.",
    ],
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Scholar", href: "#" },
    ],
  },
];

export default function FoundersPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-20 md:mb-28">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Founders
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-8 max-w-3xl">
            The people behind the work.
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-[52ch]">
            CogniCAD was founded by two people who spent a combined two decades
            working at the boundary of engineering software and AI research —
            and grew tired of the gap between them.
          </p>
        </div>

        {/* Founders */}
        <div className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
          {FOUNDERS.map((founder, i) => (
            <div
              key={founder.name}
              className="py-16 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-16 items-start"
            >
              {/* Photo + basic info */}
              <div className="flex flex-col gap-6">
                <div className="relative overflow-hidden aspect-[6/7] max-w-[280px]">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 340px"
                  />
                  {/* Overlay for theme consistency */}
                  <div className="absolute inset-0 bg-[var(--color-void)]/10 mix-blend-multiply pointer-events-none" />
                </div>

                <div>
                  <h2 className="text-xl tracking-tight text-[var(--color-accent)] font-light mb-1">
                    {founder.name}
                  </h2>
                  <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-glow)]/60 mb-3">
                    {founder.role}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]/50 tracking-wider mb-5">
                    {founder.location}
                  </p>
                  <div className="flex gap-4">
                    {founder.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)]/50 hover:text-[var(--color-accent)] transition-colors duration-200 border-b border-[var(--color-muted)]/20 pb-px"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-6 md:pt-2">
                {founder.background.map((para, j) => (
                  <p
                    key={j}
                    className={`leading-relaxed max-w-[60ch] ${
                      j === 0
                        ? "text-base text-[var(--color-accent)]/85"
                        : "text-sm text-[var(--color-muted)]"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <div className="border-t border-[var(--color-border-subtle)] pt-16 mt-8">
          <p className="text-base text-[var(--color-muted)] leading-relaxed max-w-[55ch]">
            CogniCAD is backed by a small group of engineers and researchers who
            believe the next platform shift in physical product development is cognitive,
            not incremental.{" "}
            <Link
              href="/join-us"
              className="text-[var(--color-glow)] hover:opacity-80 transition-opacity"
            >
              We are building the team →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
