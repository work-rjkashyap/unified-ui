@php
    // ── Base classes ─────────────────────────────────────────────────
    $classes = implode(' ', [
        '[&_tr:last-child]:border-0',
        '[&_tr]:border-b',
        '[&_tr]:border-[oklch(var(--ui-border))]',
    ]);

    // ── Striped rows via parent data attribute ───────────────────────
    // When the parent <table> has data-ui-table-striped, even rows get
    // a subtle background. This is handled via CSS attribute selectors:
    $stripedClasses = '[table[data-ui-table-striped]_&_tr:nth-child(even)]:bg-[oklch(var(--ui-muted)/0.4)]';

    // ── Hoverable rows via parent data attribute ─────────────────────
    $hoverableClasses = '[table[data-ui-table-hoverable]_&_tr:hover]:bg-[oklch(var(--ui-muted)/0.5)]';
@endphp

<tbody
    {{ $attributes->class([$classes]) }}
    data-ui-table-body
>
    {{ $slot }}
</tbody>
