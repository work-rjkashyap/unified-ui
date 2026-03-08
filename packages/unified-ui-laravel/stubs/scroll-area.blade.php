{{--
    Unified UI — Scroll Area Component
    https://unified-ui.space

    A custom styled scrollable container with thin scrollbar styling
    and optional fade indicators at the edges to hint at more content.
    Uses CSS-only scrollbar styling with design token integration.

    Usage:
        {{-- Basic scroll area with fixed height --}}
        <x-ui-scroll-area class="h-64">
            <p>Long scrollable content…</p>
        </x-ui-scroll-area>

        {{-- Horizontal scrolling --}}
        <x-ui-scroll-area orientation="horizontal" class="w-full">
            <div class="flex gap-4 w-max">
                <div class="w-48 h-32 bg-muted rounded"></div>
                <div class="w-48 h-32 bg-muted rounded"></div>
                <div class="w-48 h-32 bg-muted rounded"></div>
                <div class="w-48 h-32 bg-muted rounded"></div>
                <div class="w-48 h-32 bg-muted rounded"></div>
            </div>
        </x-ui-scroll-area>

        {{-- Both directions --}}
        <x-ui-scroll-area orientation="both" class="h-64 w-full">
            <div class="w-[200%]">
                Very wide and tall content…
            </div>
        </x-ui-scroll-area>

        {{-- With fade indicators --}}
        <x-ui-scroll-area class="h-48" fade>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                …many more items…
            </ul>
        </x-ui-scroll-area>

        {{-- Without custom scrollbar styling (native scrollbars) --}}
        <x-ui-scroll-area class="h-64" :styled="false">
            <p>Uses native browser scrollbars.</p>
        </x-ui-scroll-area>

        {{-- Hidden scrollbar (scroll with mouse wheel / touch only) --}}
        <x-ui-scroll-area class="h-48" scrollbar="hidden">
            <p>Scrollable but no visible scrollbar.</p>
        </x-ui-scroll-area>

        {{-- With padding --}}
        <x-ui-scroll-area class="h-64" padding="md">
            <p>Padded scrollable content.</p>
        </x-ui-scroll-area>

        {{-- Bordered variant --}}
        <x-ui-scroll-area class="h-64" variant="bordered">
            <p>Bordered scroll area with rounded corners.</p>
        </x-ui-scroll-area>

        {{-- Inset variant (for use inside cards or panels) --}}
        <x-ui-scroll-area class="h-48" variant="inset">
            <p>Flush edges for embedding inside containers.</p>
        </x-ui-scroll-area>

        {{-- As a different HTML tag --}}
        <x-ui-scroll-area as="ul" class="h-48">
            <li>List item 1</li>
            <li>List item 2</li>
        </x-ui-scroll-area>

        {{-- With max-height instead of fixed height --}}
        <x-ui-scroll-area class="max-h-96">
            <p>Content that scrolls only when it exceeds max height.</p>
        </x-ui-scroll-area>

    Props:
        as          — HTML tag to render: div|ul|ol|nav|section|aside (default: div)
        orientation — vertical|horizontal|both (default: vertical)
        scrollbar   — auto|thin|hidden (default: thin) — scrollbar visibility style
        styled      — boolean, apply custom thin scrollbar styling (default: true)
        fade        — boolean, show gradient fade indicators at scroll edges (default: false)
        fadeSize    — sm|md|lg (default: md) — size of the fade gradient
        variant     — default|bordered|inset (default: default)
        padding     — none|sm|md|lg (default: none)
--}}

@props([
    'as' => 'div',
    'orientation' => 'vertical',
    'scrollbar' => 'thin',
    'styled' => true,
    'fade' => false,
    'fadeSize' => 'md',
    'variant' => 'default',
    'padding' => 'none',
])

@php
    // ── Overflow classes ──────────────────────────────────────────────
    $overflowClasses = match ($orientation) {
        'horizontal' => 'overflow-x-auto overflow-y-hidden',
        'both'       => 'overflow-auto',
        default      => 'overflow-y-auto overflow-x-hidden',
    };

    // ── Scrollbar classes ────────────────────────────────────────────
    $scrollbarClasses = '';
    if ($styled) {
        $scrollbarClasses = match ($scrollbar) {
            'hidden' => implode(' ', [
                'scrollbar-none',
                '[&::-webkit-scrollbar]:hidden',
                '[-ms-overflow-style:none]',
                '[scrollbar-width:none]',
            ]),
            'auto' => '',
            default => implode(' ', [
                // Webkit (Chrome, Safari, Edge)
                '[&::-webkit-scrollbar]:w-1.5',
                '[&::-webkit-scrollbar]:h-1.5',
                '[&::-webkit-scrollbar-track]:bg-transparent',
                '[&::-webkit-scrollbar-track]:rounded-full',
                '[&::-webkit-scrollbar-thumb]:bg-[oklch(var(--ui-border))]',
                '[&::-webkit-scrollbar-thumb]:rounded-full',
                '[&::-webkit-scrollbar-thumb]:border-[1px]',
                '[&::-webkit-scrollbar-thumb]:border-transparent',
                '[&::-webkit-scrollbar-thumb]:bg-clip-padding',
                '[&:hover::-webkit-scrollbar-thumb]:bg-[oklch(var(--ui-muted-foreground)/0.4)]',
                '[&::-webkit-scrollbar-corner]:bg-transparent',
                // Firefox
                '[scrollbar-width:thin]',
                '[scrollbar-color:oklch(var(--ui-border))_transparent]',
                'hover:[scrollbar-color:oklch(var(--ui-muted-foreground)/0.4)_transparent]',
            ]),
        };
    }

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'bordered' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'rounded-[var(--ui-radius-lg)]',
        ]),
        'inset' => implode(' ', [
            'bg-[oklch(var(--ui-muted)/0.3)]',
            'rounded-[var(--ui-radius-md)]',
        ]),
        default => '',
    };

    // ── Padding classes ──────────────────────────────────────────────
    $paddingClasses = match ($padding) {
        'sm' => 'p-2',
        'md' => 'p-4',
        'lg' => 'p-6',
        default => '',
    };

    // ── Fade gradient size ───────────────────────────────────────────
    $fadeSizePx = match ($fadeSize) {
        'sm' => '16px',
        'md' => '32px',
        'lg' => '48px',
        default => '32px',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        $overflowClasses,
    ]);

    // ── Inner scrollable area classes ─────────────────────────────────
    $innerClasses = trim(implode(' ', array_filter([
        $scrollbarClasses,
        $variantClasses,
        $paddingClasses,
    ])));

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $baseClasses,
        $scrollbarClasses,
        $variantClasses,
        $paddingClasses,
    ])));

    // ── Fade mask image styles ───────────────────────────────────────
    $isVertical = in_array($orientation, ['vertical', 'both']);
    $isHorizontal = in_array($orientation, ['horizontal', 'both']);
