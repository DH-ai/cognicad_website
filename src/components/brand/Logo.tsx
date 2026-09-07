import type { SVGProps } from "react";

/**
 * JC monogram — vector reproduction of the supplied JusCAD symbol
 * (public/logo/jc-symbol.svg). Geometry, in source units:
 *   lower arms 112 · vertical stems 56 · centre gap 14 · angled edges 30°.
 * Fill follows `currentColor` so it themes with the surrounding text.
 * Never stretch: always keep the 238 × 304.66 aspect ratio.
 */
export function JCMark({
  height = 24,
  className,
  ...rest
}: { height?: number } & Omit<SVGProps<SVGSVGElement>, "height" | "width">) {
  const width = (height * 238) / 304.66;
  return (
    <svg
      viewBox="0 0 238 304.66"
      width={width}
      height={height}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M112 0V304.66L0 240V175.34L56 207.67V32.33Z" />
      <path d="M126 0L238 64.66V129.33L182 96.99V207.67L238 175.34V240L126 304.66Z" />
    </svg>
  );
}

/**
 * Wordmark — set in the brand face at the lockup weight.
 * Kept as live text so it stays crisp, selectable and theme-aware.
 */
export function Wordmark({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`font-sans font-bold leading-none tracking-[-0.025em] ${className}`}
      style={style}
    >
      JusCAD
    </span>
  );
}

/**
 * Horizontal lockup — symbol + wordmark, for navigation and footers.
 * Proportions measured from the supplied lockup:
 * wordmark cap height ≈ 0.54 × symbol height, gap ≈ 0.44 × symbol height.
 */
export function LogoHorizontal({
  height = 28,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap: height * 0.44 }}
    >
      <JCMark height={height} />
      <Wordmark style={{ fontSize: height * 0.74 }} />
    </span>
  );
}

/**
 * Stacked lockup — only for square compositions.
 * Symbol ≈ 0.70 × total height, wordmark cap height ≈ 0.17 × total height.
 */
export function LogoStacked({
  height = 120,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex flex-col items-center ${className}`}
      style={{ gap: height * 0.095 }}
    >
      <JCMark height={height * 0.7} />
      <Wordmark style={{ fontSize: height * 0.234 }} />
    </span>
  );
}
