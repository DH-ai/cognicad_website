"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SponsorTicker from "@/components/home/SponsorTicker";
import { Button } from "@/components/ui/button";

const PATH_COUNT = 36;

// Build one fanned-out contour line. `position` (1 or -1) mirrors the set;
// each index `i` offsets the line horizontally and vertically so the paths layer.
function buildPath(i: number, position: number) {
  const dx = i * 5 * position; // horizontal spread between successive lines
  const dy = i * 6; // vertical spread between successive lines

  return [
    `M-${380 - dx} -${189 + dy}`,
    `C-${380 - dx} -${189 + dy} -${312 - dx} ${216 - dy} ${152 - dx} ${343 - dy}`,
    `C${616 - dx} ${470 - dy} ${684 - dx} ${875 - dy} ${684 - dx} ${875 - dy}`,
  ].join(" ");
}

function FloatingPaths({ position }: { position: number }) {
  const prefersReducedMotion = useReducedMotion();

  const paths = useMemo(
    () =>
      Array.from({ length: PATH_COUNT }, (_, i) => ({
        id: i,
        d: buildPath(i, position),
        width: 0.5 + i * 0.03,
        // Clamp to the valid 0–1 range; deterministic so SSR and client agree.
        opacity: Math.min(0.1 + i * 0.03, 1),
        duration: 20 + (i % 10), // deterministic — avoids hydration mismatch
      })),
    [position],
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-[var(--color-accent)]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              prefersReducedMotion
                ? { pathLength: 1, opacity: 0.5 }
                : {
                    pathLength: 1,
                    opacity: [0.3, 0.6, 0.3],
                    pathOffset: [0, 1, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: path.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  ctaLabel = "Join the Beta",
  ctaHref = "/beta",
  subtitle,
  subtitle2,
  sponsors,
}: {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  subtitle?: string;
  subtitle2?: string;
  sponsors?: any[];
}) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0 text-[var(--color-accent)] opacity-60">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] mb-10 leading-[0.9]">
            {words.map((word, wordIndex) => {
              const letters = word.split("");
              return (
                <span
                  key={wordIndex}
                  className="inline-block mr-2 last:mr-0"
                >
                  {letters.map((letter, letterIndex) => {
                    const isAccentLetter = letter === "C" && letterIndex === 5;
                    return (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay:
                            wordIndex * 0.1 +
                            letterIndex * 0.05,
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                        }}
                        className={`inline-block ${isAccentLetter ? "text-[var(--color-glow)]" : "text-[var(--color-accent)]"}`}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed tracking-tight"
            >
              {subtitle} 
            </motion.p>
            
          )}
           {subtitle2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed tracking-tight"
            >
              {subtitle2} 
            </motion.p>
            
          )}

          {sponsors && sponsors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.9 }}
            >
              <SponsorTicker sponsors={sponsors} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block group relative bg-gradient-to-b from-[var(--color-accent)]/10 to-[var(--color-accent)]/0 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={ctaHref}>
              <Button
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-[11px] tracking-[0.2em] uppercase font-medium backdrop-blur-md bg-[var(--color-void)]/85 hover:bg-[var(--color-void)] text-[var(--color-accent)] transition-all duration-300 group-hover:-translate-y-0.5 border border-[var(--color-accent)]/15 hover:border-[var(--color-accent)]/35 cursor-pointer"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  {ctaLabel}
                </span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
