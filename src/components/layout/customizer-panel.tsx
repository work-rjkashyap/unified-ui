"use client";

import {
  COLOR_PRESETS,
  FONT_PRESETS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  SURFACE_STYLE_PRESETS,
  useThemeCustomizer,
} from "@work-rjkashyap/unified-ui";
import {
  Dices,
  Paintbrush,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "text-[11px] font-semibold uppercase tracking-widest text-fd-muted-foreground/70 select-none",
        className,
      )}
    >
      {children}
    </h4>
  );
}

function SectionRow({
  label,
  value,
  icon,
  children,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150",
          "hover:bg-fd-accent/40",
          open && "bg-fd-accent/40",
        )}
      >
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-[10.5px] font-medium uppercase tracking-wider text-fd-muted-foreground/60 leading-none">
            {label}
          </span>
          <span className="text-sm font-semibold text-fd-foreground truncate leading-tight">
            {value}
          </span>
        </div>
        {icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground">
            {icon}
          </span>
        )}
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-fd-muted-foreground/50 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="mt-1 rounded-lg border border-fd-border/60 bg-fd-background p-2 shadow-lg animate-in fade-in-0 slide-in-from-top-1 duration-150">
          {children}
        </div>
      )}
    </div>
  );
}

function ColorOption({
  swatch,
  name,
  isActive,
  onClick,
}: {
  swatch: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-all duration-150",
        "hover:bg-fd-accent/50",
        isActive
          ? "bg-fd-accent/60 text-fd-foreground font-medium"
          : "text-fd-muted-foreground",
      )}
      title={name}
    >
      <span
        className={cn(
          "size-4 shrink-0 rounded-full border shadow-xs",
          isActive
            ? "border-fd-foreground/30 ring-2 ring-fd-primary/30 ring-offset-1 ring-offset-fd-background"
            : "border-fd-border",
        )}
        style={{ backgroundColor: swatch }}
        aria-hidden="true"
      />
      <span className="flex-1 truncate">{name}</span>
      {isActive && <Check className="size-3.5 shrink-0 text-fd-primary" />}
    </button>
  );
}

function RadiusOption({
  label,
  radiusValue,
  isActive,
  onClick,
}: {
  label: string;
  radiusValue: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-md border px-2.5 py-2 transition-all duration-150",
        "hover:border-fd-border-strong hover:bg-fd-accent/30",
        isActive
          ? "border-fd-primary bg-fd-primary/5 shadow-sm"
          : "border-fd-border/60 bg-transparent",
      )}
      title={label}
    >
      <span
        className={cn(
          "size-7 border-2 bg-fd-muted/60",
          isActive ? "border-fd-foreground/40" : "border-fd-foreground/20",
        )}
        style={{ borderRadius: radiusValue }}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-[10px] font-medium leading-none",
          isActive ? "text-fd-foreground" : "text-fd-muted-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}

function FontOption({
  name,
  sample,
  fontValue,
  isActive,
  onClick,
}: {
  name: string;
  sample: string;
  fontValue: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-all duration-150",
        "hover:bg-fd-accent/50",
        isActive
          ? "bg-fd-accent/60 text-fd-foreground font-medium"
          : "text-fd-muted-foreground",
      )}
      title={name}
    >
      <span
        className="text-base font-bold leading-none"
        style={{ fontFamily: fontValue }}
        aria-hidden="true"
      >
        {sample}
      </span>
      <span className="flex-1 text-sm truncate">{name}</span>
      {isActive && <Check className="size-3.5 shrink-0 text-fd-primary" />}
    </button>
  );
}

function PillOption({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-150",
        "hover:border-fd-border-strong hover:bg-fd-accent/30",
        isActive
          ? "border-fd-primary bg-fd-primary/5 text-fd-foreground shadow-sm"
          : "border-fd-border/60 bg-transparent text-fd-muted-foreground",
      )}
    >
      {label}
    </button>
  );
}

