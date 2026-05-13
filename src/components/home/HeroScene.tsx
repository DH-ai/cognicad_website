"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EQUATIONS = [
  { text: "∇²ψ = k²ψ", x: "8%", y: "15%", size: 11 },
  { text: "σᵢⱼ = Cᵢⱼₖₗ·εₖₗ", x: "72%", y: "22%", size: 10 },
  { text: "F = -∇V(r)", x: "18%", y: "78%", size: 12 },
  { text: "Re = ρvL/μ", x: "82%", y: "68%", size: 10 },
  { text: "∮ B·dA = 0", x: "60%", y: "12%", size: 11 },
  { text: "∂²u/∂t² = α∇²u", x: "88%", y: "48%", size: 9 },
  { text: "τ = r × F", x: "5%", y: "48%", size: 10 },
  { text: "M = EI·κ", x: "45%", y: "85%", size: 11 },
  { text: "ε = σ/E", x: "30%", y: "8%", size: 10 },
  { text: "Δp = ρg·h", x: "66%", y: "88%", size: 12 },
  { text: "L = ½mv² - V", x: "12%", y: "35%", size: 9 },
  { text: "∇·σ + f = 0", x: "92%", y: "30%", size: 10 },
];

function EngineeringGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="small-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--color-glow)"
            strokeWidth="0.3"
          />
        </pattern>
        <pattern
          id="grid"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <rect width="200" height="200" fill="url(#small-grid)" />
          <path
            d="M 200 0 L 0 0 0 200"
            fill="none"
            stroke="var(--color-glow)"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" opacity="0.055" />
      {/* Accent lines — horizontal and vertical to suggest precision */}
      <line
        x1="0"
        y1="35%"
        x2="100%"
        y2="35%"
        stroke="#5DA9FF"
        strokeWidth="0.4"
        opacity="0.04"
      />
      <line
        x1="30%"
        y1="0"
        x2="30%"
        y2="100%"
        stroke="#5DA9FF"
        strokeWidth="0.4"
        opacity="0.04"
      />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function HeroScene() {
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    async function setup() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Second text appears on light scroll
        gsap.fromTo(
          text2Ref.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#hero-section",
              start: "top top",
              end: "20% top",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    setup();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] flex items-center bg-[var(--color-void)] overflow-hidden"
    >
      {/* Subtle background photo — industrial/engineering */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://picsum.photos/seed/cognicad-hero-bg/1920/1080"
          alt=""
          fill
          className="object-cover opacity-[0.055] saturate-0"
          priority
          sizes="100vw"
        />
        {/* Fade out toward bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-void)]" />
      </div>

      <EngineeringGrid />

      {/* Scattered equations */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {EQUATIONS.map((eq, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.18, duration: 1.5 }}
            className="absolute font-[family-name:var(--font-geist-mono)] text-[var(--color-glow)]"
            style={{
              left: eq.x,
              top: eq.y,
              fontSize: eq.size,
              animation: `equation-drift ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {eq.text}
          </motion.span>
        ))}
      </div>

      {/* Main content — left aligned, asymmetric */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24 pt-24">
        <div className="max-w-4xl">
          {/* Text block 1 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 md:mb-10"
          >
            <motion.h1
              variants={lineVariants}
              className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] text-[var(--color-accent)] font-light"
            >
              Engineering software
            </motion.h1>
            <motion.h1
              variants={lineVariants}
              className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] text-[var(--color-accent)] font-light"
            >
              was built for{" "}
              <span className="text-[var(--color-muted)]">tools.</span>
            </motion.h1>
          </motion.div>

          {/* Text block 2 — appears on first scroll */}
          <div ref={text2Ref} className="opacity-0 mb-14 md:mb-16">
            <p className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-[var(--color-glow)]/75 font-light">
              We are building it
              <br />
              for <em className="not-italic font-light text-[var(--color-glow)]">thought.</em>
            </p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/beta">
              <button className="px-8 py-3.5 bg-[var(--color-accent)] text-[var(--color-void)] text-[11px] tracking-[0.18em] uppercase font-medium hover:opacity-90 active:-translate-y-px transition-all duration-200 cursor-pointer">
                Join Beta
              </button>
            </Link>
            <Link href="/progress">
              <button className="px-8 py-3.5 border border-[var(--color-accent)]/20 text-[var(--color-accent)]/60 text-[11px] tracking-[0.18em] uppercase hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]/90 active:-translate-y-px transition-all duration-200 cursor-pointer">
                View Progress
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.35em] text-[var(--color-muted)]/40 uppercase">
          Scroll
        </span>
        <div className="w-px h-14 overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-b from-[var(--color-muted)]/30 to-transparent"
            style={{ animation: "scroll-line 2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
