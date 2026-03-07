@aware(['padding' => 'compact'])

@php
$classes = $padding === 'comfortable'
    ? 'flex flex-col px-6 pt-6 gap-1.5'
    : 'flex flex-col px-[var(--ds-padding-card,16px)] pt-[var(--ds-padding-card,16px)] gap-1';
@endphp

<div {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card-header">
    {{ $slot }}
</div>