function ActionRow({
  label,
  value,
  icon,
  onClick,
  className,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150",
        "hover:bg-fd-accent/40",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-[10.5px] font-medium uppercase tracking-wider text-fd-muted-foreground/60 leading-none">
          {label}
        </span>
        <span className="text-sm font-semibold text-fd-foreground truncate leading-tight">
          {value}
        </span>
      </div>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground">
        {icon}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Customizer Panel (main export)
// ---------------------------------------------------------------------------

export function CustomizerPanel({ className }: { className?: string }) {
  const {
    config,
    setColorPreset,
    setRadius,
    setFont,
    setShadow,
    setSurfaceStyle,
    resetConfig,
    isDefault,
    generateCSS,
  } = useThemeCustomizer();

  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeColor =
    COLOR_PRESETS.find((p) => p.key === config.colorPreset)?.name ?? "Zinc";
  const activeRadius =
    RADIUS_PRESETS.find((r) => r.key === config.radius)?.name ?? "Default";
  const activeFont =
    FONT_PRESETS.find((f) => f.key === config.font)?.name ?? "Outfit";
  const activeShadow =
    SHADOW_PRESETS.find((s) => s.key === config.shadow)?.name ?? "Default";
  const activeSurface =
    SURFACE_STYLE_PRESETS.find((s) => s.key === config.surfaceStyle)?.name ??
    "Bordered";

  const handleShuffle = useCallback(() => {
    setColorPreset(randomItem(COLOR_PRESETS).key);
    setRadius(randomItem(RADIUS_PRESETS).key);
    setFont(randomItem(FONT_PRESETS).key);
    setShadow(randomItem(SHADOW_PRESETS).key);
    setSurfaceStyle(randomItem(SURFACE_STYLE_PRESETS).key);
  }, [setColorPreset, setRadius, setFont, setShadow, setSurfaceStyle]);

  const handleCopy = useCallback(() => {
    const css = generateCSS();
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
      copiedTimeout.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [generateCSS]);

  useEffect(() => {
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    };
  }, []);

  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      data-ds-component="customizer-panel"
    >
      {/* ---- Header ---- */}
      <div className="flex items-center gap-2 px-3 pb-2 mb-1 border-b border-fd-border/40">
        <Paintbrush className="size-4 text-fd-primary" />
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-fd-foreground tracking-wide">
            Customize
          </h3>
          <p className="text-[10px] text-fd-muted-foreground/70 leading-tight">
            Pick a style for your components
          </p>
        </div>
      </div>

      {/* ---- Color ---- */}
      <SectionRow
        label="Color"
        value={activeColor}
        icon={
          <span
            className="size-4 rounded-full border border-fd-border shadow-xs"
            style={{
              backgroundColor:
                COLOR_PRESETS.find((p) => p.key === config.colorPreset)
                  ?.swatch ?? "#71717a",
            }}
          />
        }
      >
        <div className="grid grid-cols-1 gap-0.5 max-h-56 overflow-y-auto hide-scrollbar">
          <SectionHeader className="px-2.5 py-1">Neutral</SectionHeader>
          {COLOR_PRESETS.filter((p) => !p.chromatic).map((preset) => (
            <ColorOption
              key={preset.key}
              swatch={preset.swatch}
              name={preset.name}
              isActive={config.colorPreset === preset.key}
              onClick={() => setColorPreset(preset.key)}
            />
          ))}
          <SectionHeader className="px-2.5 py-1 mt-1">Chromatic</SectionHeader>
          {COLOR_PRESETS.filter((p) => p.chromatic).map((preset) => (
            <ColorOption
              key={preset.key}
              swatch={preset.swatch}
              name={preset.name}
              isActive={config.colorPreset === preset.key}
              onClick={() => setColorPreset(preset.key)}
            />
          ))}
        </div>
      </SectionRow>

      {/* ---- Radius ---- */}
      <SectionRow
        label="Radius"
        value={activeRadius}
        icon={
          <span
            className="size-4 border-2 border-fd-foreground/30 bg-fd-muted/60"
            style={{
              borderRadius:
                RADIUS_PRESETS.find((r) => r.key === config.radius)?.value ??
                "0.625rem",
            }}
          />
        }
      >
        <div className="grid grid-cols-4 gap-1.5 p-1">
          {RADIUS_PRESETS.map((preset) => (
            <RadiusOption
              key={preset.key}
              label={preset.label}
              radiusValue={preset.value}
              isActive={config.radius === preset.key}
              onClick={() => setRadius(preset.key)}
            />
          ))}
        </div>
      </SectionRow>

      {/* ---- Font ---- */}
      <SectionRow
        label="Font"
        value={activeFont}
        icon={
          <span
            className="text-sm font-bold text-fd-foreground/60"
            style={{
              fontFamily:
                FONT_PRESETS.find((f) => f.key === config.font)?.value ??
                "system-ui",
            }}
          >
            Aa
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-0.5">
          {FONT_PRESETS.map((preset) => (
            <FontOption
              key={preset.key}
              name={preset.name}
              sample={preset.sample}
              fontValue={preset.value}
              isActive={config.font === preset.key}
              onClick={() => setFont(preset.key)}
            />
          ))}
        </div>
      </SectionRow>

      {/* ---- Shadow ---- */}
      <SectionRow
        label="Shadow"
        value={activeShadow}
        icon={
          <span className="size-4 rounded bg-fd-muted/60 shadow-md border border-fd-border/30" />
        }
      >
        <div className="flex flex-wrap gap-1.5 p-1">
          {SHADOW_PRESETS.map((preset) => (
            <PillOption
              key={preset.key}
              label={preset.name}
              isActive={config.shadow === preset.key}
              onClick={() => setShadow(preset.key)}
            />
          ))}
        </div>
      </SectionRow>

      {/* ---- Surface ---- */}
      <SectionRow
        label="Surface"
        value={activeSurface}
        icon={
          <span className="size-4 rounded border border-fd-border/50 bg-fd-card" />
        }
      >
        <div className="flex flex-wrap gap-1.5 p-1">
          {SURFACE_STYLE_PRESETS.map((preset) => (
            <PillOption
              key={preset.key}
              label={preset.name}
              isActive={config.surfaceStyle === preset.key}
              onClick={() => setSurfaceStyle(preset.key)}
            />
          ))}
        </div>
      </SectionRow>

      {/* ---- Separator ---- */}
      <div className="mx-3 my-1 border-t border-fd-border/30" />

      {/* ---- Copy CSS ---- */}
      <ActionRow
        label="Copy Theme"
        value={copied ? "Copied!" : "Copy CSS"}
        icon={
          copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )
        }
        onClick={handleCopy}
      />

      {/* ---- Shuffle ---- */}
      <ActionRow
        label="Shuffle"
        value="Try Random"
        icon={<Dices className="size-4" />}
        onClick={handleShuffle}
      />

      {/* ---- Reset ---- */}
      {!isDefault && (
        <ActionRow
          label="Reset"
          value="Start Over"
          icon={<RotateCcw className="size-4" />}
          onClick={resetConfig}
          className="text-fd-muted-foreground hover:bg-fd-danger/5"
        />
      )}
    </div>
  );
}
