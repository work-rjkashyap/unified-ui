"use client";

import {
  ThemeCustomizer,
  useThemeCustomizer,
  COLOR_PRESETS,
  STYLE_PRESETS,
} from "@work-rjkashyap/unified-ui";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Mode Selector — Light / Dark / System toggle using next-themes
// ---------------------------------------------------------------------------

const modes = [
  { key: "light", label: "Light", Icon: Sun },
  { key: "dark", label: "Dark", Icon: Moon },
  { key: "system", label: "System", Icon: Monitor },
] as const;

function ModeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground mb-2">
          Mode
        </h4>
        <div className="flex gap-1 rounded-lg border border-fd-border/60 bg-fd-muted/30 p-1">
          {modes.map(({ key, label, Icon }) => (
            <div
              key={key}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-fd-muted-foreground"
            >
              <Icon className="size-3.5" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground mb-2">
        Mode
      </h4>
      <div className="flex gap-1 rounded-lg border border-fd-border/60 bg-fd-muted/30 p-1">
        {modes.map(({ key, label, Icon }) => {
          const isActive = theme === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTheme(key)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
                isActive
                  ? "bg-fd-background text-fd-foreground shadow-sm"
                  : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-background/50",
              )}
              aria-label={`Switch to ${label} mode`}
            >
              <Icon className="size-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Floating Customizer Trigger + Panel
// ---------------------------------------------------------------------------

export function ThemeCustomizerTrigger() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { setStyle, setColorPreset } = useThemeCustomizer();

  const handleShuffle = useCallback(() => {
    setStyle(randomItem(STYLE_PRESETS).key);
    setColorPreset(randomItem(COLOR_PRESETS).key);
  }, [setStyle, setColorPreset]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-5 right-5 z-50",
          "flex size-10 items-center justify-center",
          "rounded-full border border-fd-border bg-fd-background shadow-lg",
          "text-fd-muted-foreground transition-all duration-200",
          "hover:bg-fd-muted hover:text-fd-foreground hover:shadow-xl hover:scale-105",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background",
          "active:scale-95",
          open && "bg-fd-muted text-fd-foreground shadow-xl",
        )}
        aria-label="Customize theme"
        aria-expanded={open}
      >
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          className={cn(
            "fixed bottom-18 right-5 z-50",
            "w-90 max-h-[calc(100vh-120px)] overflow-y-auto",
            "rounded-lg border border-fd-border bg-fd-background p-4 shadow-xl",
            "animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
          )}
          role="dialog"
          aria-label="Theme customizer"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-fd-foreground">
                Customize
              </h3>
              <p className="text-xs text-fd-muted-foreground">
                Pick a style and customize components
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleShuffle}
                className="flex size-7 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground"
                aria-label="Shuffle random theme"
                title="Shuffle random theme"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
                  <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
                  <path d="M6 18h.01" />
                  <path d="M10 14h.01" />
                  <path d="M15 6h.01" />
                  <path d="M18.5 9.5h.01" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-7 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground"
                aria-label="Close"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <ModeSelector />
          <ThemeCustomizer />
        </div>
      )}
    </>
  );
}
