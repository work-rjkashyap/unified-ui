// ============================================================================
// Unified UI — Color Tokens
// ============================================================================
// All color values are defined as RGB channel strings (e.g. "15 23 42")
// so they can be used with Tailwind's opacity modifier: bg-primary/50
//
// NEVER use these values directly in components. They are consumed by
// the theme layer which maps them to CSS custom properties.
// ============================================================================

// ---------------------------------------------------------------------------
// Base Palette — raw color ramps from 50 → 950
// ---------------------------------------------------------------------------

export const slate = {
	50: "248 250 252",
	100: "241 245 249",
	200: "226 232 240",
	300: "203 213 225",
	400: "148 163 184",
	500: "100 116 139",
	600: "71 85 105",
	700: "51 65 85",
	800: "30 41 59",
	900: "15 23 42",
	950: "2 6 23",
} as const;

export const gray = {
	50: "249 250 251",
	100: "243 244 246",
	200: "229 231 235",
	300: "209 213 219",
	400: "156 163 175",
	500: "107 114 128",
	600: "75 85 99",
	700: "55 65 81",
	800: "31 41 55",
	900: "17 24 39",
	950: "3 7 18",
} as const;

export const zinc = {
	50: "250 250 250",
	100: "244 244 245",
	200: "228 228 231",
	300: "212 212 216",
	400: "161 161 170",
	500: "113 113 122",
	600: "82 82 91",
	700: "63 63 70",
	800: "39 39 42",
	900: "24 24 27",
	950: "9 9 11",
} as const;

// ---------------------------------------------------------------------------
// Brand Palette — your product identity
// ---------------------------------------------------------------------------

export const brand = {
	50: "238 242 255",
	100: "224 231 255",
	200: "199 210 254",
	300: "165 180 252",
	400: "129 140 248",
	500: "99 102 241",
	600: "79 70 229",
	700: "67 56 202",
	800: "55 48 163",
	900: "49 46 129",
	950: "30 27 75",
} as const;

// ---------------------------------------------------------------------------
// Semantic Palettes — purpose-driven color scales
// ---------------------------------------------------------------------------

export const blue = {
	50: "239 246 255",
	100: "219 234 254",
	200: "191 219 254",
	300: "147 197 253",
	400: "96 165 250",
	500: "59 130 246",
	600: "37 99 235",
	700: "29 78 216",
	800: "30 64 175",
	900: "30 58 138",
	950: "23 37 84",
} as const;

export const green = {
	50: "240 253 244",
	100: "220 252 231",
	200: "187 247 208",
	300: "134 239 172",
	400: "74 222 128",
	500: "34 197 94",
	600: "22 163 74",
	700: "21 128 61",
	800: "22 101 52",
	900: "20 83 45",
	950: "5 46 22",
} as const;

export const amber = {
	50: "255 251 235",
	100: "254 243 199",
	200: "253 230 138",
	300: "252 211 77",
	400: "251 191 36",
	500: "245 158 11",
	600: "217 119 6",
	700: "180 83 9",
	800: "146 64 14",
	900: "120 53 15",
	950: "69 26 3",
} as const;

export const red = {
	50: "254 242 242",
	100: "254 226 226",
	200: "254 202 202",
	300: "252 165 165",
	400: "248 113 113",
	500: "239 68 68",
	600: "220 38 38",
	700: "185 28 28",
	800: "153 27 27",
	900: "127 29 29",
	950: "69 10 10",
} as const;

export const teal = {
	50: "240 253 250",
	100: "204 251 241",
	200: "153 246 228",
	300: "94 234 212",
	400: "45 212 191",
	500: "20 184 166",
	600: "13 148 136",
	700: "15 118 110",
	800: "17 94 89",
	900: "19 78 74",
	950: "4 47 46",
} as const;

// ---------------------------------------------------------------------------
// Pure values — black, white, transparent
// ---------------------------------------------------------------------------

export const pure = {
	white: "255 255 255",
	black: "0 0 0",
	transparent: "transparent",
} as const;

// ---------------------------------------------------------------------------
// Neutral Scale — the workhorse for text, borders, backgrounds
// Uses zinc for a cooler, more modern neutral.
// ---------------------------------------------------------------------------

export const neutral = zinc;

// ---------------------------------------------------------------------------
// Semantic Color Mapping
// Maps intent to specific palette stops. Consumed by the theme layer.
// ---------------------------------------------------------------------------

