@props(['inset' => false])
<div
    {{ $attributes->class([
        'px-3 py-1.5 text-xs font-semibold text-[oklch(var(--ui-muted-foreground))]',
        $inset ? 'pl-8' : '',
    ]) }}
    data-ui-menubar-label
>
    {{ $slot }}
</div>
