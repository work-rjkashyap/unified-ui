// src/utils/contrast.ts
var WCAG_AA_NORMAL = 4.5;
var WCAG_AA_LARGE = 3;
var WCAG_AAA_NORMAL = 7;
var WCAG_AAA_LARGE = 4.5;
var WCAG_NON_TEXT_AA = 3;
function linearize(channel) {
  const normalized = channel / 255;
  if (normalized <= 0.04045) {
    return normalized / 12.92;
  }
  return ((normalized + 0.055) / 1.055) ** 2.4;
}
function relativeLuminance(color) {
  const [r, g, b] = color;
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(foreground, background) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function meetsAA(ratio, textSize = "normal") {
  return ratio >= (textSize === "large" ? WCAG_AA_LARGE : WCAG_AA_NORMAL);
}
function meetsAAA(ratio, textSize = "normal") {
  return ratio >= (textSize === "large" ? WCAG_AAA_LARGE : WCAG_AAA_NORMAL);
}
function meetsNonTextAA(ratio) {
  return ratio >= WCAG_NON_TEXT_AA;
}
function parseRGBString(rgbString) {
  const parts = rgbString.trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    throw new Error(
      `Invalid RGB string: "${rgbString}". Expected 3 space-separated integers (0\u2013255).`
    );
  }
  return parts;
}
function toRGBString(color) {
  return `${color[0]} ${color[1]} ${color[2]}`;
}
function parseHex(hex) {
  let cleaned = hex.replace(/^#/, "");
  if (cleaned.length === 3) {
    cleaned = cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
  }
  if (cleaned.length !== 6 || !/^[\da-f]{6}$/i.test(cleaned)) {
    throw new Error(
      `Invalid hex color: "${hex}". Expected a 3- or 6-digit hex string.`
    );
  }
  return [
    Number.parseInt(cleaned.slice(0, 2), 16),
    Number.parseInt(cleaned.slice(2, 4), 16),
    Number.parseInt(cleaned.slice(4, 6), 16)
  ];
}
function checkDSContrast(fgRGBString, bgRGBString) {
  const fg = parseRGBString(fgRGBString);
  const bg = parseRGBString(bgRGBString);
  const ratio = contrastRatio(fg, bg);
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: meetsAA(ratio, "normal"),
    aaLarge: meetsAA(ratio, "large"),
    aaa: meetsAAA(ratio, "normal"),
    aaaLarge: meetsAAA(ratio, "large"),
    nonTextAA: meetsNonTextAA(ratio)
  };
}
function checkHexContrast(fgHex, bgHex) {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  const ratio = contrastRatio(fg, bg);
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: meetsAA(ratio, "normal"),
    aaLarge: meetsAA(ratio, "large"),
    aaa: meetsAAA(ratio, "normal"),
    aaaLarge: meetsAAA(ratio, "large"),
    nonTextAA: meetsNonTextAA(ratio)
  };
}
function auditContrast(pairs) {
  return pairs.map((pair) => {
    const result = checkDSContrast(pair.fg, pair.bg);
    return {
      ...result,
      label: pair.label,
      fg: pair.fg,
      bg: pair.bg
    };
  });
}
var DS_LIGHT_CRITICAL_PAIRS = [
  // Primary text on backgrounds
  { label: "foreground on background", fg: "9 9 11", bg: "255 255 255" },
  { label: "primary on background", fg: "79 70 229", bg: "255 255 255" },
  {
    label: "primary-foreground on primary",
    fg: "255 255 255",
    bg: "79 70 229"
  },
  // Secondary
  { label: "secondary-fg on secondary", fg: "24 24 27", bg: "244 244 245" },
  // Muted (zinc.600 = 82 82 91 — matches CSS --muted-foreground)
  { label: "muted-fg on background", fg: "82 82 91", bg: "255 255 255" },
  { label: "muted-fg on muted", fg: "82 82 91", bg: "244 244 245" },
  // Semantic — foreground on solid bg (dark text on bright semantic colors)
  { label: "success-fg on success", fg: "9 9 11", bg: "22 163 74" },
  { label: "warning-fg on warning", fg: "9 9 11", bg: "245 158 11" },
  { label: "danger-fg on danger", fg: "255 255 255", bg: "220 38 38" },
  { label: "info-fg on info", fg: "255 255 255", bg: "37 99 235" },
  // Semantic — muted text on muted bg
  {
    label: "success-muted-fg on success-muted",
    fg: "21 128 61",
    bg: "240 253 244"
  },
  {
    label: "warning-muted-fg on warning-muted",
    fg: "180 83 9",
    bg: "255 251 235"
  },
  {
    label: "danger-muted-fg on danger-muted",
    fg: "185 28 28",
    bg: "254 242 242"
  },
  {
    label: "info-muted-fg on info-muted",
    fg: "29 78 216",
    bg: "239 246 255"
  },
  // Input (placeholder = zinc.500 = 113 113 122)
  { label: "input-fg on background", fg: "24 24 27", bg: "255 255 255" },
  {
    label: "input-placeholder on background",
    fg: "113 113 122",
    bg: "255 255 255"
  },
  // Disabled (darkened to 120 120 129 for ≥ 3:1 usability target)
  { label: "disabled-fg on disabled", fg: "120 120 129", bg: "244 244 245" },
  {
    label: "disabled-fg on background",
    fg: "120 120 129",
    bg: "255 255 255"
  },
  // Input border (non-text, darkened to 148 148 157 for ≥ 3:1)
  {
    label: "input border on background (non-text)",
    fg: "148 148 157",
    bg: "255 255 255"
  },
  // Border-strong (non-text, darkened to 148 148 157 for ≥ 3:1)
  {
    label: "border-strong on background (non-text)",
    fg: "148 148 157",
    bg: "255 255 255"
  },
  // Focus ring (non-text contrast against background)
  {
    label: "focus-ring on background (non-text)",
    fg: "99 102 241",
    bg: "255 255 255"
  }
];
var DS_DARK_CRITICAL_PAIRS = [
  // Primary text on backgrounds
  { label: "foreground on background", fg: "250 250 250", bg: "9 9 11" },
  // Primary shifted to brand.400 (129 140 248) for AA on dark bg (6.67:1)
  { label: "primary on background", fg: "129 140 248", bg: "9 9 11" },
  {
    // Primary-fg shifted to zinc.900 (24 24 27) for AA on brand.400 (5.94:1)
    label: "primary-foreground on primary",
    fg: "24 24 27",
    bg: "129 140 248"
  },
  // Secondary
  { label: "secondary-fg on secondary", fg: "244 244 245", bg: "39 39 42" },
  // Muted
  { label: "muted-fg on background", fg: "161 161 170", bg: "9 9 11" },
  { label: "muted-fg on muted", fg: "161 161 170", bg: "39 39 42" },
  // Semantic — foreground on solid bg (dark text on bright semantic colors)
  { label: "success-fg on success", fg: "9 9 11", bg: "34 197 94" },
  { label: "warning-fg on warning", fg: "9 9 11", bg: "251 191 36" },
  { label: "danger-fg on danger", fg: "9 9 11", bg: "239 68 68" },
  { label: "info-fg on info", fg: "9 9 11", bg: "96 165 250" },
  // Semantic — muted text on muted bg
  {
    label: "success-muted-fg on success-muted",
    fg: "134 239 172",
    bg: "5 46 22"
  },
  {
    label: "warning-muted-fg on warning-muted",
    fg: "252 211 77",
    bg: "69 26 3"
  },
  {
    label: "danger-muted-fg on danger-muted",
    fg: "252 165 165",
    bg: "69 10 10"
  },
  { label: "info-muted-fg on info-muted", fg: "147 197 253", bg: "23 37 84" },
  // Input (placeholder = 137 137 145 for dark theme)
  { label: "input-fg on background", fg: "250 250 250", bg: "9 9 11" },
  {
    label: "input-placeholder on background",
    fg: "137 137 145",
    bg: "9 9 11"
  },
  // Disabled (lightened to zinc.500 = 113 113 122 for ≥ 3:1 usability target)
  { label: "disabled-fg on disabled", fg: "113 113 122", bg: "39 39 42" },
  { label: "disabled-fg on background", fg: "113 113 122", bg: "9 9 11" },
  // Input border (non-text, lightened to 96 96 105 for ≥ 3:1)
  {
    label: "input border on background (non-text)",
    fg: "96 96 105",
    bg: "9 9 11"
  },
  // Border-strong (non-text, lightened to zinc.500 = 113 113 122 for ≥ 3:1)
  {
    label: "border-strong on background (non-text)",
    fg: "113 113 122",
    bg: "9 9 11"
  },
  // Focus ring (non-text contrast against background)
  {
    label: "focus-ring on background (non-text)",
    fg: "129 140 248",
    bg: "9 9 11"
  }
];

// src/utils/types.ts
function dsDataAttrs(name) {
  return {
    "data-ds": true,
    "data-ds-component": name
  };
}

export { DS_DARK_CRITICAL_PAIRS, DS_LIGHT_CRITICAL_PAIRS, WCAG_AAA_LARGE, WCAG_AAA_NORMAL, WCAG_AA_LARGE, WCAG_AA_NORMAL, WCAG_NON_TEXT_AA, auditContrast, checkDSContrast, checkHexContrast, contrastRatio, dsDataAttrs, meetsAA, meetsAAA, meetsNonTextAA, parseHex, parseRGBString, relativeLuminance, toRGBString };
