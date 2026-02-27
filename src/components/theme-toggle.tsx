"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="size-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex size-9 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="size-4 text-yellow-300" />
      ) : (
        <Moon className="size-4 text-slate-700" />
      )}
    </button>
  );
}
