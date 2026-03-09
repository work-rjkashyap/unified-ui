@props([
    'as' => 'div',
    'size' => 'xl',
    'padding' => 'md',
    'centered' => false,
    'fluid' => false,
])

@php
    // ── Max-width classes ─────────────────────────────────────────────
    $maxWidthClasses = $fluid ? '' : match ($size) {
        'sm'    => 'max-w-screen-sm',
        'md'    => 'max-w-screen-md',
        'lg'    => 'max-w-screen-lg',
        'xl'    => 'max-w-screen-xl',
        '2xl'   => 'max-w-screen-2xl',
        'full'  => 'max-w-full',
        'prose' => 'max-w-prose',
        default => 'max-w-screen-xl',
    };

    // ── Horizontal padding classes ────────────────────────────────────
    $paddingClasses = match ($padding) {
        'none' => '',
        'sm'   => 'px-3 sm:px-4',
        'md'   => 'px-4 sm:px-6 lg:px-8',
        'lg'   => 'px-6 sm:px-8 lg:px-12',
        'xl'   => 'px-8 sm:px-12 lg:px-16',
        default => 'px-4 sm:px-6 lg:px-8',
    };

    // ── Centered text ────────────────────────────────────────────────
    $centeredClasses = $centered ? 'text-center' : '';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'mx-auto',
        'w-full',
    ]);

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $baseClasses,
        $maxWidthClasses,
        $paddingClasses,
        $centeredClasses,
    ])));
@endphp

<{{ $as }}
    {{ $attributes->class([$classes]) }}
    data-ui-container
    data-ui-container-size="{{ $size }}"
>
    {{ $slot }}
</{{ $as }}>
