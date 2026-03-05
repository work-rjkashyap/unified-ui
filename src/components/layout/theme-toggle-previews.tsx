"use client";

import { ThemeToggle, type ThemeValue } from "@work-rjkashyap/unified-ui";
import { useState } from "react";

// ---------------------------------------------------------------------------
// ThemeToggle preview components for MDX documentation.
//
// These are client components that manage their own state so that the
// `onChange` handler never crosses the RSC → Client serialisation boundary.
// Register them in `src/mdx-components.tsx` and use directly in MDX pages.
// ---------------------------------------------------------------------------

/** Icon variant — shows light and dark side by side */
export function ThemeToggleIconPreview() {
  const [value, setValue] = useState<ThemeValue>("light");
  return (
    <div className="flex gap-4 items-center justify-center">
      <ThemeToggle value={value} onChange={setValue} />
    </div>
  );
}

/** Segmented variant — shows light and dark inline */
export function ThemeToggleSegmentedPreview() {
  const [value, setValue] = useState<ThemeValue>("light");
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ThemeToggle value={value} onChange={setValue} variant="segmented" />
    </div>
  );
}

/** Three-state icon variant — light / dark / system */
export function ThemeToggleSystemIconPreview() {
  const [value, setValue] = useState<ThemeValue>("light");
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ThemeToggle value={value} onChange={setValue} mode="light-dark-system" />
    </div>
  );
}

/** Three-state segmented variant — light / dark / system */
export function ThemeToggleSystemSegmentedPreview() {
  const [value, setValue] = useState<ThemeValue>("system");
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ThemeToggle
        value={value}
        onChange={setValue}
        variant="segmented"
        mode="light-dark-system"
      />
    </div>
  );
}

/** Icon sizes preview */
export function ThemeToggleSizesPreview() {
  const [value, setValue] = useState<ThemeValue>("light");
  return (
    <div className="flex gap-4 items-center justify-center">
      <ThemeToggle value={value} onChange={setValue} size="sm" />
      <ThemeToggle value={value} onChange={setValue} size="md" />
      <ThemeToggle value={value} onChange={setValue} size="lg" />
    </div>
  );
}

/** Segmented sizes preview */
export function ThemeToggleSegmentedSizesPreview() {
  const [value, setValue] = useState<ThemeValue>("light");
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ThemeToggle
        value={value}
        onChange={setValue}
        variant="segmented"
        size="sm"
      />
      <ThemeToggle
        value={value}
        onChange={setValue}
        variant="segmented"
        size="md"
      />
      <ThemeToggle
        value={value}
        onChange={setValue}
        variant="segmented"
        size="lg"
      />
    </div>
  );
}
