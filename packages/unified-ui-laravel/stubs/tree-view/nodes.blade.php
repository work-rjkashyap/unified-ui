@props(['nodes' => [], 'depth' => 0])

@foreach($nodes as $node)
    @php
        $hasChildren = !empty($node['children']);
        $id = $node['id'] ?? $node['label'];
        $label = $node['label'] ?? '';
        $icon = $node['icon'] ?? null;
    @endphp
    <div role="treeitem" :aria-expanded="{{ $hasChildren ? 'isExpanded(' . json_encode($id) . ').toString()' : 'null' }}" data-ui-tree-node>
        <div
            x-on:click="{{ $hasChildren ? 'toggle(' . json_encode($id) . ')' : 'select(' . json_encode($id) . ')' }}"
            :class="isSelected({{ json_encode($id) }}) ? 'bg-[oklch(var(--ui-accent))] text-[oklch(var(--ui-accent-foreground))]' : 'hover:bg-[oklch(var(--ui-accent)/0.5)] text-[oklch(var(--ui-foreground))]'"
            class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer transition-colors duration-[var(--ui-duration-fast)] select-none"
            style="padding-left: {{ 8 + $depth * 16 }}px"
        >
            @if($hasChildren)
                <svg class="h-3.5 w-3.5 shrink-0 text-[oklch(var(--ui-muted-foreground))] transition-transform duration-[var(--ui-duration-fast)]" :class="isExpanded({{ json_encode($id) }}) ? 'rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            @else
                <span class="h-3.5 w-3.5 shrink-0"></span>
            @endif
            @if($icon)
                <span class="h-4 w-4 shrink-0">{!! $icon !!}</span>
            @endif
            <span>{{ $label }}</span>
        </div>
        @if($hasChildren)
            <div x-show="isExpanded({{ json_encode($id) }})" x-cloak>
                <x-tree-view-nodes :nodes="$node['children']" :depth="$depth + 1" />
            </div>
        @endif
    </div>
@endforeach
