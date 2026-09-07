"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const NODES = [
  { id: "center", label: "JusCAD", x: 50, y: 48, r: 8, isCenter: true },
  { id: "cad", label: "CAD kernel", x: 24, y: 28, r: 5 },
  { id: "reasoning", label: "Reasoning", x: 52, y: 16, r: 5 },
  { id: "sim", label: "Simulation", x: 76, y: 30, r: 5 },
  { id: "optim", label: "Optimization", x: 28, y: 68, r: 5 },
  { id: "analysis", label: "Analysis", x: 78, y: 67, r: 5 },
  { id: "dfm", label: "DFM", x: 55, y: 80, r: 5 },
];

const EDGES = [
  ["center", "cad"],
  ["center", "reasoning"],
  ["center", "sim"],
  ["center", "dfm"],
  ["center", "optim"],
  ["cad", "optim"],
  ["analysis", "dfm"],
  ["dfm", "optim"],
  ["center", "analysis"],
  ["reasoning", "cad"],
  ["reasoning", "sim"],
  ["sim", "analysis"],
];

const EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];
const EASE_CSS = "cubic-bezier(0.25, 1, 0.5, 1)";

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function CognitionGraph({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ overflow: "visible" }}
      role="img"
      aria-label="Diagram: JusCAD at the centre, connected to CAD kernel, reasoning, simulation, optimization, analysis and DFM agents."
    >
      {EDGES.map(([a, b], i) => {
        const na = getNode(a);
        const nb = getNode(b);
        const len = Math.sqrt((nb.x - na.x) ** 2 + (nb.y - na.y) ** 2);
        const primary = a === "center" || b === "center";
        return (
          <line
            key={`${a}-${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke={primary ? "var(--accent)" : "var(--draft-strong)"}
            strokeWidth={primary ? 0.3 : 0.2}
            strokeDasharray={primary ? undefined : "0.8 0.8"}
            style={{
              strokeDasharray: primary ? len : undefined,
              strokeDashoffset: primary ? (visible ? 0 : len) : undefined,
              opacity: visible ? 1 : 0,
              transition: `stroke-dashoffset 0.8s ${EASE_CSS} ${0.3 + i * 0.06}s, opacity 0.4s ease ${0.3 + i * 0.06}s`,
            }}
          />
        );
      })}

      {NODES.filter((n) => n.id !== "center").map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="0.4"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={1.4}
            fill="var(--fg)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          />
          <motion.text
            x={node.x + (node.x > 50 ? 6.5 : -6.5)}
            y={node.y + 1.1}
            fontSize="3.2"
            fill="var(--fg-muted)"
            textAnchor={node.x > 50 ? "start" : "end"}
            fontFamily="var(--font-mono)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}

      {/* Centre node */}
      <motion.circle
        cx={50}
        cy={48}
        r={9}
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth="0.5"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        style={{ transformOrigin: "50px 48px" }}
      />
      <motion.circle
        cx={50}
        cy={48}
        r={2.6}
        fill="var(--fg)"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      <motion.text
        x={50}
        y={61.5}
        fontSize="3.4"
        fill="var(--fg)"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="550"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        JusCAD
      </motion.text>

      {/* Single settle ring on reveal — a meaningful moment, not a perpetual pulse */}
      {visible && (
        <motion.circle
          cx={50}
          cy={48}
          r={9}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.3"
          initial={{ r: 9, opacity: 0.6 }}
          animate={{ r: 15, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
        />
      )}
    </svg>
  );
}

export default function CognitionScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center bg-canvas overflow-hidden border-t border-line"
    >
      <div className="container-jc py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
          <div className="max-w-[36rem]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow mb-8"
            >
              <span>02</span>
              <span>Towards cognition</span>
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="type-section text-fg mb-8"
            >
              A system that will reason across{" "}
              <span className="text-blue">geometry and physics.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <p className="type-lead text-muted measure-narrow">
                Not autocomplete for commands.
                <br />
                Not a chatbot bolted onto a toolbar.
              </p>
              <p className="type-body text-fg/85 measure">
                Domain-specific agents for geometry, simulation, optimization,
                and validation coordinated by a context-aware orchestrator
                across iterative design cycles.
              </p>
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="panel drawing-grid relative w-full max-w-[560px] lg:max-w-none mx-auto p-6 md:p-10"
          >
            <figcaption className="type-tech text-muted flex items-center justify-between mb-4">
              <span>Fig. 02</span>
              <span>Orchestration graph</span>
            </figcaption>
            <div className="aspect-square w-full">
              <CognitionGraph visible={isInView} />
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
