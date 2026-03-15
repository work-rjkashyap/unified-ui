"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
function FileIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
        /* @__PURE__ */ jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
      ]
    }
  );
}
function FolderIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" })
    }
  );
}
function FolderOpenIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" })
    }
  );
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function MinusIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M5 12h14" })
    }
  );
}
const TreeContext = createContext({
  expanded: /* @__PURE__ */ new Set(),
  toggleExpand: () => {
  },
  checkable: false,
  checkedSet: /* @__PURE__ */ new Set(),
  toggleCheck: () => {
  },
  getCheckState: () => "unchecked",
  showLines: true,
  showIcons: true,
  shouldReduce: false
});
function _collectLeafIds(node) {
  if (!node.children || node.children.length === 0) {
    return [node.id];
  }
  return node.children.flatMap(_collectLeafIds);
}
function collectAllIds(node) {
  const ids = [node.id];
  if (node.children) {
    for (const child of node.children) {
      ids.push(...collectAllIds(child));
    }
  }
  return ids;
}
function TreeItem({ node, depth }) {
  const {
    expanded,
    toggleExpand,
    checkable,
    checkedSet: _checkedSet,
    toggleCheck,
    getCheckState,
    onNodeSelect,
    selectedId,
    showLines,
    showIcons,
    shouldReduce
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
    (e) => {
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
      toggleExpand
    ]
  );
  const handleCheckClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (node.disabled) return;
      toggleCheck(node.id);
    },
    [node.id, node.disabled, toggleCheck]
  );
  let iconNode = null;
  if (node.icon) {
    iconNode = node.icon;
  } else if (showIcons) {
    if (hasChildren) {
      iconNode = isExpanded ? /* @__PURE__ */ jsx(FolderOpenIcon, { className: "size-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsx(FolderIcon, { className: "size-4 text-muted-foreground shrink-0" });
    } else {
      iconNode = /* @__PURE__ */ jsx(FileIcon, { className: "size-4 text-muted-foreground shrink-0" });
    }
  }
  const motionTransition = shouldReduce ? { duration: 0.01 } : {
    duration: 0.2,
    ease: [0.25, 0.1, 0.25, 1]
  };
  return /* @__PURE__ */ jsxs(
    "li",
    {
      role: "treeitem",
      "aria-expanded": hasChildren ? isExpanded : void 0,
      "aria-selected": isSelected,
      "aria-disabled": node.disabled || void 0,
      "data-ds": "",
      "data-ds-component": "tree-item",
      ...isSelected ? { "data-ds-selected": "" } : {},
      ...node.disabled ? { "data-ds-disabled": "" } : {},
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "group/item flex items-center gap-1.5 py-1 px-1.5 rounded-md cursor-pointer select-none",
              "text-sm text-foreground transition-colors duration-fast",
              "hover:bg-muted/50",
              isSelected && "bg-muted text-foreground",
              node.disabled && "opacity-50 pointer-events-none",
              focusRingClasses
            ),
            style: { paddingLeft: `${depth * 16 + 4}px` },
            onClick: handleToggle,
            onKeyDown: handleKeyDown,
            tabIndex: node.disabled ? -1 : 0,
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex size-4 items-center justify-center shrink-0", children: hasChildren && /* @__PURE__ */ jsx(
                ChevronRightIcon,
                {
                  className: cn(
                    "size-3.5 text-muted-foreground transition-transform duration-fast",
                    isExpanded && "rotate-90"
                  )
                }
              ) }),
              checkable && /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleCheckClick,
                  className: cn(
                    "inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-border",
                    "transition-colors duration-fast",
                    checkState === "checked" && "bg-primary border-primary text-primary-foreground",
                    checkState === "indeterminate" && "bg-primary border-primary text-primary-foreground",
                    focusRingClasses
                  ),
                  "aria-checked": checkState === "checked" ? true : checkState === "indeterminate" ? "mixed" : false,
                  "aria-label": `Select ${node.label}`,
                  tabIndex: -1,
                  children: [
                    checkState === "checked" && /* @__PURE__ */ jsx(CheckIcon, { className: "size-3" }),
                    checkState === "indeterminate" && /* @__PURE__ */ jsx(MinusIcon, { className: "size-3" })
                  ]
                }
              ),
              iconNode && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: iconNode }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: node.label })
            ]
          }
        ),
        hasChildren && /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isExpanded && /* @__PURE__ */ jsx(
          motion.ul,
          {
            role: "group",
            initial: { height: 0, opacity: 0, overflow: "hidden" },
            animate: {
              height: "auto",
              opacity: 1,
              overflow: "hidden",
              transitionEnd: { overflow: "visible" }
            },
            exit: { height: 0, opacity: 0, overflow: "hidden" },
            transition: motionTransition,
            className: cn(
              "relative list-none",
              showLines && "before:absolute before:left-[calc(var(--tree-indent))] before:top-0 before:bottom-2 before:w-px before:bg-border"
            ),
            style: {
              "--tree-indent": `${(depth + 1) * 16 + 10}px`
            },
            children: node.children.map((child) => /* @__PURE__ */ jsx(TreeItem, { node: child, depth: depth + 1 }, child.id))
          }
        ) })
      ]
    }
  );
}
const TreeView = forwardRef(
  function TreeView2({
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
    className
  }, ref) {
    const shouldReduce = useReducedMotion();
    const [internalExpanded, setInternalExpanded] = useState(
      () => new Set(defaultExpanded)
    );
    const expanded = expandedProp ? new Set(expandedProp) : internalExpanded;
    const toggleExpand = useCallback(
      (id) => {
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
      [expanded, expandedProp, onExpandedChange]
    );
    const [internalChecked, setInternalChecked] = useState(
      () => new Set(defaultChecked)
    );
    const checkedSet = checkedProp ? new Set(checkedProp) : internalChecked;
    const toggleCheck = useCallback(
      (id) => {
        function findNode(nodes) {
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
      [items, checkedSet, checkedProp, onCheckedChange]
    );
    const getCheckState = useCallback(
      (node) => {
        const allIds = collectAllIds(node);
        const checkedCount = allIds.filter((id) => checkedSet.has(id)).length;
        if (checkedCount === 0) return "unchecked";
        if (checkedCount === allIds.length) return "checked";
        return "indeterminate";
      },
      [checkedSet]
    );
    const ctx = useMemo(
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
        shouldReduce
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
        shouldReduce
      ]
    );
    return /* @__PURE__ */ jsx(TreeContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
      "ul",
      {
        ref,
        className: cn("list-none text-sm", className),
        "data-ds": "",
        "data-ds-component": "tree-view",
        children: items.map((item) => /* @__PURE__ */ jsx(TreeItem, { node: item, depth: 0 }, item.id))
      }
    ) });
  }
);
TreeView.displayName = "TreeView";
export {
  TreeView
};
