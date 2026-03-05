"use client";

import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PropDef {
  /** The prop name (e.g. `variant`). */
  name: string;
  /** TypeScript type signature (e.g. `"primary" | "secondary"`). */
  type: string;
  /** Default value. Use `"-"` or omit for required props with no default. */
  default?: string;
  /** Short description of what the prop does. */
  description?: string;
  /** Whether the prop is required. */
  required?: boolean;
}

export interface PropsTableProps {
  /** Array of prop definitions to render. */
  data: PropDef[];
  /**
   * Optional title rendered above the table (e.g. the component name).
   * When omitted the table renders without a heading.
   */
  title?: string;
  /** Extra class names on the outer wrapper. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Renders a type string inside a styled inline-code badge. Long union types
 * are kept on a single line with horizontal scroll so the table column
 * doesn't blow out.
 */
function TypeBadge({ type }: { type: string }) {
  return (
    <code className="inline-block max-w-[260px] truncate rounded bg-fd-muted px-1.5 py-0.5 text-xs font-mono text-fd-primary leading-normal">
      {type}
    </code>
  );
}

function DefaultValue({ value }: { value?: string }) {
  if (!value || value === "-") {
    return (
      <span className="text-fd-muted-foreground text-xs select-none">—</span>
    );
  }
  return (
    <code className="rounded bg-fd-muted px-1.5 py-0.5 text-xs font-mono text-fd-foreground/80 leading-normal">
      {value}
    </code>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `<PropsTable>` — a clean, scannable props reference table designed for
 * component documentation pages. Each row displays the prop name, its
 * TypeScript type, the default value, and a short description.
 *
 * Register this in `src/mdx-components.tsx` so MDX pages can use it without
 * explicit imports:
 *
 * ```tsx
 * import { PropsTable } from "@/components/docs/props-table";
 *
 * // inside getMDXComponents:
 * PropsTable,
 * ```
 *
 * Usage in MDX:
 *
 * ```mdx
 * <PropsTable
 *   title="Button"
 *   data={[
 *     { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger"', default: '"primary"', description: "Visual style of the button." },
 *     { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls height and padding." },
 *     { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and disables interaction." },
 *     { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
 *     { name: "children", type: "ReactNode", required: true, description: "Button label content." },
 *   ]}
 * />
 * ```
 */
export function PropsTable({ data, title, className }: PropsTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className={cn("my-6 space-y-2", className)}>
      {title && (
        <h3 className="text-lg font-semibold tracking-tight text-fd-foreground">
          {title} Props
        </h3>
      )}

      <div className="overflow-x-auto rounded-lg border border-fd-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-fd-border bg-fd-muted/40">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
                Prop
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
                Type
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
                Default
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((prop, idx) => (
              <tr
                key={prop.name}
                className={cn(
                  "border-b border-fd-border last:border-b-0 transition-colors hover:bg-fd-muted/20",
                  idx % 2 === 0 ? "bg-fd-background" : "bg-fd-muted/10",
                )}
              >
                {/* Prop name */}
                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-1.5">
                    <code className="text-[13px] font-semibold font-mono text-fd-foreground">
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span
                        role="img"
                        className="text-red-500 text-xs font-bold leading-none select-none"
                        title="Required"
                        aria-label="Required"
                      >
                        *
                      </span>
                    )}
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-3 align-top">
                  <TypeBadge type={prop.type} />
                </td>

                {/* Default */}
                <td className="px-4 py-3 align-top">
                  <DefaultValue value={prop.default} />
                </td>

                {/* Description */}
                <td className="px-4 py-3 align-top text-fd-muted-foreground text-[13px] leading-relaxed">
                  {prop.description || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend for required indicator */}
      {data.some((p) => p.required) && (
        <p className="text-xs text-fd-muted-foreground">
          <span className="text-red-500 font-bold">*</span> Required prop
        </p>
      )}
    </div>
  );
}
