"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
      delayChildren: 0.05,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

/** Drafted zero: an outlined figure with its construction centre lines. */
function DraftedZero() {
  return (
    <svg
      viewBox="0 0 120 160"
      className="w-[72px] h-[96px] md:w-[104px] md:h-[140px]"
      aria-hidden="true"
      fill="none"
    >
      <line x1="60" y1="0" x2="60" y2="160" stroke="var(--draft)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="80" x2="120" y2="80" stroke="var(--draft)" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="18" y="12" width="84" height="136" rx="42" stroke="var(--fg)" strokeWidth="6" />
      <circle cx="60" cy="80" r="3" fill="var(--accent)" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center bg-canvas px-5 pt-24 pb-16">
      <motion.div
        className="text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="type-tech text-muted mb-8">
          Error 404 — sheet not found
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 md:gap-6 mb-10 text-fg"
        >
          <span className="type-hero select-none">4</span>
          <DraftedZero />
          <span className="type-hero select-none">4</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="type-small text-fg mb-4">
          This page is not on the drawing.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="type-body text-muted measure-narrow mb-10"
        >
          The page you are looking for may have moved or never existed.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/about" className="btn btn-secondary">
            About JusCAD
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
