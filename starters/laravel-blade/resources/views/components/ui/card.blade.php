@props([
    'variant' => 'default',
    'padding' => 'compact',
    'fullWidth' => false,
    'as' => 'div',
])

@php
$variants = [
    'default' => 'bg-surface border border-border',
    'outlined' => 'bg-transparent border border-border-strong',
    'elevated' => 'bg-surface-raised border border-border-muted shadow-md',
    'interactive' => 'bg-surface border border-border transition-[border-color,box-shadow,transform] duration-[var(--duration-normal,200ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))] hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer',
];

$classes = implode(' ', array_filter([
    'flex flex-col rounded-md overflow-hidden text-sm text-foreground',
    $variants[$variant] ?? $variants['default'],
    $fullWidth ? 'w-full' : '',
]));
@endphp

<{{ $as }} {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card" data-ds-padding="{{ $padding }}">
    {{ $slot }}
</{{ $as }}>
