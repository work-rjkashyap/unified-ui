{{--
    Unified UI — Card Body Sub-Component
    https://unified-ui.space

    The main content area of a card.

    Usage:
        <x-ui-card>
            <x-ui-card.body>
                <p>Main card content goes here.</p>
            </x-ui-card.body>
        </x-ui-card>

        <x-ui-card>
            <x-ui-card.body padding="lg">
                <p>More spacious content area.</p>
            </x-ui-card.body>
        </x-ui-card>

        <x-ui-card>
            <x-ui-card.body padding="none">
                <img src="/hero.jpg" alt="Full-bleed image" class="w-full" />
            </x-ui-card.body>
        </x-ui-card>

    Props:
        padding — none|sm|md|lg|xl (default: md)
--}}

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
