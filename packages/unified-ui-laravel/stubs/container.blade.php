{{--
    Unified UI — Container Component
    https://unified-ui.space

    A responsive max-width container with auto horizontal margins and
    configurable size breakpoints. Centers page content and provides
    consistent horizontal padding across viewport sizes.

    Usage:
        {{-- Basic container --}}
        <x-ui-container>
            <p>Centered page content with default max-width.</p>
        </x-ui-container>

        {{-- Size variants --}}
        <x-ui-container size="sm">Narrow content area.</x-ui-container>
        <x-ui-container size="md">Medium content area.</x-ui-container>
        <x-ui-container size="lg">Wide content area.</x-ui-container>
        <x-ui-container size="xl">Extra-wide content area.</x-ui-container>
        <x-ui-container size="2xl">Maximum content area.</x-ui-container>
        <x-ui-container size="full">Full width (no max-width).</x-ui-container>

        {{-- With custom padding --}}
        <x-ui-container padding="none">No horizontal padding.</x-ui-container>
        <x-ui-container padding="sm">Small horizontal padding.</x-ui-container>
        <x-ui-container padding="lg">Large horizontal padding.</x-ui-container>

        {{-- Centered content (text-center) --}}
        <x-ui-container centered>
            <h1>Centered heading</h1>
            <p>Centered paragraph text.</p>
        </x-ui-container>

        {{-- As a different HTML element --}}
        <x-ui-container as="section">
            <p>Rendered as a section element.</p>
        </x-ui-container>

        <x-ui-container as="main">
            <p>Rendered as a main element.</p>
        </x-ui-container>

        {{-- Fluid container (full width with padding, no max-width) --}}
        <x-ui-container fluid>
            <p>Full-width with consistent padding.</p>
        </x-ui-container>

    Props:
        as       — HTML tag to render: div|main|section|article|aside|header|footer|nav (default: div)
        size     — sm|md|lg|xl|2xl|full|prose (default: xl)
        padding  — none|sm|md|lg|xl (default: md)
        centered — boolean, centers text content within the container (default: false)
        fluid    — boolean, full width with padding and no max-width constraint (default: false)
--}}

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
