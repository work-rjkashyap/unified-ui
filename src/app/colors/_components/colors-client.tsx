"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CopyButton,
    SearchInput,
    Slider,
    Tooltip,
    TooltipProvider,
    ToggleGroup,
    ToggleGroupItem,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@work-rjkashyap/unified-ui";
import {
    Check,
    Copy,
    PaletteIcon,
    ChevronDown,
    ChevronUp,
    Expand,
    Shrink,
    Pipette,
    Layers,
} from "lucide-react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Color palette data (oklch) — sourced from the design system tokens
// ---------------------------------------------------------------------------

const shadeKeys = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
] as const;

type Shade = (typeof shadeKeys)[number];
type PaletteScale = Record<Shade, string>;

interface PaletteEntry {
    name: string;
    shades: PaletteScale;
}

const palettes: PaletteEntry[] = [
    {
        name: "brand",
        shades: {
            "50": "oklch(0.962 0.018 272.314)",
            "100": "oklch(0.93 0.034 272.788)",
            "200": "oklch(0.87 0.065 274.039)",
            "300": "oklch(0.785 0.115 274.713)",
            "400": "oklch(0.673 0.182 276.935)",
            "500": "oklch(0.585 0.233 277.117)",
            "600": "oklch(0.511 0.262 276.966)",
            "700": "oklch(0.457 0.24 277.023)",
            "800": "oklch(0.398 0.195 277.366)",
            "900": "oklch(0.359 0.144 278.697)",
            "950": "oklch(0.257 0.09 281.288)",
        },
    },
    {
        name: "slate",
        shades: {
            "50": "oklch(0.984 0.003 247.858)",
            "100": "oklch(0.968 0.005 247.858)",
            "200": "oklch(0.929 0.013 255.508)",
            "300": "oklch(0.869 0.022 252.894)",
            "400": "oklch(0.704 0.04 256.788)",
            "500": "oklch(0.554 0.046 257.417)",
            "600": "oklch(0.446 0.043 257.281)",
            "700": "oklch(0.372 0.044 257.287)",
            "800": "oklch(0.279 0.041 260.031)",
            "900": "oklch(0.208 0.042 265.755)",
            "950": "oklch(0.129 0.042 264.695)",
        },
    },
    {
        name: "gray",
        shades: {
            "50": "oklch(0.985 0.002 247.839)",
            "100": "oklch(0.967 0.003 264.542)",
            "200": "oklch(0.928 0.006 264.531)",
            "300": "oklch(0.872 0.01 258.338)",
            "400": "oklch(0.707 0.022 261.325)",
            "500": "oklch(0.551 0.027 264.364)",
            "600": "oklch(0.446 0.03 256.802)",
            "700": "oklch(0.373 0.034 259.733)",
            "800": "oklch(0.278 0.033 256.848)",
            "900": "oklch(0.21 0.034 264.665)",
            "950": "oklch(0.13 0.028 261.692)",
        },
    },
    {
        name: "zinc",
        shades: {
            "50": "oklch(0.985 0 0)",
            "100": "oklch(0.97 0 0)",
            "200": "oklch(0.922 0 0)",
            "300": "oklch(0.87 0 0)",
            "400": "oklch(0.708 0 0)",
            "500": "oklch(0.556 0 0)",
            "600": "oklch(0.439 0 0)",
            "700": "oklch(0.371 0 0)",
            "800": "oklch(0.269 0 0)",
            "900": "oklch(0.205 0 0)",
            "950": "oklch(0.145 0 0)",
        },
    },
    {
        name: "red",
        shades: {
            "50": "oklch(0.971 0.013 17.38)",
            "100": "oklch(0.936 0.032 17.717)",
            "200": "oklch(0.885 0.062 18.334)",
            "300": "oklch(0.824 0.121 22.216)",
            "400": "oklch(0.764 0.161 22.216)",
            "500": "oklch(0.704 0.191 22.216)",
            "600": "oklch(0.577 0.245 27.325)",
            "700": "oklch(0.505 0.213 27.325)",
            "800": "oklch(0.444 0.177 27.325)",
            "900": "oklch(0.396 0.141 25.723)",
            "950": "oklch(0.258 0.092 22.216)",
        },
    },
    {
        name: "amber",
        shades: {
            "50": "oklch(0.976 0.037 95.885)",
            "100": "oklch(0.954 0.077 95.885)",
            "200": "oklch(0.924 0.12 95.746)",
            "300": "oklch(0.852 0.154 84.101)",
            "400": "oklch(0.828 0.189 84.429)",
            "500": "oklch(0.769 0.188 70.08)",
            "600": "oklch(0.666 0.179 58.318)",
            "700": "oklch(0.554 0.135 66.442)",
            "800": "oklch(0.473 0.108 67.047)",
            "900": "oklch(0.414 0.09 67.047)",
            "950": "oklch(0.32 0.084 57.263)",
        },
    },
    {
        name: "green",
        shades: {
            "50": "oklch(0.962 0.044 156.743)",
            "100": "oklch(0.923 0.074 155.995)",
            "200": "oklch(0.863 0.126 155.995)",
            "300": "oklch(0.765 0.166 150.261)",
            "400": "oklch(0.692 0.194 149.214)",
            "500": "oklch(0.627 0.194 149.214)",
            "600": "oklch(0.546 0.176 142.495)",
            "700": "oklch(0.448 0.15 148.335)",
            "800": "oklch(0.384 0.122 150.261)",
            "900": "oklch(0.335 0.1 152.535)",
            "950": "oklch(0.226 0.083 153.921)",
        },
    },
    {
        name: "teal",
        shades: {
            "50": "oklch(0.962 0.044 172.166)",
            "100": "oklch(0.926 0.079 172.166)",
            "200": "oklch(0.872 0.125 172.166)",
            "300": "oklch(0.793 0.148 172.166)",
            "400": "oklch(0.722 0.152 172.166)",
            "500": "oklch(0.627 0.141 175.066)",
            "600": "oklch(0.526 0.12 175.066)",
            "700": "oklch(0.437 0.095 175.066)",
            "800": "oklch(0.372 0.078 175.066)",
            "900": "oklch(0.326 0.064 175.066)",
            "950": "oklch(0.232 0.051 175.066)",
        },
    },
    {
        name: "blue",
        shades: {
            "50": "oklch(0.962 0.018 254.128)",
            "100": "oklch(0.932 0.032 255.585)",
            "200": "oklch(0.882 0.059 254.128)",
            "300": "oklch(0.789 0.116 254.128)",
            "400": "oklch(0.682 0.155 254.128)",
            "500": "oklch(0.623 0.214 259.815)",
            "600": "oklch(0.546 0.245 262.881)",
            "700": "oklch(0.488 0.217 264.376)",
            "800": "oklch(0.424 0.177 264.376)",
            "900": "oklch(0.379 0.146 265.522)",
            "950": "oklch(0.246 0.098 264.376)",
        },
    },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isDark(oklch: string): boolean {
    const match = oklch.match(/oklch\(([\d.]+)/);
    if (!match) return false;
    return Number.parseFloat(match[1]) < 0.55;
}

// ---------------------------------------------------------------------------
// Copy hook
// ---------------------------------------------------------------------------

function useCopy(timeout = 1500) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const copy = useCallback(
        (key: string, text: string) => {
            navigator.clipboard.writeText(text);
            setCopiedKey(key);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopiedKey(null), timeout);
        },
        [timeout],
    );

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return { copiedKey, copy };
}

