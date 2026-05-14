import type { Metadata } from "next";
import { Geist, Geist_Mono, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccentBackground from "@/components/home/AccentBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CogniCAD — Cognitive Engineering Systems",
  description:
    "An AI-native cognitive engineering system. Built for engineering thought, not just engineering commands.",
  openGraph: {
    title: "CogniCAD — Cognitive Engineering Systems",
    description:
      "The next generation of engineering software will not be defined by menus and commands. It will be defined by cognition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${pinyonScript.variable}`}
    >
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <AccentBackground />
            <Navbar />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
