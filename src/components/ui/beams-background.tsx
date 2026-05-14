"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface ThemeParams {
  hueBase: number;
  hueSpan: number;
  saturation: number;
  lightness: number;
}

function createBeam(width: number, height: number, params: ThemeParams): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 40 + Math.random() * 80,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.35 + Math.random() * 0.25,
    hue: params.hueBase + Math.random() * params.hueSpan,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function BeamsBackground({
  className,
  intensity = "strong",
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;

  const opacityMap = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read theme from <html data-theme="...">. Dark = cyan/blue beams; light = electric blue/violet.
    const readThemeParams = (): ThemeParams => {
      const isDark =
        typeof document !== "undefined" &&
        document.documentElement.dataset.theme !== "light";
      // Dark: cyan/blue/violet, high lightness. Light: deeper blue/indigo, mid lightness.
      return isDark
        ? { hueBase: 190, hueSpan: 70, saturation: 95, lightness: 65 }
        : { hueBase: 215, hueSpan: 55, saturation: 95, lightness: 55 };
    };

    let themeParams = readThemeParams();

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height, themeParams),
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const themeObserver = new MutationObserver(() => {
      themeParams = readThemeParams();
      beamsRef.current = beamsRef.current.map(() =>
        createBeam(canvas.width, canvas.height, themeParams),
      );
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;

      const column = index % 3;
      const spacing = canvas.width / 3;

      beam.y = canvas.height + 100;
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 120 + Math.random() * 120;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue =
        themeParams.hueBase + (index * themeParams.hueSpan) / totalBeams;
      beam.opacity = 0.45 + Math.random() * 0.2;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      const hsl = `${beam.hue}, ${themeParams.saturation}%, ${themeParams.lightness}%`;

      gradient.addColorStop(0, `hsla(${hsl}, 0)`);
      gradient.addColorStop(0.1, `hsla(${hsl}, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.4, `hsla(${hsl}, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${hsl}, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `hsla(${hsl}, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${hsl}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      themeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, opacityMap]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ filter: "blur(4px)" }}
      />
    </div>
  );
}
