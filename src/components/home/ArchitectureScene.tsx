"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Simplified, publicly-visible architecture — proprietary details omitted
const ARCH_STAGES = [
  {
    id: "input",
    section: "INPUT",
    label: "USER INPUT",
    sublabel: "MULTI-MODAL INPUT LAYER",
    items: ["Natural Language", "Sketch / Drawing", "CAD File Upload", "Image + Voice"],
    color: "var(--color-glow)",
    proprietary: false,
  },
  {
    id: "understanding",
    section: "UNDERSTANDING",
    label: "INTENT PARSER",
    sublabel: "SEMANTIC REQUIREMENT ENGINE",
    items: ["Design intent extraction", "Constraint identification", "Goal graph construction"],
    color: "var(--color-accent)",
    proprietary: false,
  },
  {
    id: "intelligence",
    section: "INTELLIGENCE CORE",
    label: "COGNITIVE ENGINE",
    sublabel: "[ PROPRIETARY ]",
    items: ["Domain context reasoning", "Knowledge graph retrieval", "Constraint compilation", "Engineering memory"],
    color: "var(--color-muted)",
    proprietary: true,
  },
  {
    id: "planning",
    section: "PLANNING",
    label: "HIERARCHICAL PLANNING LAYER",
    sublabel: "TASK DECOMPOSITION ENGINE",
    items: ["Search + optimization orchestration", "Parallel candidate generation", "Beam / evolutionary / Bayesian search"],
    color: "var(--color-accent)",
    proprietary: false,
  },
  {
    id: "geometry",
    section: "GEOMETRY",
    label: "GEOMETRY ENGINE",
    sublabel: "CAD KERNEL + PARAMETRIC MODELER",
    items: ["BREP / Mesh / Point Cloud", "Parametric tree", "Assembly graph", "Design versioning"],
    color: "var(--color-accent)",
    proprietary: false,
  },
  {
    id: "physics",
    section: "PHYSICS & MFG",
    label: "MULTI-PHYSICS STACK",
    sublabel: "SIMULATION + MANUFACTURING INTELLIGENCE",
    items: ["Neural structural / thermal / CFD solver", "FEA + CFD validation", "DFM + manufacturability engine", "Material + cost + compliance engine"],
    color: "var(--color-accent)",
    proprietary: false,
  },
  {
    id: "validation",
    section: "VALIDATION",
    label: "SELF-REFLECTION + CRITIC LAYER",
    sublabel: "ITERATIVE DESIGN LOOP",
    items: ["Engineering critic model", "Pareto frontier analysis", "Constraint satisfaction verification", "RL + evolutionary improvement policy"],
    color: "var(--color-accent)",
    proprietary: false,
  },
  {
    id: "output",
    section: "OUTPUT",
    label: "OUTPUT LAYER",
    sublabel: "FINAL DELIVERABLES",
    items: ["Final CAD model", "Simulation reports", "Manufacturing plan + BOM", "Compliance + safety documentation", "Digital twin export"],
    color: "var(--color-glow)",
    proprietary: false,
  },
];

function ArchStage({
  stage,
  index,
}: {
  stage: (typeof ARCH_STAGES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.05,
      }}
      className="relative"
    >
      {/* Flow connector — vertical line above (except first) */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-[19px] -top-8 w-px h-8 bg-[var(--color-border-light)]"
          style={{ transformOrigin: "top" }}
        />
      )}

      <div className={`flex gap-5 ${stage.proprietary ? "opacity-60" : ""}`}>
        {/* Node */}
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            animate={inView ? {
              boxShadow: [
                `0 0 0 0 rgba(88,166,255,0)`,
                `0 0 0 4px rgba(88,166,255,0.15)`,
                `0 0 0 0 rgba(88,166,255,0)`,
              ],
            } : {}}
            transition={{ delay: 0.4, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
            style={{
              borderColor: stage.proprietary
                ? "var(--color-muted)"
                : "var(--color-glow)",
              background: stage.proprietary
                ? "transparent"
                : "rgba(88,166,255,0.06)",
            }}
          >
            <span className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-wider"
              style={{ color: stage.proprietary ? "var(--color-muted)" : "var(--color-glow)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div
          className={`flex-1 mb-8 pb-8 border-b border-[var(--color-border-subtle)] ${
            stage.proprietary
              ? "glass rounded-none p-6 mb-10"
              : ""
          }`}
        >
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "var(--color-glow)", opacity: 0.55 }}>
              {stage.section}
            </span>
            {stage.proprietary && (
              <span className="text-[9px] tracking-[0.15em] uppercase border px-1.5 py-0.5"
                style={{ borderColor: "var(--color-muted)", color: "var(--color-muted)", opacity: 0.5 }}>
                Proprietary
              </span>
            )}
          </div>

          <h3 className="text-base md:text-lg tracking-tight font-light mb-0.5"
            style={{ color: stage.proprietary ? "var(--color-muted)" : "var(--color-accent)" }}>
            {stage.label}
          </h3>

          <p className="text-[10px] tracking-[0.12em] uppercase mb-4"
            style={{ color: stage.proprietary ? "var(--color-muted)" : "var(--color-glow)", opacity: 0.55 }}>
            {stage.sublabel}
          </p>

          {/* Sub-items */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
              hidden: {},
            }}
            className="flex flex-wrap gap-2"
          >
            {stage.items.map((item) => (
              <motion.span
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: {
                    opacity: stage.proprietary ? 0.4 : 0.6,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
                className="text-[10px] tracking-[0.08em] border px-2 py-1"
                style={{
                  borderColor: "var(--color-border-subtle)",
                  color: "var(--color-muted)",
                  background: stage.proprietary ? "transparent" : "var(--color-graphite)",
                }}
              >
                {stage.proprietary ? "■ ■ ■ ■ ■" : item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArchitectureScene() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      className="relative bg-[var(--color-void)] overflow-hidden py-28"
    >
      {/* Subtle left glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left, rgba(88,166,255,0.04) 0%, transparent 70%)" }}
        aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
              System Architecture
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tighter leading-[0.95] text-[var(--color-accent)] font-light mb-6">
              How CogniCAD
              <br />
              thinks.
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed text-sm max-w-[38ch]">
              A simplified view of the cognitive stack. Proprietary layers are
              omitted. The architecture runs as an end-to-end differentiable system —
              from intent to manufacturable geometry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="flex items-start"
          >
            <div className="glass px-6 py-5 text-sm text-[var(--color-muted)] leading-relaxed max-w-[42ch]">
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-glow)]/60 mb-3">
                Note
              </span>
              This diagram shows the public architecture. The full system includes
              additional proprietary reasoning layers, training infrastructure,
              and real-time validation pipelines not disclosed here.
            </div>
          </motion.div>
        </div>

        {/* Architecture flow */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16">
          <div /> {/* spacer to match header grid */}
          <div className="pt-4">
            {ARCH_STAGES.map((stage, i) => (
              <ArchStage key={stage.id} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
