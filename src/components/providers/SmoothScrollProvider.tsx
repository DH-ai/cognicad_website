"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let gsapTick: ((time: number) => void) | null = null;

    async function init() {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", () => ScrollTrigger.update());

      gsapTick = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(gsapTick);
      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (gsapTick) {
        import("gsap").then(({ default: gsap }) => {
          gsap.ticker.remove(gsapTick!);
        });
      }
    };
  }, []);

  return <>{children}</>;
}
