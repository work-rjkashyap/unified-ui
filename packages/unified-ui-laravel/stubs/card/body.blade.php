@props([
    'padding' => 'md',
])

@php
    // ── Padding classes ──────────────────────────────────────────────
    $paddingClasses = match ($padding) {
        'none' => '',
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        'xl' => 'px-10 py-8',
        default => 'px-6 py-4',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'text-[oklch(var(--ui-card-foreground))]',
        'text-sm',
        'leading-relaxed',
    ]);

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$paddingClasses}");
@endphp

<div {{ $attributes->class([$classes]) }} data-ui-card-body>
    {{ $slot }}
</div>
