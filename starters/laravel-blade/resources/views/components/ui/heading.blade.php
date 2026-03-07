@props([
    'level' => 1,
    'color' => 'default',
])

@php
$levels = [
    1 => 'text-[30px] leading-[36px] font-bold tracking-tight',
    2 => 'text-[24px] leading-[32px] font-semibold tracking-tight',
    3 => 'text-[20px] leading-[28px] font-semibold tracking-normal',
    4 => 'text-[18px] leading-[28px] font-medium tracking-normal',
];

$colors = [
    'default' => 'text-foreground',
    'foreground' => 'text-foreground',
    'muted' => 'text-muted-foreground',
    'primary' => 'text-primary',
];

$classes = implode(' ', [
    $levels[$level] ?? $levels[1],
    $colors[$color] ?? $colors['default'],
]);

$tag = 'h' . min(max((int)$level, 1), 6);
@endphp

<{{ $tag }} {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="heading">
    {{ $slot }}
</{{ $tag }}>
