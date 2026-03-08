{{--
    Unified UI — Dropdown Item Sub-Component
    https://unified-ui.space

    An individual menu item within a dropdown menu. Supports multiple
    variants, disabled state, icons, and keyboard interaction.

    Usage:
        <x-ui-dropdown.item>Edit</x-ui-dropdown.item>

        {{-- Destructive variant --}}
        <x-ui-dropdown.item variant="destructive">Delete</x-ui-dropdown.item>

        {{-- As a link --}}
        <x-ui-dropdown.item as="a" href="/settings">Settings</x-ui-dropdown.item>

        {{-- Disabled --}}
        <x-ui-dropdown.item disabled>Cannot click</x-ui-dropdown.item>

        {{-- With icon --}}
        <x-ui-dropdown.item>
            <svg class="h-4 w-4 mr-2" ...>...</svg>
            Edit Profile
        </x-ui-dropdown.item>

        {{-- With shortcut hint --}}
        <x-ui-dropdown.item shortcut="⌘K">Command Palette</x-ui-dropdown.item>

    Props:
        variant  — default|destructive (default: default)
        as       — HTML tag: button|a (default: button)
        href     — URL when as=a
        disabled — boolean (default: false)
        shortcut — optional keyboard shortcut hint text displayed on the right
--}}

@props([
    'variant' => 'default',
    'as' => 'button',
    'href' => null,
    'disabled' => false,
    'shortcut' => null,
])

@php
    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'destructive' => implode(' ', [
            'text-[oklch(var(--ui-destructive))]',
            'hover:bg-[oklch(var(--ui-destructive)/0.1)]',
            'focus:bg-[oklch(var(--ui-destructive)/0.1)]',
        ]),
        default => implode(' ', [
            'text-[oklch(var(--ui-popover-foreground))]',
            'hover:bg-[oklch(var(--ui-accent))]',
            'hover:text-[oklch(var(--ui-accent-foreground))]',
            'focus:bg-[oklch(var(--ui-accent))]',
            'focus:text-[oklch(var(--ui-accent-foreground))]',
        ]),
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'flex',
        'items-center',
        'w-full',
        'px-3',
        'py-1.5',
        'text-sm',
        'leading-tight',
        'cursor-pointer',
        'select-none',
        'outline-none',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'aria-disabled:pointer-events-none',
        'aria-disabled:opacity-50',
    ]);

    $classes = trim("{$baseClasses} {$variantClasses}");

    // ── Determine tag ────────────────────────────────────────────────
    $tag = $href ? 'a' : $as;
    $isDisabled = (bool) $disabled;
@endphp

<{{ $tag }}
    @if($tag === 'a' && $href) href="{{ $isDisabled ? null : $href }}" @endif
    @if($tag === 'button') type="button" @endif
    @if($isDisabled)
        @if($tag === 'button') disabled @endif
        aria-disabled="true"
        tabindex="-1"
    @endif
    {{ $attributes->class([$classes]) }}
    role="menuitem"
    tabindex="-1"
    x-on:click="$dispatch('dropdown-item-click'); close()"
    data-ui-dropdown-item
>
    {{-- Item content --}}
    <span class="flex items-center gap-2 flex-1 min-w-0 truncate">
        {{ $slot }}
    </span>

    {{-- Shortcut hint --}}
    @if($shortcut)
        <span class="ml-auto pl-4 text-xs tracking-widest text-[oklch(var(--ui-muted-foreground))]" aria-hidden="true">
            {{ $shortcut }}
        </span>
    @endif
</{{ $tag }}>
