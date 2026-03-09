@php
    // ── Base classes ─────────────────────────────────────────────────
    $classes = implode(' ', [
        '[&_tr]:border-b',
        '[&_tr]:border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-muted)/0.5)]',
    ]);
@endphp

<thead {{ $attributes->class([$classes]) }} data-ui-table-header>
    {{ $slot }}
</thead>
