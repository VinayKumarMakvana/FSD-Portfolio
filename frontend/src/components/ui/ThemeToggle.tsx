"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full glass hover:bg-foreground/10 transition-colors flex items-center justify-center relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-md" />
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-accent-primary relative z-10" />
      ) : (
        <Moon className="w-5 h-5 text-accent-secondary relative z-10" />
      )}
    </button>
  );
}
