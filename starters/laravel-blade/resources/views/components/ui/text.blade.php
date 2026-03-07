@props([
    'variant' => 'body',
    'color' => 'default',
    'as' => 'p',
])

@php
$variants = [
    'body' => 'text-[16px] leading-[24px] font-normal tracking-normal',
    'bodySm' => 'text-[14px] leading-[20px] font-normal tracking-normal',
    'caption' => 'text-[12px] leading-[16px] font-normal tracking-wide text-muted-foreground',
    'label' => 'text-[14px] leading-[20px] font-medium tracking-normal',
    'overline' => 'text-[12px] leading-[16px] font-semibold tracking-wider uppercase text-muted-foreground',
    'code' => 'text-[14px] leading-[20px] font-normal tracking-normal font-mono',
];

$colors = [
    'default' => 'text-foreground',
    'foreground' => 'text-foreground',
    'muted' => 'text-muted-foreground',
    'primary' => 'text-primary',
    'success' => 'text-success',
    'warning' => 'text-warning',
    'danger' => 'text-danger',
    'info' => 'text-info',
];

$classes = implode(' ', [
    $variants[$variant] ?? $variants['body'],
    $colors[$color] ?? $colors['default'],
]);
@endphp

<{{ $as }} {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="text">
    {{ $slot }}
</{{ $as }}>
