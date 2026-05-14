"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

function ParticleField() {
  const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
    x: `${3 + (i * 2.4) % 94}%`,
    y: `${5 + (i * 3.1 + 7) % 88}%`,
    size: 1 + (i % 3) * 0.5,
    delay: (i * 0.18) % 4,
    duration: 3 + (i % 4),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--color-muted)]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            animation: `equation-drift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0.07,
          }}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function FinalStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.05, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center bg-transparent overflow-hidden"
    >
      <ParticleField />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(93,169,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.p
            variants={wordVariants}
            className="text-lg md:text-xl text-[var(--color-muted)] font-light leading-relaxed mb-3 max-w-[52ch] mx-auto"
          >
            The next generation of engineering software
            will not be defined by menus and commands.
          </motion.p>
          <motion.p
            variants={wordVariants}
            className="text-lg md:text-xl text-[var(--color-accent)]/80 font-light leading-relaxed max-w-[36ch] mx-auto"
          >
            It will be defined by cognition.
          </motion.p>
        </motion.div>

        {/* CogniCAD — script font, the payoff */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[3.5rem] md:text-[6rem] lg:text-[8.5rem] text-[var(--color-accent)] leading-none select-none">
            Cogni<span className="text-[var(--color-glow)]">C</span>AD
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          <Link href="/beta">
            <button className="px-8 py-3.5 border border-[var(--color-accent)]/25 text-[var(--color-accent)]/70 text-[11px] tracking-[0.18em] uppercase hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)] active:-translate-y-px transition-all duration-200 cursor-pointer">
              Join Beta
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-3.5 text-[var(--color-muted)]/60 text-[11px] tracking-[0.18em] uppercase hover:text-[var(--color-accent)] active:-translate-y-px transition-all duration-200 cursor-pointer">
              Read the Thesis
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