// ---------------------------------------------------------------------------
// Color format
// ---------------------------------------------------------------------------

type ColorFormat = "oklch" | "hex" | "rgb";

function oklchToHex(oklch: string): string {
    if (typeof document === "undefined") return oklch;
    try {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return oklch;
        ctx.fillStyle = oklch;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } catch {
        return oklch;
    }
}

function oklchToRgb(oklch: string): string {
    if (typeof document === "undefined") return oklch;
    try {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return oklch;
        ctx.fillStyle = oklch;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return `rgb(${r}, ${g}, ${b})`;
    } catch {
        return oklch;
    }
}

function formatColor(oklch: string, format: ColorFormat): string {
    switch (format) {
        case "oklch":
            return oklch;
        case "hex":
            return oklchToHex(oklch);
        case "rgb":
            return oklchToRgb(oklch);
        default:
            return oklch;
    }
}

function shortFormatColor(oklch: string, format: ColorFormat): string {
    const value = formatColor(oklch, format);
    if (format === "oklch") {
        return value.replace("oklch(", "").replace(")", "");
    }
    return value;
}

// ---------------------------------------------------------------------------
// Swatch component
// ---------------------------------------------------------------------------

function Swatch({
    paletteName,
    shade,
    value,
    format,
    copiedKey,
    onCopy,
}: {
    paletteName: string;
    shade: Shade;
    value: string;
    format: ColorFormat;
    copiedKey: string | null;
    onCopy: (key: string, text: string) => void;
}) {
    const key = `${paletteName}-${shade}`;
    const isCopied = copiedKey === key;
    const dark = isDark(value);
    const displayValue = formatColor(value, format);

    return (
        <Tooltip content={`${paletteName}-${shade} · Click to copy`}>
            <button
                type="button"
                onClick={() => onCopy(key, displayValue)}
                className="group/swatch relative w-full h-full flex flex-col items-center justify-center rounded-lg transition-[transform,box-shadow] duration-200 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                style={{ backgroundColor: value }}
            >
                <span
                    className={cn(
                        "text-sm font-semibold tabular-nums transition-opacity duration-150",
                        isCopied && "opacity-0",
                        dark ? "text-white/90" : "text-black/70",
                    )}
                >
                    {shade}
                </span>
                <span
                    className={cn(
                        "absolute inset-0 z-20 flex items-center justify-center rounded-lg transition-opacity duration-150",
                        isCopied
                            ? "opacity-100"
                            : "opacity-0 group-hover/swatch:opacity-100",
                        dark
                            ? "bg-black/30 text-white"
                            : "bg-white/40 text-black/80",
                    )}
                >
                    <span
                        className={cn(
                            "flex items-center justify-center rounded-md p-1.5",
                            dark
                                ? "bg-black/40 backdrop-blur-sm"
                                : "bg-white/60 backdrop-blur-sm",
                        )}
                    >
                        {isCopied ? (
                            <Check className="size-4" strokeWidth={2.5} />
                        ) : (
                            <Copy className="size-3.5" strokeWidth={2} />
                        )}
                    </span>
                </span>
            </button>
        </Tooltip>
    );
}

