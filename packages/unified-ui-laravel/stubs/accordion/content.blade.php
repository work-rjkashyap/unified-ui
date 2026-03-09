@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'text-sm',
        'leading-relaxed',
        'text-[oklch(var(--ui-muted-foreground))]',
    ]);

    // ── Content inner padding ────────────────────────────────────────
    $innerClasses = 'pb-4';
@endphp

<div
    x-show="isOpen(itemValue)"
    x-collapse
    x-cloak
    role="region"
    x-bind:aria-hidden="(!isOpen(itemValue)).toString()"
    {{ $attributes->class([$baseClasses]) }}
    data-ui-accordion-content
>
    <div
        class="{{ $innerClasses }}"
        x-bind:class="{
            'px-4': variant === 'bordered' || variant === 'separated',
        }"
    >
        {{ $slot }}
    </div>
</div>
