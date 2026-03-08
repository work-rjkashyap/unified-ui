{{--
    Unified UI — Banner Component
    https://unified-ui.space

    A full-width announcement banner with optional dismiss functionality,
    typically placed at the top of the page. Supports multiple semantic
    color variants and design token integration.

    Usage:
        {{-- Basic banner --}}
        <x-ui-banner>
            We've just launched a new feature! Check it out.
        </x-ui-banner>

        {{-- With variant --}}
        <x-ui-banner variant="info">
            System maintenance scheduled for tonight at 10 PM.
        </x-ui-banner>

        <x-ui-banner variant="success">
            Your account has been verified successfully.
        </x-ui-banner>

        <x-ui-banner variant="warning">
            Your subscription expires in 3 days.
        </x-ui-banner>

        <x-ui-banner variant="destructive">
            Service outage detected. We are investigating.
        </x-ui-banner>

        {{-- Dismissible banner --}}
        <x-ui-banner variant="info" dismissible>
            New version available! <a href="/changelog" class="underline font-semibold">See what's new.</a>
        </x-ui-banner>

        {{-- With action slot --}}
        <x-ui-banner variant="info">
            Free shipping on orders over $50 this weekend.
            <x-slot:action>
                <a href="/shop" class="underline font-semibold whitespace-nowrap">Shop now →</a>
            </x-slot:action>
        </x-ui-banner>

        {{-- With icon slot --}}
        <x-ui-banner variant="success">
            <x-slot:icon>
                <svg class="h-5 w-5" ...>...</svg>
            </x-slot:icon>
            Deployment successful.
        </x-ui-banner>

        {{-- Sticky banner (stays at top on scroll) --}}
        <x-ui-banner sticky>
            Important announcement pinned to the top.
        </x-ui-banner>

        {{-- Centered content --}}
        <x-ui-banner centered>
            Centered banner text with balanced layout.
        </x-ui-banner>

        {{-- Compact / small size --}}
        <x-ui-banner size="sm">
            Small banner with reduced padding and text.
        </x-ui-banner>

        {{-- Outlined style --}}
        <x-ui-banner variant="info" style="outline">
            Lighter visual weight with an outlined border.
        </x-ui-banner>

    Props:
        variant     — default|info|success|warning|destructive (default: default)
        style       — filled|outline|soft (default: filled)
        size        — sm|md|lg (default: md)
        dismissible — boolean, shows a close button (default: false)
        sticky      — boolean, sticks the banner to the top of the viewport (default: false)
        centered    — boolean, centers the banner content text (default: false)
        icon        — boolean, whether to show the default icon for the variant (default: false)
        rounded     — boolean, adds border-radius (default: false)
--}}

@props([
    'variant' => 'default',
    'style' => 'filled',
    'size' => 'md',
    'dismissible' => false,
    'sticky' => false,
    'centered' => false,
    'icon' => false,
    'rounded' => false,
])

@php
    // ── Variant color mappings ───────────────────────────────────────
    $colorMap = match ($variant) {
        'info' => [
            'bg'     => '--ui-info',
            'fg'     => '--ui-info-foreground',
            'border' => '--ui-info',
        ],
        'success' => [
            'bg'     => '--ui-success',
            'fg'     => '--ui-success-foreground',
            'border' => '--ui-success',
        ],
        'warning' => [
            'bg'     => '--ui-warning',
            'fg'     => '--ui-warning-foreground',
            'border' => '--ui-warning',
        ],
        'destructive' => [
            'bg'     => '--ui-destructive',
            'fg'     => '--ui-destructive-foreground',
            'border' => '--ui-destructive',
        ],
        default => [
            'bg'     => '--ui-primary',
            'fg'     => '--ui-primary-foreground',
            'border' => '--ui-primary',
        ],
    };

    // ── Style variant classes ────────────────────────────────────────
    $styleClasses = match ($style) {
        'filled' => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']}))]",
            "text-[oklch(var({$colorMap['fg']}))]",
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']}))]",
        ]),
        'soft' => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']})/0.1)]",
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']})/0.2)]",
        ]),
        default => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']}))]",
            "text-[oklch(var({$colorMap['fg']}))]",
            'border-transparent',
        ]),
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'px-3 py-1.5 text-xs gap-2',
        'md' => 'px-4 py-2.5 text-sm gap-3',
        'lg' => 'px-6 py-3.5 text-base gap-4',
        default => 'px-4 py-2.5 text-sm gap-3',
    };

    // ── Close button sizing ──────────────────────────────────────────
    $closeSizeClasses = match ($size) {
        'sm' => 'h-5 w-5',
        'md' => 'h-6 w-6',
        'lg' => 'h-7 w-7',
        default => 'h-6 w-6',
    };

    $closeIconSizeClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };

    // ── Icon size classes ────────────────────────────────────────────
    $iconSizeClasses = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };

    // ── Sticky classes ───────────────────────────────────────────────
    $stickyClasses = $sticky
        ? 'sticky top-0 z-[var(--ui-z-sticky,40)]'
        : '';

    // ── Rounded classes ──────────────────────────────────────────────
    $roundedClasses = $rounded
        ? 'rounded-[var(--ui-radius-lg)]'
        : '';

    // ── Centered classes ─────────────────────────────────────────────
    $justifyClasses = $centered ? 'justify-center' : 'justify-between';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'flex',
        'items-center',
        $justifyClasses,
        'w-full',
        'border',
        'leading-normal',
        'transition-all',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
    ]);

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $baseClasses,
        $styleClasses,
        $sizeClasses,
        $stickyClasses,
        $roundedClasses,
    ])));
@endphp

<div
    {{ $attributes->class([$classes]) }}
    role="status"
    @if($dismissible)
        x-data="{ visible: true }"
        x-show="visible"
        x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
    @endif
    data-ui-banner
    data-ui-banner-variant="{{ $variant }}"
>
    {{-- Content wrapper --}}
    <div class="flex items-center gap-2 flex-1 min-w-0 {{ $centered ? 'justify-center text-center' : '' }}">
        {{-- Icon --}}
        @if(isset($iconSlot))
            <span class="shrink-0" aria-hidden="true">
                {{ $iconSlot }}
            </span>
        @elseif($icon)
            <span class="shrink-0" aria-hidden="true">
                @switch($variant)
                    @case('info')
                        <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
