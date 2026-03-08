{{--
    Unified UI — Badge Component
    https://unified-ui.space

    Usage:
        <x-ui-badge>Default</x-ui-badge>
        <x-ui-badge variant="success">Active</x-ui-badge>
        <x-ui-badge variant="destructive" size="lg">Critical</x-ui-badge>
        <x-ui-badge variant="outline" dot>Online</x-ui-badge>
        <x-ui-badge variant="warning" removable>Beta</x-ui-badge>
        <x-ui-badge as="a" href="/tags/new" variant="info">New</x-ui-badge>

    Props:
        variant   — default|primary|secondary|destructive|success|warning|info|outline (default: default)
        size      — sm|md|lg (default: md)
        as        — HTML tag to render: span|a|button (default: span)
        href      — URL when as=a
        dot       — boolean, shows a small colored dot indicator before content
        removable — boolean, shows an X button at the end (emits click on the X)
        pill      — boolean, uses fully rounded corners (default: true)
--}}

@props([
    'variant' => 'default',
    'size' => 'md',
    'as' => 'span',
    'href' => null,
    'dot' => false,
    'removable' => false,
    'pill' => true,
])

@php
    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'default' => implode(' ', [
            'bg-[oklch(var(--ui-secondary))]',
            'text-[oklch(var(--ui-secondary-foreground))]',
            'border-transparent',
        ]),
        'primary' => implode(' ', [
            'bg-[oklch(var(--ui-primary))]',
            'text-[oklch(var(--ui-primary-foreground))]',
            'border-transparent',
        ]),
        'secondary' => implode(' ', [
            'bg-[oklch(var(--ui-secondary))]',
            'text-[oklch(var(--ui-secondary-foreground))]',
            'border-transparent',
        ]),
        'destructive' => implode(' ', [
            'bg-[oklch(var(--ui-destructive))]',
            'text-[oklch(var(--ui-destructive-foreground))]',
            'border-transparent',
        ]),
        'success' => implode(' ', [
            'bg-[oklch(var(--ui-success))]',
            'text-[oklch(var(--ui-success-foreground))]',
            'border-transparent',
        ]),
        'warning' => implode(' ', [
            'bg-[oklch(var(--ui-warning))]',
            'text-[oklch(var(--ui-warning-foreground))]',
            'border-transparent',
        ]),
        'info' => implode(' ', [
            'bg-[oklch(var(--ui-info))]',
            'text-[oklch(var(--ui-info-foreground))]',
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'border-[oklch(var(--ui-border))]',
        ]),
        default => implode(' ', [
            'bg-[oklch(var(--ui-secondary))]',
            'text-[oklch(var(--ui-secondary-foreground))]',
            'border-transparent',
        ]),
    };

    // ── Dot color (matches variant semantic color) ───────────────────
    $dotClasses = match ($variant) {
        'default', 'secondary' => 'bg-[oklch(var(--ui-secondary-foreground)/0.5)]',
        'primary' => 'bg-[oklch(var(--ui-primary-foreground)/0.7)]',
        'destructive' => 'bg-[oklch(var(--ui-destructive-foreground)/0.7)]',
        'success' => 'bg-[oklch(var(--ui-success-foreground)/0.7)]',
        'warning' => 'bg-[oklch(var(--ui-warning-foreground)/0.7)]',
        'info' => 'bg-[oklch(var(--ui-info-foreground)/0.7)]',
        'outline' => 'bg-[oklch(var(--ui-foreground)/0.5)]',
        default => 'bg-[oklch(var(--ui-secondary-foreground)/0.5)]',
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'px-1.5 py-0 text-[10px] leading-4 gap-1',
        'md' => 'px-2 py-0.5 text-xs leading-4 gap-1.5',
        'lg' => 'px-2.5 py-1 text-sm leading-4 gap-1.5',
        default => 'px-2 py-0.5 text-xs leading-4 gap-1.5',
    };

    // ── Dot size ─────────────────────────────────────────────────────
    $dotSizeClasses = match ($size) {
        'sm' => 'h-1 w-1',
        'md' => 'h-1.5 w-1.5',
        'lg' => 'h-2 w-2',
        default => 'h-1.5 w-1.5',
    };

    // ── Close/remove button size ─────────────────────────────────────
    $closeSizeClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };

    // ── Border radius ────────────────────────────────────────────────
    $radiusClass = $pill
        ? 'rounded-full'
        : 'rounded-[var(--ui-radius-sm)]';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex items-center',
        'border',
        'font-medium',
        'whitespace-nowrap',
        'select-none',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
    ]);

    // ── Interactive styles (when used as a link or button) ───────────
    $interactiveClasses = ($href || $as === 'button' || $as === 'a')
        ? 'cursor-pointer hover:opacity-80 active:opacity-70'
        : '';

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$variantClasses} {$sizeClasses} {$radiusClass} {$interactiveClasses}");

    // ── Determine which tag to render ────────────────────────────────
    $tag = $href ? 'a' : $as;
@endphp

<{{ $tag }}
    @if($tag === 'a' && $href) href="{{ $href }}" @endif
    @if($tag === 'button') type="button" @endif
    {{ $attributes->class([$classes]) }}
>
    {{-- Optional dot indicator --}}
    @if($dot)
        <span
            class="{{ $dotClasses }} {{ $dotSizeClasses }} shrink-0 rounded-full"
            aria-hidden="true"
        ></span>
    @endif

    {{-- Badge content --}}
    {{ $slot }}

    {{-- Optional remove / close button --}}
    @if($removable)
        <button
            type="button"
            class="{{ $closeSizeClasses }} shrink-0 inline-flex items-center justify-center rounded-full opacity-60 hover:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-[oklch(var(--ui-ring))] transition-opacity duration-[var(--ui-duration-fast)]"
            aria-label="Remove"
            onclick="this.closest('[data-ui-badge]')?.remove()"
        >
            <svg
                class="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    @endif
</{{ $tag }
