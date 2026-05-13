"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const RESEARCH_ITEMS = [
  {
    category: "Paper",
    title: "Towards Neural-Symbolic CAD Kernels",
    description:
      "Exploring hybrid architectures where learned geometric reasoning operates alongside deterministic parametric solvers.",
    tag: "Geometric Intelligence",
    href: "/blog",
  },
  {
    category: "Essay",
    title: "Why Engineers Need Cognitive Partners, Not Just AI Tools",
    description:
      "The distinction between a tool that executes and a system that understands is the defining problem of this decade.",
    tag: "Engineering Philosophy",
    href: "/blog",
  },
  {
    category: "Experiment",
    title: "Training Language Models on Parametric Design Sequences",
    description:
      "Can a transformer learn the grammar of parametric modeling? Early results from sequence-prediction on CAD history trees.",
    tag: "ML Research",
    href: "/blog",
  },
  {
    category: "Build Log",
    title: "Week 14 — CAD Kernel Integration",
    description:
      "Notes on integrating a custom BREP kernel with multi-modal input routing. Geometry as a first-class token type.",
    tag: "Engineering Log",
    href: "/blog",
  },
];

function ResearchCard({
  item,
  index,
}: {
  item: (typeof RESEARCH_ITEMS)[0];
  index: number;
}) {
  return (
    <Link href={item.href} className="block group flex-shrink-0 w-[85vw] md:w-[420px] lg:w-[460px]">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="h-full border border-[var(--color-border-light)] p-8 bg-[var(--color-surface)] hover:border-[var(--color-glow)]/35 hover:bg-[var(--color-graphite)] transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-glow)]/70">
            {item.category}
          </span>
          <ArrowUpRight
            size={14}
            weight="light"
            className="text-[var(--color-muted)]/30 group-hover:text-[var(--color-muted)]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </div>

        <h3 className="text-xl tracking-tight leading-snug text-[var(--color-accent)] font-light mb-5 group-hover:text-white transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed mb-10">
          {item.description}
        </p>

        <div className="mt-auto pt-6 border-t border-[var(--color-border-subtle)]">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)]/40">
            {item.tag}
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export default function ResearchCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    // Horizontal scroll driven by vertical scroll — desktop only
    if (window.innerWidth < 768) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    async function setup() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!trackRef.current) return;

      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".research-panel");

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () =>
              "+=" + (trackRef.current?.scrollWidth ?? 0 - window.innerWidth),
            invalidateOnRefresh: true,
          },
        });
      });
    }

    setup();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-void)] overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24 pt-28 pb-16 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-5"
            >
              Research
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl tracking-tighter leading-[0.95] text-[var(--color-accent)] font-light"
            >
              Building in public.
              <br />
              <span className="text-[var(--color-muted)]">Thinking out loud.</span>
            </motion.h2>
          </div>
          <Link
            href="/blog"
            className="text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors border-b border-[var(--color-muted)]/30 pb-0.5 self-end"
          >
            All Posts
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex md:flex-nowrap flex-wrap gap-5 px-6 md:px-16 lg:px-24 pb-24"
      >
        {RESEARCH_ITEMS.map((item, i) => (
          <div key={item.title} className="research-panel w-full md:w-auto">
            <ResearchCard item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
