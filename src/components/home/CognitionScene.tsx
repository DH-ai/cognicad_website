"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const NODES = [
  { id: "center", label: "CogniCAD", x: 50, y: 48, r: 8, isCenter: true },
  { id: "cad", label: "CAD Kernel", x: 18, y: 28, r: 5 },
  { id: "reasoning", label: "Reasoning", x: 52, y: 14, r: 5 },
  { id: "sim", label: "Simulation", x: 82, y: 30, r: 5 },
  { id: "knowledge", label: "Knowledge", x: 14, y: 68, r: 5 },
  { id: "optim", label: "Optimization", x: 50, y: 80, r: 5 },
  { id: "analysis", label: "Analysis", x: 84, y: 66, r: 5 },
  { id: "interface", label: "Interface", x: 50, y: 48, r: 3 },
];

const EDGES = [
  ["center", "cad"],
  ["center", "reasoning"],
  ["center", "sim"],
  ["center", "knowledge"],
  ["center", "optim"],
  ["center", "analysis"],
  ["reasoning", "cad"],
  ["reasoning", "sim"],
  ["sim", "analysis"],
  ["knowledge", "optim"],
  ["cad", "knowledge"],
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function CognitionGraph({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = getNode(a);
        const nb = getNode(b);
        const len = Math.sqrt((nb.x - na.x) ** 2 + (nb.y - na.y) ** 2);
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke={a === "center" || b === "center" ? "var(--color-glow)" : "var(--color-muted)"}
            strokeWidth={a === "center" || b === "center" ? 0.25 : 0.15}
            strokeDasharray={len}
            strokeDashoffset={visible ? 0 : len}
            opacity={a === "center" || b === "center" ? 0.7 : 0.35}
            style={{ transition: `stroke-dashoffset 1s ease ${0.4 + i * 0.08}s` }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.filter((n) => n.id !== "center").map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="none"
            stroke="var(--color-glow)"
            strokeWidth="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={visible ? { opacity: 0.85, scale: 1 } : {}}
            transition={{
              delay: 0.3 + i * 0.12,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r * 0.4}
            fill="var(--color-glow)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 0.8 } : {}}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
          />
          <motion.text
            x={node.x + (node.x > 50 ? 7 : -7)}
            y={node.y + 1}
            fontSize="3.5"
            fill="var(--color-muted)"
            textAnchor={node.x > 50 ? "start" : "end"}
            fontFamily="var(--font-geist-sans)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 0.7 } : {}}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}

      {/* Center node — CogniCAD */}
      <motion.circle
        cx={50}
        cy={48}
        r={9}
        fill="none"
        stroke="#5DA9FF"
        strokeWidth="0.5"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={visible ? { scale: [0, 1.2, 1] } : {}}
        transition={{ delay: 0.1, duration: 0.8, ease: "backOut" }}
      />
      <motion.circle
        cx={50}
        cy={48}
        r={5}
        fill="#5DA9FF"
        opacity="0.12"
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.circle
        cx={50}
        cy={48}
        r={2.5}
        fill="#5DA9FF"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: [0, 1, 0.7] } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
      <motion.text
        x={50}
        y={60}
        fontSize="3.5"
        fill="var(--color-accent)"
        textAnchor="middle"
        fontFamily="var(--font-geist-sans)"
        letterSpacing="0.5"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 0.9 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        CogniCAD
      </motion.text>

      {/* Pulse ring */}
      {visible && (
        <motion.circle
          cx={50}
          cy={48}
          r={9}
          fill="none"
          stroke="#5DA9FF"
          strokeWidth="0.3"
          animate={{ r: [9, 16], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
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
      className="relative min-h-[100dvh] flex items-center bg-transparent overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">
          {/* Text — left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8"
            >
              Towards Cognition
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.94] text-[var(--color-accent)] font-light mb-10"
            >
              An orchestrator that reasons across
              <span className="text-[var(--color-glow)]"> geometry and physics.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-lg text-[var(--color-muted)] font-light leading-relaxed max-w-[44ch]">
                Not autocomplete for commands.
                <br />
                Not a chatbot bolted onto a toolbar.
              </p>
              <p className="text-lg text-[var(--color-accent)]/70 font-light leading-relaxed mt-4 max-w-[44ch]">
                Domain-aware agents — geometry, simulation, optimization,
                validation — coordinated by an orchestrator that holds context
                across every iteration.
              </p>
            </motion.div>
          </div>

          {/* Graph — right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="aspect-square max-w-[480px] md:max-w-none w-full"
          >
            <CognitionGraph visible={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
