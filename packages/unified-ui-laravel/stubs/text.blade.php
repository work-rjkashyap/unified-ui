{{--
    Unified UI — Text Component
    https://unified-ui.space

    A styled body text component with configurable size, weight, color,
    leading (line-height), and alignment variants. Uses design tokens
    for consistent typography across the application.

    Usage:
        {{-- Basic text --}}
        <x-ui-text>This is body text content.</x-ui-text>

        {{-- Size variants --}}
        <x-ui-text size="xs">Extra small text</x-ui-text>
        <x-ui-text size="sm">Small text</x-ui-text>
        <x-ui-text size="base">Base text</x-ui-text>
        <x-ui-text size="lg">Large text</x-ui-text>
        <x-ui-text size="xl">Extra large text</x-ui-text>

        {{-- Color variants --}}
        <x-ui-text color="default">Default foreground text.</x-ui-text>
        <x-ui-text color="muted">Secondary muted text.</x-ui-text>
        <x-ui-text color="primary">Primary accent text.</x-ui-text>
        <x-ui-text color="destructive">Destructive / error text.</x-ui-text>
        <x-ui-text color="success">Success text.</x-ui-text>
        <x-ui-text color="warning">Warning text.</x-ui-text>
        <x-ui-text color="info">Informational text.</x-ui-text>

        {{-- Weight variants --}}
        <x-ui-text weight="normal">Normal weight</x-ui-text>
        <x-ui-text weight="medium">Medium weight</x-ui-text>
        <x-ui-text weight="semibold">Semibold weight</x-ui-text>
        <x-ui-text weight="bold">Bold weight</x-ui-text>

        {{-- Leading (line-height) variants --}}
        <x-ui-text leading="tight">Tight line height for compact layouts.</x-ui-text>
        <x-ui-text leading="relaxed">Relaxed line height for readability.</x-ui-text>
        <x-ui-text leading="loose">Loose line height for spacious layouts.</x-ui-text>

        {{-- Alignment --}}
        <x-ui-text align="center">Centered text content.</x-ui-text>
        <x-ui-text align="right">Right-aligned text.</x-ui-text>

        {{-- Render as a different HTML tag --}}
        <x-ui-text as="span">Inline text as span</x-ui-text>
        <x-ui-text as="div">Block text as div</x-ui-text>
        <x-ui-text as="label" for="email">Label text</x-ui-text>

        {{-- Truncation --}}
        <x-ui-text truncate class="max-w-xs">
            Very long text that will be truncated with an ellipsis when it overflows.
        </x-ui-text>

        {{-- Line clamping --}}
        <x-ui-text clamp="2">
            Long multi-line text that will be clamped to two visible
            lines with an ellipsis at the end of the second line.
        </x-ui-text>

        {{-- Italic / decorative --}}
        <x-ui-text italic>Italicized text content.</x-ui-text>
        <x-ui-text underline>Underlined text content.</x-ui-text>
        <x-ui-text line-through>Strikethrough text.</x-ui-text>

        {{-- Prose mode (adds spacing between block children) --}}
        <x-ui-text prose>
            <p>First paragraph of prose content.</p>
            <p>Second paragraph with automatic spacing.</p>
        </x-ui-text>

    Props:
        as          — HTML tag to render: p|span|div|label|small|strong|em (default: p)
        size        — xs|sm|base|lg|xl|2xl (default: base)
        weight      — thin|light|normal|medium|semibold|bold|extrabold (default: normal)
        color       — default|muted|primary|secondary|destructive|success|warning|info|inherit (default: default)
        leading     — none|tight|snug|normal|relaxed|loose (default: normal)
        align       — left|center|right|justify (default: null — inherits from parent)
        tracking    — tighter|tight|normal|wide|wider (default: normal)
        truncate    — boolean, truncates single-line text with ellipsis (default: false)
        clamp       — integer|null, limits visible lines with CSS line-clamp (default: null)
        italic      — boolean, applies italic font style (default: false)
        underline   — boolean, applies underline decoration (default: false)
        lineThrough — boolean, applies line-through decoration (default: false)
        prose       — boolean, adds vertical spacing between child block elements (default: false)
--}}

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
