"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(true);
    });

    return () => window.clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-24 rounded-full border border-border/40 bg-muted/40" />
    );
  }

  const options = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "system", icon: Monitor, label: "System" },
    { id: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div className="relative flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/40 backdrop-blur-sm w-fit">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            className={`relative flex items-center justify-center rounded-full p-1 transition-colors duration-300 z-10 cursor-pointer
              ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            aria-label={`Switch to ${opt.label} theme`}
          >
            <Icon className="h-3.5 w-3.5" />

            {isActive && (
              <motion.div
                layoutId="activeThemeIndicator"
                className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50 -z-10"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
