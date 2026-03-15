import * as react from 'react';
import { ReactNode } from 'react';

interface TreeNode {
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
type TreeCheckedState = "checked" | "unchecked" | "indeterminate";
interface TreeViewProps {
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
declare const TreeView: react.ForwardRefExoticComponent<TreeViewProps & react.RefAttributes<HTMLUListElement>>;

export { type TreeCheckedState, type TreeNode, TreeView, type TreeViewProps };
