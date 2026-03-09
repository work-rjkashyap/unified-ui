@props([
    'variant' => 'default',
    'padding' => 'none',
    'as' => 'div',
    'href' => null,
    'hoverable' => false,
    'inset' => false,
])

@php
    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'default' => implode(' ', [
            'bg-[oklch(var(--ui-card))]',
            'text-[oklch(var(--ui-card-foreground))]',
            'border',
            'border-[oklch(var(--ui-border))]',
            'shadow-[var(--ui-shadow-sm)]',
        ]),
        'filled' => implode(' ', [
            'bg-[oklch(var(--ui-muted))]',
            'text-[oklch(var(--ui-card-foreground))]',
            'border',
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-card-foreground))]',
            'border',
            'border-[oklch(var(--ui-border))]',
        ]),
        'ghost' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-card-foreground))]',
            'border',
            'border-transparent',
        ]),
        'elevated' => implode(' ', [
            'bg-[oklch(var(--ui-card))]',
            'text-[oklch(var(--ui-card-foreground))]',
            'border',
            'border-[oklch(var(--ui-border)/0.5)]',
            'shadow-[var(--ui-shadow-lg)]',
        ]),
        default => implode(' ', [
            'bg-[oklch(var(--ui-card))]',
            'text-[oklch(var(--ui-card-foreground))]',
            'border',
            'border-[oklch(var(--ui-border))]',
            'shadow-[var(--ui-shadow-sm)]',
        ]),
    };

    // ── Padding classes (when using card without sub-components) ─────
    $paddingClasses = match ($padding) {
        'none' => '',
        'sm' => 'p-3',
        'md' => 'p-4',
        'lg' => 'p-6',
        'xl' => 'p-8',
        default => '',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'rounded-[var(--ui-radius-xl)]',
        'overflow-hidden',
        'transition-all',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
    ]);

    // ── Hoverable effect ─────────────────────────────────────────────
    $hoverableClasses = $hoverable ? implode(' ', [
        'hover:shadow-[var(--ui-shadow-lg)]',
        'hover:-translate-y-0.5',
        'active:translate-y-0',
        'active:shadow-[var(--ui-shadow-md)]',
    ]) : '';

    // ── Interactive / anchor styles ──────────────────────────────────
    $interactiveClasses = ($href || $as === 'a' || $as === 'button') ? implode(' ', [
        'cursor-pointer',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        $hoverable ? '' : 'hover:border-[oklch(var(--ui-ring)/0.5)]',
    ]) : '';

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$variantClasses} {$paddingClasses} {$hoverableClasses} {$interactiveClasses}");

    // ── Determine which tag to render ────────────────────────────────
    $tag = $href ? 'a' : $as;
@endphp

<{{ $tag }}
    @if($tag === 'a' && $href) href="{{ $href }}" @endif
    @if($tag === 'button') type="button" @endif
    {{ $attributes->class([$classes]) }}
    data-ui-card
    @if($inset) data-ui-card-inset @endif
>
    {{ $slot }}
</{{ $tag }}>
