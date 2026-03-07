"use client";

import {
    Button,
    type ToastPosition,
    ToastProvider,
    useToast,
} from "@work-rjkashyap/unified-ui";
import {
    Bell,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Info,
    Zap,
    X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

const VARIANTS = [
    {
        key: "default",
        label: "Default",
        icon: Bell,
        color: "text-fd-muted-foreground",
        bg: "bg-fd-muted/40 hover:bg-fd-muted/60",
        border: "border-fd-border",
        fire: (t: ReturnType<typeof useToast>) =>
            t.toast("A new version is available."),
    },
    {
        key: "success",
        label: "Success",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
        border: "border-emerald-500/20",
        fire: (t: ReturnType<typeof useToast>) =>
            t.success({
                title: "Changes saved",
                description: "Your profile has been updated successfully.",
            }),
    },
    {
        key: "warning",
        label: "Warning",
        icon: AlertTriangle,
        color: "text-amber-500",
        bg: "bg-amber-500/5 hover:bg-amber-500/10",
        border: "border-amber-500/20",
        fire: (t: ReturnType<typeof useToast>) =>
            t.warning({
                title: "Session expiring",
                description: "Your session expires in 5 minutes.",
            }),
    },
    {
        key: "danger",
        label: "Danger",
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-500/5 hover:bg-red-500/10",
        border: "border-red-500/20",
        fire: (t: ReturnType<typeof useToast>) =>
            t.danger({
                title: "Upload failed",
                description: "The file exceeds the 10 MB limit.",
            }),
    },
    {
        key: "info",
        label: "Info",
        icon: Info,
        color: "text-blue-500",
        bg: "bg-blue-500/5 hover:bg-blue-500/10",
        border: "border-blue-500/20",
        fire: (t: ReturnType<typeof useToast>) =>
            t.info({
                title: "Tip",
                description: "Press Ctrl+S to save your work at any time.",
            }),
    },
    {
        key: "action",
        label: "With Action",
        icon: Zap,
        color: "text-violet-500",
        bg: "bg-violet-500/5 hover:bg-violet-500/10",
        border: "border-violet-500/20",
        fire: (t: ReturnType<typeof useToast>) =>
            t.info({
                title: "New update available",
                description: "Version 2.4.0 is ready to install.",
                action: {
                    label: "Update now",
                    onClick: () => {
                        t.success("Update started!");
                    },
                },
            }),
    },
] as const;

// ---------------------------------------------------------------------------
// Internal: Toast trigger cards rendered inside the provider
// ---------------------------------------------------------------------------

function ToastDemoControls() {
    const toast = useToast();

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Variant trigger cards — 2×3 grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VARIANTS.map(({ key, label, icon: Icon, color, bg, border, fire }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => fire(toast)}
                        className={cn(
                            "group relative flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3",
                            "transition-all duration-150 cursor-pointer",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background",
                            bg,
                            border,
                        )}
                    >
                        <Icon className={cn("size-4 shrink-0 transition-transform group-hover:scale-110", color)} />
                        <span className="text-[11px] font-medium text-fd-foreground leading-none">
                            {label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Dismiss all */}
            <button
                type="button"
                onClick={() => toast.dismissAll()}
                className="mx-auto flex items-center gap-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground transition-colors cursor-pointer"
            >
                <X className="size-3" />
                Dismiss all
            </button>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Positions — visual "screen" picker
// ---------------------------------------------------------------------------

const POSITIONS: { value: ToastPosition; label: string; row: number; col: number }[] = [
    { value: "top-left", label: "TL", row: 0, col: 0 },
    { value: "top-center", label: "TC", row: 0, col: 1 },
    { value: "top-right", label: "TR", row: 0, col: 2 },
    { value: "bottom-left", label: "BL", row: 1, col: 0 },
    { value: "bottom-center", label: "BC", row: 1, col: 1 },
    { value: "bottom-right", label: "BR", row: 1, col: 2 },
];

function PositionPicker({
    value,
    onChange,
}: {
    value: ToastPosition;
    onChange: (v: ToastPosition) => void;
}) {
    return (
        <div className="flex flex-col gap-1.5 items-center">
            <span className="text-[11px] font-medium text-fd-muted-foreground uppercase tracking-widest">
                Position
            </span>
            {/* Mini screen representation */}
            <div className="relative w-40 h-20 rounded-lg border border-fd-border bg-fd-card/50 p-1.5 grid grid-rows-2 grid-cols-3 gap-1">
                {POSITIONS.map(({ value: pos, label }) => {
                    const isActive = value === pos;
                    return (
                        <button
                            key={pos}
                            type="button"
                            onClick={() => onChange(pos)}
                            className={cn(
                                "rounded-[4px] text-[9px] font-semibold transition-all duration-150",
                                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fd-ring",
                                isActive
                                    ? "bg-fd-primary text-fd-primary-foreground shadow-sm scale-105"
                                    : "text-fd-muted-foreground/60 hover:text-fd-muted-foreground hover:bg-fd-accent/40",
                            )}
                        >
                            {label}
                        </button>
                    );
                })}
                {/* Decorative screen notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-8 h-0.75 rounded-b-sm bg-fd-border" />
            </div>
        </div>
    );
}

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
                <PositionPicker value={position} onChange={setPosition} />
            )}

            {/* Scoped toast provider + controls */}
            <ToastProvider key={position} position={position} maxVisible={5}>
                <ToastDemoControls />
            </ToastProvider>
        </div>
    );
}
