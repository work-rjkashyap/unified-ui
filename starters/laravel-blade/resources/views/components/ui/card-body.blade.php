@aware(['padding' => 'compact'])

@php
$classes = $padding === 'comfortable'
    ? 'flex flex-col flex-1 px-6 py-4 gap-4'
    : 'flex flex-col flex-1 px-[var(--ds-padding-card,16px)] py-3 gap-[var(--ds-gap-default,0.75rem)]';
@endphp

<div {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card-body">
    {{ $slot }}
</div>
