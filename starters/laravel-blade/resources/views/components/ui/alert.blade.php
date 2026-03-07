@props([
    'variant' => 'info',
    'title' => null,
    'dismissible' => false,
])

@php
$variants = [
    'info' => 'bg-info-muted text-info-muted-foreground border-info/20',
    'success' => 'bg-success-muted text-success-muted-foreground border-success/20',
    'warning' => 'bg-warning-muted text-warning-muted-foreground border-warning/20',
    'danger' => 'bg-danger-muted text-danger-muted-foreground border-danger/20',
    'default' => 'bg-muted text-muted-foreground border-border',
];

$iconColors = [
    'info' => 'text-info',
    'success' => 'text-success',
    'warning' => 'text-warning',
    'danger' => 'text-danger',
    'default' => 'text-muted-foreground',
];

$iconPaths = [
    'info' => 'M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z',
    'success' => 'M9 12l2 2 4-4m6 2a10 10 0 11-20 0 10 10 0 0120 0z',
    'warning' => 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
    'danger' => 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a10 10 0 11-20 0 10 10 0 0120 0z',
    'default' => 'M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z',
];

$classes = implode(' ', [
    'relative flex gap-3 rounded-md p-4 text-sm leading-5 border',
    'transition-colors duration-[var(--duration-fast,150ms)]',
    $variants[$variant] ?? $variants['info'],
]);
@endphp

<div {{ $attributes->merge(['class' => $classes]) }} role="alert" data-ds data-ds-component="alert">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 mt-0.5 {{ $iconColors[$variant] ?? $iconColors['info'] }}">
        <path d="{{ $iconPaths[$variant] ?? $iconPaths['info'] }}"/>
    </svg>
    <div class="flex-1 space-y-1">
        @if($title)
            <p class="font-medium leading-5">{{ $title }}</p>
        @endif
        <div class="text-sm leading-5">{{ $slot }}</div>
    </div>
    @if($dismissible)
        <button
            class="absolute top-3 right-3 inline-flex items-center justify-center rounded-md h-6 w-6 hover:bg-black/10 dark:hover:bg-white/10"
            onclick="this.closest('[data-ds-component=alert]').remove()"
            aria-label="Dismiss"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    @endif
</div>
