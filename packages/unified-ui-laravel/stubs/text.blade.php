@props([
    'as' => 'p',
    'size' => 'base',
    'weight' => 'normal',
    'color' => 'default',
    'leading' => 'normal',
    'align' => null,
    'tracking' => 'normal',
    'truncate' => false,
    'clamp' => null,
    'italic' => false,
    'underline' => false,
    'lineThrough' => false,
    'prose' => false,
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs'  => 'text-xs',
        'sm'  => 'text-sm',
        'base' => 'text-base',
        'lg'  => 'text-lg',
        'xl'  => 'text-xl',
        '2xl' => 'text-2xl',
        default => 'text-base',
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
        default     => 'font-normal',
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
        'inherit'     => 'text-inherit',
        default       => 'text-[oklch(var(--ui-foreground))]',
    };

    // ── Leading (line-height) classes ─────────────────────────────────
    $leadingClasses = match ($leading) {
        'none'    => 'leading-none',
        'tight'   => 'leading-tight',
        'snug'    => 'leading-snug',
        'normal'  => 'leading-normal',
        'relaxed' => 'leading-relaxed',
        'loose'   => 'leading-loose',
        default   => 'leading-normal',
    };

    // ── Tracking (letter-spacing) classes ─────────────────────────────
    $trackingClasses = match ($tracking) {
        'tighter' => 'tracking-tighter',
        'tight'   => 'tracking-tight',
        'normal'  => 'tracking-normal',
        'wide'    => 'tracking-wide',
        'wider'   => 'tracking-wider',
        default   => 'tracking-normal',
    };

    // ── Alignment classes ────────────────────────────────────────────
    $alignClasses = match ($align) {
        'left'    => 'text-left',
        'center'  => 'text-center',
        'right'   => 'text-right',
        'justify' => 'text-justify',
        default   => '',
    };

    // ── Truncation ───────────────────────────────────────────────────
    $truncateClasses = $truncate ? 'truncate' : '';

    // ── Line clamping ────────────────────────────────────────────────
    $clampClasses = '';
    $clampStyle = '';
    if ($clamp !== null && (int) $clamp > 0) {
        $clampClasses = 'overflow-hidden';
        $clampStyle = "display: -webkit-box; -webkit-line-clamp: {$clamp}; -webkit-box-orient: vertical;";
    }

    // ── Font style ───────────────────────────────────────────────────
    $italicClasses = $italic ? 'italic' : '';

    // ── Text decoration ──────────────────────────────────────────────
    $decorationClasses = implode(' ', array_filter([
        $underline ? 'underline underline-offset-2' : '',
        $lineThrough ? 'line-through' : '',
    ]));

    // ── Prose mode ───────────────────────────────────────────────────
    $proseClasses = $prose ? '[&>*+*]:mt-2' : '';

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $sizeClasses,
        $weightClasses,
        $colorClasses,
        $leadingClasses,
        $trackingClasses,
        $alignClasses,
        $truncateClasses,
        $clampClasses,
        $italicClasses,
        $decorationClasses,
        $proseClasses,
    ])));
@endphp

<{{ $as }}
    {{ $attributes->class([$classes]) }}
    @if($clampStyle) style="{{ $clampStyle }}" @endif
    data-ui-text
>
    {{ $slot }}
</{{ $as }}>
