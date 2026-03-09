@props([
    'nodes'       => [],
    'selectable'  => true,
    'expandAll'   => false,
    'selected'    => null,
])

{{--
    TreeView — hierarchical tree with expand/collapse.

    Node structure: ['id' => 1, 'label' => 'Root', 'children' => [...], 'icon' => null]

    Usage:
        <x-tree-view :nodes="$tree" />
--}}

<div
    x-data="{
        nodes: @json($nodes),
        expanded: new Set(@json($expandAll ? array_column($nodes, 'id') : [])),
        selected: @js($selected),

        toggle(id) {
            if (this.expanded.has(id)) this.expanded.delete(id);
            else this.expanded.add(id);
        },

        select(id) {
            this.selected = id;
            this.$dispatch('tree-view-select', { id });
        },

        isExpanded(id) { return this.expanded.has(id); },
        isSelected(id) { return this.selected === id; },
    }"
    role="tree"
    aria-label="Tree view"
    {{ $attributes->except(['class']) }}
    data-ui-tree-view
>
    <x-tree-view-nodes :nodes="$nodes" />
</div>
