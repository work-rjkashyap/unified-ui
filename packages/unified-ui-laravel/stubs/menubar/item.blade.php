@props([
    'variant'  => 'default',
    'icon'     => null,
    'shortcut' => null,
    'inset'    => false,
    'disabled' => false,
    'as'       => 'button',
    'href'     => null,
])

@php
    $tag = $href ? 'a' : $as;
    $variantClasses = match ($variant) {
        'danger' => 'text-[oklch(var(--ui-destructive))] hover:bg-[oklch(var(--ui-destructive)/0.1)] hover:text-[oklch(var(--ui-destructive))]',
        default  => 'text-[oklch(var(--ui-popover-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-accent-foreground))]',
    };
    $classes = implode(' ', [
        'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-3 py-1.5 text-sm outline-none',
        'transition-colors duration-[var(--ui-duration-fast)]',
        $disabled ? 'pointer-events-none opacity-50' : '',
        $inset ? 'pl-8' : '',
        $variantClasses,
    ]);
@endphp

<{{ $tag }}
    @if($tag === 'button') type="button" @endif
    @if($href) href="{{ $href }}" @endif
    @if($disabled) disabled aria-disabled="true" @endif
    role="menuitem"
    {{ $attributes->class([$classes]) }}
    data-ui-menubar-item
>
    @if($icon)
        <span class="h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4" aria-hidden="true">{!! $icon !!}</span>
    @endif
    <span class="flex-1">{{ $slot }}</span>
    @if($shortcut)
        <span class="ml-auto text-xs tracking-widest text-[oklch(var(--ui-muted-foreground))]" aria-hidden="true">{{ $shortcut }}</span>
    @endif
</{{ $tag }}>
