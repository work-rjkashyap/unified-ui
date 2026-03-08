{{--
    Unified UI — Table Header Sub-Component
    https://unified-ui.space

    The <thead> wrapper for table header rows. Applies consistent
    background and border styling using design tokens.

    Usage:
        <x-ui-table>
            <x-ui-table.header>
                <x-ui-table.row>
                    <x-ui-table.head>Name</x-ui-table.head>
                    <x-ui-table.head>Email</x-ui-table.head>
                    <x-ui-table.head>Role</x-ui-table.head>
                </x-ui-table.row>
            </x-ui-table.header>
            <x-ui-table.body>
                …
            </x-ui-table.body>
        </x-ui-table>

    Props:
        (none beyond standard Blade $attributes)
--}}

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
