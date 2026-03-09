@props([])

{{--
    VisuallyHidden — renders content visible only to screen readers.

    Usage:
        <x-visually-hidden>Skip to main content</x-visually-hidden>
        <x-visually-hidden>Description for icon button</x-visually-hidden>
--}}

<span
    {{ $attributes }}
    class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
    style="clip: rect(0,0,0,0)"
    data-ui-visually-hidden
>
    {{ $slot }}
</span>
