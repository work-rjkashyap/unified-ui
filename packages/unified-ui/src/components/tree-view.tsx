"use client";

// ============================================================================
// Unified UI — TreeView Component
// ============================================================================
// Expandable tree with checkable nodes, icons, keyboard nav, animations.
//
// Features:
//   - Recursive tree rendering with unlimited depth
//   - Checkable nodes with indeterminate state
//   - Custom icons per node
//   - Expand/collapse with Framer Motion height animation
//   - Keyboard navigation: Arrow keys, Enter/Space to toggle
//   - Controlled and uncontrolled expanded/selected state
//   - Disabled nodes
//   - Connector lines for hierarchy visualization
//   - WCAG AA: role="tree", role="treeitem", aria-expanded
//   - Respects prefers-reduced-motion
//
// Usage:
//   import { TreeView } from "@work-rjkashyap/unified-ui/components";
//
//   <TreeView items={items} />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Icons (internal)
// ---------------------------------------------------------------------------

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function FolderOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreeNode {
  /** Unique identifier for this node. */
  id: string;
  /** Display label for the node. */
  label: string;
  /** Optional icon to render before the label. */
  icon?: ReactNode;
  /** Child nodes. If present, the node is treated as a branch (folder). */
  children?: TreeNode[];
  /** Whether this node is disabled. */
  disabled?: boolean;
}

export type TreeCheckedState = "checked" | "unchecked" | "indeterminate";

export interface TreeViewProps {
  /** The tree data structure to render. */
  items: TreeNode[];

  /** Default expanded node IDs (uncontrolled). */
  defaultExpanded?: string[];
  /** Controlled expanded node IDs. */
  expanded?: string[];
  /** Callback when expanded state changes. */
  onExpandedChange?: (expanded: string[]) => void;

  /** Whether nodes are checkable. @default false */
  checkable?: boolean;
  /** Default checked node IDs (uncontrolled). */
  defaultChecked?: string[];
  /** Controlled checked node IDs. */
  checked?: string[];
  /** Callback when checked state changes. */
  onCheckedChange?: (checked: string[]) => void;

  /** Callback when a node is clicked/selected. */
  onNodeSelect?: (nodeId: string) => void;

  /** Currently selected node ID (visual highlight). */
  selectedId?: string;

  /** Whether to show connector lines. @default true */
  showLines?: boolean;

  /** Whether to show default file/folder icons. @default true */
  showIcons?: boolean;

  /** Additional CSS classes on the root. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TreeContextValue {
  expanded: Set<string>;
  toggleExpand: (id: string) => void;
  checkable: boolean;
  checkedSet: Set<string>;
  toggleCheck: (id: string) => void;
  getCheckState: (node: TreeNode) => TreeCheckedState;
  onNodeSelect?: (id: string) => void;
  selectedId?: string;
  showLines: boolean;
  showIcons: boolean;
  shouldReduce: boolean | null;
}

const TreeContext = createContext<TreeContextValue>({
  expanded: new Set(),
  toggleExpand: () => {},
  checkable: false,
  checkedSet: new Set(),
  toggleCheck: () => {},
  getCheckState: () => "unchecked",
  showLines: true,
  showIcons: true,
  shouldReduce: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Collect all leaf IDs under a node (recursively). */
function collectLeafIds(node: TreeNode): string[] {
  if (!node.children || node.children.length === 0) {
    return [node.id];
  }
  return node.children.flatMap(collectLeafIds);
}

/** Collect all descendant IDs (including the node itself). */
function collectAllIds(node: TreeNode): string[] {
  const ids = [node.id];
  if (node.children) {
    for (const child of node.children) {
      ids.push(...collectAllIds(child));
    }
  }
  return ids;
}

// ---------------------------------------------------------------------------
// TreeItem (internal recursive component)
// ---------------------------------------------------------------------------

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  const {
    expanded,
    toggleExpand,
    checkable,
    checkedSet,
    toggleCheck,
    getCheckState,
    onNodeSelect,
    selectedId,
    showLines,
    showIcons,
    shouldReduce,
  } = useContext(TreeContext);

  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const checkState = checkable ? getCheckState(node) : "unchecked";

