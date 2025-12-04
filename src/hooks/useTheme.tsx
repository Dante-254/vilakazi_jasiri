"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const [manual, setManual] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme_manual") === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: Theme) => {
      if (t === "system") {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
      } else {
        root.classList.toggle("dark", t === "dark");
      }
    };

    // if user has not manually chosen theme, follow system; otherwise use stored theme
    if (!manual) {
      apply("system");
    } else {
      apply(theme);
    }

    localStorage.setItem("theme", theme);
    localStorage.setItem("theme_manual", manual ? "true" : "false");

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!manual) apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = (t: Theme, manualChoice = true) => {
    setThemeState(t);
    setManual(manualChoice);
    try {
      localStorage.setItem("theme", t);
      localStorage.setItem("theme_manual", manualChoice ? "true" : "false");
    } catch {
      // ignore
    }
  };

  return { theme, setTheme, manual } as const;
}

export default useTheme;
