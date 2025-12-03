"use client";
import { useEffect } from "react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // ensure hydration matches
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293a8 8 0 11-10.586-10.586 8 8 0 0010.586 10.586z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 5.22a1 1 0 011.415 0L6.64 6.22a1 1 0 11-1.415 1.415L4.22 6.636a1 1 0 010-1.415zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
          </svg>
        )}
      </button>
    </div>
  );
}
