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

                    @case('success')
                        {{-- Check circle icon --}}
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        @break

                    @case('warning')
                        {{-- Warning triangle icon --}}
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        @break

                    @case('destructive')
                        {{-- X circle icon --}}
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        @break

                    @default
                        {{-- Default info/bell icon --}}
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        @break
                @endswitch
            @endif
        </div>
    @endif

    {{-- Content --}}
    <div class="flex-1 min-w-0">
        @if($title)
            <h4 class="text-sm font-semibold leading-tight mb-1">
                {{ $title }}
            </h4>
        @endif

        <div class="text-sm leading-relaxed [&>p]:leading-relaxed">
            {{ $slot }}
        </div>
    </div>

    {{-- Dismiss button --}}
    @if($dismissible)
        <button
            type="button"
            x-on:click="visible = false"
            class="
                shrink-0
                inline-flex items-center justify-center
                h-6 w-6
                rounded-[var(--ui-radius-sm)]
                opacity-50
                hover:opacity-100
                transition-opacity
                duration-[var(--ui-duration-fast)]
                ease-[var(--ui-ease-default)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-current
            "
            aria-label="Dismiss"
        >
            <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    @endif
</div>