// ---------------------------------------------------------------------------
// Palette row component
// ---------------------------------------------------------------------------

function PaletteRow({
    palette,
    format,
    copiedKey,
    onCopy,
    expanded,
    onToggleExpand,
}: {
    palette: PaletteEntry;
    format: ColorFormat;
    copiedKey: string | null;
    onCopy: (key: string, text: string) => void;
    expanded: boolean;
    onToggleExpand: () => void;
}) {
    const allValues = useMemo(() => {
        return shadeKeys
            .map((shade) => {
                const val = formatColor(palette.shades[shade], format);
                return `  --${palette.name}-${shade}: ${val};`;
            })
            .join("\n");
    }, [palette, format]);

    const cssBlock = `:root {\n${allValues}\n}`;

    return (
        <div
            className="relative"
            style={{
                contentVisibility: "auto",
                containIntrinsicSize: "auto 80px",
            }}
        >
            {/* Row header */}
            <div className="flex items-center gap-3 mb-2.5">
                <span
                    className="size-4 rounded-full ring-1 ring-border shrink-0"
                    style={{ backgroundColor: palette.shades["500"] }}
                />
                <span className="text-base font-semibold text-foreground capitalize tracking-tight">
                    {palette.name}
                </span>
                <Badge variant="outline" size="md">
                    {format}
                </Badge>

                <div className="ml-auto flex items-center gap-1 relative z-40">
                    <CopyButton
                        text={cssBlock}
                        size="sm"
                        variant="ghost"
                        tooltip="Copy CSS variables"
                    />
                    <Tooltip content={expanded ? "Collapse" : "Show values"}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleExpand}
                            iconLeft={
                                expanded ? (
                                    <ChevronUp className="size-4" />
                                ) : (
                                    <ChevronDown className="size-4" />
                                )
                            }
                            className="h-8 w-8 p-0"
                        />
                    </Tooltip>
                </div>
            </div>

            {/* Shade swatches */}
            <div className="grid grid-cols-11 gap-2 overflow-visible">
                {shadeKeys.map((shade) => (
                    <div
                        key={shade}
                        className="aspect-square sm:aspect-[2/1.4] relative overflow-visible transition-[z-index] duration-instant hover:z-50 focus-within:z-50 [&:has(:focus-visible)]:z-50"
                    >
                        <Swatch
                            paletteName={palette.name}
                            shade={shade}
                            value={palette.shades[shade]}
                            format={format}
                            copiedKey={copiedKey}
                            onCopy={onCopy}
                        />
                    </div>
                ))}
            </div>

            {/* Expanded values */}
            {expanded && (
                <div className="grid grid-cols-11 gap-2 mt-2">
                    {shadeKeys.map((shade) => {
                        const displayValue = shortFormatColor(
                            palette.shades[shade],
                            format,
                        );
                        return (
                            <Tooltip
                                key={shade}
                                content={`Copy ${formatColor(palette.shades[shade], format)}`}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        onCopy(
                                            `${palette.name}-${shade}-val`,
                                            formatColor(
                                                palette.shades[shade],
                                                format,
                                            ),
                                        )
                                    }
                                    className="text-xs font-mono text-muted-foreground truncate text-center hover:text-foreground transition-colors cursor-pointer leading-normal py-1"
                                >
                                    {displayValue}
                                </button>
                            </Tooltip>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Color generator section
// ---------------------------------------------------------------------------

function generatePaletteFromHue(hue: number, chroma: number): PaletteScale {
    const lightnesses: Record<Shade, number> = {
        "50": 0.97,
        "100": 0.935,
        "200": 0.88,
        "300": 0.795,
        "400": 0.69,
        "500": 0.59,
        "600": 0.5,
        "700": 0.42,
        "800": 0.36,
        "900": 0.3,
        "950": 0.22,
    };

    const chromaScale: Record<Shade, number> = {
        "50": 0.015,
        "100": 0.04,
        "200": 0.08,
        "300": 0.13,
        "400": 0.18,
        "500": 1.0,
        "600": 0.95,
        "700": 0.8,
        "800": 0.65,
        "900": 0.5,
        "950": 0.35,
    };

    const result = {} as Record<Shade, string>;
    for (const shade of shadeKeys) {
        const l = lightnesses[shade];
        const c = chroma * chromaScale[shade];
        result[shade] =
            `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${hue.toFixed(1)})`;
    }
    return result;
}

function ColorGenerator({
    format,
    copiedKey,
    onCopy,
}: {
    format: ColorFormat;
    copiedKey: string | null;
    onCopy: (key: string, text: string) => void;
}) {
    const [hue, setHue] = useState(264);
    const [chroma, setChroma] = useState(0.2);
    const generated = useMemo(
        () => generatePaletteFromHue(hue, chroma),
        [hue, chroma],
    );

    const cssBlock = useMemo(() => {
        const lines = shadeKeys.map((shade) => {
            const value = formatColor(generated[shade], format);
            return `  --custom-${shade}: ${value};`;
        });
        return `:root {\n${lines.join("\n")}\n}`;
    }, [generated, format]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <Pipette className="size-5 text-muted-foreground" />
                    <span className="text-lg font-semibold text-foreground tracking-tight">
                        Generate
                    </span>
                </div>
                <CopyButton
                    text={cssBlock}
                    size="md"
                    tooltip="Copy CSS variables"
                />
            </CardHeader>
            <CardBody className="space-y-5">
                <p className="text-sm text-muted-foreground -mt-1">
                    Pick a hue and chroma to instantly generate a full oklch
                    color ramp.
                </p>

                {/* Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-muted-foreground">
                                Hue
                            </label>
                            <Badge variant="outline" size="md">
                                {hue}°
                            </Badge>
                        </div>
                        <div
                            className="rounded-lg p-1"
                            style={{
                                background: `linear-gradient(to right, ${Array.from({ length: 37 }, (_, i) => `oklch(0.65 0.2 ${i * 10})`).join(", ")})`,
                            }}
                        >
                            <Slider
                                min={0}
                                max={360}
                                step={1}
                                value={[hue]}
                                onValueChange={(v) => setHue(v[0])}
                                size="md"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-muted-foreground">
                                Chroma
                            </label>
                            <Badge variant="outline" size="md">
                                {chroma.toFixed(2)}
                            </Badge>
                        </div>
                        <Slider
                            min={1}
                            max={37}
                            step={1}
                            value={[Math.round(chroma * 100)]}
                            onValueChange={(v) => setChroma(v[0] / 100)}
                            size="md"
                        />
                    </div>
                </div>

                {/* Preview */}
                <div>
                    <div className="flex items-center gap-3 mb-2.5">
                        <span
                            className="size-4 rounded-full ring-1 ring-border shrink-0"
                            style={{ backgroundColor: generated["500"] }}
                        />
                        <span className="text-base font-semibold text-foreground tracking-tight">
                            custom
                        </span>
                        <Badge variant="outline" size="md">
                            {format}
                        </Badge>
                    </div>
                    <div className="grid grid-cols-11 gap-2 overflow-visible">
                        {shadeKeys.map((shade) => (
                            <div
                                key={shade}
                                className="aspect-square sm:aspect-[2/1.4] relative overflow-visible transition-[z-index] duration-instant hover:z-50 focus-within:z-50 [&:has(:focus-visible)]:z-50"
                            >
                                <Swatch
                                    paletteName="custom"
                                    shade={shade}
                                    value={generated[shade]}
                                    format={format}
                                    copiedKey={copiedKey}
                                    onCopy={onCopy}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-11 gap-2 mt-2">
                        {shadeKeys.map((shade) => {
                            const displayValue = shortFormatColor(
                                generated[shade],
                                format,
                            );
                            return (
                                <Tooltip
                                    key={shade}
                                    content={`Copy ${formatColor(generated[shade], format)}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onCopy(
                                                `custom-${shade}-val`,
                                                formatColor(
                                                    generated[shade],
                                                    format,
                                                ),
                                            )
                                        }
                                        className="text-xs font-mono text-muted-foreground truncate text-center hover:text-foreground transition-colors cursor-pointer leading-normal py-1"
                                    >
                                        {displayValue}
                                    </button>
                                </Tooltip>
                            );
                        })}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Semantic tokens section
// ---------------------------------------------------------------------------

const semanticTokens = [
    { name: "primary", css: "var(--primary)", className: "bg-primary" },
    { name: "secondary", css: "var(--secondary)", className: "bg-secondary" },
    { name: "accent", css: "var(--accent)", className: "bg-accent" },
    { name: "muted", css: "var(--muted)", className: "bg-muted" },
    {
        name: "background",
        css: "var(--background)",
        className: "bg-background",
    },
    { name: "card", css: "var(--card)", className: "bg-card" },
    { name: "border", css: "var(--border)", className: "bg-border" },
    {
        name: "foreground",
        css: "var(--foreground)",
        className: "bg-foreground",
    },
    { name: "popover", css: "var(--popover)", className: "bg-popover" },
    { name: "ring", css: "var(--ring)", className: "bg-ring" },
];

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ColorsClient() {
    const { copiedKey, copy } = useCopy(1500);
    const [search, setSearch] = useState("");
    const [format, setFormat] = useState<ColorFormat>("oklch");
    const [expandedPalettes, setExpandedPalettes] = useState<Set<string>>(
        new Set(),
    );

    const toggleExpand = useCallback((name: string) => {
        setExpandedPalettes((prev) => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    }, []);

    const expandAll = useCallback(() => {
        setExpandedPalettes(new Set(palettes.map((p) => p.name)));
    }, []);

    const collapseAll = useCallback(() => {
        setExpandedPalettes(new Set());
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return palettes;
        const q = search.toLowerCase().trim();
        return palettes.filter((p) => p.name.toLowerCase().includes(q));
    }, [search]);

    const allExpanded =
        expandedPalettes.size === filtered.length && filtered.length > 0;

    return (
        <TooltipProvider delayDuration={200}>
            <div>
                {/* ── Tabs: Palettes / Generate / Semantic ── */}
                <Tabs defaultValue="palettes">
                    <TabsList className="mb-6">
                        <TabsTrigger value="palettes">
                            <PaletteIcon className="size-4 mr-1.5" />
                            Palettes
                        </TabsTrigger>
                        <TabsTrigger value="generate">
                            <Pipette className="size-4 mr-1.5" />
                            Generate
                        </TabsTrigger>
                        <TabsTrigger value="semantic">
                            <Layers className="size-4 mr-1.5" />
                            Semantic
                        </TabsTrigger>
                    </TabsList>

                    {/* ══════════════════════════════════════════════════════ */}
                    {/* Palettes Tab                                          */}
                    {/* ══════════════════════════════════════════════════════ */}
                    <TabsContent value="palettes">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                            <div className="max-w-xs w-full">
                                <SearchInput
                                    placeholder="Search palettes…"
                                    value={search}
                                    onChange={setSearch}
                                    size="md"
                                    showClear
                                />
                            </div>

                            {/* Format toggle */}
                            <ToggleGroup
                                type="single"
                                variant="outline"
                                size="md"
                                value={format}
                                onValueChange={(v) => {
                                    if (v) setFormat(v as ColorFormat);
                                }}
                            >
                                <ToggleGroupItem value="oklch">
                                    oklch
                                </ToggleGroupItem>
                                <ToggleGroupItem value="hex">
                                    hex
                                </ToggleGroupItem>
                                <ToggleGroupItem value="rgb">
                                    rgb
                                </ToggleGroupItem>
                            </ToggleGroup>

                            {/* Expand / Collapse */}
                            <Tooltip
                                content={
                                    allExpanded ? "Collapse all" : "Expand all"
                                }
                            >
                                <Button
                                    variant="secondary"
                                    size="md"
                                    onClick={
                                        allExpanded ? collapseAll : expandAll
                                    }
                                    iconLeft={
                                        allExpanded ? (
                                            <Shrink className="size-4" />
                                        ) : (
                                            <Expand className="size-4" />
                                        )
                                    }
                                >
                                    {allExpanded ? "Collapse" : "Expand all"}
                                </Button>
                            </Tooltip>
                        </div>

                        {/* Shade labels */}
                        <div className="grid grid-cols-11 gap-2 mb-2">
                            {shadeKeys.map((shade) => (
                                <div
                                    key={shade}
                                    className="text-center text-sm font-semibold text-muted-foreground tabular-nums"
                                >
                                    {shade}
                                </div>
                            ))}
                        </div>

                        {/* Palette rows */}
                        <div className="space-y-8">
                            {filtered.length === 0 && (
                                <Card>
                                    <CardBody className="text-center py-10">
                                        <p className="text-sm text-muted-foreground">
                                            No palettes match &ldquo;{search}
                                            &rdquo;.
                                        </p>
                                    </CardBody>
                                </Card>
                            )}

                            {filtered.map((palette) => (
                                <PaletteRow
                                    key={palette.name}
                                    palette={palette}
                                    format={format}
                                    copiedKey={copiedKey}
                                    onCopy={copy}
                                    expanded={expandedPalettes.has(
                                        palette.name,
                                    )}
                                    onToggleExpand={() =>
                                        toggleExpand(palette.name)
                                    }
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* ══════════════════════════════════════════════════════ */}
                    {/* Generate Tab                                          */}
                    {/* ══════════════════════════════════════════════════════ */}
                    <TabsContent value="generate">
                        <ColorGenerator
                            format={format}
                            copiedKey={copiedKey}
                            onCopy={copy}
                        />

                        {/* Quick format switcher below generator too */}
                        <div className="flex items-center gap-2 mt-4">
                            <span className="text-sm text-muted-foreground font-medium">
                                Output format:
                            </span>
                            <ToggleGroup
                                type="single"
                                variant="outline"
                                size="md"
                                value={format}
                                onValueChange={(v) => {
                                    if (v) setFormat(v as ColorFormat);
                                }}
                            >
                                <ToggleGroupItem value="oklch">
                                    oklch
                                </ToggleGroupItem>
                                <ToggleGroupItem value="hex">
                                    hex
                                </ToggleGroupItem>
                                <ToggleGroupItem value="rgb">
                                    rgb
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </TabsContent>

                    {/* ══════════════════════════════════════════════════════ */}
                    {/* Semantic Tab                                          */}
                    {/* ══════════════════════════════════════════════════════ */}
                    <TabsContent value="semantic">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground max-w-xl">
                                These tokens map intent to color. They
                                automatically adapt between light and dark
                                themes via CSS custom properties.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {semanticTokens.map((token) => (
                                    <Card
                                        key={token.name}
                                        variant="interactive"
                                        className="cursor-pointer group relative"
                                        onClick={() =>
                                            copy(
                                                `semantic-${token.name}`,
                                                token.css,
                                            )
                                        }
                                    >
                                        <CardBody className="flex flex-col items-center text-center gap-3 p-4">
                                            {/* Copy indicator — top right */}
                                            <span className="absolute top-3 right-3 z-10">
                                                {copiedKey ===
                                                    `semantic-${token.name}` ? (
                                                    <Check className="size-4 text-green-500" />
                                                ) : (
                                                    <Copy className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </span>

                                            {/* Color swatch */}
                                            <span
                                                className={cn(
                                                    "size-12 rounded-lg shrink-0 ring-1 ring-border",
                                                    token.className,
                                                )}
                                            />

                                            {/* Token info */}
                                            <div className="w-full min-w-0">
                                                <div className="text-sm font-semibold text-foreground truncate">
                                                    {token.name}
                                                </div>
                                                <div className="text-xs font-mono text-muted-foreground truncate mt-0.5">
                                                    {token.css}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>

                            {/* All semantic tokens as copyable CSS block */}
                            <Card className="mt-4">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <span className="text-sm font-semibold">
                                        All semantic CSS variables
                                    </span>
                                    <CopyButton
                                        text={semanticTokens
                                            .map(
                                                (t) =>
                                                    `  ${t.css.replace("var(", "--").replace(")", "")}: /* your value */;`,
                                            )
                                            .join("\n")}
                                        size="md"
                                        variant="ghost"
                                        tooltip="Copy all"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <pre className="text-sm font-mono text-muted-foreground overflow-x-auto leading-relaxed">
                                        {semanticTokens
                                            .map(
                                                (t) =>
                                                    `${t.css.replace("var(", "--").replace(")", "")}: ...;`,
                                            )
                                            .join("\n")}
                                    </pre>
                                </CardBody>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* ── Toast notification ── */}
                <div
                    className={cn(
                        "fixed bottom-6 left-1/2 -translate-x-1/2 z-100 transition-all duration-300 pointer-events-none",
                        copiedKey
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2",
                    )}
                >
                    <Badge
                        variant="default"
                        size="md"
                        icon={<Check className="size-4" />}
                    >
                        Copied to clipboard
                    </Badge>
                </div>
            </div>
        </TooltipProvider>
    );
}
