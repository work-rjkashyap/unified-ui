import { CircuitBoard } from "lucide-react";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center size-7 rounded-md bg-fd-primary text-fd-primary-foreground">
        <CircuitBoard className="size-4" />
      </div>
      <span className="font-semibold text-sm bg-linear-to-r from-[#659287] via-[#B1C29E] to-[#DEAA79] bg-clip-text text-transparent">
        Unified UI
      </span>
    </div>
  );
}
