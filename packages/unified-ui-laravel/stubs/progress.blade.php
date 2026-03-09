@props([
    'value' => null,
    'max' => 100,
    'variant' => 'default',
    'size' => 'md',
    'label' => null,
    'showValue' => false,
    'format' => 'percent',
    'striped' => false,
    'animated' => false,
    'rounded' => true,
])

@php
    $max = max(1, (int) $max);
    $isIndeterminate = is_null($value);
    $numericValue = $isIndeterminate ? 0 : max(0, min((int) $value, $max));
    $percentage = $isIndeterminate ? 0 : round(($numericValue / $max) * 100, 1);

    // ── Display value text ───────────────────────────────────────────
    $displayValue = match ($format) {
        'value' => (string) $numericValue,
        'fraction' => "{$numericValue}/{$max}",
        default => "{$percentage}%",
    };

    // ── Variant fill color ───────────────────────────────────────────
    $fillColor = match ($variant) {
        'success' => '--ui-success',
        'warning' => '--ui-warning',
        'destructive' => '--ui-destructive',
        'info' => '--ui-info',
        'primary' => '--ui-primary',
        default => '--ui-primary',
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs' => 'h-1',
        'sm' => 'h-1.5',
        'md' => 'h-2.5',
        'lg' => 'h-4',
        default => 'h-2.5',
    };

    // ── Rounded classes ──────────────────────────────────────────────
    $roundedClasses = $rounded ? 'rounded-full' : 'rounded-[var(--ui-radius-sm)]';

    // ── Track classes ────────────────────────────────────────────────
    $trackClasses = implode(' ', [
        'w-full',
        'overflow-hidden',
        'bg-[oklch(var(--ui-muted))]',
        $sizeClasses,
        $roundedClasses,
    ]);

    // ── Fill classes ─────────────────────────────────────────────────
    $fillClasses = implode(' ', [
        'h-full',
        "bg-[oklch(var({$fillColor}))]",
        $roundedClasses,
        'transition-all',
        'duration-[var(--ui-duration-slow)]',
        'ease-[var(--ui-ease-out)]',
    ]);

    // ── Label text classes ───────────────────────────────────────────
    $labelTextClasses = 'text-sm font-medium text-[oklch(var(--ui-foreground))]';
    $valueTextClasses = 'text-sm tabular-nums text-[oklch(var(--ui-muted-foreground))]';
@endphp

<div
    {{ $attributes->class(['w-full']) }}
    role="progressbar"
    @if(!$isIndeterminate)
        aria-valuenow="{{ $numericValue }}"
    @endif
    aria-valuemin="0"
    aria-valuemax="{{ $max }}"
    @if($label) aria-label="{{ $label }}" @endif
    data-ui-progress
    @if($isIndeterminate) data-ui-progress-indeterminate @endif
>
    {{-- Label row --}}
    @if($label || $showValue)
        <div class="flex items-center justify-between mb-1.5">
            @if($label)
                <span class="{{ $labelTextClasses }}">{{ $label }}</span>
            @else
                <span></span>
            @endif

            @if($showValue && !$isIndeterminate)
                <span class="{{ $valueTextClasses }}">{{ $displayValue }}</span>
            @endif
        </div>
    @endif

    {{-- Track --}}
    <div class="{{ $trackClasses }}">
        @if($isIndeterminate)
            {{-- Indeterminate animated bar --}}
            <div
                class="{{ $fillClasses }}"
                style="width: 40%; animation: ui-progress-indeterminate 1.5s ease-in-out infinite;"
            ></div>
        @else
            {{-- Determinate fill --}}
            <div
                class="{{ $fillClasses }} @if($striped) ui-progress-striped @if($animated) ui-progress-striped-animated @endif @endif"
                style="width: {{ $percentage }}%"
            ></div>
        @endif
    </div>
</div>

{{-- Indeterminate and striped keyframes --}}
@once
@push('styles')
<style>
    @keyframes ui-progress-indeterminate {
        0% {
            transform: translateX(-100%);
        }
        50% {
            transform: translateX(150%);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    .ui-progress-striped {
        background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
        );
        background-size: 1rem 1rem;
    }

    .ui-progress-striped-animated {
        animation: ui-progress-stripe-move 0.75s linear infinite;
    }

    @keyframes ui-progress-stripe-move {
        0% {
            background-position: 1rem 0;
        }
        100% {
            background-position: 0 0;
        }
    }
</style>
@endpush
@endonce
