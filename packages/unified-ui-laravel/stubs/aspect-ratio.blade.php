{{--
    Unified UI — Aspect Ratio Component
    https://unified-ui.space

    A container that maintains a fixed aspect ratio for images, videos,
    and embedded content. Uses the CSS aspect-ratio property with a
    padding-bottom fallback for broader browser support.

    Usage:
        {{-- 16:9 aspect ratio (default) --}}
        <x-ui-aspect-ratio>
            <img src="/hero.jpg" alt="Hero" class="object-cover w-full h-full" />
        </x-ui-aspect-ratio>

        {{-- Square (1:1) --}}
        <x-ui-aspect-ratio ratio="1/1">
            <img src="/avatar.jpg" alt="Avatar" class="object-cover w-full h-full" />
        </x-ui-aspect-ratio>

        {{-- 4:3 --}}
        <x-ui-aspect-ratio ratio="4/3">
            <img src="/photo.jpg" alt="Photo" class="object-cover w-full h-full" />
        </x-ui-aspect-ratio>

        {{-- 21:9 ultrawide --}}
        <x-ui-aspect-ratio ratio="21/9">
            <img src="/banner.jpg" alt="Banner" class="object-cover w-full h-full" />
        </x-ui-aspect-ratio>

        {{-- Video embed --}}
        <x-ui-aspect-ratio ratio="16/9">
            <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full border-0"
            ></iframe>
        </x-ui-aspect-ratio>

        {{-- With rounded corners and overflow hidden --}}
        <x-ui-aspect-ratio ratio="16/9" class="rounded-lg overflow-hidden">
            <img src="/landscape.jpg" alt="Landscape" class="object-cover w-full h-full" />
        </x-ui-aspect-ratio>

        {{-- Custom numeric ratio --}}
        <x-ui-aspect-ratio :ratio="2.35">
            <img src="/cinema.jpg" alt="Cinematic" class="object-cover w-full h-full" />
        </x-ui-aspect-ratio>

    Props:
        ratio — aspect ratio as a string "W/H" or a numeric float value (default: "16/9")
--}}

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
