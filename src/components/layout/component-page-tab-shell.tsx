"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface ComponentPageTabShellProps {
  previewSlot: ReactNode;
  codeSlot: ReactNode;
}

export function ComponentPageTabShell({
  previewSlot,
  codeSlot,
}: ComponentPageTabShellProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Close fullscreen on Escape key
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when fullscreen
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isFullscreen]);

  return (
    <>
      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsFullscreen(false);
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "rounded-lg border border-fd-border bg-fd-card overflow-hidden transition-all duration-300",
          isFullscreen &&
            "fixed inset-4 z-50 flex flex-col shadow-2xl rounded-xl",
        )}
      >
        {/* Tab Bar */}
        <div className="flex items-center justify-between border-b border-fd-border shrink-0">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "relative px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === "preview"
                  ? "text-fd-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground",
              )}
            >
              Preview
              {activeTab === "preview" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "relative px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === "code"
                  ? "text-fd-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground",
              )}
            >
              Code
              {activeTab === "code" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
              )}
            </button>
          </div>

          {/* Maximize / Minimize toggle */}
          <div className="flex items-center gap-1 pr-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex size-8 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground"
              aria-label={
                isFullscreen ? "Minimize preview" : "Maximize preview"
              }
              title={isFullscreen ? "Minimize (Esc)" : "Maximize"}
            >
              {isFullscreen ? (
                <Minimize2 className="size-3.5" />
              ) : (
                <Maximize2 className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area — both panels stay mounted; visibility is toggled via
            CSS so React never unmounts the preview tree. This also prevents a
            second serialisation attempt when the user switches tabs. */}
        <div
          className={cn(
            activeTab === "preview" ? undefined : "hidden",
            isFullscreen && "flex-1 overflow-auto",
          )}
        >
          {previewSlot}
        </div>
        <div
          className={cn(
            activeTab === "code" ? undefined : "hidden",
            isFullscreen && "flex-1 overflow-auto",
          )}
        >
          {codeSlot}
        </div>
      </div>
    </>
  );
}
