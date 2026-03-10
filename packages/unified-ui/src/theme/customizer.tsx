"use client";

import { cn } from "@unified-ui/utils/cn";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useThemeCustomizer } from "./customizer-store";
import {
  COLOR_PRESETS,
  type ColorPreset,
  FONT_PRESETS,
  type FontPreset,
  MENU_ACCENT_PRESETS,
  MENU_COLOR_PRESETS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  STYLE_PRESETS,
  SURFACE_STYLE_PRESETS,
} from "./presets";

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function RadiusOption({
  preset,
  isActive,
  onClick,
}: {
  preset: (typeof RADIUS_PRESETS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-md border px-3 py-2 text-center transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-primary bg-muted/60 shadow-sm"
          : "border-border bg-transparent",
      )}
      title={`${preset.name} (${preset.label})`}
    >
      <span
        className="size-8 border-2 border-foreground/30 bg-muted"
        style={{ borderRadius: preset.value }}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-[11px] font-medium leading-none",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {preset.label}
      </span>
    </button>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FontCombobox({
  presets,
  activeKey,
  onSelect,
}: {
  presets: readonly FontPreset[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activePreset = useMemo(
    () => presets.find((p) => p.key === activeKey) ?? presets[0],
    [presets, activeKey],
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return presets;
    const q = search.toLowerCase();
    return presets.filter((p) => p.name.toLowerCase().includes(q));
  }, [presets, search]);

  // Reset highlight when filtered list changes
  useEffect(() => {
    setHighlightIndex(0);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      // Small delay to let the DOM render
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-font-item]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  const handleSelect = useCallback(
    (key: string) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex].key);
        }
      }
    },
    [filtered, highlightIndex, handleSelect],
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
          "hover:border-border-strong hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open ? "border-primary shadow-sm" : "border-border",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="text-sm font-semibold leading-none text-muted-foreground"
          style={{ fontFamily: activePreset.value }}
        >
          {activePreset.sample}
        </span>
        <span className="flex-1 truncate font-medium text-foreground">
          {activePreset.name}
        </span>
        <ChevronDownIcon
          className={cn(
            "text-muted-foreground transition-transform duration-fast",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown popover */}
      {open && (
        <div
          className={cn(
            "absolute left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
          )}
          role="dialog"
          aria-label="Select font"
        >
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <SearchIcon className="text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search fonts…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              aria-label="Search fonts"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Options list */}
          <div
            ref={listRef}
            className="max-h-52 overflow-y-auto overscroll-contain p-1"
            role="listbox"
          >
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No fonts found
              </div>
            ) : (
              filtered.map((preset, index) => {
                const isActive = preset.key === activeKey;
                const isHighlighted = index === highlightIndex;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    data-font-item=""
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(preset.key)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                      "outline-none",
                      isHighlighted && "bg-muted",
                      isActive && "text-foreground font-medium",
                      !isActive && "text-muted-foreground",
                    )}
                  >
                    <span
                      className="w-6 text-center text-base font-semibold leading-none"
                      style={{ fontFamily: preset.value }}
                      aria-hidden="true"
                    >
                      {preset.sample}
                    </span>
                    <span className="flex-1 truncate">{preset.name}</span>
                    {isActive && (
                      <CheckIcon className="text-primary shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorCombobox({
  presets,
  activeKey,
  onSelect,
}: {
  presets: readonly ColorPreset[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activePreset = useMemo(
    () => presets.find((p) => p.key === activeKey) ?? presets[0],
    [presets, activeKey],
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return presets;
    const q = search.toLowerCase();
    return presets.filter((p) => p.name.toLowerCase().includes(q));
  }, [presets, search]);

  // Reset highlight when filtered list changes
  useEffect(() => {
    setHighlightIndex(0);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-color-item]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  const handleSelect = useCallback(
    (key: string) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex].key);
        }
      }
    },
    [filtered, highlightIndex, handleSelect],
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
          "hover:border-border-strong hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open ? "border-primary shadow-sm" : "border-border",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={cn(
            "size-5 shrink-0 rounded-full border shadow-xs",
            "border-border",
          )}
          style={{ backgroundColor: activePreset.swatch }}
          aria-hidden="true"
        />
        <span className="flex-1 truncate font-medium text-foreground">
          {activePreset.name}
        </span>
        <ChevronDownIcon
          className={cn(
            "text-muted-foreground transition-transform duration-fast",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown popover */}
      {open && (
        <div
          className={cn(
            "absolute left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
          )}
          role="dialog"
          aria-label="Select color"
        >
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <SearchIcon className="text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search colors…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              aria-label="Search colors"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Options list */}
          <div
            ref={listRef}
            className="max-h-52 overflow-y-auto overscroll-contain p-1"
            role="listbox"
          >
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No colors found
              </div>
            ) : (
              filtered.map((preset, index) => {
                const isActive = preset.key === activeKey;
                const isHighlighted = index === highlightIndex;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    data-color-item=""
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(preset.key)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                      "outline-none",
                      isHighlighted && "bg-muted",
                      isActive && "text-foreground font-medium",
                      !isActive && "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "size-4 shrink-0 rounded-full border shadow-xs",
                        isActive
                          ? "border-primary/50 ring-2 ring-primary/20"
                          : "border-border",
                      )}
                      style={{ backgroundColor: preset.swatch }}
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate">{preset.name}</span>
                    {isActive && (
                      <CheckIcon className="text-primary shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PillToggle({
  label,
  isActive,
  onClick,
  description,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-primary bg-muted/60 shadow-sm font-medium text-foreground"
          : "border-border bg-transparent text-muted-foreground",
      )}
      title={description}
    >
      {label}
    </button>
  );
}

function StyleOption({
  preset,
  isActive,
  onClick,
}: {
  preset: (typeof STYLE_PRESETS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-md border px-3 py-3 text-left transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-primary bg-muted/60 shadow-sm"
          : "border-border bg-transparent",
      )}
      title={preset.description}
    >
      <svg
        className={cn(
          "size-5 shrink-0 mt-0.5",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={preset.iconPath} />
      </svg>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "text-sm font-semibold leading-tight",
            isActive ? "text-foreground" : "text-foreground",
          )}
        >
          {preset.name}
        </div>
        <div
          className={cn(
            "mt-0.5 text-xs leading-snug",
            isActive ? "text-muted-foreground" : "text-muted-foreground/70",
          )}
        >
          {preset.description}
        </div>
      </div>
      {isActive && <CheckIcon className="shrink-0 mt-0.5 text-primary" />}
    </button>
  );
}

