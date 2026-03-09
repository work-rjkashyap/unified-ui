@props([
    'align' => 'left',
    'muted' => false,
    'truncate' => false,
    'nowrap' => false,
    'colspan' => null,
    'rowspan' => null,
])

@php
    // ── Alignment classes ─────────────────────────────────────────────
    $alignClasses = match ($align) {
        'center' => 'text-center',
        'right'  => 'text-right',
        default  => 'text-left',
    };

    // ── Text color ───────────────────────────────────────────────────
    $colorClasses = $muted
        ? 'text-[oklch(var(--ui-muted-foreground))]'
        : 'text-[oklch(var(--ui-foreground))]';

    // ── Truncation ───────────────────────────────────────────────────
    $truncateClasses = $truncate
        ? 'truncate'
        : '';

    // ── No wrap ──────────────────────────────────────────────────────
    $nowrapClasses = $nowrap
        ? 'whitespace-nowrap'
        : '';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'px-4',
        'py-3',
        'text-sm',
        'leading-normal',
        '[&:has([role=checkbox])]:pr-0',
    ]);

    // ── Dense variant (read from parent data attribute via CSS) ───────
    $denseClasses = '[table[data-ui-table-dense]_&]:px-2 [table[data-ui-table-dense]_&]:py-1.5';

    // ── Bordered variant ─────────────────────────────────────────────
    $borderedClasses = '[table[data-ui-table-bordered]_&]:border [table[data-ui-table-bordered]_&]:border-[oklch(var(--ui-border))]';

    // ── Striped rows (even rows get muted bg via parent) ─────────────
    $stripedClasses = '[table[data-ui-table-striped]_tbody_tr:nth-child(even)_&]:bg-[oklch(var(--ui-muted)/0.4)]';

    // ── Hoverable rows ───────────────────────────────────────────────
    $hoverableClasses = '[table[data-ui-table-hoverable]_tbody_tr:hover_&]:bg-[oklch(var(--ui-muted)/0.5)]';

    $classes = trim(implode(' ', [
        $baseClasses,
        $alignClasses,
        $colorClasses,
        $truncateClasses,
        $nowrapClasses,
        $denseClasses,
        $borderedClasses,
        $stripedClasses,
        $hoverableClasses,
    ]));
@endphp

<td
    {{ $attributes->class([$classes]) }}
    @if($colspan) colspan="{{ $colspan }}" @endif
    @if($rowspan) rowspan="{{ $rowspan }}" @endif
    data-ui-table-cell
>
    {{ $slot }}
</td>