  const handleToggle = useCallback(() => {
    if (node.disabled) return;
    if (hasChildren) {
      toggleExpand(node.id);
    }
    onNodeSelect?.(node.id);
  }, [node.id, node.disabled, hasChildren, toggleExpand, onNodeSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (node.disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
      if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
        e.preventDefault();
        toggleExpand(node.id);
      }
      if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
        e.preventDefault();
        toggleExpand(node.id);
      }
    },
    [
      node.id,
      node.disabled,
      hasChildren,
      isExpanded,
      handleToggle,
      toggleExpand,
    ],
  );

  const handleCheckClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (node.disabled) return;
      toggleCheck(node.id);
    },
    [node.id, node.disabled, toggleCheck],
  );

  // Choose icon
  let iconNode: ReactNode = null;
  if (node.icon) {
    iconNode = node.icon;
  } else if (showIcons) {
    if (hasChildren) {
      iconNode = isExpanded ? (
        <FolderOpenIcon className="size-4 text-muted-foreground shrink-0" />
      ) : (
        <FolderIcon className="size-4 text-muted-foreground shrink-0" />
      );
    } else {
      iconNode = <FileIcon className="size-4 text-muted-foreground shrink-0" />;
    }
  }

  const motionTransition = shouldReduce
    ? { duration: 0.01 }
    : {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      };

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-disabled={node.disabled || undefined}
      data-ds=""
      data-ds-component="tree-item"
      {...(isSelected ? { "data-ds-selected": "" } : {})}
      {...(node.disabled ? { "data-ds-disabled": "" } : {})}
    >
      {/* Node row */}
      <div
        className={cn(
          "group/item flex items-center gap-1.5 py-1 px-1.5 rounded-md cursor-pointer select-none",
          "text-sm text-foreground transition-colors duration-fast",
          "hover:bg-muted/50",
          isSelected && "bg-muted text-foreground",
          node.disabled && "opacity-50 pointer-events-none",
          focusRingClasses,
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
      >
        {/* Expand chevron */}
        <span className="inline-flex size-4 items-center justify-center shrink-0">
          {hasChildren && (
            <ChevronRightIcon
              className={cn(
                "size-3.5 text-muted-foreground transition-transform duration-fast",
                isExpanded && "rotate-90",
              )}
            />
          )}
        </span>

        {/* Checkbox */}
        {checkable && (
          <button
            type="button"
            onClick={handleCheckClick}
            className={cn(
              "inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-border",
              "transition-colors duration-fast",
              checkState === "checked" &&
                "bg-primary border-primary text-primary-foreground",
              checkState === "indeterminate" &&
                "bg-primary border-primary text-primary-foreground",
              focusRingClasses,
            )}
            aria-checked={
              checkState === "checked"
                ? true
                : checkState === "indeterminate"
                  ? "mixed"
                  : false
            }
            aria-label={`Select ${node.label}`}
            tabIndex={-1}
          >
            {checkState === "checked" && <CheckIcon className="size-3" />}
            {checkState === "indeterminate" && <MinusIcon className="size-3" />}
          </button>
        )}

        {/* Icon */}
        {iconNode && <span className="shrink-0">{iconNode}</span>}

        {/* Label */}
        <span className="truncate">{node.label}</span>
      </div>

      {/* Children */}
      {hasChildren && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.ul
              role="group"
              initial={{ height: 0, opacity: 0, overflow: "hidden" }}
              animate={{
                height: "auto",
                opacity: 1,
                overflow: "hidden",
                transitionEnd: { overflow: "visible" },
              }}
              exit={{ height: 0, opacity: 0, overflow: "hidden" }}
              transition={motionTransition}
              className={cn(
                "relative",
                showLines &&
                  "before:absolute before:left-[calc(var(--tree-indent))] before:top-0 before:bottom-2 before:w-px before:bg-border",
              )}
              style={
                {
                  "--tree-indent": `${(depth + 1) * 16 + 10}px`,
                } as React.CSSProperties
              }
            >
              {node.children!.map((child) => (
                <TreeItem key={child.id} node={child} depth={depth + 1} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// TreeView (root)
// ---------------------------------------------------------------------------

/**
 * `TreeView` — an expandable tree structure with checkable nodes.
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: "src", label: "src",
 *     children: [
 *       { id: "app", label: "app.tsx" },
 *       { id: "index", label: "index.ts" },
 *     ],
 *   },
 *   { id: "readme", label: "README.md" },
 * ];
 *
 * <TreeView items={items} />
 * <TreeView items={items} checkable onCheckedChange={console.log} />
 * ```
 */
export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(
  function TreeView(
    {
      items,
      defaultExpanded = [],
      expanded: expandedProp,
      onExpandedChange,
      checkable = false,
      defaultChecked = [],
      checked: checkedProp,
      onCheckedChange,
      onNodeSelect,
      selectedId,
      showLines = true,
      showIcons = true,
      className,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();

    // Expanded state
    const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
      () => new Set(defaultExpanded),
    );
    const expanded = expandedProp ? new Set(expandedProp) : internalExpanded;

    const toggleExpand = useCallback(
      (id: string) => {
        const next = new Set(expanded);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        if (!expandedProp) {
          setInternalExpanded(next);
        }
        onExpandedChange?.(Array.from(next));
      },
      [expanded, expandedProp, onExpandedChange],
    );

    // Checked state
    const [internalChecked, setInternalChecked] = useState<Set<string>>(
      () => new Set(defaultChecked),
    );
    const checkedSet = checkedProp ? new Set(checkedProp) : internalChecked;

    const toggleCheck = useCallback(
      (id: string) => {
        // Find the node in the tree
        function findNode(nodes: TreeNode[]): TreeNode | null {
          for (const n of nodes) {
            if (n.id === id) return n;
            if (n.children) {
              const found = findNode(n.children);
              if (found) return found;
            }
          }
          return null;
        }

        const node = findNode(items);
        if (!node) return;

        const next = new Set(checkedSet);
        const allIds = collectAllIds(node);

        // If currently all checked, uncheck all; otherwise check all
        const allChecked = allIds.every((nid) => next.has(nid));
        for (const nid of allIds) {
          if (allChecked) {
            next.delete(nid);
          } else {
            next.add(nid);
          }
        }

        if (!checkedProp) {
          setInternalChecked(next);
        }
        onCheckedChange?.(Array.from(next));
      },
      [items, checkedSet, checkedProp, onCheckedChange],
    );

    // Get check state for a node
    const getCheckState = useCallback(
      (node: TreeNode): TreeCheckedState => {
        const allIds = collectAllIds(node);
        const checkedCount = allIds.filter((id) => checkedSet.has(id)).length;
        if (checkedCount === 0) return "unchecked";
        if (checkedCount === allIds.length) return "checked";
        return "indeterminate";
      },
      [checkedSet],
    );

    const ctx = useMemo<TreeContextValue>(
      () => ({
        expanded,
        toggleExpand,
        checkable,
        checkedSet,
        toggleCheck,
        getCheckState,
        onNodeSelect,
        selectedId,
        showLines,
        showIcons,
        shouldReduce,
      }),
      [
        expanded,
        toggleExpand,
        checkable,
        checkedSet,
        toggleCheck,
        getCheckState,
        onNodeSelect,
        selectedId,
        showLines,
        showIcons,
        shouldReduce,
      ],
    );

    return (
      <TreeContext.Provider value={ctx}>
        <ul
          ref={ref}
          role="tree"
          className={cn("text-sm", className)}
          data-ds=""
          data-ds-component="tree-view"
        >
          {items.map((item) => (
            <TreeItem key={item.id} node={item} depth={0} />
          ))}
        </ul>
      </TreeContext.Provider>
    );
  },
);
TreeView.displayName = "TreeView";
