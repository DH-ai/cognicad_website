"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FLOATING_SYSTEMS = [
  { label: "CAD", sub: "Geometry Authoring", x: "12%", y: "30%", dx: -80, dy: -50 },
  { label: "Simulation", sub: "FEA / CFD", x: "75%", y: "20%", dx: 90, dy: -70 },
  { label: "Optimization", sub: "Topology / DOE", x: "60%", y: "65%", dx: 60, dy: 80 },
  { label: "Analysis", sub: "Stress / Thermal", x: "20%", y: "70%", dx: -70, dy: 90 },
  { label: "Scripting", sub: "Macros / APIs", x: "45%", y: "42%", dx: 30, dy: -100 },
  { label: "Docs", sub: "Standards / Specs", x: "85%", y: "55%", dx: 100, dy: 40 },
];

function SystemTag({
  label,
  sub,
  isFragmented,
  dx,
  dy,
}: {
  label: string;
  sub: string;
  isFragmented: boolean;
  dx: number;
  dy: number;
}) {
  return (
    <motion.div
      animate={
        isFragmented
          ? { x: dx, y: dy, opacity: 0.18, scale: 0.92 }
          : { x: 0, y: 0, opacity: 0.7, scale: 1 }
      }
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 18,
        duration: 1.2,
      }}
      className="absolute flex flex-col border border-[var(--color-accent)]/12 bg-[var(--color-graphite)]/80 backdrop-blur-sm px-4 py-3"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <span className="text-xs tracking-[0.12em] text-[var(--color-accent)]/80 uppercase">
        {label}
      </span>
      <span className="text-[10px] text-[var(--color-muted)]/60 mt-0.5">{sub}</span>
    </motion.div>
  );
}

export default function ProblemScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center bg-transparent overflow-hidden"
    >
      {/* Subtle vignette — theme-aware */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)]/40 via-transparent to-[var(--color-void)]/40 pointer-events-none" />

      {/* Floating system tags — positioned absolutely */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        {FLOATING_SYSTEMS.map((sys) => (
          <div
            key={sys.label}
            className="absolute"
            style={{ left: sys.x, top: sys.y }}
          >
            <SystemTag
              label={sys.label}
              sub={sys.sub}
              isFragmented={isInView}
              dx={sys.dx}
              dy={sys.dy}
            />
          </div>
        ))}
      </div>

      {/* Broken connection lines — SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <motion.line
          x1="20%" y1="35%" x2="50%" y2="47%"
          stroke="var(--color-accent)" strokeWidth="0.5"
          strokeDasharray="4 6"
          animate={{ opacity: isInView ? 0.06 : 0.18 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.line
          x1="73%" y1="23%" x2="50%" y2="47%"
          stroke="var(--color-accent)" strokeWidth="0.5"
          strokeDasharray="4 6"
          animate={{ opacity: isInView ? 0.06 : 0.18 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.line
          x1="60%" y1="67%" x2="50%" y2="47%"
          stroke="var(--color-accent)" strokeWidth="0.5"
          strokeDasharray="4 6"
          animate={{ opacity: isInView ? 0.06 : 0.18 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.line
          x1="22%" y1="72%" x2="50%" y2="47%"
          stroke="var(--color-accent)" strokeWidth="0.5"
          strokeDasharray="4 6"
          animate={{ opacity: isInView ? 0.06 : 0.18 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </svg>

      {/* Text content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl md:ml-auto md:mr-0">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
              The Problem
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-10">
              Engineering software
              <br />
              is{" "}
              <span className="text-[var(--color-muted)]">passive.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="text-xl md:text-2xl text-[var(--color-muted)] font-light leading-relaxed max-w-[52ch]">
              CAD, simulation, control, VLSI — they execute instructions.
              <br />
              They do not understand intent.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
