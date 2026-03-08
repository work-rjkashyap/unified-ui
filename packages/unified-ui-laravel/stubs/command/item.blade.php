{{--
    Unified UI — Command Item Sub-Component
    https://unified-ui.space

    An individual selectable item within a command palette group.
    Supports icons, shortcut hints, disabled state, and keyboard
    navigation highlighting via the parent command's Alpine.js context.

    Usage:
        <x-ui-command>
            <x-ui-command.group heading="Pages">
                <x-ui-command.item value="dashboard">Dashboard</x-ui-command.item>
                <x-ui-command.item value="settings">Settings</x-ui-command.item>
            </x-ui-command.group>
        </x-ui-command>

        {{-- With icon --}}
        <x-ui-command.item value="search">
            <svg class="h-4 w-4 mr-2" ...>...</svg>
            Search
        </x-ui-command.item>

        {{-- With shortcut hint --}}
        <x-ui-command.item value="save" shortcut="⌘S">Save</x-ui-command.item>

        {{-- As a link --}}
        <x-ui-command.item value="docs" as="a" href="/docs">Documentation</x-ui-command.item>

        {{-- Disabled --}}
        <x-ui-command.item value="locked" disabled>Locked Action</x-ui-command.item>

    Props:
        value    — unique identifier / searchable value for this item (required)
        as       — HTML tag: button|a (default: button)
        href     — URL when as=a
        shortcut — optional keyboard shortcut hint text displayed on the right
        disabled — boolean, prevents selection and dims the item (default: false)
--}}

@props([
    'value' => '',
    'as' => 'button',
    'href' => null,
    'shortcut' => null,
    'disabled' => false,
])

@php
    $isDisabled = (bool) $disabled;

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'flex',
        'items-center',
        'w-full',
        'gap-2',
        'px-3',
        'py-2',
        'text-sm',
        'leading-tight',
        'cursor-pointer',
        'select-none',
        'outline-none',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'text-[oklch(var(--ui-popover-foreground))]',
        'hover:bg-[oklch(var(--ui-accent))]',
        'hover:text-[oklch(var(--ui-accent-foreground))]',
        'data-[active=true]:bg-[oklch(var(--ui-accent))]',
        'data-[active=true]:text-[oklch(var(--ui-accent-foreground))]',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'aria-disabled:pointer-events-none',
        'aria-disabled:opacity-50',
    ]);

    // ── Determine tag ────────────────────────────────────────────────
    $tag = $href ? 'a' : $as;
@endphp

<{{ $tag }}
    @if($tag === 'a' && $href) href="{{ $isDisabled ? null : $href }}" @endif
    @if($tag === 'button') type="button" @endif
    @if($isDisabled)
        @if($tag === 'button') disabled @endif
        aria-disabled="true"
        data-disabled
    @endif
    {{ $attributes->class([$baseClasses]) }}
    role="option"
    data-ui-command-item
    data-value="{{ $value }}"
    data-active="false"
>
    {{-- Item content --}}
    <span class="flex items-center gap-2 flex-1 min-w-0 truncate">
        {{ $slot }}
    </span>

    {{-- Shortcut hint --}}
    @if($shortcut)
        <span
            class="ml-auto pl-4 text-xs tracking-widest text-[oklch(var(--ui-muted-foreground))] shrink-0"
            aria-hidden="true"
        >
            {{ $shortcut }}
        </span>
    @endif
</{{ $tag }}>
