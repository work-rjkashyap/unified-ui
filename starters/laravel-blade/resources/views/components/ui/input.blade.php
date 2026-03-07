@props([
    'variant' => 'default',
    'size' => 'md',
    'disabled' => false,
])

@php
$variants = [
    'default' => 'border-input hover:border-border-strong focus-visible:border-border-strong',
    'error' => 'border-danger text-foreground focus-visible:border-danger placeholder:text-input-placeholder',
    'success' => 'border-success text-foreground focus-visible:border-success placeholder:text-input-placeholder',
];

$sizes = [
    'sm' => 'h-8 px-2.5 text-xs',
    'md' => 'h-[var(--ds-control-height,36px)] px-3 text-sm',
    'lg' => 'h-10 px-3.5 text-sm',
];

$classes = implode(' ', [
    'flex w-full text-sm leading-5 rounded-md border bg-background text-input-foreground',
    'placeholder:text-input-placeholder',
    'transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground',
    'read-only:bg-muted read-only:cursor-default',
    $variants[$variant] ?? $variants['default'],
    $sizes[$size] ?? $sizes['md'],
]);
@endphp

<input {{ $attributes->merge(['class' => $classes, 'disabled' => $disabled, 'type' => 'text']) }} data-ds data-ds-component="input" />
