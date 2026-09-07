"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FLOATING_SYSTEMS = [
  { label: "CAD", sub: "Geometry", x: "18%", y: "30%", dx: -40, dy: -40 },
  { label: "Simulation", sub: "FEA / CFD", x: "68%", y: "20%", dx: 30, dy: -50 },
  { label: "Optimization", sub: "Topology / DOE", x: "58%", y: "66%", dx: 20, dy: 60 },
  { label: "Analysis", sub: "Stress / Thermal", x: "22%", y: "72%", dx: -40, dy: 60 },
  { label: "Scripting", sub: "Macros / APIs", x: "44%", y: "44%", dx: 10, dy: -60 },
  { label: "Docs", sub: "Standards / Specs", x: "74%", y: "50%", dx: 30, dy: 30 },
];

const EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

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
          ? { x: dx, y: dy, opacity: 0.45, scale: 0.96 }
          : { x: 0, y: 0, opacity: 0.9, scale: 1 }
      }
      transition={{ type: "spring", stiffness: 60, damping: 18 }}
      className="panel absolute flex flex-col px-4 py-3 min-w-[132px] whitespace-nowrap"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <span className="text-sm font-[550] text-fg">{label}</span>
      <span className="type-tech-sm text-muted mt-1">{sub}</span>
    </motion.div>
  );
}

export default function ProblemScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative lg:min-h-[100svh] flex items-center bg-canvas overflow-hidden border-t border-line"
    >
      {/* Fragmented tool panels — decorative, desktop only */}
      <div className="absolute inset-y-0 left-0 w-[42%] hidden lg:block" aria-hidden="true">
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
        {/* Broken connections */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          {[
            ["22%", "34%"],
            ["66%", "24%"],
            ["58%", "66%"],
            ["24%", "72%"],
          ].map(([x, y], i) => (
            <motion.line
              key={i}
              x1={x}
              y1={y}
              x2="46%"
              y2="48%"
              stroke="var(--draft-strong)"
              strokeWidth="1"
              strokeDasharray="4 6"
              animate={{ opacity: isInView ? 0.35 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div className="container-jc relative z-10 py-24 md:py-32">
        <div className="lg:ml-[50%] max-w-[36rem]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="eyebrow mb-8">
              <span>01</span>
              <span>The problem</span>
            </p>
            <h2 className="type-section text-fg mb-8">
              <span className="draft-line draft-line--quiet">
                Engineering software
                <i aria-hidden="true" />
              </span>
              <br />
              is <span className="text-muted">passive.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="type-lead text-muted measure"
          >
            CAD softwares — they execute instructions.
            <br />
            They do not understand intent.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