@endphp

@if($fade)
    {{-- Scroll area with fade indicators --}}
    <div
        x-data="{
            scrollEl: null,
            atTop: true,
            atBottom: false,
            atLeft: true,
            atRight: false,
            orientation: @js($orientation),
            init() {
                this.scrollEl = this.$refs.scrollArea;
                this.update();
            },
            update() {
                if (!this.scrollEl) return;

                if (this.orientation === 'vertical' || this.orientation === 'both') {
                    this.atTop = this.scrollEl.scrollTop <= 1;
                    this.atBottom = this.scrollEl.scrollTop + this.scrollEl.clientHeight >= this.scrollEl.scrollHeight - 1;
                }

                if (this.orientation === 'horizontal' || this.orientation === 'both') {
                    this.atLeft = this.scrollEl.scrollLeft <= 1;
                    this.atRight = this.scrollEl.scrollLeft + this.scrollEl.clientWidth >= this.scrollEl.scrollWidth - 1;
                }
            }
        }"
        class="relative"
        data-ui-scroll-area-wrapper
    >
        {{-- Top fade --}}
        @if($isVertical)
            <div
                class="
                    pointer-events-none
                    absolute top-0 inset-x-0 z-10
                    bg-gradient-to-b
                    from-[oklch(var(--ui-background))]
                    to-transparent
                    transition-opacity
                    duration-[var(--ui-duration-fast)]
                    ease-[var(--ui-ease-default)]
                    rounded-t-[inherit]
                "
                style="height: {{ $fadeSizePx }};"
                x-bind:class="atTop ? 'opacity-0' : 'opacity-100'"
                aria-hidden="true"
            ></div>
        @endif

        {{-- Bottom fade --}}
        @if($isVertical)
            <div
                class="
                    pointer-events-none
                    absolute bottom-0 inset-x-0 z-10
                    bg-gradient-to-t
                    from-[oklch(var(--ui-background))]
                    to-transparent
                    transition-opacity
                    duration-[var(--ui-duration-fast)]
                    ease-[var(--ui-ease-default)]
                    rounded-b-[inherit]
                "
                style="height: {{ $fadeSizePx }};"
                x-bind:class="atBottom ? 'opacity-0' : 'opacity-100'"
                aria-hidden="true"
            ></div>
        @endif

        {{-- Left fade --}}
        @if($isHorizontal)
            <div
                class="
                    pointer-events-none
                    absolute left-0 inset-y-0 z-10
                    bg-gradient-to-r
                    from-[oklch(var(--ui-background))]
                    to-transparent
                    transition-opacity
                    duration-[var(--ui-duration-fast)]
                    ease-[var(--ui-ease-default)]
                    rounded-l-[inherit]
                "
                style="width: {{ $fadeSizePx }};"
                x-bind:class="atLeft ? 'opacity-0' : 'opacity-100'"
                aria-hidden="true"
            ></div>
        @endif

        {{-- Right fade --}}
        @if($isHorizontal)
            <div
                class="
                    pointer-events-none
                    absolute right-0 inset-y-0 z-10
                    bg-gradient-to-l
                    from-[oklch(var(--ui-background))]
                    to-transparent
                    transition-opacity
                    duration-[var(--ui-duration-fast)]
                    ease-[var(--ui-ease-default)]
                    rounded-r-[inherit]
                "
                style="width: {{ $fadeSizePx }};"
                x-bind:class="atRight ? 'opacity-0' : 'opacity-100'"
                aria-hidden="true"
            ></div>
        @endif

        {{-- Scrollable area --}}
        <{{ $as }}
            x-ref="scrollArea"
            x-on:scroll.passive="update()"
            {{ $attributes->class([$classes]) }}
            data-ui-scroll-area
            data-ui-scroll-area-orientation="{{ $orientation }}"
            tabindex="0"
        >
            {{ $slot }}
        </{{ $as }}>
    </div>

@else
    {{-- Scroll area without fade indicators --}}
    <{{ $as }}
        {{ $attributes->class([$classes]) }}
        data-ui-scroll-area
        data-ui-scroll-area-orientation="{{ $orientation }}"
        tabindex="0"
    >
        {{ $slot }}
    </{{ $as }}>
@endif
