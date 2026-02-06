"use client";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { type ButtonProps, buttonVariants } from "../ui/button";

interface SearchToggleProps
  extends Omit<ComponentProps<"button">, "color">,
    ButtonProps {
  hideIfDisabled?: boolean;
}
export function SearchToggle({
  hideIfDisabled,
  size = "icon-sm",
  color = "ghost",
  ...props
}: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          size,
          color,
        }),
        props.className,
      )}
      data-search=""
      aria-label="Open Search"
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
}
export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) return null;
  return (
    <button
      type="button"
      data-search-full=""
      {...props}
      className={cn(
        "flex w-full min-w-50 max-w-60 items-center gap-2 rounded-full border border-fd-border/40 bg-fd-muted/20 px-3 py-1.5 text-fd-muted-foreground transition-all duration-300 hover:bg-fd-muted/40 hover:border-fd-border/80 group shrink-0",
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4 shrink-0 transition-colors group-hover:text-fd-foreground" />
      <span className="text-xs font-medium tracking-tight whitespace-nowrap">
        Search documentation...
      </span>
      <div className="ms-auto inline-flex gap-0.5 shrink-0">
        {hotKey.map((k, i) => (
          <kbd
            key={i}
            className="inline-flex h-5 select-none items-center gap-1 rounded bg-fd-background px-1.5 font-mono text-[10px] font-medium opacity-100 border border-fd-border/40"
          >
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
