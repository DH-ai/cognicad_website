"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

/** Day = Paper canvas with Ink text. Night = Night Ink canvas with Night Paper text. */
export type Theme = "day" | "night";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (event?: { clientX: number; clientY: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "day",
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

const STORAGE_KEY = "juscad-theme";

function normalize(value: string | null | undefined): Theme | null {
  // Older builds stored "dark" / "light"; map them onto the current names.
  if (value === "night" || value === "dark") return "night";
  if (value === "day" || value === "light") return "day";
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    // The inline script in layout.tsx has already set data-theme before paint;
    // read it back so React state matches the DOM.
    const fromDom = normalize(document.documentElement.dataset.theme);
    if (fromDom) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(fromDom);
      return;
    }
    let stored: Theme | null = null;
    try {
      stored = normalize(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      stored = null;
    }
    const preferred =
      stored ??
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "night"
        : "day");
    document.documentElement.dataset.theme = preferred;
    setTheme(preferred);
  }, []);

  const toggleTheme = useCallback(
    (event?: { clientX: number; clientY: number }) => {
      const next: Theme = theme === "day" ? "night" : "day";

      const apply = () => {
        if (typeof document !== "undefined") {
          document.documentElement.dataset.theme = next;
        }
        try {
          if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, next);
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