export const semanticLight = {
	// Backgrounds
	background: pure.white,
	foreground: neutral[950],

	// Surfaces
	surface: neutral[50],
	surfaceRaised: pure.white,
	surfaceOverlay: neutral[100],

	// Muted
	muted: neutral[100],
	mutedForeground: neutral[600],

	// Primary (brand)
	primary: brand[600],
	primaryForeground: pure.white,
	primaryHover: brand[700],
	primaryActive: brand[800],
	primaryMuted: brand[50],
	primaryMutedForeground: brand[700],

	// Secondary
	secondary: neutral[100],
	secondaryForeground: neutral[900],
	secondaryHover: neutral[200],
	secondaryActive: neutral[300],

	// Success
	success: green[600],
	successForeground: neutral[950],
	successMuted: green[50],
	successMutedForeground: green[700],

	// Warning
	warning: amber[500],
	warningForeground: neutral[950],
	warningMuted: amber[50],
	warningMutedForeground: amber[700],

	// Danger
	danger: red[600],
	dangerForeground: pure.white,
	dangerHover: red[700],
	dangerActive: red[800],
	dangerMuted: red[50],
	dangerMutedForeground: red[700],

	// Info
	info: blue[600],
	infoForeground: pure.white,
	infoMuted: blue[50],
	infoMutedForeground: blue[700],

	// Borders — darkened for WCAG SC 1.4.11 non-text contrast (≥ 3:1)
	border: "188 188 194" as const,
	borderMuted: neutral[100],
	borderStrong: "148 148 157" as const,

	// Focus
	focusRing: brand[500],

	// Input — input border darkened for non-text contrast (≥ 3:1)
	input: "148 148 157" as const,
	inputForeground: neutral[900],
	inputPlaceholder: neutral[500],

	// Disabled — darkened for usability (WCAG exempts disabled, but ≥ 3:1 target)
	disabled: neutral[100],
	disabledForeground: "120 120 129" as const,
} as const;

export const semanticDark = {
	// Backgrounds
	background: neutral[950],
	foreground: neutral[50],

	// Surfaces
	surface: neutral[900],
	surfaceRaised: neutral[800],
	surfaceOverlay: neutral[800],

	// Muted
	muted: neutral[800],
	mutedForeground: neutral[400],

	// Primary (brand) — brand.400 for AA text contrast on dark bg (6.67:1)
	primary: brand[400],
	primaryForeground: neutral[900],
	primaryHover: brand[300],
	primaryActive: brand[200],
	primaryMuted: brand[950],
	primaryMutedForeground: brand[300],

	// Secondary
	secondary: neutral[800],
	secondaryForeground: neutral[100],
	secondaryHover: neutral[700],
	secondaryActive: neutral[600],

	// Success
	success: green[500],
	successForeground: neutral[950],
	successMuted: green[950],
	successMutedForeground: green[300],

	// Warning
	warning: amber[400],
	warningForeground: neutral[950],
	warningMuted: amber[950],
	warningMutedForeground: amber[300],

	// Danger
	danger: red[500],
	dangerForeground: neutral[950],
	dangerHover: red[400],
	dangerActive: red[300],
	dangerMuted: red[950],
	dangerMutedForeground: red[300],

	// Info
	info: blue[400],
	infoForeground: neutral[950],
	infoMuted: blue[950],
	infoMutedForeground: blue[300],

	// Borders — lightened for WCAG SC 1.4.11 non-text contrast (≥ 3:1)
	border: neutral[600],
	borderMuted: neutral[800],
	borderStrong: neutral[500],

	// Focus
	focusRing: brand[400],

	// Input — input border lightened for non-text contrast (≥ 3:1)
	input: "96 96 105" as const,
	inputForeground: neutral[50],
	inputPlaceholder: "137 137 145" as const,

	// Disabled — lightened for usability (WCAG exempts disabled, but ≥ 3:1 target)
	disabled: neutral[800],
	disabledForeground: neutral[500],
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type ColorScale = Record<string, string>;
export type SemanticColors = typeof semanticLight;
export type SemanticColorKey = keyof SemanticColors;

// All palettes bundled for tooling / documentation
export const palettes = {
	slate,
	gray,
	zinc,
	brand,
	blue,
	green,
	amber,
	red,
	teal,
} as const;
