@props([
    'orientation' => 'horizontal',
    'label' => null,
    'variant' => 'default',
    'style' => 'solid',
    'decorative' => false,
    'spacing' => 'md',
])

@php
    $isVertical = $orientation === 'vertical';
    $hasContent = $label || $slot->isNotEmpty();

    // ── Variant border color ─────────────────────────────────────────
    $colorClasses = match ($variant) {
        'primary' => 'border-[oklch(var(--ui-primary)/0.4)]',
        'muted' => 'border-[oklch(var(--ui-muted-foreground)/0.15)]',
        'destructive' => 'border-[oklch(var(--ui-destructive)/0.4)]',
        default => 'border-[oklch(var(--ui-border))]',
    };

    // ── Border style ─────────────────────────────────────────────────
    $borderStyleClasses = match ($style) {
        'dashed' => 'border-dashed',
        'dotted' => 'border-dotted',
        default => 'border-solid',
    };

    // ── Spacing ──────────────────────────────────────────────────────
    $spacingClasses = match (true) {
        $isVertical && $spacing === 'none' => '',
        $isVertical && $spacing === 'sm' => 'mx-1',
        $isVertical && $spacing === 'md' => 'mx-3',
        $isVertical && $spacing === 'lg' => 'mx-5',
        !$isVertical && $spacing === 'none' => '',
        !$isVertical && $spacing === 'sm' => 'my-1',
        !$isVertical && $spacing === 'md' => 'my-3',
        !$isVertical && $spacing === 'lg' => 'my-5',
        default => $isVertical ? 'mx-3' : 'my-3',
    };

    // ── Label text color ─────────────────────────────────────────────
    $labelColorClasses = match ($variant) {
        'primary' => 'text-[oklch(var(--ui-primary))]',
        'destructive' => 'text-[oklch(var(--ui-destructive))]',
        default => 'text-[oklch(var(--ui-muted-foreground))]',
    };

    // ── ARIA role ────────────────────────────────────────────────────
    $role = $decorative ? 'none' : 'separator';
    $ariaOrientation = $isVertical ? 'vertical' : 'horizontal';
@endphp

@if($isVertical)
    {{-- Vertical separator --}}
    <div
        {{ $attributes->class([
            'inline-block self-stretch shrink-0',
            'border-l',
            $colorClasses,
            $borderStyleClasses,
            $spacingClasses,
        ]) }}
        role="{{ $role }}"
        aria-orientation="{{ $ariaOrientation }}"
        data-ui-separator
    ></div>
@elseif($hasContent)
    {{-- Horizontal separator with label/content --}}
    <div
        {{ $attributes->class([
            'flex items-center w-full',
            $spacingClasses,
        ]) }}
        role="{{ $role }}"
        aria-orientation="{{ $ariaOrientation }}"
        data-ui-separator
    >
        {{-- Left line --}}
        <span class="flex-1 border-t {{ $colorClasses }} {{ $borderStyleClasses }}" aria-hidden="true"></span>

        {{-- Label / slot content --}}
        <span class="shrink-0 px-3 text-xs font-medium leading-none select-none {{ $labelColorClasses }}">
            @if($label)
                {{ $label }}
            @else
                {{ $slot }}
            @endif
        </span>

        {{-- Right line --}}
        <span class="flex-1 border-t {{ $colorClasses }} {{ $borderStyleClasses }}" aria-hidden="true"></span>
    </div>
@else
    {{-- Simple horizontal line --}}
    <hr
        {{ $attributes->class([
            'w-full border-t border-b-0 border-l-0 border-r-0',
            $colorClasses,
            $borderStyleClasses,
            $spacingClasses,
        ]) }}
        role="{{ $role }}"
        aria-orientation="{{ $ariaOrientation }}"
        data-ui-separator
    />
@endif