function CopyButton({
  getText,
  className,
  children,
}: {
  getText: () => string;
  className?: string;
  children?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(() => {
    const text = getText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [getText]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-fast ease-standard",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {copied ? (
        <>
          <CheckIcon className="text-success" />
          <span>Copied!</span>
        </>
      ) : (
        <>
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
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <span>{children ?? "Copy CSS"}</span>
        </>
      )}
    </button>
  );
}

export interface ThemeCustomizerProps {
  className?: string;
  showCopyButton?: boolean;
  showResetButton?: boolean;
}

export function ThemeCustomizer({
  className,
  showCopyButton = true,
  showResetButton = true,
}: ThemeCustomizerProps) {
  const {
    config,
    setStyle,
    setColorPreset,
    setRadius,
    setFont,
    setShadow,
    setSurfaceStyle,
    setMenuColor,
    setMenuAccent,
    resetConfig,
    isDefault,
    generateCSS,
  } = useThemeCustomizer();

  return (
    <div
      className={cn("space-y-6", className)}
      data-ds=""
      data-ds-component="theme-customizer"
    >
      <Section title="Style">
        <div className="grid grid-cols-1 gap-2">
          {STYLE_PRESETS.map((preset) => (
            <StyleOption
              key={preset.key}
              preset={preset}
              isActive={config.style === preset.key}
              onClick={() => setStyle(preset.key)}
            />
          ))}
        </div>
      </Section>

      <Section title="Color">
        <ColorCombobox
          presets={COLOR_PRESETS}
          activeKey={config.colorPreset}
          onSelect={setColorPreset}
        />
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-2">
          {RADIUS_PRESETS.map((preset) => (
            <RadiusOption
              key={preset.key}
              preset={preset}
              isActive={config.radius === preset.key}
              onClick={() => setRadius(preset.key)}
            />
          ))}
        </div>
      </Section>

      <Section title="Font">
        <FontCombobox
          presets={FONT_PRESETS}
          activeKey={config.font}
          onSelect={setFont}
        />
      </Section>

      <Section title="Shadow">
        <div className="flex flex-wrap gap-2">
          {SHADOW_PRESETS.map((preset) => (
            <PillToggle
              key={preset.key}
              label={preset.name}
              isActive={config.shadow === preset.key}
              onClick={() => setShadow(preset.key)}
              description={preset.description}
            />
          ))}
        </div>
      </Section>

      <Section title="Surface">
        <div className="flex flex-wrap gap-2">
          {SURFACE_STYLE_PRESETS.map((preset) => (
            <PillToggle
              key={preset.key}
              label={preset.name}
              isActive={config.surfaceStyle === preset.key}
              onClick={() => setSurfaceStyle(preset.key)}
              description={preset.description}
            />
          ))}
        </div>
      </Section>

      <Section title="Menu Color">
        <div className="flex flex-wrap gap-2">
          {MENU_COLOR_PRESETS.map((preset) => (
            <PillToggle
              key={preset.key}
              label={preset.name}
              isActive={config.menuColor === preset.key}
              onClick={() => setMenuColor(preset.key)}
              description={preset.description}
            />
          ))}
        </div>
      </Section>

      <Section title="Menu Accent">
        <div className="flex flex-wrap gap-2">
          {MENU_ACCENT_PRESETS.map((preset) => (
            <PillToggle
              key={preset.key}
              label={preset.name}
              isActive={config.menuAccent === preset.key}
              onClick={() => setMenuAccent(preset.key)}
              description={preset.description}
            />
          ))}
        </div>
      </Section>

      {(showCopyButton || showResetButton) && (
        <div className="flex items-center gap-2 border-t border-border pt-4">
          {showCopyButton && (
            <CopyButton getText={generateCSS} className="flex-1" />
          )}
          {showResetButton && !isDefault && (
            <button
              type="button"
              onClick={resetConfig}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-fast ease-standard",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
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
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Reset</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

ThemeCustomizer.displayName = "ThemeCustomizer";
