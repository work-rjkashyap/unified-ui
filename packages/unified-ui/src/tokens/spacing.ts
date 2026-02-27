// ============================================================================
// Unified UI — Spacing Tokens
// ============================================================================
// Based on a strict 4px grid system. Every spacing value is a multiple of 4px.
// This ensures visual consistency and vertical rhythm across the entire UI.
//
// NEVER hardcode spacing values in components. Always reference these tokens.
//
// Usage guide:
//   0  → 0px    — no spacing
//   px → 1px    — hairline borders, fine adjustments
//   0.5→ 2px    — micro spacing (icon gaps)
//   1  → 4px    — tight internal padding
//   2  → 8px    — default internal padding, small gaps
//   3  → 12px   — compact component padding
//   4  → 16px   — standard component padding, default gap
//   5  → 20px   — comfortable padding
//   6  → 24px   — section padding (mobile)
//   8  → 32px   — section padding (tablet)
//   10 → 40px   — section spacing
//   12 → 48px   — large section spacing
//   14 → 56px   — page-level vertical rhythm
//   16 → 64px   — major section breaks
//   20 → 80px   — hero / page-level padding
//   24 → 96px   — max vertical spacing
// ============================================================================

export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
};
