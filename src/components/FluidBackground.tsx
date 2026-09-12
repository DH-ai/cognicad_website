"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Theme-aware cinematic background. Its browser-only renderer is imported
 * after mount, keeping WebGL and window access out of the server bundle.
 */
export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const prefersDataSaving = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection?.saveData === true;
    // The canvas remains mounted for the first themed paint, but rendering
    // waits for the provider state so its shader palette matches the document.
    if (!canvas || prefersReducedMotion || prefersDataSaving) return;

    let active = true;
    let destroy = () => {};

    void (async () => {
      try {
        const { createAmbientFlow } = await import("@/lib/ambient-flow");
        if (!active) return;

        const cleanup = createAmbientFlow(canvas, theme);
        if (!cleanup) {
          canvas.dataset.ambientState = "unavailable";
          return;
        }

        destroy = cleanup;
        canvas.dataset.ambientState = "ready";
      } catch (error) {
        canvas.dataset.ambientState = "unavailable";
        if (error instanceof Error) canvas.dataset.ambientError = error.message;
        // WebGL can be unavailable because of browser policy or hardware.
        // The normal page background remains visible in that case.
      }
    })();

    return () => {
      active = false;
      destroy();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fluid-background fixed inset-0 h-[100svh] w-screen pointer-events-none"
    />
  );
}
