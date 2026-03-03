"use client";

import { ThemeCustomizer } from "@work-rjkashyap/unified-ui";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeCustomizerTrigger() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
          <ThemeCustomizer />
        </div>
      )}
    </>
  );
}
