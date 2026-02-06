"use client";
import { cva } from "class-variance-authority";
import { Airplay, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "../../lib/cn";

const itemVariants = cva("size-7 p-1.5 transition-all duration-300", {
  variants: {
    active: {
      true: "bg-background text-foreground shadow-sm",
      false: "text-muted-foreground hover:text-foreground",
    },
  },
});

const full = [
  ["light", Sun] as const,
  ["dark", Moon] as const,
  ["system", Airplay] as const,
];

export function ThemeToggle({
  className,
  mode = "light-dark",
  ...props
}: ComponentProps<"div"> & {
  mode?: "light-dark" | "light-dark-system";
}) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = cn(
    "inline-flex items-center rounded-full border border-border/40 bg-muted/20 p-1 *:rounded-full transition-all duration-300 hover:border-border/80",
    className,
  );

  if (mode === "light-dark") {
    const value = mounted ? resolvedTheme : null;

    return (
      <button
        className={container}
        aria-label={`Toggle Theme`}
        onClick={() => setTheme(value === "light" ? "dark" : "light")}
        data-theme-toggle=""
      >
        {full.map(([key, Icon]) => {
          if (key === "system") return;

          return (
            <Icon
              key={key}
              fill="currentColor"
              className={cn(itemVariants({ active: value === key }))}
            />
          );
        })}
      </button>
    );
  }

  const value = mounted ? theme : null;

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {full.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(itemVariants({ active: value === key }))}
          onClick={() => setTheme(key)}
        >
          <Icon className="size-full" fill="currentColor" />
        </button>
      ))}
    </div>
  );
}
