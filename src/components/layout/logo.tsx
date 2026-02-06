import { CircuitBoard } from "lucide-react";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2.5 group", className)}>
            <div className="p-1.5 rounded-lg bg-fd-primary/10 text-fd-primary border border-fd-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_15px_rgba(var(--fd-primary),0.1)]">
                <CircuitBoard className="size-4" />
            </div>
            <span className="font-bold text-sm tracking-tighter text-fd-foreground group-hover:text-fd-primary transition-colors duration-300">
                UNIFIED
                <span className="text-fd-foreground/70 group-hover:text-fd-primary/70">
                    UI
                </span>
            </span>
        </div>
    );
}
