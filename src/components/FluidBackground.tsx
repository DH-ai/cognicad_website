"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Night-mode ambient fluid layer. The WebGL module is loaded only after this
 * client component mounts, keeping browser-only APIs out of the server build.
 */
export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (theme !== "night" || !canvas || prefersReducedMotion) return;

    let active = true;
    let destroy = () => {};

    void (async () => {
      try {
        const supportsWebGL =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl");

        if (!supportsWebGL) return;

        const { createFluidSimulation } = await import("@/lib/fluid");
        if (!active) return;

        const cleanup = createFluidSimulation(canvas, {
          // A low-key, blue-white field tuned for the site's night palette.
          BACK_COLOR: { r: 3, g: 12, b: 26 },
          DENSITY_DISSIPATION: 2.2,
          SPLAT_RADIUS: 0.12,
          BLOOM: true,
          BLOOM_THRESHOLD: 0.28,
        });
        if (!cleanup) {
          canvas.dataset.fluidState = "unavailable";
          return;
        }

        destroy = cleanup;
        canvas.dataset.fluidState = "ready";
      } catch (error) {
        canvas.dataset.fluidState = "unavailable";
        if (error instanceof Error) canvas.dataset.fluidError = error.message;
        // WebGL can be unavailable because of browser policy or hardware.
        // The normal page background remains visible in that case.
      }
    })();

    return () => {
      active = false;
      destroy();
    };
  }, [theme]);

  if (theme !== "night") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fluid-background fixed inset-0 h-[100svh] w-screen pointer-events-none"
    />
  );
}
