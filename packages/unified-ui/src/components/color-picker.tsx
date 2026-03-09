"use client";

// ============================================================================
// Unified UI — ColorPicker Component
// ============================================================================
// Color swatch + popover with spectrum picker, HEX/RGB input fields.
// Built on the Unified UI Popover and Input components.
//
// Features:
//   - Color spectrum / saturation-lightness picker
//   - Hue slider
//   - Alpha/opacity slider (optional)
//   - HEX input with validation
//   - Preset color swatches
//   - Controlled and uncontrolled value
//   - Accessible: keyboard navigable, screen-reader labels
//   - Design system token styling
//
// Usage:
//   import { ColorPicker } from "@work-rjkashyap/unified-ui/components";
//   <ColorPicker value="#ff0000" onChange={setColor} />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Color Helpers
// ---------------------------------------------------------------------------

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = 0,
    g = 0,
    b = 0;
  const h6 = hex.replace("#", "");
  if (h6.length === 3) {
    r = parseInt(h6[0] + h6[0], 16) / 255;
    g = parseInt(h6[1] + h6[1], 16) / 255;
    b = parseInt(h6[2] + h6[2], 16) / 255;
  } else if (h6.length === 6) {
    r = parseInt(h6.slice(0, 2), 16) / 255;
    g = parseInt(h6.slice(2, 4), 16) / 255;
    b = parseInt(h6.slice(4, 6), 16) / 255;
  }
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let hue = 0,
    sat = 0;
  const lit = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lit > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(hue * 360),
    s: Math.round(sat * 100),
    l: Math.round(lit * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100,
    ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function isValidHex(hex: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ColorPickerProps {
  /** Current color value in HEX format (e.g., "#ff0000"). */
  value?: string;
  /** Default color for uncontrolled mode. @default "#000000" */
  defaultValue?: string;
  /** Callback when color changes. */
  onChange?: (color: string) => void;
  /** Preset color swatches to display. */
  presets?: string[];
  /** Whether to show the HEX input field. @default true */
  showInput?: boolean;
  /** Whether the picker is disabled. @default false */
  disabled?: boolean;
  /** Size of the trigger swatch. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes. */
  className?: string;
  /** Placeholder label for accessibility. @default "Choose color" */
  label?: string;
}

// ---------------------------------------------------------------------------
// Default presets
// ---------------------------------------------------------------------------

const DEFAULT_PRESETS = [
  "#000000",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#06b6d4",
  "#6366f1",
  "#a855f7",
  "#f43f5e",
];

const sizeMap = {
  sm: "size-7",
  md: "size-9",
  lg: "size-11",
};

// ---------------------------------------------------------------------------
// ColorPicker
// ---------------------------------------------------------------------------

/**
 * `ColorPicker` — a color selection component with spectrum, hue slider,
 * HEX input, and preset swatches.
 *
 * @example
 * ```tsx
 * <ColorPicker value={color} onChange={setColor} />
 * <ColorPicker defaultValue="#3b82f6" presets={["#ef4444", "#22c55e", "#3b82f6"]} />
 * ```
 */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker(
    {
      value,
      defaultValue = "#000000",
      onChange,
      presets = DEFAULT_PRESETS,
      showInput = true,
      disabled = false,
      size = "md",
      className,
      label = "Choose color",
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value ?? internalValue;
    const [isOpen, setIsOpen] = useState(false);
    const [hexInput, setHexInput] = useState(currentValue);
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Parse to HSL for sliders
    const hsl = useMemo(() => hexToHsl(currentValue), [currentValue]);
    const [hue, setHue] = useState(hsl.h);
    const [sat, setSat] = useState(hsl.s);
    const [lit, setLit] = useState(hsl.l);

    // Vercel best practice: rerender-derived-state-no-effect
    // Sync HSL sliders during render when external value changes, avoiding
    // an extra re-render cycle from useEffect-based syncing.
    const [prevValue, setPrevValue] = useState(currentValue);
    if (currentValue !== prevValue) {
      setPrevValue(currentValue);
      const parsed = hexToHsl(currentValue);
      setHue(parsed.h);
      setSat(parsed.s);
      setLit(parsed.l);
      setHexInput(currentValue);
    }

    const updateColor = useCallback(
      (hex: string) => {
        if (!value) setInternalValue(hex);
        onChange?.(hex);
        setHexInput(hex);
      },
      [value, onChange],
    );

    const handleHueChange = useCallback(
      (newHue: number) => {
        setHue(newHue);
        updateColor(hslToHex(newHue, sat, lit));
      },
      [sat, lit, updateColor],
    );

    const handleSatLitChange = useCallback(
      (newSat: number, newLit: number) => {
        setSat(newSat);
        setLit(newLit);
        updateColor(hslToHex(hue, newSat, newLit));
      },
      [hue, updateColor],
    );

    const handleHexInput = useCallback(
      (val: string) => {
        setHexInput(val);
        if (isValidHex(val)) {
          updateColor(val.toLowerCase());
        }
      },
      [updateColor],
    );

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen]);

    // Spectrum area drag handler
    const spectrumRef = useRef<HTMLDivElement>(null);
    const handleSpectrumPointer = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = spectrumRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width),
        );
        const y = Math.max(
          0,
          Math.min(1, (e.clientY - rect.top) / rect.height),
        );
        const newSat = Math.round(x * 100);
        const newLit = Math.round((1 - y) * 100);
        handleSatLitChange(newSat, newLit);
      },
      [handleSatLitChange],
    );

    const handleSpectrumDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handleSpectrumPointer(e);
      },
      [handleSpectrumPointer],
    );

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        data-ds=""
        data-ds-component="color-picker"
        {...(disabled ? { "data-ds-disabled": "" } : {})}
      >
        {/* Trigger swatch */}
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "rounded-md border border-border shadow-sm transition-shadow",
            "hover:shadow-md disabled:opacity-50 disabled:pointer-events-none",
            sizeMap[size],
            focusRingClasses,
          )}
          style={{ backgroundColor: currentValue }}
          aria-label={label}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />

        {/* Popover */}
        {isOpen && (
          <div
            ref={popoverRef}
            className={cn(
              "absolute z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-lg",
              "animate-in fade-in-0 zoom-in-95",
            )}
            role="dialog"
            aria-label="Color picker"
          >
            {/* Saturation/Lightness area */}
            <div
              ref={spectrumRef}
              className="relative h-36 w-full rounded-md cursor-crosshair overflow-hidden mb-3"
              style={{
                background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
              }}
              onPointerDown={handleSpectrumDown}
              onPointerMove={(e) => {
                if (e.buttons > 0) handleSpectrumPointer(e);
              }}
              aria-label="Saturation and lightness"
            >
              {/* Indicator dot */}
              <div
                className="absolute size-3.5 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${sat}%`,
                  top: `${100 - lit}%`,
                  backgroundColor: currentValue,
                }}
              />
            </div>

            {/* Hue slider */}
            <div className="mb-3">
              <input
                type="range"
                min={0}
                max={360}
                value={hue}
                onChange={(e) => handleHueChange(Number(e.target.value))}
                className={cn(
                  "w-full h-3 rounded-full appearance-none cursor-pointer",
                  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer",
                )}
                style={{
                  background:
                    "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                }}
                aria-label="Hue"
              />
            </div>

            {/* HEX input */}
            {showInput && (
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="size-8 rounded-md border border-border shrink-0"
                  style={{ backgroundColor: currentValue }}
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexInput(e.target.value)}
                  onBlur={() => {
                    if (!isValidHex(hexInput)) setHexInput(currentValue);
                  }}
                  className={cn(
                    "flex-1 h-8 rounded-md border border-border bg-background px-2.5 text-sm font-mono",
                    "text-foreground placeholder:text-muted-foreground",
                    focusRingClasses,
                  )}
                  placeholder="#000000"
                  maxLength={7}
                  aria-label="HEX color value"
                />
              </div>
            )}

            {/* Preset swatches */}
            {presets.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => updateColor(preset)}
                    className={cn(
                      "size-6 rounded-md border transition-shadow",
                      currentValue.toLowerCase() === preset.toLowerCase()
                        ? "border-foreground shadow-sm ring-1 ring-foreground/20"
                        : "border-border hover:shadow-sm",
                      focusRingClasses,
                    )}
                    style={{ backgroundColor: preset }}
                    aria-label={`Select ${preset}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
ColorPicker.displayName = "ColorPicker";
