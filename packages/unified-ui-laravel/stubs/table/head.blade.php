@props([
    'align' => 'left',
    'sortable' => false,
    'sorted' => false,
    'direction' => 'asc',
    'srOnly' => false,
    'sticky' => false,
])

@php
    // ── Alignment classes ─────────────────────────────────────────────
    $alignClasses = match ($align) {
        'center' => 'text-center',
        'right'  => 'text-right',
        default  => 'text-left',
    };

    // ── Sticky header ────────────────────────────────────────────────
    $stickyClasses = $sticky
        ? 'sticky top-0 z-10 bg-[oklch(var(--ui-muted)/0.95)] backdrop-blur-sm'
        : '';

    // ── Screen-reader only ───────────────────────────────────────────
    $srOnlyClasses = $srOnly ? 'sr-only' : '';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'h-10',
        'px-4',
        'py-2',
        'font-medium',
        'text-xs',
        'uppercase',
        'tracking-wider',
        'text-[oklch(var(--ui-muted-foreground))]',
        'whitespace-nowrap',
        '[&:has([role=checkbox])]:pr-0',
    ]);

    // ── Dense variant (read from parent data attribute via CSS) ───────
    // [table[data-ui-table-dense]_&] overrides padding to be smaller
    $denseClasses = '[table[data-ui-table-dense]_&]:h-8 [table[data-ui-table-dense]_&]:px-2 [table[data-ui-table-dense]_&]:py-1';

    // ── Bordered variant ─────────────────────────────────────────────
    $borderedClasses = '[table[data-ui-table-bordered]_&]:border [table[data-ui-table-bordered]_&]:border-[oklch(var(--ui-border))]';

    // ── Sortable interactive classes ─────────────────────────────────
    $sortableClasses = $sortable
        ? implode(' ', [
            'cursor-pointer',
            'select-none',
            'hover:text-[oklch(var(--ui-foreground))]',
            'transition-colors',
            'duration-[var(--ui-duration-fast)]',
            'ease-[var(--ui-ease-default)]',
        ])
        : '';

    $classes = trim("{$baseClasses} {$alignClasses} {$stickyClasses} {$srOnlyClasses} {$denseClasses} {$borderedClasses} {$sortableClasses}");
@endphp

<th
    {{ $attributes->class([$classes]) }}
    scope="col"
    @if($sortable) role="columnheader" aria-sort="{{ $sorted ? ($direction === 'asc' ? 'ascending' : 'descending') : 'none' }}" @endif
    data-ui-table-head
>
    @if($sortable)
        <span class="inline-flex items-center gap-1.5 group">
            {{-- Header text --}}
            <span>{{ $slot }}</span>

            {{-- Sort indicator --}}
            <span class="inline-flex flex-col items-center shrink-0" aria-hidden="true">
                @if($sorted)
                    @if($direction === 'asc')
                        {{-- Ascending arrow --}}
                        <svg
                            class="h-3.5 w-3.5 text-[oklch(var(--ui-foreground))]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    @else
                        {{-- Descending arrow --}}
                        <svg
                            class="h-3.5 w-3.5 text-[oklch(var(--ui-foreground))]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    @endif
                @else
                    {{-- Unsorted indicator (subtle double chevron) --}}
                    <svg
                        class="h-3.5 w-3.5 text-[oklch(var(--ui-muted-foreground)/0.4)] group-hover:text-[oklch(var(--ui-muted-foreground))] transition-colors duration-[var(--ui-duration-fast)]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m7 15 5 5 5-5" />
                        <path d="m7 9 5-5 5 5" />
                    </svg>
                @endif
            </span>
        </span>
    @else
        {{ $slot }}
    @endif
</th>
