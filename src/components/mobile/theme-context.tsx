"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "night" | "dawn";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const STORAGE_KEY = "harshit-railway-theme";
const ThemeContext = createContext<ThemeContextValue>({ theme: "night", toggleTheme: () => {} });

export function MobileThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("night");

  // Storage is read only after hydration so server rendering stays deterministic.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "night" || stored === "dawn") setTheme(stored);
    } catch {
      // Private browsing can block storage; the default theme remains usable.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "night" ? "dawn" : "night";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage failures; the in-memory theme still updates.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
