@props([])
<div
    {{ $attributes->class(['flex w-full shrink-0 select-none']) }}
    role="group"
    aria-roledescription="slide"
    data-ui-carousel-item
>{{ $slot }}</div>
