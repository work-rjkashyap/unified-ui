"use client";

import { cn } from "@unified-ui/utils/cn";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useThemeCustomizer } from "./customizer-store";
import {
  COLOR_PRESETS,
  FONT_PRESETS,
  type FontPreset,
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

function ColorSwatch({
  preset,
  isActive,
  onClick,
}: {
  preset: (typeof COLOR_PRESETS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-primary bg-muted/60 shadow-sm"
          : "border-border bg-transparent",
      )}
      title={preset.name}
    >
      <span
        className={cn(
          "size-5 shrink-0 rounded-full border shadow-xs",
          isActive
            ? "border-primary/50 ring-2 ring-primary/20"
            : "border-border",
        )}
        style={{ backgroundColor: preset.swatch }}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-sm font-medium",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {preset.name}
      </span>
      {isActive && <CheckIcon className="ml-auto text-primary" />}
    </button>
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

function FontOption({
  preset,
  isActive,
  onClick,
}: {
  preset: FontPreset;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 text-left transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-primary bg-muted/60 shadow-sm"
          : "border-border bg-transparent",
      )}
      title={preset.name}
    >
      <span
        className={cn(
          "text-base font-semibold leading-none",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
        style={{ fontFamily: preset.value }}
      >
        {preset.sample}
      </span>
      <span
        className={cn(
          "text-sm",
          isActive ? "text-foreground font-medium" : "text-muted-foreground",
        )}
      >
        {preset.name}
      </span>
      {isActive && <CheckIcon className="ml-auto text-primary" />}
    </button>
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
        <div className="grid grid-cols-2 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <ColorSwatch
              key={preset.key}
              preset={preset}
              isActive={config.colorPreset === preset.key}
              onClick={() => setColorPreset(preset.key)}
            />
          ))}
        </div>
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
        <div className="grid grid-cols-2 gap-2">
          {FONT_PRESETS.map((preset) => (
            <FontOption
              key={preset.key}
              preset={preset}
              isActive={config.font === preset.key}
              onClick={() => setFont(preset.key)}
            />
          ))}
        </div>
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
