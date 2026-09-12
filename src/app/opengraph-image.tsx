import { ImageResponse } from "next/og";

export const alt = "JusCAD — Cognitive Engineering Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b1013", color: "#e9efec", padding: "72px 84px", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 20%, rgba(127,169,209,.32), transparent 38%), linear-gradient(rgba(127,169,209,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,209,.08) 1px, transparent 1px)", backgroundSize: "auto, 38px 38px, 38px 38px" }} /><div style={{ display: "flex", position: "relative", fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: "#aab9b4" }}>Cognitive engineering systems</div><div style={{ display: "flex", flexDirection: "column", position: "relative" }}><div style={{ display: "flex", fontSize: 126, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.055em" }}>JusCAD</div><div style={{ display: "flex", marginTop: 28, maxWidth: 820, fontSize: 30, lineHeight: 1.35, color: "#aab9b4" }}>An AI-native cognitive layer for engineering.</div></div><div style={{ display: "flex", position: "relative", justifyContent: "space-between", fontSize: 20, color: "#7fa9d1" }}><span>juscad.com</span><span>Fig. 01</span></div></div>, size);
}
