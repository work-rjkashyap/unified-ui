{{--
    Unified UI — Spinner Component
    https://unified-ui.space

    An animated loading spinner with configurable size, color, and
    screen-reader accessible label text.

    Usage:
        <x-ui-spinner />
        <x-ui-spinner size="lg" />
        <x-ui-spinner size="sm" variant="primary" />
        <x-ui-spinner variant="white" label="Uploading…" />
        <x-ui-spinner size="xs" variant="muted" />

    Props:
        size    — xs|sm|md|lg|xl (default: md)
        variant — current|primary|secondary|destructive|muted|white (default: current)
        label   — screen-reader text (default: "Loading…")
        track   — boolean, show a faded background track ring (default: true)
--}}

@props([
    'size' => 'md',
    'variant' => 'current',
    'label' => 'Loading…',
    'track' => true,
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs' => 'h-3 w-3',
        'sm' => 'h-4 w-4',
        'md' => 'h-6 w-6',
        'lg' => 'h-8 w-8',
        'xl' => 'h-12 w-12',
        default => 'h-6 w-6',
    };

    // ── Stroke width scales with size ────────────────────────────────
    $strokeWidth = match ($size) {
        'xs' => '5',
        'sm' => '4.5',
        'md' => '4',
        'lg' => '3.5',
        'xl' => '3',
        default => '4',
    };

    // ── Variant color classes ────────────────────────────────────────
    $colorClasses = match ($variant) {
        'current' => 'text-current',
        'primary' => 'text-[oklch(var(--ui-primary))]',
        'secondary' => 'text-[oklch(var(--ui-secondary-foreground))]',
        'destructive' => 'text-[oklch(var(--ui-destructive))]',
        'success' => 'text-[oklch(var(--ui-success))]',
        'warning' => 'text-[oklch(var(--ui-warning))]',
        'muted' => 'text-[oklch(var(--ui-muted-foreground))]',
        'white' => 'text-white',
        default => 'text-current',
    };

    // ── Track (background ring) opacity ──────────────────────────────
    $trackOpacity = $track ? '0.2' : '0';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'inline-block',
        'shrink-0',
        'animate-spin',
    ]);

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$sizeClasses} {$colorClasses}");
@endphp

<svg
    {{ $attributes->class([$classes]) }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-live="polite"
    data-ui-spinner
>
    {{-- Screen-reader label --}}
    <title>{{ $label }}</title>

    {{-- Background track ring --}}
    @if($track)
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="{{ $strokeWidth }}"
            opacity="{{ $trackOpacity }}"
        />
    @endif

    {{-- Animated arc --}}
    <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        opacity="0.85"
    />
</svg>

{{-- Accessible text for screen readers (outside the SVG for broader SR support) --}}
<span class="sr-only">{{ $label }}</span>
