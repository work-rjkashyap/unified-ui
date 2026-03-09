@props([
    'bordered' => false,
    'padding' => 'md',
])

@php
    $paddingClasses = match ($padding) {
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        default => 'px-6 py-4',
    };

    $borderClasses = $bordered
        ? 'border-b border-[oklch(var(--ui-border))]'
        : '';

    $classes = trim("flex items-start justify-between gap-4 {$paddingClasses} {$borderClasses}");
@endphp

<div {{ $attributes->class([$classes]) }} data-ui-card-header>
    <div class="flex flex-col gap-1.5 flex-1 min-w-0">
        {{ $slot }}
    </div>

    @if(isset($action))
        <div class="shrink-0 flex items-center">
            {{ $action }}
        </div>
    @endif
</div>
