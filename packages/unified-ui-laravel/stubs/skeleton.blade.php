{{--
    Unified UI — Skeleton Component
    https://unified-ui.space

    Animated placeholder shapes for content loading states.
    Supports rectangles, circles, and text line placeholders.

    Usage:
        {{-- Basic rectangle skeleton --}}
        <x-ui-skeleton class="h-4 w-48" />

        {{-- Circle skeleton (avatar placeholder) --}}
        <x-ui-skeleton variant="circle" size="md" />

        {{-- Text lines skeleton --}}
        <x-ui-skeleton variant="text" :lines="3" />

        {{-- Card placeholder --}}
        <div class="space-y-3">
            <x-ui-skeleton class="h-40 w-full" rounded="lg" />
            <x-ui-skeleton class="h-4 w-3/4" />
            <x-ui-skeleton class="h-4 w-1/2" />
        </div>

        {{-- Custom animation --}}
        <x-ui-skeleton class="h-8 w-32" animation="pulse" />

        {{-- No animation (static placeholder) --}}
        <x-ui-skeleton class="h-8 w-32" :animate="false" />

    Props:
        variant   — rectangle|circle|text (default: rectangle)
        size      — xs|sm|md|lg|xl (used for circle variant; default: md)
        rounded   — none|sm|md|lg|xl|full (default: md; circle always uses full)
        animation — pulse|wave|none (default: pulse)
        animate   — boolean, enables/disables animation (default: true)
        lines     — integer, number of text lines to render when variant=text (default: 3)
        gap       — spacing between text lines: 1|2|3|4 (default: 2)
--}}

@props([
    'variant' => 'rectangle',
    'size' => 'md',
    'rounded' => 'md',
    'animation' => 'pulse',
    'animate' => true,
    'lines' => 3,
    'gap' => 2,
])

@php
    // ── Animation classes ─────────────────────────────────────────────
    $animationClasses = '';
    if ($animate) {
        $animationClasses = match ($animation) {
            'pulse' => 'animate-pulse',
            'wave' => 'ui-skeleton-wave',
            'none' => '',
            default => 'animate-pulse',
        };
    }

    // ── Border radius classes ─────────────────────────────────────────
    $roundedClasses = match ($variant === 'circle' ? 'full' : $rounded) {
        'none' => 'rounded-none',
        'sm' => 'rounded-[var(--ui-radius-sm)]',
        'md' => 'rounded-[var(--ui-radius-md)]',
        'lg' => 'rounded-[var(--ui-radius-lg)]',
        'xl' => 'rounded-[var(--ui-radius-xl)]',
        'full' => 'rounded-full',
        default => 'rounded-[var(--ui-radius-md)]',
    };

    // ── Circle size classes ───────────────────────────────────────────
    $circleSizeClasses = match ($size) {
        'xs' => 'h-6 w-6',
        'sm' => 'h-8 w-8',
        'md' => 'h-10 w-10',
        'lg' => 'h-12 w-12',
        'xl' => 'h-16 w-16',
        '2xl' => 'h-20 w-20',
        default => 'h-10 w-10',
    };

    // ── Text line height classes ──────────────────────────────────────
    $textLineHeight = 'h-3.5';

    // ── Gap between text lines ───────────────────────────────────────
    $gapClasses = match ((string) $gap) {
        '1' => 'space-y-1',
        '2' => 'space-y-2',
        '3' => 'space-y-3',
        '4' => 'space-y-4',
        default => 'space-y-2',
    };

    // ── Base color / background ──────────────────────────────────────
    $baseClasses = implode(' ', [
        'bg-[oklch(var(--ui-muted))]',
    ]);

    // ── Build classes per variant ─────────────────────────────────────
    $rectangleClasses = trim("{$baseClasses} {$roundedClasses} {$animationClasses}");
    $circleClasses = trim("{$baseClasses} {$circleSizeClasses} rounded-full {$animationClasses}");
@endphp

@if($variant === 'text')
    {{-- Text lines variant: renders multiple skeleton lines with varying widths --}}
    <div
        {{ $attributes->class([$gapClasses]) }}
        role="status"
        aria-label="Loading"
        aria-busy="true"
        data-ui-skeleton
        data-ui-skeleton-variant="text"
    >
        <span class="sr-only">Loading…</span>

        @for($i = 0; $i < (int) $lines; $i++)
            @php
                // Vary widths to look natural: full, 3/4, 5/6, 2/3, 1/2, etc.
                $widthClasses = match ($i % 5) {
                    0 => 'w-full',
                    1 => 'w-3/4',
                    2 => 'w-5/6',
                    3 => 'w-2/3',
                    4 => 'w-4/5',
                };

                // Last line is always shorter for a realistic look
                if ($i === (int) $lines - 1 && (int) $lines > 1) {
                    $widthClasses = 'w-1/2';
                }
            @endphp
            <div
                class="{{ $baseClasses }} {{ $textLineHeight }} {{ $widthClasses }} {{ $roundedClasses }} {{ $animationClasses }}"
                @if($animate && $animation === 'pulse')
                    style="animation-delay: {{ $i * 75 }}ms"
                @endif
                aria-hidden="true"
            ></div>
        @endfor
    </div>

@elseif($variant === 'circle')
    {{-- Circle variant: avatar / icon placeholder --}}
    <div
        {{ $attributes->class([$circleClasses]) }}
        role="status"
        aria-label="Loading"
        aria-busy="true"
        data-ui-skeleton
        data-ui-skeleton-variant="circle"
    >
        <span class="sr-only">Loading…</span>
    </div>

@else
    {{-- Rectangle variant (default): generic block placeholder --}}
    <div
        {{ $attributes->class([$rectangleClasses]) }}
        role="status"
        aria-label="Loading"
        aria-busy="true"
        data-ui-skeleton
        data-ui-skeleton-variant="rectangle"
    >
        <span class="sr-only">Loading…</span>
    </div>
@endif

{{-- Wave animation keyframes (only needed once on the page) --}}
@once
@push('styles')
<style>
    @keyframes ui-skeleton-wave-anim {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }

    .ui-skeleton-wave {
        background: linear-gradient(
            90deg,
            oklch(var(--ui-muted)) 25%,
            oklch(var(--ui-muted) / 0.5) 50%,
            oklch(var(--ui-muted)) 75%
        );
        background-size: 200% 100%;
        animation: ui-skeleton-wave-anim 1.8s ease-in-out infinite;
    }
</style>
@endpush
@endonce
