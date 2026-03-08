{{--
    Unified UI — Table Body Sub-Component
    https://unified-ui.space

    The <tbody> wrapper for table data rows. Applies consistent styling
    and supports striped/hoverable variants inherited from the parent table.

    Usage:
        <x-ui-table>
            <x-ui-table.header>
                <x-ui-table.row>
                    <x-ui-table.head>Name</x-ui-table.head>
                    <x-ui-table.head>Email</x-ui-table.head>
                </x-ui-table.row>
            </x-ui-table.header>
            <x-ui-table.body>
                <x-ui-table.row>
                    <x-ui-table.cell>Jane Doe</x-ui-table.cell>
                    <x-ui-table.cell>jane@example.com</x-ui-table.cell>
                </x-ui-table.row>
                <x-ui-table.row>
                    <x-ui-table.cell>John Smith</x-ui-table.cell>
                    <x-ui-table.cell>john@example.com</x-ui-table.cell>
                </x-ui-table.row>
            </x-ui-table.body>
        </x-ui-table>

    Props:
        (none beyond standard Blade $attributes)
--}}

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
