{{--
    Unified UI — Card Component
    https://unified-ui.space

    A versatile card container with optional header, body, and footer sections.
    Supports multiple visual variants, padding sizes, and interactive states.

    Usage:
        {{-- Basic card --}}
        <x-ui-card>
            <x-ui-card.header>
                <x-ui-card.title>Card Title</x-ui-card.title>
                <x-ui-card.description>Optional description text.</x-ui-card.description>
            </x-ui-card.header>
            <x-ui-card.body>
                <p>Card content goes here.</p>
            </x-ui-card.body>
            <x-ui-card.footer>
                <x-ui-button variant="primary">Save</x-ui-button>
                <x-ui-button variant="outline">Cancel</x-ui-button>
            </x-ui-card.footer>
        </x-ui-card>

        {{-- Simple card without sub-components --}}
        <x-ui-card padding="lg">
            <p>Simple content without header/footer structure.</p>
        </x-ui-card>

        {{-- Interactive / clickable card --}}
        <x-ui-card as="a" href="/details" variant="outline" hoverable>
            <x-ui-card.body>Click anywhere on this card.</x-ui-card.body>
        </x-ui-card>

        {{-- Variant examples --}}
        <x-ui-card variant="filled">Filled background</x-ui-card>
        <x-ui-card variant="outline">Bordered card</x-ui-card>
        <x-ui-card variant="ghost">No border or shadow</x-ui-card>
        <x-ui-card variant="elevated">Elevated with larger shadow</x-ui-card>

    Props:
        variant   — default|filled|outline|ghost|elevated (default: default)
        padding   — none|sm|md|lg|xl (default: none — sub-components handle their own padding)
        as        — HTML tag to render: div|a|article|section (default: div)
        href      — URL when as=a
        hoverable — boolean, adds hover lift/shadow effect
        inset     — boolean, removes border-radius from nested content for full-bleed layouts
--}}

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


{{--
    ═══════════════════════════════════════════════════════════════════
    SUB-COMPONENT: Card Header
    ═══════════════════════════════════════════════════════════════════

    The top section of a card, typically contains a title and description.
    Renders with bottom border separator by default.

    Usage:
        <x-ui-card.header>
            <x-ui-card.title>Title</x-ui-card.title>
            <x-ui-card.description>Description</x-ui-card.description>
        </x-ui-card.header>

        {{-- With action slot --}}
        <x-ui-card.header>
            <div>
                <x-ui-card.title>Title</x-ui-card.title>
                <x-ui-card.description>Description</x-ui-card.description>
            </div>
            <x-slot:action>
                <x-ui-button variant="outline" size="sm">Edit</x-ui-button>
            </x-slot:action>
        </x-ui-card.header>

    Props:
        bordered — boolean, show bottom border separator (default: false)
        padding  — sm|md|lg (default: md)
--}}

@props([
    'bordered' => false,
    'padding' => 'md',
])

@php
    $headerPaddingClasses = match ($padding) {
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        default => 'px-6 py-4',
    };

    $headerBorderClasses = $bordered
        ? 'border-b border-[oklch(var(--ui-border))]'
        : '';

    $headerClasses = trim("flex items-start justify-between gap-4 {$headerPaddingClasses} {$headerBorderClasses}");
@endphp

{{-- This block is only rendered when used as <x-ui-card.header> --}}
@if(false)
<div {{ $attributes->class([$headerClasses]) }} data-ui-card-header>
    <div class="flex flex-col gap-1.5 flex-1 min-w-0">
        {{ $slot }}
    </div>

    @if(isset($action))
        <div class="shrink-0 flex items-center">
            {{ $action }}
        </div>
    @endif
</div>
@endif


{{--
    ═══════════════════════════════════════════════════════════════════
    SUB-COMPONENT: Card Title
    ═══════════════════════════════════════════════════════════════════

    Usage:
        <x-ui-card.title>My Card Title</x-ui-card.title>
        <x-ui-card.title as="h3">Heading Level 3</x-ui-card.title>

    Props:
        as — HTML tag: h1|h2|h3|h4|h5|h6|p|span (default: h3)
--}}

@props([
    'as' => 'h3',
])

@php
    $titleClasses = implode(' ', [
        'text-base',
        'font-semibold',
        'leading-tight',
        'tracking-tight',
        'text-[oklch(var(--ui-card-foreground))]',
    ]);
@endphp

@if(false)
<{{ $as }} {{ $attributes->class([$titleClasses]) }} data-ui-card-title>
    {{ $slot }}
</{{ $as }}>
@endif


{{--
    ═══════════════════════════════════════════════════════════════════
    SUB-COMPONENT: Card Description
    ═══════════════════════════════════════════════════════════════════

    Usage:
        <x-ui-card.description>Some explanatory text below the title.</x-ui-card.description>

    Props:
        (none beyond standard Blade $attributes)
--}}

@php
    $descriptionClasses = implode(' ', [
        'text-sm',
        'text-[oklch(var(--ui-muted-foreground))]',
        'leading-normal',
    ]);
@endphp

@if(false)
<p {{ $attributes->class([$descriptionClasses]) }} data-ui-card-description>
    {{ $slot }}
</p>
@endif


{{--
    ═══════════════════════════════════════════════════════════════════
    SUB-COMPONENT: Card Body / Content
    ═══════════════════════════════════════════════════════════════════

    The main content area of a card.

    Usage:
        <x-ui-card.body>
            <p>Main card content.</p>
        </x-ui-card.body>

    Props:
        padding — sm|md|lg|none (default: md)
--}}

@props([
    'padding' => 'md',
])

@php
    $bodyPaddingClasses = match ($padding) {
        'none' => '',
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        default => 'px-6 py-4',
    };

    $bodyClasses = trim("{$bodyPaddingClasses}");
@endphp

@if(false)
<div {{ $attributes->class([$bodyClasses]) }} data-ui-card-body>
    {{ $slot }}
</div>
@endif


{{--
    ═══════════════════════════════════════════════════════════════════
    SUB-COMPONENT: Card Footer
    ═══════════════════════════════════════════════════════════════════

    The bottom section of a card, typically contains actions or meta info.

    Usage:
        <x-ui-card.footer>
            <x-ui-button variant="primary">Save</x-ui-button>
            <x-ui-button variant="outline">Cancel</x-ui-button>
        </x-ui-card.footer>

        <x-ui-card.footer justify="between">
            <span class="text-sm text-muted">Last updated 2h ago</span>
            <x-ui-button variant="ghost" size="sm">View</x-ui-button>
        </x-ui-card.footer>

    Props:
        bordered — boolean, show top border separator (default: false)
        padding  — sm|md|lg (default: md)
        justify  — start|end|center|between|around|evenly (default: end)
--}}

@props([
    'bordered' => false,
    'padding' => 'md',
    'justify' => 'end',
])

@php
    $footerPaddingClasses = match ($padding) {
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        default => 'px-6 py-4',
    };

    $footerBorderClasses = $bordered
        ? 'border-t border-[oklch(var(--ui-border))]'
        : '';

    $footerJustifyClasses = match ($justify) {
        'start' => 'justify-start',
        'end' => 'justify-end',
        'center' => 'justify-center',
        'between' => 'justify-between',
        'around' => 'justify-around',
        'evenly' => 'justify-evenly',
        default => 'justify-end',
    };

    $footerClasses = trim("flex items-center gap-3 {$footerPaddingClasses} {$footerBorderClasses} {$footerJustifyClasses}");
@endphp

@if(false)
<div {{ $attributes->class([$footerClasses]) }} data-ui-card-footer>
    {{ $slot }}
</div>
@endif
