@props([
    'ratio' => '16/9',
])

@php
    // ── Parse the ratio value ─────────────────────────────────────────
    // Accepts formats like "16/9", "4/3", "1/1", or numeric like 1.778
    $cssRatio = $ratio;
    $paddingPercent = null;

    if (is_numeric($ratio)) {
        // Numeric ratio (e.g. 1.778 for ~16:9)
        $numericRatio = (float) $ratio;
        $cssRatio = $numericRatio;
        $paddingPercent = $numericRatio > 0 ? round((1 / $numericRatio) * 100, 4) : 56.25;
    } elseif (is_string($ratio) && str_contains($ratio, '/')) {
        // Fractional ratio (e.g. "16/9")
        $parts = explode('/', $ratio);
        $w = (float) trim($parts[0]);
        $h = (float) trim($parts[1] ?? 1);
        $paddingPercent = $w > 0 ? round(($h / $w) * 100, 4) : 56.25;
    } else {
        // Fallback to 16:9
        $cssRatio = '16/9';
        $paddingPercent = 56.25;
    }

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'w-full',
        'overflow-hidden',
    ]);
@endphp

<div
    {{ $attributes->class([$baseClasses]) }}
    style="aspect-ratio: {{ $cssRatio }};"
    data-ui-aspect-ratio
    data-ui-aspect-ratio-value="{{ $ratio }}"
>
    {{-- Inner wrapper ensures children fill the entire ratio box --}}
    <div class="absolute inset-0 w-full h-full">
        {{ $slot }}
    </div>

    {{-- Padding-bottom fallback for browsers without aspect-ratio support --}}
    <noscript>
        <style>
            [data-ui-aspect-ratio][data-ui-aspect-ratio-value="{{ $ratio }}"] {
                aspect-ratio: auto;
                padding-bottom: {{ $paddingPercent }}%;
            }
        </style>
    </noscript>
</div>
