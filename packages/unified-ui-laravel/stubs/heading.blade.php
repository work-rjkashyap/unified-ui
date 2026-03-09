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
