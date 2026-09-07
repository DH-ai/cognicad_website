"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { GeometryPalette } from "@/components/three/AerospaceGeometry";

const AerospaceGeometry = dynamic(
  () => import("@/components/three/AerospaceGeometry"),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

const DAY_PALETTE: GeometryPalette = {
  core: "#101619",
  ringPrimary: "#6590B6",
  ringSecondary: "#34473F",
  ringTertiary: "#AFC4BA",
  node: "#245CF5",
  grid: "#CCD4CD",
};

const NIGHT_PALETTE: GeometryPalette = {
  core: "#E9EFEC",
  ringPrimary: "#7FA9D1",
  ringSecondary: "#839A91",
  ringTertiary: "#3A4A47",
  node: "#6E9DFF",
  grid: "#2A3735",
};

export default function ObjectFormationScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });
  const { theme } = useTheme();

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-canvas border-t border-line"
    >
      <div className="container-jc py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
          <div className="max-w-[34rem]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow mb-8"
            >
              <span>03</span>
              <span>Object formation</span>
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="type-section text-fg mb-8"
            >
              A physics-aware
              <br />
              latent space.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="type-body text-muted measure"
            >
              Most generative design produces plausible shapes without physical
              grounding. We want to represent geometry, constraints, materials,
              and governing equations as one interconnected entity — designs
              that can be sampled, optimized, and reasoned about with equal
              fidelity.
            </motion.p>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="panel relative w-full overflow-hidden"
          >
            <figcaption className="type-tech text-muted flex items-center justify-between px-5 md:px-6 pt-5">
              <span>Fig. 03</span>
              <span>Latent geometry</span>
            </figcaption>
            <div className="relative aspect-[4/3] w-full">
              {isInView && (
                <div className="absolute inset-0">
                  <AerospaceGeometry
                    palette={theme === "night" ? NIGHT_PALETTE : DAY_PALETTE}
                  />
                </div>
              )}
            </div>
            <div
              className="type-tech-sm text-muted flex items-center gap-6 px-5 md:px-6 pb-5 border-t border-line pt-4"
              aria-hidden="true"
            >
              <span>X 1.4032</span>
              <span>Y 0.8017</span>
              <span>Z 2.3841</span>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
