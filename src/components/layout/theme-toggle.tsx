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
}: ComponentProps<"button"> & {
  mode?: "light-dark" | "light-dark-system";
}) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const value = mounted
    ? mode === "light-dark"
      ? resolvedTheme
      : theme
    : null;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border border-fd-border/50 bg-fd-muted/50 p-2 text-fd-muted-foreground transition-all duration-300 hover:border-fd-border hover:bg-fd-muted hover:text-fd-foreground",
        className,
      )}
      aria-label="Toggle theme"
      onClick={() => {
        if (mode === "light-dark-system") {
          const modes = ["light", "dark", "system"] as const;
          const next = modes[(modes.indexOf(theme as any) + 1) % 3];
          setTheme(next);
        } else {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }
      }}
      {...props}
    >
      <Sun
        className={cn(
          "size-full transition-all duration-500",
          value !== "light" && "scale-0 rotate-90 opacity-0 absolute",
        )}
      />
      <Moon
        className={cn(
          "size-full transition-all duration-500",
          value !== "dark" && "scale-0 rotate-90 opacity-0 absolute",
        )}
      />
      {mode === "light-dark-system" && (
        <Airplay
          className={cn(
            "size-full transition-all duration-500",
            value !== "system" && "scale-0 rotate-90 opacity-0 absolute",
          )}
        />
      )}
    </button>
  );
}
