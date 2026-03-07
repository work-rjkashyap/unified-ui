@props([
    'variant' => 'primary',
    'size' => 'md',
    'as' => 'button',
    'fullWidth' => false,
    'iconOnly' => false,
    'loading' => false,
    'disabled' => false,
])

@php
$variants = [
    'primary' => 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
    'secondary' => 'bg-secondary text-secondary-foreground border border-border hover:bg-secondary-hover active:bg-secondary-active',
    'ghost' => 'bg-transparent text-foreground hover:bg-muted hover:text-foreground active:bg-secondary-active',
    'danger' => 'bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active',
];

$sizes = [
    'sm' => 'h-8 px-3 text-xs gap-1.5',
    'md' => 'h-[var(--ds-control-height,36px)] px-[var(--ds-padding-button-x,16px)] text-sm gap-2',
    'lg' => 'h-10 px-5 text-sm gap-2',
];

$iconOnlySizes = [
    'sm' => 'w-8 !px-0',
    'md' => 'w-9 !px-0',
    'lg' => 'w-10 !px-0',
];

$classes = implode(' ', array_filter([
    'inline-flex items-center justify-center gap-2 text-sm font-medium leading-5 rounded-md',
    'transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed select-none',
    'active:scale-[0.98] disabled:active:scale-100',
    $variants[$variant] ?? $variants['primary'],
    $sizes[$size] ?? $sizes['md'],
    $iconOnly ? ($iconOnlySizes[$size] ?? '') : '',
    $fullWidth ? 'w-full' : '',
    $loading ? 'pointer-events-none opacity-70' : '',
]));
@endphp

<{{ $as }}
    {{ $attributes->merge(['class' => $classes, 'disabled' => $disabled || $loading]) }}
    data-ds
    data-ds-component="button"
    @if($loading) data-ds-loading @endif
>
    @if($loading)
        <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
    @endif
    {{ $slot }}
</{{ $as }}>
