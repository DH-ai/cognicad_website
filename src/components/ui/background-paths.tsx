"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

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
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
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
}: {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  subtitle?: string;
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
