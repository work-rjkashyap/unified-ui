@props([
    'size'        => 'md',
    'variant'     => 'default',
    'addonLeft'   => null,
    'addonRight'  => null,
    'prefix'      => null,
    'suffix'      => null,
    'disabled'    => false,
    'error'       => false,
])

@php
    $sizeClasses = match ($size) {
        'sm' => 'h-8 text-xs',
        'lg' => 'h-10 text-sm',
        default => 'h-9 text-sm',
    };
    $variantClasses = match ($variant) {
        'filled' => 'border-transparent bg-[oklch(var(--ui-muted))]',
        default  => 'border-[oklch(var(--ui-input))]',
    };
    $errorClasses = $error ? 'border-[oklch(var(--ui-destructive))] focus-within:border-[oklch(var(--ui-destructive))] focus-within:ring-[oklch(var(--ui-destructive)/0.2)]' : '';

    $addonPx = match ($size) { 'sm' => 'px-2', default => 'px-3' };
    $iconPadding = match ($size) { 'sm' => 'pl-2', 'lg' => 'pl-3', default => 'pl-3' };

    $containerClasses = implode(' ', [
        'flex w-full items-stretch overflow-hidden',
        'rounded-[var(--ui-radius-md)] border bg-[oklch(var(--ui-background))]',
        'transition-[border-color,box-shadow] duration-[var(--ui-duration-fast)]',
        $error
            ? 'border-[oklch(var(--ui-destructive))] focus-within:ring-2 focus-within:ring-[oklch(var(--ui-destructive)/0.2)]'
            : 'focus-within:border-[oklch(var(--ui-ring))] focus-within:ring-2 focus-within:ring-[oklch(var(--ui-ring)/0.2)]',
        $disabled ? 'pointer-events-none opacity-50' : '',
        $sizeClasses,
        $variantClasses,
    ]);
@endphp

<div
    {{ $attributes->class([$containerClasses]) }}
    data-ui-input-group
    data-ui-input-group-size="{{ $size }}"
    @if($error) data-ui-error @endif
>
    {{-- Left addon (separated, with border) --}}
    @if($addonLeft)
        <div class="inline-flex items-center justify-center shrink-0 border-r border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-muted))] text-[oklch(var(--ui-muted-foreground))] font-medium select-none {{ $addonPx }}">
            {!! $addonLeft !!}
        </div>
    @endif

    {{-- Prefix (inside input area, no border) --}}
    @if($prefix)
        <span class="inline-flex items-center justify-center shrink-0 pointer-events-none text-[oklch(var(--ui-muted-foreground))] [&>svg]:h-4 [&>svg]:w-4 {{ $iconPadding }}">
            {!! $prefix !!}
        </span>
    @endif

    {{-- Input slot --}}
    <div class="flex-1 flex items-center min-w-0">
        {{ $slot }}
    </div>

    {{-- Suffix (inside input area, no border) --}}
    @if($suffix)
        <span class="inline-flex items-center justify-center shrink-0 pointer-events-none text-[oklch(var(--ui-muted-foreground))] [&>svg]:h-4 [&>svg]:w-4 pr-3">
            {!! $suffix !!}
        </span>
    @endif

    {{-- Right addon (separated, with border) --}}
    @if($addonRight)
        <div class="inline-flex items-center justify-center shrink-0 border-l border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-muted))] text-[oklch(var(--ui-muted-foreground))] font-medium select-none {{ $addonPx }}">
            {!! $addonRight !!}
        </div>
    @endif
</div>
