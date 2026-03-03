"use client";

// ============================================================================
// Input Component Previews
// ============================================================================
// Self-contained "use client" preview components for NumberInput and Slider.
// These are registered in src/mdx-components.tsx and used in place of inline
// arrow functions inside the preview= prop of <ComponentPage> in MDX files.
//
// Why this exists: MDX files that import from @work-rjkashyap/unified-ui
// (a "use client" bundle) are themselves treated as client modules by Next.js.
// When the RSC page renders <MDX components={...} />, any arrow functions
// passed as props (e.g. formatValue, formatTooltip) must cross the
// RSC → Client serialisation boundary — which is forbidden.
//
// The fix: encapsulate all previews that use function props into named
// "use client" components here. They are then referenced by name in MDX,
// never requiring a function to be passed as a prop across the boundary.
// ============================================================================

import {
  NumberInput,
  Slider,
} from "@work-rjkashyap/unified-ui";

// ---------------------------------------------------------------------------
// NumberInput — Custom Format Preview
// ---------------------------------------------------------------------------

export function NumberInputFormatPreview() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <NumberInput
        defaultValue={50}
        min={0}
        max={100}
        formatValue={(v) => `${v}%`}
      />
      <NumberInput
        defaultValue={1200}
        min={0}
        max={10000}
        step={100}
        formatValue={(v) => `$${v.toLocaleString()}`}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slider — Value Tooltip with Format Function Preview
// ---------------------------------------------------------------------------

export function SliderTooltipFormatPreview() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-6 py-6">
      <Slider defaultValue={[65]} showTooltip />
      <Slider
        defaultValue={[20, 75]}
        showTooltip
        formatTooltip={(v) => `${v}%`}
      />
    </div>
  );
}
