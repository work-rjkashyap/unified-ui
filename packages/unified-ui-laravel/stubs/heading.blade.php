{{--
    Unified UI — Heading Component
    https://unified-ui.space

    A semantic heading component with configurable level (h1–h6),
    size, tracking, weight, and color variants. Uses design tokens
    for consistent typography across the application.

    Usage:
        {{-- Basic heading --}}
        <x-ui-heading>Page Title</x-ui-heading>

        {{-- Specific level --}}
        <x-ui-heading level="1">Main Heading</x-ui-heading>
        <x-ui-heading level="2">Section Heading</x-ui-heading>
        <x-ui-heading level="3">Sub-section</x-ui-heading>
        <x-ui-heading level="4">Card Title</x-ui-heading>

        {{-- Custom size (independent of level) --}}
        <x-ui-heading level="2" size="4xl">Hero Title</x-ui-heading>
        <x-ui-heading level="3" size="lg">Small Section</x-ui-heading>

        {{-- Weight variants --}}
        <x-ui-heading weight="normal">Light heading</x-ui-heading>
        <x-ui-heading weight="bold">Bold heading</x-ui-heading>
        <x-ui-heading weight="extrabold">Extra bold</x-ui-heading>

        {{-- Tracking (letter-spacing) --}}
        <x-ui-heading tracking="tight">Tight tracking</x-ui-heading>
        <x-ui-heading tracking="wide">Wide tracking</x-ui-heading>

        {{-- Color variants --}}
        <x-ui-heading color="default">Default color</x-ui-heading>
        <x-ui-heading color="muted">Muted heading</x-ui-heading>
        <x-ui-heading color="primary">Primary accent</x-ui-heading>

        {{-- Render as a different tag (e.g. styled like h2 but semantically a p) --}}
        <x-ui-heading as="p" size="2xl">Looks like h2 but is a paragraph</x-ui-heading>

        {{-- Truncated --}}
        <x-ui-heading truncate class="max-w-xs">
            Very long heading text that will be truncated with an ellipsis
        </x-ui-heading>

        {{-- With custom leading (line height) --}}
        <x-ui-heading leading="tight">Tight line height</x-ui-heading>

    Props:
        level    — 1|2|3|4|5|6 — the semantic heading level (default: 2)
        as       — override the HTML tag: h1|h2|h3|h4|h5|h6|p|span|div (default: null — derived from level)
        size     — xs|sm|base|lg|xl|2xl|3xl|4xl|5xl (default: null — derived from level)
        weight   — thin|light|normal|medium|semibold|bold|extrabold|black (default: semibold)
        tracking — tighter|tight|normal|wide|wider|widest (default: tight)
        leading  — none|tight|snug|normal|relaxed|loose (default: tight)
        color    — default|muted|primary|secondary|destructive|success|warning|info (default: default)
        truncate — boolean, truncates with ellipsis on overflow (default: false)
--}}

@props([
    'level' => 2,
    'as' => null,
    'size' => null,
    'weight' => 'semibold',
    'tracking' => 'tight',
    'leading' => 'tight',
    'color' => 'default',
    'truncate' => false,
])

@php
    // ── Resolve the HTML tag from level or explicit `as` prop ─────────
    $tag = $as ?? ('h' . max(1, min(6, (int) $level)));

    // ── Size classes (derived from level if not explicitly set) ───────
    $resolvedSize = $size ?? match ((int) $level) {
        1 => '3xl',
        2 => '2xl',
        3 => 'xl',
        4 => 'lg',
        5 => 'base',
        6 => 'sm',
        default => '2xl',
    };

    $sizeClasses = match ($resolvedSize) {
        'xs'  => 'text-xs',
        'sm'  => 'text-sm',
        'base' => 'text-base',
        'lg'  => 'text-lg',
        'xl'  => 'text-xl',
        '2xl' => 'text-2xl',
        '3xl' => 'text-3xl',
        '4xl' => 'text-4xl',
        '5xl' => 'text-5xl',
        default => 'text-2xl',
    };

    // ── Weight classes ────────────────────────────────────────────────
    $weightClasses = match ($weight) {
        'thin'      => 'font-thin',
        'light'     => 'font-light',
        'normal'    => 'font-normal',
        'medium'    => 'font-medium',
        'semibold'  => 'font-semibold',
        'bold'      => 'font-bold',
        'extrabold' => 'font-extrabold',
        'black'     => 'font-black',
        default     => 'font-semibold',
    };

    // ── Tracking (letter-spacing) classes ─────────────────────────────
    $trackingClasses = match ($tracking) {
        'tighter' => 'tracking-tighter',
        'tight'   => 'tracking-tight',
        'normal'  => 'tracking-normal',
        'wide'    => 'tracking-wide',
        'wider'   => 'tracking-wider',
        'widest'  => 'tracking-widest',
        default   => 'tracking-tight',
    };

    // ── Leading (line-height) classes ─────────────────────────────────
    $leadingClasses = match ($leading) {
        'none'    => 'leading-none',
        'tight'   => 'leading-tight',
        'snug'    => 'leading-snug',
        'normal'  => 'leading-normal',
        'relaxed' => 'leading-relaxed',
        'loose'   => 'leading-loose',
        default   => 'leading-tight',
    };

    // ── Color classes ────────────────────────────────────────────────
    $colorClasses = match ($color) {
        'muted'       => 'text-[oklch(var(--ui-muted-foreground))]',
        'primary'     => 'text-[oklch(var(--ui-primary))]',
        'secondary'   => 'text-[oklch(var(--ui-secondary-foreground))]',
        'destructive' => 'text-[oklch(var(--ui-destructive))]',
        'success'     => 'text-[oklch(var(--ui-success))]',
        'warning'     => 'text-[oklch(var(--ui-warning))]',
        'info'        => 'text-[oklch(var(--ui-info))]',
        default       => 'text-[oklch(var(--ui-foreground))]',
    };

    // ── Truncation ───────────────────────────────────────────────────
    $truncateClasses = $truncate ? 'truncate' : '';

    // ── Scroll margin for anchor linking ─────────────────────────────
    $scrollMarginClasses = 'scroll-m-20';

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', [
        $sizeClasses,
        $weightClasses,
        $trackingClasses,
        $leadingClasses,
        $colorClasses,
        $truncateClasses,
        $scrollMarginClasses,
    ]));
@endphp

<{{ $tag }} {{ $attributes->class([$classes]) }} data-ui-heading data-ui-heading-level="{{ $level }}">
    {{ $slot }}
</{{ $tag }}>
