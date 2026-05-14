"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AerospaceGeometry = dynamic(
  () => import("@/components/three/AerospaceGeometry"),
  { ssr: false, loading: () => <div className="w-full h-full bg-[var(--color-void)]" /> }
);

export default function ObjectFormationScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "#080C12" }}
    >
      {/* 3D canvas — full section background */}
      <div className="absolute inset-0">
        <AerospaceGeometry />
      </div>

      {/* Overlay gradients — always dark, keeps text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080C12]/92 via-[#080C12]/45 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-[#080C12]/35 pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] tracking-[0.25em] uppercase text-[#58A6FF]/60 mb-8"
          >
            Object Formation
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[#E6EDF3] font-light mb-10"
          >
            A physics-aware
            <br />
            latent space.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[#8B949E] leading-relaxed text-base max-w-[42ch]"
          >
            Most generative design produces plausible shapes without physical
            grounding. We represent geometry, constraints, materials, and
            governing equations as one interconnected entity — designs the
            system can reason about, not just sample from.
          </motion.p>
        </div>
      </div>

      {/* Corner coordinate labels — engineering aesthetic */}
      <div
        className="absolute bottom-10 right-8 font-[family-name:var(--font-geist-mono)] text-[9px] text-[var(--color-muted)]/25 tracking-widest hidden md:block"
        aria-hidden="true"
      >
        <div>X: 1.4032</div>
        <div>Y: 0.8017</div>
        <div>Z: 2.3841</div>
      </div>
    </section>
  );
}
