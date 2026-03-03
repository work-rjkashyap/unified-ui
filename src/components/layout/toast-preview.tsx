"use client";

import {
  Button,
  type ToastPosition,
  ToastProvider,
  useToast,
} from "@work-rjkashyap/unified-ui";
import { useState } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Internal: Toast trigger buttons rendered inside the provider
// ---------------------------------------------------------------------------

function ToastDemoControls({
  position: _position,
}: {
  position: ToastPosition;
}) {
  const toast = useToast();

  const variants = [
    {
      key: "default",
      label: "Default",
      fire: () => toast.toast("A new version is available."),
    },
    {
      key: "success",
      label: "Success",
      fire: () =>
        toast.success({
          title: "Changes saved",
          description: "Your profile has been updated successfully.",
        }),
    },
    {
      key: "warning",
      label: "Warning",
      fire: () =>
        toast.warning({
          title: "Session expiring",
          description: "Your session expires in 5 minutes.",
        }),
    },
    {
      key: "danger",
      label: "Danger",
      fire: () =>
        toast.danger({
          title: "Upload failed",
          description:
            "The file exceeds the 10 MB limit. Please compress and try again.",
        }),
    },
    {
      key: "info",
      label: "Info",
      fire: () =>
        toast.info({
          title: "Tip",
          description: "Press Ctrl+S to save your work at any time.",
        }),
    },
    {
      key: "action",
      label: "With Action",
      fire: () =>
        toast.info({
          title: "New update available",
          description: "Version 2.4.0 is ready to install.",
          action: {
            label: "Update now",
            onClick: () => {
              toast.success("Update started!");
            },
          },
        }),
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Variant trigger buttons */}
      <div className="flex flex-wrap items-center gap-2 justify-center">
        {variants.map(({ key, label, fire }) => (
          <Button
            key={key}
            variant={key === "action" ? "ghost" : "secondary"}
            size="sm"
            onClick={fire}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Dismiss all */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast.dismissAll()}
          className="text-xs text-fd-muted-foreground"
        >
          Dismiss all
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Positions
// ---------------------------------------------------------------------------

const POSITIONS: { value: ToastPosition; label: string }[] = [
  { value: "top-right", label: "Top Right" },
  { value: "top-center", label: "Top Center" },
  { value: "top-left", label: "Top Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-left", label: "Bottom Left" },
];

// ---------------------------------------------------------------------------
// Public: ToastPreview — self-contained live demo
// ---------------------------------------------------------------------------

export interface ToastPreviewProps {
  /** Whether to show the position picker. @default true */
  showPositionPicker?: boolean;
  /** Initial position. @default "top-right" */
  defaultPosition?: ToastPosition;
  /** Extra class on the outer wrapper. */
  className?: string;
}

export function ToastPreview({
  showPositionPicker = true,
  defaultPosition = "top-right",
  className,
}: ToastPreviewProps) {
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {/* Position picker */}
      {showPositionPicker && (
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider">
            Position
          </span>
          <div className="grid grid-cols-3 gap-1 rounded-md border border-fd-border p-1 bg-fd-muted/30">
            {POSITIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPosition(value)}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap",
                  position === value
                    ? "bg-fd-primary text-fd-primary-foreground shadow-sm"
                    : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scoped toast provider + controls */}
      <ToastProvider key={position} position={position} maxVisible={5}>
        <ToastDemoControls position={position} />
      </ToastProvider>
    </div>
  );
}
