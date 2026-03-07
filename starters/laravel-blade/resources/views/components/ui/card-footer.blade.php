@aware(['padding' => 'compact'])

@php
$classes = $padding === 'comfortable'
    ? 'flex items-center px-6 pb-6 gap-3'
    : 'flex items-center px-[var(--ds-padding-card,16px)] pb-[var(--ds-padding-card,16px)] gap-2';
@endphp

<div {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card-footer">
    {{ $slot }}
</div>
