{{--
    Unified UI — Alert Component
    https://unified-ui.space

    A contextual feedback component for displaying important messages,
    warnings, errors, or informational notices to users.

    Usage:
        {{-- Basic alert --}}
        <x-ui-alert>
            This is a default informational alert.
        </x-ui-alert>

        {{-- With variant --}}
        <x-ui-alert variant="destructive">
            Something went wrong. Please try again.
        </x-ui-alert>

        {{-- With title and description --}}
        <x-ui-alert variant="success" title="Payment successful">
            Your payment of $49.99 has been processed successfully.
        </x-ui-alert>

        {{-- Dismissible --}}
        <x-ui-alert variant="warning" dismissible>
            Your trial expires in 3 days. Upgrade now to keep access.
        </x-ui-alert>

        {{-- With custom icon slot --}}
        <x-ui-alert variant="info">
            <x-slot:icon>
                <svg class="h-5 w-5" ...>...</svg>
            </x-slot:icon>
            Custom icon content here.
        </x-ui-alert>

        {{-- Outlined style --}}
        <x-ui-alert variant="destructive" style="outline">
            Outline variant for a lighter visual weight.
        </x-ui-alert>

    Props:
        variant     — default|info|success|warning|destructive (default: default)
        style       — filled|outline|soft (default: soft)
        title       — optional title string rendered as a heading
        dismissible — boolean, shows a close button (default: false)
        icon        — boolean, whether to show the default icon for the variant (default: true)
        role        — ARIA role attribute (default: alert for destructive/warning, status otherwise)
        bordered    — boolean, adds a left accent border (default: true)
--}}

@props([
    'variant' => 'default',
    'style' => 'soft',
    'title' => null,
    'dismissible' => false,
    'icon' => true,
    'role' => null,
    'bordered' => true,
])

@php
    // ── Determine ARIA role ──────────────────────────────────────────
    $ariaRole = $role ?? match ($variant) {
        'destructive', 'warning' => 'alert',
        default => 'status',
    };

    // ── Variant color mappings ───────────────────────────────────────
    $colorMap = match ($variant) {
        'info' => [
            'bg' => '--ui-info',
            'fg' => '--ui-info-foreground',
            'border' => '--ui-info',
            'icon' => '--ui-info',
        ],
        'success' => [
            'bg' => '--ui-success',
            'fg' => '--ui-success-foreground',
            'border' => '--ui-success',
            'icon' => '--ui-success',
        ],
        'warning' => [
            'bg' => '--ui-warning',
            'fg' => '--ui-warning-foreground',
            'border' => '--ui-warning',
            'icon' => '--ui-warning',
        ],
        'destructive' => [
            'bg' => '--ui-destructive',
            'fg' => '--ui-destructive-foreground',
            'border' => '--ui-destructive',
            'icon' => '--ui-destructive',
        ],
        default => [
            'bg' => '--ui-muted',
            'fg' => '--ui-foreground',
            'border' => '--ui-border',
            'icon' => '--ui-muted-foreground',
        ],
    };

    // ── Style variant classes ────────────────────────────────────────
    $styleClasses = match ($style) {
        'filled' => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']}))]",
            "text-[oklch(var({$colorMap['fg']}))]",
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']}))]",
        ]),
        'soft' => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']})/0.1)]",
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']})/0.2)]",
        ]),
        default => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']})/0.1)]",
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']})/0.2)]",
        ]),
    };

    // ── Left accent border ───────────────────────────────────────────
    $accentBorderClasses = $bordered
        ? "border-l-4 border-l-[oklch(var({$colorMap['border']}))]"
        : '';

    // ── Icon color class ─────────────────────────────────────────────
    $iconColorClass = match ($style) {
        'filled' => "text-[oklch(var({$colorMap['fg']}))]",
        default => "text-[oklch(var({$colorMap['icon']}))]",
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'flex',
        'gap-3',
        'w-full',
        'border',
        'rounded-[var(--ui-radius-lg)]',
        'p-4',
        'text-sm',
        'leading-relaxed',
        'transition-all',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
    ]);

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$styleClasses} {$accentBorderClasses}");
@endphp

<div
    {{ $attributes->class([$classes]) }}
    role="{{ $ariaRole }}"
    @if($dismissible)
        x-data="{ visible: true }"
        x-show="visible"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-1"
    @endif
    data-ui-alert
    data-ui-alert-variant="{{ $variant }}"
>
    {{-- Icon --}}
    @if($icon)
        <div class="shrink-0 mt-0.5 {{ $iconColorClass }}" aria-hidden="true">
            @if(isset($iconSlot))
                {{ $iconSlot }}
            @else
                @switch($variant)
                    @case('info')
                        {{-- Info circle icon --}}
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        @break

                    @case
