"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (event?: { clientX: number; clientY: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: Theme | null = null;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        stored = window.localStorage.getItem("cognicad-theme") as Theme | null;
      }
    } catch {
      stored = null;
    }
    const preferred =
      stored ??
      (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(preferred);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = preferred;
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(
    (event?: { clientX: number; clientY: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      const apply = () => {
        if (typeof document !== "undefined") {
          document.documentElement.dataset.theme = next;
        }
        try {
          if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem("cognicad-theme", next);
          }
        } catch {
          // storage may be unavailable (private mode, edge runtime preview)
        }
        setTheme(next);
      };

      if (typeof document === "undefined" || typeof window === "undefined") {
        apply();
        return;
      }

      const doc = document as DocumentWithViewTransition;
      const reduceMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!doc.startViewTransition || reduceMotion || !event) {
        apply();
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      document.documentElement.style.setProperty("--theme-x", `${x}px`);
      document.documentElement.style.setProperty("--theme-y", `${y}px`);
      document.documentElement.style.setProperty("--theme-r", `${endRadius}px`);
      document.documentElement.dataset.themeTransition = next;

      const transition = doc.startViewTransition(apply);
      transition.finished.finally(() => {
        delete document.documentElement.dataset.themeTransition;
      });
    },
    [theme],
  );

  // Prevent flash before mount
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
