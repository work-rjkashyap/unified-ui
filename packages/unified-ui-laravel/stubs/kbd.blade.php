{{--
    Unified UI — Kbd Component
    https://unified-ui.space

    A keyboard shortcut indicator that renders styled key combinations.
    Used to display keyboard shortcuts, hotkeys, and key references
    in documentation, tooltips, and command palettes.

    Usage:
        {{-- Single key --}}
        <x-ui-kbd>K</x-ui-kbd>

        {{-- Key combination --}}
        <x-ui-kbd>Ctrl</x-ui-kbd> + <x-ui-kbd>S</x-ui-kbd>

        {{-- Modifier keys --}}
        <x-ui-kbd>⌘</x-ui-kbd><x-ui-kbd>K</x-ui-kbd>

        {{-- Special keys --}}
        <x-ui-kbd>Enter</x-ui-kbd>
        <x-ui-kbd>Esc</x-ui-kbd>
        <x-ui-kbd>Tab</x-ui-kbd>
        <x-ui-kbd>Shift</x-ui-kbd>
        <x-ui-kbd>⌫</x-ui-kbd>

        {{-- Size variants --}}
        <x-ui-kbd size="xs">K</x-ui-kbd>
        <x-ui-kbd size="sm">K</x-ui-kbd>
        <x-ui-kbd size="md">K</x-ui-kbd>
        <x-ui-kbd size="lg">K</x-ui-kbd>

        {{-- Variant styles --}}
        <x-ui-kbd variant="default">K</x-ui-kbd>
        <x-ui-kbd variant="outline">K</x-ui-kbd>
        <x-ui-kbd variant="ghost">K</x-ui-kbd>

        {{-- With keys prop (renders multiple keys with separator) --}}
        <x-ui-kbd :keys="['Ctrl', 'Shift', 'P']" />
        <x-ui-kbd :keys="['⌘', 'K']" separator="" />

        {{-- Inside a tooltip or description --}}
        <p>
            Press <x-ui-kbd>⌘</x-ui-kbd><x-ui-kbd>K</x-ui-kbd> to open
            the command palette.
        </p>

        {{-- In a menu item --}}
        <div class="flex items-center justify-between">
            <span>Save</span>
            <span class="flex items-center gap-0.5">
                <x-ui-kbd size="xs">⌘</x-ui-kbd>
                <x-ui-kbd size="xs">S</x-ui-kbd>
            </span>
        </div>

    Props:
        size      — xs|sm|md|lg (default: sm)
        variant   — default|outline|ghost (default: default)
        keys      — optional array of key labels to render as a multi-key combination (default: [])
        separator — string separator between keys when using the keys prop (default: "")
--}}

@props([
    'size' => 'sm',
    'variant' => 'default',
    'keys' => [],
    'separator' => '',
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs' => 'min-w-4 h-4 px-1 text-[10px] rounded-[var(--ui-radius-sm)]',
        'sm' => 'min-w-5 h-5 px-1.5 text-[11px] rounded-[var(--ui-radius-sm)]',
        'md' => 'min-w-6 h-6 px-2 text-xs rounded-[var(--ui-radius-md)]',
        'lg' => 'min-w-7 h-7 px-2.5 text-sm rounded-[var(--ui-radius-md)]',
        default => 'min-w-5 h-5 px-1.5 text-[11px] rounded-[var(--ui-radius-sm)]',
    };

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'outline' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
        ]),
        'ghost' => implode(' ', [
            'border-transparent',
            'bg-[oklch(var(--ui-muted)/0.5)]',
            'text-[oklch(var(--ui-muted-foreground))]',
        ]),
        default => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-[oklch(var(--ui-muted))]',
            'text-[oklch(var(--ui-muted-foreground))]',
            'shadow-[0_1px_0_0_oklch(var(--ui-border))]',
        ]),
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'justify-center',
        'font-mono',
        'font-medium',
        'leading-none',
        'whitespace-nowrap',
        'select-none',
        'shrink-0',
        'pointer-events-none',
    ]);

    // ── Separator classes ────────────────────────────────────────────
    $separatorClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'justify-center',
        'text-[oklch(var(--ui-muted-foreground)/0.6)]',
        'font-sans',
        match ($size) {
            'xs' => 'text-[9px] mx-0.5',
            'sm' => 'text-[10px] mx-0.5',
            'md' => 'text-xs mx-1',
            'lg' => 'text-sm mx-1',
            default => 'text-[10px] mx-0.5',
        },
    ]);

    $classes = trim("{$baseClasses} {$sizeClasses} {$variantClasses}");
@endphp

@if(count($keys) > 0)
    {{-- Multi-key combination mode via keys prop --}}
    <span
        {{ $attributes->except('class')->class(['inline-flex items-center']) }}
        data-ui-kbd-group
    >
        @foreach($keys as $index => $key)
            {{-- Separator between keys --}}
            @if($index > 0 && $separator !== '')
                <span class="{{ $separatorClasses }}" aria-hidden="true">{{ $separator }}</span>
            @endif

            <kbd
                class="{{ $classes }} {{ $attributes->get('class', '') }}"
                data-ui-kbd
            >{{ $key }}</kbd>
        @endforeach
    </span>
@else
    {{-- Single key mode via slot --}}
    <kbd
        {{ $attributes->class([$classes]) }}
        data-ui-kbd
    >{{ $slot }}</kbd>
@endif
