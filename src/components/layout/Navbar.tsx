"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={(e) =>
        toggleTheme({ clientX: e.clientX, clientY: e.clientY })
      }
      className="w-8 h-8 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 cursor-pointer"
      whileTap={{ scale: 0.88 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.22 }}
          >
            <Sun size={16} weight="light" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -30 }}
            transition={{ duration: 0.22 }}
          >
            <Moon size={16} weight="light" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScroll.current && y > 100);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-border-subtle)] backdrop-blur-md"
            : "bg-transparent"
        }`}
        style={scrolled ? { background: "var(--nav-scrolled-bg)" } : {}}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl text-[var(--color-accent)] leading-none select-none">
              Cogni<span className="text-[var(--color-glow)]">C</span>AD
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/beta"
              className="px-5 py-2 text-[10px] tracking-[0.15em] uppercase border border-[var(--color-accent)]/22 text-[var(--color-accent)]/75 hover:border-[var(--color-accent)]/55 hover:text-[var(--color-accent)] active:scale-[0.97] transition-all duration-200"
            >
              Join Beta
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} weight="light" />
              ) : (
                <List size={20} weight="light" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-x-0 top-16 z-40 border-b border-[var(--color-border-subtle)] px-6 py-8 flex flex-col gap-5 md:hidden"
            style={{ background: "var(--nav-scrolled-bg)", backdropFilter: "blur(18px)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/beta"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-3 text-xs tracking-[0.15em] uppercase border border-[var(--color-accent)]/22 text-[var(--color-accent)]/75 text-center"
            >
              Join Beta
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
