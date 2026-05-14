"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";

/**
 * Site-wide animated background — beams behind a frosted-glass layer.
 * - On `/` (home): glass blur ramps with scroll (2px → 28px across one viewport).
 * - On every other page: constant heavy blur (~48px) so the beams read as
 *   ambient color shimmer, not discrete streaks.
 *
 * Fixed-position, pointer-events: none, z-index 0. Everything in the page
 * that needs to sit on top must be `position: relative` with z-index ≥ 1.
 */
export default function AccentBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [vh, setVh] = useState(800);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollY } = useScroll();

  // Always declare both motion values so hook order is stable across routes.
  const scrollBlur = useTransform(scrollY, [0, vh], [2, 28], { clamp: true });
  const scrollTint = useTransform(scrollY, [0, vh], [5, 25], { clamp: true });
  const constantBlur = useMotionValue(48);
  const constantTint = useMotionValue(30);

  const blurPx = isHome ? scrollBlur : constantBlur;
  const tintPercent = isHome ? scrollTint : constantTint;

  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(150%)`;
  const tintBg = useMotionTemplate`color-mix(in srgb, var(--color-void) ${tintPercent}%, transparent)`;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <BeamsBackground intensity="strong" />
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          background: tintBg,
        }}
      />
    </div>
  );
}
